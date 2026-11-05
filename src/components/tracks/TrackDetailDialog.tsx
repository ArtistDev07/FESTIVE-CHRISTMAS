import React, { useEffect, useRef } from 'react';
import { X, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { HackathonTrack } from '../../types/tracksChallenges.ts';
import { projectChallenges, areChallengesRevealed } from '../../config/tracksChallenges.ts';
import { FestiveButton } from '../ui/FestiveButton.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { AIWinterWorkshop } from '../illustrations/AIWinterWorkshop.tsx';
import { DigitalMakerStudio } from '../illustrations/DigitalMakerStudio.tsx';
import { EcoWinterScene } from '../illustrations/EcoWinterScene.tsx';
import { CreativeLabScene } from '../illustrations/CreativeLabScene.tsx';

interface TrackDetailDialogProps {
  track: HackathonTrack | null;
  isOpen: boolean;
  onClose: () => void;
  onExploreChallenges: (trackId: HackathonTrack['id']) => void;
}

export const TrackDetailDialog: React.FC<TrackDetailDialogProps> = ({
  track,
  isOpen,
  onClose,
  onExploreChallenges,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Scroll lock and escape key handling
  useEffect(() => {
    if (!isOpen || !track) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, track, onClose]);

  if (!isOpen || !track) return null;

  const associatedChallenges = projectChallenges.filter(
    (ch) => ch.trackId === track.id
  );

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="track-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#04120C]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Panel */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-[#E9C578]/50 bg-gradient-to-b from-[#09271E] to-[#061A13] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E9C578]/25">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 font-mono text-sm font-bold text-[#E9C578]">
              {track.number}
            </span>
            <FestiveBadge variant="gold" size="sm">
              PROPOSED CATEGORY
            </FestiveBadge>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close track details dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9C578]/30 bg-[#123D2B]/80 text-[#FFF4DF] hover:bg-[#C62835] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-6">
          {/* Track Illustration Banner */}
          <div className="p-4 rounded-2xl bg-[#051711]/70 border border-white/5 flex items-center justify-center max-h-44 overflow-hidden">
            {renderIllustration()}
          </div>

          {/* Title and Tagline */}
          <div>
            <h3
              id="track-dialog-title"
              className="font-serif-festive text-3xl font-bold tracking-tight text-[#FFFFFF]"
            >
              {track.title}
            </h3>
            <p
              className="mt-1 font-serif-festive italic text-base font-medium"
              style={{ color: track.accentColor }}
            >
              "{track.tagline}"
            </p>
          </div>

          {/* Full Track Description */}
          <p className="text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
            {track.description}
          </p>

          {/* Associated Challenges or Event-Day Reveal Status */}
          {!areChallengesRevealed ? (
            <div className="rounded-2xl border border-[#E9C578]/30 bg-[#09271E] p-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E9C578]/30 bg-[#061811] px-3.5 py-1 text-[11px] font-mono font-bold text-[#FFD700] mb-2">
                <Sparkles className="h-3 w-3 text-[#E9C578]" />
                <span>REVEAL ON EVENT DAY</span>
              </div>
              <h4 className="font-serif-festive text-lg font-bold text-[#FFFFFF]">
                Official Problem Statements Kept Under Wraps
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#D9ECF5]/85 font-sans-festive leading-relaxed max-w-md mx-auto">
                Official challenges for this track will be revealed live during the Opening Ceremony. Get your team ready and explore the track themes!
              </p>
            </div>
          ) : (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E9C578] mb-3">
                Official Project Prompts in This Track
              </h4>
              <div className="space-y-3">
                {associatedChallenges.map((ch) => (
                  <div
                    key={ch.id}
                    className="rounded-xl border border-[#E9C578]/20 bg-[#123D2B]/40 p-4 transition-colors hover:border-[#E9C578]/40"
                  >
                    <div className="flex items-center justify-between text-xs text-[#E9C578] font-mono">
                      <span>PROMPT #{ch.number}</span>
                      <span className="text-[#D9ECF5]/70">{ch.type}</span>
                    </div>
                    <h5 className="font-serif-festive text-base font-bold text-[#FFFFFF] mt-1">
                      {ch.title}
                    </h5>
                    <p className="mt-1 text-xs sm:text-sm text-[#D9ECF5]/80 leading-relaxed">
                      {ch.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Note */}
          <div className="rounded-xl border border-[#E9C578]/25 bg-[#09271E] p-3.5 text-xs text-[#FFF4DF]/75 leading-relaxed">
            <span className="font-bold text-[#E9C578]">Note: </span>
            Track categories and project prompts are illustrative examples to inspire creative exploration until officially confirmed by the event organizers.
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-8 pt-4 border-t border-[#E9C578]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold text-[#FFF4DF] hover:bg-white/5 transition-colors"
          >
            Close
          </button>

          <FestiveButton
            variant="primary"
            size="md"
            onClick={() => onExploreChallenges(track.id)}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Explore Challenges
          </FestiveButton>
        </div>
      </div>
    </div>
  );
};
