import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayOffset: number;
  swayDistance: number;
  opacity: number;
  baseOpacity: number;
  type: 'snow' | 'ice' | 'gold' | 'festive';
  twinkleSpeed: number;
  twinklePhase: number;
}

interface SparkleTrail {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface WinterParticleFieldProps {
  className?: string;
  isHeroMode?: boolean;
}

export const WinterParticleField: React.FC<WinterParticleFieldProps> = ({
  className = '',
  isHeroMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef<{ x: number; y: number; active: boolean; prevX: number; prevY: number }>({
    x: -999,
    y: -999,
    active: false,
    prevX: -999,
    prevY: -999,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle cap based on viewport
    const getParticleCount = () => {
      if (prefersReducedMotion) return 15;
      if (width < 640) return 22; // Mobile
      if (width < 1024) return 38; // Tablet
      return 68; // Desktop
    };

    const isTouchDevice =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);

    // Color definitions
    const colors = {
      snow: '#FFFFFF',
      ice: '#D9ECF5',
      gold: '#E9C578',
      festive: '#EF4050',
    };

    const createParticle = (): Particle => {
      // Probability distribution for particle types:
      // ~75% pure snow, ~15% icy-blue, ~7% warm gold, ~3% festive red/gold star
      const rand = Math.random();
      let type: Particle['type'] = 'snow';
      if (rand > 0.97) type = 'festive';
      else if (rand > 0.90) type = 'gold';
      else if (rand > 0.75) type = 'ice';

      const radius =
        type === 'festive'
          ? Math.random() * 2.2 + 1.2
          : type === 'gold'
          ? Math.random() * 2.0 + 1.0
          : Math.random() * 2.4 + 0.8;

      const baseSpeed = prefersReducedMotion ? 0.2 : isHeroMode ? 0.7 : 0.55;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        speedY: (Math.random() * 0.9 + 0.4) * baseSpeed,
        speedX: (Math.random() * 0.4 - 0.2) * baseSpeed,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        swayDistance: Math.random() * 2.2 + 0.8,
        opacity: Math.random() * 0.6 + 0.35,
        baseOpacity: Math.random() * 0.6 + 0.35,
        type,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    };

    let particles: Particle[] = Array.from({ length: getParticleCount() }, createParticle);
    const sparkles: SparkleTrail[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = getParticleCount();
      if (particles.length !== count) {
        particles = Array.from({ length: count }, createParticle);
      }
    };

    // Throttle pointer events
    let lastPointerUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const now = performance.now();
      if (now - lastPointerUpdate < 16) return; // ~60fps cap
      lastPointerUpdate = now;

      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Spawn occasional magical sparkle trail
      if (Math.random() > 0.45 && sparkles.length < 25) {
        const sparkleColors = ['#E9C578', '#FFF4DF', '#FFFFFF', '#D9ECF5'];
        sparkles.push({
          x: e.clientX + (Math.random() * 20 - 10),
          y: e.clientY + (Math.random() * 20 - 10),
          radius: Math.random() * 2.2 + 1,
          opacity: 0.85,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
          life: 0,
          maxLife: Math.floor(Math.random() * 25 + 20),
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Pause when tab is inactive to preserve CPU / battery
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Render Loop
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 16.667, 2.5); // normalized frame step
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Render & update sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.life += delta;
        const progress = sp.life / sp.maxLife;

        if (progress >= 1) {
          sparkles.splice(i, 1);
          continue;
        }

        const alpha = (1 - progress) * sp.opacity;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = sp.color;

        // Draw 4-point star for sparkles
        const size = sp.radius * (1 - progress * 0.4);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render & update snowfall
      const mouse = mouseRef.current;
      const mouseActive = mouse.active && !isTouchDevice && !prefersReducedMotion;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.swayOffset += p.swaySpeed * delta;
        p.twinklePhase += p.twinkleSpeed * delta;

        const lateralSway = Math.sin(p.swayOffset) * p.swayDistance;
        p.x += (p.speedX + lateralSway * 0.3) * delta;
        p.y += p.speedY * delta;

        // Interactive cursor repulsion / gentle breeze
        if (mouseActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const threshold = 110;

          if (distSq < threshold * threshold && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / threshold) * 1.8;
            p.x += (dx / dist) * force * delta;
            p.y += (dy / dist) * force * delta;
          }
        }

        // Boundary wrap
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle calculation
        const twinkleFactor =
          p.type === 'snow'
            ? 1
            : 0.7 + 0.3 * Math.sin(p.twinklePhase);
        const currentOpacity = Math.max(0.15, Math.min(1, p.baseOpacity * twinkleFactor));

        // Draw particle
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = colors[p.type];

        if (p.type === 'gold' || p.type === 'festive') {
          ctx.shadowBlur = 6;
          ctx.shadowColor = colors[p.type];
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion, isHeroMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
};
