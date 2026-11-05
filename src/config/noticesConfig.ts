import { EventNotice } from '../types/eventInformation.ts';

export const activeNotices: EventNotice[] = [
  {
    id: 'notice-01',
    title: 'Schedule Preview Published',
    message:
      'The illustrative timetable for Festive Christmas 2026 is now live. Final speaker and workshop announcements will be confirmed prior to kickoff.',
    category: 'update',
    publishedAt: 'Winter 2026',
    priority: 'normal',
    dismissible: true,
  },
  {
    id: 'notice-02',
    title: 'Participant Preparation Guide Active',
    message:
      'Use the interactive checklist below to track your setup, IDE configurations, and team readiness ahead of the 25 December 2026 mini hackathon.',
    category: 'reminder',
    publishedAt: 'Winter 2026',
    priority: 'normal',
    dismissible: true,
  },
];
