import React from 'react';
import {
  HelpCircle,
  FileText,
  Compass,
  Calendar,
  Gift,
  CheckSquare,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { quickHelpLinks, QuickHelpLink } from '../../config/contactConfig.ts';

export const QuickHelpDirectory: React.FC = () => {
  const getIcon = (iconName: QuickHelpLink['iconName']) => {
    switch (iconName) {
      case 'HelpCircle':
        return <HelpCircle className="h-4 w-4" />;
      case 'FileText':
        return <FileText className="h-4 w-4" />;
      case 'Compass':
        return <Compass className="h-4 w-4" />;
      case 'Calendar':
        return <Calendar className="h-4 w-4" />;
      case 'Gift':
        return <Gift className="h-4 w-4" />;
      case 'CheckSquare':
        return <CheckSquare className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      // Update history without hard reload
      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <div className="relative rounded-3xl border border-[#E9C578]/25 bg-gradient-to-br from-[#0B2E21] via-[#08241A] to-[#04150F] p-6 sm:p-8 shadow-[0_16px_40px_rgba(4,20,15,0.6)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123D2B] border border-[#E9C578]/30 text-[#E9C578]">
            <Zap className="h-4 w-4 text-[#FFEA9F]" />
          </div>
          <div>
            <h3 className="font-festive text-xl sm:text-2xl font-bold text-[#FFFFFF]">
              Quick Help & Self-Service
            </h3>
            <p className="text-xs text-[#E9C578]/80 font-mono">
              Find instant answers across hackathon guides
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickHelpLinks.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleAnchorClick(e, item.href)}
            className="group flex flex-col justify-between p-3.5 rounded-2xl border border-[#E9C578]/15 bg-[#061811]/80 hover:bg-[#0D3425]/90 hover:border-[#E9C578]/50 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#123D2B] text-[#E9C578] border border-[#E9C578]/25 group-hover:scale-105 group-hover:border-[#E9C578] transition-all">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0E3A2A] text-[#88D4B0] border border-[#88D4B0]/25">
                  {item.badge}
                </span>
              </div>

              <h4 className="font-festive text-base font-bold text-[#FFFFFF] group-hover:text-[#FFEA9F] transition-colors">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-[#D9ECF5]/75 font-sans-festive leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-mono font-bold text-[#E9C578] group-hover:translate-x-1 transition-transform">
              <span>Explore section</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
