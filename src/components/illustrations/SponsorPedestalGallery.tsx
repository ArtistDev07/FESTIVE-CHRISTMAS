import React from 'react';

export const SponsorPedestalGallery: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto max-h-36 select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Warm Golden Solstice Halo */}
    <circle cx="100" cy="65" r="55" fill="#E9C578" opacity="0.15" />

    {/* Distant Evergreen Pines Silhouette */}
    <polygon points="35,40 22,75 48,75" fill="#0C3426" opacity="0.8" />
    <polygon points="35,40 28,55 42,55" fill="#FFF4DF" opacity="0.4" />
    <polygon points="165,40 152,75 178,75" fill="#0C3426" opacity="0.8" />
    <polygon points="165,40 158,55 172,55" fill="#FFF4DF" opacity="0.4" />

    {/* Grand Stepped Display Pedestal */}
    {/* Tier 1 (Base) */}
    <ellipse cx="100" cy="112" rx="72" ry="12" fill="#071E16" stroke="#E9C578" strokeWidth="1" />
    {/* Tier 2 (Middle) */}
    <ellipse cx="100" cy="98" rx="56" ry="9" fill="#09271E" stroke="#E9C578" strokeWidth="1.2" />
    <path d="M44 98 L44 105 Q100 115 156 105 L156 98 Z" fill="#061811" />
    {/* Tier 3 (Top Plinth) */}
    <ellipse cx="100" cy="85" rx="42" ry="7" fill="#123D2B" stroke="#FFD700" strokeWidth="1.5" />
    <path d="M58 85 L58 92 Q100 100 142 92 L142 85 Z" fill="#0D3425" />

    {/* Evergreen Pine Boughs & Holly around plinth */}
    <path d="M48 94 Q62 90 68 96 Q78 91 88 95" stroke="#226B4A" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M112 95 Q122 91 132 96 Q138 90 152 94" stroke="#226B4A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="68" cy="95" r="2" fill="#C62835" />
    <circle cx="88" cy="94" r="2" fill="#C62835" />
    <circle cx="114" cy="94" r="2" fill="#C62835" />
    <circle cx="132" cy="95" r="2" fill="#C62835" />

    {/* Partner Placard Frames on Pedestal */}
    {/* Left Partner Frame */}
    <g transform="translate(62, 54) rotate(-8)">
      <rect x="0" y="0" width="22" height="18" rx="2.5" fill="#09271E" stroke="#E9C578" strokeWidth="1.2" />
      <rect x="3" y="3" width="16" height="12" rx="1.5" fill="#051711" />
      {/* Handshake / Star Icon Silhouette */}
      <circle cx="11" cy="9" r="3" fill="#E9C578" opacity="0.8" />
    </g>

    {/* Right Partner Frame */}
    <g transform="translate(116, 52) rotate(8)">
      <rect x="0" y="0" width="22" height="18" rx="2.5" fill="#09271E" stroke="#E9C578" strokeWidth="1.2" />
      <rect x="3" y="3" width="16" height="12" rx="1.5" fill="#051711" />
      {/* Laurel / Shield Icon Silhouette */}
      <polygon points="11,6 14,9 13,12 9,12 8,9" fill="#E9C578" opacity="0.8" />
    </g>

    {/* Centerpiece Premier Gift Box on Plinth */}
    <rect x="86" y="52" width="28" height="26" rx="2.5" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
    {/* Gift Lid */}
    <rect x="84" y="48" width="32" height="6" rx="1.5" fill="#A41B26" stroke="#E9C578" strokeWidth="1" />
    {/* Gold Ribbon Crossing */}
    <line x1="100" y1="48" x2="100" y2="78" stroke="#FFD700" strokeWidth="2.5" />
    <line x1="86" y1="65" x2="114" y2="65" stroke="#FFD700" strokeWidth="2.5" />
    {/* Golden Solstice Bow */}
    <path d="M94 44 Q100 38 100 48 Q100 38 106 44" stroke="#FFD700" strokeWidth="2" fill="none" />
    <circle cx="100" cy="47" r="2" fill="#FFE27A" />

    {/* Radiating Solstice Stars Above Gift */}
    <polygon points="100,18 102,24 108,25 103,29 105,35 100,31 95,35 97,29 92,25 98,24" fill="#FFD700" />
    <circle cx="75" cy="30" r="1.5" fill="#FFF4DF" opacity="0.8" />
    <circle cx="125" cy="28" r="1.8" fill="#FFEA9F" opacity="0.9" />
    <circle cx="100" cy="18" r="4" fill="#FFD700" opacity="0.3" />
  </svg>
);
