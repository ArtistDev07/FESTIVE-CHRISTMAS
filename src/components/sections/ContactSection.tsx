import React from 'react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { ContactHeader } from '../contact/ContactHeader.tsx';
import { OrganizerInfoCard } from '../contact/OrganizerInfoCard.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-10 overflow-hidden bg-gradient-to-b from-[#071F18] via-[#09271E] to-[#061811] py-20 sm:py-28 lg:py-32"
    >
      {/* Ambient Winter Glows and Atmospheric Particles */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-radial from-[#123D2B]/35 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-0 h-96 w-96 rounded-full bg-radial from-[#E9C578]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-radial from-[#C62835]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl" className="relative z-10">
        {/* Section 1: Contact Introduction & Operating Hours */}
        <ContactHeader />

        {/* Section 2: Centered Event Organizers Presentation */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up" delay={100}>
            <OrganizerInfoCard />
          </ScrollReveal>
        </div>
      </FestiveContainer>
    </section>
  );
};
