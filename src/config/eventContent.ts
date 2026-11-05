/**
 * Event Content Configuration for Festive Christmas
 * Phase 3: Core Event Narrative, About, Why Participate, and How It Works.
 * Fully typed and centrally editable.
 */

export interface BenefitCardContent {
  id: string;
  title: string;
  description: string;
  iconName: 'spark' | 'hammer' | 'users' | 'sparkles';
  accentColor: string;
}

export interface JourneyMilestoneContent {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  iconName: 'lantern' | 'signpost' | 'workshop' | 'star';
  stageName: string;
}

export interface EventStorytellingContent {
  overview: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    supportingLine: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    supportingStatement: string;
  };
  whyParticipate: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    cards: BenefitCardContent[];
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    description: string;
    milestones: JourneyMilestoneContent[];
  };
}

export const eventContent: EventStorytellingContent = {
  overview: {
    eyebrow: 'A HOLIDAY EXPERIENCE LIKE NO OTHER',
    heading: 'More Than a Christmas Celebration',
    paragraph:
      'Festive Christmas brings creative minds together for a festive hackathon filled with imagination, collaboration, experimentation, and the excitement of building something extraordinary.',
    supportingLine: 'Dream it. Build it. Share the magic.',
  },
  about: {
    eyebrow: 'THE STORY BEHIND THE MAGIC',
    heading: 'An Idea Can Change Everything',
    paragraph1:
      'Great ideas often begin with a simple question: what if? Festive Christmas creates a space where curiosity meets creativity, where people exchange ideas, experiment with technology, and turn ambitious thoughts into meaningful projects.',
    paragraph2:
      'Whether you enjoy coding, designing, solving problems, or bringing people together, the spirit of the hackathon is simple: learn by doing, build together, and make something worth sharing.',
    supportingStatement:
      'Bring your curiosity. Bring your creativity. Bring your holiday spirit.',
  },
  whyParticipate: {
    eyebrow: 'MAKE THIS SEASON COUNT',
    heading: 'A Little Magic. A Lot of Possibility.',
    paragraph:
      'Every great project starts somewhere. Bring your ideas, discover new perspectives, work with others, and turn a spark of inspiration into something real.',
    cards: [
      {
        id: 'benefit-create',
        title: 'Create Something Real',
        description:
          'Turn an idea into a working concept, prototype, or project you can share with others.',
        iconName: 'spark',
        accentColor: '#EF4050',
      },
      {
        id: 'benefit-learn',
        title: 'Learn by Building',
        description:
          'Experiment with tools, explore fresh approaches, and learn through hands-on problem-solving.',
        iconName: 'hammer',
        accentColor: '#E9C578',
      },
      {
        id: 'benefit-collaborate',
        title: 'Collaborate and Connect',
        description:
          'Exchange perspectives, work through challenges together, and discover what collaboration can unlock.',
        iconName: 'users',
        accentColor: '#25A18E',
      },
      {
        id: 'benefit-share',
        title: 'Share Your Creativity',
        description:
          'Give your ideas a stage, explain what you have built, and celebrate the work behind the final result.',
        iconName: 'sparkles',
        accentColor: '#FFD700',
      },
    ],
  },
  howItWorks: {
    eyebrow: 'FROM FIRST IDEA TO FESTIVE CREATION',
    heading: 'Your Journey Into the Magic',
    description:
      "Every memorable project begins with a first step. Here's a simple way to think about your hackathon journey.",
    milestones: [
      {
        id: 'milestone-1',
        stepNumber: '01',
        title: 'Get Inspired',
        description:
          'Explore the event, discover the creative possibilities, and decide what you want to build.',
        iconName: 'lantern',
        stageName: 'Exploration Stage',
      },
      {
        id: 'milestone-2',
        stepNumber: '02',
        title: 'Find Your Direction',
        description:
          'Develop your concept, think through the problem, and identify the skills or tools your idea may need.',
        iconName: 'signpost',
        stageName: 'Ideation Stage',
      },
      {
        id: 'milestone-3',
        stepNumber: '03',
        title: 'Build Together',
        description:
          'Turn your concept into a working project through experimentation, collaboration, and iteration.',
        iconName: 'workshop',
        stageName: 'Building Stage',
      },
      {
        id: 'milestone-4',
        stepNumber: '04',
        title: 'Share the Magic',
        description:
          'Present what you have created, reflect on what you learned, and celebrate the effort behind your work.',
        iconName: 'star',
        stageName: 'Celebration Stage',
      },
    ],
  },
};
