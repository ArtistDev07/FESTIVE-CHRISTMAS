import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { FestiveHelpDesk } from '../illustrations/FestiveHelpDesk.tsx';
import { FAQAccordion } from '../faq/FAQAccordion.tsx';
import {
  faqIntroContent,
  faqItemsList,
} from '../../config/faqConfig.ts';

export const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="relative z-20 bg-gradient-to-b from-[#09271E] via-[#0C3224] to-[#09271E] text-[#FFF4DF] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#E9C578]/15"
      aria-labelledby="faq-heading"
    >
      {/* Decorative ambient auras */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-radial from-[#C62835]/15 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-10 h-96 w-96 rounded-full bg-radial from-[#E9C578]/15 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        {/* SECTION A — FAQ INTRODUCTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <ScrollReveal animation="fade-up" delay={50}>
              <FestiveBadge
                variant="gold"
                icon={<HelpCircle className="h-3 w-3 text-[#E9C578]" />}
                className="mb-4"
              >
                {faqIntroContent.eyebrow}
              </FestiveBadge>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <h2
                id="faq-heading"
                className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
              >
                {faqIntroContent.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <p className="mt-5 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
                {faqIntroContent.paragraph}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="mt-6 flex items-center gap-2.5 text-xs font-mono text-[#E9C578]/80">
                <Sparkles className="h-3.5 w-3.5 text-[#FFEA9F] animate-twinkle" />
                <span>9 Verified Event Answers Grounded in Official Guidelines</span>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal animation="scale-up" delay={200}>
              <FestiveHelpDesk className="w-full max-w-xs sm:max-w-sm" />
            </ScrollReveal>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <div className="min-h-[300px]">
          <ScrollReveal animation="fade-up" delay={200}>
            <FAQAccordion items={faqItemsList} />
          </ScrollReveal>
        </div>
      </FestiveContainer>
    </section>
  );
};
