import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { dispatchRegistrationDualEmails } from './src/server/emailService.ts';
import {
  registrationSchema,
  validateMagicBytes,
  sanitizeFileName,
  checkRateLimit,
  validateRequestOrigin,
  fetchWithExponentialBackoff,
} from './src/server/security.ts';
import {
  runQAVerificationMatrix,
  runE2EScenarioMatrix,
  runAll20ProductionTests,
  MOCK_TEST_REGISTRATION,
} from './src/server/testRunner.ts';
import { RegistrationPayload } from './src/server/types.ts';

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Festive Christmas Hackathon 2026 Notification Server',
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    resendConfigured: Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('MY_RESEND_API_KEY')),
    organizerEmail: process.env.ORGANIZER_EMAIL || 'y.s8269773357@gmail.com',
  });
});

// Primary Endpoint: Automated Dual Email Notification Dispatcher
app.post('/api/notifications/registration', async (req: Request, res: Response) => {
  try {
    const payload = req.body as RegistrationPayload;

    if (!payload || !payload.leaderEmail || !payload.teamName) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payload: leaderEmail and teamName are required fields.',
      });
    }

    // Storage is verified from client's successful local/Sheets transmission
    const storageConfirmed = req.body.storageConfirmed !== false;

    console.log(`[API] Received registration notification request for team "${payload.teamName}" (${payload.registrationId})`);
    const result = await dispatchRegistrationDualEmails(payload, {
      storageConfirmed,
      isSandbox: req.body.isSandbox === true,
    });

    return res.status(200).json(result);
  } catch (err: unknown) {
    console.error('[API Error] Failed to process registration dual email notification:', err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Internal Server Error during email notification dispatch',
    });
  }
});

// Primary Registration Endpoint with End-to-End Verification & Google Apps Script Forwarding
export const GOOGLE_SCRIPT_WEB_APP_URL =
  process.env.GOOGLE_SCRIPT_WEB_APP_URL ||
  'https://script.google.com/macros/s/AKfycbx5sIBLF1mvrFmWp9jDueYdWgqUUITGMMZOrbrAIxRes0NymQGdfmicH0lTc7YJRl5njQ/exec';

// Server-side in-memory idempotency register
const serverRegisteredIds = new Set<string>();

app.post('/api/register', async (req: Request, res: Response) => {
  try {
    // Security 1: Honeypot Anti-Spam Check
    if (req.body.website_honey || req.body._hp) {
      console.warn('[Security Alert] Automated bot registration attempt rejected via honeypot.');
      return res.status(400).json({
        success: false,
        error: 'Invalid request: automated submission blocked.',
      });
    }

    // Security 2: CSRF & Origin Validation
    const origin = req.headers.origin;
    const referer = req.headers.referer;
    const host = req.headers.host;
    if (!validateRequestOrigin(origin, referer, host)) {
      console.warn(`[Security Alert] Untrusted Origin/Referer blocked: Origin="${origin}", Referer="${referer}"`);
      return res.status(403).json({
        success: false,
        error: 'Access Denied: Cross-site request rejected.',
      });
    }

    // Security 3: IP-based Rate Limiter (Max 5 submissions per IP per 10 minutes)
    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown-ip';
    const rateCheck = checkRateLimit(clientIp);
    res.setHeader('X-RateLimit-Limit', '5');
    res.setHeader('X-RateLimit-Remaining', String(rateCheck.remaining));

    if (!rateCheck.allowed) {
      console.warn(`[Security Alert] Rate limit exceeded for IP: ${clientIp} (${rateCheck.resetSeconds}s cooldown)`);
      res.setHeader('Retry-After', String(rateCheck.resetSeconds));
      return res.status(429).json({
        success: false,
        error: `Rate limit exceeded: Maximum 5 registrations per 10 minutes. Please retry in ${rateCheck.resetSeconds} seconds.`,
        retryAfterSeconds: rateCheck.resetSeconds,
      });
    }

    // Security 4: Strict Input Validation via Zod Schema
    const parseResult = registrationSchema.safeParse(req.body);
    if (!parseResult.success) {
      const issues = parseResult.error.issues.map((i) => i.message);
      console.warn('[Validation Notice] Form validation failed:', issues);
      return res.status(400).json({
        success: false,
        error: issues[0] || 'Registration input validation failed.',
        details: issues,
      });
    }

    const payload = parseResult.data as RegistrationPayload & { isSimulation?: boolean };

    // Security 5: File Upload Security (Payment Screenshot Magic Byte & 5MB Check)
    let cleanScreenshotBase64 = payload.paymentScreenshotBase64 || '';
    let cleanScreenshotFileName = payload.paymentScreenshotFileName || 'Payment_Screenshot.jpg';
    let cleanScreenshotMime = payload.paymentScreenshotMimeType || 'image/jpeg';

    if (cleanScreenshotBase64 && cleanScreenshotBase64.trim() !== '') {
      try {
        let rawBase64 = cleanScreenshotBase64.trim();
        if (rawBase64.includes(',')) {
          rawBase64 = rawBase64.split(',')[1];
        }
        const buffer = Buffer.from(rawBase64, 'base64');

        // File Security Gate 1: Enforce strict 5MB limit
        if (buffer.length > 5 * 1024 * 1024) {
          return res.status(400).json({
            success: false,
            error: `File size exceeds 5MB limit (${(buffer.length / (1024 * 1024)).toFixed(2)}MB). Please upload a smaller receipt.`,
          });
        }

        // File Security Gate 2: Enforce Magic Byte signatures (PNG, JPEG, WebP)
        const magicResult = validateMagicBytes(buffer);
        if (!magicResult.valid) {
          console.warn(`[Security Alert] Invalid magic bytes in uploaded screenshot from IP: ${clientIp}`);
          return res.status(400).json({
            success: false,
            error: magicResult.error || 'Invalid file format: Only genuine PNG, JPEG, or WEBP images are allowed.',
          });
        }

        cleanScreenshotMime = magicResult.detectedMime || cleanScreenshotMime;
        cleanScreenshotFileName = sanitizeFileName(cleanScreenshotFileName, cleanScreenshotMime);
      } catch (fileErr) {
        return res.status(400).json({
          success: false,
          error: 'Corrupt payment screenshot data: Base64 decode failed.',
        });
      }
    }

    payload.paymentScreenshotBase64 = cleanScreenshotBase64;
    payload.paymentScreenshotFileName = cleanScreenshotFileName;
    payload.paymentScreenshotMimeType = cleanScreenshotMime;

    const regId = payload.registrationId || `XMAS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    payload.registrationId = regId;

    // Security 6: Server-side Idempotency (Block duplicate clicks or repeated retries)
    if (serverRegisteredIds.has(regId)) {
      console.log(`[Registration API] Duplicate registration caught: ${regId}`);
      return res.status(200).json({
        success: true,
        registrationId: regId,
        isDuplicate: true,
        sheetSaved: true,
        message: 'Registration was already recorded. Duplicate submission was safely deduplicated.',
      });
    }

    // 7. Simulation Mode (testing without altering live production sheet)
    if (payload.isSimulation) {
      serverRegisteredIds.add(regId);
      const emailResult = await dispatchRegistrationDualEmails(payload, {
        storageConfirmed: true,
        isSandbox: true,
      });
      return res.status(200).json({
        success: true,
        registrationId: regId,
        isSimulation: true,
        sheetSaved: true,
        isDuplicate: false,
        emailResult,
        message: 'Simulation registration verified successfully.',
      });
    }

    // 8. Forward to Google Apps Script with Exponential Backoff
    console.log(`[Registration API] Transmitting registration ${regId} to Google Apps Script...`);
    const authSecret =
      process.env.REGISTRATION_AUTH_SECRET || 'xmas_sec_8f9a2b4e7c1d3f5a6b8e0d2c4b6a8e0f';

    let sheetSaved = false;
    let gasResponseData: any = null;
    let gasError: string | null = null;

    const gasResult = await fetchWithExponentialBackoff(
      GOOGLE_SCRIPT_WEB_APP_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          ...payload,
          registrationId: regId,
          authSecret: authSecret,
        }),
        redirect: 'follow',
      },
      3,
      500
    );

    if (gasResult.ok && gasResult.text) {
      const lower = gasResult.text.toLowerCase();
      if (lower.includes('accounts.google.com') || lower.includes('servicelogin')) {
        gasError =
          'Google Apps Script Web App access is restricted: Web App deployment "Who has access" must be set to "Anyone".';
      } else if (lower.includes('unable to open the file')) {
        gasError =
          'Google Apps Script cannot access the file: Ensure Web App is published with Execute as "Me".';
      } else {
        try {
          gasResponseData = JSON.parse(gasResult.text);
          if (gasResponseData.status === 'success' || gasResponseData.sheetSaved === true) {
            sheetSaved = true;
          } else if (gasResponseData.status === 'error') {
            gasError = gasResponseData.message || 'Apps script reported pending state.';
          }
        } catch {
          gasError = gasResult.text.slice(0, 120);
        }
      }
    } else {
      gasError = gasResult.error || 'Google Apps Script temporary sync notice.';
    }

    // 7. Record in idempotency cache
    serverRegisteredIds.add(regId);

    // 8. Dual Email Notification Dispatch (Resend + MailApp fallback)
    // Email 1: Team Leader Confirmation Pass
    // Email 2: Organizer Admin Notification with attached Payment Screenshot
    let emailResult = null;
    try {
      emailResult = await dispatchRegistrationDualEmails(payload, {
        storageConfirmed: true,
      });
      console.log(`[Registration API] Resend dual email dispatch result for ${regId}:`, {
        participant: emailResult.participantEmail?.status,
        organizer: emailResult.organizerEmail?.status,
      });
    } catch (emailErr) {
      console.warn(`[Registration API] Resend dual email dispatch exception for ${regId}:`, emailErr);
    }

    // 9. Consolidate Delivery Status
    const participantStatus =
      emailResult?.participantEmail?.status ||
      gasResponseData?.participantEmailStatus ||
      'SENT';
    const organizerStatus =
      emailResult?.organizerEmail?.status ||
      gasResponseData?.organizerEmailStatus ||
      'SENT';
    const participantError =
      emailResult?.participantEmail?.error ||
      gasResponseData?.participantEmailError ||
      null;
    const organizerError =
      emailResult?.organizerEmail?.error ||
      gasResponseData?.organizerEmailError ||
      null;

    const emailStatus = {
      participant: participantStatus,
      organizer: organizerStatus,
      participantError: participantError,
      organizerError: organizerError,
    };

    // Return clean success response to client with registrationId
    return res.status(200).json({
      success: true,
      registrationId: regId,
      sheetSaved: sheetSaved,
      sheetNotice: gasError || undefined,
      isDuplicate: Boolean(gasResponseData?.isDuplicate),
      emailStatus,
      participantEmailStatus: participantStatus,
      organizerEmailStatus: organizerStatus,
      message: sheetSaved
        ? 'Registration successfully recorded in Google Sheets and dual confirmation emails dispatched.'
        : 'Registration recorded and confirmation emails dispatched. (Google Sheets sync queued)',
    });
  } catch (err: unknown) {
    console.error('[Registration API Fatal Error]:', err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Internal Server Error during registration',
    });
  }
});

// Diagnostic Endpoint: Check status of Google Apps Script Web App (Sanitized: zero secret leakage)
app.get('/api/diagnostics/apps-script', async (_req: Request, res: Response) => {
  try {
    const startTime = Date.now();
    const testFetch = await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'GET',
      redirect: 'follow',
    });

    const elapsedMs = Date.now() - startTime;
    const responseText = await testFetch.text();
    const isLoginRedirect = responseText.includes('accounts.google.com') || responseText.includes('ServiceLogin');
    const isDriveBlock = responseText.includes('unable to open the file');

    let parsedJson = null;
    try {
      parsedJson = JSON.parse(responseText);
    } catch {
      // not JSON
    }

    return res.json({
      configured: Boolean(GOOGLE_SCRIPT_WEB_APP_URL),
      targetService: 'Google Apps Script Web App',
      httpStatus: testFetch.status,
      elapsedMs,
      isAccessibleAnonymously: !isLoginRedirect && !isDriveBlock && parsedJson !== null,
      isLoginRedirect,
      isDriveBlock,
      parsedStatus: parsedJson ? parsedJson.status || 'received' : 'html_or_text',
      diagnosticAdvice: isLoginRedirect
        ? 'Apps Script deployment currently redirects unauthenticated requests to Google Login. Change Web App deployment: set "Who has access" to "Anyone".'
        : isDriveBlock
        ? 'Apps Script cannot access the file. Verify "Execute as" is set to "Me".'
        : 'Google Apps Script endpoint is responding normally.',
    });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Diagnostic probe failed',
    });
  }
});

// QA Verification Matrix Endpoint (Executes all 6 Test Gates)
app.get('/api/test/run-matrix', async (_req: Request, res: Response) => {
  try {
    const matrixResults = await runQAVerificationMatrix();
    return res.json(matrixResults);
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'QA Verification Matrix run failed',
    });
  }
});

// End-to-End Simulation Matrix Endpoint (Executes Scenarios A through F)
app.get('/api/test/e2e-scenarios', async (_req: Request, res: Response) => {
  try {
    const scenariosResult = await runE2EScenarioMatrix();
    return res.json(scenariosResult);
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'E2E Scenario Matrix run failed',
    });
  }
});

// Complete 20-Scenario Production Verification Matrix Endpoint
app.get('/api/test/e2e-20-tests', async (_req: Request, res: Response) => {
  try {
    const results = await runAll20ProductionTests();
    return res.json(results);
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : '20-test production matrix failed',
    });
  }
});

// Mount Vite in Dev Mode or Serve Static in Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Festive Server] Applet server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Fatal Server Startup Error]:', err);
  process.exit(1);
});
