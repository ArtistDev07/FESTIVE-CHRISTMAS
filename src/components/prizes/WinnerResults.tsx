import React from 'react';
import { Lock, Sparkles, Clock, Trophy, Award, Gift } from 'lucide-react';
import { winnerResultsState } from '../../config/awardsConfig.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const WinnerResults: React.FC = () => {
  const {
    announcementStatus,
    unrevealedTitle,
    unrevealedDescription,
    officialClosingCeremony,
    publishedResults,
  } = winnerResultsState;

  // State 2: Results published (if verified results exist)
  if (announcementStatus === 'published' && publishedResults.length > 0) {
    return (
      <div className="mt-14 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <FestiveBadge variant="gold" size="sm" className="mb-2">
            OFFICIAL RESULTS
          </FestiveBadge>
          <h3 className="font-festive text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
            Celebrating Our 2026 Champions
          </h3>
          <p className="text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive mt-2">
            Congratulations to the winning teams and visionary creators of Festive Christmas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedResults.map((result) => (
            <div
              key={result.id}
              className="rounded-2xl border border-[#E9C578]/35 bg-[#09271E]/90 p-6 shadow-md backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/20">
                <span className="text-xs font-mono font-bold text-[#E9C578]">
                  {result.awardTitle}
                </span>
                <Trophy className="h-4 w-4 text-[#E9C578]" />
              </div>
              <h4 className="mt-3 font-serif-festive text-xl font-bold text-[#FFFFFF]">
                {result.projectTitle}
              </h4>
              <p className="text-xs text-[#E9C578] font-mono mt-0.5">
                by {result.teamName || result.winnerDisplayName}
              </p>
              {result.projectDescription && (
                <p className="mt-2 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive">
                  {result.projectDescription}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // State 1: Results not published (Under wraps prior to conclusion)
  return (
    <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
      <ScrollReveal animation="scale-up" delay={150}>
        <div className="relative rounded-3xl border border-[#E9C578]/35 bg-gradient-to-b from-[#123D2B]/80 via-[#09271E]/95 to-[#071E16] p-7 sm:p-9 text-center shadow-[0_16px_40px_rgba(4,20,15,0.7)] backdrop-blur-xl overflow-hidden">
          {/* Subtle holiday ribbon cross behind */}
          <div
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-radial from-[#E9C578]/15 via-transparent to-transparent blur-2xl"
            aria-hidden="true"
          />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#09271E] border border-[#E9C578]/40 shadow-inner text-[#E9C578] mb-4">
            <Lock className="h-6 w-6 text-[#E9C578]" />
          </div>

          <FestiveBadge variant="gold" size="sm" className="mb-3">
            HONOR ROLL PREVIEW
          </FestiveBadge>

          <h3 className="font-festive text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFFFFF] text-shadow-festive">
            {unrevealedTitle}
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-xl mx-auto">
            {unrevealedDescription}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E9C578]/30 bg-[#072017]/90 px-4 py-2 text-xs text-[#E9C578] font-mono shadow-sm">
            <Clock className="h-3.5 w-3.5 text-[#E9C578]" />
            <span>{officialClosingCeremony}</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
