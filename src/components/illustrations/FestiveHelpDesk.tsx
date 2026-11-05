import React from 'react';

export interface FestiveHelpDeskProps {
  className?: string;
}

export const FestiveHelpDesk: React.FC<FestiveHelpDeskProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_12px_32px_rgba(4,20,15,0.6)]"
      >
        <defs>
          <radialGradient id="deskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E9C578" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E9C578" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C62835" />
            <stop offset="100%" stopColor="#8A141E" />
          </linearGradient>
          <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D9ECF5" />
          </linearGradient>
          <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E6B4F" />
            <stop offset="100%" stopColor="#123D2B" />
          </linearGradient>
          <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFEA9F" />
            <stop offset="50%" stopColor="#E9C578" />
            <stop offset="100%" stopColor="#B38628" />
          </linearGradient>
        </defs>

        {/* Ambient Warm Golden Aura */}
        <circle cx="180" cy="140" r="120" fill="url(#deskGlow)" />

        {/* Snow Base Drift */}
        <path
          d="M30 250 C80 235 140 255 200 240 C260 225 310 245 340 250 L340 270 L30 270 Z"
          fill="url(#snowGrad)"
          opacity="0.9"
        />

        {/* Kiosk Timber Pillars */}
        <rect x="95" y="100" width="12" height="145" rx="3" fill="#0C2B1E" stroke="#E9C578" strokeWidth="1" />
        <rect x="253" y="100" width="12" height="145" rx="3" fill="#0C2B1E" stroke="#E9C578" strokeWidth="1" />

        {/* Kiosk Counter Desk Body */}
        <rect x="90" y="160" width="180" height="85" rx="8" fill="url(#woodGrad)" stroke="#E9C578" strokeWidth="1.5" />
        {/* Desk Wooden Planks Details */}
        <line x1="90" y1="190" x2="270" y2="190" stroke="#09271E" strokeWidth="2" />
        <line x1="90" y1="218" x2="270" y2="218" stroke="#09271E" strokeWidth="2" />

        {/* Kiosk Front Signboard */}
        <rect x="125" y="172" width="110" height="34" rx="6" fill="#072017" stroke="url(#goldTrim)" strokeWidth="1.5" />
        <text
          x="180"
          y="194"
          fill="#FFF4DF"
          fontSize="11"
          fontWeight="bold"
          fontFamily="serif"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          INFORMATION
        </text>

        {/* Counter Top Slab */}
        <rect x="80" y="152" width="200" height="14" rx="4" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />

        {/* Kiosk Awning / Roof */}
        <polygon points="180,45 60,110 300,110" fill="url(#roofGrad)" stroke="#E9C578" strokeWidth="1.5" />

        {/* Striped Canopy Details */}
        <path d="M180 45 L110 110 L135 110 L180 45 Z" fill="#FFF4DF" opacity="0.3" />
        <path d="M180 45 L225 110 L250 110 L180 45 Z" fill="#FFF4DF" opacity="0.3" />

        {/* Snow Cap on Roof */}
        <path
          d="M180 42 C165 42 120 70 60 108 C65 115 75 114 85 110 C95 115 105 115 115 110 C125 115 135 115 145 110 C155 115 165 115 175 110 C185 115 195 115 205 110 C215 115 225 115 235 110 C245 115 255 115 265 110 C275 115 285 115 300 108 C240 70 195 42 180 42 Z"
          fill="url(#snowGrad)"
        />

        {/* Roof Finial Golden Star */}
        <polygon points="180,25 184,37 197,37 186,45 190,57 180,50 170,57 174,45 163,37 176,37" fill="#FFEA9F" stroke="#E9C578" strokeWidth="1" />

        {/* Hanging Winter Lantern on Left Pillar */}
        <line x1="88" y1="120" x2="70" y2="135" stroke="#E9C578" strokeWidth="1.5" />
        <rect x="62" y="135" width="16" height="24" rx="3" fill="#FFEA9F" stroke="#B38628" strokeWidth="1.5" />
        <polygon points="70,130 60,135 80,135" fill="#C62835" />
        {/* Lantern Glow */}
        <circle cx="70" cy="147" r="14" fill="#FFEA9F" opacity="0.4" />

        {/* Festive Mailbox on Right with Snow Cap */}
        <rect x="290" y="180" width="28" height="38" rx="6" fill="#C62835" stroke="#E9C578" strokeWidth="1.5" />
        <rect x="301" y="218" width="6" height="35" rx="1" fill="#0C2B1E" stroke="#E9C578" strokeWidth="1" />
        {/* Mailbox Door & Letter Slot */}
        <line x1="295" y1="192" x2="313" y2="192" stroke="#FFF4DF" strokeWidth="2" strokeLinecap="round" />
        {/* Mailbox Snow Cap */}
        <path d="M288 182 C288 176 320 176 320 182 C315 185 305 183 298 186 Z" fill="url(#snowGrad)" />

        {/* Evergreen Pine Branch Garland Across Counter */}
        <path
          d="M85 156 Q135 174 180 158 Q225 174 275 156"
          stroke="#4E8E72"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="2 4"
        />
        {/* Golden Garland Baubles */}
        <circle cx="115" cy="166" r="3.5" fill="#FFD700" stroke="#FFF4DF" strokeWidth="0.5" />
        <circle cx="148" cy="167" r="3.5" fill="#C62835" stroke="#FFF4DF" strokeWidth="0.5" />
        <circle cx="180" cy="160" r="3.5" fill="#FFD700" stroke="#FFF4DF" strokeWidth="0.5" />
        <circle cx="212" cy="167" r="3.5" fill="#C62835" stroke="#FFF4DF" strokeWidth="0.5" />
        <circle cx="245" cy="166" r="3.5" fill="#FFD700" stroke="#FFF4DF" strokeWidth="0.5" />

        {/* Delicate Golden Sparkles Floating */}
        <g fill="#FFEA9F" opacity="0.8">
          <circle cx="50" cy="90" r="1.5" />
          <circle cx="310" cy="95" r="2" />
          <circle cx="180" cy="15" r="1.5" />
          <circle cx="330" cy="150" r="1.5" />
        </g>
      </svg>
    </div>
  );
};
