import React from 'react';

/**
 * Milestone 1: Get Inspired — A glowing lantern or star beside a snow-covered trail.
 */
export const LanternMilestoneIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-14 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Soft warm radial lantern glow */}
    <circle cx="40" cy="40" r="28" fill="#FEF08A" opacity="0.25" />

    {/* Snow-covered Mound */}
    <path d="M10 68 Q40 56 70 68 L70 78 L10 78 Z" fill="#EAF4F4" opacity="0.3" />
    <path d="M15 70 Q40 58 65 70" stroke="#FFF4DF" strokeWidth="3" strokeLinecap="round" />

    {/* Post / Hook */}
    <path d="M30 68 L30 20 Q30 14 38 14 L42 14" stroke="#52321E" strokeWidth="3" strokeLinecap="round" />

    {/* Hanging Lantern */}
    <g transform="translate(34, 18)">
      <circle cx="8" cy="4" r="3" stroke="#E9C578" strokeWidth="1.5" fill="none" />
      <polygon points="8,6 0,14 16,14" fill="#3D2314" stroke="#E9C578" strokeWidth="1" />
      {/* Lantern Glass Body with Amber Glow */}
      <rect x="2" y="14" width="12" height="20" rx="2" fill="#F59E0B" />
      <circle cx="8" cy="24" r="4.5" fill="#FEF08A" />
      <rect x="0" y="34" width="16" height="4" rx="1" fill="#3D2314" />
    </g>

    {/* Twinkling Star Beside Post */}
    <circle cx="62" cy="22" r="2.5" fill="#FFD700" />
    <circle cx="20" cy="32" r="1.5" fill="#FFF4DF" />
  </svg>
);

/**
 * Milestone 2: Find Your Direction — A small decorated workshop signpost.
 */
export const SignpostMilestoneIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-14 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Snowground */}
    <ellipse cx="40" cy="72" rx="30" ry="6" fill="#EAF4F4" opacity="0.3" />

    {/* Wooden Signpost Pole */}
    <rect x="37" y="14" width="6" height="58" rx="1" fill="#52321E" />

    {/* Top Directional Arrow (Pointing Right) */}
    <g transform="translate(18, 22)">
      <polygon points="0,0 38,0 46,7 38,14 0,14" fill="#C62835" stroke="#E9C578" strokeWidth="1" />
      <path d="M0 0 L38 0 Q42 3 46 7 Q42 11 38 14 L0 14" fill="#C62835" />
      {/* Snowcap on top of sign */}
      <path d="M-2 -2 L38 -2 L46 5 L42 2 L0 2 Z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="10" cy="7" r="1.5" fill="#FFF4DF" />
      <line x1="16" y1="7" x2="32" y2="7" stroke="#FFF4DF" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Lower Directional Arrow (Pointing Left) */}
    <g transform="translate(16, 40)">
      <polygon points="8,0 46,0 46,14 8,14 0,7" fill="#123D2B" stroke="#E9C578" strokeWidth="1" />
      <path d="M6 -2 L46 -2 L46 2 L8 2 L0 5 Z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="36" cy="7" r="1.5" fill="#FFF4DF" />
      <line x1="14" y1="7" x2="30" y2="7" stroke="#FFF4DF" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Holly Leaf & Berry on Pole */}
    <circle cx="40" cy="18" r="2.5" fill="#EF4050" />
    <circle cx="43" cy="17" r="2" fill="#EF4050" />
  </svg>
);

/**
 * Milestone 3: Build Together — A festive workshop with glowing windows and tools.
 */
export const WorkshopMilestoneIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-14 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Snow mound */}
    <path d="M8 72 Q40 60 72 72 L72 78 L8 78 Z" fill="#EAF4F4" opacity="0.3" />

    {/* Workshop Miniature Cabin */}
    <rect x="20" y="36" width="40" height="34" rx="2" fill="#09271E" stroke="#E9C578" strokeWidth="1" />
    {/* Roof */}
    <polygon points="40,16 14,38 66,38" fill="#C62835" />
    {/* Snow on Roof */}
    <path d="M40 16 L12 40 Q40 34 68 40 Z" fill="#FFFFFF" opacity="0.95" />

    {/* Chimney */}
    <rect x="48" y="18" width="6" height="12" fill="#3D2314" />
    <path d="M51 16 Q54 10 50 6" stroke="#D9ECF5" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />

    {/* Glowing Windows */}
    <rect x="25" y="44" width="12" height="12" rx="1" fill="#F59E0B" />
    <line x1="31" y1="44" x2="31" y2="56" stroke="#09271E" strokeWidth="1.5" />
    <line x1="25" y1="50" x2="37" y2="50" stroke="#09271E" strokeWidth="1.5" />

    {/* Door */}
    <rect x="43" y="46" width="11" height="24" fill="#3D2314" />
    <circle cx="51" cy="58" r="1.5" fill="#E9C578" />
  </svg>
);

/**
 * Milestone 4: Share the Magic — A bright star above a snow-covered festive stage.
 */
export const StarMilestoneIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-14 h-14 ${className}`}
    aria-hidden="true"
  >
    {/* Big Radial Star Bloom */}
    <circle cx="40" cy="30" r="25" fill="#FEF08A" opacity="0.3" />

    {/* Festive Presentation Stage */}
    <path d="M15 68 L24 54 L56 54 L65 68 Z" fill="#0C3426" stroke="#E9C578" strokeWidth="1" />
    <rect x="12" y="68" width="56" height="8" rx="2" fill="#123D2B" />
    <line x1="12" y1="72" x2="68" y2="72" stroke="#EF4050" strokeWidth="2" />

    {/* Radiant Bethlehem Star */}
    <g transform="translate(40, 28)">
      <polygon
        points="0,-18 5,-6 18,-6 8,3 12,16 0,8 -12,16 -8,3 -18,-6 -5,-6"
        fill="#FFD700"
        stroke="#FFF4DF"
        strokeWidth="1.2"
      />
      <circle cx="0" cy="0" r="8" fill="#FFD700" opacity="0.4" />
    </g>

    {/* Floating Sparks */}
    <circle cx="20" cy="26" r="2" fill="#E9C578" />
    <circle cx="60" cy="20" r="2" fill="#FFF4DF" />
    <circle cx="62" cy="40" r="1.5" fill="#FFD700" />
  </svg>
);
