import React from 'react';

/**
 * WinterLandscape
 * Richly illustrated SVG winter scenery with layered mountain silhouettes,
 * cozy illuminated cabins, layered pine forests, softly undulating snowbanks,
 * and prominently decorated foreground Christmas trees on the left and right flanks.
 */
export const WinterLandscape: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Layer 1: Sky & Atmosphere ── */}
      {/* Deep Evergreen to Midnight Blue sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#051710] via-[#09271E] via-70% to-[#123D2B]" />

      {/* Atmospheric Aurora / Festive Night Glow */}
      <div className="absolute -top-24 left-1/4 h-[420px] w-[50vw] rounded-full bg-gradient-to-r from-[#25A18E]/10 via-[#E9C578]/10 to-[#C62835]/10 blur-[90px]" />

      {/* Diffused Winter Moon & Radial Light Halo */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-radial from-[#FFF4DF]/20 via-[#E9C578]/5 to-transparent blur-3xl" />
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-gradient-to-br from-[#FFFDF9] to-[#FFF4DF] opacity-90 shadow-[0_0_60px_rgba(255,244,223,0.45)]" />

      {/* Distant Twinkling Stars */}
      <div className="absolute top-10 left-[12%] h-1.5 w-1.5 rounded-full bg-[#E9C578] shadow-[0_0_8px_#E9C578] animate-twinkle" />
      <div className="absolute top-20 left-[22%] h-1 w-1 rounded-full bg-[#FFFFFF] shadow-[0_0_6px_#FFFFFF] animate-twinkle" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-14 right-[18%] h-2 w-2 rounded-full bg-[#FFF4DF] shadow-[0_0_10px_#FFF4DF] animate-twinkle" style={{ animationDelay: '0.7s' }} />
      <div className="absolute top-28 right-[32%] h-1 w-1 rounded-full bg-[#E9C578] shadow-[0_0_6px_#E9C578] animate-twinkle" style={{ animationDelay: '2.1s' }} />
      <div className="absolute top-8 left-[40%] h-1 w-1 rounded-full bg-[#FFFFFF] shadow-[0_0_6px_#FFFFFF] animate-twinkle" style={{ animationDelay: '1.8s' }} />

      {/* ── Layer 2: Distant Mountains & Deep Alpine Forest ── */}
      <svg
        className="absolute bottom-36 left-0 w-full text-[#061C14] opacity-45"
        viewBox="0 0 1440 340"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,180 L160,80 L320,200 L510,70 L680,180 L880,90 L1060,220 L1240,65 L1440,190 L1440,340 L0,340 Z" />
      </svg>

      {/* Midground Forest Silhouette with Warm Cabin Lights */}
      <div className="absolute bottom-28 left-0 right-0 flex items-end justify-between px-6 opacity-85">
        {/* Left midground cluster */}
        <div className="flex items-end gap-1.5">
          <svg width="36" height="85" viewBox="0 0 36 85" fill="none">
            <polygon points="18,5 8,32 28,32" fill="#0C3829" />
            <polygon points="18,5 14,14 22,14" fill="#D9ECF5" opacity="0.8" />
            <polygon points="18,22 4,55 32,55" fill="#0A3023" />
            <polygon points="18,22 12,34 24,34" fill="#D9ECF5" opacity="0.8" />
            <polygon points="18,40 1,78 35,78" fill="#08281D" />
            <polygon points="18,40 10,54 26,54" fill="#D9ECF5" opacity="0.8" />
            <rect x="15" y="78" width="6" height="7" fill="#051710" />
          </svg>
          <svg width="28" height="65" viewBox="0 0 28 65" fill="none">
            <polygon points="14,4 6,24 22,24" fill="#0A3023" />
            <polygon points="14,18 3,42 25,42" fill="#08281D" />
            <polygon points="14,32 1,60 27,60" fill="#072218" />
            <rect x="12" y="60" width="4" height="5" fill="#051710" />
          </svg>
        </div>

        {/* Cozy Winter Cabin in Midground (Left of center) */}
        <div className="hidden sm:block relative mb-1 -ml-16">
          <svg width="68" height="48" viewBox="0 0 68 48" fill="none">
            {/* Cabin Body */}
            <rect x="12" y="18" width="44" height="26" fill="#0B2B20" rx="1" />
            {/* Snow Covered Roof */}
            <polygon points="34,2 6,20 62,20" fill="#C62835" />
            <polygon points="34,2 8,19 60,19" fill="#FFF4DF" opacity="0.9" />
            {/* Stone Chimney & Soft Smoke */}
            <rect x="44" y="4" width="7" height="12" fill="#051710" />
            {/* Glowing Window with Golden Warmth */}
            <rect
              x="26"
              y="25"
              width="16"
              height="14"
              fill="#F59E0B"
              className="animate-cabin-light"
              rx="1"
            />
            <line x1="34" y1="25" x2="34" y2="39" stroke="#0B2B20" strokeWidth="1.5" />
            <line x1="26" y1="32" x2="42" y2="32" stroke="#0B2B20" strokeWidth="1.5" />
            {/* Door */}
            <rect x="16" y="27" width="7" height="17" fill="#061711" />
          </svg>
        </div>

        {/* Right midground cluster */}
        <div className="flex items-end gap-1.5">
          <svg width="32" height="75" viewBox="0 0 32 75" fill="none">
            <polygon points="16,4 7,28 25,28" fill="#0A3023" />
            <polygon points="16,4 12,12 20,12" fill="#D9ECF5" opacity="0.8" />
            <polygon points="16,20 4,48 28,48" fill="#08281D" />
            <polygon points="16,20 10,30 22,30" fill="#D9ECF5" opacity="0.8" />
            <polygon points="16,36 1,68 31,68" fill="#072218" />
            <polygon points="16,36 8,48 24,48" fill="#D9ECF5" opacity="0.8" />
            <rect x="14" y="68" width="4" height="7" fill="#051710" />
          </svg>
          <svg width="40" height="95" viewBox="0 0 40 95" fill="none">
            <polygon points="20,5 9,35 31,35" fill="#0C3829" />
            <polygon points="20,5 15,16 25,16" fill="#D9ECF5" opacity="0.8" />
            <polygon points="20,25 5,62 35,62" fill="#0A3023" />
            <polygon points="20,25 13,38 27,38" fill="#D9ECF5" opacity="0.8" />
            <polygon points="20,45 2,86 38,86" fill="#08281D" />
            <polygon points="20,45 11,60 29,60" fill="#D9ECF5" opacity="0.8" />
            <rect x="17" y="86" width="6" height="9" fill="#051710" />
          </svg>
        </div>
      </div>

      {/* ── Layer 3: Prominent Foreground Christmas Trees (Left & Right Flanks) ── */}
      {/* LEFT MAIN CHRISTMAS TREE (Heavily decorated with snow, warm lights, golden star) */}
      <div className="hero-tree-left absolute -bottom-6 -left-10 sm:-left-4 md:left-2 lg:left-6 z-20 w-[190px] sm:w-[260px] md:w-[320px] lg:w-[380px] drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)] transition-all">
        <svg viewBox="0 0 340 500" fill="none" className="w-full h-auto">
          {/* Tree Trunk */}
          <rect x="154" y="440" width="32" height="50" rx="3" fill="#3D2314" />
          <path d="M150 480 Q170 470 190 480 L190 490 L150 490 Z" fill="#24150B" />

          {/* Tier 5 (Bottom Tier) */}
          <polygon points="170,260 20,440 320,440" fill="#0F3827" />
          {/* Snowy edges & snow blankets */}
          <path
            d="M20,440 Q80,428 170,432 Q260,428 320,440 C280,410 240,415 170,418 C100,415 60,410 20,440 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 4 */}
          <polygon points="170,200 45,350 295,350" fill="#134430" />
          <path
            d="M45,350 Q100,340 170,343 Q240,340 295,350 C260,325 220,330 170,332 C120,330 80,325 45,350 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 3 */}
          <polygon points="170,140 70,270 270,270" fill="#175039" />
          <path
            d="M70,270 Q120,260 170,263 Q220,260 270,270 C240,248 205,252 170,254 C135,252 100,248 70,270 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 2 */}
          <polygon points="170,80 95,190 245,190" fill="#1C5C42" />
          <path
            d="M95,190 Q130,182 170,185 Q210,182 245,190 C220,172 195,176 170,178 C145,176 120,172 95,190 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 1 (Top Tier) */}
          <polygon points="170,25 120,115 220,115" fill="#20694C" />
          <path
            d="M120,115 Q145,108 170,110 Q195,108 220,115 C200,100 185,103 170,105 C155,103 140,100 120,115 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Golden Star Tree Topper */}
          <g transform="translate(170, 22)">
            <polygon
              points="0,-22 6,-6 22,-6 10,4 14,20 0,10 -14,20 -10,4 -22,-6 -6,-6"
              fill="#FFD700"
              stroke="#FFF4DF"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="16" fill="#FFD700" opacity="0.35" className="blur-xs" />
          </g>

          {/* Colorful Glass Baubles (Red, Gold, Ice Blue) */}
          <circle cx="120" cy="150" r="7" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="210" cy="165" r="6" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="150" cy="220" r="8" fill="#EF4050" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="230" cy="235" r="7" fill="#25A18E" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="95" cy="245" r="7" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="185" cy="305" r="9" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="130" cy="325" r="8" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="245" cy="315" r="8" fill="#D9ECF5" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="80" cy="385" r="9" fill="#EF4050" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="160" cy="395" r="10" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="235" cy="390" r="9" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />

          {/* Glowing Golden Fairy Lights Garland */}
          <path
            d="M130,95 Q170,115 205,100 Q150,165 110,175 Q175,230 235,220 Q160,295 90,305 Q170,375 265,360"
            stroke="rgba(233,197,120,0.5)"
            strokeWidth="1.2"
            strokeDasharray="3 7"
            fill="none"
          />
        </svg>
      </div>

      {/* RIGHT MAIN CHRISTMAS TREE (Framing right side of hero) */}
      <div className="hero-tree-right absolute -bottom-6 -right-10 sm:-right-4 md:right-2 lg:right-6 z-20 w-[190px] sm:w-[260px] md:w-[320px] lg:w-[380px] drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)] transition-all">
        <svg viewBox="0 0 340 500" fill="none" className="w-full h-auto">
          {/* Tree Trunk */}
          <rect x="154" y="440" width="32" height="50" rx="3" fill="#3D2314" />
          <path d="M150 480 Q170 470 190 480 L190 490 L150 490 Z" fill="#24150B" />

          {/* Tier 5 */}
          <polygon points="170,260 20,440 320,440" fill="#0E3626" />
          <path
            d="M20,440 Q80,428 170,432 Q260,428 320,440 C280,410 240,415 170,418 C100,415 60,410 20,440 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 4 */}
          <polygon points="170,200 45,350 295,350" fill="#12412E" />
          <path
            d="M45,350 Q100,340 170,343 Q240,340 295,350 C260,325 220,330 170,332 C120,330 80,325 45,350 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 3 */}
          <polygon points="170,140 70,270 270,270" fill="#164D37" />
          <path
            d="M70,270 Q120,260 170,263 Q220,260 270,270 C240,248 205,252 170,254 C135,252 100,248 70,270 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 2 */}
          <polygon points="170,80 95,190 245,190" fill="#1A593F" />
          <path
            d="M95,190 Q130,182 170,185 Q210,182 245,190 C220,172 195,176 170,178 C145,176 120,172 95,190 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Tier 1 */}
          <polygon points="170,25 120,115 220,115" fill="#1E6548" />
          <path
            d="M120,115 Q145,108 170,110 Q195,108 220,115 C200,100 185,103 170,105 C155,103 140,100 120,115 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Golden Star Topper */}
          <g transform="translate(170, 22)">
            <polygon
              points="0,-22 6,-6 22,-6 10,4 14,20 0,10 -14,20 -10,4 -22,-6 -6,-6"
              fill="#FFD700"
              stroke="#FFF4DF"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="16" fill="#FFD700" opacity="0.35" className="blur-xs" />
          </g>

          {/* Ornaments */}
          <circle cx="215" cy="148" r="7" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="125" cy="162" r="6" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="185" cy="220" r="8" fill="#EF4050" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="105" cy="235" r="7" fill="#25A18E" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="240" cy="245" r="7" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="150" cy="305" r="9" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="210" cy="325" r="8" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="95" cy="315" r="8" fill="#D9ECF5" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="255" cy="385" r="9" fill="#EF4050" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="175" cy="395" r="10" fill="#E9C578" stroke="#FFF4DF" strokeWidth="1" />
          <circle cx="100" cy="390" r="9" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Foreground Layer: Snowbank & Wrapped Gift Boxes ── */}
      {/* Gentle Snowdrifts */}
      <svg
        className="absolute bottom-0 left-0 w-full text-[#08241A] opacity-95 z-20"
        viewBox="0 0 1440 120"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,60 C320,110 580,20 860,65 C1140,110 1320,30 1440,55 L1440,120 L0,120 Z" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full text-[#EAF4F4] opacity-25 z-20"
        viewBox="0 0 1440 60"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,25 C300,55 600,10 900,35 C1200,60 1350,15 1440,30 L1440,60 L0,60 Z" />
      </svg>

      {/* Decorative Wrapped Presents in Bottom Left Corner */}
      <div className="hidden md:flex absolute bottom-4 left-10 z-30 items-end gap-2 drop-shadow-lg">
        {/* Present 1: Festive Red Box with Gold Ribbon */}
        <div className="relative h-12 w-12 rounded-xs bg-gradient-to-br from-[#EF4050] to-[#C62835] border border-[#E9C578]/50 shadow-md">
          {/* Vertical & Horizontal Ribbon */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2.5 bg-[#FFD700]" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2.5 bg-[#FFD700]" />
          {/* Bow on top */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-5 rounded-full border border-[#FFF4DF] bg-[#FFD700]" />
        </div>
        {/* Present 2: Evergreen Box with White Ribbon */}
        <div className="relative h-8 w-10 rounded-xs bg-gradient-to-br from-[#1C5C42] to-[#0F3827] border border-[#FFF4DF]/40 shadow-sm">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-[#FFFFFF]" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-[#FFFFFF]" />
        </div>
      </div>

      {/* Decorative Candy Cane & Present in Bottom Right Corner */}
      <div className="hidden md:flex absolute bottom-4 right-10 z-30 items-end gap-2 drop-shadow-lg">
        {/* Present 3: Gold Box with Crimson Ribbon */}
        <div className="relative h-11 w-11 rounded-xs bg-gradient-to-br from-[#FFF4DF] to-[#E9C578] border border-[#C62835]/50 shadow-md">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2.5 bg-[#C62835]" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2.5 bg-[#C62835]" />
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-4 rounded-full border border-[#FFF4DF] bg-[#C62835]" />
        </div>
      </div>
    </div>
  );
};
