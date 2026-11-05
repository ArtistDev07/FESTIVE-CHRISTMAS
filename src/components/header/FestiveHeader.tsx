import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveButton } from '../ui/FestiveButton.tsx';
import { FestiveIconButton } from '../ui/FestiveIconButton.tsx';
import { DesktopNavigation } from './DesktopNavigation.tsx';
import { MobileNavigation } from './MobileNavigation.tsx';
import { NavigationItem } from '../../config/navigationConfig.ts';
import { eventConfig } from '../../config/eventConfig.ts';
import { useHeaderScroll } from '../../hooks/useHeaderScroll.ts';

interface FestiveHeaderProps {
  activeSectionId?: string;
}

export const FestiveHeader: React.FC<FestiveHeaderProps> = ({
  activeSectionId = 'nav-home',
}) => {
  const navigate = useNavigate();
  const { isScrolled } = useHeaderScroll({ threshold: 40 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleNavigate = (item: NavigationItem) => {
    if (item.href === '/register' || item.href === '#register') {
      navigate('/register');
      return;
    }

    // If the destination element exists in DOM (e.g., #home), scroll smoothly to it
    const targetEl = document.querySelector(item.href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // If destination is in an upcoming phase, display graceful informative notification
    if (item.phaseRequirement) {
      showNotification(`${item.label} unlocks in ${item.phaseRequirement}!`);
    } else {
      showNotification(`${item.label} will be available in the upcoming phase.`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const homeEl = document.querySelector('#home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#071F18]/92 backdrop-blur-md py-2.5 sm:py-3 border-b border-[#E9C578]/25 shadow-[0_4px_30px_rgba(4,20,15,0.6)]'
            : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
        }`}
        role="banner"
      >
        <FestiveContainer size="xl" className="flex items-center justify-between">
          {/* Left: Brand Identity Slot */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={handleBrandClick}
              className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] rounded-lg p-1"
              aria-label="Festive Christmas Home"
            >
              {/* Distinctive Logo Emblem: Golden starburst + Evergreen Tree */}
              <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#E9C578]/50 bg-gradient-to-br from-[#123D2B] to-[#0A261D] shadow-[0_0_16px_rgba(233,197,120,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#E9C578]">
                <span className="text-xl sm:text-2xl" role="img" aria-label="Christmas Tree">
                  🎄
                </span>
                <span
                  className="absolute -top-1 -right-1 text-[10px] text-[#FFD700] animate-twinkle"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>

              {/* Typographic Wordmark */}
              <div className="flex flex-col text-left">
                <span className="font-festive text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFFFF] group-hover:text-[#FFF4DF] transition-colors leading-none">
                  Festive Christmas
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E9C578] font-sans-festive mt-0.5 leading-none">
                  Hackathon '26
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation Links & Dropdown */}
          <DesktopNavigation
            activeId={activeSectionId}
            onNavigate={handleNavigate}
            className="mx-4"
          />

          {/* Right: Registration CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <Link to="/register" aria-label="Register Now for Festive Christmas 2026">
                <FestiveButton
                  variant="primary"
                  size="md"
                  leftIcon={<Sparkles className="h-4 w-4 animate-twinkle text-[#FFF4DF]" />}
                  className="shadow-md cursor-pointer"
                >
                  Register Now
                </FestiveButton>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <div className="lg:hidden">
              <FestiveIconButton
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                variant="frosted"
                size="md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={isMobileMenuOpen ? 'hamburger-open' : ''}
                icon={
                  <div className="flex flex-col justify-center items-center gap-1 w-5 h-5">
                    <span className="hamburger-bar" />
                    <span className="hamburger-bar" />
                    <span className="hamburger-bar" />
                  </div>
                }
              />
            </div>
          </div>
        </FestiveContainer>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeId={activeSectionId}
        onNavigate={handleNavigate}
        onRegisterClick={handleRegisterClick}
      />

      {/* Accessible Floating Notification Toast for Phase 1 / Phase 2 Interactivity */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-[#E9C578]/50 bg-[#072218]/95 px-5 py-3 text-sm font-medium text-[#FFF4DF] shadow-[0_12px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl animate-fade-in"
        >
          <CheckCircle2 className="h-5 w-5 text-[#E9C578] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
