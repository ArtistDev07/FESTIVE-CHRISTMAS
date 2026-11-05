/**
 * TypeScript Data Models for Phase 8: Mentors, Judges, and Expert Community Recognition
 * Strictly typed following verification and publication governance.
 */

export type ExpertRole = 'mentor' | 'judge' | 'mentor-and-judge';

export type VerificationStatus = 'draft' | 'proposed' | 'confirmed' | 'rejected';

export type PublicationStatus = 'unpublished' | 'published' | 'archived';

export type ProfessionalLinkType = 'linkedin' | 'github' | 'twitter' | 'website';

export interface ProfessionalLink {
  type: ProfessionalLinkType;
  url: string;
  label: string;
}

export interface ExpertProfile {
  id: string;
  displayName: string;
  role: ExpertRole;
  roleLabel: string;
  professionalTitle: string;
  organization?: string;
  portrait?: string;
  shortBiography: string;
  fullBiography: string;
  expertise: string[];
  websiteUrl?: string;
  professionalLinks?: ProfessionalLink[];
  featured?: boolean;
  featuredReason?: string;
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  displayOrder: number;
  isIllustrativeSample?: boolean;
}

export type RoleFilterType = 'all' | 'mentor' | 'judge';

export interface ExpertsIntroContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  mentorsSection: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  judgesSection: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}
