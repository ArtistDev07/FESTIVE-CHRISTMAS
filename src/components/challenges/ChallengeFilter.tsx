import React from 'react';
import { TrackCategory } from '../../types/tracksChallenges.ts';

export type FilterOption = 'all' | TrackCategory;

interface ChallengeFilterProps {
  selectedFilter: FilterOption;
  onSelectFilter: (filter: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

export const ChallengeFilter: React.FC<ChallengeFilterProps> = ({
  selectedFilter,
  onSelectFilter,
  counts,
}) => {
  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All Challenges' },
    { id: 'ai-magic', label: 'AI & Magic' },
    { id: 'web-apps', label: 'Web & Apps' },
    { id: 'climate-community', label: 'Climate & Community' },
    { id: 'open-innovation', label: 'Open Innovation' },
  ];

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full border border-[#E9C578]/25 bg-[#072017]/90 backdrop-blur-md shadow-inner max-w-3xl mx-auto"
      role="group"
      aria-label="Filter challenges by track"
    >
      {filterTabs.map((tab) => {
        const isSelected = selectedFilter === tab.id;
        const count = counts[tab.id] || 0;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectFilter(tab.id)}
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
