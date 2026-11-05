import React from 'react';

export const CreativeLabScene: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto max-h-32 select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Soft gold/candy red radial halo */}
    <circle cx="100" cy="65" r="55" fill="#FFD700" opacity="0.1" />

    {/* Worktable Base */}
    <rect x="25" y="86" width="150" height="10" rx="2" fill="#3D2314" stroke="#E9C578" strokeWidth="0.8" />
    <rect x="40" y="96" width="8" height="28" fill="#24150B" />
    <rect x="152" y="96" width="8" height="28" fill="#24150B" />

    {/* Creative Chemistry Flask / Festive Beaker with Magic Potion (Left) */}
    <g transform="translate(42, 50)">
      <polygon points="12,8 24,8 32,32 4,32" fill="#123D2B" stroke="#E9C578" strokeWidth="1" />
      <rect x="15" y="2" width="6" height="7" fill="#3D2314" stroke="#E9C578" strokeWidth="1" />
      {/* Golden Bubbling Liquid inside */}
      <polygon points="7,28 29,28 32,32 4,32" fill="#FFD700" />
      <circle cx="18" cy="22" r="2" fill="#FEF08A" />
      <circle cx="14" cy="15" r="1.5" fill="#FEF08A" />
      <circle cx="21" cy="11" r="1.5" fill="#FFF4DF" />
    </g>

    {/* Playful Whimsical Festive Invention Machine (Center) */}
    <g transform="translate(85, 38)">
      {/* Machine Main Body */}
      <rect x="0" y="16" width="45" height="32" rx="3" fill="#0C3426" stroke="#EF4050" strokeWidth="1.2" />
      {/* Rotating Mechanical Gears */}
      <circle cx="15" cy="32" r="8" fill="#3D2314" stroke="#FFD700" strokeWidth="1.2" />
      <circle cx="15" cy="32" r="3" fill="#EF4050" />
      <circle cx="30" cy="28" r="6" fill="#3D2314" stroke="#E9C578" strokeWidth="1" />
      <circle cx="30" cy="28" r="2" fill="#25A18E" />
      {/* Funnel / Magic Cannon emitting sparks */}
      <path d="M12 16 L20 2 L26 2 L32 16 Z" fill="#87141F" stroke="#E9C578" strokeWidth="1" />
    </g>

    {/* Floating Golden Sparks & Star burst emerging from the machine */}
    <g transform="translate(108, 14)">
      <polygon
        points="0,-12 3,-3 12,-3 5,2 7,10 0,5 -7,10 -5,2 -12,-3 -3,-3"
        fill="#FFD700"
        stroke="#FFF4DF"
        strokeWidth="0.8"
        className="animate-twinkle"
      />
      <circle cx="16" cy="6" r="2" fill="#EF4050" />
      <circle cx="-14" cy="2" r="1.5" fill="#FFF4DF" />
      <circle cx="12" cy="-10" r="1.5" fill="#FFD700" />
    </g>

    {/* Wrapped Mystery Gift Box (Right) */}
    <g transform="translate(142, 64)">
      <rect x="0" y="4" width="20" height="18" rx="2" fill="#C62835" stroke="#E9C578" strokeWidth="1" />
      <line x1="10" y1="4" x2="10" y2="22" stroke="#FFD700" strokeWidth="2.5" />
      <line x1="0" y1="13" x2="20" y2="13" stroke="#FFD700" strokeWidth="2.5" />
      {/* Bow */}
      <circle cx="10" cy="3" r="3" stroke="#FFD700" strokeWidth="1.2" fill="none" />
    </g>
  </svg>
);
