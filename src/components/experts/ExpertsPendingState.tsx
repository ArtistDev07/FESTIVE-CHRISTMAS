import React, { useState } from 'react';
import { Sparkles, Clock, Mail, Check, Copy, Compass, BookOpen, Scale } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig.ts';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';

interface ExpertsPendingStateProps {
  type: 'mentors' | 'judges';
  title: string;
  subtitle: string;
  onEnablePreview?: () => void;
  isPreviewAvailable?: boolean;
}

export const ExpertsPendingState: React.FC<ExpertsPendingStateProps> = ({
  type,
  title,
  subtitle,
  onEnablePreview,
  isPreviewAvailable = false,
}) => {
  const [copied, setCopied] = useState(false);
  const isJudge = type === 'judges';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(eventConfig.organizerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#123828]/80 via-[#0A261D]/90 to-[#061C14] p-8 sm:p-12 text-center shadow-[0_16px_40px_rgba(4,20,15,0.7)] backdrop-blur-xl overflow-hidden max-w-2xl mx-auto">
      {/* Decorative ambient background ring */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-radial from-[#E9C578]/15 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Thematic Icon Badge */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B4B36] to-[#0A261D] border border-[#E9C578]/50 shadow-[0_4px_24px_rgba(233,197,120,0.2)] mb-5">
          {isJudge ? (
            <Scale className="h-8 w-8 text-[#E9C578]" />
          ) : (
            <BookOpen className="h-8 w-8 text-[#88D4B0]" />
          )}
        </div>

        <FestiveBadge variant="gold" size="sm" className="mb-3">
          {isJudge ? 'JUDGING PANEL UNDER ASSEMBLY' : 'MENTOR COMMUNITY CURATION'}
        </FestiveBadge>

        {/* Required Headline */}
        <h4 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight text-shadow-festive">
          {title}
        </h4>

        {/* Required Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-[#D9ECF5]/85 font-sans-festive max-w-lg leading-relaxed">
          {subtitle}
        </p>

        {/* Informational Callout */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <a
            href={`mailto:${eventConfig.organizerEmail}?subject=${encodeURIComponent(
              isJudge ? 'Festive Christmas Judging Inquiry' : 'Festive Christmas Mentorship Application'
            )}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#184833] to-[#123D2B] text-[#FFF4DF] border border-[#E9C578]/40 hover:border-[#E9C578] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
          >
            <Mail className="h-3.5 w-3.5 text-[#E9C578]" />
            <span>{isJudge ? 'Nominate a Judge' : 'Apply as a Mentor'}</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono bg-[#061C14] text-[#D9ECF5]/90 border border-[#E9C578]/25 hover:text-[#FFFFFF] hover:border-[#E9C578]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
            title="Copy organizer contact email"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#88D4B0]" />
                <span className="text-[#88D4B0]">Copied Email!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#E9C578]" />
                <span>{eventConfig.organizerEmail}</span>
              </>
            )}
          </button>
        </div>

        {/* Reviewer Testing Toggle if preview mode is available */}
        {isPreviewAvailable && onEnablePreview && (
          <div className="mt-8 pt-5 border-t border-[#E9C578]/15 w-full flex flex-col items-center">
            <span className="text-[11px] font-mono text-[#E9C578]/70 uppercase tracking-wider mb-2">
              Reviewer & Development Verification
            </span>
            <button
              type="button"
              onClick={onEnablePreview}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium bg-[#123D2B]/80 hover:bg-[#184833] text-[#FFEA9F] border border-[#E9C578]/30 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-[#E9C578]" />
              <span>Preview Confirmed Profiles (Reviewer Mode)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
