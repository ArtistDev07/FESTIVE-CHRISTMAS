import React from 'react';
import { Sparkles } from 'lucide-react';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ChallengeComingSoonPanel } from './ChallengeComingSoonPanel.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { challengesIntroContent } from '../../config/tracksChallenges.ts';

export const ChallengeDiscovery: React.FC = () => {
  return (
    <div id="challenges" className="mt-24 sm:mt-32 scroll-mt-24">
      {/* Section Introduction Header */}
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
        <ScrollReveal animation="fade-up" delay={50}>
          <FestiveBadge
            variant="gold"
            icon={<Sparkles className="h-3 w-3 text-[#E9C578]" />}
            className="mb-4"
          >
            {challengesIntroContent.eyebrow}
          </FestiveBadge>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <h2 className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]">
            {challengesIntroContent.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={250}>
          <p className="mt-4 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
            {challengesIntroContent.paragraph}
          </p>
        </ScrollReveal>
      </div>

      {/* Official Announcement Panel — Keeps problem statements protected until event day */}
      <ChallengeComingSoonPanel />
    </div>
  );
};
