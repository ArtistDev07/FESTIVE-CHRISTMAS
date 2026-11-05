import React from 'react';
import { Sparkles, Building, ArrowRight, ExternalLink, Award } from 'lucide-react';
import { ExpertProfile } from '../../types/experts.ts';
import { ExpertPortrait } from './ExpertPortrait.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface FeaturedExpertProfileProps {
  profile: ExpertProfile;
  onViewDetails: (profile: ExpertProfile) => void;
}

export const FeaturedExpertProfile: React.FC<FeaturedExpertProfileProps> = ({
  profile,
  onViewDetails,
}) => {
  return (
    <div
      className="relative rounded-3xl border-2 border-[#E9C578]/50 bg-gradient-to-br from-[#184833] via-[#0E3425] to-[#071E16] p-7 sm:p-9 shadow-[0_16px_48px_rgba(4,20,15,0.85)] backdrop-blur-xl overflow-hidden"
      role="region"
      aria-labelledby={`featured-expert-${profile.id}`}
    >
      {/* Golden ribbon tag */}
      <div
        className="absolute top-4 right-6 sm:right-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C62835] to-[#EF4050] text-[#FFFFFF] border border-[#FFF4DF]/40 text-xs font-mono font-bold tracking-wider shadow-md"
        aria-hidden="true"
      >
        <Sparkles className="h-3 w-3 text-[#FFEA9F] animate-twinkle" />
        <span>FEATURED GUEST</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
        {/* Large Portrait */}
        <div className="shrink-0 flex flex-col items-center">
          <ExpertPortrait
            name={profile.displayName}
            src={profile.portrait}
            role={profile.role}
            size="xl"
          />
          <span className="mt-3 text-xs font-mono font-bold uppercase tracking-widest text-[#E9C578]">
            {profile.roleLabel}
          </span>
        </div>

        {/* Content Side */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
            <FestiveBadge variant="gold" size="sm">
              {profile.role === 'judge' ? 'Panel Judge' : 'Distinguished Mentor'}
            </FestiveBadge>

            {profile.featuredReason && (
              <span className="text-xs text-[#FFEA9F] font-sans-festive italic">
                · {profile.featuredReason}
              </span>
            )}
          </div>

          <h3
            id={`featured-expert-${profile.id}`}
            className="font-festive text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive"
          >
            {profile.displayName}
          </h3>

          <p className="font-serif-festive text-lg text-[#E9C578] font-medium mt-1">
            {profile.professionalTitle}
          </p>

          {profile.organization && (
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 text-sm text-[#D9ECF5]/80 font-sans-festive">
              <Building className="h-4 w-4 text-[#E9C578]/70" />
              <span>{profile.organization}</span>
            </div>
          )}

          <p className="mt-4 text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
            {profile.shortBiography}
          </p>

          {/* Key Expertise Tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="text-xs font-mono text-[#E9C578]/80 uppercase mr-1">Focus Areas:</span>
            {profile.expertise.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0A261D] border border-[#E9C578]/30 text-[#FFF4DF]"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              type="button"
              onClick={() => onViewDetails(profile)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#C62835] to-[#B31D2A] text-[#FFFFFF] border border-[#FFF4DF]/30 hover:from-[#E23444] hover:to-[#C62835] transition-all shadow-[0_4px_20px_rgba(198,40,53,0.35)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
            >
              <span>Explore Full Guidance & Bio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
