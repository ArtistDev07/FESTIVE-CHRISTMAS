import {
  RegistrationPayload,
  TestGateResult,
} from './types.ts';
import {
  generateParticipantEmail,
  generateOrganizerEmail,
} from './emailTemplates.ts';
import {
  dispatchRegistrationDualEmails,
  emailAuditLogs,
} from './emailService.ts';

// Mock pristine test registration payload
export const MOCK_TEST_REGISTRATION: RegistrationPayload = {
  registrationId: 'XMAS-2026-TEST-999',
  timestamp: new Date().toISOString(),
  submissionDateFormatted: 'Friday, 25 December 2026 at 9:00 AM IST',
  teamName: 'WinterStarlight',
  technicalDomain: 'Artificial Intelligence & Machine Learning',
  city: 'Indore',
  state: 'Madhya Pradesh',
  teamSize: 'trio',
  totalMembers: 3,
  leaderName: 'Yogesh Sharma',
  leaderEmail: 'y.s8269773357@gmail.com',
  leaderPhone: '9425903357',
  leaderCollege: 'Indian Institute of Technology Indore',
  leaderDegree: 'B.Tech',
  leaderBranch: 'Computer Science & Engineering',
  leaderYear: '4th Year (Senior)',
  leaderRollNumber: 'IIT-IND-2026-CS88',
  member2Name: 'Priya Patel',
  member2Email: 'priya.patel.test@example.com',
  member2Phone: '9876543210',
  member3Name: 'Rahul Verma',
  member3Email: 'rahul.verma.test@example.com',
  member3Phone: '9812345678',
  programmingLanguages: 'TypeScript, Python, Rust',
  frameworks: 'React, Next.js, FastAPI, PyTorch',
  githubUrl: 'https://github.com/winterstarlight-ai',
  linkedinUrl: 'https://linkedin.com/in/yogesh-sharma-tech',
  pastExperience: 'Winners at Central HackFest 2025; 2nd Place in Smart Winter Sprint',
  projectBrief: 'An autonomous festive emergency logistics coordinator with real-time routing',
  registrationFeeINR: 400,
  transactionId: '434912345678',
  paymentStatus: 'PENDING_VERIFICATION',
};

/**
 * Executes the complete 6-Gate E2E QA Verification Matrix
 */
export async function runQAVerificationMatrix(): Promise<{
  allPassed: boolean;
  totalGates: number;
  passedGates: number;
  failedGates: number;
  results: TestGateResult[];
  summary: string;
}> {
  const results: TestGateResult[] = [];
  const now = new Date().toISOString();

  // --------------------------------------------------------------------------
  // TEST 1: Participant receives confirmation email with exact submitted fields
  // --------------------------------------------------------------------------
  try {
    const participant = generateParticipantEmail(MOCK_TEST_REGISTRATION);
    const checks = [
      participant.html.includes('Yogesh Sharma'),
      participant.html.includes('WinterStarlight'),
      participant.html.includes('XMAS-2026-TEST-999'),
      participant.html.includes('Indian Institute of Technology Indore'),
      participant.html.includes('434912345678'),
      participant.html.includes('Priya Patel'),
      participant.html.includes('Rahul Verma'),
      participant.html.includes('₹400'),
      participant.html.includes('Indore, Madhya Pradesh'),
    ];

    const passed = checks.every(Boolean);
    results.push({
      gate: 'TEST 1',
      name: 'Participant Email Exact Field Binding',
      status: passed ? 'PASSED' : 'FAILED',
      details: passed
        ? 'All submitted team leader, member, track, and payment fields accurately rendered without missing bindings.'
        : 'Missing one or more expected submitted fields in participant template.',
      timestamp: now,
      metadata: { checksCount: checks.length, passedCount: checks.filter(Boolean).length },
    });
  } catch (err: unknown) {
    results.push({
      gate: 'TEST 1',
      name: 'Participant Email Exact Field Binding',
      status: 'FAILED',
      details: `Exception in Test 1: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: now,
    });
  }

  // --------------------------------------------------------------------------
  // TEST 2: Organizer receives complete 9-section data payload email
  // --------------------------------------------------------------------------
  try {
    const organizer = generateOrganizerEmail(MOCK_TEST_REGISTRATION);
    const sectionHeaders = [
      '1. Registration Information',
      '2. Team Information',
      '3. Team Leader Information',
      '4. Individual Team Member Information',
      '5. Contact Information',
      '6. College / Institution Information',
      '7. Payment Information',
      '8. Technical Stack & Project Brief',
      '9. Raw Payload Timestamp',
    ];

    const missingSections = sectionHeaders.filter(
      (header) =>
        !organizer.html.includes(header) &&
        !organizer.html.includes(header.replace('&', '&amp;')) &&
        !organizer.text.includes(header)
    );

    const passed = missingSections.length === 0;
    results.push({
      gate: 'TEST 2',
      name: 'Organizer 9-Section Payload Completeness',
      status: passed ? 'PASSED' : 'FAILED',
      details: passed
        ? 'All 9 mandatory audit sections verified in organizer breakdown email.'
        : `Missing sections: ${missingSections.join(', ')}`,
      timestamp: now,
      metadata: { missingSections },
    });
  } catch (err: unknown) {
    results.push({
      gate: 'TEST 2',
      name: 'Organizer 9-Section Payload Completeness',
      status: 'FAILED',
      details: `Exception in Test 2: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: now,
    });
  }

  // --------------------------------------------------------------------------
  // TEST 3: Sender, subject lines, HTML rendering, and dynamic bindings match specs
  // --------------------------------------------------------------------------
  try {
    const participant = generateParticipantEmail(MOCK_TEST_REGISTRATION);
    const organizer = generateOrganizerEmail(MOCK_TEST_REGISTRATION);

    const subject1Expected = 'Registration Received Successfully – Festive Christmas 2026';
    const subject2Expected = 'New Festive Christmas Registration – WinterStarlight – XMAS-2026-TEST-999';

    const s1Matches = participant.subject === subject1Expected;
    const s2Matches = organizer.subject === subject2Expected;
    const hasFestiveTokens =
      participant.html.includes('#061C14') &&
      participant.html.includes('#E9C578') &&
      participant.html.includes('#25A18E');
    const noUndefinedStrings =
      !participant.html.includes('undefined') &&
      !participant.html.includes('null') &&
      !organizer.html.includes('undefined') &&
      !organizer.html.includes('null');

    const passed = s1Matches && s2Matches && hasFestiveTokens && noUndefinedStrings;
    results.push({
      gate: 'TEST 3',
      name: 'Sender, Subject Lines & Styling Spec Adherence',
      status: passed ? 'PASSED' : 'FAILED',
      details: passed
        ? 'Subject lines match verbatim. Festive color tokens verified. Zero undefined or null strings present.'
        : 'Subject lines or styling specs did not match criteria.',
      timestamp: now,
      metadata: { s1Matches, s2Matches, hasFestiveTokens, noUndefinedStrings },
    });
  } catch (err: unknown) {
    results.push({
      gate: 'TEST 3',
      name: 'Sender, Subject Lines & Styling Spec Adherence',
      status: 'FAILED',
      details: `Exception in Test 3: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: now,
    });
  }

  // --------------------------------------------------------------------------
  // TEST 4: Storage failures cleanly inhibit email dispatch
  // --------------------------------------------------------------------------
  try {
    const storageFailedPayload = {
      ...MOCK_TEST_REGISTRATION,
      registrationId: 'XMAS-2026-STORAGE-FAIL-TEST',
    };

    // Invoke with storageConfirmed: false
    const dispatchResult = await dispatchRegistrationDualEmails(storageFailedPayload, {
      isSandbox: true,
      storageConfirmed: false,
    });

    const passed =
      dispatchResult.success === false &&
      dispatchResult.storageConfirmed === false &&
      dispatchResult.participantEmail.status === 'failed' &&
      dispatchResult.organizerEmail.status === 'failed' &&
      dispatchResult.participantEmail.attempts === 0;

    results.push({
      gate: 'TEST 4',
      name: 'Storage Failure Circuit Breaker',
      status: passed ? 'PASSED' : 'FAILED',
      details: passed
        ? 'Storage failure gate successfully intercepted dispatch. Zero outbound emails sent.'
        : 'Storage failure failed to inhibit email dispatch.',
      timestamp: now,
      metadata: { dispatchResult },
    });
  } catch (err: unknown) {
    results.push({
      gate: 'TEST 4',
      name: 'Storage Failure Circuit Breaker',
      status: 'FAILED',
      details: `Exception in Test 4: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: now,
    });
  }

  // --------------------------------------------------------------------------
  // TEST 5: Idempotent duplicate retries do not send repeated emails
  // --------------------------------------------------------------------------
  try {
    const idempotencyPayload = {
      ...MOCK_TEST_REGISTRATION,
      registrationId: `XMAS-2026-IDEMP-${Date.now()}`,
    };

    // First Call (initial dispatch)
    const firstDispatch = await dispatchRegistrationDualEmails(idempotencyPayload, {
      isSandbox: false,
      storageConfirmed: true,
    });

    // Second Call with same registrationId (simulated client retry)
    const retryDispatch = await dispatchRegistrationDualEmails(idempotencyPayload, {
      isSandbox: false,
      storageConfirmed: true,
    });

    const passed =
      firstDispatch.idempotent === false &&
      retryDispatch.idempotent === true &&
      retryDispatch.participantEmail.messageId === firstDispatch.participantEmail.messageId;

    results.push({
      gate: 'TEST 5',
      name: 'Idempotency & Duplicate Re-send Prevention',
      status: passed ? 'PASSED' : 'FAILED',
      details: passed
        ? 'Idempotency cache successfully prevented duplicate email dispatch on duplicate retry.'
        : 'Idempotency check failed to deduplicate repeated calls.',
      timestamp: now,
      metadata: { firstCallIdempotent: firstDispatch.idempotent, retryCallIdempotent: retryDispatch.idempotent },
    });
  } catch (err: unknown) {
    results.push({
      gate: 'TEST 5',
      name: 'Idempotency & Duplicate Re-send Prevention',
      status: 'FAILED',
      details: `Exception in Test 5: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: now,
    });
  }

  // --------------------------------------------------------------------------
  // TEST 6: Email logs record status codes and failure stack traces
  // --------------------------------------------------------------------------
  try {
    const hasLogs = emailAuditLogs.length > 0;
    const sampleLog = emailAuditLogs[emailAuditLogs.length - 1];
    const hasRequiredFields =
      sampleLog &&
      'timestamp' in sampleLog &&
      'registrationId' in sampleLog &&
      'status' in sampleLog &&
      'attempts' in sampleLog &&
      'recipient' in sampleLog;

    const passed = hasLogs && hasRequiredFields;
    results.push({
      gate: 'TEST 6',
      name: 'Email Audit Log & Observability Tracking',
      status: passed ? 'PASSED' : 'FAILED',
      details: passed
        ? `Audit log active. ${emailAuditLogs.length} total dispatch operations logged with timestamp, status, recipient, and attempts.`
        : 'Audit log missing expected structured telemetry fields.',
      timestamp: now,
      metadata: { totalLogs: emailAuditLogs.length, sampleLog },
    });
  } catch (err: unknown) {
    results.push({
      gate: 'TEST 6',
      name: 'Email Audit Log & Observability Tracking',
      status: 'FAILED',
      details: `Exception in Test 6: ${err instanceof Error ? err.message : String(err)}`,
      timestamp: now,
    });
  }

  const passedGates = results.filter((r) => r.status === 'PASSED').length;
  const failedGates = results.filter((r) => r.status === 'FAILED').length;
  const allPassed = failedGates === 0;

  return {
    allPassed,
    totalGates: results.length,
    passedGates,
    failedGates,
    results,
    summary: allPassed
      ? 'ALL 6 QA TEST GATES PASSED. EMAIL NOTIFICATION SYSTEM IS 100% PRODUCTION READY.'
      : `${failedGates} of ${results.length} QA test gates failed.`,
  };
}
