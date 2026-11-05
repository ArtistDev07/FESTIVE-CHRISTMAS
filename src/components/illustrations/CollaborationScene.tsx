import React from 'react';

export interface CollaborationSceneProps {
  className?: string;
}

export const CollaborationScene: React.FC<CollaborationSceneProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-lg select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${className}`}
      aria-hidden="true"
    >
      {/* Knitted Pattern Border Frame */}
      <div className="relative rounded-2xl border-2 border-[#E9C578]/40 bg-gradient-to-b from-[#09271E]/95 to-[#051812]/95 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Knitted Pattern Top & Bottom Edge Accents */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#C62835,#C62835_6px,#E9C578_6px,#E9C578_12px,#09271E_12px,#09271E_18px)] opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#C62835,#C62835_6px,#E9C578_6px,#E9C578_12px,#09271E_12px,#09271E_18px)] opacity-60" />

        {/* Interior Illustration */}
        <svg
          viewBox="0 0 460 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {/* Warm workshop interior backdrop */}
          <rect x="20" y="20" width="420" height="280" rx="12" fill="#072017" />

          {/* Wooden Wall Slats & Hanging Garland */}
          <path
            d="M30 40 Q130 65 230 45 Q330 65 430 40"
            stroke="#123D2B"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M30 40 Q130 65 230 45 Q330 65 430 40"
            stroke="#25A18E"
            strokeWidth="3"
            strokeDasharray="4 6"
          />
          {/* Hanging Red Berries / Bells */}
          <circle cx="90" cy="53" r="4.5" fill="#EF4050" />
          <circle cx="170" cy="58" r="4.5" fill="#E9C578" />
          <circle cx="280" cy="56" r="4.5" fill="#EF4050" />
          <circle cx="360" cy="52" r="4.5" fill="#E9C578" />

          {/* Collaborative Builder Worktable */}
          <g id="worktable" transform="translate(45, 170)">
            {/* Table Surface */}
            <rect x="0" y="0" width="370" height="18" rx="3" fill="#3D2314" />
            <rect x="4" y="3" width="362" height="6" fill="#52321E" />
            {/* Table Legs */}
            <rect x="25" y="18" width="12" height="100" fill="#24150B" />
            <rect x="333" y="18" width="12" height="100" fill="#24150B" />
            <rect x="180" y="18" width="10" height="100" fill="#24150B" />

            {/* Glowing Laptop / Terminal Screen with Code */}
            <g transform="translate(145, -55)">
              {/* Laptop Screen Body */}
              <rect x="0" y="0" width="80" height="52" rx="4" fill="#0C3426" stroke="#E9C578" strokeWidth="1.5" />
              {/* Screen Display with Terminal Code */}
              <rect x="4" y="4" width="72" height="44" rx="2" fill="#04120C" />
              {/* Green Code Lines */}
              <line x1="10" y1="14" x2="35" y2="14" stroke="#25A18E" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="40" y1="14" x2="65" y2="14" stroke="#E9C578" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="22" x2="55" y2="22" stroke="#FFF4DF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="30" x2="45" y2="30" stroke="#EF4050" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="38" x2="30" y2="38" stroke="#25A18E" strokeWidth="2.5" strokeLinecap="round" />
              {/* Keyboard Base */}
              <polygon points="-8,56 88,56 80,52 0,52" fill="#0C3426" />
            </g>

            {/* Blueprint Scroll & Measuring Ruler (Left side of table) */}
            <g transform="translate(25, -28)">
              {/* Unrolled Blueprint Paper */}
              <rect x="0" y="0" width="85" height="26" rx="2" fill="#0D3552" stroke="#D9ECF5" strokeWidth="1" />
              {/* Blueprint Grid & Architecture Lines */}
              <line x1="10" y1="6" x2="75" y2="6" stroke="#D9ECF5" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
              <line x1="10" y1="13" x2="75" y2="13" stroke="#D9ECF5" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
              <line x1="10" y1="20" x2="50" y2="20" stroke="#E9C578" strokeWidth="1.5" />
              <circle cx="65" cy="13" r="5" stroke="#E9C578" strokeWidth="1" />
            </g>

            {/* Glowing Holiday Lantern (Right side of table) */}
            <g transform="translate(280, -60)">
              {/* Lantern Metal Frame */}
              <rect x="10" y="10" width="28" height="48" rx="3" fill="#18100A" stroke="#E9C578" strokeWidth="1.5" />
              {/* Glass Chamber with Warm Light */}
              <rect x="14" y="16" width="20" height="36" rx="2" fill="#F59E0B" className="animate-cabin-light" />
              <circle cx="24" cy="34" r="7" fill="#FEF08A" />
              {/* Top Handle */}
              <circle cx="24" cy="6" r="6" stroke="#E9C578" strokeWidth="1.5" fill="none" />
              {/* Lantern Roof */}
              <polygon points="24,2 6,12 42,12" fill="#3D2314" stroke="#E9C578" strokeWidth="1" />
            </g>

            {/* Steaming Mug of Hot Cocoa with Marshmallows */}
            <g transform="translate(115, -24)">
              <rect x="0" y="4" width="18" height="20" rx="3" fill="#C62835" />
              <path d="M18 9 C24 9 24 19 18 19" stroke="#C62835" strokeWidth="2.5" fill="none" />
              <rect x="2" y="3" width="14" height="3" rx="1.5" fill="#FFF4DF" />
              {/* Steam curl */}
              <path d="M8 0 Q11 -8 7 -14" stroke="#D9ECF5" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            </g>
          </g>

          {/* Collaborative Brainstorming Idea Sparks Floating Above Table */}
          <g className="animate-twinkle">
            <circle cx="230" cy="85" r="3.5" fill="#FFD700" />
            <path d="M230 75 L230 95 M220 85 L240 85" stroke="#FFD700" strokeWidth="1.5" />
            <circle cx="160" cy="95" r="2.5" fill="#FFF4DF" />
            <circle cx="310" cy="80" r="2.5" fill="#E9C578" />
          </g>
        </svg>

        {/* Small Evergreen sprig detail overlapping corner */}
        <div className="absolute -bottom-2 -left-2 text-2xl" role="img" aria-label="Pine branch">
          🌲
        </div>
      </div>
    </div>
  );
};
