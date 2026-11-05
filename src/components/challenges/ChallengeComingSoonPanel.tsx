import React from 'react';
import { Sparkles, Calendar, Lock } from 'lucide-react';
import { SealedChallengeLetter } from '../illustrations/SealedChallengeLetter.tsx';
import { challengeAnnouncementContent } from '../../config/tracksChallenges.ts';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const ChallengeComingSoonPanel: React.FC = () => {
  return (
    <div className="mt-12 sm:mt-16 mx-auto max-w-2xl px-4">
      <ScrollReveal animation="fade-up" delay={200}>
        <div className="relative rounded-3xl border border-[#E9C578]/40 bg-gradient-to-b from-[#0B2A1E]/95 via-[#072017]/95 to-[#051811] p-8 sm:p-12 text-center shadow-[0_16px_48px_rgba(4,20,15,0.75)] backdrop-blur-xl">
          {/* Subtle Golden Corner Flourishes */}
          <div className="pointer-events-none absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 border-[#E9C578] rounded-tl-xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 border-[#E9C578] rounded-tr-xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 border-[#E9C578] rounded-bl-xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-6 w-6 border-b-2 border-r-2 border-[#E9C578] rounded-br-xl" aria-hidden="true" />

          {/* Central Sealed Letter Illustration */}
          <div className="mx-auto flex justify-center items-center mb-6 max-w-xs">
            <SealedChallengeLetter className="max-h-36 drop-shadow-[0_8px_20px_rgba(233,197,120,0.18)]" />
          </div>

          {/* Highlight Message Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9C578]/40 bg-[#061811]/90 px-4 py-1.5 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#FFD700] shadow-inner mb-4">
            <Lock className="h-3.5 w-3.5 text-[#E9C578]" />
            <span>{challengeAnnouncementContent.highlightMessage}</span>
            <Sparkles className="h-3 w-3 text-[#FFF4DF] animate-twinkle" />
          </div>

          {/* Main Heading */}
          <h3 className="font-serif-festive text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive">
            {challengeAnnouncementContent.mainHeading}
          </h3>

          {/* Supporting Text */}
          <p className="mt-4 text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-lg mx-auto">
            {challengeAnnouncementContent.supportingText}
          </p>

          {/* Decorative Solstice Star Footnote */}
          <div className="mt-8 pt-6 border-t border-[#E9C578]/15 flex items-center justify-center gap-3 text-xs font-mono text-[#E9C578]/75">
            <Calendar className="h-3.5 w-3.5 text-[#E9C578]" />
            <span>Official Reveal on Event Day • 25 December 2026</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
