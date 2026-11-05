import React from 'react';

interface IntroSceneProps {
  glowOpacity?: number;
}

export const IntroScene: React.FC<IntroSceneProps> = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep atmospheric winter night sky with aurora mist */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#051610] via-[#09271E] to-[#123D2B]" />

      {/* Diffused Moon & Winter Glow */}
      <div className="intro-moon absolute left-1/2 top-[16%] h-64 w-64 -translate-x-1/2 rounded-full bg-radial from-[#FFF4DF]/25 via-[#E9C578]/10 to-transparent blur-2xl" />
      <div className="intro-moon-core absolute left-1/2 top-[22%] h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#FFFDF8] to-[#FFF4DF] opacity-90 shadow-[0_0_50px_rgba(255,244,223,0.5)]" />

      {/* Subtle Aurora Borealis Ribbon */}
      <div className="intro-aurora absolute left-0 right-0 top-0 h-96 bg-gradient-to-r from-transparent via-[#25A18E]/15 to-transparent blur-3xl" />

      {/* Distant Mountain Silhouettes */}
      <svg
        className="intro-mountains absolute bottom-28 left-0 w-full text-[#061B14] opacity-55"
        viewBox="0 0 1440 320"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,160 L180,80 L360,190 L540,60 L720,180 L900,90 L1080,210 L1260,70 L1440,170 L1440,320 L0,320 Z" />
      </svg>

      {/* Midground Distant Snow-Covered Pines */}
      <div className="intro-forest absolute bottom-12 left-0 right-0 flex items-end justify-around px-8 opacity-75">
        {Array.from({ length: 14 }).map((_, idx) => {
          const height = 70 + (idx % 5) * 22;
          return (
            <svg
              key={idx}
              width="44"
              height={height}
              viewBox="0 0 44 90"
              fill="none"
              className="text-[#08221A] transition-all"
            >
              {/* Layered Pine Silhouette with Snow Crests */}
              <polygon points="22,4 10,34 34,34" fill="#0C3426" />
              <polygon points="22,4 18,14 26,14" fill="#E8F4F8" opacity="0.85" />
              <polygon points="22,24 6,56 38,56" fill="#0A2C20" />
              <polygon points="22,24 15,36 29,36" fill="#E8F4F8" opacity="0.85" />
              <polygon points="22,44 2,82 42,82" fill="#08221A" />
              <polygon points="22,44 12,58 32,58" fill="#E8F4F8" opacity="0.85" />
              <rect x="19" y="82" width="6" height="8" fill="#051610" />
            </svg>
          );
        })}
      </div>

      {/* Soft Snow Bank at Bottom */}
      <svg
        className="intro-snowbank absolute bottom-0 left-0 w-full text-[#0E3526] opacity-90"
        viewBox="0 0 1440 90"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,45 C240,80 480,20 720,55 C960,85 1200,30 1440,50 L1440,90 L0,90 Z" />
      </svg>
    </div>
  );
};
