import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig.ts';

interface HeroActionsProps {
  onReplayIntro?: () => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({ onReplayIntro }) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isRegistrationAvailable =
    eventConfig.registrationStatus === 'open' && Boolean(eventConfig.registrationUrl);

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleSecondaryClick = () => {
    // Integration point for Phase 2 overview anchor (#overview)
    const targetElement = document.querySelector(eventConfig.secondaryTargetAnchor);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setToastMessage(
        'Explore the sections below or stay tuned for Challenge Tracks in Phase 4!'
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <div className="hero-actions-container relative mt-6 sm:mt-8 flex flex-col items-center">
      {/* Action Buttons Row: Staggered mobile hierarchy centered between trees, side-by-side full layout on desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto mx-auto px-2 sm:px-0">
        {/* Primary Action Button: "Join the Hackathon" (Top, wider stepped button) */}
        {isRegistrationAvailable ? (
          <button
            onClick={handlePrimaryClick}
            className="festive-btn-primary group relative flex w-full max-w-[190px] sm:max-w-none sm:w-auto items-center justify-center gap-1.5 sm:gap-3 rounded-full px-3.5 py-2 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-xs sm:text-sm md:text-base font-bold tracking-wide shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E]"
            aria-label="Join the Hackathon: Register for Festive Christmas 2026"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FFF4DF] transition-transform group-hover:rotate-12 animate-twinkle shrink-0" />
            <span className="whitespace-nowrap">Join the Hackathon</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#FFF4DF] transition-transform group-hover:translate-x-1 shrink-0" />
          </button>
        ) : (
          <button
            disabled
            className="flex w-full max-w-[190px] sm:max-w-none sm:w-auto cursor-not-allowed items-center justify-center gap-1.5 rounded-full border border-gray-600 bg-gray-800/80 px-3.5 py-2 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-xs sm:text-sm font-semibold text-gray-400"
            aria-disabled="true"
          >
            <span>Registration Opening Soon</span>
          </button>
        )}

        {/* Secondary Action Button: "Explore the Event" (Bottom, noticeably narrower stepped button) */}
        <button
          onClick={handleSecondaryClick}
          className="festive-btn-secondary group flex w-full max-w-[155px] sm:max-w-none sm:w-auto items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 py-1.5 sm:px-5 sm:py-3.5 md:px-7 md:py-4 text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E]"
          aria-label="Explore the Event: Discover schedule, tracks, and prizes"
        >
          <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#E9C578] transition-transform group-hover:rotate-45 shrink-0" />
          <span className="whitespace-nowrap">Explore the Event</span>
        </button>
      </div>

      {/* Elegant Toast notification for Phase 1 integration points */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl border border-[#E9C578]/50 bg-[#072218]/95 px-5 py-3 text-sm text-[#FFF4DF] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fade-in"
        >
          <CheckCircle2 className="h-5 w-5 text-[#E9C578] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
