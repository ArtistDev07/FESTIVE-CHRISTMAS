import React from 'react';
import { NavigationItem } from '../../config/navigationConfig.ts';

interface NavigationLinkProps {
  item: NavigationItem;
  isActive?: boolean;
  onNavigate: (item: NavigationItem) => void;
  className?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  item,
  isActive = false,
  onNavigate,
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(item);
    }
  };

  return (
    <a
      href={item.href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`nav-link-base group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] ${
        isActive ? 'nav-link-active' : ''
      } ${className}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span>{item.label}</span>
      {/* Tiny subtle star indicator for active link */}
      {isActive && (
        <span className="text-[10px] text-[#E9C578] animate-twinkle" aria-hidden="true">
          ✦
        </span>
      )}
    </a>
  );
};
