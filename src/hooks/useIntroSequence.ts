import { useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion.ts';

const SESSION_STORAGE_KEY = 'festive_christmas_intro_completed';

export interface UseIntroSequenceReturn {
  isIntroActive: boolean;
  isIntroExiting: boolean;
  completeIntro: () => void;
  replayIntro: () => void;
}

export function useIntroSequence(): UseIntroSequenceReturn {
  const prefersReducedMotion = useReducedMotion();

  // If user requested reduced motion or previously completed intro this session, default to false
  const [isIntroActive, setIsIntroActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (prefersReducedMotion) return false;
    try {
      const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return alreadySeen !== 'true';
    } catch {
      return true;
    }
  });

  const [isIntroExiting, setIsIntroExiting] = useState<boolean>(false);

  // If reduced motion is activated later, immediately complete
  useEffect(() => {
    if (prefersReducedMotion && isIntroActive) {
      setIsIntroActive(false);
      setIsIntroExiting(false);
    }
  }, [prefersReducedMotion, isIntroActive]);

  const completeIntro = useCallback(() => {
    setIsIntroExiting(true);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // Ignore sessionStorage errors (e.g. private mode quota)
    }

    // Smooth exit duration
    const timer = setTimeout(() => {
      setIsIntroActive(false);
      setIsIntroExiting(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const replayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setIsIntroExiting(false);
    setIsIntroActive(true);
  }, []);

  // Keyboard shortcut: Escape completes/skips the intro immediately
  useEffect(() => {
    if (!isIntroActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroActive, completeIntro]);

  return {
    isIntroActive,
    isIntroExiting,
    completeIntro,
    replayIntro,
  };
}
