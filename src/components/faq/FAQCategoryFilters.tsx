import React from 'react';
import { FAQCategory, FAQCategoryMeta } from '../../types/faq.ts';

interface FAQCategoryFiltersProps {
  categories: FAQCategoryMeta[];
  activeCategory: FAQCategory;
  onSelectCategory: (category: FAQCategory) => void;
  categoryCounts: Record<FAQCategory, number>;
}

export const FAQCategoryFilters: React.FC<FAQCategoryFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filter frequently asked questions by category"
      className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${cat.id}`}
            id={`tab-${cat.id}`}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] ${
              isActive
                ? 'bg-gradient-to-r from-[#184833] to-[#123D2B] text-[#FFFFFF] border border-[#E9C578] shadow-[0_2px_14px_rgba(233,197,120,0.25)] font-semibold'
                : 'bg-[#072017]/80 text-[#D9ECF5]/80 border border-[#E9C578]/20 hover:border-[#E9C578]/40 hover:text-[#FFFFFF] hover:bg-[#0C2B1E]'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                isActive
                  ? 'bg-[#E9C578]/25 text-[#FFEA9F]'
                  : 'bg-white/5 text-[#D9ECF5]/50 group-hover:text-[#D9ECF5]/80'
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
