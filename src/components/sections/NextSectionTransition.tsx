import React from 'react';

/**
 * NextSectionTransition
 * Elegant visual bridge establishing a snowy forest edge and atmospheric transition
 * from the Benefits section into the Hackathon Tracks.
 */
export const NextSectionTransition: React.FC = () => {
  return (
    <div
      className="relative z-20 w-full overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Organic Snowy Hill Slope transitioning from cream #FFFBF2 into deep forest */}
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-14 sm:h-20 -mb-1 text-[#FFFBF2]"
      >
        <path
          d="M0,0 L1440,0 L1440,30 C1200,75 960,15 640,55 C320,95 120,35 0,45 Z"
          fill="#FFFBF2"
        />
        {/* Subtle gold crest along the snowline */}
        <path
          d="M0,45 C120,35 320,95 640,55 C960,15 1200,75 1440,30"
          stroke="rgba(233, 197, 120, 0.4)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="bg-gradient-to-b from-[#09271E] to-[#061B13] pt-6 pb-14">
        {/* Layered Snowy Tree Silhouette Divider */}
        <div className="relative w-full flex items-end justify-between px-6 opacity-35 max-w-6xl mx-auto">
          <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
            <polygon points="20,5 5,35 35,35" fill="#0C3426" />
            <polygon points="20,25 2,65 38,65" fill="#09271E" />
          </svg>

          {/* Central Starlight Accent */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 text-[#E9C578] opacity-75">
              <span className="text-xs">✦</span>
              <span className="text-base animate-twinkle">⭐</span>
              <span className="text-xs">✦</span>
            </div>
            <div className="h-[1px] w-48 sm:w-80 bg-gradient-to-r from-transparent via-[#E9C578]/50 to-transparent" />
          </div>

          <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
            <polygon points="20,5 5,35 35,35" fill="#0C3426" />
            <polygon points="20,25 2,65 38,65" fill="#09271E" />
          </svg>
        </div>
      </div>
    </div>
  );
};
