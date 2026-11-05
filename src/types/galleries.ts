/**
 * TypeScript Data Models for Magical Christmas Galleries
 * Strictly typed definitions for:
 * 1. Sponsors Gallery (4 Cards)
 * 2. Community Partners Gallery (5 Cards)
 * 3. Judges Gallery (4 Cards)
 * 4. Mentors Gallery (8 Cards)
 * 5. Volunteers Gallery (20 Cards)
 * 6. Additional Partners Gallery (4 Cards: Media, Photography, Venue, Food)
 */

export interface SponsorItem {
  id: string;
  tier: 'headline' | 'gold' | 'silver' | 'patron';
  tierLabel: string;
  tierBadgeColor: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  perks: string[];
  websiteUrl: string;
  isConfirmed: boolean;
  ornamentStyle: 'star' | 'bell' | 'tree' | 'snowflake';
  imageUrl?: string;
}

export interface CommunityPartnerItem {
  id: string;
  name: string;
  category: string;
  categoryTag: 'academic' | 'opensource' | 'design' | 'community' | 'diversity';
  tagline: string;
  description: string;
  initiative: string;
  websiteUrl: string;
  isConfirmed: boolean;
  ornamentStyle: 'wreath' | 'globe' | 'star' | 'snowflake' | 'ribbon';
  imageUrl?: string;
}

export type AdditionalPartnerCategory = 'media' | 'photography' | 'venue' | 'food';

export interface AdditionalPartnerItem {
  id: string;
  category: AdditionalPartnerCategory;
  categoryLabel: string;
  name: string;
  subtitle: string;
  description: string;
  visualTheme: string;
  highlights: string[];
  websiteUrl: string;
  isConfirmed: boolean;
  imageUrl?: string;
}

export interface JudgeProfileItem {
  id: string;
  seatNumber: string;
  name: string;
  title: string;
  organization: string;
  focusArea: string;
  bio: string;
  evaluationCriteria: string[];
  isConfirmed: boolean;
  avatarOrnament: 'gold-wreath' | 'solstice-star' | 'emerald-pine' | 'frost-crystal';
  imageUrl?: string;
}

export interface MentorProfileItem {
  id: string;
  seatNumber: string;
  name: string;
  role: string;
  organization: string;
  specialty: string;
  trackAffiliation: string;
  bio: string;
  skills: string[];
  isConfirmed: boolean;
  avatarOrnament: 'holly-branch' | 'silver-bell' | 'golden-star' | 'winter-pine';
  imageUrl?: string;
}

export interface VolunteerProfileItem {
  id: string;
  seatNumber: string;
  role: string;
  team: string;
  shift: string;
  duties: string;
  holidayQuote: string;
  bio: string;
  isConfirmed: boolean;
  ornamentIcon: 'candle' | 'mitten' | 'snowflake' | 'star' | 'tree' | 'gift' | 'bell' | 'wreath';
  imageUrl?: string;
}
