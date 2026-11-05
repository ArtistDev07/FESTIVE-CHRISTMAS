/**
 * ============================================================================
 * UPDATED LANDING PAGE / CONTENT STRINGS (ACCURATE & CLEANED)
 * ============================================================================
 */

export const EVENT_TIMELINE_SCHEDULE = [
  {
    time: "09:00 AM – 09:30 AM",
    title: "Check-in & Team Welcome",
    description: "Morning Arrival & Team Registration Setup"
  },
  {
    time: "09:30 AM – 10:00 AM",
    title: "Opening Ceremony & Briefing",
    description: "Official Hackathon Kickoff & Track Guidelines"
  },
  {
    time: "10:00 AM – 01:00 PM",
    title: "Sprint 1: Core Development",
    description: "Deep Work, Architecture Scaffolding & MVP Core Building"
  },
  {
    time: "01:00 PM – 02:00 PM",
    title: "Festive Lunch & Sync",
    description: "Nourishment & Mid-Sprint Mentor Feedback"
  },
  {
    time: "02:00 PM – 03:30 PM",
    title: "Sprint 2: Polish & Submissions",
    description: "Bug Squashing, Final Code Polish & Deployment Freeze"
  },
  {
    time: "03:30 PM – 04:30 PM",
    title: "Demos & Jury Evaluation",
    description: "Live Pitching & Architectural Reviews by Judges"
  },
  {
    time: "04:30 PM – 05:00 PM",
    title: "Awards & Closing Ceremony",
    description: "Celebrating the Holiday Builders & Winners Announcement"
  }
];

export const EVENT_METADATA = {
  title: "Festive Christmas Hackathon 2026",
  date: "25 December 2026",
  time: "9:00 AM – 5:00 PM IST",
  location: "Indore, Madhya Pradesh, India",
  fee: 400
};

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
  fee: number;
}

export const eventConfig: EventConfig = {
  eventTitle: EVENT_METADATA.title,
  badgeText: 'One-Day Mini Hackathon 2026',
  eventTagline: 'Build something extraordinary this Christmas.',
  eventDescription:
    'Join a festive one-day, 8-hour mini hackathon where creative minds come together to imagine, design, and build the next big idea.',
  eventDate: EVENT_METADATA.date,
  eventTime: EVENT_METADATA.time,
  eventLocation: EVENT_METADATA.location,
  registrationStatus: 'open',
  registrationStatusLabel: 'Registration Open',
  registrationUrl: '/register',
  secondaryTargetAnchor: '#overview',
  organizerEmail: 'yogeshsharma9425903357@gmail.com',
  totalPrizePool: 'Official Awards Revealed on Event Day',
  discordUrl: 'https://discord.gg/festive-christmas-placeholder',
  githubUrl: 'https://github.com/festive-christmas',
  year: 2026,
  fee: EVENT_METADATA.fee,
};

