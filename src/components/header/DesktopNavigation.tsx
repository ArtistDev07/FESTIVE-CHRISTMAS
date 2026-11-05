import React from 'react';
import { navigationConfig, NavigationItem } from '../../config/navigationConfig.ts';
import { NavigationLink } from './NavigationLink.tsx';
import { NavigationDropdown } from './NavigationDropdown.tsx';

interface DesktopNavigationProps {
  activeId?: string;
  onNavigate: (item: NavigationItem) => void;
  className?: string;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  activeId = 'nav-home',
  onNavigate,
  className = '',
}) => {
  return (
    <nav
      className={`hidden lg:flex items-center gap-1 xl:gap-2 ${className}`}
      aria-label="Main Desktop Navigation"
    >
      {navigationConfig.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <NavigationDropdown
              key={item.id}
              item={item}
              isActive={activeId === item.id || item.children.some((c) => c.id === activeId)}
              onNavigate={onNavigate}
            />
          );
        }

        return (
          <NavigationLink
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
};
