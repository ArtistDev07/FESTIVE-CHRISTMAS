import React from 'react';
import { Building2, Sparkles, HeartHandshake, Compass } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { FestiveFairyLights } from '../galleries/FestiveFairyLights.tsx';
import { SponsorsGallery } from '../galleries/SponsorsGallery.tsx';
import { CommunityPartnersGallery } from '../galleries/CommunityPartnersGallery.tsx';
import { AdditionalPartnersGallery } from '../galleries/AdditionalPartnersGallery.tsx';
import {
  sponsorsGalleryData,
  communityPartnersGalleryData,
  additionalPartnersGalleryData,
} from '../../config/galleriesData.ts';

export const SponsorsPartnersSection: React.FC = () => {
  return (
    <section
      id="sponsors"
      className="relative z-20 bg-gradient-to-b from-[#09271E] via-[#0C3224] to-[#082218] text-[#FFF4DF] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#E9C578]/15"
      aria-labelledby="sponsors-heading"
    >
      {/* Decorative undulating snowy tree line wave at section top */}
      <div className="absolute top-0 left-0 right-0 h-10 w-full overflow-hidden leading-none opacity-30 select-none pointer-events-none">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block h-10 w-full fill-[#09271E]"
        >
          <path d="M0,0 C300,50 600,-20 900,40 C1050,70 1150,10 1200,30 L1200,0 L0,0 Z" />
        </svg>
      </div>

      {/* Atmospheric ambient Christmas glows */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-radial from-[#FFD700]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-10 h-[500px] w-[500px] rounded-full bg-radial from-[#25A18E]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-radial from-[#EF4050]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        {/* Main Section Introduction */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <ScrollReveal animation="fade-up" delay={50}>
            <FestiveBadge
              variant="gold"
              icon={<Sparkles className="h-3 w-3 text-[#E9C578]" />}
              className="mb-4"
            >
              COMMUNITY &amp; ALLIANCES
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="sponsors-heading"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
            >
              Sponsors &amp; Partners
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-5 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
              Meet the organizations, developer platforms, student networks, and community allies bringing resources, credits, and support to Festive Christmas builders.
            </p>
          </ScrollReveal>
        </div>

        {/* Illuminated Fairy Lights Garland */}
        <div className="my-10 max-w-5xl mx-auto">
          <FestiveFairyLights count={20} />
        </div>

        {/* ── SUB-GALLERY 1: SPONSORS GALLERY (4 CARDS) ── */}
        <div className="mt-6 mb-20 sm:mb-28">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E9C578]/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E9C578]">
                ✦ SPONSORSHIP TIERS • 4 PODS ✦
              </span>
              <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-1">
                Event Sponsors &amp; Patrons
              </h3>
            </div>
            <p className="text-xs text-[#D9ECF5]/75 font-sans-festive max-w-md text-center sm:text-right">
              Four structured partnership tiers supporting hackathon infrastructure, compute credits, and celebratory swag.
            </p>
          </div>

          <SponsorsGallery sponsors={sponsorsGalleryData} />
        </div>

        {/* ── SUB-GALLERY 2: COMMUNITY PARTNERS GALLERY (5 CARDS) ── */}
        <div className="my-20 sm:my-28 pt-12 border-t border-[#E9C578]/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E9C578]/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#88D4B0]">
                ✦ COMMUNITY ALLIANCES • 5 NETWORKS ✦
              </span>
              <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-1">
                Community Partners
              </h3>
            </div>
            <p className="text-xs text-[#D9ECF5]/75 font-sans-festive max-w-md text-center sm:text-right">
              University developer chapters, open-source communities, diversity advocates, and design guilds.
            </p>
          </div>

          <CommunityPartnersGallery partners={communityPartnersGalleryData} />
        </div>

        {/* ── SUB-GALLERY 3: ADDITIONAL PARTNERS GALLERY (4 CARDS) ── */}
        <div className="my-20 sm:my-28 pt-12 border-t border-[#E9C578]/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E9C578]/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFEA9F]">
                ✦ EVENT ECOSYSTEM • 4 CATEGORIES ✦
              </span>
              <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-1">
                Additional Partners
              </h3>
            </div>
            <p className="text-xs text-[#D9ECF5]/75 font-sans-festive max-w-md text-center sm:text-right">
              Specialized support across Media, Photography, Venue, and Food to elevate the solstice hacker experience.
            </p>
          </div>

          <AdditionalPartnersGallery partners={additionalPartnersGalleryData} />
        </div>
      </FestiveContainer>
    </section>
  );
};
