import React from 'react';
import { Award, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Award as AwardType } from '../../types/awards.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { AwardIllustration } from '../illustrations/AwardIllustration.tsx';

interface FeaturedPrizeCardProps {
  award: AwardType;
  onViewDetails: (award: AwardType) => void;
  isGrand?: boolean;
}

export const FeaturedPrizeCard: React.FC<FeaturedPrizeCardProps> = ({
  award,
  onViewDetails,
  isGrand = false,
}) => {
  const isConfirmed = award.officialStatus === 'confirmed';

  if (isGrand) {
    return (
      <div
        className="group relative rounded-3xl border-2 border-[#E9C578] bg-gradient-to-b from-[#184833] via-[#0D3425] to-[#071E16] p-7 sm:p-9 shadow-[0_16px_48px_rgba(4,20,15,0.85)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(233,197,120,0.35)]"
        role="article"
        aria-labelledby={`award-title-${award.id}`}
      >
        {/* Festive Golden Ribbon Corner Ornament */}
        <div
          className="absolute -top-3.5 right-8 rounded-full border border-[#FFF4DF] bg-gradient-to-r from-[#C62835] to-[#EF4050] px-4 py-1 text-xs font-mono font-bold tracking-wider text-[#FFFFFF] shadow-md flex items-center gap-1.5"
          aria-hidden="true"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#FFEA9F] animate-twinkle" />
          <span>PREMIER GRAND AWARD</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E9C578]/25">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123D2B] to-[#071E16] border border-[#E9C578]/50 shadow-inner">
              <AwardIllustration category={award.category} size="lg" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <FestiveBadge variant="gold" size="sm">
                  {award.categoryLabel}
                </FestiveBadge>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E9C578]/90 font-bold">
                  {isConfirmed ? 'CONFIRMED AWARD' : 'PROPOSED AWARD'}
                </span>
              </div>

              <h3
                id={`award-title-${award.id}`}
                className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive"
              >
                {award.title}
              </h3>

              {award.tagline && (
                <p className="mt-1 font-serif-festive text-sm sm:text-base text-[#E9C578]/90 italic">
                  "{award.tagline}"
                </p>
              )}
            </div>
          </div>

          {/* Grand Value Pill */}
          <div className="flex flex-col items-start lg:items-end justify-center rounded-2xl border border-[#E9C578]/40 bg-[#09271E]/90 px-6 py-4 shadow-inner shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E9C578]">
              Award Grant & Honor
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] text-shadow-gold">
              {award.rewardValue}
            </span>
            <span className="text-xs text-[#FFF4DF]/70 font-sans-festive">
              + Crystal Solstice Trophy
            </span>
          </div>
        </div>

        {/* Narrative & Details */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <p className="text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
              {award.description}
            </p>

            {award.details && award.details.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#FFF4DF]">
                {award.details.slice(0, 4).map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E9C578] font-bold mt-0.5">✦</span>
                    <span className="font-sans-festive leading-snug">{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col justify-end items-stretch lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E9C578]/15">
            <button
              type="button"
              onClick={() => onViewDetails(award)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C62835] to-[#EF4050] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFFFFF] shadow-[0_4px_18px_rgba(198,40,53,0.5)] hover:scale-[1.02] hover:brightness-110 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
              aria-label={`View award details for ${award.title}`}
            >
              <span>View Award Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Secondary Award Card
  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl border border-[#E9C578]/25 bg-[#09271E]/90 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E9C578] hover:shadow-[0_12px_28px_rgba(4,20,15,0.7)]"
      role="article"
      aria-labelledby={`award-title-${award.id}`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E9C578]/15">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#123D2B] border border-[#E9C578]/30">
              <AwardIllustration category={award.category} size="sm" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#E9C578]">
                {award.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {isConfirmed ? (
                  <span className="text-[10px] font-mono text-[#25A18E] font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    CONFIRMED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#E9C578] font-bold flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    PROPOSED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Reward Amount Badge */}
          <div className="text-right">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#FFFFFF]">
              {award.rewardValue}
            </span>
          </div>
        </div>

        {/* Award Title */}
        <h4
          id={`award-title-${award.id}`}
          className="mt-4 font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors"
        >
          {award.title}
        </h4>

        {award.tagline && (
          <p className="mt-1 font-serif-festive text-xs text-[#E9C578]/80 italic">
            "{award.tagline}"
          </p>
        )}

        {/* Narrative Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed line-clamp-3">
          {award.description}
        </p>
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 pt-3 border-t border-[#E9C578]/15 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#D9ECF5]/60 uppercase tracking-wider">
          {award.rewardType}
        </span>

        <button
          type="button"
          onClick={() => onViewDetails(award)}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E9C578] hover:text-[#FFFFFF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E9C578]"
          aria-label={`View award details for ${award.title}`}
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
