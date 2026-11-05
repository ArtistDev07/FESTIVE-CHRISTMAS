import React from 'react';
import { ArrowRight, Cpu, Monitor, Leaf, Sparkles } from 'lucide-react';
import { HackathonTrack } from '../../types/tracksChallenges.ts';
import { AIWinterWorkshop } from '../illustrations/AIWinterWorkshop.tsx';
import { DigitalMakerStudio } from '../illustrations/DigitalMakerStudio.tsx';
import { EcoWinterScene } from '../illustrations/EcoWinterScene.tsx';
import { CreativeLabScene } from '../illustrations/CreativeLabScene.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface HackathonTrackCardProps {
  track: HackathonTrack;
  onExplore?: (track: HackathonTrack) => void;
}

export const HackathonTrackCard: React.FC<HackathonTrackCardProps> = ({
  track,
}) => {
  const renderIllustration = () => {
    switch (track.id) {
      case 'ai-magic':
        return <AIWinterWorkshop />;
      case 'web-apps':
        return <DigitalMakerStudio />;
      case 'climate-community':
        return <EcoWinterScene />;
      case 'open-innovation':
      default:
        return <CreativeLabScene />;
    }
  };

  const renderIcon = () => {
    switch (track.iconName) {
      case 'brain':
        return <Cpu className="h-4 w-4" style={{ color: track.accentColor }} />;
      case 'device':
        return <Monitor className="h-4 w-4" style={{ color: track.accentColor }} />;
      case 'leaf':
        return <Leaf className="h-4 w-4" style={{ color: track.accentColor }} />;
      case 'sparkles':
      default:
        return <Sparkles className="h-4 w-4" style={{ color: track.accentColor }} />;
    }
  };

  return (
    <div
      className="group relative flex flex-col justify-between rounded-3xl border border-[#E9C578]/35 bg-gradient-to-b from-[#0B2A1F]/90 to-[#071E16]/95 p-6 sm:p-7 shadow-[0_12px_32px_rgba(4,20,15,0.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_45px_rgba(233,197,120,0.15)]"
      role="article"
      aria-labelledby={`track-title-${track.id}`}
    >
      {/* Top Banner: Track Number & Category Icon */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/20">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 text-xs font-mono font-bold text-[#E9C578]">
              {track.number}
            </span>
            <FestiveBadge variant="gold" size="sm">
              PROPOSED TRACK
            </FestiveBadge>
          </div>

          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
            style={{ backgroundColor: track.accentBg }}
          >
            {renderIcon()}
          </div>
        </div>

        {/* Handcrafted Track Illustration */}
        <div className="my-4 flex items-center justify-center p-2 rounded-2xl bg-[#051711]/60 border border-white/5 transition-transform duration-300 group-hover:scale-[1.02]">
          {renderIllustration()}
        </div>

        {/* Track Title */}
        <h3
          id={`track-title-${track.id}`}
          className="font-serif-festive text-2xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors"
        >
          {track.title}
        </h3>

        {/* Tagline */}
        <p
          className="mt-1 font-serif-festive italic text-sm font-medium tracking-wide"
          style={{ color: track.accentColor }}
        >
          "{track.tagline}"
        </p>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed line-clamp-3">
          {track.description}
        </p>
      </div>

      {/* Card Footer: Challenge Count */}
      <div className="mt-6 pt-4 border-t border-[#E9C578]/20 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#D9ECF5]/60">
          {track.challengeIds.length} SAMPLE CHALLENGES
        </span>
      </div>
    </div>
  );
};
