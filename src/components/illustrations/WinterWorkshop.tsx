import React from 'react';

export interface WinterWorkshopProps {
  className?: string;
}

export const WinterWorkshop: React.FC<WinterWorkshopProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-lg aspect-[4/3] select-none pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Soft atmospheric radial halo behind workshop */}
        <circle cx="250" cy="190" r="150" fill="url(#haloGrad)" />

        {/* Distant evergreen pine trees */}
        <g opacity="0.85">
          {/* Tree Left Distant */}
          <polygon points="90,70 50,160 130,160" fill="#0C3426" />
          <polygon points="90,70 70,110 110,110" fill="#D9ECF5" opacity="0.8" />
          <polygon points="90,130 35,230 145,230" fill="#08281D" />
          <polygon points="90,130 60,175 120,175" fill="#D9ECF5" opacity="0.8" />

          {/* Tree Right Distant */}
          <polygon points="410,90 375,170 445,170" fill="#0C3426" />
          <polygon points="410,90 395,125 425,125" fill="#D9ECF5" opacity="0.8" />
          <polygon points="410,145 360,235 460,235" fill="#08281D" />
          <polygon points="410,145 385,185 435,185" fill="#D9ECF5" opacity="0.8" />
        </g>

        {/* Snow-covered Hill / Ground Base */}
        <path
          d="M0 280 C120 250 220 270 340 240 C420 220 470 250 500 270 L500 380 L0 380 Z"
          fill="#0C3627"
        />
        <path
          d="M0 290 C120 260 220 280 340 250 C420 230 470 260 500 280 L500 380 L0 380 Z"
          fill="#104230"
          opacity="0.8"
        />
        <path
          d="M0 310 C140 290 260 320 380 290 C440 280 480 300 500 310 L500 380 L0 380 Z"
          fill="#EAF4F4"
          opacity="0.25"
        />

        {/* Winding Snowy Path to Workshop Door */}
        <path
          d="M250 285 C240 315 280 345 230 380"
          stroke="#E9C578"
          strokeWidth="24"
          strokeLinecap="round"
          strokeOpacity="0.2"
        />
        <path
          d="M250 285 C240 315 280 345 230 380"
          stroke="#FFF4DF"
          strokeWidth="14"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />

        {/* Workshop Building */}
        <g id="cabin-building">
          {/* Main Log Cabin Walls */}
          <rect x="165" y="155" width="170" height="130" rx="3" fill="#072218" />
          {/* Horizontal Log Planks */}
          <line x1="165" y1="180" x2="335" y2="180" stroke="#051912" strokeWidth="2" />
          <line x1="165" y1="205" x2="335" y2="205" stroke="#051912" strokeWidth="2" />
          <line x1="165" y1="230" x2="335" y2="230" stroke="#051912" strokeWidth="2" />
          <line x1="165" y1="255" x2="335" y2="255" stroke="#051912" strokeWidth="2" />

          {/* Stone Chimney */}
          <rect x="290" y="85" width="28" height="50" rx="2" fill="#2E1B10" />
          {/* Soft Chimney Smoke */}
          <path
            d="M304 80 C298 60 320 45 310 25 C305 10 325 5 315 0"
            stroke="#D9ECF5"
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />

          {/* Steep Triangular Roof with Snow Crust */}
          <polygon points="250,75 140,165 360,165" fill="#87141F" />
          <polygon points="250,75 145,160 355,160" fill="#C62835" />
          {/* Snow on Roof */}
          <path
            d="M250 75 L135 170 Q190 155 250 160 Q310 155 365 170 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          {/* Hanging Icicles */}
          <polygon points="170,168 174,185 178,168" fill="#D9ECF5" opacity="0.9" />
          <polygon points="210,168 213,180 216,168" fill="#D9ECF5" opacity="0.9" />
          <polygon points="280,168 284,186 288,168" fill="#D9ECF5" opacity="0.9" />
          <polygon points="320,168 323,178 326,168" fill="#D9ECF5" opacity="0.9" />

          {/* Glowing Workshop Window (Left) */}
          <rect
            x="185"
            y="185"
            width="42"
            height="46"
            rx="2"
            fill="#F59E0B"
            className="animate-cabin-light"
          />
          <line x1="206" y1="185" x2="206" y2="231" stroke="#072218" strokeWidth="3" />
          <line x1="185" y1="208" x2="227" y2="208" stroke="#072218" strokeWidth="3" />
          {/* Warm Interior Window Glow */}
          <circle cx="206" cy="208" r="22" fill="#FEF08A" opacity="0.3" />

          {/* Workshop Door */}
          <rect x="250" y="200" width="36" height="85" rx="3" fill="#3D2314" />
          <line x1="268" y1="200" x2="268" y2="285" stroke="#24150B" strokeWidth="2" />
          {/* Door Knob */}
          <circle cx="279" cy="242" r="3" fill="#E9C578" />
          {/* Festive Holiday Wreath on Door */}
          <circle cx="268" cy="225" r="11" stroke="#123D2B" strokeWidth="5" />
          <circle cx="268" cy="225" r="11" stroke="#25A18E" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="268" cy="214" r="2.5" fill="#EF4050" />
          <circle cx="264" cy="232" r="2" fill="#EF4050" />
          <circle cx="272" cy="232" r="2" fill="#EF4050" />

          {/* Small Attic Round Window */}
          <circle cx="250" cy="120" r="12" fill="#F59E0B" className="animate-cabin-light" />
          <circle cx="250" cy="120" r="12" stroke="#072218" strokeWidth="2" />
          <line x1="250" y1="108" x2="250" y2="132" stroke="#072218" strokeWidth="2" />
          <line x1="238" y1="120" x2="262" y2="120" stroke="#072218" strokeWidth="2" />
        </g>

        {/* Foreground Decorated Tree beside Cabin */}
        <g transform="translate(340, 160)">
          <polygon points="50,15 10,85 90,85" fill="#134430" />
          <path d="M10,85 Q50,75 90,85 Q75,70 50,72 Q25,70 10,85 Z" fill="#FFFFFF" opacity="0.9" />
          <polygon points="50,60 0,140 100,140" fill="#0F3827" />
          <path d="M0,140 Q50,128 100,140 Q85,120 50,123 Q15,120 0,140 Z" fill="#FFFFFF" opacity="0.9" />
          {/* Golden Star Topper */}
          <polygon
            points="50,6 53,13 60,13 55,18 57,25 50,21 43,25 45,18 40,13 47,13"
            fill="#FFD700"
          />
          {/* Small Ornaments */}
          <circle cx="35" cy="55" r="3.5" fill="#EF4050" />
          <circle cx="65" cy="65" r="3.5" fill="#E9C578" />
          <circle cx="30" cy="115" r="4" fill="#E9C578" />
          <circle cx="70" cy="110" r="4" fill="#EF4050" />
        </g>

        {/* Wrapped Presents by the Door */}
        <g transform="translate(210, 260)">
          {/* Present 1 (Red Box, Gold Ribbon) */}
          <rect x="0" y="8" width="18" height="18" fill="#C62835" rx="1" />
          <line x1="9" y1="8" x2="9" y2="26" stroke="#FFD700" strokeWidth="2.5" />
          <line x1="0" y1="17" x2="18" y2="17" stroke="#FFD700" strokeWidth="2.5" />
          {/* Present 2 (Gold Box, Red Ribbon) */}
          <rect x="16" y="14" width="14" height="12" fill="#E9C578" rx="1" />
          <line x1="23" y1="14" x2="23" y2="26" stroke="#C62835" strokeWidth="2" />
        </g>

        {/* Sparkling Stars in Sky */}
        <g className="animate-twinkle">
          <circle cx="70" cy="40" r="2" fill="#FFF4DF" />
          <circle cx="140" cy="25" r="2.5" fill="#E9C578" />
          <circle cx="380" cy="35" r="2" fill="#FFF4DF" />
          <circle cx="440" cy="60" r="2.5" fill="#E9C578" />
        </g>

        <defs>
          <radialGradient
            id="haloGrad"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(250 190) rotate(90) scale(150)"
          >
            <stop stopColor="#E9C578" stopOpacity="0.25" />
            <stop offset="0.6" stopColor="#09271E" stopOpacity="0.08" />
            <stop offset="1" stopColor="#09271E" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
