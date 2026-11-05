import React from 'react';

export const AIWinterWorkshop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto max-h-32 select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Radial halo in icy blue & warm gold */}
    <circle cx="100" cy="65" r="55" fill="#D9ECF5" opacity="0.12" />

    {/* Background snowy pine silhouette */}
    <polygon points="35,30 20,65 50,65" fill="#0C3426" />
    <polygon points="35,30 28,45 42,45" fill="#D9ECF5" opacity="0.8" />
    <polygon points="35,50 15,90 55,90" fill="#08281D" />
    <polygon points="35,50 25,65 45,65" fill="#D9ECF5" opacity="0.8" />

    {/* Table surface */}
    <rect x="50" y="86" width="135" height="10" rx="2" fill="#3D2314" stroke="#E9C578" strokeWidth="0.8" />
    <rect x="65" y="96" width="8" height="28" fill="#24150B" />
    <rect x="160" y="96" width="8" height="28" fill="#24150B" />

    {/* Glowing AI Crystal / Neural Polyhedron */}
    <g transform="translate(100, 38)">
      {/* Outer crystalline diamond */}
      <polygon
        points="0,-22 18,-6 14,16 -14,16 -18,-6"
        fill="#D9ECF5"
        fillOpacity="0.85"
        stroke="#E9C578"
        strokeWidth="1.5"
      />
      <polygon points="0,-22 0,16 14,16" fill="#A3D4E7" fillOpacity="0.6" />
      <polygon points="0,-22 -18,-6 0,16" fill="#FFFFFF" fillOpacity="0.75" />
      {/* Glowing Star Core */}
      <circle cx="0" cy="-2" r="5" fill="#FFD700" className="animate-twinkle" />
    </g>

    {/* Constellation / Connected Neural Node Points */}
    <g stroke="#E9C578" strokeWidth="1" strokeDasharray="2 2" opacity="0.75">
      <line x1="82" y1="36" x2="65" y2="48" />
      <line x1="118" y1="36" x2="140" y2="44" />
      <line x1="100" y1="56" x2="100" y2="76" />
      <line x1="65" y1="48" x2="78" y2="68" />
      <line x1="140" y1="44" x2="130" y2="68" />
    </g>

    {/* Glowing Nodes */}
    <circle cx="65" cy="48" r="3" fill="#D9ECF5" stroke="#E9C578" strokeWidth="1" />
    <circle cx="140" cy="44" r="3" fill="#FFD700" stroke="#FFF4DF" strokeWidth="1" />
    <circle cx="78" cy="68" r="2.5" fill="#E9C578" />
    <circle cx="130" cy="68" r="2.5" fill="#D9ECF5" />
    <circle cx="100" cy="76" r="3.5" fill="#FFF4DF" stroke="#E9C578" strokeWidth="1" />

    {/* Workstation Hologram Stand */}
    <ellipse cx="100" cy="85" rx="16" ry="3" fill="#09271E" stroke="#D9ECF5" strokeWidth="1" />

    {/* Small wrapped gift with icy blue ribbon on desk */}
    <rect x="145" y="72" width="16" height="14" rx="1.5" fill="#C62835" />
    <line x1="153" y1="72" x2="153" y2="86" stroke="#D9ECF5" strokeWidth="2" />
    <line x1="145" y1="79" x2="161" y2="79" stroke="#D9ECF5" strokeWidth="2" />
  </svg>
);
