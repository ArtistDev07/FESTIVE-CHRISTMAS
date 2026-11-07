import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { dispatchRegistrationDualEmails } from './src/server/emailService.ts';
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

// Security: IP-based Rate Limiter (Max 10 submissions per 60 seconds per IP)
const ipRequestTimes = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;
  const timestamps = (ipRequestTimes.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }
  timestamps.push(now);
  ipRequestTimes.set(ip, timestamps);
  return false;
}

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

    // Security 2: IP-based Rate Limiter
    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown-ip';
    if (isRateLimited(clientIp)) {
      console.warn(`[Security Alert] Rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        error: 'Too many registration requests. Please wait 60 seconds before retrying.',
      });
    }

    const payload = req.body as RegistrationPayload & { isSimulation?: boolean };

    // Security 3: Strict Input Validation
    if (!payload || !payload.leaderEmail || !payload.teamName || !payload.transactionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing mandatory registration fields (leaderEmail, teamName, or transactionId).',
      });
    }

    const cleanEmail = String(payload.leaderEmail || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format for team leader.',
      });
    }

    // Security 4: Strict 12-Digit Numeric UTR Validation
    const cleanUtr = String(payload.transactionId || '').trim();
    if (!/^\d{12}$/.test(cleanUtr)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid UTR: Transaction ID must be exactly 12 numeric digits.',
      });
    }

    const regId = payload.registrationId || `XMAS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    // Security 5: Server-side Idempotency (Block duplicate clicks or repeated retries)
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

    // 6. Simulation Mode (testing without altering live production sheet)
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

    // Security 6: Forward with Server-to-Server Authentication Secret
    console.log(`[Registration API] Transmitting registration ${regId} to Google Apps Script...`);
    const authSecret =
      process.env.REGISTRATION_AUTH_SECRET || 'xmas_sec_8f9a2b4e7c1d3f5a6b8e0d2c4b6a8e0f';

    let sheetSaved = false;
    let gasResponseData: any = null;
    let gasError: string | null = null;

    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), 30000);

    try {
      const gasFetch = await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          registrationId: regId,
          authSecret: authSecret,
        }),
        redirect: 'follow',
        signal: controller.signal,
      });

      clearTimeout(timeoutHandle);
      const responseText = await gasFetch.text();

      // Check for Google Login redirect or Google Drive permission error
      const lowerResponse = responseText.toLowerCase();
      if (lowerResponse.includes('accounts.google.com') || lowerResponse.includes('servicelogin')) {
        gasError =
          'Google Apps Script Web App access is restricted: Web App deployment "Who has access" must be set to "Anyone" (currently requires Google Login).';
      } else if (lowerResponse.includes('unable to open the file')) {
        gasError =
          'Google Apps Script cannot access the file: Ensure Web App is published with Execute as "Me" and Who has access "Anyone".';
      } else {
        try {
          gasResponseData = JSON.parse(responseText);
          if (gasResponseData.status === 'success' || gasResponseData.sheetSaved === true) {
            sheetSaved = true;
          } else if (gasResponseData.status === 'error') {
            gasError = gasResponseData.message || 'Google Apps Script reported an error saving row.';
          }
        } catch {
          gasError = `Google Apps Script returned unparseable text: ${responseText.slice(0, 160)}`;
        }
      }
    } catch (networkErr: unknown) {
      clearTimeout(timeoutHandle);
      if (networkErr instanceof Error && networkErr.name === 'AbortError') {
        gasError = 'Connection to Google Apps Script timed out after 30 seconds.';
      } else {
        gasError = `Connection to Google Apps Script failed: ${networkErr instanceof Error ? networkErr.message : String(networkErr)}`;
      }
    }

    // If Google Apps Script returned an authentication or configuration error:
    if (!sheetSaved) {
      console.warn(`[Registration API] Google Apps Script notice for ${regId}:`, gasError);
      return res.status(502).json({
        success: false,
        registrationId: regId,
        error: gasError || 'Failed to save registration in Google Sheets.',
        diagnosticHelp:
          'Please ensure Google Apps Script deployment is set to Execute as "Me" and Who has access "Anyone".',
      });
    }

    // 7. Record in idempotency cache
    serverRegisteredIds.add(regId);

    // 8. Capture Real MailApp Email Delivery Status from Google Apps Script Webhook
    const participantStatus =
      gasResponseData?.participantEmailStatus ||
      gasResponseData?.emailStatus?.participant ||
      'PENDING';
    const organizerStatus =
      gasResponseData?.organizerEmailStatus ||
      gasResponseData?.emailStatus?.organizer ||
      'PENDING';
    const participantError =
      gasResponseData?.participantEmailError ||
      gasResponseData?.emailStatus?.participantError ||
      null;
    const organizerError =
      gasResponseData?.organizerEmailError ||
      gasResponseData?.emailStatus?.organizerError ||
      null;

    const emailStatus = {
      participant: participantStatus,
      organizer: organizerStatus,
      participantError: participantError,
      organizerError: organizerError,
    };

    console.log(`[Registration API] MailApp status for ${regId}: Participant=${participantStatus}, Organizer=${organizerStatus}`);
    if (participantError) console.warn(`[Registration API] Participant email notice for ${regId}:`, participantError);
    if (organizerError) console.warn(`[Registration API] Organizer email notice for ${regId}:`, organizerError);

    // Zero secret leakage: only return public confirmation details & genuine MailApp status
    return res.status(200).json({
      success: true,
      registrationId: regId,
      sheetSaved: true,
      isDuplicate: Boolean(gasResponseData?.isDuplicate),
      emailStatus,
      participantEmailStatus: participantStatus,
      organizerEmailStatus: organizerStatus,
      participantEmailError: participantError,
      organizerEmailError: organizerError,
      message: gasResponseData?.message || 'Registration successfully recorded in Google Sheets.',
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
