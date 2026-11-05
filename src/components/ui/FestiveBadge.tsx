import React from 'react';

export interface FestiveBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'red' | 'evergreen' | 'ice';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const FestiveBadge: React.FC<FestiveBadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const variantStyles = {
    gold: 'border-[#E9C578]/40 bg-[#123D2B]/80 text-[#E9C578] shadow-[0_0_12px_rgba(233,197,120,0.15)]',
    red: 'border-[#EF4050]/40 bg-[#C62835]/30 text-[#FFF4DF] shadow-[0_0_12px_rgba(198,40,53,0.2)]',
    evergreen: 'border-[#25A18E]/40 bg-[#09271E]/90 text-[#D9ECF5]',
    ice: 'border-[#D9ECF5]/40 bg-[#0E3526]/80 text-[#D9ECF5]',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wider backdrop-blur-md transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
