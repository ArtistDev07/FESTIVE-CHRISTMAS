import React from 'react';
import { Sparkles } from 'lucide-react';

export interface FestiveDividerProps {
  className?: string;
  variant?: 'subtle' | 'ornate' | 'knit';
}

export const FestiveDivider: React.FC<FestiveDividerProps> = ({
  className = '',
  variant = 'subtle',
}) => {
  if (variant === 'ornate') {
    return (
      <div className={`relative flex items-center justify-center py-2 ${className}`} aria-hidden="true">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E9C578]/40 to-transparent" />
        <div className="absolute flex items-center gap-1.5 px-3 bg-[#09271E] text-[#E9C578]">
          <span className="text-[10px]">✦</span>
          <Sparkles className="h-3 w-3 text-[#E9C578]" />
          <span className="text-[10px]">✦</span>
        </div>
      </div>
    );
  }

  if (variant === 'knit') {
    return (
      <div className={`w-full overflow-hidden py-1 ${className}`} aria-hidden="true">
        <div className="h-2 w-full bg-[radial-gradient(#E9C578_1px,transparent_1px)] [background-size:8px_8px] opacity-35" />
      </div>
    );
  }

  return (
    <div
      className={`h-[1px] w-full bg-gradient-to-r from-transparent via-[#E9C578]/25 to-transparent ${className}`}
      aria-hidden="true"
    />
  );
};
