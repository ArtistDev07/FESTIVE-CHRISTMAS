import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface WindParticle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  size: number;
  length: number; // For elongated light-rain streaks
  opacity: number;
  baseOpacity: number;
  rotation: number;
  spinSpeed: number;
  type: 'glow-dot' | 'snowflake' | 'streak';
  color: string;
  glowColor: string;
  layer: 'far' | 'mid' | 'near';
}

const ICY_COLORS = [
  { main: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.45)' }, // Soft White
  { main: '#E0F7FA', glow: 'rgba(224, 247, 250, 0.45)' }, // Icy Frost Light Blue
  { main: '#D9ECF5', glow: 'rgba(217, 236, 245, 0.4)' },  // Winter Cyan
  { main: '#AEE2FF', glow: 'rgba(174, 226, 255, 0.35)' }, // Glacial Light Blue
  { main: '#FFF9E6', glow: 'rgba(255, 249, 230, 0.3)' },  // Subtle Warm Snow White
];

export const HeroAmbientWindParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Particle pool: approx 75-90 particles for a graceful, high-depth atmosphere
    const PARTICLE_COUNT = 85;
    const particles: WindParticle[] = [];

    const createParticle = (initialRandomY: boolean = false): WindParticle => {
      // 3 Depth layers for visual depth: far (slow, small), mid (balanced), near (faster, crisper)
      const randLayer = Math.random();
      const layer: 'far' | 'mid' | 'near' =
        randLayer < 0.45 ? 'far' : randLayer < 0.8 ? 'mid' : 'near';

      // Type distribution: 50% soft glowing dots, 25% delicate snowflakes, 25% elongated light rain streaks
      const randType = Math.random();
      const type: 'glow-dot' | 'snowflake' | 'streak' =
        randType < 0.48 ? 'glow-dot' : randType < 0.74 ? 'snowflake' : 'streak';

      const colorObj = ICY_COLORS[Math.floor(Math.random() * ICY_COLORS.length)];

      // Layer-based scale, speed, and opacity
      let speedMultiplier = 1;
      let size = 2;
      let length = 12;
      let baseOpacity = 0.45;

      if (layer === 'far') {
        speedMultiplier = 0.55 + Math.random() * 0.25;
        size = Math.random() * 1.2 + 1.2;
        length = Math.random() * 6 + 8;
        baseOpacity = Math.random() * 0.2 + 0.15; // very faint
      } else if (layer === 'mid') {
        speedMultiplier = 0.85 + Math.random() * 0.35;
        size = Math.random() * 1.8 + 2.0;
        length = Math.random() * 8 + 14;
        baseOpacity = Math.random() * 0.25 + 0.35;
      } else {
        speedMultiplier = 1.25 + Math.random() * 0.45;
        size = Math.random() * 2.2 + 3.0;
        length = Math.random() * 10 + 20;
        baseOpacity = Math.random() * 0.25 + 0.55;
      }

      // Continuous Wind Flow Physics:
      // Particles drift diagonally across the screen (top-left towards bottom-right at ~25°–35° angle)
      const baseAngle = 0.52 + (Math.random() - 0.5) * 0.12; // ~30 degrees in radians
      const speed = (2.2 + Math.random() * 1.8) * speedMultiplier;
      const baseVx = Math.cos(baseAngle) * speed;
      const baseVy = Math.sin(baseAngle) * speed;

      // Spawn coordinates: if initial, distribute all over screen; else spawn from top or left edge
      let x = 0;
      let y = 0;

      if (initialRandomY) {
        x = Math.random() * width;
        y = Math.random() * height;
      } else {
        // Spawn either above top edge or to the left of left edge
        if (Math.random() < 0.65) {
          x = Math.random() * (width + 100) - 50;
          y = -20 - Math.random() * 30;
        } else {
          x = -20 - Math.random() * 30;
          y = Math.random() * (height * 0.7);
        }
      }

      return {
        x,
        y,
        baseVx,
        baseVy,
        swaySpeed: Math.random() * 0.03 + 0.015,
        swayAmp: Math.random() * 0.6 + 0.2,
        swayOffset: Math.random() * Math.PI * 2,
        size,
        length,
        opacity: baseOpacity,
        baseOpacity,
        rotation: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.03,
        type,
        color: colorObj.main,
        glowColor: colorObj.glow,
        layer,
      };
    };

    // Initialize all particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(true));
    }

    // Drawing helpers
    const drawGlowDot = (p: WindParticle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;

      // Subtle soft outer glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
      gradient.addColorStop(0, p.glowColor);
      gradient.addColorStop(0.5, p.glowColor.replace(/[\d.]+\)$/, '0.15)'));
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Sharp glowing center core
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawSnowflake = (p: WindParticle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.lineWidth = Math.max(0.65, p.size * 0.18);
      ctx.lineCap = 'round';

      const armLength = p.size * 1.3;

      // 6-pointed crystalline snowflake arms
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-armLength, 0);
        ctx.lineTo(armLength, 0);
        ctx.stroke();

        // Subtle side branching on mid and near flakes
        if (p.size >= 2.5) {
          const bLen = armLength * 0.35;
          const bPos = armLength * 0.6;
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

      // Delicate center crystal
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.5, p.size * 0.22), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawLightRainStreak = (p: WindParticle) => {
      // Wind trajectory angle
      const angle = Math.atan2(p.baseVy, p.baseVx);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(angle);
      // Light rain streaks are kept very subtle and faint
      ctx.globalAlpha = p.opacity * 0.65;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.layer === 'near' ? 1.2 : p.layer === 'mid' ? 0.9 : 0.65;
      ctx.lineCap = 'round';

      // Soft linear gradient for the elongated streak
      const grad = ctx.createLinearGradient(-p.length, 0, 0, 0);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.4, p.glowColor);
      grad.addColorStop(1, p.color);
      ctx.strokeStyle = grad;

      ctx.beginPath();
      ctx.moveTo(-p.length, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      ctx.restore();
    };

    // Main animation loop
    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Diagonal wind physics with sinusoidal organic breeze sway
        const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmp;
        p.x += p.baseVx + sway;
        p.y += p.baseVy;
        p.rotation += p.spinSpeed;

        // Subtle shimmer in opacity
        p.opacity = p.baseOpacity * (0.85 + Math.sin(time * 2 + p.swayOffset) * 0.15);

        // Render particle
        if (p.type === 'glow-dot') {
          drawGlowDot(p);
        } else if (p.type === 'snowflake') {
          drawSnowflake(p);
        } else {
          drawLightRainStreak(p);
        }

        // Screen boundary wrapping: reset when drifting beyond screen
        const buffer = 40;
        if (p.y > height + buffer || p.x > width + buffer) {
          const fresh = createParticle(false);
          particles[i] = fresh;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full pointer-events-none"
        tabIndex={-1}
      />
    </div>
  );
};
