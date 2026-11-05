/**
 * Contact & Organizer Connection Configuration
 * Phase 10: Contact & Organizer Connection
 * Single-source-of-truth for organizer info, contact topics, official channels, and quick help.
 */

export interface ContactPurpose {
  id: string;
  label: string;
  shortLabel: string;
  iconName: 'HelpCircle' | 'Users' | 'Sparkles' | 'Award' | 'Terminal' | 'Megaphone';
  badge: string;
  description: string;
  suggestedSubject: string;
  placeholderMessage: string;
  responseTimeNote: string;
}

export interface OfficialChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  type: 'discord' | 'github' | 'stream' | 'email';
  badge: string;
  isVerified: boolean;
  description: string;
  buttonLabel: string;
}

export interface QuickHelpLink {
  id: string;
  title: string;
  href: string;
  description: string;
  iconName: 'HelpCircle' | 'FileText' | 'Compass' | 'Calendar' | 'Gift' | 'CheckSquare';
  badge: string;
}

export const contactPurposes: ContactPurpose[] = [
  {
    id: 'general',
    label: 'General Inquiries & Logistics',
    shortLabel: 'General Inquiry',
    iconName: 'HelpCircle',
    badge: 'Fast Response',
    description: 'Questions regarding the hackathon format, timeline, participation rules, or virtual hubs.',
    suggestedSubject: '',
    placeholderMessage: 'Write your message here...',
    responseTimeNote: 'Replies usually within 12 hours',
  },
  {
    id: 'team',
    label: 'Team Formation & Teammate Matching',
    shortLabel: 'Team Matching',
    iconName: 'Users',
    badge: 'Community Desk',
    description: 'Looking for teammates, pairing guidance for solo developers, or team size clarification.',
    suggestedSubject: '',
    placeholderMessage: 'Write your message here...',
    responseTimeNote: 'We will connect you with active matchmaking rooms in Discord',
  },
  {
    id: 'mentorship',
    label: 'Mentors, Judges & Workshop Leads',
    shortLabel: 'Mentorship / Judging',
    iconName: 'Award',
    badge: 'Expert Panel',
    description: 'Inquiries regarding mentorship participation, expert guidance, or evaluation coordination.',
    suggestedSubject: '',
    placeholderMessage: 'Write your message here...',
    responseTimeNote: 'Reviewed by the Advisory Panel',
  },
  {
    id: 'sponsorship',
    label: 'Sponsorships, Grants & Perks',
    shortLabel: 'Sponsors & Grants',
    iconName: 'Sparkles',
    badge: 'Partnerships',
    description: 'Organizations interested in providing developer tools, API credits, or participant perks.',
    suggestedSubject: '',
    placeholderMessage: 'Write your message here...',
    responseTimeNote: 'Priority response from the Organizing Committee',
  },
  {
    id: 'technical',
    label: 'Technical Support & Submission Help',
    shortLabel: 'Platform & Tech',
    iconName: 'Terminal',
    badge: 'Active During Event',
    description: 'Assistance with event access, community roles, or project submission portals.',
    suggestedSubject: '',
    placeholderMessage: 'Write your message here...',
    responseTimeNote: 'Urgent priority during the 25 December event',
  },
  {
    id: 'press',
    label: 'Press, Media & Community Outreach',
    shortLabel: 'Press & Media',
    iconName: 'Megaphone',
    badge: 'Media Kit',
    description: 'Journalists, student tech clubs, newsletters, and creators seeking event information or assets.',
    suggestedSubject: '',
    placeholderMessage: 'Write your message here...',
    responseTimeNote: 'Media kit dispatched promptly',
  },
];

export const organizerInfo = {
  sectionTitle: 'Connect with the Organizers',
  sectionSubtitle: 'Have a question, idea, or partnership proposal? Reach out directly to the Festive Christmas organizing team.',
  primaryEmail: 'yogeshsharma9425903357@gmail.com',
  organizer: {
    role: 'Organizer',
    name: 'Yogesh Sharma',
    email: 'yogeshsharma9425903357@gmail.com',
  },
  coOrganizer: {
    role: 'Co-Organizer',
    name: 'Harsh Parmar',
  },
  sprintDates: '25 December 2026',
  responseStandard: 'Direct email support',
  virtualHqLocation: 'Indore, Madhya Pradesh, India',
  activeCoverage: 'Active Support Desk',
};

export const verifiedChannels: OfficialChannel[] = [
  {
    id: 'channel-discord',
    name: 'Festive Christmas Discord',
    handle: 'discord.gg/festive-christmas-2026',
    url: 'https://discord.gg/festive-christmas-placeholder',
    type: 'discord',
    badge: 'Developer Community',
    isVerified: true,
    description: 'Live support desk, voice lounges, matchmaking bulletin, and real-time announcements.',
    buttonLabel: 'Join Official Discord',
  },
  {
    id: 'channel-github',
    name: 'Official GitHub Organization',
    handle: 'github.com/festive-christmas',
    url: 'https://github.com/festive-christmas',
    type: 'github',
    badge: 'Starters & Templates',
    isVerified: true,
    description: 'Open-source starter repositories, documentation, and submission guides.',
    buttonLabel: 'View GitHub Repos',
  },
  {
    id: 'channel-stream',
    name: 'Main Stage Stream',
    handle: 'youtube.com/@FestiveChristmasLive',
    url: 'https://youtube.com/@FestiveChristmasLive',
    type: 'stream',
    badge: 'Live Virtual Stream',
    isVerified: true,
    description: 'Opening keynote, mentor technical sessions, project showcase, and awards ceremony.',
    buttonLabel: 'Watch Live Channel',
  },
];

export const quickHelpLinks: QuickHelpLink[] = [
  {
    id: 'quick-faq',
    title: 'Frequently Asked Questions',
    href: '#faq',
    description: 'Common questions on eligibility, schedule, and participation guidelines.',
    iconName: 'HelpCircle',
    badge: 'FAQ Answers',
  },
  {
    id: 'quick-rules',
    title: 'Rules & Guidelines',
    href: '#rules',
    description: 'Review team size guidelines (1–4 builders), code freshness, and evaluation pillars.',
    iconName: 'FileText',
    badge: 'Event Rules',
  },
  {
    id: 'quick-tracks',
    title: 'Hackathon Tracks',
    href: '#tracks',
    description: 'Explore the 4 creative tracks and prepare your holiday build.',
    iconName: 'Compass',
    badge: '4 Tracks',
  },
  {
    id: 'quick-rules',
    title: 'Rules & Guide',
    href: '#rules',
    description: 'Participation criteria, team requirements, judging rubrics, and submission rules.',
    iconName: 'Calendar',
    badge: 'Eligibility',
  },
  {
    id: 'quick-prizes',
    title: 'Prizes & Awards',
    href: '#prizes',
    description: 'Gold, Silver, Bronze, and Other Awards revealed on event day.',
    iconName: 'Gift',
    badge: '4 Categories',
  },
];
