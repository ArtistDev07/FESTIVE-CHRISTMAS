import React from 'react';
import { footerConfig } from '../../config/footerConfig.ts';

export const FooterCopyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-8 mt-12 sm:mt-16 border-t border-[#E9C578]/15 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center text-xs text-[#D9ECF5]/75 font-sans-festive">
      <span>
        © {currentYear} {footerConfig.copyrightOwner}. All rights reserved.
      </span>
      <span className="hidden sm:inline text-[#E9C578]/40" aria-hidden="true">
        •
      </span>
      <span className="text-[#FFEA9F]/80 italic">
        {footerConfig.dedication}
      </span>
    </div>
  );
};
