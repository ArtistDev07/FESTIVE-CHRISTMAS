import React from 'react';
import { ChristmasIntro } from '../components/intro/ChristmasIntro.tsx';
import { ChristmasHero } from '../components/hero/ChristmasHero.tsx';
import { FestiveHeader } from '../components/header/FestiveHeader.tsx';
import { HeroToContentTransition } from '../components/sections/HeroToContentTransition.tsx';
import { EventOverviewSection } from '../components/sections/EventOverviewSection.tsx';
import { AboutHackathonSection } from '../components/sections/AboutHackathonSection.tsx';
import { WhyParticipateSection } from '../components/sections/WhyParticipateSection.tsx';
import { NextSectionTransition } from '../components/sections/NextSectionTransition.tsx';
import { TracksChallengesSection } from '../components/sections/TracksChallengesSection.tsx';
import { EventTimelineSection } from '../components/sections/EventTimelineSection.tsx';
import { RulesSection } from '../components/sections/RulesSection.tsx';
import { PrizesAwardsSection } from '../components/sections/PrizesAwardsSection.tsx';
import { SponsorsPartnersSection } from '../components/sections/SponsorsPartnersSection.tsx';
import { ExpertsSection } from '../components/sections/ExpertsSection.tsx';
import { ExpertsToNextTransition } from '../components/sections/ExpertsToNextTransition.tsx';
import { FAQSection } from '../components/sections/FAQSection.tsx';
import { FAQToNextTransition } from '../components/sections/FAQToNextTransition.tsx';
import { ContactSection } from '../components/sections/ContactSection.tsx';
import { ContactToFooterTransition } from '../components/sections/ContactToFooterTransition.tsx';
import { FestiveFooter } from '../components/footer/FestiveFooter.tsx';
import { SnowfallCursorTrail } from '../components/effects/SnowfallCursorTrail.tsx';
import { useIntroSequence } from '../hooks/useIntroSequence.ts';

export const LandingPage: React.FC = () => {
  const { isIntroActive, isIntroExiting, completeIntro, replayIntro } = useIntroSequence();

  return (
    <div className="relative min-h-[100svh] w-full bg-[#09271E] text-[#FFF4DF] overflow-x-hidden selection:bg-[#C62835] selection:text-[#FFFFFF]">
      {/* Subtle snowfall mouse pointer sparkle trail */}
      <SnowfallCursorTrail />

      {/* Component A: Magical Opening Loader Sequence */}
      {isIntroActive && (
        <ChristmasIntro onComplete={completeIntro} isExiting={isIntroExiting} />
      )}

      {/* Phase 2: Festive Website Header with Navigation & Registration CTA Link */}
      {(!isIntroActive || isIntroExiting) && (
        <FestiveHeader activeSectionId="nav-home" />
      )}

      {/* Component B: Cinematic Christmas Hero */}
      <ChristmasHero onReplayIntro={replayIntro} />

      {/* Phase 3 — Section A: Hero-to-Content Transition */}
      <HeroToContentTransition />

      {/* Phase 3 — Section B: Event Overview */}
      <EventOverviewSection />

      {/* Phase 3 — Section C: About the Hackathon */}
      <AboutHackathonSection />

      {/* Phase 3 — Section D: Why Participate */}
      <WhyParticipateSection />

      {/* Phase 3 — Section F: Transition Bridge */}
      <NextSectionTransition />

      {/* Phase 4 — Hackathon Tracks, Challenge Categories & Project Discovery */}
      <TracksChallengesSection />

      {/* Phase 5 — Event Timeline & Execution Schedule (8-Hour Building Sprint) */}
      <EventTimelineSection />

      {/* Phase 5 — Rules & Eligibility Rubrics */}
      <RulesSection />

      {/* Phase 6 — Prizes, Awards & Recognition */}
      <PrizesAwardsSection />

      {/* Phase 7 — Sponsors, Community Partners & Additional Partners Galleries */}
      <SponsorsPartnersSection />

      {/* Phase 8 — Mentors, Judges & Volunteers Community Galleries */}
      <ExpertsSection />

      {/* Phase 8 — Visual Transition into Next Section */}
      <ExpertsToNextTransition />

      {/* Phase 9 — Frequently Asked Questions & Event Help */}
      <FAQSection />

      {/* Phase 9 — Visual Transition into Next Section */}
      <FAQToNextTransition />

      {/* Phase 10 — Contact & Organizer Connection */}
      <ContactSection />

      {/* Phase 10 — Visual Transition into the Future Footer */}
      <ContactToFooterTransition />

      {/* Phase 11 — Complete Global Footer, Navigation & Closing Experience */}
      <FestiveFooter />
    </div>
  );
};
