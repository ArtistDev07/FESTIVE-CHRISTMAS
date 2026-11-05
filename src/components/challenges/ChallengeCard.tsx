import React from 'react';
import { ArrowRight, Lightbulb, Compass } from 'lucide-react';
import { ProjectChallenge } from '../../types/tracksChallenges.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface ChallengeCardProps {
  challenge: ProjectChallenge;
  onView: (challenge: ProjectChallenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onView }) => {
  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl border border-[#E9C578]/30 bg-[#09271E]/85 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E9C578] hover:shadow-[0_12px_30px_rgba(4,20,15,0.7)]"
      role="article"
      aria-labelledby={`challenge-title-${challenge.id}`}
    >
      <div>
        {/* Top Meta: Number & Sample Idea Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/15">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 text-[11px] font-mono font-bold text-[#E9C578]">
              {challenge.number}
            </span>
            <span className="text-xs font-mono tracking-wider text-[#D9ECF5]/70 uppercase">
              {challenge.type}
            </span>
          </div>

          <FestiveBadge variant="ice" size="sm">
            SAMPLE IDEA
          </FestiveBadge>
        </div>

        {/* Associated Track Tag */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#E9C578]">
          <Compass className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium tracking-wide">{challenge.trackTitle}</span>
        </div>

        {/* Challenge Title */}
        <h3
          id={`challenge-title-${challenge.id}`}
          className="mt-2 font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors"
        >
          {challenge.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
          {challenge.description}
        </p>
      </div>

      {/* Action Button: View Challenge */}
      <div className="mt-5 pt-3.5 border-t border-[#E9C578]/15 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onView(challenge)}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E9C578] hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E9C578] cursor-pointer"
          aria-label={`View Challenge ${challenge.number}: ${challenge.title}`}
        >
          <span>View Challenge</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
