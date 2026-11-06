import React from 'react';
import { CommunityPartnerItem } from '../../types/galleries.ts';
import { CardCornerBrackets } from './GalleryCardOrnaments.tsx';

interface CommunityPartnersGalleryProps {
  partners?: CommunityPartnerItem[];
}

export const COMMUNITY_PARTNER_IMAGE_URL =
  'https://i.pinimg.com/736x/74/95/0e/74950ebb5816a7035141d8d65b435a0d.jpg';

const DEFAULT_COMMUNITY_PARTNERS: { id: string; name: string; imageUrl: string }[] = [
  { id: 'partner-01', name: 'Community Partner 01', imageUrl: COMMUNITY_PARTNER_IMAGE_URL },
  { id: 'partner-02', name: 'Community Partner 02', imageUrl: COMMUNITY_PARTNER_IMAGE_URL },
  { id: 'partner-03', name: 'Community Partner 03', imageUrl: COMMUNITY_PARTNER_IMAGE_URL },
  { id: 'partner-04', name: 'Community Partner 04', imageUrl: COMMUNITY_PARTNER_IMAGE_URL },
  { id: 'partner-05', name: 'Community Partner 05', imageUrl: COMMUNITY_PARTNER_IMAGE_URL },
];

export const CommunityPartnersGallery: React.FC<CommunityPartnersGalleryProps> = ({ partners }) => {
  // Use provided partners or default to the 5 specified community partner frames, all rendering the exact target image
  const activePartners = DEFAULT_COMMUNITY_PARTNERS.map((defaultItem, idx) => {
    const provided = partners && partners[idx];
    return {
      id: provided?.id || defaultItem.id,
      name: provided?.name || defaultItem.name,
      imageUrl: COMMUNITY_PARTNER_IMAGE_URL,
    };
  });

  return (
    <div className="w-full select-none" onContextMenu={(e) => e.preventDefault()}>
      {/* 5 Cards Grid - Strictly Uniform Fixed-Size Image Frames Cleanly Centered Across Mobile, Tablet, and Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-center items-center max-w-6xl mx-auto">
        {activePartners.map((partner, idx) => (
          <div
            key={partner.id}
            aria-label={partner.name}
            onContextMenu={(e) => e.preventDefault()}
            className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811] p-3 sm:p-3.5 shadow-[0_10px_30px_rgba(4,20,15,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.3)] cursor-default select-none ${
              idx === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-1 max-w-[200px] sm:max-w-none justify-self-center sm:justify-self-auto' : ''
            }`}
          >
            <CardCornerBrackets color="#E9C578" />

            {/* Ambient top glowing hover aura */}
            <div
              className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-radial from-[#88D4B0]/25 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            {/* Strict 1:1 Aspect Ratio Uniform Image Frame */}
            <div
              className="relative w-full aspect-square overflow-hidden rounded-2xl border border-[#E9C578]/25 bg-[#061C14] shadow-inner group-hover:border-[#E9C578]/60 transition-colors duration-500 select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={COMMUNITY_PARTNER_IMAGE_URL}
                alt={partner.name}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none select-none"
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                loading="lazy"
              />

              {/* Frosted overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09271E]/60 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-15" />

              {/* Festive snowflake micro-detail */}
              <div
                className="pointer-events-none absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#09271E]/70 border border-[#E9C578]/50 text-[#88D4B0] text-xs shadow-[0_0_10px_rgba(136,212,176,0.4)] backdrop-blur-sm"
                aria-hidden="true"
              >
                ❄
              </div>
            </div>

            {/* Glowing inner border highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E9C578]/0 group-hover:border-[#E9C578]/40 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
