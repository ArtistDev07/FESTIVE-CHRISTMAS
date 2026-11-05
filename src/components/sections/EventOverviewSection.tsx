import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { WinterWorkshop } from '../illustrations/WinterWorkshop.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { eventContent } from '../../config/eventContent.ts';

export const EventOverviewSection: React.FC = () => {
  const { overview } = eventContent;

  return (
    <section
      id="event-overview"
      className="relative z-20 bg-[#09271E] pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden scroll-mt-24"
      aria-labelledby="overview-heading"
    >
      {/* Anchor alias for #overview */}
      <div id="overview" className="absolute -top-24 left-0" aria-hidden="true" />

      {/* Atmospheric Radial Glow behind section */}
      <div
        className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-radial from-[#E9C578]/10 via-[#123D2B]/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Left Column: Heading and Editorial Storytelling */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <ScrollReveal animation="fade-up" delay={50}>
              <FestiveBadge
                variant="gold"
                icon={<Sparkles className="h-3 w-3 text-[#E9C578]" />}
                className="mb-4"
              >
                {overview.eyebrow}
              </FestiveBadge>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <h2
                id="overview-heading"
                className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
              >
                {overview.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <p className="mt-6 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
                {overview.paragraph}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={350}>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#E9C578]/30 bg-[#123D2B]/60 px-5 py-3.5 backdrop-blur-md shadow-md">
                <span className="text-xl" role="img" aria-label="Glowing Star">
                  ⭐
                </span>
                <p className="font-serif-festive italic text-base sm:text-lg text-[#FFF4DF] tracking-wide">
                  "{overview.supportingLine}"
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Handcrafted Winter Workshop Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal animation="scale-up" delay={200} className="w-full max-w-md">
              <WinterWorkshop />
            </ScrollReveal>
          </div>
        </div>
      </FestiveContainer>
    </section>
  );
};
