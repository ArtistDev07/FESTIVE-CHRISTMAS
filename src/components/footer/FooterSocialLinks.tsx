import React from 'react';

export const FooterSocialLinks: React.FC = () => {
  return (
    <div className="flex flex-col text-left">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-festive text-lg font-bold tracking-tight text-[#FFEA9F]">
          Stay Connected
        </h4>
      </div>

      <p className="text-xs text-[#D9ECF5]/80 font-sans-festive mb-4 leading-relaxed max-w-xs">
        Keep up with the latest event information, mentor office hours, and official solstice announcements.
      </p>
    </div>
  );
};
