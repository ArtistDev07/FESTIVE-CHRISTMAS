import React from 'react';
import { Sparkles, Scale, BookOpen, Heart } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import { FestiveFairyLights } from '../galleries/FestiveFairyLights.tsx';
import { JudgesGallery } from '../galleries/JudgesGallery.tsx';
import { MentorsGallery } from '../galleries/MentorsGallery.tsx';
import { VolunteersGallery } from '../galleries/VolunteersGallery.tsx';
import {
  judgesGalleryData,
  mentorsGalleryData,
  volunteersGalleryData,
} from '../../config/galleriesData.ts';

export const ExpertsSection: React.FC = () => {
  return (
    <section
      id="mentors"
      className="relative z-20 bg-gradient-to-b from-[#09271E] via-[#0C3123] to-[#09271E] text-[#FFF4DF] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#E9C578]/15"
      aria-labelledby="experts-heading"
    >
      {/* Decorative ambient auras */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-radial from-[#184833]/30 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-10 h-96 w-96 rounded-full bg-radial from-[#E9C578]/15 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-radial from-[#EF4050]/10 via-transparent to-transparent blur-3xl"
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
              EXPERIENCE MEETS IMAGINATION
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="experts-heading"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
            >
              Meet the Minds Behind the Magic
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-5 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
              Great ideas grow through shared knowledge, thoughtful feedback, and fresh perspectives. Discover the judges, mentors, and volunteer crew supporting Festive Christmas builders.
            </p>
          </ScrollReveal>
        </div>

        {/* Illuminated Festive Fairy Lights */}
        <div className="my-10 max-w-5xl mx-auto">
          <FestiveFairyLights count={20} />
        </div>

        {/* ── SUB-GALLERY 1: JUDGES GALLERY (4 CARDS) ── */}
        <div id="judges" className="mt-8 mb-20 sm:mb-28 scroll-mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E9C578]/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFD700]">
                ✦ EVALUATION JURY • 4 BENCHES ✦
              </span>
              <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-1">
                Judging Panel
              </h3>
            </div>
            <p className="text-xs text-[#D9ECF5]/75 font-sans-festive max-w-md text-center sm:text-right">
              Four dedicated evaluation seats reviewing entries across code architecture, machine intelligence, UX delight, and social good.
            </p>
          </div>

          <JudgesGallery judges={judgesGalleryData} />
        </div>

        {/* ── SUB-GALLERY 2: MENTORS GALLERY (8 CARDS) ── */}
        <div className="my-20 sm:my-28 pt-12 border-t border-[#E9C578]/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E9C578]/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#88D4B0]">
                ✦ GUIDANCE &amp; CLINICS • 8 PODS ✦
              </span>
              <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-1">
                Mentors
              </h3>
            </div>
            <p className="text-xs text-[#D9ECF5]/75 font-sans-festive max-w-md text-center sm:text-right">
              Eight active mentor pods offering technical feedback, architecture consultations, and demo polish.
            </p>
          </div>

          <MentorsGallery mentors={mentorsGalleryData} />
        </div>

        {/* ── SUB-GALLERY 3: VOLUNTEERS GALLERY (20 CARDS) ── */}
        <div id="volunteers" className="my-20 sm:my-28 pt-12 border-t border-[#E9C578]/15 scroll-mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E9C578]/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EF4050]">
                ✦ SOLSTICE VOLUNTEERS • 20 ROLES ✦
              </span>
              <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-1">
                Volunteer Crew
              </h3>
            </div>
            <p className="text-xs text-[#D9ECF5]/75 font-sans-festive max-w-md text-center sm:text-right">
              Twenty dedicated solstice helpers coordinating Discord welcoming, technical desks, wellness, and stage productions.
            </p>
          </div>

          <VolunteersGallery volunteers={volunteersGalleryData} />
        </div>
      </FestiveContainer>
    </section>
  );
};
