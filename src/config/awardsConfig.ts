/**
 * Awards & Prizes Configuration for Festive Christmas Hackathon
 * Event-Day Reveal Release: All prize specifics remain a Christmas surprise until 25 December.
 */

import {
  Award,
  AwardCategory,
  AwardCondition,
  WinnerResult,
  WinnerAnnouncementStatus,
} from '../types/awards.ts';

export interface PrizeCategoryItem {
  id: 'gold' | 'silver' | 'bronze' | 'other';
  label: string;
  tag: string;
  accent: 'gold' | 'silver' | 'bronze' | 'evergreen';
  statusMessage: string;
}

export const mysteryPrizesContent = {
  eyebrow: 'REVEALED ON 25 DECEMBER',
  heading: 'Prizes Wrapped in Mystery',
  paragraph:
    'Explore the four award categories now. Official prize details will be revealed on 25 December, during the event.',
  statusMessage: 'Official prize details revealed on event day.',
  eventDateLabel: '25 December',
};

export const officialPrizeCategories: PrizeCategoryItem[] = [
  {
    id: 'gold',
    label: 'GOLD',
    tag: 'Gold Category',
    accent: 'gold',
    statusMessage: 'Prize details revealed on event day.',
  },
  {
    id: 'silver',
    label: 'SILVER',
    tag: 'Silver Category',
    accent: 'silver',
    statusMessage: 'Prize details revealed on event day.',
  },
  {
    id: 'bronze',
    label: 'BRONZE',
    tag: 'Bronze Category',
    accent: 'bronze',
    statusMessage: 'Prize details revealed on event day.',
  },
  {
    id: 'other',
    label: 'OTHER AWARDS',
    tag: 'Special Recognition',
    accent: 'evergreen',
    statusMessage: 'Prize details revealed on event day.',
  },
];

// Strongly typed empty structures to ensure complete isolation and prevent legacy dummy data resurfacing
export const awardsList: Award[] = [];
export const awardCategoriesList: AwardCategory[] = [];
export const awardConditionsList: AwardCondition[] = [];
export const winnerResultsState: {
  announcementStatus: WinnerAnnouncementStatus;
  unrevealedTitle: string;
  unrevealedDescription: string;
  officialClosingCeremony: string;
  publishedResults: WinnerResult[];
} = {
  announcementStatus: 'not_published',
  unrevealedTitle: 'Results Announced at Closing',
  unrevealedDescription: 'Winners will be officially revealed on event day.',
  officialClosingCeremony: '25 December',
  publishedResults: [],
};

export const awardsIntroContent = {
  eyebrow: mysteryPrizesContent.eyebrow,
  heading: mysteryPrizesContent.heading,
  paragraph: mysteryPrizesContent.paragraph,
  microcopy: mysteryPrizesContent.statusMessage,
  verifiedPoolBadge: '',
  showcaseHeading: '',
  showcaseParagraph: '',
  categoriesHeading: '',
  categoriesParagraph: '',
};
