import React from 'react';

export const SealedChallengeLetter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto max-h-36 select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Ambient Warm Golden Aura */}
    <circle cx="100" cy="70" r="60" fill="#E9C578" opacity="0.18" />
    <circle cx="100" cy="70" r="40" fill="#C62835" opacity="0.12" />

    {/* Behind: Soft Evergreen Garland & Berries */}
    <path d="M45 105 Q70 115 100 108 Q130 115 155 105" stroke="#1A5338" strokeWidth="4" strokeLinecap="round" />
    <circle cx="65" cy="112" r="2.5" fill="#C62835" />
    <circle cx="95" cy="110" r="2.5" fill="#EF4050" />
    <circle cx="135" cy="112" r="2.5" fill="#C62835" />

    {/* Main Sealed Parchment Envelope */}
    {/* Envelope Body */}
    <rect x="42" y="35" width="116" height="74" rx="6" fill="#0C3426" stroke="#E9C578" strokeWidth="1.8" />
    <rect x="45" y="38" width="110" height="68" rx="4" fill="#072017" />

    {/* Elegant Golden Hairline Inner Inset */}
    <rect x="49" y="42" width="102" height="60" rx="3" fill="none" stroke="#E9C578" strokeWidth="0.75" strokeDasharray="3 4" strokeOpacity="0.6" />

    {/* Fold Lines on Envelope Flaps */}
    <path d="M44 37 L100 78 L156 37" stroke="#E9C578" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <path d="M44 107 L86 72" stroke="#E9C578" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M156 107 L114 72" stroke="#E9C578" strokeWidth="1" strokeLinecap="round" opacity="0.4" />

    {/* Ribbon Bands */}
    <line x1="100" y1="35" x2="100" y2="109" stroke="#E9C578" strokeWidth="3" opacity="0.85" />
    <line x1="42" y1="72" x2="158" y2="72" stroke="#E9C578" strokeWidth="3" opacity="0.85" />

    {/* Royal Solstice Crimson Wax Seal */}
    <circle cx="100" cy="72" r="15" fill="#8B1520" stroke="#FFF4DF" strokeWidth="0.75" />
    <circle cx="100" cy="72" r="13" fill="#C62835" />
    <circle cx="100" cy="72" r="11" fill="none" stroke="#E9C578" strokeWidth="1" strokeDasharray="2 2" />

    {/* Star Emblem Embossed on Seal */}
    <polygon points="100,64 102,69 108,70 103,74 105,80 100,76 95,80 97,74 92,70 98,69" fill="#FFD700" />
    <circle cx="100" cy="72" r="2" fill="#FFF4DF" />

    {/* Wax Drips / Irregular Organic Flange */}
    <path d="M96 85 Q100 89 104 85" fill="#C62835" />

    {/* Solstice Star Twinkles in Atmosphere */}
    <polygon points="32,32 33.5,35 37,35.5 34.5,38 35.5,41.5 32,39.5 28.5,41.5 29.5,38 27,35.5 30.5,35" fill="#FFD700" />
    <polygon points="168,48 169.5,51 173,51.5 170.5,54 171.5,57.5 168,55.5 164.5,57.5 165.5,54 163,51.5 166.5,51" fill="#FFD700" />
    <circle cx="162" cy="28" r="1.5" fill="#FFF4DF" />
    <circle cx="38" cy="88" r="1.5" fill="#FFF4DF" />

    {/* Delicate Snowflakes */}
    <g stroke="#D9ECF5" strokeWidth="0.8" opacity="0.7">
      {/* Snowflake 1 */}
      <line x1="28" y1="65" x2="34" y2="65" />
      <line x1="31" y1="62" x2="31" y2="68" />
      {/* Snowflake 2 */}
      <line x1="168" y1="88" x2="174" y2="88" />
      <line x1="171" y1="85" x2="171" y2="91" />
    </g>
  </svg>
);
