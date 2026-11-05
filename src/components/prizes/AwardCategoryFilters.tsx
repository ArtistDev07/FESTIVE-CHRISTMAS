import React from 'react';
import { AwardCategoryType } from '../../types/awards.ts';

interface AwardCategoryFiltersProps {
  selectedCategory: AwardCategoryType;
  onSelectCategory: (category: AwardCategoryType) => void;
  counts: Record<AwardCategoryType, number>;
}

export const AwardCategoryFilters: React.FC<AwardCategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const tabs: { id: AwardCategoryType; label: string }[] = [
    { id: 'all', label: 'All Awards' },
    { id: 'overall', label: 'Overall Excellence' },
    { id: 'innovation', label: 'Innovation' },
    { id: 'technical', label: 'Technical' },
    { id: 'design', label: 'Design & UX' },
    { id: 'impact', label: 'Social Impact' },
    { id: 'special', label: 'Special Recognition' },
  ];

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-[#E9C578]/25 bg-[#072017]/90 backdrop-blur-md shadow-inner max-w-5xl mx-auto"
      role="group"
      aria-label="Filter awards by category"
    >
      {tabs.map((tab) => {
        const isSelected = selectedCategory === tab.id;
        const count = counts[tab.id] || 0;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            aria-pressed={isSelected}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] ${
              isSelected
                ? 'bg-gradient-to-r from-[#C62835] to-[#A41B26] text-[#FFFFFF] shadow-[0_2px_12px_rgba(198,40,53,0.5)] border border-[#E9C578]/60 scale-[1.02]'
                : 'text-[#FFF4DF]/80 hover:text-[#FFD700] hover:bg-[#123D2B]/60'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-mono font-bold ${
                isSelected
                  ? 'bg-[#09271E] text-[#E9C578]'
                  : 'bg-[#123D2B] text-[#FFF4DF]/70'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
