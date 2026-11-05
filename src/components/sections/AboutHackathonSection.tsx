import React from 'react';
import { BookOpen, Sparkles, Terminal } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { CollaborationScene } from '../illustrations/CollaborationScene.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { eventContent } from '../../config/eventContent.ts';

export const AboutHackathonSection: React.FC = () => {
  const { about } = eventContent;

  return (
    <section
      id="about"
      className="relative z-20 bg-[#061C14] py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-[#E9C578]/15 scroll-mt-24"
      aria-labelledby="about-heading"
    >
      {/* Background Soft Aurora Wave */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-radial from-[#25A18E]/10 via-[#123D2B]/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Left Column: Asymmetrical Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <ScrollReveal animation="fade-up" delay={50}>
              <FestiveBadge
                variant="red"
                icon={<BookOpen className="h-3 w-3 text-[#FFF4DF]" />}
                className="mb-4"
              >
                {about.eyebrow}
              </FestiveBadge>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <h2
                id="about-heading"
                className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
              >
                {about.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <p className="mt-6 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
                {about.paragraph1}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={350}>
              <p className="mt-4 text-base sm:text-lg text-[#D9ECF5]/80 font-sans-festive leading-relaxed">
                {about.paragraph2}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={450}>
              <div className="mt-8 border-l-3 border-[#E9C578] pl-5 py-2 bg-[#123D2B]/40 rounded-r-xl">
                <p className="font-serif-festive italic text-base sm:text-lg text-[#E9C578] font-medium tracking-wide">
                  "{about.supportingStatement}"
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Collaborative Studio Workshop Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal animation="fade-left" delay={200} className="w-full max-w-lg">
              <CollaborationScene />
            </ScrollReveal>
          </div>
        </div>
      </FestiveContainer>
    </section>
  );
};
