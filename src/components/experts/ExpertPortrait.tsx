import React, { useState } from 'react';
import { User } from 'lucide-react';

interface ExpertPortraitProps {
  name: string;
  src?: string;
  role: 'mentor' | 'judge' | 'mentor-and-judge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ExpertPortrait: React.FC<ExpertPortraitProps> = ({
  name,
  src,
  role,
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Derive 2-letter initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-20 h-20 text-xl',
    lg: 'w-28 h-28 text-2xl',
    xl: 'w-36 h-36 sm:w-44 sm:h-44 text-3xl sm:text-4xl',
  };

  const roleAccentBorder =
    role === 'judge'
      ? 'border-[#E9C578]/60 shadow-[0_0_20px_rgba(233,197,120,0.25)]'
      : role === 'mentor-and-judge'
      ? 'border-[#FFEA9F]/80 shadow-[0_0_24px_rgba(255,234,159,0.3)]'
      : 'border-[#4E8E72]/60 shadow-[0_0_20px_rgba(78,142,114,0.2)]';

  const roleBackground =
    role === 'judge'
      ? 'from-[#1B362A] via-[#122B20] to-[#081B14]'
      : role === 'mentor-and-judge'
      ? 'from-[#224434] via-[#153426] to-[#0A1E16]'
      : 'from-[#143B2B] via-[#0E2C1F] to-[#071E15]';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shrink-0 border-2 ${roleAccentBorder} ${sizeClasses[size]} ${className}`}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImageError(true)}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 pointer-events-none select-none"
          style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        /* Dignified Monogram Fallback Frame */
        <div
          className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${roleBackground} text-[#FFF4DF] select-none`}
          aria-label={`Portrait placeholder for ${name}`}
        >
          {/* Subtle star/sparkle background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 fill-[#E9C578]">
              <polygon points="50,5 61,38 95,38 68,58 78,92 50,72 22,92 32,58 5,38 39,38" />
            </svg>
          </div>

          <span className="font-serif-festive font-bold tracking-wider text-[#FFFFFF] relative z-10 drop-shadow">
            {initials || <User className="h-6 w-6 opacity-60" />}
          </span>

          <span className="text-[9px] font-mono uppercase tracking-widest text-[#E9C578]/80 mt-0.5 relative z-10">
            {role === 'judge' ? 'Judge' : role === 'mentor-and-judge' ? 'Mentor/Judge' : 'Mentor'}
          </span>
        </div>
      )}
    </div>
  );
};
