import React from 'react';

export const DigitalMakerStudio: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto max-h-32 select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Soft red/cream glow */}
    <circle cx="100" cy="65" r="55" fill="#EF4050" opacity="0.1" />

    {/* Hanging Festive Fairy Lights above */}
    <path d="M20 20 Q100 35 180 20" stroke="#E9C578" strokeWidth="1" strokeDasharray="3 4" />
    <circle cx="45" cy="23" r="3" fill="#EF4050" />
    <circle cx="80" cy="27" r="3" fill="#FFD700" />
    <circle cx="120" cy="27" r="3" fill="#FFF4DF" />
    <circle cx="155" cy="23" r="3" fill="#EF4050" />

    {/* Worktable Base */}
    <rect x="25" y="86" width="150" height="10" rx="2" fill="#3D2314" stroke="#E9C578" strokeWidth="0.8" />
    <rect x="40" y="96" width="8" height="28" fill="#24150B" />
    <rect x="152" y="96" width="8" height="28" fill="#24150B" />

    {/* Laptop Device (Center) */}
    <g transform="translate(68, 42)">
      {/* Screen Frame */}
      <rect x="0" y="0" width="64" height="42" rx="3" fill="#0C3426" stroke="#EF4050" strokeWidth="1.2" />
      {/* Screen Content: Web/App UI Wireframe */}
      <rect x="3" y="3" width="58" height="36" rx="1.5" fill="#04140D" />
      {/* Top Navbar */}
      <rect x="6" y="6" width="52" height="6" rx="1" fill="#123D2B" />
      <circle cx="9" cy="9" r="1.5" fill="#EF4050" />
      <circle cx="14" cy="9" r="1.5" fill="#FFD700" />
      <circle cx="19" cy="9" r="1.5" fill="#25A18E" />
      {/* Card UI elements */}
      <rect x="6" y="16" width="24" height="18" rx="1" fill="#C62835" fillOpacity="0.8" />
      <rect x="34" y="16" width="24" height="8" rx="1" fill="#E9C578" fillOpacity="0.8" />
      <rect x="34" y="26" width="24" height="8" rx="1" fill="#D9ECF5" fillOpacity="0.8" />
      {/* Keyboard Base */}
      <polygon points="-6,45 70,45 64,42 0,42" fill="#0C3426" stroke="#09271E" strokeWidth="1" />
    </g>

    {/* Mobile Phone Device (Right) */}
    <g transform="translate(142, 50)">
      <rect x="0" y="0" width="18" height="34" rx="3" fill="#0C3426" stroke="#E9C578" strokeWidth="1" />
      <rect x="2" y="3" width="14" height="26" rx="1" fill="#061C14" />
      <circle cx="9" cy="12" r="3" fill="#EF4050" />
      <rect x="4" y="18" width="10" height="2" rx="0.5" fill="#FFF4DF" />
      <rect x="4" y="22" width="6" height="2" rx="0.5" fill="#E9C578" />
      <circle cx="9" cy="31" r="1" fill="#FFF4DF" />
    </g>

    {/* Mug with Candy Cane (Left) */}
    <g transform="translate(38, 62)">
      <rect x="0" y="6" width="14" height="18" rx="2" fill="#FFF4DF" stroke="#C62835" strokeWidth="1" />
      {/* Candy Cane sticking out */}
      <path d="M7 6 Q7 -4 13 -4 Q18 -4 18 2" stroke="#C62835" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M7 6 Q7 -4 13 -4 Q18 -4 18 2" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 3" fill="none" />
    </g>
  </svg>
);
