import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { dispatchRegistrationDualEmails } from './src/server/emailService.ts';
import { runQAVerificationMatrix, MOCK_TEST_REGISTRATION } from './src/server/testRunner.ts';
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

// Sandboxed Test Runner Endpoint
app.post('/api/test/sandbox-dispatch', async (req: Request, res: Response) => {
  try {
    const testPayload: RegistrationPayload = {
      ...MOCK_TEST_REGISTRATION,
      ...(req.body || {}),
      registrationId: `XMAS-SANDBOX-${Date.now()}`,
    };

    const result = await dispatchRegistrationDualEmails(testPayload, {
      isSandbox: true,
      storageConfirmed: true,
    });

    return res.json({
      testMode: 'SANDBOX_DISPATCH',
      result,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Sandbox dispatch failed',
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
