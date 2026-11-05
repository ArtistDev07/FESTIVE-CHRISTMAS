import React from 'react';
import { AwardCategory } from '../../types/awards.ts';
import { AwardIllustration } from '../illustrations/AwardIllustration.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface AwardCategoryCardProps {
  category: AwardCategory;
  onExplore?: (cat: AwardCategory) => void;
}

export const AwardCategoryCard: React.FC<AwardCategoryCardProps> = ({
  category,
}) => {
  const isConfirmed = category.officialStatus === 'confirmed';

  return (
    <div
      className="group relative flex flex-col justify-between rounded-2xl border border-[#E9C578]/25 bg-[#071E16]/85 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E9C578] hover:shadow-[0_12px_28px_rgba(4,20,15,0.7)]"
      role="article"
      aria-labelledby={`cat-title-${category.id}`}
    >
      <div>
        {/* Header with Icon and Status */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/15">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123D2B] border border-[#E9C578]/30 shadow-inner">
            <AwardIllustration category={category.categoryType} size="sm" />
          </div>

          <FestiveBadge variant={isConfirmed ? 'gold' : 'ice'} size="sm">
            {isConfirmed ? 'CONFIRMED CRITERIA' : 'PROPOSED'}
          </FestiveBadge>
        </div>

        {/* Title */}
        <h4
          id={`cat-title-${category.id}`}
          className="mt-4 font-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors"
        >
          {category.title}
        </h4>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  );
};
