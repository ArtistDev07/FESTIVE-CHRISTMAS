import React from 'react';

/**
 * Benefit Card 1 Illustration:
 * A glowing wrapped gift opening to reveal a creative spark / glowing lightbulb.
 */
export const SparkBenefitIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-16 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Radial warm spark glow */}
    <circle cx="50" cy="30" r="24" fill="#FEF08A" opacity="0.25" />

    {/* Glowing Creative Spark / Lightbulb */}
    <circle cx="50" cy="26" r="14" fill="#F59E0B" />
    <circle cx="50" cy="26" r="9" fill="#FFF4DF" />
    {/* Radiating Spark Rays */}
    <line x1="50" y1="6" x2="50" y2="10" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="33" y1="12" x2="36" y2="15" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <line x1="67" y1="12" x2="64" y2="15" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="26" x2="32" y2="26" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <line x1="72" y1="26" x2="68" y2="26" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />

    {/* Lightbulb Screw Base */}
    <rect x="46" y="38" width="8" height="5" rx="1" fill="#D9ECF5" />

    {/* Open Gift Box */}
    <g transform="translate(25, 42)">
      {/* Box Body */}
      <rect x="5" y="6" width="40" height="26" rx="2" fill="#C62835" />
      <line x1="25" y1="6" x2="25" y2="32" stroke="#FFD700" strokeWidth="3" />
      {/* Box Rim */}
      <rect x="2" y="3" width="46" height="6" rx="1.5" fill="#EF4050" stroke="#E9C578" strokeWidth="1" />
      {/* Tilted Open Lid on Left */}
      <polygon points="-4,-2 18,-8 20,-2 -2,4" fill="#87141F" stroke="#FFD700" strokeWidth="1" />
    </g>
  </svg>
);

/**
 * Benefit Card 2 Illustration:
 * A miniature festive workshop workbench with creative tools & pine branch.
 */
export const HammerBenefitIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-16 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Workbench Block */}
    <rect x="15" y="44" width="70" height="12" rx="2" fill="#52321E" stroke="#E9C578" strokeWidth="1" />
    <rect x="22" y="56" width="8" height="20" fill="#3D2314" />
    <rect x="70" y="56" width="8" height="20" fill="#3D2314" />

    {/* Golden Crafting Hammer / Mallet */}
    <g transform="translate(38, 14) rotate(32)">
      <rect x="8" y="0" width="16" height="12" rx="2" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
      <rect x="14" y="12" width="4" height="28" rx="1.5" fill="#C62835" />
    </g>

    {/* Creative Ruler / Caliper */}
    <rect x="20" y="38" width="28" height="6" rx="1" fill="#D9ECF5" stroke="#123D2B" strokeWidth="0.8" />
    <line x1="26" y1="38" x2="26" y2="41" stroke="#09271E" strokeWidth="1" />
    <line x1="32" y1="38" x2="32" y2="41" stroke="#09271E" strokeWidth="1" />
    <line x1="38" y1="38" x2="38" y2="41" stroke="#09271E" strokeWidth="1" />
    <line x1="44" y1="38" x2="44" y2="41" stroke="#09271E" strokeWidth="1" />

    {/* Pine Branch Accent & Sparkles */}
    <path d="M68 32 Q80 28 88 38" stroke="#123D2B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="82" cy="28" r="3" fill="#EF4050" />
    <circle cx="74" cy="20" r="2.5" fill="#FFD700" />
  </svg>
);

/**
 * Benefit Card 3 Illustration:
 * Two or more stylized festive figures/objects arranged around a shared worktable under a holiday wreath.
 */
export const UsersBenefitIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-16 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Festive Holiday Wreath Overhead */}
    <circle cx="50" cy="18" r="12" stroke="#123D2B" strokeWidth="4.5" />
    <circle cx="50" cy="18" r="12" stroke="#25A18E" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="50" cy="8" r="2.5" fill="#EF4050" />
    <circle cx="44" cy="24" r="2" fill="#E9C578" />
    <circle cx="56" cy="24" r="2" fill="#E9C578" />

    {/* Stylized Collaborator 1 (Left) */}
    <circle cx="28" cy="38" r="9" fill="#E9C578" />
    <path d="M16 66 C16 52 40 52 40 66 Z" fill="#0C3426" stroke="#E9C578" strokeWidth="1" />
    {/* Santa hat on Left figure */}
    <polygon points="28,24 20,32 36,32" fill="#C62835" />
    <circle cx="28" cy="24" r="2" fill="#FFFFFF" />

    {/* Stylized Collaborator 2 (Right) */}
    <circle cx="72" cy="38" r="9" fill="#FFF4DF" />
    <path d="M60 66 C60 52 84 52 84 66 Z" fill="#87141F" stroke="#E9C578" strokeWidth="1" />
    {/* Winter Beanie on Right figure */}
    <rect x="64" y="27" width="16" height="5" rx="2" fill="#123D2B" />
    <circle cx="72" cy="26" r="3" fill="#FFD700" />

    {/* Shared Interactive Worktable Center */}
    <rect x="34" y="58" width="32" height="12" rx="2" fill="#3D2314" />
    {/* Glowing Heart / Idea Spark in Center of Table */}
    <circle cx="50" cy="56" r="5" fill="#EF4050" />
  </svg>
);

/**
 * Benefit Card 4 Illustration:
 * A wrapped present or glowing star displayed on an illuminated festive platform with ribbons and sparkles.
 */
export const ShareBenefitIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-16 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Radiant Starburst Background */}
    <circle cx="50" cy="28" r="22" fill="#FEF08A" opacity="0.25" />

    {/* Floating Showcase Golden Star */}
    <g transform="translate(50, 26)">
      <polygon
        points="0,-16 5,-5 16,-5 8,3 11,14 0,7 -11,14 -8,3 -16,-5 -5,-5"
        fill="#FFD700"
        stroke="#FFF4DF"
        strokeWidth="1.2"
      />
      <circle cx="0" cy="0" r="10" fill="#FFD700" opacity="0.3" />
    </g>

    {/* Festive Presentation Platform / Pedestal */}
    <path d="M25 64 L32 50 L68 50 L75 64 Z" fill="#0C3426" stroke="#E9C578" strokeWidth="1" />
    <rect x="20" y="64" width="60" height="8" rx="2" fill="#123D2B" />
    {/* Festive Ribbon along Pedestal */}
    <line x1="20" y1="68" x2="80" y2="68" stroke="#C62835" strokeWidth="2.5" />

    {/* Sparkles Floating Around Stage */}
    <circle cx="24" cy="28" r="2" fill="#FFD700" />
    <circle cx="78" cy="22" r="2.5" fill="#E9C578" />
    <circle cx="30" cy="42" r="1.5" fill="#FFF4DF" />
    <circle cx="72" cy="40" r="1.5" fill="#FFD700" />
  </svg>
);
