import React, { useState } from 'react';
import {
  Coffee,
  Sparkles,
  Laptop,
  UtensilsCrossed,
  Rocket,
  Presentation,
  Trophy,
  Clock,
  MapPin,
  ChevronRight,
  Info,
  Calendar,
  Zap,
} from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export interface TimelineNodeItem {
  id: string;
  stepNumber: string;
  timeRange: string;
  duration: string;
  title: string;
  subtitle: string;
  location: string;
  icon: React.ReactNode;
  row: 'top' | 'bottom';
  colIndex: number; // 0, 1, 2, 3 for top; 2, 1, 0 for bottom
  description: string;
  highlights: string[];
}

const SCHEDULE_NODES: TimelineNodeItem[] = [
  {
    id: 'node-01',
    stepNumber: '01',
    timeRange: '09:00 AM – 09:30 AM',
    duration: '30 Mins',
    title: 'Check-in & Festive Coffee',
    subtitle: 'Morning Arrival & Team Warmup',
    location: 'Winter Garden Lobby',
    icon: <Coffee className="h-4 w-4 text-[#E9C578]" />,
    row: 'top',
    colIndex: 0,
    description: 'Badge pickup, warm peppermint mocha or hot cocoa, and team matchmaking.',
    highlights: ['Badge verification', 'Hot cocoa & cinnamon pastries', 'Discord channels sync'],
  },
  {
    id: 'node-02',
    stepNumber: '02',
    timeRange: '09:30 AM – 10:00 AM',
    duration: '30 Mins',
    title: 'Opening Ceremony & Briefing',
    subtitle: 'Official Hackathon Kickoff',
    location: 'Main Auditorium',
    icon: <Sparkles className="h-4 w-4 text-[#FFD700]" />,
    row: 'top',
    colIndex: 1,
    description: 'Welcome address, track themes reveal, judging rubrics, and platform guidelines.',
    highlights: ['Organizers welcome address', 'Judging rubrics reveal', 'Mentor introductions'],
  },
  {
    id: 'node-03',
    stepNumber: '03',
    timeRange: '10:00 AM – 01:00 PM',
    duration: '3 Hours',
    title: 'Sprint 1: Core Development',
    subtitle: 'Deep Work & Architecture Scaffolding',
    location: 'Innovation Pods',
    icon: <Laptop className="h-4 w-4 text-[#25A18E]" />,
    row: 'top',
    colIndex: 2,
    description: 'Intensive hacking begins. Setup repositories, scaffold APIs, and build the MVP core.',
    highlights: ['Architecture locked', 'Sprint Checkpoint 1', 'Technical mentors available'],
  },
  {
    id: 'node-04',
    stepNumber: '04',
    timeRange: '01:00 PM – 02:00 PM',
    duration: '60 Mins',
    title: 'Festive Lunch & Sync',
    subtitle: 'Nourishment & Mid-Sprint Feedback',
    location: 'Holiday Feast Hall',
    icon: <UtensilsCrossed className="h-4 w-4 text-[#EF4050]" />,
    row: 'top',
    colIndex: 3,
    description: 'Catered banquet lunch, quick physical stretch, and 1-on-1 mentor sanity check.',
    highlights: ['Gourmet festive buffet', '1-on-1 mentor consultations', 'Team energy recharge'],
  },
  {
    id: 'node-05',
    stepNumber: '05',
    timeRange: '02:00 PM – 03:30 PM',
    duration: '90 Mins',
    title: 'Sprint 2: Polish & Submissions',
    subtitle: 'Bug Squashing & Deployment Freeze',
    location: 'Innovation Pods',
    icon: <Rocket className="h-4 w-4 text-[#FFB703]" />,
    row: 'bottom',
    colIndex: 2, // aligned with col 2
    description: 'Feature freeze, UI polish, edge-case fixes, demo video recording, and portal submission.',
    highlights: ['Live cloud deployment', 'Demo recording & slides', 'Code freeze at 03:30 PM'],
  },
  {
    id: 'node-06',
    stepNumber: '06',
    timeRange: '03:30 PM – 04:30 PM',
    duration: '60 Mins',
    title: 'Demos & Jury Evaluation',
    subtitle: 'Live Pitching & Architectural Reviews',
    location: 'Main Auditorium',
    icon: <Presentation className="h-4 w-4 text-[#5BE3CC]" />,
    row: 'bottom',
    colIndex: 1, // aligned with col 1
    description: '3-minute live presentations followed by 2 minutes of jury Q&A and technical evaluation.',
    highlights: ['Live interactive demos', 'Scoring on UX, Code & Impact', 'Audience choice voting'],
  },
  {
    id: 'node-07',
    stepNumber: '07',
    timeRange: '04:30 PM – 05:00 PM',
    duration: '30 Mins',
    title: 'Awards & Closing Ceremony',
    subtitle: 'Celebrating the Holiday Builders',
    location: 'Main Stage & Pavilion',
    icon: <Trophy className="h-4 w-4 text-[#FFD700]" />,
    row: 'bottom',
    colIndex: 0, // aligned with col 0
    description: 'Gold, Silver, Bronze trophy announcements, surprise gifts, group photos, and celebration.',
    highlights: ['Podium winners crowned', 'Mystery gift prize reveals', 'Holiday farewell & photos'],
  },
];

export const EventTimelineSection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-03');

  const selectedNode =
    SCHEDULE_NODES.find((node) => node.id === selectedNodeId) || SCHEDULE_NODES[0];

  return (
    <section
      id="schedule"
      className="relative z-20 bg-[#071F18] pt-20 pb-24 sm:pt-28 sm:pb-36 overflow-hidden scroll-mt-20"
      aria-labelledby="timeline-main-title"
    >
      {/* Anchor alias for #timeline */}
      <div id="timeline" className="absolute -top-24 left-0" aria-hidden="true" />

      {/* Atmospheric Background Ambient Lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_15%,rgba(233,197,120,0.08),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-radial from-[#123D2B]/40 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-radial from-[#25A18E]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle Animated Holiday Snowflakes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {[
          { top: '10%', left: '8%', size: '13px', opacity: 0.3, duration: '16s', delay: '0s' },
          { top: '22%', left: '89%', size: '16px', opacity: 0.25, duration: '20s', delay: '2s' },
          { top: '45%', left: '4%', size: '12px', opacity: 0.28, duration: '18s', delay: '4s' },
          { top: '65%', left: '94%', size: '15px', opacity: 0.3, duration: '22s', delay: '1s' },
          { top: '85%', left: '15%', size: '14px', opacity: 0.25, duration: '17s', delay: '3s' },
        ].map((flake, idx) => (
          <span
            key={`snow-${idx}`}
            className="absolute animate-float-slow text-[#FFFFFF]"
            style={{
              top: flake.top,
              left: flake.left,
              fontSize: flake.size,
              opacity: flake.opacity,
              animationDuration: flake.duration,
              animationDelay: flake.delay,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      <FestiveContainer size="xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <ScrollReveal animation="fade-up" delay={50}>
            <FestiveBadge
              variant="gold"
              icon={<Sparkles className="h-3.5 w-3.5 text-[#E9C578] animate-twinkle" />}
              className="mb-4 uppercase tracking-widest text-xs font-semibold px-4 py-1.5"
            >
              PHASE 05 • EVENT TIMELINE & SCHEDULE
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="timeline-main-title"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
            >
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#FFF8E7] to-[#E9C578] bg-clip-text text-transparent">
                8-Hour Building Sprint
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-4 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
              Build the future. Celebrate sustainably. Explore the minute-by-minute flow from morning
              kickoff to evening awards.
            </p>
          </ScrollReveal>

          {/* Quick Stat Chips */}
          <ScrollReveal animation="fade-up" delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9C578]/40 bg-[#0F3425]/80 px-3.5 py-1 text-xs font-mono font-medium text-[#FFEA9F] backdrop-blur-md">
                <Clock className="h-3.5 w-3.5 text-[#E9C578]" />
                09:00 AM – 05:00 PM IST
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#25A18E]/40 bg-[#092B20]/80 px-3.5 py-1 text-xs font-mono font-medium text-[#5BE3CC] backdrop-blur-md">
                <Zap className="h-3.5 w-3.5 text-[#25A18E]" />
                8 Hours Total
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EF4050]/40 bg-[#280F13]/70 px-3.5 py-1 text-xs font-mono font-medium text-[#FFBAC1] backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-[#EF4050]" />
                Main Stage & Virtual Arena
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP / TABLET: Ultra-Minimalist Serpentine Line Flow  */}
        {/* ======================================================== */}
        <div className="hidden lg:block relative max-w-[1100px] mx-auto py-8">
          {/* Main SVG Serpentine Path */}
          <svg
            className="w-full h-[520px] overflow-visible"
            viewBox="0 0 1000 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Golden gradient for the line */}
              <linearGradient id="goldSerpentineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9C578" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#FFD700" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#E9C578" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#25A18E" stopOpacity="0.5" />
              </linearGradient>

              {/* Glowing filter */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle background ambient line glow */}
            <path
              d="M 80 160 L 880 160 A 100 100 0 0 1 880 360 L 80 360"
              stroke="#E9C578"
              strokeWidth="6"
              strokeOpacity="0.15"
              strokeLinecap="round"
              fill="none"
            />

            {/* Core Serpentine Flow Line (Top row L->R, U-Turn, Bottom row R->L) */}
            <path
              d="M 80 160 L 880 160 A 100 100 0 0 1 880 360 L 80 360"
              stroke="url(#goldSerpentineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              filter="url(#goldGlow)"
            />

            {/* Flow Direction Indicator Arrows on path */}
            <g opacity="0.6">
              {/* Row 1 L->R arrow */}
              <path d="M 500 156 L 508 160 L 500 164" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 750 156 L 758 160 L 750 164" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Row 2 R->L arrow */}
              <path d="M 500 356 L 492 360 L 500 364" stroke="#E9C578" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 250 356 L 242 360 L 250 364" stroke="#E9C578" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Dotted Connecting Lines from nodes to text */}
            {/* Top row: nodes at Y=160, connecting UP to Y=105 */}
            <line x1="130" y1="134" x2="130" y2="100" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="380" y1="134" x2="380" y2="100" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="630" y1="134" x2="630" y2="100" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="880" y1="134" x2="880" y2="100" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />

            {/* Bottom row: nodes at Y=360, connecting DOWN to Y=415 */}
            <line x1="630" y1="386" x2="630" y2="420" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="380" y1="386" x2="380" y2="420" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
            <line x1="130" y1="386" x2="130" y2="420" stroke="#E9C578" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
          </svg>

          {/* HTML Overlay with Interactive Nodes and Text Blocks */}
          <div className="absolute inset-0 pointer-events-none">
            {/* ---------------- TOP ROW (Left to Right: 01, 02, 03, 04) ---------------- */}
            {SCHEDULE_NODES.filter((n) => n.row === 'top').map((node) => {
              const xPositions = ['13%', '38%', '63%', '88%'];
              const leftPos = xPositions[node.colIndex];
              const isSelected = selectedNodeId === node.id;

              return (
                <div key={node.id} className="pointer-events-auto">
                  {/* Text Slot ABOVE the trace line */}
                  <div
                    style={{ left: leftPos }}
                    className="absolute top-2 -translate-x-1/2 w-56 text-center cursor-pointer transition-all duration-300 group"
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-[11px] font-semibold text-[#FFEA9F] bg-[#0E3526]/80 px-2.5 py-0.5 rounded-full border border-[#E9C578]/30 shadow-sm backdrop-blur-sm">
                        {node.timeRange}
                      </span>
                      <h3 className="mt-1.5 font-festive text-base font-bold text-[#FFFFFF] group-hover:text-[#FFD700] transition-colors leading-snug">
                        {node.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#D9ECF5]/80 font-sans-festive">
                        {node.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Circular Numbered Badge Node directly ON the line (Y = 160px) */}
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{ left: leftPos }}
                    className="absolute top-[160px] -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
                    aria-label={`Step ${node.stepNumber}: ${node.title}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Ambient Node Glow */}
                      <div
                        className={`absolute -inset-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FFD700]/40 blur-md scale-110'
                            : 'bg-[#E9C578]/15 blur-sm group-hover:bg-[#E9C578]/30'
                        }`}
                      />

                      {/* Circular Medallion */}
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 backdrop-blur-md ${
                          isSelected
                            ? 'border-[#FFD700] bg-[#123E2E] shadow-[0_0_20px_rgba(255,215,0,0.6)] scale-110'
                            : 'border-[#E9C578] bg-[#071F18] shadow-[0_0_12px_rgba(233,197,120,0.3)] group-hover:scale-105 group-hover:border-[#FFEA9F]'
                        }`}
                      >
                        <span className="font-mono text-sm font-extrabold tracking-wider text-[#FFD700]">
                          {node.stepNumber}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}

            {/* ---------------- BOTTOM ROW (Right to Left: 05, 06, 07) ---------------- */}
            {SCHEDULE_NODES.filter((n) => n.row === 'bottom').map((node) => {
              // Node 05 is colIndex 2 (63%), Node 06 is colIndex 1 (38%), Node 07 is colIndex 0 (13%)
              const xPositions: Record<number, string> = { 2: '63%', 1: '38%', 0: '13%' };
              const leftPos = xPositions[node.colIndex];
              const isSelected = selectedNodeId === node.id;

              return (
                <div key={node.id} className="pointer-events-auto">
                  {/* Circular Numbered Badge Node directly ON the line (Y = 360px) */}
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{ left: leftPos }}
                    className="absolute top-[360px] -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
                    aria-label={`Step ${node.stepNumber}: ${node.title}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Ambient Node Glow */}
                      <div
                        className={`absolute -inset-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FFD700]/40 blur-md scale-110'
                            : 'bg-[#E9C578]/15 blur-sm group-hover:bg-[#E9C578]/30'
                        }`}
                      />

                      {/* Circular Medallion */}
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 backdrop-blur-md ${
                          isSelected
                            ? 'border-[#FFD700] bg-[#123E2E] shadow-[0_0_20px_rgba(255,215,0,0.6)] scale-110'
                            : 'border-[#E9C578] bg-[#071F18] shadow-[0_0_12px_rgba(233,197,120,0.3)] group-hover:scale-105 group-hover:border-[#FFEA9F]'
                        }`}
                      >
                        <span className="font-mono text-sm font-extrabold tracking-wider text-[#FFD700]">
                          {node.stepNumber}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Text Slot BELOW the trace line */}
                  <div
                    style={{ left: leftPos }}
                    className="absolute top-[425px] -translate-x-1/2 w-56 text-center cursor-pointer transition-all duration-300 group"
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-[11px] font-semibold text-[#FFEA9F] bg-[#0E3526]/80 px-2.5 py-0.5 rounded-full border border-[#E9C578]/30 shadow-sm backdrop-blur-sm">
                        {node.timeRange}
                      </span>
                      <h3 className="mt-1.5 font-festive text-base font-bold text-[#FFFFFF] group-hover:text-[#FFD700] transition-colors leading-snug">
                        {node.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#D9ECF5]/80 font-sans-festive">
                        {node.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE: Sleek Vertical Golden Stream (Down to 01..07)   */}
        {/* ======================================================== */}
        <div className="lg:hidden relative max-w-lg mx-auto py-4">
          {/* Vertical Golden Trace Line down the side */}
          <div
            className="absolute top-4 bottom-4 left-6 w-0.5 bg-gradient-to-b from-[#E9C578]/20 via-[#FFD700]/70 to-[#25A18E]/30"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[#E9C578]/30 blur-xs" />
          </div>

          <div className="space-y-7">
            {SCHEDULE_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="relative flex items-start gap-4 pl-14 cursor-pointer group"
                >
                  {/* Numbered Badge Node on the vertical line */}
                  <div className="absolute left-6 -translate-x-1/2 top-1 z-10 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute -inset-1 rounded-full ${
                          isSelected
                            ? 'bg-[#FFD700]/40 blur-sm scale-110'
                            : 'bg-[#E9C578]/15 blur-xs group-hover:bg-[#E9C578]/30'
                        }`}
                      />
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? 'border-[#FFD700] bg-[#123E2E] shadow-[0_0_14px_rgba(255,215,0,0.5)] scale-105'
                            : 'border-[#E9C578] bg-[#071F18] shadow-[0_0_8px_rgba(233,197,120,0.25)]'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-[#FFD700]">
                          {node.stepNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal dotted connector */}
                  <div
                    className="absolute left-10 top-6 w-4 border-t border-dotted border-[#E9C578]/60"
                    aria-hidden="true"
                  />

                  {/* Content Block */}
                  <div
                    className={`flex-1 rounded-2xl border p-4 transition-all backdrop-blur-md ${
                      isSelected
                        ? 'border-[#E9C578] bg-[#0D382A]/90 shadow-md'
                        : 'border-[#E9C578]/25 bg-[#09271E]/75 hover:border-[#E9C578]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10.5px] font-semibold text-[#FFEA9F] bg-[#061C14]/80 px-2.5 py-0.5 rounded-full border border-[#E9C578]/30">
                        {node.timeRange}
                      </span>
                      <span className="text-[10px] font-mono text-[#D9ECF5]/70 bg-[#061C14]/70 px-2 py-0.5 rounded-md border border-[#25A18E]/20">
                        {node.duration}
                      </span>
                    </div>

                    <h3 className="mt-2 font-festive text-base font-bold text-[#FFFFFF] group-hover:text-[#FFD700] transition-colors">
                      {node.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#E9C578]/80 font-serif-festive">
                      {node.subtitle}
                    </p>

                    <p className="mt-2 text-xs text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Card (Minimalist Inspection Drawer) */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="mt-12 sm:mt-16 max-w-2xl mx-auto rounded-3xl border border-[#E9C578]/35 bg-gradient-to-b from-[#0C3526]/85 via-[#0A261D]/90 to-[#071F18]/90 p-5 sm:p-7 shadow-[0_12px_36px_rgba(4,20,15,0.7)] backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#E9C578]/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9C578]/40 bg-[#061C14]/90 shadow-sm">
                  {selectedNode.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FFD700]">
                      PHASE {selectedNode.stepNumber}
                    </span>
                    <span className="text-[#E9C578]/50">•</span>
                    <span className="font-mono text-xs text-[#FFEA9F] font-semibold">
                      {selectedNode.timeRange}
                    </span>
                  </div>
                  <h4 className="font-festive text-lg sm:text-xl font-bold text-[#FFFFFF]">
                    {selectedNode.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs text-[#D9ECF5]/80 font-mono bg-[#061C14]/70 px-3 py-1 rounded-full border border-[#25A18E]/30">
                <MapPin className="h-3 w-3 text-[#25A18E]" />
                <span>{selectedNode.location}</span>
              </div>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {selectedNode.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-sans-festive text-[#FFEA9F] bg-[#123E2E]/80 border border-[#E9C578]/30 px-2.5 py-1 rounded-lg"
                >
                  <span className="text-[#FFD700] text-xs">✦</span>
                  {h}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </FestiveContainer>
    </section>
  );
};
