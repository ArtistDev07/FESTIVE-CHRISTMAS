import React from 'react';
import { Sparkles } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { CardCornerBrackets } from '../galleries/GalleryCardOrnaments.tsx';
import {
  mysteryPrizesContent,
  officialPrizeCategories,
} from '../../config/awardsConfig.ts';

/**
 * Configure your award image URLs here.
 * When set to null or empty string, the card gracefully renders an empty, styled frame without causing an empty src warning.
 */
export const PRIZE_CARD_IMAGES: Record<string, string | null> = {
  gold: null, // e.g. 'https://...'
  silver: null,
  bronze: null,
  other: null,
};

export const PrizesAwardsSection: React.FC = () => {
  return (
    <section
      id="prizes"
      className="relative z-20 bg-gradient-to-b from-[#09271E] via-[#0D3425] to-[#09271E] text-[#FFF4DF] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#E9C578]/15"
      aria-labelledby="prizes-heading"
    >
      {/* Decorative ambient atmospheric glows */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-radial from-[#C62835]/12 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-10 h-96 w-96 rounded-full bg-radial from-[#E9C578]/12 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[80vw] rounded-full bg-radial from-[#123D2B]/30 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        {/* SECTION INTRODUCTION & EVENT-DAY ANNOUNCEMENT */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <ScrollReveal animation="fade-up" delay={50}>
            <FestiveBadge
              variant="gold"
              icon={<Sparkles className="h-3 w-3 text-[#E9C578]" />}
              className="mb-4"
            >
              {mysteryPrizesContent.eyebrow}
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="prizes-heading"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
            >
              {mysteryPrizesContent.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-5 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl mx-auto">
              {mysteryPrizesContent.paragraph}
            </p>
          </ScrollReveal>
        </div>

        {/* FOUR PRIZE CATEGORIES — PURE IMAGE FRAMES (BALANCED GRID) */}
        <div className="mt-14 sm:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officialPrizeCategories.map((category, idx) => (
              <ScrollReveal
                key={category.id}
                animation="fade-up"
                delay={100 + idx * 80}
                className="h-full"
              >
                <div
                  className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811] p-3 shadow-[0_10px_30px_rgba(4,20,15,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.3)] cursor-default select-none"
                  role="article"
                  aria-label={`${category.label} Award Frame`}
                >
                  {/* Elegant Christmas corner brackets filigree */}
                  <CardCornerBrackets color="#E9C578" />

                  {/* Ambient top glowing hover aura */}
                  <div
                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-radial from-[#FFD700]/25 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  {/* Dedicated Image Container with Uniform 3:4 Aspect Ratio */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-[#E9C578]/25 bg-[#061C14] shadow-inner group-hover:border-[#E9C578]/60 transition-colors duration-500 select-none">
                    {PRIZE_CARD_IMAGES[category.id] ? (
                      <img
                        src={PRIZE_CARD_IMAGES[category.id]!}
                        alt={`${category.label} Award`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                      />
                    ) : null}

                    {/* Subtle Frosted Sheen Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09271E]/60 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-15" />
                  </div>

                  {/* Subtle Inner Glow Border Highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E9C578]/0 group-hover:border-[#E9C578]/40 transition-colors duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </FestiveContainer>
    </section>
  );
};
