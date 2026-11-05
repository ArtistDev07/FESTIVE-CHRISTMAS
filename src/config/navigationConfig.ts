/**
 * Navigation Configuration for Festive Christmas
 * Single-source-of-truth for desktop and mobile navigation hierarchies.
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isAvailable: boolean;
  phaseRequirement?: string;
  isExternal?: boolean;
  children?: NavigationItem[];
  description?: string;
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'nav-home',
    label: 'Home',
    href: '#home',
    isAvailable: true,
  },
  {
    id: 'nav-hackathon',
    label: 'The Hackathon',
    href: '#about',
    isAvailable: true,
    children: [
      {
        id: 'nav-about',
        label: 'About the Event',
        href: '#about',
        isAvailable: true,
        description: 'Explore the 8-hour festive mini hackathon mission and community ethos.',
      },
      {
        id: 'nav-schedule',
        label: 'Schedule & Timeline',
        href: '#schedule',
        isAvailable: true,
        description: '8-Hour execution timeline from 09:00 AM to 05:00 PM.',
      },
      {
        id: 'nav-rules',
        label: 'Rules & Eligibility',
        href: '#rules',
        isAvailable: true,
        description: 'Team sizes, code freshness policies, and judging rubrics.',
      },
      {
        id: 'nav-register',
        label: 'Register Team',
        href: '/register',
        isAvailable: true,
        description: 'Multi-step team registration & ₹400 entry slot.',
      },
      {
        id: 'nav-mentors',
        label: 'Mentors & Judges',
        href: '#mentors',
        isAvailable: true,
        description: 'Meet industry mentors, challenge advisors, and judging panels.',
      },
    ],
  },
  {
    id: 'nav-schedule-direct',
    label: 'Schedule',
    href: '#schedule',
    isAvailable: true,
  },
  {
    id: 'nav-tracks',
    label: 'Tracks',
    href: '#tracks',
    isAvailable: true,
  },
  {
    id: 'nav-prizes',
    label: 'Prizes',
    href: '#prizes',
    isAvailable: true,
  },
  {
    id: 'nav-sponsors',
    label: 'Sponsors',
    href: '#sponsors',
    isAvailable: true,
  },
  {
    id: 'nav-faq',
    label: 'FAQ',
    href: '#faq',
    isAvailable: true,
  },
  {
    id: 'nav-contact',
    label: 'Contact',
    href: '#contact',
    isAvailable: true,
  },
];
