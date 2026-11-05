import React from 'react';

export const EcoWinterScene: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto max-h-32 select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Soft green radial halo */}
    <circle cx="100" cy="65" r="55" fill="#25A18E" opacity="0.12" />

    {/* Snow-covered Hill Base */}
    <path d="M0 90 Q60 76 120 86 Q160 92 200 84 L200 130 L0 130 Z" fill="#0C3426" />
    <path d="M0 95 Q60 81 120 91 Q160 97 200 89 L200 130 L0 130 Z" fill="#072218" />

    {/* Distant evergreen pine tree on left */}
    <g transform="translate(25, 30)">
      <polygon points="20,10 5,42 35,42" fill="#134430" />
      <polygon points="20,10 14,24 26,24" fill="#EAF4F4" opacity="0.8" />
      <polygon points="20,28 0,65 40,65" fill="#0F3827" />
      <polygon points="20,28 10,44 30,44" fill="#EAF4F4" opacity="0.8" />
      <rect x="18" y="65" width="4" height="8" fill="#3D2314" />
    </g>

    {/* Community Winter Greenhouse (Center-Right) */}
    <g transform="translate(110, 48)">
      {/* Greenhouse Base & Frame */}
      <rect x="0" y="16" width="60" height="38" rx="2" fill="#061A12" stroke="#25A18E" strokeWidth="1.2" />
      {/* Glass roof arches */}
      <path d="M0 16 Q30 -4 60 16" stroke="#25A18E" strokeWidth="1.5" fill="#09271E" fillOpacity="0.7" />
      {/* Interior warm plant glow */}
      <circle cx="30" cy="28" r="14" fill="#FEF08A" opacity="0.25" />
      {/* Interior Sprout / Potted Plant */}
      <rect x="25" y="42" width="10" height="10" rx="1.5" fill="#52321E" />
      <path d="M30 42 C24 34 26 26 30 22 C34 26 36 34 30 42 Z" fill="#25A18E" />
      <path d="M30 42 C36 36 40 32 44 34 C42 38 36 41 30 42 Z" fill="#3DD8BA" />
      {/* Snow on greenhouse roof */}
      <path d="M-2 16 Q30 -6 62 16 Q30 0 -2 16 Z" fill="#FFFFFF" opacity="0.9" />
    </g>

    {/* Glowing Eco Sprout in Snow (Foreground Left) */}
    <g transform="translate(75, 62)">
      <circle cx="15" cy="15" r="16" fill="#25A18E" opacity="0.2" className="animate-twinkle" />
      {/* Dual green leaf sprout with glowing golden dewdrop */}
      <path d="M15 28 Q15 14 6 12 Q4 22 15 28 Z" fill="#25A18E" />
      <path d="M15 28 Q15 8 26 6 Q28 18 15 28 Z" fill="#3DD8BA" />
      <circle cx="21" cy="9" r="2.5" fill="#FFD700" />
    </g>

    {/* Sparkling Stars */}
    <circle cx="85" cy="25" r="2" fill="#FFD700" className="animate-twinkle" />
    <circle cx="175" cy="30" r="1.5" fill="#FFF4DF" />
  </svg>
);
