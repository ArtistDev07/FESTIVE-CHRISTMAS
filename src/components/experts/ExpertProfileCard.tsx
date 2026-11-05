import React from 'react';
import { Building, ArrowRight, ExternalLink, Sparkles, BookOpen, Scale, Award } from 'lucide-react';
import { ExpertProfile } from '../../types/experts.ts';
import { ExpertPortrait } from './ExpertPortrait.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface ExpertProfileCardProps {
  profile: ExpertProfile;
  onViewDetails: (profile: ExpertProfile) => void;
}

export const ExpertProfileCard: React.FC<ExpertProfileCardProps> = ({
  profile,
  onViewDetails,
}) => {
  const isJudge = profile.role === 'judge';
  const isMentorAndJudge = profile.role === 'mentor-and-judge';

  const getRoleIcon = () => {
    if (isJudge) return <Scale className="h-3 w-3 text-[#E9C578]" />;
    if (isMentorAndJudge) return <Award className="h-3 w-3 text-[#FFEA9F]" />;
    return <BookOpen className="h-3 w-3 text-[#88D4B0]" />;
  };

  return (
    <div
      className="group relative flex flex-col justify-between rounded-3xl border border-[#E9C578]/25 bg-gradient-to-b from-[#0E3426] via-[#09261D] to-[#061C14] p-6 shadow-[0_8px_30px_rgba(4,20,15,0.7)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E9C578]/60 hover:shadow-[0_16px_40px_rgba(233,197,120,0.18)]"
      role="article"
      aria-labelledby={`expert-name-${profile.id}`}
    >
      {/* Top Identity Block */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <ExpertPortrait
            name={profile.displayName}
            src={profile.portrait}
            role={profile.role}
            size="md"
          />

          <div className="flex flex-col items-end gap-1">
            <FestiveBadge
              variant={isJudge ? 'gold' : isMentorAndJudge ? 'gold' : 'evergreen'}
              size="sm"
              icon={getRoleIcon()}
            >
              {profile.roleLabel}
            </FestiveBadge>

            {profile.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFEA9F]">
                <Sparkles className="h-2.5 w-2.5" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Name and Professional Title */}
        <h4
          id={`expert-name-${profile.id}`}
          className="font-festive text-xl sm:text-2xl font-bold text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors"
        >
          {profile.displayName}
        </h4>

        <p className="font-serif-festive text-sm text-[#E9C578] font-medium mt-1 leading-snug">
          {profile.professionalTitle}
        </p>

        {profile.organization && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#D9ECF5]/75 font-sans-festive">
            <Building className="h-3 w-3 text-[#E9C578]/60 shrink-0" />
            <span className="truncate">{profile.organization}</span>
          </div>
        )}

        {/* Short Biography */}
        <p className="mt-3.5 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed line-clamp-3">
          {profile.shortBiography}
        </p>
      </div>

      {/* Bottom Block: Expertise Tags and View Profile Action */}
      <div className="mt-6 pt-4 border-t border-[#E9C578]/15">
        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.expertise.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-sans font-medium bg-[#123D2B]/90 border border-[#E9C578]/20 text-[#FFF4DF]/90"
            >
              {tag}
            </span>
          ))}
          {profile.expertise.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#E9C578]/70">
              +{profile.expertise.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onViewDetails(profile)}
          className="w-full inline-flex items-center justify-between gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#072017] text-[#FFF4DF] border border-[#E9C578]/30 hover:bg-[#123D2B] hover:border-[#E9C578] transition-all cursor-pointer group-hover:border-[#E9C578]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
          aria-label={`View full profile for ${profile.displayName}`}
        >
          <span>View Profile & Guidance</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#E9C578] transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
