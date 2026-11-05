import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swayAmp: number;
  swaySpeed: number;
  swayPhase: number;
  opacity: number;
  baseOpacity: number;
  twinkleRate: number;
  twinklePhase: number;
  color: string;
  isCrystal: boolean;
}

const SNOW_COLORS = [
  '#FFFFFF', // Pure Crisp White (majority)
  '#FFFFFF',
  '#FFFFFF',
  '#F0F9FF', // Ice Frost White
  '#E0F2FE', // Soft Winter Frost
  '#FFF7ED', // Warm Festive White
  '#FFEAA7', // Delicate Golden Stardust (occasional)
];

export const GlobalSnowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Track mouse interaction for subtle wind deflection
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      lastMove: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.lastMove = performance.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
        mouse.lastMove = performance.now();
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Calculate flake count based on screen dimensions and accessibility
    const getFlakeCount = () => {
      if (prefersReducedMotion) return 20;
      if (width < 640) return 40; // Mobile
      if (width < 1024) return 65; // Tablet
      return 95; // Desktop
    };

    const createSnowflake = (initialRandomY = true): Snowflake => {
      const isLarge = Math.random() < 0.12;
      const isCrystal = isLarge && Math.random() < 0.6;

      const radius = isLarge
        ? Math.random() * 1.5 + 2.0 // 2.0px - 3.5px
        : Math.random() * 1.4 + 0.8; // 0.8px - 2.2px

      // Deeper/smaller particles fall slightly slower for depth parallax
      const speedY = prefersReducedMotion
        ? 0.2 + radius * 0.1
        : Math.random() * 0.5 + 0.35 + radius * 0.22;

      const baseOpacity = isLarge
        ? Math.random() * 0.25 + 0.5
        : Math.random() * 0.35 + 0.3;

      const color = SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)];

      return {
        x: Math.random() * width,
        y: initialRandomY ? Math.random() * height : -15,
        radius,
        speedY,
        speedX: (Math.random() - 0.5) * 0.35,
        swayAmp: Math.random() * 1.5 + 0.6,
        swaySpeed: Math.random() * 0.02 + 0.012,
        swayPhase: Math.random() * Math.PI * 2,
        opacity: baseOpacity,
        baseOpacity,
        twinkleRate: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color,
        isCrystal,
      };
    };

    let flakes: Snowflake[] = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const targetCount = getFlakeCount();
      flakes = Array.from({ length: targetCount }, () => createSnowflake(true));
    };

    handleResize();

    // Helper: draw delicate 6-pointed crystalline snowflake
    const drawCrystalFlake = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      alpha: number,
      color: string
    ) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.strokeStyle = color;
      c.lineWidth = 0.8;
      c.lineCap = 'round';

      for (let i = 0; i < 3; i++) {
        c.rotate(Math.PI / 3);
        c.beginPath();
        c.moveTo(-r, 0);
        c.lineTo(r, 0);
        c.stroke();

        // Small decorative barbules on crystal arms
        if (r > 2.2) {
          const barb = r * 0.38;
          const pos = r * 0.6;
          c.beginPath();
          c.moveTo(pos - barb, -barb * 0.6);
          c.lineTo(pos, 0);
          c.lineTo(pos - barb, barb * 0.6);
          c.moveTo(-pos + barb, -barb * 0.6);
          c.lineTo(-pos, 0);
          c.lineTo(-pos + barb, barb * 0.6);
          c.stroke();
        }
      }
      c.restore();
    };

    // Helper: draw soft rounded snowflake with gentle ambient diffusion
    const drawSoftFlake = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      alpha: number,
      color: string
    ) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;

      // Soft glow for larger snowflakes
      if (r > 2.0) {
        c.shadowBlur = 4;
        c.shadowColor = color;
      }

      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaMs = Math.min(currentTime - lastTime, 64);
      lastTime = currentTime;
      const timeScale = deltaMs / 16.666;

      ctx.clearRect(0, 0, width, height);

      // Check if mouse breeze is active (fades over 2s of inactivity)
      const isMouseActive =
        mouse.active &&
        performance.now() - mouse.lastMove < 2000 &&
        !prefersReducedMotion;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        // Horizontal sinusoidal sway
        f.swayPhase += f.swaySpeed * timeScale;
        const swayX = Math.sin(f.swayPhase) * f.swayAmp;

        f.x += (f.speedX + swayX) * timeScale;
        f.y += f.speedY * timeScale;

        // Interactive mouse breeze deflection
        if (isMouseActive) {
          const dx = f.x - mouse.x;
          const dy = f.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 110;

          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 1.6;
            f.x += (dx / dist) * force * timeScale;
            f.y += (dy / dist) * force * 0.7 * timeScale;
          }
        }

        // Wrap around screen boundaries seamlessly
        if (f.y > height + 15) {
          f.y = -15;
          f.x = Math.random() * width;
        }
        if (f.x < -15) f.x = width + 15;
        if (f.x > width + 15) f.x = -15;

        // Delicate shimmer/twinkle
        f.twinklePhase += f.twinkleRate * timeScale;
        const twinkle = 0.8 + 0.2 * Math.sin(f.twinklePhase);
        const currentAlpha = Math.max(0.12, Math.min(0.9, f.baseOpacity * twinkle));

        if (f.isCrystal && !prefersReducedMotion) {
          drawCrystalFlake(ctx, f.x, f.y, f.radius, currentAlpha, f.color);
        } else {
          drawSoftFlake(ctx, f.x, f.y, f.radius, currentAlpha, f.color);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full overflow-hidden no-print"
      aria-hidden="true"
    />
  );
};
