import { z } from 'zod';
import path from 'path';

/**
 * ============================================================================
 * FESTIVE CHRISTMAS HACKATHON 2026 — ENTERPRISE SECURITY ENGINE
 * OWASP Top 10 Hardening: Input Validation, File Security, Rate Limiting, XSS & Header Protection
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. ZOD SCHEMA VALIDATION
// ----------------------------------------------------------------------------

// Helper to strip potential HTML tags and control chars from string fields
const sanitizeString = (val: string) =>
  val.replace(/<[^>]*>/g, '').replace(/[\x00-\x1F\x7F]/g, '').trim();

// Header injection prevention: strict check for \r or \n
const noHeaderInjection = (val: string) => !/[\r\n]/.test(val);

export const registrationSchema = z.object({
  registrationId: z
    .string()
    .regex(/^XMAS-\d{4}-[A-Z0-9\-_]{3,20}$/, 'Invalid registration ID format.')
    .optional(),
  timestamp: z.string().optional(),
  submissionDateFormatted: z.string().optional(),

  // Step 1: Team Details
  teamName: z
    .string()
    .min(2, 'Team name must be at least 2 characters.')
    .max(100, 'Team name cannot exceed 100 characters.')
    .refine(noHeaderInjection, 'Team name cannot contain newline characters.')
    .transform(sanitizeString),
  technicalDomain: z
    .string()
    .min(2, 'Technical domain is required.')
    .max(120, 'Technical domain too long.')
    .transform(sanitizeString),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters.')
    .max(80, 'City name too long.')
    .transform(sanitizeString),
  state: z
    .string()
    .min(2, 'State / Region is required.')
    .max(80, 'State name too long.')
    .transform(sanitizeString),
  teamSize: z.union([
    z.literal('solo'),
    z.literal('duo'),
    z.literal('trio'),
    z.literal('squad'),
  ]),
  totalMembers: z.number().int().min(1).max(4).optional(),

  // Step 2: Team Leader Details
  leaderName: z
    .string()
    .min(2, 'Leader name must be at least 2 characters.')
    .max(100, 'Leader name too long.')
    .refine(noHeaderInjection, 'Leader name cannot contain newline characters.')
    .transform(sanitizeString),
  leaderEmail: z
    .string()
    .email('Invalid email address format for team leader.')
    .max(150, 'Email address too long.')
    .refine(noHeaderInjection, 'Header injection detected in email address.')
    .transform((val) => val.trim().toLowerCase()),
  leaderPhone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{10,16}$/, 'Enter a valid mobile phone number.')
    .transform((val) => val.replace(/[\s\-+()]/g, '')),
  leaderCollege: z
    .string()
    .min(2, 'College or university name is required.')
    .max(150, 'College name too long.')
    .transform(sanitizeString),
  leaderDegree: z
    .string()
    .min(1, 'Degree is required.')
    .max(80, 'Degree too long.')
    .transform(sanitizeString),
  leaderBranch: z
    .string()
    .min(1, 'Branch or specialization is required.')
    .max(80, 'Branch too long.')
    .transform(sanitizeString),
  leaderYear: z
    .string()
    .min(1, 'Academic year is required.')
    .max(50, 'Academic year too long.')
    .transform(sanitizeString),
  leaderRollNumber: z
    .string()
    .max(50, 'Roll number too long.')
    .optional()
    .nullable()
    .transform((val) => (val ? sanitizeString(val) : 'N/A')),

  // Step 3: Dynamic Members (Optional / Conditional)
  member2Name: z.string().max(100).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  member2Email: z.string().max(150).optional().nullable().transform((v) => (v ? v.trim().toLowerCase() : 'N/A')),
  member2Phone: z.string().max(20).optional().nullable().transform((v) => (v ? v.replace(/[\s\-+()]/g, '') : 'N/A')),

  member3Name: z.string().max(100).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  member3Email: z.string().max(150).optional().nullable().transform((v) => (v ? v.trim().toLowerCase() : 'N/A')),
  member3Phone: z.string().max(20).optional().nullable().transform((v) => (v ? v.replace(/[\s\-+()]/g, '') : 'N/A')),

  member4Name: z.string().max(100).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  member4Email: z.string().max(150).optional().nullable().transform((v) => (v ? v.trim().toLowerCase() : 'N/A')),
  member4Phone: z.string().max(20).optional().nullable().transform((v) => (v ? v.replace(/[\s\-+()]/g, '') : 'N/A')),

  // Step 4: Technical Profiles
  programmingLanguages: z.string().max(300).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  frameworks: z.string().max(300).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  githubUrl: z.string().max(200).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  linkedinUrl: z.string().max(200).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  pastExperience: z.string().max(1000).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),
  projectBrief: z.string().max(1500).optional().nullable().transform((v) => (v ? sanitizeString(v) : 'N/A')),

  // Step 5: Checkout & Payment
  registrationFeeINR: z.number().optional().default(400),
  transactionId: z
    .string()
    .min(1, 'Transaction ID / UTR is required.')
    .refine((val) => /^\d{12}$/.test(val.trim()), {
      message: 'Invalid UTR: Transaction ID must be exactly 12 numeric digits.',
    })
    .transform((val) => val.trim()),
  paymentStatus: z.string().max(50).optional().default('PENDING_VERIFICATION'),

  // Screenshot Upload Fields
  paymentScreenshotBase64: z.string().optional().nullable(),
  paymentScreenshotFileName: z.string().max(120).optional().nullable(),
  paymentScreenshotMimeType: z.string().max(60).optional().nullable(),

  // Simulation flag (for test runner)
  isSimulation: z.boolean().optional(),
});

export type ValidatedRegistration = z.infer<typeof registrationSchema>;

// ----------------------------------------------------------------------------
// 2. FILE UPLOAD SECURITY (MAGIC BYTE & PATH TRAVERSAL DEFENSE)
// ----------------------------------------------------------------------------

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB limit strictly enforced

export interface FileValidationResult {
  valid: boolean;
  detectedMime?: string;
  error?: string;
}

/**
 * Validates magic byte signatures (header signatures) of image buffers:
 * - PNG:  89 50 4E 47 0D 0A 1A 0A
 * - JPEG: FF D8 FF
 * - WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
 */
export function validateMagicBytes(buffer: Buffer): FileValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'Empty file buffer received.' };
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds strict 5MB limit (${(buffer.length / (1024 * 1024)).toFixed(2)}MB).`,
    };
  }

  // 1. Check PNG (8 bytes: 89 50 4E 47 0D 0A 1A 0A)
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, detectedMime: 'image/png' };
  }

  // 2. Check JPEG (3 bytes: FF D8 FF)
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { valid: true, detectedMime: 'image/jpeg' };
  }

  // 3. Check WebP (RIFF at 0..3, WEBP at 8..11)
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && // R
    buffer[1] === 0x49 && // I
    buffer[2] === 0x46 && // F
    buffer[3] === 0x46 && // F
    buffer[8] === 0x57 && // W
    buffer[9] === 0x45 && // E
    buffer[10] === 0x42 && // B
    buffer[11] === 0x50 // P
  ) {
    return { valid: true, detectedMime: 'image/webp' };
  }

  return {
    valid: false,
    error:
      'File signature mismatch: Only authentic PNG, JPEG, or WEBP image files are permitted.',
  };
}

/**
 * Sanitizes file names to defeat directory traversal attacks (`../`, `..\`) and RCE.
 * Strips path separators, control characters, and enforces safe extensions.
 */
export function sanitizeFileName(rawName: string, fallbackMime: string = 'image/jpeg'): string {
  if (!rawName || rawName.trim() === '') {
    return `payment_receipt_${Date.now()}.jpg`;
  }

  // Extract base name only (strips directory paths)
  let cleanName = path.basename(rawName.trim());

  // Remove all non-alphanumeric, dots, dashes, underscores
  cleanName = cleanName.replace(/[^a-zA-Z0-9.\-_]/g, '_');

  // Prevent multiple consecutive dots (e.g., file..php or ../)
  cleanName = cleanName.replace(/\.{2,}/g, '.');

  // Ensure safe file extension
  const ext = path.extname(cleanName).toLowerCase();
  const allowedExtensions: Record<string, string> = {
    '.png': '.png',
    '.jpg': '.jpg',
    '.jpeg': '.jpg',
    '.webp': '.webp',
  };

  const safeExt =
    allowedExtensions[ext] ||
    (fallbackMime === 'image/png'
      ? '.png'
      : fallbackMime === 'image/webp'
      ? '.webp'
      : '.jpg');

  const baseWithoutExt = path.basename(cleanName, ext).substring(0, 40);
  return `${baseWithoutExt || 'receipt'}_${Date.now()}${safeExt}`;
}

// ----------------------------------------------------------------------------
// 3. RATE LIMITING ENGINE (OWASP Anti-Bot Defense)
// ----------------------------------------------------------------------------

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean expired records every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  for (const [ip, record] of rateLimitStore.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Enforces max 5 submissions per IP address per 10-minute sliding window.
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
} {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes (600 seconds)
  const maxLimit = 5;

  let record = rateLimitStore.get(ip);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(ip, record);
  }

  // Filter timestamps within current sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxLimit) {
    const oldestTimestamp = record.timestamps[0];
    const resetMs = oldestTimestamp + windowMs - now;
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.max(1, Math.ceil(resetMs / 1000)),
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: maxLimit - record.timestamps.length,
    resetSeconds: 600,
  };
}

// ----------------------------------------------------------------------------
// 4. CSRF & ORIGIN SECURITY VERIFICATION
// ----------------------------------------------------------------------------

/**
 * Validates request Origin / Referer to prevent Cross-Site Request Forgery (CSRF).
 * Accepts requests originating from same-origin or authorized deployment subdomains.
 */
export function validateRequestOrigin(
  originHeader: string | undefined | null,
  refererHeader: string | undefined | null,
  hostHeader: string | undefined | null
): boolean {
  // In development / local testing, allow if no origin or localhost
  if (!originHeader && !refererHeader) {
    return true;
  }

  const allowedOrigins = [
    'localhost:3000',
    '127.0.0.1:3000',
    hostHeader,
  ].filter(Boolean) as string[];

  const checkUrl = (urlStr: string): boolean => {
    try {
      const parsed = new URL(urlStr);
      if (allowedOrigins.some((allowed) => parsed.host === allowed)) {
        return true;
      }
      // Allow cloud run previews
      if (parsed.hostname.endsWith('.run.app') || parsed.hostname.endsWith('.google.com')) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  if (originHeader && checkUrl(originHeader)) return true;
  if (refererHeader && checkUrl(refererHeader)) return true;

  return false;
}

// ----------------------------------------------------------------------------
// 5. RESILIENT GOOGLE SHEETS FETCH WITH EXPONENTIAL BACKOFF
// ----------------------------------------------------------------------------

/**
 * Dispatches an HTTP call to Google Apps Script with exponential backoff on 429/503.
 * Prevents intermittent network glitches or Google API limits from failing submissions.
 */
export async function fetchWithExponentialBackoff(
  url: string,
  options: RequestInit,
  maxRetries: number = 3,
  initialDelayMs: number = 400
): Promise<{ ok: boolean; status: number; text: string; error?: string }> {
  let delay = initialDelayMs;
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutHandle);
      const text = await res.text();

      // If rate limited by Google (429) or transient backend error (503/504), retry
      if (res.status === 429 || res.status === 503 || res.status === 504) {
        lastError = `Google API responded with status ${res.status}`;
        if (attempt < maxRetries) {
          console.warn(`[GoogleSheets:Retry] Status ${res.status} on attempt ${attempt}. Retrying in ${delay}ms...`);
          await new Promise((r) => setTimeout(r, delay));
          delay *= 2;
          continue;
        }
      }

      return {
        ok: res.ok,
        status: res.status,
        text,
      };
    } catch (err: unknown) {
      clearTimeout(timeoutHandle);
      if (err instanceof Error && err.name === 'AbortError') {
        lastError = 'Google Apps Script connection timed out (20s).';
      } else {
        lastError = err instanceof Error ? err.message : String(err);
      }

      if (attempt < maxRetries) {
        console.warn(`[GoogleSheets:Retry] Attempt ${attempt} network error: ${lastError}. Retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
      }
    }
  }

  return {
    ok: false,
    status: 504,
    text: '',
    error: lastError || 'Google Sheets API retry attempts exhausted.',
  };
}
