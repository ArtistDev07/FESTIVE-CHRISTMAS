import React from 'react';

export interface FestiveLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
  showUnderline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FestiveLink: React.FC<FestiveLinkProps> = ({
  href,
  isExternal,
  showUnderline = true,
  className = '',
  children,
  target,
  rel,
  ...props
}) => {
  const isAutoExternal = isExternal ?? (href.startsWith('http') || target === '_blank');
  const computedRel = rel || (isAutoExternal ? 'noopener noreferrer' : undefined);
  const computedTarget = target || (isAutoExternal ? '_blank' : undefined);

  return (
    <a
      href={href}
      target={computedTarget}
      rel={computedRel}
      className={`group relative inline-flex items-center text-[#FFF4DF] transition-colors duration-200 hover:text-[#E9C578] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] rounded-xs ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showUnderline && (
        <span
          className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gradient-to-r from-[#E9C578] to-[#FFF4DF] transition-all duration-300 ease-out group-hover:w-full"
          aria-hidden="true"
        />
      )}
    </a>
  );
};
