import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const ContactToFooterTransition: React.FC = () => {
  return (
    <div
      className="relative z-20 overflow-hidden bg-gradient-to-b from-[#061811] via-[#04120D] to-[#020A07] pt-16 pb-20 text-center border-t border-[#E9C578]/15"
    >
      {/* Decorative undulating snowy tree line wave */}
      <div className="absolute top-0 left-0 right-0 h-10 w-full overflow-hidden leading-none opacity-25">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block h-10 w-full fill-[#071F18]"
        >
          <path d="M0,0 C150,45 350,-15 500,35 C650,75 800,10 950,45 C1100,70 1150,15 1200,30 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="relative max-w-xl mx-auto px-4 flex flex-col items-center">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#E9C578]/50" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#123D2B] to-[#061811] border border-[#E9C578]/40 shadow-[0_0_16px_rgba(233,197,120,0.3)] text-[#FFD700]">
              <Star className="h-5 w-5 fill-[#FFD700] animate-twinkle" />
            </div>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#E9C578]/50" />
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E9C578]/90">
            FESTIVE CHRISTMAS HACKATHON 2026
          </span>
          <h3 className="mt-2 font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight text-shadow-festive">
            The Winter Solstice Awaits Your Innovation
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive max-w-md leading-relaxed">
            Gather your team, explore the challenge prompts, and prepare to bring warmth and ingenuity to the holiday season.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={250}>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A261D]/70 border border-[#E9C578]/20 text-xs font-mono text-[#FFEA9F]">
            <Sparkles className="h-3 w-3 text-[#FFEA9F] animate-twinkle" />
            <span>One-Day Mini Hackathon • 25 December 2026 • 8:00 AM UTC</span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
