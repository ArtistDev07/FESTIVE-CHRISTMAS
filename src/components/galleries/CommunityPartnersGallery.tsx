import React from 'react';
import { CommunityPartnerItem } from '../../types/galleries.ts';
import { CardCornerBrackets } from './GalleryCardOrnaments.tsx';

interface CommunityPartnersGalleryProps {
  partners?: CommunityPartnerItem[];
}

const DEFAULT_COMMUNITY_PARTNERS: { name: string; imageUrl: string }[] = [
  {
    name: 'Pydata Indore',
    imageUrl: 'https://i.pinimg.com/736x/e5/65/af/e565af1ba2982df410589b1c57f9597a.jpg',
  },
  {
    name: 'CloudDevOps',
    imageUrl: 'https://i.pinimg.com/736x/f8/19/a2/f819a2f609a2371f873869a224af10de.jpg',
  },
  {
    name: 'Cloud Native Indore',
    imageUrl: 'https://i.pinimg.com/736x/47/0c/b0/470cb0410a207830c9d4188060d45221.jpg',
  },
  {
    name: 'SlowBrosLabs',
    imageUrl: 'https://i.pinimg.com/736x/95/a8/2e/95a82ed49e7e2ff3131ebd81e9197016.jpg',
  },
  {
    name: 'Revel Soon',
    imageUrl: 'https://i.pinimg.com/736x/74/95/0e/74950ebb5816a7035141d8d65b435a0d.jpg',
  },
];

export const CommunityPartnersGallery: React.FC<CommunityPartnersGalleryProps> = ({ partners }) => {
  // Use provided partners or default to the 5 specified community partners
  const activePartners = DEFAULT_COMMUNITY_PARTNERS.map((defaultItem, idx) => {
    const provided = partners && partners[idx];
    return {
      id: provided?.id || `community-partner-${idx + 1}`,
      name: provided?.name || defaultItem.name,
      imageUrl: provided?.imageUrl || defaultItem.imageUrl,
    };
  });

  return (
    <div className="w-full select-none" onContextMenu={(e) => e.preventDefault()}>
      {/* 5 Cards Grid - Strictly Uniform Fixed-Size Image Frames (1:1 Aspect Ratio) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {activePartners.map((partner) => (
          <div
            key={partner.id}
            aria-label={partner.name}
            onContextMenu={(e) => e.preventDefault()}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811] p-3 shadow-[0_10px_30px_rgba(4,20,15,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.3)] cursor-default select-none"
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
                src={partner.imageUrl}
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
