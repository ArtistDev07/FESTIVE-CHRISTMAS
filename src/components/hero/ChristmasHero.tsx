import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Compass, Sparkles } from 'lucide-react';
import { WinterLandscape } from './WinterLandscape.tsx';
import { HeroAmbientWindParticles } from './HeroAmbientWindParticles.tsx';
import { eventConfig } from '../../config/eventConfig.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface ChristmasHeroProps {
  onReplayIntro?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

// Target: 25 December 2026, 08:00:00 AM IST (UTC+5:30)
const COUNTDOWN_TARGET = new Date('2026-12-25T08:00:00+05:30').getTime();

const calculateTimeLeft = (): TimeLeft => {
  const diff = COUNTDOWN_TARGET - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: false };
};

export const ChristmasHero: React.FC<ChristmasHeroProps> = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Real-time animated countdown clock logic
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    const targetElement =
      document.querySelector(eventConfig.secondaryTargetAnchor) ||
      document.querySelector('#overview') ||
      document.querySelector('#about');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 1. Reveal sky and background atmosphere
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: 'power2.inOut' }
      )
        // 2 & 3. Side Christmas trees stagger entrance
        .fromTo(
          '.hero-tree-left',
          { x: -50, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          '.hero-tree-right',
          { x: 50, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=1.0'
        )
        // 4. Main H1 headline ("Festive Christmas")
        .fromTo(
          headlineRef.current,
          { y: 35, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: 'power3.out' },
          '-=0.7'
        )
        // 5. Supporting text & tagline
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          '-=0.6'
        )
        // 6. Countdown Clock & Explore Button
        .fromTo(
          actionsRef.current,
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.5'
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <main
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8"
      role="main"
      aria-labelledby="hero-main-title"
    >
      {/* Visual Layer: SVG Winter Landscape with Decorated Christmas Trees */}
      <WinterLandscape />

      {/* Ambient Diagonal Wind Flow Particles */}
      <HeroAmbientWindParticles />

      {/* Central Content Container */}
      <div className="relative z-30 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Primary H1 Headline: "Festive Christmas" */}
        <h1
          id="hero-main-title"
          ref={headlineRef}
          className="font-festive text-5xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-7xl md:text-8xl lg:text-9xl text-shadow-festive"
        >
          <span className="bg-gradient-to-b from-[#FFFFFF] via-[#FFF8E7] to-[#E9C578] bg-clip-text text-transparent">
            {eventConfig.eventTitle}
          </span>
        </h1>

        {/* Supporting Text & Hackathon Mission */}
        <div ref={subtitleRef} className="mt-4 sm:mt-5 max-w-2xl px-2">
          <p className="font-serif-festive text-xl sm:text-2xl font-medium tracking-wide text-[#FFF4DF] text-shadow-subtle">
            {eventConfig.eventTagline}
          </p>
          <p className="mt-3 font-sans-festive text-sm sm:text-base text-[#D9ECF5]/90 leading-relaxed max-w-xl mx-auto">
            {eventConfig.eventDescription}
          </p>
        </div>

        {/* Real-Time Christmas 2026 Countdown Clock & Explore Button */}
        <div
          ref={actionsRef}
          className="mt-8 xs:mt-9 sm:mt-8 translate-y-7 xs:translate-y-9 sm:translate-y-0 md:translate-y-0 w-full flex flex-col items-center"
        >
          {/* Scaled-down Mobile-Responsive Countdown Timer Frame */}
          <div className="relative group w-full max-w-[200px] xs:max-w-[215px] sm:max-w-[380px] md:max-w-[460px] mx-auto scale-95 xs:scale-100 sm:scale-100 md:scale-100">
            {/* Subtle ambient gold glow behind countdown card */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-xl sm:rounded-3xl bg-gradient-to-r from-[#E9C578]/25 via-[#FFD700]/15 to-[#25A18E]/20 blur-md sm:blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            {/* Frosted Glass Main Card */}
            <div className="relative rounded-xl sm:rounded-3xl border border-[#E9C578]/40 bg-gradient-to-b from-[#0F3425]/90 via-[#0A261D]/90 to-[#061811]/90 p-1.5 sm:p-4 md:p-5 shadow-[0_12px_36px_rgba(4,20,15,0.85)] backdrop-blur-xl">
              {/* Eyebrow Label */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1 sm:mb-3 text-[7px] xs:text-[7.5px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#FFEA9F] font-semibold">
                <Sparkles className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3 sm:w-3 text-[#FFD700] animate-twinkle shrink-0" />
                <span className="truncate">Kickoff In • 25 Dec 2026, 8:00 AM IST</span>
              </div>

              {/* 4 Frosted-Glass Time Pills (DAYS | HOURS | MINS | SECS) */}
              <div
                className="grid grid-cols-4 gap-1 sm:gap-2.5 md:gap-3 w-full"
                role="timer"
                aria-label="Christmas 2026 Hackathon Countdown"
              >
                {/* DAYS */}
                <div className="flex flex-col items-center justify-center rounded-md xs:rounded-lg sm:rounded-2xl border border-[#E9C578]/30 bg-[#061C14]/85 px-1 py-1 sm:px-3 sm:py-2.5 shadow-inner transition-transform duration-300 hover:scale-105 hover:border-[#E9C578]/70">
                  <span className="font-mono text-xs xs:text-sm sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#FFF4DF] to-[#E9C578] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(233,197,120,0.4)] leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[6px] xs:text-[7px] sm:text-[10px] md:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#E9C578]/80 font-bold mt-0.5 sm:mt-1">
                    Days
                  </span>
                </div>

                {/* HOURS */}
                <div className="flex flex-col items-center justify-center rounded-md xs:rounded-lg sm:rounded-2xl border border-[#E9C578]/30 bg-[#061C14]/85 px-1 py-1 sm:px-3 sm:py-2.5 shadow-inner transition-transform duration-300 hover:scale-105 hover:border-[#E9C578]/70">
                  <span className="font-mono text-xs xs:text-sm sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#FFF4DF] to-[#E9C578] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(233,197,120,0.4)] leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[6px] xs:text-[7px] sm:text-[10px] md:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#E9C578]/80 font-bold mt-0.5 sm:mt-1">
                    Hours
                  </span>
                </div>

                {/* MINS */}
                <div className="flex flex-col items-center justify-center rounded-md xs:rounded-lg sm:rounded-2xl border border-[#E9C578]/30 bg-[#061C14]/85 px-1 py-1 sm:px-3 sm:py-2.5 shadow-inner transition-transform duration-300 hover:scale-105 hover:border-[#E9C578]/70">
                  <span className="font-mono text-xs xs:text-sm sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#FFF4DF] to-[#E9C578] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(233,197,120,0.4)] leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[6px] xs:text-[7px] sm:text-[10px] md:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#E9C578]/80 font-bold mt-0.5 sm:mt-1">
                    Mins
                  </span>
                </div>

                {/* SECS */}
                <div className="flex flex-col items-center justify-center rounded-md xs:rounded-lg sm:rounded-2xl border border-[#E9C578]/30 bg-[#061C14]/85 px-1 py-1 sm:px-3 sm:py-2.5 shadow-inner transition-transform duration-300 hover:scale-105 hover:border-[#E9C578]/70">
                  <span className="font-mono text-xs xs:text-sm sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#FFF4DF] to-[#E9C578] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(233,197,120,0.4)] leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[6px] xs:text-[7px] sm:text-[10px] md:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#E9C578]/80 font-bold mt-0.5 sm:mt-1">
                    Secs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scaled-down Mobile-Responsive Button: "Explore the Event" */}
          <div className="mt-2.5 xs:mt-3 sm:mt-5 flex justify-center w-full">
            <button
              onClick={handleExploreClick}
              className="festive-btn-secondary group flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 rounded-full px-2.5 py-1 xs:px-3 xs:py-1 sm:px-6 sm:py-2.5 md:px-7 md:py-3 text-[9.5px] xs:text-[10.5px] sm:text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09271E] shadow-lg cursor-pointer max-w-[125px] xs:max-w-[140px] sm:max-w-none"
              aria-label="Explore the Event: Discover schedule, tracks, and prizes"
            >
              <Compass className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-4 sm:w-4 text-[#E9C578] transition-transform group-hover:rotate-45 shrink-0" />
              <span className="whitespace-nowrap">Explore the Event</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
