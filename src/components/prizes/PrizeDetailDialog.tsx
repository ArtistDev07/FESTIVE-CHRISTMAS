import React, { useEffect, useState } from 'react';
import {
  X,
  Award as AwardIcon,
  Sparkles,
  Check,
  Copy,
  Shield,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import { Award as AwardType } from '../../types/awards.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { FestiveButton } from '../ui/FestiveButton.tsx';
import { AwardIllustration } from '../illustrations/AwardIllustration.tsx';

interface PrizeDetailDialogProps {
  award: AwardType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrizeDetailDialog: React.FC<PrizeDetailDialogProps> = ({
  award,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !award) return null;

  const handleCopyDetails = async () => {
    const text = `Festive Christmas 2026: ${award.title}\nCategory: ${award.categoryLabel}\nReward: ${award.rewardValue} (${award.rewardDescription})\nEligibility: ${award.eligibility}\nOverview: ${award.description}\n\nDetails:\n${award.details?.map((d) => `• ${d}`).join('\n') || 'Open award'}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const isConfirmed = award.officialStatus === 'confirmed';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prize-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04140F]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-[#E9C578]/40 bg-gradient-to-b from-[#123D2B] via-[#09271E] to-[#071E16] text-[#FFF4DF] p-6 sm:p-8 shadow-[0_24px_64px_rgba(4,20,15,0.95)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative holiday glow */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-radial from-[#E9C578]/25 via-transparent to-transparent blur-2xl"
          aria-hidden="true"
        />

        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E9C578]/20">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#09271E] border border-[#E9C578]/40 shadow-inner">
              <AwardIllustration category={award.category} size="md" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <FestiveBadge variant="gold" size="sm">
                  {award.categoryLabel}
                </FestiveBadge>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E9C578]">
                  {isConfirmed ? 'Official Confirmed Award' : 'Proposed Distinction'}
                </span>
              </div>

              <h2
                id="prize-dialog-title"
                className="font-serif-festive text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight leading-snug"
              >
                {award.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E9C578]/30 bg-[#09271E]/80 text-[#FFF4DF]/80 hover:text-[#FFFFFF] hover:border-[#E9C578] hover:bg-[#C62835] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
            aria-label="Close award details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Reward Value Banner */}
        <div className="mt-5 rounded-2xl border border-[#E9C578]/30 bg-[#09271E]/95 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#E9C578]">
              Verified Award Allocation
            </span>
            <p className="font-mono text-3xl font-extrabold text-[#FFFFFF] text-shadow-gold">
              {award.rewardValue}
            </p>
            <p className="text-xs text-[#FFF4DF]/80 font-sans-festive mt-0.5">
              {award.rewardDescription}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-mono text-[#D9ECF5]/60 uppercase tracking-wider block">
              Reward Type
            </span>
            <span className="font-mono text-sm font-bold text-[#E9C578] uppercase">
              {award.rewardType}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="mt-5">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E9C578]">
            Recognition Purpose & Ethos
          </h3>
          <p className="mt-2 text-sm sm:text-base text-[#D9ECF5]/90 font-sans-festive leading-relaxed">
            {award.description}
          </p>
        </div>

        {/* Included Benefits & Deliverables */}
        {award.details && award.details.length > 0 && (
          <div className="mt-5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E9C578] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#E9C578]" />
              <span>Included Honors & Benefits</span>
            </h3>
            <ul className="mt-3 space-y-2.5">
              {award.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#E9C578]/15 bg-[#09271E]/60 p-3 text-xs sm:text-sm text-[#FFF4DF]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#123D2B] text-[#E9C578] font-mono text-[10px] font-bold border border-[#E9C578]/30">
                    {idx + 1}
                  </span>
                  <span className="font-sans-festive leading-snug">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Eligibility Conditions */}
        <div className="mt-5 rounded-2xl border border-[#25A18E]/30 bg-[#25A18E]/10 p-4 text-xs sm:text-sm text-[#D9ECF5] font-sans-festive">
          <p className="flex items-center gap-2 font-semibold text-[#FFFFFF] mb-1">
            <Shield className="h-4 w-4 text-[#25A18E]" />
            <span>Eligibility Requirement</span>
          </p>
          {award.eligibility}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#E9C578]/20 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyDetails}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E9C578]/30 bg-[#09271E] px-3.5 py-2 text-xs font-medium text-[#FFF4DF] hover:text-[#FFFFFF] hover:border-[#E9C578] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#25A18E]" />
                <span className="text-[#25A18E]">Copied Award Information!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#E9C578]" />
                <span>Copy Award Details</span>
              </>
            )}
          </button>

          <FestiveButton variant="secondary" size="sm" onClick={onClose}>
            Done
          </FestiveButton>
        </div>
      </div>
    </div>
  );
};
