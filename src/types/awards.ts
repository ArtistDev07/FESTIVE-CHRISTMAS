/**
 * TypeScript Data Models for Phase 6: Prizes, Awards & Recognition
 */

export type AwardCategoryType =
  | 'all'
  | 'overall'
  | 'innovation'
  | 'technical'
  | 'design'
  | 'impact'
  | 'special';

export type AwardOfficialStatus = 'confirmed' | 'proposed' | 'pending';
export type AwardPublicationStatus = 'published' | 'draft' | 'under_review';
export type RewardType = 'grant' | 'cash' | 'trophy' | 'fellowship' | 'recognition';

export interface Award {
  id: string;
  title: string;
  category: AwardCategoryType;
  categoryLabel: string;
  description: string;
  details?: string[];
  rewardType: RewardType;
  rewardValue: string;
  rewardCurrency?: string;
  rewardDescription: string;
  illustration?: string;
  eligibility: string;
  officialStatus: AwardOfficialStatus;
  publicationStatus: AwardPublicationStatus;
  displayOrder: number;
  isGrandPrize?: boolean;
  accentColor?: string;
  tagline?: string;
}

export interface AwardCategory {
  id: string;
  categoryType: AwardCategoryType;
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
  officialStatus: 'confirmed' | 'proposed';
  associatedAwardId?: string;
}

export type WinnerAnnouncementStatus = 'not_published' | 'published' | 'unavailable';

export interface WinnerResult {
  id: string;
  awardId: string;
  awardTitle: string;
  winnerDisplayName?: string;
  teamName?: string;
  projectTitle?: string;
  projectDescription?: string;
  projectImage?: string;
  publishedAt?: string;
  officialStatus: 'published' | 'pending';
}

export interface AwardCondition {
  id: string;
  title: string;
  summary: string;
  details: string;
  guidelines: string[];
  officialStatus: 'confirmed' | 'pending';
}
