import React from 'react';
import { AwardCategoryType } from '../../types/awards.ts';

interface AwardIllustrationProps {
  category: AwardCategoryType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AwardIllustration: React.FC<AwardIllustrationProps> = ({
  category,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const renderContent = () => {
    switch (category) {
      case 'overall':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
            <defs>
              <radialGradient id="trophyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E9C578" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E9C578" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="goldTrophyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF4DF" />
                <stop offset="40%" stopColor="#E9C578" />
                <stop offset="100%" stopColor="#B38628" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#trophyGlow)" />
            {/* Laurel Wreath */}
            <path
              d="M25 60 C20 40 30 25 50 20 C70 25 80 40 75 60"
              stroke="#E9C578"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1 6"
            />
            {/* Trophy Cup */}
            <path
              d="M36 28 L64 28 C64 45 58 55 50 56 C42 55 36 45 36 28 Z"
              fill="url(#goldTrophyGrad)"
              stroke="#FFF4DF"
              strokeWidth="1.2"
            />
            {/* Trophy Handles */}
            <path d="M36 32 C27 34 27 46 38 48" stroke="#E9C578" strokeWidth="2" fill="none" />
            <path d="M64 32 C73 34 73 46 62 48" stroke="#E9C578" strokeWidth="2" fill="none" />
            {/* Stem and Base */}
            <path d="M47 56 L53 56 L52 68 L48 68 Z" fill="#B38628" />
            <rect x="38" y="68" width="24" height="8" rx="2" fill="url(#goldTrophyGrad)" stroke="#B38628" strokeWidth="1" />
            {/* Solstice Star above cup */}
            <polygon points="50,14 52,19 57,20 53,24 54,29 50,26 46,29 47,24 43,20 48,19" fill="#FFF4DF" />
          </svg>
        );

      case 'innovation':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="innoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EF4050" />
                <stop offset="100%" stopColor="#871721" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#EF4050" fillOpacity="0.15" />
            {/* Lightbulb contour */}
            <path
              d="M50 20 C38 20 30 28 30 40 C30 48 35 55 40 60 L40 66 L60 66 L60 60 C65 55 70 48 70 40 C70 28 62 20 50 20 Z"
              fill="url(#innoGrad)"
              stroke="#FFF4DF"
              strokeWidth="1.5"
            />
            {/* Bulb threads */}
            <line x1="43" y1="70" x2="57" y2="70" stroke="#E9C578" strokeWidth="2" strokeLinecap="round" />
            <line x1="45" y1="74" x2="55" y2="74" stroke="#E9C578" strokeWidth="2" strokeLinecap="round" />
            {/* Filament Sparkle */}
            <polygon points="50,32 52,38 58,40 52,42 50,48 48,42 42,40 48,38" fill="#FFF4DF" />
            {/* Radiant Rays */}
            <line x1="50" y1="10" x2="50" y2="15" stroke="#E9C578" strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="22" x2="26" y2="26" stroke="#E9C578" strokeWidth="2" strokeLinecap="round" />
            <line x1="78" y1="22" x2="74" y2="26" stroke="#E9C578" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'technical':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="techGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#25A18E" />
                <stop offset="100%" stopColor="#0E3D35" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#25A18E" fillOpacity="0.15" />
            {/* Isometric Crystal Cube / Circuit */}
            <path d="M50 22 L75 36 L75 64 L50 78 L25 64 L25 36 Z" fill="url(#techGrad)" stroke="#E9C578" strokeWidth="1.5" />
            <path d="M50 22 L50 78 M50 50 L75 36 M50 50 L25 36" stroke="#FFF4DF" strokeWidth="1.2" opacity="0.6" />
            {/* Circuit Nodes */}
            <circle cx="50" cy="50" r="4" fill="#E9C578" />
            <circle cx="50" cy="22" r="2.5" fill="#D9ECF5" />
            <circle cx="75" cy="36" r="2.5" fill="#D9ECF5" />
            <circle cx="25" cy="36" r="2.5" fill="#D9ECF5" />
            <circle cx="50" cy="78" r="2.5" fill="#D9ECF5" />
          </svg>
        );

      case 'design':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="designGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E9C578" />
                <stop offset="100%" stopColor="#8A6A1E" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#E9C578" fillOpacity="0.15" />
            {/* Artist Palette with Ribbon */}
            <path
              d="M30 68 C22 55 24 35 40 26 C56 17 76 25 80 42 C83 56 75 66 65 65 C60 64 58 60 55 60 C50 60 48 68 40 70 C36 71 33 70 30 68 Z"
              fill="url(#designGrad)"
              stroke="#FFF4DF"
              strokeWidth="1.5"
            />
            {/* Thumbhole */}
            <circle cx="40" cy="58" r="4.5" fill="#09271E" />
            {/* Color Swatches */}
            <circle cx="42" cy="33" r="3.5" fill="#EF4050" />
            <circle cx="55" cy="28" r="3.5" fill="#25A18E" />
            <circle cx="68" cy="36" r="3.5" fill="#D9ECF5" />
            <circle cx="71" cy="50" r="3.5" fill="#C62835" />
          </svg>
        );

      case 'impact':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EF4050" />
                <stop offset="100%" stopColor="#C62835" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#C62835" fillOpacity="0.15" />
            {/* Heart shape */}
            <path
              d="M50 74 C50 74 24 56 24 38 C24 28 32 22 40 24 C45 25 48 29 50 32 C52 29 55 25 60 24 C68 22 76 28 76 38 C76 56 50 74 50 74 Z"
              fill="url(#heartGrad)"
              stroke="#FFF4DF"
              strokeWidth="1.5"
            />
            {/* Evergreen sprig crossing heart */}
            <path d="M35 55 Q50 48 65 55" stroke="#123D2B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="48" cy="50" r="2.5" fill="#E9C578" />
            <circle cx="53" cy="50" r="2.5" fill="#E9C578" />
          </svg>
        );

      case 'special':
      default:
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
            <defs>
              <radialGradient id="specialGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D9ECF5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#25A18E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#specialGlow)" />
            {/* Laurel Wreath */}
            <circle cx="50" cy="50" r="28" stroke="#D9ECF5" strokeWidth="2" strokeDasharray="3 3" />
            {/* Northern Lights Star */}
            <polygon
              points="50,18 53,35 70,38 56,48 61,65 50,54 39,65 44,48 30,38 47,35"
              fill="#D9ECF5"
              stroke="#E9C578"
              strokeWidth="1.2"
            />
            <circle cx="50" cy="46" r="3" fill="#E9C578" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {renderContent()}
    </div>
  );
};
