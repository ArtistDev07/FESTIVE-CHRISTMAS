import React, { useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { TracksHorizontalGallery } from '../tracks/TracksHorizontalGallery.tsx';
import { TrackDetailDialog } from '../tracks/TrackDetailDialog.tsx';
import { ChallengeDetailDialog } from '../challenges/ChallengeDetailDialog.tsx';
import { ChallengeDiscovery } from '../challenges/ChallengeDiscovery.tsx';
import { FilterOption } from '../challenges/ChallengeFilter.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import {
  hackathonTracks,
  tracksIntroContent,
} from '../../config/tracksChallenges.ts';
import {
  HackathonTrack,
  ProjectChallenge,
  TrackCategory,
} from '../../types/tracksChallenges.ts';

export const TracksChallengesSection: React.FC = () => {
  // Modal states
  const [selectedTrack, setSelectedTrack] = useState<HackathonTrack | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const [selectedChallenge, setSelectedChallenge] = useState<ProjectChallenge | null>(null);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // Filter state for challenges
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');

  // Track exploration handler
  const handleExploreTrack = (track: HackathonTrack) => {
    setSelectedTrack(track);
    setIsTrackModalOpen(true);
  };

  // Challenge view handler
  const handleViewChallenge = (challenge: ProjectChallenge) => {
    setSelectedChallenge(challenge);
    setIsChallengeModalOpen(true);
  };

  // Switch from track dialog to filtered challenges
  const handleExploreChallengesFromTrack = (trackId: TrackCategory) => {
    setIsTrackModalOpen(false);
    setSelectedFilter(trackId);

    // Scroll to #challenges
    setTimeout(() => {
      const el = document.querySelector('#challenges');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Switch from challenge dialog to track dialog
  const handleExploreTrackFromChallenge = (trackId: TrackCategory) => {
    setIsChallengeModalOpen(false);
    const targetTrack = hackathonTracks.find((t) => t.id === trackId);
    if (targetTrack) {
      setTimeout(() => {
        setSelectedTrack(targetTrack);
        setIsTrackModalOpen(true);
      }, 150);
    }
  };

  return (
    <section
      id="tracks"
      className="relative z-20 bg-[#061B13] text-[#FFF4DF] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#E9C578]/15"
      aria-labelledby="tracks-main-heading"
    >
      {/* Background Winter Glow Elements */}
      <div
        className="pointer-events-none absolute top-20 right-0 h-96 w-96 rounded-full bg-radial from-[#E9C578]/10 via-[#123D2B]/5 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-40 left-0 h-96 w-96 rounded-full bg-radial from-[#25A18E]/10 via-[#123D2B]/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        {/* Section A: Tracks Introduction Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <ScrollReveal animation="fade-up" delay={50}>
            <FestiveBadge
              variant="gold"
              icon={<Sparkles className="h-3 w-3 text-[#E9C578]" />}
              className="mb-4"
            >
              {tracksIntroContent.eyebrow}
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="tracks-main-heading"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
            >
              {tracksIntroContent.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-5 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
              {tracksIntroContent.paragraph}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={350}>
            <p className="mt-3 text-xs sm:text-sm font-serif-festive italic text-[#E9C578]/90 tracking-wider">
              ✦ {tracksIntroContent.supportingLabel} ✦
            </p>
          </ScrollReveal>
        </div>

        {/* Section B: Premium Horizontal Gallery (5 Continuous Panels) */}
        <ScrollReveal animation="fade-up" delay={100}>
          <TracksHorizontalGallery
            tracks={hackathonTracks}
            onExploreTrack={handleExploreTrack}
          />
        </ScrollReveal>

        {/* Section C: Project Challenge Discovery (#challenges anchor, filter, cards) */}
        <ChallengeDiscovery />

        {/* Elegant Transition Bridge into Next Planned Section */}
        <div className="mt-24 sm:mt-32 pt-12 border-t border-[#E9C578]/20 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 text-[#E9C578]/70 text-xs font-mono mb-2">
            <span>❄</span>
            <span>✦</span>
            <span>❄</span>
          </div>
          <p className="text-xs text-[#D9ECF5]/70 font-sans-festive max-w-md">
            Four creative pathways awaiting your inspiration under the winter sky.
          </p>
        </div>
      </FestiveContainer>

      {/* Accessible Modals */}
      <TrackDetailDialog
        track={selectedTrack}
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        onExploreChallenges={handleExploreChallengesFromTrack}
      />

      <ChallengeDetailDialog
        challenge={selectedChallenge}
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        onExploreTrack={handleExploreTrackFromChallenge}
      />
    </section>
  );
};
