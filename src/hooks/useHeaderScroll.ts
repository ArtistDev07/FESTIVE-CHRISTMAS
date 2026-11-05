import { useState, useEffect } from 'react';

interface UseHeaderScrollOptions {
  threshold?: number;
}

export interface UseHeaderScrollReturn {
  isScrolled: boolean;
  scrollY: number;
}

/**
 * useHeaderScroll
 * Performance-conscious hook to observe vertical scroll position with RAF throttling.
 */
export function useHeaderScroll({ threshold = 40 }: UseHeaderScrollOptions = {}): UseHeaderScrollReturn {
  const [isScrolled, setIsScrolled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.scrollY > threshold;
  });
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY(currentY);
          setIsScrolled(currentY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled, scrollY };
}
