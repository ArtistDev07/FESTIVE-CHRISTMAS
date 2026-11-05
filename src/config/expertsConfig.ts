/**
 * Mentors, Judges & Expert Community Configuration
 * Phase 8: Central single-source-of-truth for hackathon experts.
 * Strictly adheres to verification and publication status requirements.
 */

import { ExpertProfile, ExpertsIntroContent } from '../types/experts.ts';

export const expertsIntroContent: ExpertsIntroContent = {
  eyebrow: 'EXPERIENCE MEETS IMAGINATION',
  heading: 'Meet the Minds Behind the Magic',
  paragraph:
    'Great ideas grow through shared knowledge, thoughtful feedback, and fresh perspectives. Discover the experts and community members connected with Festive Christmas.',
  mentorsSection: {
    eyebrow: 'GUIDANCE FOR GREAT IDEAS',
    heading: 'Learn from Experience',
    paragraph:
      'Explore the people who may help teams think through challenges, discover new approaches, and develop their ideas.',
    emptyTitle: 'Our mentoring community is taking shape.',
    emptySubtitle: 'Confirmed mentor profiles will appear here as they become available.',
  },
  judgesSection: {
    eyebrow: 'CELEBRATING IDEAS WORTH SHARING',
    heading: 'Meet the People Evaluating Innovation',
    paragraph:
      'Discover the professionals and experts selected to review projects and recognize outstanding work at Festive Christmas.',
    emptyTitle: 'The judging panel will be introduced soon.',
    emptySubtitle: 'Official judge profiles will appear here after they are confirmed for the event.',
  },
};

/**
 * Official Verified Profiles List
 * Strictly distinguishes draft, proposed, confirmed, and published states.
 * Real verified profiles approved by the organizing committee are maintained here.
 */
export const officialProfilesList: ExpertProfile[] = [
  // When real individuals are officially verified and approved for publication,
  // their records are placed here with verificationStatus: 'confirmed' & publicationStatus: 'published'.
];

/**
 * Sample / Illustrative Profiles (Empty by default)
 * Real profiles approved by the organizing committee are placed in officialProfilesList.
 */
export const sampleVerificationProfiles: ExpertProfile[] = [];
