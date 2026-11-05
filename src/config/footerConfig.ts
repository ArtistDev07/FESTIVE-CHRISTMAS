/**
 * Footer Configuration for Festive Christmas
 * Phase 11: Complete Global Footer, Navigation, Verified Links & Closing Experience
 */

import { eventConfig } from './eventConfig.ts';
import { organizerInfo, verifiedChannels } from './contactConfig.ts';

export interface FooterNavigationLink {
  id: string;
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface FooterNavigationGroup {
  id: string;
  title: string;
  links: FooterNavigationLink[];
}

export interface FooterSocialLink {
  id: string;
  label: string;
  url: string;
  type: 'discord' | 'github' | 'stream' | 'email';
  handle?: string;
  badge?: string;
}

export const footerConfig = {
  brandName: 'Festive Christmas',
  brandTagline: 'Global Winter Hackathon 2026',
  closingHeadline: 'Keep the Magic Alive',
  closingDescription:
    'A world of ideas, collaboration, and festive creativity. Thank you for being part of the Festive Christmas journey as we build extraordinary things for the winter season.',
  eventStatusNote:
    'Registration is currently open for the one-day, 8-hour mini hackathon taking place 25 December 2026 (09:00 AM – 05:00 PM IST).',

  navigationGroups: [
    {
      id: 'footer-nav-explore',
      title: 'Explore',
      links: [
        { id: 'f-home', label: 'Home', href: '#home' },
        { id: 'f-about', label: 'About the Hackathon', href: '#about' },
        { id: 'f-schedule', label: '8-Hour Schedule', href: '#schedule' },
        { id: 'f-overview', label: 'Event Overview', href: '#event-overview' },
        { id: 'f-tracks', label: 'Tracks & Challenges', href: '#tracks' },
      ],
    },
    {
      id: 'footer-nav-experience',
      title: 'The Experience',
      links: [
        { id: 'f-register', label: 'Team Registration', href: '/register' },
        { id: 'f-rules', label: 'Rules & Eligibility', href: '#rules' },
        { id: 'f-prizes', label: 'Prizes & Awards', href: '#prizes' },
        { id: 'f-sponsors', label: 'Sponsors & Partners', href: '#sponsors' },
      ],
    },
    {
      id: 'footer-nav-community',
      title: 'Community',
      links: [
        { id: 'f-mentors', label: 'Mentors', href: '#mentors' },
        { id: 'f-judges', label: 'Judges', href: '#judges' },
        { id: 'f-faq', label: 'Frequently Asked Questions', href: '#faq' },
        { id: 'f-contact', label: 'Contact Organizers', href: '#contact' },
      ],
    },
  ] as FooterNavigationGroup[],

  socialChannels: [
    {
      id: 'social-discord',
      label: 'Discord Community',
      url: eventConfig.discordUrl,
      type: 'discord',
      handle: 'discord.gg/festive-christmas-2026',
      badge: 'Developer Community',
    },
    {
      id: 'social-github',
      label: 'GitHub Organization',
      url: eventConfig.githubUrl,
      type: 'github',
      handle: 'github.com/festive-christmas',
      badge: 'Open Source',
    },
    {
      id: 'social-stream',
      label: 'Solstice Live Broadcast',
      url: 'https://youtube.com/@FestiveChristmasLive',
      type: 'stream',
      handle: '@FestiveChristmasLive',
      badge: 'Keynotes & Demos',
    },
    {
      id: 'social-email',
      label: 'Official Desk Email',
      url: `mailto:${organizerInfo.primaryEmail}`,
      type: 'email',
      handle: organizerInfo.primaryEmail,
      badge: 'Verified',
    },
  ] as FooterSocialLink[],

  copyrightOwner: 'Festive Christmas Hackathon Committee',
  dedication: 'Crafted with winter wonder & holiday spirit for builders worldwide.',
  backToTopThreshold: 450,
  backToTopTarget: '#home',
};
