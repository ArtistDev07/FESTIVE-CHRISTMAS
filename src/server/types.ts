export interface RegistrationPayload {
  registrationId: string;
  timestamp: string;
  submissionDateFormatted?: string;

  // Step 1: Team Information
  teamName: string;
  technicalDomain: string;
  city: string;
  state: string;
  teamSize: string;
  totalMembers?: number;

  // Step 2: Team Leader Details
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderCollege: string;
  leaderDegree: string;
  leaderBranch: string;
  leaderYear: string;
  leaderRollNumber?: string;

  // Step 3: Dynamic Members (Optional / conditional)
  member2Name?: string;
  member2Email?: string;
  member2Phone?: string;

  member3Name?: string;
  member3Email?: string;
  member3Phone?: string;

  member4Name?: string;
  member4Email?: string;
  member4Phone?: string;

  // Step 4: Technical Profiles & Experience
  programmingLanguages?: string;
  frameworks?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  pastExperience?: string;
  projectBrief?: string;

  // Step 5: Checkout & Payment
  registrationFeeINR?: number;
  transactionId: string;
  paymentStatus?: string;
}

export interface EmailDispatchResult {
  recipient: string;
  type: 'participant' | 'organizer';
  subject: string;
  status: 'sent' | 'sandboxed' | 'failed';
  messageId?: string;
  error?: string;
  attempts: number;
  timestamp: string;
}

export interface DualEmailResponse {
  success: boolean;
  registrationId: string;
  idempotent: boolean;
  participantEmail: EmailDispatchResult;
  organizerEmail: EmailDispatchResult;
  storageConfirmed: boolean;
}

export interface TestGateResult {
  gate: string;
  name: string;
  status: 'PASSED' | 'FAILED';
  details: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
