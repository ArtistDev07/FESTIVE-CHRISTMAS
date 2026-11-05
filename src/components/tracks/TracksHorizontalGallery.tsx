import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Monitor,
  Leaf,
  Sparkles,
  HeartHandshake,
  Gift,
  ExternalLink,
} from 'lucide-react';
import { HackathonTrack } from '../../types/tracksChallenges.ts';
import { AIWinterWorkshop } from '../illustrations/AIWinterWorkshop.tsx';
import { DigitalMakerStudio } from '../illustrations/DigitalMakerStudio.tsx';
import { EcoWinterScene } from '../illustrations/EcoWinterScene.tsx';
import { CreativeLabScene } from '../illustrations/CreativeLabScene.tsx';
import { SponsorPedestalGallery } from '../illustrations/SponsorPedestalGallery.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

interface TracksHorizontalGalleryProps {
  tracks: HackathonTrack[];
  onExploreTrack?: (track: HackathonTrack) => void;
}

export const TracksHorizontalGallery: React.FC<TracksHorizontalGalleryProps> = ({
  tracks,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.gallery-panel');
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setActivePanelIndex(idx);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth / (window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    const newIdx = Math.round(scrollLeft / (cardWidth || 1));
    setActivePanelIndex(Math.min(Math.max(newIdx, 0), 4));
  };


  return (
    <div className="relative mt-16 sm:mt-20 w-full">
      {/* Editorial Frame Outer Container */}
      <div className="relative rounded-3xl border border-[#E9C578]/40 bg-gradient-to-b from-[#0B2A1E]/95 via-[#082218]/95 to-[#051811] p-2.5 sm:p-4 lg:p-5 shadow-[0_20px_50px_rgba(4,20,15,0.75)] backdrop-blur-2xl">
        {/* Subtle Decorative Golden Corner Accents */}
        <div className="pointer-events-none absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 border-[#E9C578] rounded-tl-xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 border-[#E9C578] rounded-tr-xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 border-[#E9C578] rounded-bl-xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-6 w-6 border-b-2 border-r-2 border-[#E9C578] rounded-br-xl" aria-hidden="true" />

        {/* Gallery Top Editorial Bar */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 mb-2 sm:mb-4 border-b border-[#E9C578]/15">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E9C578] font-bold">
              ✦ EXHIBITION GALLERY • 5 PATHWAYS ✦
            </span>
          </div>

          {/* Navigation Controls (Visible on viewports where scrolling occurs) */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activePanelIndex - 1, 0))}
              disabled={activePanelIndex === 0}
              className="p-1.5 rounded-full border border-[#E9C578]/30 bg-[#061811] text-[#FFF4DF] hover:border-[#E9C578] hover:text-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous gallery panel"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-[#E9C578]">
              {activePanelIndex + 1} / 5
            </span>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(activePanelIndex + 1, 4))}
              disabled={activePanelIndex === 4}
              className="p-1.5 rounded-full border border-[#E9C578]/30 bg-[#061811] text-[#FFF4DF] hover:border-[#E9C578] hover:text-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next gallery panel"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Continuous Strip (5 Panels) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none xl:grid xl:grid-cols-5 xl:divide-x xl:divide-[#E9C578]/20 gap-4 xl:gap-0"
        >
          {/* PANEL 01 — AI & MAGIC OF INTELLIGENCE */}
          {tracks[0] && (
            <div className="gallery-panel snap-start shrink-0 w-[85vw] sm:w-[48vw] md:w-[45vw] lg:w-[32vw] xl:w-auto xl:shrink flex flex-col justify-between p-4 sm:p-5 xl:px-4 xl:py-5 rounded-2xl xl:rounded-none bg-[#09271E]/70 xl:bg-transparent border xl:border-0 border-[#E9C578]/25 hover:bg-[#0E3426]/80 transition-all duration-300 group">
              <div>
                {/* Header Pattern & Number */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/20">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 text-xs font-mono font-bold text-[#E9C578]">
                      01
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9ECF5]/80 font-semibold">
                      AI &amp; INTELLIGENCE
                    </span>
                  </div>
                  <Cpu className="h-4 w-4 text-[#D9ECF5]" />
                </div>

                {/* Knitted Frost & Neural Geometric Pattern Strip */}
                <div className="my-2 h-1 w-full bg-[linear-gradient(90deg,#D9ECF5_25%,transparent_25%),linear-gradient(90deg,#E9C578_50%,transparent_50%)] bg-[length:12px_2px] opacity-40" />

                {/* Main Illustrated Artwork */}
                <div className="my-3 flex items-center justify-center p-3 rounded-2xl bg-[#051711]/80 border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                  <AIWinterWorkshop className="max-h-36" />
                </div>

                {/* Track Title */}
                <h3 className="font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors">
                  {tracks[0].title}
                </h3>

                {/* Tagline */}
                <p className="mt-1 font-serif-festive italic text-xs sm:text-sm font-medium tracking-wide text-[#D9ECF5]">
                  "{tracks[0].tagline}"
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
                  {tracks[0].description}
                </p>
              </div>
            </div>
          )}

          {/* PANEL 02 — WEB, APP & DIGITAL EXPERIENCES */}
          {tracks[1] && (
            <div className="gallery-panel snap-start shrink-0 w-[85vw] sm:w-[48vw] md:w-[45vw] lg:w-[32vw] xl:w-auto xl:shrink flex flex-col justify-between p-4 sm:p-5 xl:px-4 xl:py-5 rounded-2xl xl:rounded-none bg-[#09271E]/70 xl:bg-transparent border xl:border-0 border-[#E9C578]/25 hover:bg-[#0E3426]/80 transition-all duration-300 group">
              <div>
                {/* Header Pattern & Number */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/20">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 text-xs font-mono font-bold text-[#E9C578]">
                      02
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#EF4050] font-semibold">
                      WEB &amp; DIGITAL
                    </span>
                  </div>
                  <Monitor className="h-4 w-4 text-[#EF4050]" />
                </div>

                {/* Candy-Cane Diagonal Pattern Strip */}
                <div className="my-2 h-1 w-full bg-[repeating-linear-gradient(45deg,#EF4050,#EF4050_4px,#FFF4DF_4px,#FFF4DF_8px)] opacity-35" />

                {/* Main Illustrated Artwork */}
                <div className="my-3 flex items-center justify-center p-3 rounded-2xl bg-[#051711]/80 border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                  <DigitalMakerStudio className="max-h-36" />
                </div>

                {/* Track Title */}
                <h3 className="font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors">
                  {tracks[1].title}
                </h3>

                {/* Tagline */}
                <p className="mt-1 font-serif-festive italic text-xs sm:text-sm font-medium tracking-wide text-[#EF4050]">
                  "{tracks[1].tagline}"
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
                  {tracks[1].description}
                </p>
              </div>
            </div>
          )}

          {/* PANEL 03 — CLIMATE, COMMUNITY & GOOD */}
          {tracks[2] && (
            <div className="gallery-panel snap-start shrink-0 w-[85vw] sm:w-[48vw] md:w-[45vw] lg:w-[32vw] xl:w-auto xl:shrink flex flex-col justify-between p-4 sm:p-5 xl:px-4 xl:py-5 rounded-2xl xl:rounded-none bg-[#09271E]/70 xl:bg-transparent border xl:border-0 border-[#E9C578]/25 hover:bg-[#0E3426]/80 transition-all duration-300 group">
              <div>
                {/* Header Pattern & Number */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/20">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 text-xs font-mono font-bold text-[#E9C578]">
                      03
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#25A18E] font-semibold">
                      CLIMATE &amp; GOOD
                    </span>
                  </div>
                  <Leaf className="h-4 w-4 text-[#25A18E]" />
                </div>

                {/* Evergreen Bough & Snowflake Pattern Strip */}
                <div className="my-2 h-1 w-full bg-[radial-gradient(#25A18E_1px,transparent_1px)] bg-[size:8px_8px] opacity-50" />

                {/* Main Illustrated Artwork */}
                <div className="my-3 flex items-center justify-center p-3 rounded-2xl bg-[#051711]/80 border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                  <EcoWinterScene className="max-h-36" />
                </div>

                {/* Track Title */}
                <h3 className="font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors">
                  {tracks[2].title}
                </h3>

                {/* Tagline */}
                <p className="mt-1 font-serif-festive italic text-xs sm:text-sm font-medium tracking-wide text-[#25A18E]">
                  "{tracks[2].tagline}"
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
                  {tracks[2].description}
                </p>
              </div>
            </div>
          )}

          {/* PANEL 04 — OPEN INNOVATION & CREATIVE EXPERIMENTS */}
          {tracks[3] && (
            <div className="gallery-panel snap-start shrink-0 w-[85vw] sm:w-[48vw] md:w-[45vw] lg:w-[32vw] xl:w-auto xl:shrink flex flex-col justify-between p-4 sm:p-5 xl:px-4 xl:py-5 rounded-2xl xl:rounded-none bg-[#09271E]/70 xl:bg-transparent border xl:border-0 border-[#E9C578]/25 hover:bg-[#0E3426]/80 transition-all duration-300 group">
              <div>
                {/* Header Pattern & Number */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/20">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 text-xs font-mono font-bold text-[#E9C578]">
                      04
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFD700] font-semibold">
                      OPEN INNOVATION
                    </span>
                  </div>
                  <Sparkles className="h-4 w-4 text-[#FFD700]" />
                </div>

                {/* Festive Geometric Starlight Pattern Strip */}
                <div className="my-2 h-1 w-full bg-[linear-gradient(90deg,#FFD700_33%,#E9C578_66%,transparent_66%)] bg-[length:9px_2px] opacity-45" />

                {/* Main Illustrated Artwork */}
                <div className="my-3 flex items-center justify-center p-3 rounded-2xl bg-[#051711]/80 border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                  <CreativeLabScene className="max-h-36" />
                </div>

                {/* Track Title */}
                <h3 className="font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors">
                  {tracks[3].title}
                </h3>

                {/* Tagline */}
                <p className="mt-1 font-serif-festive italic text-xs sm:text-sm font-medium tracking-wide text-[#FFD700]">
                  "{tracks[3].tagline}"
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
                  {tracks[3].description}
                </p>
              </div>
            </div>
          )}

          {/* PANEL 05 — SPONSORS & PARTNERS (Dedicated Partner Recognition Panel) */}
          <div className="gallery-panel snap-start shrink-0 w-[85vw] sm:w-[48vw] md:w-[45vw] lg:w-[32vw] xl:w-auto xl:shrink flex flex-col justify-between p-4 sm:p-5 xl:px-4 xl:py-5 rounded-2xl xl:rounded-none bg-gradient-to-b from-[#184833]/90 via-[#0E3425]/90 to-[#071E16] xl:bg-gradient-to-b xl:from-[#184833]/60 xl:via-[#0E3425]/60 xl:to-transparent border xl:border-0 border-[#FFD700]/40 hover:border-[#FFD700] transition-all duration-300 group">
            <div>
              {/* Header: Recognition Category Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-[#FFD700]/30">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C62835] border border-[#FFF4DF] text-xs font-mono font-bold text-[#FFFFFF] shadow-sm">
                    ✦
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFD700] font-bold">
                    COMMUNITY &amp; PATRONS
                  </span>
                </div>
                <HeartHandshake className="h-4 w-4 text-[#FFD700]" />
              </div>

              {/* Golden Solstice Star Pattern Strip */}
              <div className="my-2 h-1 w-full bg-[radial-gradient(#FFD700_1.5px,transparent_1.5px)] bg-[size:10px_10px] opacity-60" />

              {/* Main Illustrated Artwork: Sponsor Pedestal Gallery */}
              <div className="my-3 flex items-center justify-center p-3 rounded-2xl bg-[#051711]/90 border border-[#E9C578]/30 transition-transform duration-500 group-hover:scale-[1.03] shadow-[0_0_15px_rgba(233,197,120,0.15)]">
                <SponsorPedestalGallery className="max-h-36" />
              </div>

              {/* Title */}
              <h3 className="font-serif-festive text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFD700] transition-colors">
                Sponsors &amp; Partners
              </h3>

              {/* Tagline */}
              <p className="mt-1 font-serif-festive italic text-xs sm:text-sm font-medium tracking-wide text-[#E9C578]">
                "Together, we make the magic happen."
              </p>

              {/* Description */}
              <p className="mt-2.5 text-xs text-[#D9ECF5]/85 font-sans-festive leading-relaxed">
                Meet the organizations, developer platforms, and communities supporting the Festive Christmas hackathon.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Pagination Dots */}
        <div className="flex xl:hidden items-center justify-center gap-2 pt-4 mt-2 border-t border-[#E9C578]/15">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                activePanelIndex === idx
                  ? 'w-6 bg-[#E9C578]'
                  : 'w-2 bg-[#E9C578]/30 hover:bg-[#E9C578]/60'
              }`}
              aria-label={`Go to panel ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
