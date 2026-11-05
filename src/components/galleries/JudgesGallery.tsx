import React from 'react';
import { JudgeProfileItem } from '../../types/galleries.ts';
import { CardCornerBrackets } from './GalleryCardOrnaments.tsx';

interface JudgesGalleryProps {
  judges: JudgeProfileItem[];
}

const JUDGE_PORTRAIT_URL = 'https://i.pinimg.com/736x/c6/8d/6c/c68d6cbd98af5e00f00b78206ffbc36a.jpg';

export const JudgesGallery: React.FC<JudgesGalleryProps> = ({ judges }) => {
  const activeJudges = judges.slice(0, 4);

  return (
    <div className="w-full select-none" onContextMenu={(e) => e.preventDefault()}>
      {/* 4 Cards Grid - Strictly Uniform Fixed-Size Image Frames (3:4 Aspect Ratio for Portraits) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeJudges.map((judge, idx) => {
          const imgSrc = JUDGE_PORTRAIT_URL;

          return (
            <div
              key={judge.id}
              aria-label={`Judge portrait frame ${idx + 1}`}
              onContextMenu={(e) => e.preventDefault()}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811] p-3 shadow-[0_10px_30px_rgba(4,20,15,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.3)] cursor-default select-none"
            >
              <CardCornerBrackets color="#E9C578" />

              <div
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-radial from-[#FFD700]/25 via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Strict 3:4 Aspect Ratio Uniform Portrait Frame */}
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

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09271E]/65 via-transparent to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-15" />

                {/* Subtle festive wreath micro-ornament */}
                <div
                  className="pointer-events-none absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#09271E]/70 border border-[#E9C578]/50 text-[#FFD700] text-xs shadow-[0_0_10px_rgba(233,197,120,0.4)] backdrop-blur-sm"
                  aria-hidden="true"
                >
                  ✦
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E9C578]/0 group-hover:border-[#E9C578]/40 transition-colors duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
