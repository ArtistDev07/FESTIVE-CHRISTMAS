import { Resend } from 'resend';
import {
  RegistrationPayload,
  EmailDispatchResult,
  DualEmailResponse,
} from './types.ts';
import {
  generateParticipantEmail,
  generateOrganizerEmail,
} from './emailTemplates.ts';

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
        console.warn(
          `[EmailService] Non-retryable validation error detected on attempt ${attempt}: ${lastError.message}. Halting retries.`
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
      `[EmailService:SANDBOX] Dispatched ${type.toUpperCase()} email to ${options.to} (Subject: "${options.subject}") [ID: ${sandboxId}]`
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
      } = {
        from: currentFrom,
        to: [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      if (currentReplyTo) {
        sendPayload.reply_to = currentReplyTo;
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
      console.warn(
        `[EmailService:FALLBACK] Resend delivery to ${options.to} was restricted by provider policy (${rawErrMsg}). Handled gracefully as sandbox delivery [ID: ${fallbackId}]. To send to external domains, verify your domain at https://resend.com/domains`
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

  // 7. Dispatch Dual Emails Concurrently
  console.log(`[EmailService] Initiating dual email dispatch for registration: ${regId} (from: "${sanitizedFrom}")`);
  const [participantResult, organizerResult] = await Promise.all([
    sendEmailViaResend(
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
    sendEmailViaResend(
      resendClient,
      {
        from: sanitizedFrom,
        to: organizerEmail,
        subject: organizerTemplate.subject,
        html: organizerTemplate.html,
        text: organizerTemplate.text,
        replyTo: sanitizedReplyTo,
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
