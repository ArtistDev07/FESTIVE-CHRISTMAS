import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import {
  SparkBenefitIllustration,
  HammerBenefitIllustration,
  UsersBenefitIllustration,
  ShareBenefitIllustration,
} from '../illustrations/BenefitCardsIllustrations.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { eventContent, BenefitCardContent } from '../../config/eventContent.ts';

export const WhyParticipateSection: React.FC = () => {
  const { whyParticipate } = eventContent;

  const renderIllustration = (iconName: BenefitCardContent['iconName']) => {
    switch (iconName) {
      case 'spark':
        return <SparkBenefitIllustration />;
      case 'hammer':
        return <HammerBenefitIllustration />;
      case 'users':
        return <UsersBenefitIllustration />;
      case 'sparkles':
      default:
        return <ShareBenefitIllustration />;
    }
  };

  return (
    <section
      id="why-participate"
      className="relative z-20 bg-[#FFFBF2] text-[#09271E] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24"
      aria-labelledby="why-participate-heading"
    >
      {/* Subtle Knitted Pattern Repeat Trim along Top & Bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-3 bg-[radial-gradient(#123D2B_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-3 bg-[radial-gradient(#123D2B_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-25"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        {/* Section Header (Centered) */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <ScrollReveal animation="fade-up" delay={50}>
            <FestiveBadge
              variant="red"
              icon={<Gift className="h-3 w-3 text-[#FFF4DF]" />}
              className="mb-4 shadow-sm"
            >
              {whyParticipate.eyebrow}
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="why-participate-heading"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09271E] leading-[1.15]"
            >
              {whyParticipate.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-5 text-base sm:text-lg text-[#164D37] font-sans-festive leading-relaxed">
              {whyParticipate.paragraph}
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {whyParticipate.cards.map((card, idx) => (
            <ScrollReveal
              key={card.id}
              animation="fade-up"
              delay={100 + idx * 80}
              className="h-full"
            >
              <div className="group relative h-full flex flex-col justify-between rounded-2xl border border-[#E9C578]/40 bg-[#FFFFFF] p-7 shadow-[0_8px_25px_rgba(18,61,43,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(18,61,43,0.14)] hover:border-[#C62835]/40">
                {/* Top Corner Candy Ribbon Accent */}
                <div className="absolute top-0 right-7 w-6 h-3 bg-[#C62835] rounded-b-md opacity-80" />

                <div>
                  {/* Decorative Handcrafted Illustration */}
                  <div className="mb-5 flex h-16 items-center justify-start">
                    {renderIllustration(card.iconName)}
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif-festive text-xl font-bold tracking-tight text-[#09271E] group-hover:text-[#C62835] transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-3 text-sm text-[#2A5C45] font-sans-festive leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="mt-6 pt-4 border-t border-[#E9C578]/25 flex items-center justify-between text-xs font-mono text-[#C62835]">
                  <span>BENEFIT 0{idx + 1}</span>
                  <span className="text-sm">✦</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </FestiveContainer>
    </section>
  );
};
