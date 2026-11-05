import { HackathonTrack, ProjectChallenge } from '../types/tracksChallenges.ts';

export const tracksIntroContent = {
  eyebrow: 'CHOOSE YOUR CREATIVE ADVENTURE',
  heading: 'Four Paths to Christmas Magic',
  paragraph:
    'From clever code to imaginative experiences, discover a direction for your next big idea. Choose a track that sparks your curiosity and turn inspiration into something worth building.',
  supportingLabel: 'Explore the tracks. Discover a challenge. Start creating.',
};

export const challengesIntroContent = {
  eyebrow: 'YOUR NEXT GREAT IDEA STARTS HERE',
  heading: 'Find Your Challenge',
  paragraph:
    'Explore a collection of illustrative project prompts to help you get started. Use them as inspiration, develop your own direction, and build something meaningful.',
};

/**
 * Event-Day Challenge Reveal Flag
 * Set to true when organizers are ready to publish official problem statements on event day.
 * Default: false (displays the festive Coming Soon announcement panel).
 */
export const areChallengesRevealed: boolean = false;

export const challengeAnnouncementContent = {
  mainHeading: 'The Magic of Challenges Is Coming',
  supportingText:
    'The official problem statements will be revealed on event day. Get ready to explore the challenges and start building.',
  highlightMessage: 'OFFICIAL CHALLENGES REVEALED ON EVENT DAY',
};

export const hackathonTracks: HackathonTrack[] = [
  {
    id: 'ai-magic',
    number: '01',
    title: 'AI & Magic of Intelligence',
    tagline: 'Imagine smarter possibilities.',
    description:
      'Explore artificial intelligence, machine learning, generative experiences, intelligent assistants, and creative ways to transform ideas into useful solutions.',
    accentColor: '#D9ECF5',
    accentBg: 'rgba(217, 236, 245, 0.12)',
    iconName: 'brain',
    challengeIds: ['ch-01', 'ch-02'],
    officialStatus: 'sample',
  },
  {
    id: 'web-apps',
    number: '02',
    title: 'Web, App & Digital Experiences',
    tagline: 'Build something people love.',
    description:
      'Create engaging websites, applications, digital products, and interactive experiences that solve problems or bring new ideas to life.',
    accentColor: '#EF4050',
    accentBg: 'rgba(239, 64, 80, 0.12)',
    iconName: 'device',
    challengeIds: ['ch-03', 'ch-04'],
    officialStatus: 'sample',
  },
  {
    id: 'climate-community',
    number: '03',
    title: 'Climate, Community & Good',
    tagline: 'Make your ideas matter.',
    description:
      'Explore technology-inspired ideas for sustainability, accessibility, education, community participation, and positive social impact.',
    accentColor: '#25A18E',
    accentBg: 'rgba(37, 161, 142, 0.12)',
    iconName: 'leaf',
    challengeIds: ['ch-05', 'ch-06'],
    officialStatus: 'sample',
  },
  {
    id: 'open-innovation',
    number: '04',
    title: 'Open Innovation & Creative Experiments',
    tagline: 'Build beyond the expected.',
    description:
      'Experiment across disciplines, combine unexpected ideas, and create something that does not fit neatly into a single category.',
    accentColor: '#FFD700',
    accentBg: 'rgba(255, 215, 0, 0.12)',
    iconName: 'sparkles',
    challengeIds: ['ch-07', 'ch-08'],
    officialStatus: 'sample',
  },
];

export const projectChallenges: ProjectChallenge[] = [];
