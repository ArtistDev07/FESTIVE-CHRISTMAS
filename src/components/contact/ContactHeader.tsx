import React from 'react';
import { Mail, Sparkles, Clock, Globe } from 'lucide-react';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { organizerInfo } from '../../config/contactConfig.ts';

export const ContactHeader: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
      <ScrollReveal animation="fade-up" delay={50}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
          <FestiveBadge
            variant="gold"
            size="md"
            icon={<Sparkles className="h-3.5 w-3.5 text-[#FFEA9F] animate-twinkle" />}
          >
            PHASE 10 • ORGANIZER DESK & COMMUNITY
          </FestiveBadge>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#0D3425]/90 border border-[#88D4B0]/30 text-[#88D4B0] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#88D4B0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#88D4B0]"></span>
            </span>
            <span>Desk Open • Active Coverage</span>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={150}>
        <h2
          id="contact-heading"
          className="font-section-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight text-shadow-festive leading-tight"
        >
          {organizerInfo.sectionTitle}
        </h2>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={250}>
        <p className="mt-4 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
          {organizerInfo.sectionSubtitle}
        </p>

        {/* Beautifully Centered Delicate Meta Chips */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono">
          <div className="inline-flex items-center gap-2 bg-[#092B1E]/80 px-3.5 py-1.5 rounded-full border border-[#E9C578]/25 text-[#E9C578] shadow-sm backdrop-blur-md">
            <Clock className="h-3.5 w-3.5 text-[#E9C578]" />
            <span>Avg. Response: &lt; 12 hrs</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#092B1E]/80 px-3.5 py-1.5 rounded-full border border-[#88D4B0]/25 text-[#88D4B0] shadow-sm backdrop-blur-md">
            <Globe className="h-3.5 w-3.5 text-[#88D4B0]" />
            <span>24/7 Global Timezones</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#092B1E]/80 px-3.5 py-1.5 rounded-full border border-[#FFEA9F]/25 text-[#FFEA9F] shadow-sm backdrop-blur-md">
            <Mail className="h-3.5 w-3.5 text-[#FFEA9F]" />
            <span>Direct Organizers &amp; Mentors</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
