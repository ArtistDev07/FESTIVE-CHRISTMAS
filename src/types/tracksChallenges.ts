/**
 * TypeScript types for Tracks and Challenges
 * Phase 4: Project Discovery & Themed Categories
 */

export type TrackCategory =
  | 'ai-magic'
  | 'web-apps'
  | 'climate-community'
  | 'open-innovation';

export type OfficialStatus = 'sample' | 'proposed' | 'confirmed';

export interface HackathonTrack {
  id: TrackCategory;
  number: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  accentBg: string;
  iconName: 'brain' | 'device' | 'leaf' | 'sparkles';
  challengeIds: string[];
  officialStatus: OfficialStatus;
}

export interface ProjectChallenge {
  id: string;
  number: string;
  title: string;
  description: string;
  trackId: TrackCategory;
  trackTitle: string;
  type: string;
  officialStatus: OfficialStatus;
}
