import React from 'react';
import { Loader2 } from 'lucide-react';

export type FestiveButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type FestiveButtonSize = 'sm' | 'md' | 'lg';

export interface FestiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FestiveButtonVariant;
  size?: FestiveButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const FestiveButton: React.FC<FestiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  href,
  target,
  rel,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer';

  const sizeClasses: Record<FestiveButtonSize, string> = {
    sm: 'px-4 py-2 text-xs gap-1.5 min-h-[36px]',
    md: 'px-6 py-2.5 text-sm gap-2 min-h-[44px]',
    lg: 'px-8 py-3.5 text-base gap-2.5 min-h-[50px]',
  };

  const variantClasses: Record<FestiveButtonVariant, string> = {
    primary:
      'festive-btn-primary bg-gradient-to-r from-[#C62835] via-[#A41B26] to-[#87141F] text-[#FFFFFF] border border-[#E9C578]/50 shadow-[0_4px_16px_rgba(198,40,53,0.4)] hover:shadow-[0_6px_22px_rgba(198,40,53,0.6)] hover:border-[#E9C578] active:translate-y-0.5',
    secondary:
      'festive-btn-secondary bg-[#123D2B]/80 text-[#FFF4DF] border border-[#E9C578]/30 backdrop-blur-md hover:bg-[#1A4E38] hover:text-[#FFFFFF] hover:border-[#E9C578]/70 shadow-[0_4px_16px_rgba(9,39,30,0.5)] active:translate-y-0.5',
    outline:
      'bg-transparent text-[#E9C578] border border-[#E9C578]/60 hover:bg-[#E9C578]/10 hover:border-[#E9C578] hover:text-[#FFF4DF] active:translate-y-0.5',
    ghost:
      'bg-transparent text-[#FFF4DF] hover:bg-[#123D2B]/60 hover:text-[#E9C578] border border-transparent',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href && !disabled) {
    const isExternal = href.startsWith('http') || target === '_blank';
    const computedRel = rel || (isExternal ? 'noopener noreferrer' : undefined);

    return (
      <a
        href={href}
        target={target}
        rel={computedRel}
        className={combinedClasses}
        aria-disabled={disabled}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
