import React from 'react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FooterBrand } from './FooterBrand.tsx';
import { FooterNavigation } from './FooterNavigation.tsx';
import { FooterSocialLinks } from './FooterSocialLinks.tsx';
import { FooterCopyright } from './FooterCopyright.tsx';
import { BackToTopButton } from './BackToTopButton.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const FestiveFooter: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      aria-label="Festive Christmas Global Footer"
      className="relative z-20 overflow-hidden bg-gradient-to-b from-[#020A07] via-[#04140D] to-[#010604] pt-16 sm:pt-20 pb-12 sm:pb-16 text-[#FFF4DF] border-t border-[#E9C578]/20"
    >
      {/* Layer 1: Illustrated Winter Night Forest Silhouette SVG (decorative) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden opacity-30 select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="h-full w-full fill-[#082016]"
        >
          {/* Back forest layer */}
          <path d="M0,160 L0,80 L30,40 L60,80 L90,30 L120,80 L160,25 L200,80 L240,45 L280,80 L320,35 L360,80 L420,20 L480,80 L540,40 L600,80 L660,15 L720,80 L780,45 L840,80 L900,30 L960,80 L1020,20 L1080,80 L1140,40 L1200,80 L1260,35 L1320,80 L1380,25 L1420,80 L1440,50 L1440,160 Z" />
        </svg>
      </div>

      {/* Layer 2: Ambient Starlight and Festive Golden Glows */}
      <div
        className="pointer-events-none absolute top-10 left-1/4 h-80 w-80 rounded-full bg-radial from-[#E9C578]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-20 right-1/4 h-80 w-80 rounded-full bg-radial from-[#123D2B]/30 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[700px] rounded-full bg-radial from-[#88D4B0]/8 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle Knitted Christmas Snowflake Pattern Border */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E9C578]/40 to-transparent"
        aria-hidden="true"
      />

      <FestiveContainer size="xl" className="relative z-10">
        {/* Main Footer Layout: Brand Column, 3-Group Navigation, and Stay Connected */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand & Closing Narrative (4 cols on lg) */}
          <div className="lg:col-span-4">
            <ScrollReveal animation="fade-up" delay={50}>
              <FooterBrand />
            </ScrollReveal>
          </div>

          {/* Internal Navigation Directory (5 cols on lg) */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-up" delay={150}>
              <FooterNavigation />
            </ScrollReveal>
          </div>

          {/* Verified Social & Community Channels (3 cols on lg) */}
          <div className="lg:col-span-3">
            <ScrollReveal animation="fade-up" delay={250}>
              <FooterSocialLinks />
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Row: Dynamic Copyright, Dedication & Legal Links */}
        <ScrollReveal animation="fade-up" delay={300}>
          <FooterCopyright />
        </ScrollReveal>
      </FestiveContainer>

      {/* Back to Top Floating Interaction */}
      <BackToTopButton />
    </footer>
  );
};
