import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles, BookOpen, Award, Users } from 'lucide-react';
import { NavigationItem } from '../../config/navigationConfig.ts';

interface NavigationDropdownProps {
  item: NavigationItem;
  isActive?: boolean;
  onNavigate: (item: NavigationItem) => void;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
  item,
  isActive = false,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Keyboard navigation: Escape key closes menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      // Return focus to trigger button
      const triggerBtn = containerRef.current?.querySelector('button');
      triggerBtn?.focus();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Hover with safe margin buffer
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 220); // 220ms buffer allows moving into panel
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (child: NavigationItem) => {
    setIsOpen(false);
    onNavigate(child);
  };

  // Icon mapping for dropdown items
  const getItemIcon = (id: string) => {
    switch (id) {
      case 'nav-about':
        return <Sparkles className="h-4 w-4 text-[#E9C578] shrink-0 mt-0.5" />;
      case 'nav-rules':
        return <BookOpen className="h-4 w-4 text-[#FFF4DF] shrink-0 mt-0.5" />;
      case 'nav-mentors':
        return <Users className="h-4 w-4 text-[#D9ECF5] shrink-0 mt-0.5" />;
      default:
        return <Award className="h-4 w-4 text-[#E9C578] shrink-0 mt-0.5" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${item.label} menu`}
        className={`nav-link-base group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] ${
          isActive || isOpen ? 'nav-link-active' : ''
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#E9C578] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#FFD700]' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Floating Panel */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label={item.label}
          className="nav-dropdown-panel absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-2 z-50 animate-fade-in origin-top"
        >
          {/* Subtle decorative top star accent */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#E9C578]/20 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E9C578]">
              {item.label}
            </span>
            <span className="text-xs text-[#E9C578]/70">✦ ✦ ✦</span>
          </div>

          <div className="flex flex-col gap-1">
            {item.children?.map((child) => (
              <button
                key={child.id}
                role="menuitem"
                type="button"
                onClick={() => handleItemClick(child)}
                className="nav-dropdown-item text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
              >
                {getItemIcon(child.id)}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#E9C578]">
                      {child.label}
                    </span>
                    {child.phaseRequirement && (
                      <span className="text-[10px] text-[#E9C578]/70 font-mono">
                        {child.phaseRequirement.split(':')[0]}
                      </span>
                    )}
                  </div>
                  {child.description && (
                    <span className="text-xs text-[#D9ECF5]/75 mt-0.5 leading-snug">
                      {child.description}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
