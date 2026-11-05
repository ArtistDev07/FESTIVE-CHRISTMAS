import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, Sparkles, Terminal } from 'lucide-react';
import { navigationConfig, NavigationItem } from '../../config/navigationConfig.ts';
import { FestiveButton } from '../ui/FestiveButton.tsx';
import { eventConfig } from '../../config/eventConfig.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeId?: string;
  onNavigate: (item: NavigationItem) => void;
  onRegisterClick: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeId = 'nav-home',
  onNavigate,
  onRegisterClick,
}) => {
  const [expandedDropdowns, setExpandedDropdowns] = useState<Record<string, boolean>>({
    'nav-hackathon': true, // Keep open by default for discoverability
  });
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll locking
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      // Focus close button when drawer opens
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalStyle;
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleDropdown = (id: string) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleItemSelect = (item: NavigationItem) => {
    onClose();
    onNavigate(item);
  };

  const handleRegister = () => {
    onClose();
    onRegisterClick();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Dimmed backdrop */}
      <div
        className="mobile-nav-overlay absolute inset-0 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        ref={drawerRef}
        className={`mobile-nav-panel absolute top-0 right-0 bottom-0 w-[85%] max-w-sm flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-300 ${
          prefersReducedMotion ? '' : 'animate-slide-left'
        }`}
      >
        {/* Header bar inside drawer */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#E9C578]/25">
            <div className="flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="Festive Tree">
                🎄
              </span>
              <span className="font-festive text-2xl font-bold text-[#FFF4DF]">
                Festive Christmas
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close mobile menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9C578]/30 bg-[#09271E] text-[#FFF4DF] hover:bg-[#123D2B] hover:text-[#E9C578] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Navigation Links">
            {navigationConfig.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedDropdowns[item.id];
              const isCurrent = activeId === item.id;

              if (hasChildren) {
                return (
                  <div key={item.id} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.id)}
                      aria-expanded={isExpanded}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-semibold text-[#FFF4DF] hover:bg-[#123D2B]/80 hover:text-[#E9C578] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#E9C578] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Submenu */}
                    {isExpanded && (
                      <div className="ml-4 pl-3 border-l border-[#E9C578]/30 flex flex-col gap-1 my-1">
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => handleItemSelect(child)}
                            className="flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm font-medium text-[#D9ECF5] hover:text-[#FFD700] hover:bg-[#123D2B]/60 transition-colors"
                          >
                            <span>{child.label}</span>
                            {child.phaseRequirement && (
                              <span className="text-[10px] text-[#E9C578]/70 font-mono">
                                {child.phaseRequirement.split(':')[0]}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemSelect(item)}
                  className={`flex items-center justify-between text-left px-3.5 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isCurrent
                      ? 'bg-[#123D2B] text-[#FFD700]'
                      : 'text-[#FFF4DF] hover:bg-[#123D2B]/80 hover:text-[#E9C578]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isCurrent && <span className="text-xs text-[#E9C578]">✦</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-6 border-t border-[#E9C578]/25 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 text-xs text-[#E9C578]">
            <div className="flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5" />
              <span>{eventConfig.badgeText}</span>
            </div>
            <span>{eventConfig.eventDate.split('–')[0]}</span>
          </div>

          <Link
            to="/register"
            onClick={onClose}
            className="w-full block"
            aria-label="Register Now for Festive Christmas 2026"
          >
            <FestiveButton
              variant="primary"
              size="lg"
              leftIcon={<Sparkles className="h-4 w-4" />}
              className="w-full shadow-lg cursor-pointer"
            >
              Register Now
            </FestiveButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
