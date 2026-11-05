import React from 'react';

/**
 * HeroToContentTransition
 * Seamless visual bridge at the bottom of the cinematic hero transitioning
 * into the snow-covered clearing and introductory content.
 */
export const HeroToContentTransition: React.FC = () => {
  return (
    <div
      className="relative -mt-16 sm:-mt-24 z-30 w-full overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Layered Snowy Drifts Transitioning into Content */}
      <svg
        viewBox="0 0 1440 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-24 sm:h-36 md:h-44 text-[#061C14]"
      >
        {/* Deep Forest Backing Slope */}
        <path
          d="M0,80 C320,140 640,30 960,95 C1200,145 1360,60 1440,90 L1440,180 L0,180 Z"
          fill="#061C14"
        />

        {/* Midground Snow Drift */}
        <path
          d="M0,105 C280,50 620,150 940,80 C1220,20 1380,120 1440,95 L1440,180 L0,180 Z"
          fill="#09271E"
          opacity="0.95"
        />

        {/* Foreground Frost Line with Subtle Golden Ambient Glow */}
        <path
          d="M0,130 C360,75 720,165 1080,95 C1280,55 1400,125 1440,110 L1440,180 L0,180 Z"
          fill="#09271E"
        />

        {/* Delicate Golden Crest Line along the snow ridge */}
        <path
          d="M0,130 C360,75 720,165 1080,95 C1280,55 1400,125 1440,110"
          stroke="rgba(233, 197, 120, 0.3)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Decorative Knitted Geometric Divider Border */}
      <div className="w-full bg-[#09271E] py-2">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-center gap-3 opacity-40">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E9C578] to-transparent" />
          <div className="flex items-center gap-2 text-[#E9C578] text-xs font-mono">
            <span>❄</span>
            <span>✦</span>
            <span>❄</span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E9C578] to-transparent" />
        </div>
      </div>
    </div>
  );
};
