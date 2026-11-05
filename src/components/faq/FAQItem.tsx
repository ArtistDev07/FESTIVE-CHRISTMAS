import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem as FAQItemType } from '../../types/faq.ts';

interface FAQItemProps {
  item: FAQItemType;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-[#E9C578]/55 bg-gradient-to-b from-[#113828] to-[#0A261D] shadow-[0_8px_30px_rgba(4,20,15,0.7)]'
          : 'border-[#E9C578]/20 bg-[#072017]/85 hover:border-[#E9C578]/40 hover:bg-[#09281E]'
      }`}
    >
      {/* Question Accordion Button */}
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.id}`}
          id={`faq-question-${item.id}`}
          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E]"
        >
          <div className="flex items-center gap-3.5 pr-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold transition-colors ${
                isOpen
                  ? 'bg-[#E9C578] text-[#09271E]'
                  : 'bg-[#123D2B] text-[#E9C578]/80 group-hover:text-[#E9C578]'
              }`}
              aria-hidden="true"
            >
              Q
            </span>

            <span className="text-base sm:text-lg font-serif-festive font-bold text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors leading-snug">
              {item.question}
            </span>
          </div>

          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen
                ? 'border-[#E9C578] bg-[#E9C578]/20 text-[#FFEA9F] rotate-180'
                : 'border-[#E9C578]/25 bg-[#061C14] text-[#D9ECF5]/70 group-hover:border-[#E9C578]/50 group-hover:text-[#FFFFFF]'
            }`}
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </div>
        </button>
      </h3>

      {/* Answer Region */}
      {isOpen && (
        <div
          id={`faq-answer-${item.id}`}
          role="region"
          aria-labelledby={`faq-question-${item.id}`}
          className="px-5 sm:px-6 pb-6 pt-2 text-left border-t border-[#E9C578]/15 animate-fade-in"
        >
          <p className="text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
};
