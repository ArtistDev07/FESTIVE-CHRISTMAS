/**
 * TypeScript Data Models for Phase 9: Frequently Asked Questions (FAQ)
 */

export type FAQCategory =
  | 'all'
  | 'getting-started'
  | 'registration'
  | 'teams'
  | 'tracks'
  | 'schedule'
  | 'prizes'
  | 'rules'
  | 'technical';

export interface FAQCategoryMeta {
  id: FAQCategory;
  label: string;
}

export interface FAQItemLink {
  label: string;
  href: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  categoryLabel: string;
  keywords: string[];
  relatedLinks?: FAQItemLink[];
  isPendingConfirmation?: boolean;
  publicationStatus: 'published' | 'draft';
  displayOrder: number;
}

export interface FAQIntroContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
}
