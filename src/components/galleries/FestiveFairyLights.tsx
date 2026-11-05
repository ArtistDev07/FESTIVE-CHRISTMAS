import React from 'react';

interface FestiveFairyLightsProps {
  count?: number;
  className?: string;
}

export const FestiveFairyLights: React.FC<FestiveFairyLightsProps> = ({
  count = 16,
  className = '',
}) => {
  const bulbs = Array.from({ length: count }, (_, i) => {
    // Alternate festive colors: gold, red, emerald, warm cream, amber
    const colors = [
      { base: '#FFD700', glow: 'rgba(255, 215, 0, 0.65)' },
      { base: '#EF4050', glow: 'rgba(239, 64, 80, 0.65)' },
      { base: '#25A18E', glow: 'rgba(37, 161, 142, 0.65)' },
      { base: '#FFF4DF', glow: 'rgba(255, 244, 223, 0.65)' },
      { base: '#E9C578', glow: 'rgba(233, 197, 120, 0.7)' },
    ];
    const color = colors[i % colors.length];
    const delay = (i * 0.22) % 2.5;

    return { id: i, color, delay };
  });

  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none py-2 ${className}`}
      aria-hidden="true"
    >
      {/* Curved Garland Wire */}
      <svg
        viewBox="0 0 1200 36"
        preserveAspectRatio="none"
        className="w-full h-8 opacity-40 text-[#E9C578]"
      >
        <path
          d="M0,8 Q75,28 150,8 Q225,28 300,8 Q375,28 450,8 Q525,28 600,8 Q675,28 750,8 Q825,28 900,8 Q975,28 1050,8 Q1125,28 1200,8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>

      {/* Illuminated Glowing Bulbs */}
      <div className="absolute inset-x-0 top-1 flex items-center justify-around px-4">
        {bulbs.map((bulb) => (
          <div key={bulb.id} className="relative flex flex-col items-center">
            {/* Tiny green socket */}
            <div className="h-1.5 w-1 bg-[#123D2B] rounded-t-xs" />
            {/* Tear-drop glowing fairy bulb */}
            <div
              className="h-2.5 w-2 sm:h-3 sm:w-2.5 rounded-full transition-transform duration-300 animate-pulse"
              style={{
                backgroundColor: bulb.color.base,
                boxShadow: `0 0 10px 2px ${bulb.color.glow}, 0 0 16px 4px ${bulb.color.glow}`,
                animationDelay: `${bulb.delay}s`,
                animationDuration: '2.4s',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
