import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  resultsCount?: number;
}

export const FAQSearch: React.FC<FAQSearchProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  resultsCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onClearSearch();
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <label htmlFor="faq-search-input" className="sr-only">
        Search frequently asked questions
      </label>

      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="pointer-events-none absolute left-4 flex items-center text-[#E9C578]">
          <Search className="h-5 w-5" aria-hidden="true" />
        </div>

        {/* Search Input Field */}
        <input
          ref={inputRef}
          id="faq-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your question..."
          autoComplete="off"
          className="w-full rounded-2xl border border-[#E9C578]/35 bg-[#072017]/90 py-3.5 pl-12 pr-28 text-sm sm:text-base text-[#FFFFFF] placeholder:text-[#D9ECF5]/50 shadow-[0_4px_24px_rgba(4,20,15,0.6)] backdrop-blur-md transition-all focus:border-[#E9C578] focus:bg-[#09271E] focus:outline-none focus:ring-2 focus:ring-[#E9C578]/50"
        />

        {/* Clear Button and/or Results Count */}
        <div className="absolute right-3.5 flex items-center gap-2">
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] text-[#D9ECF5] hover:bg-[#184833] hover:text-[#FFFFFF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {typeof resultsCount === 'number' && (
            <span
              className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#123D2B]/80 border border-[#E9C578]/25 text-[#E9C578]"
              aria-live="polite"
            >
              {resultsCount} found
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
