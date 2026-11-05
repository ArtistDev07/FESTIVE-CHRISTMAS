import { useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion.ts';
import { footerConfig } from '../config/footerConfig.ts';

interface UseBackToTopOptions {
  threshold?: number;
  targetAnchor?: string;
}

export function useBackToTop(options: UseBackToTopOptions = {}) {
  const {
    threshold = footerConfig.backToTopThreshold,
    targetAnchor = footerConfig.backToTopTarget,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(currentScrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    const targetEl = targetAnchor ? document.querySelector(targetAnchor) : null;

    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [targetAnchor, prefersReducedMotion]);

  return {
    isVisible,
    scrollToTop,
  };
}
