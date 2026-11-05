import React from 'react';
import { MentorProfileItem } from '../../types/galleries.ts';
import { CardCornerBrackets } from './GalleryCardOrnaments.tsx';

interface MentorsGalleryProps {
  mentors: MentorProfileItem[];
}

const MENTOR_PORTRAIT_URL = 'https://i.pinimg.com/736x/c6/8d/6c/c68d6cbd98af5e00f00b78206ffbc36a.jpg';

export const MentorsGallery: React.FC<MentorsGalleryProps> = ({ mentors }) => {
  const activeMentors = mentors.slice(0, 8);
  // Duplicate for seamless, uninterrupted infinite looping
  const loopMentors = [...activeMentors, ...activeMentors];

  return (
    <div
      className="w-full relative overflow-hidden select-none py-4"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Ambient gradient masks on edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#09271E] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#09271E] to-transparent z-10" />

      {/* Infinite continuous marquee track: NEVER pauses or stops */}
      <div className="animate-infinite-marquee flex items-center">
        {loopMentors.map((mentor, index) => {
          const originalIdx = index % activeMentors.length;
          const imgSrc = MENTOR_PORTRAIT_URL;

          return (
            <div
              key={`${mentor.id}-${index}`}
              className="w-56 sm:w-64 shrink-0 px-3 select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <div
                aria-label={`Mentor portrait frame ${originalIdx + 1}`}
                onContextMenu={(e) => e.preventDefault()}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811] p-3 shadow-[0_10px_30px_rgba(4,20,15,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.3)] cursor-default select-none"
              >
                <CardCornerBrackets color="#E9C578" />

                {/* Ambient top hover glow */}
                <div
                  className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-radial from-[#88D4B0]/25 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                {/* Strict 3:4 Uniform Portrait Frame with Zero Text */}
                <div
                  className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-[#E9C578]/25 bg-[#061C14] shadow-inner group-hover:border-[#E9C578]/60 transition-colors duration-500 select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={imgSrc}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none select-none"
                    style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                    loading="lazy"
                  />

                  {/* Frosted winter sheen overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09271E]/65 via-transparent to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-15" />

                  {/* Sparkling Christmas starlight micro-detail */}
                  <div
                    className="pointer-events-none absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#09271E]/70 border border-[#E9C578]/50 text-[#88D4B0] text-xs shadow-[0_0_10px_rgba(136,212,176,0.4)] backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    ✦
                  </div>
                </div>

                {/* Glowing inner border highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E9C578]/0 group-hover:border-[#E9C578]/40 transition-colors duration-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
