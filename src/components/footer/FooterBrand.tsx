import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { footerConfig } from '../../config/footerConfig.ts';
import { eventConfig } from '../../config/eventConfig.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

export const FooterBrand: React.FC = () => {
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const homeEl = document.querySelector('#home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-start text-left max-w-sm lg:max-w-md">
      {/* Brand Identity / Logo Wordmark */}
      <a
        href="#home"
        onClick={handleHomeClick}
        className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] rounded-xl p-1 -ml-1 transition-transform"
        aria-label="Festive Christmas Home"
      >
        <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-[#E9C578]/50 bg-gradient-to-br from-[#123D2B] via-[#0A261D] to-[#061811] shadow-[0_0_20px_rgba(233,197,120,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#E9C578]">
          <span className="text-2xl sm:text-3xl" role="img" aria-label="Christmas Tree">
            🎄
          </span>
          <span
            className="absolute -top-1 -right-1 text-xs text-[#FFD700] animate-twinkle"
            aria-hidden="true"
          >
            ✦
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-festive text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors leading-none">
            {footerConfig.brandName}
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E9C578] mt-1 leading-none">
            {footerConfig.brandTagline}
          </span>
        </div>
      </a>

      {/* Closing Headline & Paragraph */}
      <h3 className="mt-5 font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight">
        {footerConfig.closingHeadline}
      </h3>

      <p className="mt-2.5 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
        {footerConfig.closingDescription}
      </p>

      {/* Live Event Status Badge */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <FestiveBadge
          variant="gold"
          size="sm"
          icon={<Calendar className="h-3 w-3 text-[#FFEA9F]" />}
        >
          {eventConfig.eventDate}
        </FestiveBadge>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-[#0D3425]/90 border border-[#88D4B0]/30 text-[#88D4B0]">
          <Sparkles className="h-3 w-3 text-[#88D4B0]" />
          <span>{eventConfig.registrationStatusLabel}</span>
        </span>
      </div>
    </div>
  );
};
