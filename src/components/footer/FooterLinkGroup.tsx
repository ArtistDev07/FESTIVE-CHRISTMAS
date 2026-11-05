import React from 'react';
import { Link } from 'react-router-dom';
import { FooterNavigationGroup, FooterNavigationLink } from '../../config/footerConfig.ts';
import { ChevronRight } from 'lucide-react';

interface FooterLinkGroupProps {
  group: FooterNavigationGroup;
}

export const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ group }) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: FooterNavigationLink
  ) => {
    if (link.href.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(link.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        if (window.history.pushState) {
          window.history.pushState(null, '', link.href);
        }
      }
    }
  };

  return (
    <div className="flex flex-col text-left">
      <h4 className="font-festive text-lg font-bold tracking-tight text-[#FFEA9F] mb-3.5 flex items-center gap-2">
        <span>{group.title}</span>
        <span className="h-px flex-1 max-w-[24px] bg-[#E9C578]/30" />
      </h4>

      <ul className="space-y-2.5" role="list">
        {group.links.map((link) => {
          const isInternalRoute = link.href.startsWith('/');

          return (
            <li key={link.id}>
              {isInternalRoute ? (
                <Link
                  to={link.href}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#D9ECF5]/80 hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-1 focus-visible:ring-offset-[#061811] rounded py-0.5"
                >
                  <ChevronRight className="h-3 w-3 text-[#E9C578]/40 group-hover:text-[#E9C578] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:underline underline-offset-4 decoration-[#E9C578]/50">
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#123D2B] text-[#88D4B0] border border-[#88D4B0]/30 ml-1">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#D9ECF5]/80 hover:text-[#FFFFFF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-1 focus-visible:ring-offset-[#061811] rounded py-0.5"
                >
                  <ChevronRight className="h-3 w-3 text-[#E9C578]/40 group-hover:text-[#E9C578] group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="group-hover:underline underline-offset-4 decoration-[#E9C578]/50">
                    {link.label}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#123D2B] text-[#88D4B0] border border-[#88D4B0]/30 ml-1">
                      {link.badge}
                    </span>
                  )}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
