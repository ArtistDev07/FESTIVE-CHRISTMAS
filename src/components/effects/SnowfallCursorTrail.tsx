import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  rotation: number;
  spinSpeed: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  type: 'snowflake' | 'sparkle' | 'grain';
  color: string;
}

const SPARKLE_PALETTE = [
  '#FFFFFF', // Crisp Snow White
  '#FFF8E7', // Soft Champagne
  '#FFEA9F', // Delicate Starlight Gold
  '#E0F7FA', // Icy Frost Cyan
  '#D9ECF5', // Soft Winter Blue
];

export const SnowfallCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Skip on touch-only devices to prevent unnecessary overhead and gesture issues
    const isTouchOnly =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches;

    if (isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: TrailParticle[] = [];
    const MAX_PARTICLES = 40;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastX = -999;
    let lastY = -999;
    let lastTime = 0;

    const spawnSparkle = (x: number, y: number, count: number = 1) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) {
          particles.shift();
        }

        // Tiny randomized offset around the pointer tip
        const rad = Math.random() * Math.PI * 2;
        const dist = Math.random() * 6 + 1;
        const px = x + Math.cos(rad) * dist;
        const py = y + Math.sin(rad) * dist;

        const rand = Math.random();
        const type: 'snowflake' | 'sparkle' | 'grain' =
          rand < 0.45 ? 'snowflake' : rand < 0.8 ? 'sparkle' : 'grain';

        // Delicate micro sizes (2.5px to 5.5px)
        const size =
          type === 'snowflake'
            ? Math.random() * 2.0 + 3.2
            : type === 'sparkle'
            ? Math.random() * 1.8 + 2.5
            : Math.random() * 1.2 + 1.2;

        // Ephemeral lifetime (~30 to 50 frames, ~500ms - 800ms)
        const maxLife = Math.floor(Math.random() * 20 + 30);

        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.45 + 0.25, // Gentle snowfall gravity
          size,
          maxLife,
          life: maxLife,
          rotation: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.04,
          swaySpeed: Math.random() * 0.08 + 0.04,
          swayAmp: Math.random() * 0.4 + 0.15,
          swayOffset: Math.random() * Math.PI * 2,
          type,
          color: SPARKLE_PALETTE[Math.floor(Math.random() * SPARKLE_PALETTE.length)],
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      const curX = e.clientX;
      const curY = e.clientY;
      const now = performance.now();

      const dist = Math.hypot(curX - lastX, curY - lastY);

      // Only spawn when mouse is actually moving smoothly
      if (dist >= 3 || now - lastTime > 45) {
        const count = dist > 25 ? 2 : 1;
        spawnSparkle(curX, curY, count);

        lastX = curX;
        lastY = curY;
        lastTime = now;
      }
    };

    const handlePointerLeave = () => {
      lastX = -999;
      lastY = -999;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    // Drawing functions
    const drawSnowflake = (
      p: TrailParticle,
      ctx: CanvasRenderingContext2D,
      alpha: number
    ) => {
      const { x, y, size, rotation, color } = p;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = Math.max(0.65, size * 0.16);
      ctx.lineCap = 'round';

      // 6-pointed crystalline snowflake arms
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        // Subtle side branching
        if (size >= 3.5) {
          const bLen = size * 0.32;
          const bPos = size * 0.62;
          ctx.beginPath();
          ctx.moveTo(bPos, 0);
          ctx.lineTo(bPos + bLen * 0.6, bLen);
          ctx.moveTo(bPos, 0);
          ctx.lineTo(bPos + bLen * 0.6, -bLen);
          ctx.moveTo(-bPos, 0);
          ctx.lineTo(-bPos - bLen * 0.6, bLen);
          ctx.moveTo(-bPos, 0);
          ctx.lineTo(-bPos - bLen * 0.6, -bLen);
          ctx.stroke();
        }

        ctx.rotate(Math.PI / 3);
      }

      // Center glowing core
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.5, size * 0.18), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (
      p: TrailParticle,
      ctx: CanvasRenderingContext2D,
      alpha: number
    ) => {
      const { x, y, size, rotation, color } = p;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(0, size);
        ctx.quadraticCurveTo(0, 0, size * 0.22, 0);
        ctx.rotate(Math.PI / 2);
      }
      ctx.closePath();
      ctx.fill();

      // Soft center halo
      ctx.globalAlpha = alpha * 0.45;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGrain = (
      p: TrailParticle,
      ctx: CanvasRenderingContext2D,
      alpha: number
    ) => {
      const { x, y, size, color } = p;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let frame = 0;
    const render = () => {
      frame++;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife; // 1 -> 0
        // Smooth fade out with soft peak
        const alpha = Math.min(1, Math.pow(progress, 1.35) * 0.85);

        // Gentle drift and subtle breeze sway
        p.rotation += p.spinSpeed;
        const sway = Math.sin(frame * p.swaySpeed + p.swayOffset) * p.swayAmp;
        p.x += p.vx + sway;
        p.y += p.vy;

        if (p.type === 'snowflake') {
          drawSnowflake(p, ctx, alpha);
        } else if (p.type === 'sparkle') {
          drawSparkle(p, ctx, alpha);
        } else {
          drawGrain(p, ctx, alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full select-none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
};
