/**
 * Event Configuration for Festive Christmas Hackathon
 * Central single-source-of-truth for all event parameters and placeholders.
 */

export interface EventConfig {
  eventTitle: string;
  badgeText: string;
  eventTagline: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  registrationStatus: 'open' | 'opening_soon' | 'closed';
  registrationStatusLabel: string;
  registrationUrl: string;
  secondaryTargetAnchor: string;
  organizerEmail: string;
  totalPrizePool: string;
  discordUrl: string;
  githubUrl: string;
  year: number;
}

export const eventConfig: EventConfig = {
  eventTitle: 'Festive Christmas',
  badgeText: 'One-Day Mini Hackathon 2026',
  eventTagline: 'Build something extraordinary this Christmas.',
  eventDescription:
    'Join a festive one-day, 8-hour mini hackathon where creative minds come together to imagine, design, and build the next big idea.',
  eventDate: '25 December 2026',
  eventTime: '9:00 AM–5:00 PM IST',
  eventLocation: 'Global Virtual Hub',
  registrationStatus: 'open',
  registrationStatusLabel: 'Registration Open',
  registrationUrl: '/register',
  secondaryTargetAnchor: '#overview',
  organizerEmail: 'yogeshsharma9425903357@gmail.com',
  totalPrizePool: 'Official Awards Revealed on Event Day',
  discordUrl: 'https://discord.gg/festive-christmas-placeholder',
  githubUrl: 'https://github.com/festive-christmas',
  year: 2026,
};
