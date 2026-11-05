import React from 'react';
import { Mail, Linkedin, ShieldCheck, Sparkles, User, Users } from 'lucide-react';
import { CardCornerBrackets } from '../galleries/GalleryCardOrnaments.tsx';

// Photo URLs for the leadership committee:
const YOGESH_PHOTO_URL = 'https://i.pinimg.com/736x/1f/8a/df/1f8adf7db6e79d72353b5172325b2657.jpg';
// Organizer 2 (Harsh Parmar) photo URL placeholder — paste image URL here when ready:
const HARSH_PHOTO_URL = '';

export const OrganizerInfoCard: React.FC = () => {
  return (
    <div className="relative group">
      {/* Subtle ambient gold & emerald glow behind the main container */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-[#E9C578]/20 via-[#25A18E]/15 to-[#E9C578]/20 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-90"
        aria-hidden="true"
      />

      {/* Main Frosted-Glass Card */}
      <div className="relative rounded-[2rem] border border-[#E9C578]/35 bg-gradient-to-br from-[#0D3325]/95 via-[#08261D]/95 to-[#051711]/95 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(2,12,8,0.85)] backdrop-blur-2xl overflow-hidden">
        {/* Festive corner brackets ornamentation */}
        <CardCornerBrackets color="#E9C578" />

        {/* Ambient background radials inside card */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-radial from-[#E9C578]/12 via-transparent to-transparent blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-radial from-[#25A18E]/12 via-transparent to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Main Card Header: Title, Subtitle & Sleek Verified Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-7 border-b border-[#E9C578]/20">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A4E38] to-[#0A261D] border border-[#E9C578]/50 text-[#FFD700] shadow-[0_0_20px_rgba(233,197,120,0.25)] shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight text-shadow-festive">
                  Event Organizers
                </h3>
                <p className="text-xs sm:text-sm text-[#E9C578]/80 font-mono mt-0.5">
                  Official Leadership Committee
                </p>
              </div>
            </div>

            <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#25A18E]/15 text-[#88D4B0] border border-[#25A18E]/40 shadow-sm backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-[#25A18E]" />
              <span>Verified Committee</span>
            </div>
          </div>

          {/* Responsive Equal-Width 2-Column Grid (Desktop/Tablet) & 1-Column (Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* ── CARD 1: Organizer (Yogesh Sharma) ── */}
            <div className="group/card relative rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0C3021]/95 to-[#061C14]/95 p-6 sm:p-8 shadow-[0_12px_36px_rgba(2,12,8,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.22)] flex flex-col items-center text-center overflow-hidden">
              {/* Subtle Ambient Hover Glow */}
              <div
                className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-radial from-[#FFD700]/20 via-transparent to-transparent blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Dedicated Designer Profile Frame */}
              <div className="relative mb-5">
                <div
                  className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#E9C578]/40 via-[#25A18E]/30 to-[#E9C578]/40 blur-md opacity-40 group-hover/card:opacity-90 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-3xl border-2 border-[#E9C578]/60 bg-[#061C14] p-1.5 shadow-[0_8px_24px_rgba(4,20,15,0.8)] overflow-hidden transition-all duration-500 group-hover/card:border-[#FFD700] group-hover/card:shadow-[0_0_25px_rgba(233,197,120,0.35)]">
                  <div className="h-full w-full rounded-2xl overflow-hidden bg-[#0A261D]">
                    <img
                      src={YOGESH_PHOTO_URL}
                      alt="Yogesh Sharma"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110 pointer-events-none select-none"
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <h4 className="font-section-heading text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight group-hover/card:text-[#FFF4DF] transition-colors leading-snug">
                Yogesh Sharma
              </h4>

              {/* Role Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0E3526] text-[#E9C578] border border-[#E9C578]/30">
                  Organizer
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[#88D4B0] bg-[#123D2B]/80 border border-[#88D4B0]/30">
                  <Sparkles className="h-3 w-3 text-[#FFD700] animate-twinkle" /> Lead
                </span>
              </div>

              {/* Minimalist Social Icon Links Row */}
              <div className="mt-6 pt-5 w-full border-t border-[#E9C578]/15 flex items-center justify-center gap-3">
                {/* Gmail Link */}
                <a
                  href="mailto:yogeshsharma9425903357@gmail.com"
                  className="group/btn flex h-10 w-10 items-center justify-center rounded-xl bg-[#061811]/90 border border-[#E9C578]/30 hover:border-[#E9C578] hover:bg-[#123D2B] text-[#E9C578] hover:text-[#FFFFFF] transition-all duration-300 hover:scale-110 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
                  title="Send Gmail to Yogesh Sharma"
                  aria-label="Send email to Yogesh Sharma"
                >
                  <Mail className="h-4.5 w-4.5 group-hover/btn:text-[#FFD700] transition-colors" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/yogesh-sharma-9312022b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex h-10 w-10 items-center justify-center rounded-xl bg-[#061811]/90 border border-[#E9C578]/30 hover:border-[#E9C578] hover:bg-[#123D2B] text-[#E9C578] hover:text-[#FFFFFF] transition-all duration-300 hover:scale-110 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
                  title="View Yogesh Sharma on LinkedIn"
                  aria-label="View Yogesh Sharma on LinkedIn"
                >
                  <Linkedin className="h-4.5 w-4.5 group-hover/btn:text-[#FFD700] transition-colors" />
                </a>
              </div>
            </div>

            {/* ── CARD 2: Co-Organizer (Harsh Parmar) ── */}
            <div className="group/card relative rounded-3xl border border-[#E9C578]/30 bg-gradient-to-b from-[#0B2C1E]/95 to-[#061C14]/95 p-6 sm:p-8 shadow-[0_12px_36px_rgba(2,12,8,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#E9C578] hover:shadow-[0_20px_50px_rgba(233,197,120,0.22)] flex flex-col items-center text-center overflow-hidden">
              {/* Subtle Ambient Hover Glow */}
              <div
                className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-radial from-[#FFD700]/20 via-transparent to-transparent blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Dedicated Designer Profile Frame (Identical structure, ready for photo) */}
              <div className="relative mb-5">
                <div
                  className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#E9C578]/40 via-[#25A18E]/30 to-[#E9C578]/40 blur-md opacity-40 group-hover/card:opacity-90 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-3xl border-2 border-[#E9C578]/60 bg-[#061C14] p-1.5 shadow-[0_8px_24px_rgba(4,20,15,0.8)] overflow-hidden transition-all duration-500 group-hover/card:border-[#FFD700] group-hover/card:shadow-[0_0_25px_rgba(233,197,120,0.35)]">
                  <div className="h-full w-full rounded-2xl overflow-hidden bg-[#0A261D] flex items-center justify-center">
                    {HARSH_PHOTO_URL ? (
                      <img
                        src={HARSH_PHOTO_URL}
                        alt="Harsh Parmar"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110 pointer-events-none select-none"
                      />
                    ) : (
                      /* Elegant Monogram & Avatar Placeholder Frame */
                      <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#123828] to-[#071E15] text-[#88D4B0] p-3 select-none">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#09271E] border border-[#E9C578]/30 text-[#88D4B0] group-hover/card:scale-105 group-hover/card:border-[#E9C578] transition-all">
                          <User className="h-6 w-6 text-[#88D4B0]" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest uppercase mt-2 text-[#E9C578]/70">
                          Photo Pending
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <h4 className="font-section-heading text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight group-hover/card:text-[#FFF4DF] transition-colors leading-snug">
                Harsh Parmar
              </h4>

              {/* Role Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0B2A1E] text-[#88D4B0] border border-[#88D4B0]/30">
                  Co-Organizer
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[#FFEA9F] bg-[#123D2B]/80 border border-[#E9C578]/30">
                  Co-Lead
                </span>
              </div>

              {/* Minimalist Social Icon Links Row (Placeholder icons maintaining visual balance) */}
              <div className="mt-6 pt-5 w-full border-t border-[#E9C578]/15 flex items-center justify-center gap-3">
                {/* Mail Placeholder */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#061811]/60 border border-[#E9C578]/20 text-[#E9C578]/60 cursor-default shadow-sm"
                  title="Email contact coming soon"
                  aria-label="Email contact coming soon"
                >
                  <Mail className="h-4.5 w-4.5" />
                </div>

                {/* LinkedIn Placeholder */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#061811]/60 border border-[#E9C578]/20 text-[#E9C578]/60 cursor-default shadow-sm"
                  title="LinkedIn profile coming soon"
                  aria-label="LinkedIn profile coming soon"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
