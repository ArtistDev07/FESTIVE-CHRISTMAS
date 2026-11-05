import React from 'react';

export interface ChristmasGiftDisplayProps {
  className?: string;
}

export const ChristmasGiftDisplay: React.FC<ChristmasGiftDisplayProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative w-full max-w-md aspect-[4/3] select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Radiant gold glow */}
          <radialGradient id="giftGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E9C578" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#E9C578" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E9C578" stopOpacity="0" />
          </radialGradient>

          {/* Crimson Red Gift Gradients */}
          <linearGradient id="redGiftGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EF4050" />
            <stop offset="60%" stopColor="#C62835" />
            <stop offset="100%" stopColor="#871721" />
          </linearGradient>

          <linearGradient id="redGiftGradDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C62835" />
            <stop offset="100%" stopColor="#661018" />
          </linearGradient>

          {/* Evergreen Gift Gradients */}
          <linearGradient id="greenGiftGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E5C42" />
            <stop offset="60%" stopColor="#123D2B" />
            <stop offset="100%" stopColor="#08251A" />
          </linearGradient>

          {/* Gold Ribbon Gradients */}
          <linearGradient id="goldRibbonGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFEA9F" />
            <stop offset="40%" stopColor="#E9C578" />
            <stop offset="100%" stopColor="#B38628" />
          </linearGradient>

          <linearGradient id="iceRibbonGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#D9ECF5" />
            <stop offset="100%" stopColor="#96C2DB" />
          </linearGradient>

          {/* Snowbase pedestal gradient */}
          <linearGradient id="snowPedestalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9ECF5" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#09271E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#04140F" />
          </linearGradient>
        </defs>

        {/* Ambient Warm Golden Aura */}
        <circle cx="240" cy="180" r="160" fill="url(#giftGlow)" />

        {/* Snow Pedestal / Base */}
        <ellipse cx="240" cy="300" rx="190" ry="32" fill="#061D15" opacity="0.8" />
        <ellipse cx="240" cy="295" rx="160" ry="24" fill="#0C3426" />
        <path
          d="M90 295 C140 280 340 280 390 295 C370 310 110 310 90 295 Z"
          fill="#D9ECF5"
          opacity="0.25"
        />

        {/* Distant Evergreen Holly Sprigs behind the gifts */}
        <g opacity="0.8">
          <path d="M120 270 Q100 240 70 245 Q90 260 110 275 Z" fill="#123D2B" stroke="#E9C578" strokeWidth="0.8" />
          <path d="M130 260 Q110 230 90 225 Q115 245 125 265 Z" fill="#1C5C41" />
          <circle cx="95" cy="245" r="4" fill="#EF4050" />
          <circle cx="103" cy="250" r="3.5" fill="#C62835" />

          <path d="M360 270 Q380 240 410 245 Q390 260 370 275 Z" fill="#123D2B" stroke="#E9C578" strokeWidth="0.8" />
          <path d="M350 260 Q370 230 390 225 Q365 245 355 265 Z" fill="#1C5C41" />
          <circle cx="385" cy="245" r="4" fill="#EF4050" />
          <circle cx="377" cy="250" r="3.5" fill="#C62835" />
        </g>

        {/* GIFT 1 (Left - Emerald Forest Box with Red Ribbon) */}
        <g transform="translate(100, 180) rotate(-6)">
          {/* Shadow */}
          <rect x="-5" y="70" width="105" height="15" rx="7" fill="#04120D" opacity="0.6" />
          {/* Main Box */}
          <rect x="0" y="0" width="95" height="75" rx="8" fill="url(#greenGiftGrad)" stroke="#E9C578" strokeWidth="1" />
          {/* Box Lid */}
          <rect x="-4" y="-6" width="103" height="18" rx="5" fill="#1C5C41" stroke="#E9C578" strokeWidth="1.2" />
          {/* Vertical Ribbon */}
          <rect x="38" y="-6" width="18" height="81" fill="url(#goldRibbonGrad)" />
          {/* Horizontal Ribbon */}
          <rect x="0" y="30" width="95" height="16" fill="url(#goldRibbonGrad)" />
          {/* Bow on Left Gift */}
          <path d="M38 -6 C20 -24 30 -32 47 -10 C64 -32 74 -24 56 -6 Z" fill="url(#goldRibbonGrad)" stroke="#B38628" strokeWidth="0.8" />
          <circle cx="47" cy="-7" r="5" fill="#FFEA9F" />
        </g>

        {/* GIFT 2 (Right - Warm Cream & Gold Box with Crimson Ribbon) */}
        <g transform="translate(280, 190) rotate(5)">
          {/* Shadow */}
          <rect x="-5" y="65" width="100" height="14" rx="7" fill="#04120D" opacity="0.6" />
          {/* Main Box */}
          <rect x="0" y="0" width="90" height="70" rx="8" fill="#FFF4DF" stroke="#E9C578" strokeWidth="1.2" />
          {/* Box Lid */}
          <rect x="-4" y="-5" width="98" height="16" rx="4" fill="#FFE8C2" stroke="#E9C578" strokeWidth="1.2" />
          {/* Vertical Crimson Ribbon */}
          <rect x="36" y="-5" width="18" height="75" fill="url(#redGiftGrad)" />
          {/* Horizontal Crimson Ribbon */}
          <rect x="0" y="28" width="90" height="16" fill="url(#redGiftGrad)" />
          {/* Bow on Right Gift */}
          <path d="M36 -5 C18 -22 28 -30 45 -8 C62 -30 72 -22 54 -5 Z" fill="url(#redGiftGrad)" stroke="#871721" strokeWidth="0.8" />
          <circle cx="45" cy="-6" r="4.5" fill="#EF4050" />
        </g>

        {/* GIFT 3 (Center Foreground - Grand Crimson Festive Box with Gold Ribbon) */}
        <g transform="translate(175, 135)">
          {/* Deep Shadow */}
          <rect x="-10" y="140" width="150" height="20" rx="10" fill="#04120D" opacity="0.75" />
          {/* Main Large Box */}
          <rect x="0" y="15" width="130" height="130" rx="12" fill="url(#redGiftGrad)" stroke="#E9C578" strokeWidth="1.5" />
          {/* Festive Subtle Pattern lines on box */}
          <path d="M0 45 L130 45 M0 75 L130 75 M0 105 L130 105" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 3" />
          {/* Box Lid */}
          <rect x="-6" y="5" width="142" height="26" rx="7" fill="url(#redGiftGradDark)" stroke="#E9C578" strokeWidth="1.8" />

          {/* Wide Gold Vertical Ribbon */}
          <rect x="49" y="5" width="32" height="140" fill="url(#goldRibbonGrad)" stroke="#B38628" strokeWidth="0.8" />
          {/* Wide Gold Horizontal Ribbon */}
          <rect x="0" y="65" width="130" height="30" fill="url(#goldRibbonGrad)" stroke="#B38628" strokeWidth="0.8" />

          {/* Grand Golden Holiday Bow */}
          <g transform="translate(65, 5)">
            {/* Left Bow Loop */}
            <path
              d="M0 0 C-35 -35 -45 -55 -10 -40 C5 -30 0 -10 0 0 Z"
              fill="url(#goldRibbonGrad)"
              stroke="#B38628"
              strokeWidth="1.2"
            />
            {/* Right Bow Loop */}
            <path
              d="M0 0 C35 -35 45 -55 10 -40 C-5 -30 0 -10 0 0 Z"
              fill="url(#goldRibbonGrad)"
              stroke="#B38628"
              strokeWidth="1.2"
            />
            {/* Ribbon Tails */}
            <path d="M-8 4 C-25 35 -35 55 -25 75 C-22 55 -15 35 0 10 Z" fill="url(#goldRibbonGrad)" />
            <path d="M8 4 C25 35 35 55 25 75 C22 55 15 35 0 10 Z" fill="url(#goldRibbonGrad)" />
            {/* Central Jewel / Knot */}
            <circle cx="0" cy="-2" r="9" fill="#FFEA9F" stroke="#B38628" strokeWidth="1" />
            <circle cx="0" cy="-2" r="5" fill="#EF4050" />
            {/* Twinkle on the knot */}
            <path d="M0 -6 L1 -3 L4 -2 L1 -1 L0 2 L-1 -1 L-4 -2 L-1 -3 Z" fill="#FFFFFF" />
          </g>
        </g>

        {/* Glowing Ornaments & Golden Stars scattered near the gifts */}
        <g>
          {/* Golden Holiday Bauble Left */}
          <circle cx="120" cy="290" r="14" fill="url(#goldRibbonGrad)" stroke="#FFF4DF" strokeWidth="1" />
          <rect x="117" y="273" width="6" height="5" rx="1.5" fill="#B38628" />
          <ellipse cx="116" cy="286" rx="4" ry="7" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 116 286)" />

          {/* Ruby Ornament Right */}
          <circle cx="365" cy="285" r="13" fill="url(#redGiftGrad)" stroke="#E9C578" strokeWidth="1" />
          <rect x="362" y="269" width="6" height="5" rx="1.5" fill="#E9C578" />
          <ellipse cx="361" cy="281" rx="3.5" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 361 281)" />

          {/* Icy Blue Snowflake Star */}
          <circle cx="240" cy="315" r="9" fill="#25A18E" stroke="#D9ECF5" strokeWidth="1" />

          {/* Twinkling Magical Sparkles */}
          <g transform="translate(140, 110)">
            <path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="#E9C578" />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>
          <g transform="translate(340, 120)">
            <path d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" fill="#FFEA9F" />
            <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          </g>
          <g transform="translate(240, 50)">
            <path d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z" fill="#E9C578" />
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
          </g>
          <g transform="translate(190, 75)">
            <circle cx="0" cy="0" r="2" fill="#D9ECF5" opacity="0.8" />
          </g>
          <g transform="translate(290, 70)">
            <circle cx="0" cy="0" r="2.5" fill="#E9C578" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};
