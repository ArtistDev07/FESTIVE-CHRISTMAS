import React from 'react';
import { Users, ChevronDown, Sparkles, Building2 } from 'lucide-react';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const PrizesToSponsorsTransition: React.FC = () => {
  return (
    <div
      id="sponsors"
      className="relative z-20 overflow-hidden bg-gradient-to-b from-[#09271E] via-[#0D3425] to-[#09271E] py-16 sm:py-20 text-center border-t border-[#E9C578]/15 scroll-mt-24"
    >
      {/* Decorative snowline top */}
      <div className="absolute top-0 left-0 right-0 h-8 w-full overflow-hidden leading-none opacity-30">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block h-8 w-full fill-[#09271E]"
        >
          <path d="M0,0 C300,50 600,-20 900,40 C1050,70 1150,10 1200,30 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 flex flex-col items-center">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123D2B] to-[#071E16] border border-[#E9C578]/40 shadow-[0_4px_20px_rgba(233,197,120,0.25)] text-[#E9C578] mb-4">
            <Building2 className="h-6 w-6 text-[#E9C578]" />
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E9C578]">
            THE EXPEDITION CONTINUES
          </span>
          <h3 className="mt-2 font-section-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFFFFF] tracking-tight">
            Sponsors, Partners & Mentors
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive max-w-lg">
            Meet the innovative companies, developer tooling platforms, and industry mentors supporting Festive Christmas builders with workshops, credits, and guidance.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={250}>
          <div className="mt-6 flex flex-col items-center gap-1.5 text-xs font-mono text-[#E9C578]/70">
            <span>Scroll onward</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-[#E9C578]" />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
