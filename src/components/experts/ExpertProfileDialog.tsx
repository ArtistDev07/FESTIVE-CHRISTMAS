import React, { useEffect, useRef } from 'react';
import {
  X,
  ExternalLink,
  Award,
  BookOpen,
  Scale,
  Building,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';
import { ExpertProfile } from '../../types/experts.ts';
import { ExpertPortrait } from './ExpertPortrait.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface ExpertProfileDialogProps {
  profile: ExpertProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExpertProfileDialog: React.FC<ExpertProfileDialogProps> = ({
  profile,
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus restoration & Escape key handler
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        // Focus trap
        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const firstEl = focusable[0];
          const lastEl = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !profile) return null;

  const getRoleIcon = () => {
    switch (profile.role) {
      case 'judge':
        return <Scale className="h-3.5 w-3.5 text-[#E9C578]" />;
      case 'mentor-and-judge':
        return <Award className="h-3.5 w-3.5 text-[#FFEA9F]" />;
      default:
        return <BookOpen className="h-3.5 w-3.5 text-[#88D4B0]" />;
    }
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expert-dialog-title"
      aria-describedby="expert-dialog-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04120C]/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#E9C578]/40 bg-gradient-to-b from-[#143B2B] via-[#0D3022] to-[#082218] p-6 sm:p-8 shadow-[0_24px_64px_rgba(4,20,15,0.9)] text-[#FFF4DF] overflow-hidden my-8 max-h-[90vh] flex flex-col animate-scale-up"
      >
        {/* Decorative corner glow */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-radial from-[#E9C578]/20 via-transparent to-transparent blur-2xl"
          aria-hidden="true"
        />

        {/* Header / Dismiss */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E9C578]/20 shrink-0">
          <div className="flex items-center gap-2">
            <FestiveBadge
              variant={profile.role === 'judge' ? 'gold' : 'evergreen'}
              size="sm"
              icon={getRoleIcon()}
            >
              {profile.roleLabel}
            </FestiveBadge>

            {profile.isIllustrativeSample && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#D9ECF5]/70">
                Review Sample
              </span>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#061C14] border border-[#E9C578]/30 text-[#D9ECF5] hover:text-[#FFFFFF] hover:border-[#E9C578] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] cursor-pointer"
            aria-label="Close profile details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto pr-1 py-4 space-y-6 flex-1">
          {/* Identity Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <ExpertPortrait
              name={profile.displayName}
              src={profile.portrait}
              role={profile.role}
              size="lg"
            />

            <div className="flex-1 text-center sm:text-left">
              <h3
                id="expert-dialog-title"
                className="font-festive text-2xl sm:text-3xl font-bold text-[#FFFFFF] text-shadow-festive"
              >
                {profile.displayName}
              </h3>

              <p className="font-serif-festive text-base text-[#E9C578] mt-1 font-medium">
                {profile.professionalTitle}
              </p>

              {profile.organization && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive">
                  <Building className="h-3.5 w-3.5 text-[#E9C578]/70" />
                  <span>{profile.organization}</span>
                </div>
              )}

              {profile.featuredReason && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9C578]/15 border border-[#E9C578]/30 text-xs text-[#FFEA9F] font-sans-festive">
                  <Sparkles className="h-3 w-3 text-[#E9C578]" />
                  <span>{profile.featuredReason}</span>
                </div>
              )}
            </div>
          </div>

          {/* Full Biography */}
          <div className="rounded-2xl bg-[#082218]/80 border border-[#E9C578]/15 p-5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E9C578] mb-2">
              Approved Biography
            </h4>
            <p
              id="expert-dialog-desc"
              className="text-sm sm:text-base text-[#FFF4DF]/90 font-sans-festive leading-relaxed whitespace-pre-line"
            >
              {profile.fullBiography || profile.shortBiography}
            </p>
          </div>

          {/* Areas of Expertise */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E9C578] mb-3">
              Verified Areas of Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.expertise.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[#123D2B] border border-[#E9C578]/25 text-[#FFF4DF]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Approved Professional Links */}
          {profile.professionalLinks && profile.professionalLinks.length > 0 && (
            <div className="pt-2 border-t border-[#E9C578]/20">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E9C578] mb-3">
                Official Professional Links
              </h4>
              <div className="flex flex-wrap gap-3">
                {profile.professionalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#061C14] border border-[#E9C578]/30 text-xs text-[#D9ECF5] hover:text-[#FFFFFF] hover:border-[#E9C578] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
                  >
                    {getLinkIcon(link.type)}
                    <span>{link.label}</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#E9C578]/20 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#123D2B] text-[#FFF4DF] border border-[#E9C578]/30 hover:bg-[#184833] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
