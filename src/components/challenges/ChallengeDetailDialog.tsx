import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { ProjectChallenge, TrackCategory } from '../../types/tracksChallenges.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { FestiveButton } from '../ui/FestiveButton.tsx';

interface ChallengeDetailDialogProps {
  challenge: ProjectChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onExploreTrack: (trackId: TrackCategory) => void;
}

export const ChallengeDetailDialog: React.FC<ChallengeDetailDialogProps> = ({
  challenge,
  isOpen,
  onClose,
  onExploreTrack,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Scroll locking and escape key handling
  useEffect(() => {
    if (!isOpen || !challenge) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
  }, [isOpen, challenge, onClose]);

  if (!isOpen || !challenge) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#04120C]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl border border-[#E9C578]/50 bg-gradient-to-b from-[#09271E] to-[#061A13] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E9C578]/25">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/40 font-mono text-xs font-bold text-[#E9C578]">
              {challenge.number}
            </span>
            <FestiveBadge variant="ice" size="sm">
              SAMPLE IDEA
            </FestiveBadge>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close challenge details dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9C578]/30 bg-[#123D2B]/80 text-[#FFF4DF] hover:bg-[#C62835] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E9C578] uppercase tracking-wider font-mono">
            <Compass className="h-4 w-4" />
            <span>{challenge.trackTitle}</span>
          </div>

          <h3
            id="challenge-dialog-title"
            className="font-serif-festive text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]"
          >
            {challenge.title}
          </h3>

          <div className="rounded-xl border border-[#E9C578]/20 bg-[#123D2B]/40 p-4">
            <span className="text-[11px] font-mono text-[#E9C578] uppercase tracking-wider block mb-1">
              FOCUS CATEGORY: {challenge.type}
            </span>
            <p className="text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* Inspirational Prompt Note */}
          <div className="rounded-xl border border-[#E9C578]/25 bg-[#09271E] p-3.5 text-xs text-[#FFF4DF]/75 leading-relaxed">
            <span className="font-bold text-[#E9C578]">Inspiration Prompt: </span>
            Use this prompt as a spark to design your own custom solution or team project during the hackathon.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#E9C578]/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#E9C578]/50 text-xs font-semibold text-[#FFF4DF] bg-[#123D2B]/80 hover:bg-[#E9C578] hover:text-[#09271E] transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
