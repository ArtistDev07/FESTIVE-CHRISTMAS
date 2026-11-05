import React from 'react';

export const CardCornerBrackets: React.FC<{ color?: string }> = ({ color = '#E9C578' }) => (
  <>
    <div
      className="pointer-events-none absolute top-2 left-2 h-3.5 w-3.5 border-t-1.5 border-l-1.5 rounded-tl-sm opacity-60 transition-opacity group-hover:opacity-100"
      style={{ borderColor: color }}
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute top-2 right-2 h-3.5 w-3.5 border-t-1.5 border-r-1.5 rounded-tr-sm opacity-60 transition-opacity group-hover:opacity-100"
      style={{ borderColor: color }}
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 border-b-1.5 border-l-1.5 rounded-bl-sm opacity-60 transition-opacity group-hover:opacity-100"
      style={{ borderColor: color }}
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 border-b-1.5 border-r-1.5 rounded-br-sm opacity-60 transition-opacity group-hover:opacity-100"
      style={{ borderColor: color }}
      aria-hidden="true"
    />
  </>
);

export const HollyBerryCluster: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
    {/* Two evergreen leaves */}
    <svg viewBox="0 0 40 24" className="w-8 h-5" fill="none">
      <path
        d="M20,12 C14,8 10,2 4,4 C6,10 12,14 20,12 Z"
        fill="#123D2B"
        stroke="#25A18E"
        strokeWidth="1"
      />
      <path
        d="M20,12 C26,8 30,2 36,4 C34,10 28,14 20,12 Z"
        fill="#123D2B"
        stroke="#25A18E"
        strokeWidth="1"
      />
    </svg>
    {/* 3 Red berries in cluster */}
    <div className="absolute flex items-center gap-0.5">
      <div className="h-2 w-2 rounded-full bg-[#EF4050] shadow-[0_0_6px_#EF4050]" />
      <div className="h-2.5 w-2.5 rounded-full bg-[#C62835] -mt-1 shadow-[0_0_6px_#C62835]" />
      <div className="h-2 w-2 rounded-full bg-[#EF4050] shadow-[0_0_6px_#EF4050]" />
    </div>
  </div>
);

export const FestiveOrnamentIcon: React.FC<{
  type: string;
  className?: string;
}> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'star':
    case 'solstice-star':
    case 'golden-star':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 2L14.4 8.6L21.5 9.2L16 13.8L17.7 20.8L12 17.2L6.3 20.8L8 13.8L2.5 9.2L9.6 8.6L12 2Z"
            fill="#FFD700"
            stroke="#FFF4DF"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
        </svg>
      );
    case 'tree':
    case 'emerald-pine':
    case 'winter-pine':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <polygon points="12,2 4,18 20,18" fill="#123D2B" stroke="#25A18E" strokeWidth="1.2" />
          <polygon points="12,6 6,18 18,18" fill="#1A5338" />
          <rect x="10.5" y="18" width="3" height="4" fill="#E9C578" />
          <circle cx="12" cy="2" r="1.5" fill="#FFD700" />
        </svg>
      );
    case 'bell':
    case 'silver-bell':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M12 3C8.5 3 6 5.5 6 9.5V16C4.8 17.2 4 18 4 19H20C20 18 19.2 17.2 18 16V9.5C18 5.5 15.5 3 12 3Z"
            fill="#E9C578"
            stroke="#FFF4DF"
            strokeWidth="1"
          />
          <path d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19" stroke="#E9C578" strokeWidth="1.5" />
          <circle cx="12" cy="3" r="1.5" fill="#FFD700" />
        </svg>
      );
    case 'wreath':
    case 'gold-wreath':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="8" stroke="#25A18E" strokeWidth="2.5" strokeDasharray="2 2" />
          <circle cx="12" cy="12" r="6" stroke="#123D2B" strokeWidth="1" />
          <circle cx="12" cy="4" r="1.5" fill="#EF4050" />
          <circle cx="10" cy="5" r="1.2" fill="#C62835" />
          <circle cx="14" cy="5" r="1.2" fill="#EF4050" />
        </svg>
      );
    case 'candle':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="9" y="8" width="6" height="14" rx="1" fill="#FFF4DF" stroke="#E9C578" strokeWidth="1" />
          <path d="M12 8V5" stroke="#E9C578" strokeWidth="1.2" />
          <path d="M12 2C13 3.5 13.5 4.5 12 5.5C10.5 4.5 11 3.5 12 2Z" fill="#FFD700" />
        </svg>
      );
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="4" y="9" width="16" height="12" rx="2" fill="#0E3426" stroke="#EF4050" strokeWidth="1.2" />
          <rect x="3" y="6" width="18" height="4" rx="1" fill="#C62835" stroke="#E9C578" strokeWidth="1" />
          <line x1="12" y1="6" x2="12" y2="21" stroke="#FFD700" strokeWidth="1.8" />
          <line x1="4" y1="15" x2="20" y2="15" stroke="#FFD700" strokeWidth="1.8" />
        </svg>
      );
    case 'mitten':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            d="M6 13C6 8 8 5 12 5C16 5 18 8 18 13V18H6V13Z"
            fill="#C62835"
            stroke="#FFF4DF"
            strokeWidth="1"
          />
          <path d="M6 11C4 11 3 13 4 15C5 17 6 16 6 15" fill="#C62835" stroke="#FFF4DF" strokeWidth="1" />
          <rect x="5" y="18" width="14" height="4" rx="1" fill="#FFF4DF" />
        </svg>
      );
    case 'snowflake':
    case 'frost-crystal':
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <line x1="12" y1="2" x2="12" y2="22" stroke="#D9ECF5" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#D9ECF5" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke="#D9ECF5" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="4.9" y1="19.1" x2="19.1" y2="4.9" stroke="#D9ECF5" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="#E9C578" />
        </svg>
      );
  }
};
