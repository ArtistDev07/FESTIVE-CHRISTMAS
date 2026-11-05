/**
 * TypeScript Types for Phase 5: Event Information, Schedule, Rules & Preparation Guide
 */

export type ScheduleCategory =
  | 'all'
  | 'main-events'
  | 'building'
  | 'presentations'
  | 'learning';

export interface ScheduleItem {
  id: string;
  title: string;
  timeRange: string;
  dayLabel: string;
  category: ScheduleCategory;
  categoryLabel: string;
  description: string;
  location?: string;
  additionalDetails?: string[];
  officialStatus: 'illustrative' | 'confirmed';
}

export interface RuleSectionItem {
  id: string;
  title: string;
  summary: string;
  details: string;
  guidelines: string[];
  officialStatus: 'draft' | 'confirmed';
}

export type PrepCategory = 'before' | 'setup' | 'idea' | 'team';

export interface PreparationTask {
  id: string;
  label: string;
  description: string;
  category: PrepCategory;
  categoryTitle: string;
}

export interface EventNotice {
  id: string;
  title: string;
  message: string;
  category: 'update' | 'reminder' | 'logistics';
  publishedAt?: string;
  priority: 'normal' | 'high';
  dismissible: boolean;
}
