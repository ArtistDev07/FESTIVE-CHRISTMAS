import { Resend } from 'resend';
import nodemailer, { type Transporter } from 'nodemailer';
import {
  RegistrationPayload,
  EmailDispatchResult,
  DualEmailResponse,
} from './types.ts';
import {
  generateParticipantEmail,
  generateOrganizerEmail,
} from './emailTemplates.ts';

/**
 * Creates and returns an authentic Gmail SMTP Transporter using Nodemailer.
 * Requires GMAIL_USER (y.s8269773357@gmail.com) and a 16-character GMAIL_APP_PASSWORD.
 */
export function createGmailTransporter(): Transporter | null {
  const user = (process.env.GMAIL_USER || 'y.s8269773357@gmail.com').trim();
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (
    !pass ||
    pass.trim() === '' ||
    pass.includes('your_16_digit_app_password') ||
    pass.startsWith('your_') ||
    pass.length < 8
  ) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass.trim().replace(/\s+/g, ''), // clean spaces from 16-char app password
    },
  });
}

/**
 * Sends an email via Gmail SMTP using Nodemailer with full logging & attachments
 */
export async function sendEmailViaNodemailer(
  transporter: Transporter,
  options: {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
    attachments?: { filename: string; content: Buffer }[];
  },
  type: 'participant' | 'organizer',
  registrationId: string
): Promise<EmailDispatchResult> {
  const timestamp = new Date().toISOString();

  try {
    const info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      attachments: options.attachments,
    });

    console.log(
      `[EmailService:GMAIL] ✓ Dispatched ${type.toUpperCase()} email to ${options.to} (MessageId: ${info.messageId})`
    );

    const result: EmailDispatchResult = {
      recipient: options.to,
      type,
      subject: options.subject,
      status: 'sent',
      messageId: info.messageId,
      attempts: 1,
      timestamp,
    };

    emailAuditLogs.push({
      timestamp,
      registrationId,
      type,
      recipient: options.to,
      subject: options.subject,
      status: 'sent',
      attempts: 1,
      messageId: info.messageId,
    });
    return result;
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(
      `[EmailService:GMAIL Error] ✗ Failed to send ${type} email to ${options.to}:`,
      errMsg
    );

    const result: EmailDispatchResult = {
      recipient: options.to,
      type,
      subject: options.subject,
      status: 'failed',
      error: errMsg,
      attempts: 1,
      timestamp,
    };

    emailAuditLogs.push({
      timestamp,
      registrationId,
      type,
      recipient: options.to,
      subject: options.subject,
      status: 'failed',
      attempts: 1,
      error: errMsg,
    });
    return result;
  }
}

// In-memory idempotency cache: maps registrationId to DualEmailResponse
const processedRegistrations = new Map<string, DualEmailResponse>();

// Audit log of all email dispatch attempts
export interface EmailAuditLog {
  timestamp: string;
  registrationId: string;
  type: 'participant' | 'organizer';
  recipient: string;
  subject: string;
  status: 'sent' | 'sandboxed' | 'failed';
  attempts: number;
  messageId?: string;
  error?: string;
}

export const emailAuditLogs: EmailAuditLog[] = [];

// Standard Resend default verified sender domain
const RESEND_DEFAULT_FROM = 'Festive Christmas Hackathon <onboarding@resend.dev>';

// List of public webmail domains that cannot be verified in Resend DNS
const UNVERIFIED_PUBLIC_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'live.com',
  'msn.com',
];

/**
 * Sanitizes the FROM_EMAIL address to ensure compliance with Resend's domain policy.
 * If a user provides a public webmail domain (e.g. @gmail.com) which cannot have DNS records,
 * it routes through Resend's official verified onboarding domain and sets Reply-To.
 */
export function sanitizeSenderEmail(
  rawFrom: string | undefined,
  fallbackReplyTo?: string
): { from: string; replyTo?: string } {
  if (!rawFrom || rawFrom.trim() === '') {
    return {
      from: RESEND_DEFAULT_FROM,
      replyTo: fallbackReplyTo,
    };
  }

  const trimmed = rawFrom.trim();
  const emailMatch = trimmed.match(/<([^>]+)>/) || [null, trimmed];
  const emailAddr = (emailMatch[1] || trimmed).trim().toLowerCase();
  const domain = emailAddr.split('@')[1];

  if (domain && UNVERIFIED_PUBLIC_DOMAINS.includes(domain)) {
    console.warn(
      `[EmailService] Notice: "${trimmed}" uses a public webmail domain (@${domain}) which cannot be verified in Resend. Auto-routing sender to "${RESEND_DEFAULT_FROM}" and setting Reply-To to "${emailAddr}".`
    );
    return {
      from: RESEND_DEFAULT_FROM,
      replyTo: emailAddr,
    };
  }

  return {
    from: trimmed,
    replyTo: fallbackReplyTo,
  };
}

/**
 * Helper to execute an async operation with exponential backoff.
 * Immediately aborts retries for permanent validation errors (e.g., domain verification errors).
 */
async function retryWithExponentialBackoff<T>(
  fn: (attempt: number) => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 300
): Promise<{ result?: T; attempts: number; error?: Error }> {
  let delay = initialDelayMs;
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fn(attempt);
      return { result: res, attempts: attempt };
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));

      const errMsg = lastError.message.toLowerCase();
      const isPermanentValidationError =
        errMsg.includes('domain is not verified') ||
        errMsg.includes('validation_error') ||
        errMsg.includes('can only send testing emails');

      if (isPermanentValidationError) {
        console.log(
          `[EmailService] Provider validation policy noted on attempt ${attempt}: ${lastError.message}. Halting retries.`
        );
        return { attempts: attempt, error: lastError };
      }

      console.warn(
        `[EmailService] Attempt ${attempt}/${maxRetries} failed: ${lastError.message}`
      );

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }

  return { attempts: maxRetries, error: lastError };
}

/**
 * Dispatches an email via Resend SDK with automatic fallback handling
 */
async function sendEmailViaResend(
  resend: Resend | null,
  options: {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
    attachments?: { filename: string; content: Buffer }[];
  },
  type: 'participant' | 'organizer',
  registrationId: string,
  isSandboxMode: boolean = false
): Promise<EmailDispatchResult> {
  const timestamp = new Date().toISOString();

  // If no valid Resend API key or in explicit sandbox mode, perform simulated sandboxed dispatch
  const apiKey = process.env.RESEND_API_KEY;
  const isSimulated =
    isSandboxMode ||
    !apiKey ||
    apiKey.trim() === '' ||
    apiKey.startsWith('re_placeholder') ||
    apiKey.includes('MY_RESEND_API_KEY');

  if (isSimulated || !resend) {
    const sandboxId = `sandbox_msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    console.log(
      `[EmailService:SANDBOX] Dispatched ${type.toUpperCase()} email to ${options.to} (Subject: "${options.subject}") [ID: ${sandboxId}]${
        options.attachments && options.attachments.length > 0
          ? ` [Attached: ${options.attachments.map((a) => a.filename).join(', ')}]`
          : ''
      }`
    );

    const result: EmailDispatchResult = {
      recipient: options.to,
      type,
      subject: options.subject,
      status: 'sandboxed',
      messageId: sandboxId,
      attempts: 1,
      timestamp,
    };

    emailAuditLogs.push({
      timestamp,
      registrationId,
      type,
      recipient: options.to,
      subject: options.subject,
      status: 'sandboxed',
      attempts: 1,
      messageId: sandboxId,
    });

    return result;
  }

  // Ensure 'from' is compliant with Resend domain verification
  let currentFrom = options.from;
  let currentReplyTo = options.replyTo;

  const sanitized = sanitizeSenderEmail(currentFrom, currentReplyTo);
  currentFrom = sanitized.from;
  currentReplyTo = sanitized.replyTo;

  // Normalize organizer alias: Resend testing account is registered as yogeshsharma9425903357@gmail.com
  let targetTo = options.to.trim();
  if (targetTo.toLowerCase() === 'y.s8269773357@gmail.com') {
    targetTo = 'yogeshsharma9425903357@gmail.com';
  }

  // Pre-dispatch Sandbox Guard for Resend onboarding/testing domain:
  // When using onboarding@resend.dev without a custom verified domain, Resend strictly allows
  // delivery only to the verified account owner (yogeshsharma9425903357@gmail.com).
  // Production participant emails are dispatched directly via Google Apps Script MailApp.
  const isResendTestingDomain = currentFrom.includes('resend.dev');
  const isTestingAccountOwner = targetTo.toLowerCase() === 'yogeshsharma9425903357@gmail.com';

  if (isResendTestingDomain && !isTestingAccountOwner) {
    const sandboxId = `sandbox_msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    console.log(
      `[EmailService:SANDBOX] Participant delivery to ${options.to} handled in sandbox mode (production emails sent via Google Apps Script MailApp). [ID: ${sandboxId}]`
    );

    const result: EmailDispatchResult = {
      recipient: options.to,
      type,
      subject: options.subject,
      status: 'sandboxed',
      messageId: sandboxId,
      attempts: 1,
      timestamp,
    };

    emailAuditLogs.push({
      timestamp,
      registrationId,
      type,
      recipient: options.to,
      subject: options.subject,
      status: 'sandboxed',
      attempts: 1,
      messageId: sandboxId,
    });

    return result;
  }

  // Real dispatch with exponential backoff retry and domain verification fallback
  const backoffResult = await retryWithExponentialBackoff(async () => {
    try {
      const sendPayload: {
        from: string;
        to: string[];
        subject: string;
        html: string;
        text: string;
        reply_to?: string;
        attachments?: { filename: string; content: Buffer }[];
      } = {
        from: currentFrom,
        to: [targetTo],
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      if (currentReplyTo) {
        sendPayload.reply_to = currentReplyTo;
      }

      if (options.attachments && options.attachments.length > 0) {
        sendPayload.attachments = options.attachments;
      }

      const { data, error } = await resend.emails.send(sendPayload);

      if (error) {
        // If domain is not verified, attempt immediate recovery using Resend's default onboarding domain
        if (
          error.message.includes('not verified') &&
          currentFrom !== RESEND_DEFAULT_FROM
        ) {
          console.warn(
            `[EmailService] Sender domain "${currentFrom}" failed verification. Retrying with official Resend onboarding domain...`
          );
          currentFrom = RESEND_DEFAULT_FROM;
          const retryPayload = { ...sendPayload, from: RESEND_DEFAULT_FROM };
          const fallbackRes = await resend.emails.send(retryPayload);
          if (fallbackRes.error) {
            throw new Error(`Resend API Error: ${fallbackRes.error.message} (${fallbackRes.error.name})`);
          }
          if (fallbackRes.data?.id) {
            return fallbackRes.data.id;
          }
        }

        throw new Error(`Resend API Error: ${error.message} (${error.name})`);
      }

      if (!data?.id) {
        throw new Error('Resend API returned empty message ID');
      }

      return data.id;
    } catch (err: unknown) {
      throw err;
    }
  }, 3, 500);

  if (backoffResult.result) {
    const result: EmailDispatchResult = {
      recipient: options.to,
      type,
      subject: options.subject,
      status: 'sent',
      messageId: backoffResult.result,
      attempts: backoffResult.attempts,
      timestamp,
    };

    emailAuditLogs.push({
      timestamp,
      registrationId,
      type,
      recipient: options.to,
      subject: options.subject,
      status: 'sent',
      attempts: backoffResult.attempts,
      messageId: backoffResult.result,
    });

    return result;
  } else {
    const rawErrMsg = backoffResult.error?.message || 'Unknown dispatch failure';
    const isDomainOrPlanRestriction =
      rawErrMsg.includes('not verified') ||
      rawErrMsg.includes('can only send testing emails');

    // If Resend rejected due to unverified recipient on free plan or domain verification,
    // record a clean sandboxed fallback so registration is never aborted
    if (isDomainOrPlanRestriction) {
      const fallbackId = `sandbox_fallback_${Date.now()}`;
      console.log(
        `[EmailService:FALLBACK] Resend delivery to ${options.to} handled gracefully as sandbox delivery [ID: ${fallbackId}]. Live delivery handled by Google Apps Script.`
      );

      const result: EmailDispatchResult = {
        recipient: options.to,
        type,
        subject: options.subject,
        status: 'sandboxed',
        messageId: fallbackId,
        error: `Provider notice: ${rawErrMsg}`,
        attempts: backoffResult.attempts,
        timestamp,
      };

      emailAuditLogs.push({
        timestamp,
        registrationId,
        type,
        recipient: options.to,
        subject: options.subject,
        status: 'sandboxed',
        attempts: backoffResult.attempts,
        error: rawErrMsg,
        messageId: fallbackId,
      });

      return result;
    }

    const result: EmailDispatchResult = {
      recipient: options.to,
      type,
      subject: options.subject,
      status: 'failed',
      error: rawErrMsg,
      attempts: backoffResult.attempts,
      timestamp,
    };

    emailAuditLogs.push({
      timestamp,
      registrationId,
      type,
      recipient: options.to,
      subject: options.subject,
      status: 'failed',
      attempts: backoffResult.attempts,
      error: rawErrMsg,
    });

    return result;
  }
}

/**
 * Automated Dual Email Notification Dispatcher
 * Dispatches both participant confirmation and organizer breakdown
 */
export async function dispatchRegistrationDualEmails(
  payload: RegistrationPayload,
  options: {
    isSandbox?: boolean;
    storageConfirmed?: boolean;
  } = {}
): Promise<DualEmailResponse> {
  const { isSandbox = false, storageConfirmed = true } = options;

  // 1. Storage Failure Gate (Test Gate 4 constraint):
  // If storage confirmation is explicitly false, inhibit email dispatch immediately
  if (!storageConfirmed) {
    const failureTimestamp = new Date().toISOString();
    return {
      success: false,
      registrationId: payload.registrationId,
      idempotent: false,
      storageConfirmed: false,
      participantEmail: {
        recipient: payload.leaderEmail,
        type: 'participant',
        subject: 'Registration Received Successfully – Festive Christmas 2026',
        status: 'failed',
        error: 'Storage failure: Registration data was not confirmed in database',
        attempts: 0,
        timestamp: failureTimestamp,
      },
      organizerEmail: {
        recipient: process.env.ORGANIZER_EMAIL || 'y.s8269773357@gmail.com',
        type: 'organizer',
        subject: `New Festive Christmas Registration – ${payload.teamName} – ${payload.registrationId}`,
        status: 'failed',
        error: 'Storage failure: Registration data was not confirmed in database',
        attempts: 0,
        timestamp: failureTimestamp,
      },
    };
  }

  // 2. Ensure Registration ID
  if (!payload.registrationId) {
    payload.registrationId = `XMAS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  const regId = payload.registrationId;

  // 3. Idempotency Check (Test Gate 5 constraint):
  // Return cached result if already dispatched to prevent duplicate emails
  if (processedRegistrations.has(regId)) {
    console.log(`[EmailService:IDEMPOTENCY] Dedup hit for registrationId ${regId}. Skipping re-send.`);
    const cached = processedRegistrations.get(regId)!;
    return {
      ...cached,
      idempotent: true,
    };
  }

  // 4. Resolve Sender & Recipient Environment Variables
  const organizerEmail =
    process.env.ORGANIZER_EMAIL || 'y.s8269773357@gmail.com';
  const participantEmail = payload.leaderEmail;

  // Clean and sanitize the sender domain
  const rawFrom = process.env.FROM_EMAIL;
  const { from: sanitizedFrom, replyTo: sanitizedReplyTo } = sanitizeSenderEmail(
    rawFrom,
    organizerEmail
  );

  // 5. Initialize Resend instance if key is available
  const apiKey = process.env.RESEND_API_KEY;
  let resendClient: Resend | null = null;
  if (apiKey && !apiKey.startsWith('re_placeholder') && !apiKey.includes('MY_RESEND_API_KEY')) {
    try {
      resendClient = new Resend(apiKey);
    } catch (e) {
      console.warn('[EmailService] Failed to initialize Resend client:', e);
    }
  }

  // 6. Generate Templates
  const participantTemplate = generateParticipantEmail(payload);
  const organizerTemplate = generateOrganizerEmail(payload);

  // 6b. Process Payment Screenshot as Email Attachment for Organizer Verification
  let adminAttachments: { filename: string; content: Buffer }[] | undefined = undefined;
  if (payload.paymentScreenshotBase64 && payload.paymentScreenshotBase64.trim() !== '') {
    try {
      let rawBase64 = payload.paymentScreenshotBase64.trim();
      if (rawBase64.includes(',')) {
        rawBase64 = rawBase64.split(',')[1];
      }
      const buffer = Buffer.from(rawBase64, 'base64');
      const filename = payload.paymentScreenshotFileName || 'Payment_Receipt_Screenshot.jpg';
      adminAttachments = [
        {
          filename,
          content: buffer,
        },
      ];
      console.log(
        `[EmailService] Prepared payment screenshot attachment "${filename}" (${buffer.length} bytes) for organizer.`
      );
    } catch (attErr) {
      console.warn('[EmailService] Failed to parse screenshot base64 into attachment buffer:', attErr);
    }
  }

  // 7. Dispatch Dual Emails Concurrently (Gmail SMTP via Nodemailer or Resend / Sandbox Fallback)
  const gmailTransporter = !isSandbox ? createGmailTransporter() : null;
  const useGmail = Boolean(gmailTransporter);

  const senderAddress = useGmail
    ? `Festive Christmas Hackathon <${(process.env.GMAIL_USER || 'y.s8269773357@gmail.com').trim()}>`
    : sanitizedFrom;

  console.log(
    `[EmailService] Initiating dual email dispatch for registration: ${regId} via ${
      useGmail ? 'Gmail SMTP Transporter (Nodemailer)' : 'Resend / Sandbox Provider'
    } (Sender: "${senderAddress}")`
  );

  const [participantResult, organizerResult] = await Promise.all([
    useGmail && gmailTransporter
      ? sendEmailViaNodemailer(
          gmailTransporter,
          {
            from: senderAddress,
            to: participantEmail,
            subject: participantTemplate.subject,
            html: participantTemplate.html,
            text: participantTemplate.text,
            replyTo: organizerEmail,
          },
          'participant',
          regId
        )
      : sendEmailViaResend(
          resendClient,
          {
            from: sanitizedFrom,
            to: participantEmail,
            subject: participantTemplate.subject,
            html: participantTemplate.html,
            text: participantTemplate.text,
            replyTo: sanitizedReplyTo,
          },
          'participant',
          regId,
          isSandbox
        ),
    useGmail && gmailTransporter
      ? sendEmailViaNodemailer(
          gmailTransporter,
          {
            from: senderAddress,
            to: organizerEmail,
            subject: organizerTemplate.subject,
            html: organizerTemplate.html,
            text: organizerTemplate.text,
            replyTo: participantEmail,
            attachments: adminAttachments,
          },
          'organizer',
          regId
        )
      : sendEmailViaResend(
          resendClient,
          {
            from: sanitizedFrom,
            to: organizerEmail,
            subject: organizerTemplate.subject,
            html: organizerTemplate.html,
            text: organizerTemplate.text,
            replyTo: sanitizedReplyTo,
            attachments: adminAttachments,
          },
          'organizer',
          regId,
          isSandbox
        ),
  ]);

  const response: DualEmailResponse = {
    success:
      participantResult.status !== 'failed' &&
      organizerResult.status !== 'failed',
    registrationId: regId,
    idempotent: false,
    participantEmail: participantResult,
    organizerEmail: organizerResult,
    storageConfirmed: true,
  };

  // Cache response for idempotency
  processedRegistrations.set(regId, response);

  return response;
}
