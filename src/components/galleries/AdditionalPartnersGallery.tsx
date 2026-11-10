import React from 'react';
import { AdditionalPartnerItem } from '../../types/galleries.ts';
import { CardCornerBrackets } from './GalleryCardOrnaments.tsx';

interface AdditionalPartnersGalleryProps {
  partners?: AdditionalPartnerItem[];
}

export const ADDITIONAL_PARTNER_IMAGE_URL =
  'https://i.pinimg.com/736x/c6/8d/6c/c68d6cbd98af5e00f00b78206ffbc36a.jpg';

const DEFAULT_ADDITIONAL_PARTNERS: AdditionalPartnerItem[] = [
  {
    id: 'add-media',
    category: 'media',
    categoryLabel: 'Media',
    name: 'Media Partner',
    subtitle: '',
    description: '',
    visualTheme: '',
    highlights: [],
    websiteUrl: '',
    isConfirmed: true,
    imageUrl: ADDITIONAL_PARTNER_IMAGE_URL,
  },
  {
    id: 'add-photo',
    category: 'photography',
    categoryLabel: 'Photography',
    name: 'Photography Partner',
    subtitle: '',
    description: '',
    visualTheme: '',
    highlights: [],
    websiteUrl: '',
    isConfirmed: true,
    imageUrl: ADDITIONAL_PARTNER_IMAGE_URL,
  },
  {
    id: 'add-venue',
    category: 'venue',
    categoryLabel: 'Venue',
    name: 'Venue Partner',
    subtitle: '',
    description: '',
    visualTheme: '',
    highlights: [],
    websiteUrl: '',
    isConfirmed: true,
    imageUrl: ADDITIONAL_PARTNER_IMAGE_URL,
  },
  {
    id: 'add-food',
    category: 'food',
    categoryLabel: 'Food & Beverage',
    name: 'Food Partner',
    subtitle: '',
    description: '',
    visualTheme: '',
    highlights: [],
    websiteUrl: '',
    isConfirmed: true,
    imageUrl: ADDITIONAL_PARTNER_IMAGE_URL,
  },
];

export const AdditionalPartnersGallery: React.FC<AdditionalPartnersGalleryProps> = ({ partners }) => {
  const sourceList = partners && partners.length > 0 ? partners : DEFAULT_ADDITIONAL_PARTNERS;
  const activePartners = sourceList.slice(0, 4).map((p, idx) => ({
    ...p,
    id: p.id || `add-partner-${idx + 1}`,
    name: p.name || DEFAULT_ADDITIONAL_PARTNERS[idx]?.name || `Partner ${idx + 1}`,
    categoryLabel: p.categoryLabel || DEFAULT_ADDITIONAL_PARTNERS[idx]?.categoryLabel || '',
    imageUrl: p.imageUrl || ADDITIONAL_PARTNER_IMAGE_URL,
  }));

  return (
    <div className="w-full select-none" onContextMenu={(e) => e.preventDefault()}>
      {/* 4 Cards Grid - Compact Dimensions Matching Community Partners Gallery Cleanly Centered Across Breakpoints */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto">
        {activePartners.map((partner, idx) => {
          const imgSrc = partner.imageUrl || ADDITIONAL_PARTNER_IMAGE_URL;
          const partnerTitle = partner.name || partner.categoryLabel || `Additional Partner ${idx + 1}`;

          return (
            <div
              key={partner.id}
              aria-label={partnerTitle}
              onContextMenu={(e) => e.preventDefault()}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811] p-3 sm:p-3.5 shadow-[0_10px_30px_rgba(4,20,15,0.7)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:border-[#E9C578] hover:shadow-[0_0_25px_rgba(233,197,120,0.35)] cursor-default select-none w-full max-w-[170px] sm:max-w-[195px] mx-auto"
            >
              <CardCornerBrackets color="#E9C578" />

              {/* Ambient top glowing hover aura */}
              <div
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-radial from-[#FFEA9F]/25 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Subtle festive sheen overlay on hover */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[#E9C578]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                aria-hidden="true"
              />

              {/* Strict 1:1 Aspect Ratio Compact Image Frame */}
              <div
                className="relative w-full aspect-square overflow-hidden rounded-2xl border border-[#E9C578]/25 bg-[#061C14] shadow-inner group-hover:border-[#E9C578]/60 transition-colors duration-500 select-none"
                onContextMenu={(e) => e.preventDefault()}
              >
                <img
                  src={imgSrc}
                  alt={partnerTitle}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none select-none"
                  style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                  loading="lazy"
                />

                {/* Frosted gradient vignette overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09271E]/60 via-transparent to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-15" />

                {/* Festive micro-detail gold star badge */}
                <div
                  className="pointer-events-none absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#09271E]/75 border border-[#E9C578]/50 text-[#FFD700] text-xs shadow-[0_0_10px_rgba(233,197,120,0.4)] backdrop-blur-sm"
                  aria-hidden="true"
                >
                  ✦
                </div>
              </div>

              {/* Glowing inner border highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E9C578]/0 group-hover:border-[#E9C578]/40 transition-colors duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
