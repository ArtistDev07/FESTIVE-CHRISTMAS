import React from 'react';

export interface FestiveIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'frosted' | 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  icon: React.ReactNode;
  className?: string;
}

export const FestiveIconButton: React.FC<FestiveIconButtonProps> = ({
  'aria-label': ariaLabel,
  variant = 'frosted',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const variantClasses = {
    frosted:
      'border border-[#E9C578]/30 bg-[#09271E]/80 text-[#FFF4DF] backdrop-blur-md hover:border-[#E9C578] hover:bg-[#123D2B] hover:text-[#E9C578] shadow-[0_2px_10px_rgba(0,0,0,0.3)]',
    ghost:
      'border border-transparent bg-transparent text-[#FFF4DF] hover:bg-[#123D2B]/60 hover:text-[#E9C578]',
    solid:
      'border border-[#E9C578]/60 bg-[#123D2B] text-[#E9C578] hover:bg-[#1A4E38] hover:text-[#FFFFFF] shadow-md',
  };

  return (
    <button
      type={props.type || 'button'}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="shrink-0 flex items-center justify-center">{icon}</span>
    </button>
  );
};
