import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';
import { IntroScene } from './IntroScene.tsx';
import { WinterParticleField } from '../effects/WinterParticleField.tsx';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface ChristmasIntroProps {
  onComplete: () => void;
  isExiting: boolean;
}

export const ChristmasIntro: React.FC<ChristmasIntroProps> = ({ onComplete, isExiting }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const welcomeTextRef = useRef<HTMLDivElement | null>(null);
  const identityBlockRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested, instantly bypass
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          // Seamless handoff to hero
          onComplete();
        },
      });

      // Stage 1: Winter awakens (0ms - 600ms)
      tl.fromTo(
        '.intro-moon',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'sine.out' }
      )
        .fromTo(
          '.intro-forest',
          { opacity: 0, y: 30 },
          { opacity: 0.8, y: 0, duration: 1.0, ease: 'power2.out' },
          '-=0.8'
        )

        // Stage 2: Magical atmosphere & twinkling (600ms - 1200ms)
        .fromTo(
          '.intro-aurora',
          { opacity: 0, scaleY: 0.7 },
          { opacity: 1, scaleY: 1, duration: 1.2 },
          '-=0.6'
        )

        // Stage 3: Welcome message ("A Little Winter Magic…") (1000ms - 2200ms)
        .fromTo(
          welcomeTextRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.4)' },
          '-=0.3'
        )
        // Soft linger on welcome message
        .to(welcomeTextRef.current, {
          opacity: 0,
          y: -18,
          scale: 0.98,
          duration: 0.65,
          ease: 'power2.in',
          delay: 0.8,
        })

        // Stage 4: Festive identity reveal ("Festive Christmas") (2600ms - 3800ms)
        .fromTo(
          identityBlockRef.current,
          { opacity: 0, y: 32, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.5)' }
        )
        .fromTo(
          '.intro-sparkle-crest',
          { scale: 0, rotation: -45, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' },
          '-=0.8'
        )
        .fromTo(
          '.intro-tagline',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )

        // Stage 5: Final pause and seamless transition handoff (3800ms - 4400ms)
        .to(identityBlockRef.current, {
          scale: 1.03,
          duration: 0.6,
          ease: 'sine.inOut',
          delay: 0.6,
        })
        .to(containerRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.7,
          ease: 'power2.inOut',
        });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Festive Christmas Opening Introduction"
    >
      {/* Background artwork and ambient snowfall */}
      <IntroScene />
      <WinterParticleField />

      {/* Screen reader live update */}
      <div className="sr-only" aria-live="polite">
        Festive Christmas Hackathon 2026 intro loading.
      </div>

      {/* Central Storytelling Typography Container */}
      <div className="relative z-30 mx-auto max-w-2xl px-6 text-center">
        {/* Stage 3: Welcome Message */}
        <div
          ref={welcomeTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E9C578]/30 bg-[#123D2B]/70 px-4 py-1 text-xs font-medium tracking-widest text-[#E9C578]">
            <Sparkles className="h-3.5 w-3.5 text-[#E9C578] animate-twinkle" />
            <span>WINTER SOLSTICE 2026</span>
            <Sparkles className="h-3.5 w-3.5 text-[#E9C578] animate-twinkle" />
          </div>
          <h2 className="font-festive text-4xl font-bold tracking-wide text-[#FFF4DF] drop-shadow-md sm:text-6xl md:text-7xl">
            A Little Winter Magic…
          </h2>
          <p className="mt-4 font-serif-festive italic text-[#D9ECF5]/90 text-lg sm:text-xl">
            Where enchanted forests whisper stories of technological wonder.
          </p>
        </div>

        {/* Stage 4: Festive Identity Reveal */}
        <div ref={identityBlockRef} className="opacity-0">
          <div className="intro-sparkle-crest mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#E9C578]/60 bg-gradient-to-br from-[#123D2B] to-[#C62835] shadow-[0_0_30px_rgba(233,197,120,0.5)]">
            <span className="text-2xl" role="img" aria-label="Golden Star">
              ⭐
            </span>
          </div>

          <h1 className="font-festive text-5xl font-bold tracking-tight text-[#FFFFFF] sm:text-7xl md:text-8xl drop-shadow-[0_4px_16px_rgba(9,39,30,0.95)]">
            <span className="bg-gradient-to-b from-[#FFFFFF] via-[#FFF4DF] to-[#E9C578] bg-clip-text text-transparent">
              Festive Christmas
            </span>
          </h1>

          <div className="intro-tagline mt-4">
            <div className="inline-block rounded-full border border-[#E9C578]/35 bg-[#09271E]/80 px-5 py-1.5 backdrop-blur-md">
              <p className="font-serif-festive text-sm font-medium tracking-wide text-[#E9C578] sm:text-base">
                Where Christmas Magic Meets Innovation
              </p>
            </div>
            <p className="mt-2 text-xs tracking-widest uppercase text-[#D9ECF5]/75 font-sans-festive">
              ✦ Global Winter Hackathon ✦
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
