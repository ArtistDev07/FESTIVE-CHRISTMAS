import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { useBackToTop } from '../../hooks/useBackToTop.ts';

export const BackToTopButton: React.FC = () => {
  const { isVisible, scrollToTop } = useBackToTop();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to Top of Page"
        title="Scroll back to top"
        className="group relative flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full border border-[#E9C578]/50 bg-gradient-to-r from-[#123D2B]/95 via-[#0A261D]/95 to-[#071E16]/95 text-[#FFF4DF] shadow-[0_8px_24px_rgba(4,20,15,0.7)] backdrop-blur-md hover:border-[#E9C578] hover:text-[#FFFFFF] hover:shadow-[0_12px_32px_rgba(233,197,120,0.3)] transition-all duration-300 active:translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E9C578]/20 text-[#FFEA9F] group-hover:bg-[#E9C578] group-hover:text-[#09271E] transition-colors">
          <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
        <span className="text-xs font-mono font-bold tracking-wider text-[#FFEA9F] group-hover:text-[#FFFFFF]">
          TOP
        </span>
        <Sparkles className="h-3 w-3 text-[#FFEA9F]/60 group-hover:text-[#FFEA9F] animate-twinkle hidden sm:inline" />
      </button>
    </div>
  );
};
