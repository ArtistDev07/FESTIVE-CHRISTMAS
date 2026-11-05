import React from 'react';
import { Compass, Sparkles, RefreshCw } from 'lucide-react';

interface FAQEmptyStateProps {
  type: 'no-search-results' | 'empty-category';
  onClearSearch?: () => void;
  onResetCategory?: () => void;
}

export const FAQEmptyState: React.FC<FAQEmptyStateProps> = ({
  type,
  onClearSearch,
  onResetCategory,
}) => {
  const isSearchEmpty = type === 'no-search-results';

  return (
    <div className="relative rounded-3xl border border-[#E9C578]/25 bg-gradient-to-b from-[#0E3426] via-[#09261D] to-[#061C14] p-10 sm:p-14 text-center max-w-xl mx-auto shadow-[0_12px_40px_rgba(4,20,15,0.7)] backdrop-blur-xl">
      {/* Decorative ambient aura */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full bg-radial from-[#E9C578]/15 via-transparent to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123D2B] border border-[#E9C578]/40 text-[#E9C578] shadow-inner mb-4">
          <Compass className="h-7 w-7 opacity-75 animate-pulse" />
        </div>

        <h4 className="font-festive text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight">
          {isSearchEmpty
            ? 'No answers found in this snowy corner.'
            : 'No questions have been published in this category yet.'}
        </h4>

        <p className="mt-2.5 text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive max-w-md">
          {isSearchEmpty
            ? 'Try a different search term or explore another question category.'
            : 'Explore another category to find the information you need.'}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {isSearchEmpty && onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C62835] text-[#FFFFFF] border border-[#FFF4DF]/30 hover:bg-[#EF4050] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
            >
              <span>Clear Search</span>
            </button>
          )}

          {onResetCategory && (
            <button
              type="button"
              onClick={onResetCategory}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#123D2B] text-[#FFF4DF] border border-[#E9C578]/30 hover:bg-[#184833] hover:border-[#E9C578] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#E9C578]" />
              <span>View All Questions</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
