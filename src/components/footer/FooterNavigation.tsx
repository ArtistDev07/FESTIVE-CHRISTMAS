import React from 'react';
import { footerConfig } from '../../config/footerConfig.ts';
import { FooterLinkGroup } from './FooterLinkGroup.tsx';

export const FooterNavigation: React.FC = () => {
  return (
    <nav
      aria-label="Footer Site Navigation"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-10"
    >
      {footerConfig.navigationGroups.map((group) => (
        <FooterLinkGroup key={group.id} group={group} />
      ))}
    </nav>
  );
};
