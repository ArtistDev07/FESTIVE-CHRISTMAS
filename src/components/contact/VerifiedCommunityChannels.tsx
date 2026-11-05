import React, { useState } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  Github,
  Tv,
  Sparkles,
} from 'lucide-react';
import { verifiedChannels, OfficialChannel } from '../../config/contactConfig.ts';

export const VerifiedCommunityChannels: React.FC = () => {
  const [copiedChannelId, setCopiedChannelId] = useState<string | null>(null);

  const getChannelIcon = (type: OfficialChannel['type']) => {
    switch (type) {
      case 'discord':
        return <MessageSquare className="h-5 w-5 text-[#88D4B0]" />;
      case 'github':
        return <Github className="h-5 w-5 text-[#FFEA9F]" />;
      case 'stream':
        return <Tv className="h-5 w-5 text-[#FF8591]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#E9C578]" />;
    }
  };

  const copyUrl = (channel: OfficialChannel) => {
    navigator.clipboard.writeText(channel.url);
    setCopiedChannelId(channel.id);
    setTimeout(() => setCopiedChannelId(null), 3000);
  };

  return (
    <div className="relative rounded-3xl border border-[#E9C578]/25 bg-gradient-to-br from-[#0C3224] via-[#08241A] to-[#04150F] p-6 sm:p-8 shadow-[0_16px_40px_rgba(4,20,15,0.6)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123D2B] border border-[#88D4B0]/40 text-[#88D4B0]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-festive text-xl sm:text-2xl font-bold text-[#FFFFFF]">
              Verified Official Channels
            </h3>
            <p className="text-xs text-[#E9C578]/80 font-mono">
              Official community hubs & live broadcast
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-[#88D4B0]/10 border border-[#88D4B0]/30 text-[#88D4B0]">
          <ShieldCheck className="h-3 w-3" />
          <span>Anti-Phishing Verified</span>
        </div>
      </div>

      <div className="space-y-3.5">
        {verifiedChannels.map((channel) => (
          <div
            key={channel.id}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#E9C578]/20 bg-[#061811]/90 hover:border-[#E9C578]/50 hover:bg-[#0A261D] transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123D2B] border border-[#E9C578]/30 group-hover:scale-105 transition-transform">
                {getChannelIcon(channel.type)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-festive text-base sm:text-lg font-bold text-[#FFFFFF]">
                    {channel.name}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1A4E38] text-[#88D4B0] border border-[#88D4B0]/30">
                    <ShieldCheck className="h-2.5 w-2.5" />
                    {channel.badge}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#D9ECF5]/80 font-sans-festive max-w-md leading-relaxed">
                  {channel.description}
                </p>

                <span className="mt-1 inline-block text-[11px] font-mono text-[#E9C578]/70">
                  {channel.handle}
                </span>
              </div>
            </div>

            {/* Actions: Copy Link & Open */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => copyUrl(channel)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono bg-[#0D3425] text-[#D9ECF5] border border-[#E9C578]/25 hover:border-[#E9C578] hover:text-[#FFFFFF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
                title="Copy official channel link"
                aria-label={`Copy official ${channel.name} link`}
              >
                {copiedChannelId === channel.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#88D4B0]" />
                    <span className="text-[#88D4B0]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#E9C578]" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-[#1A4E38] to-[#123D2B] text-[#FFF4DF] border border-[#E9C578]/40 hover:border-[#E9C578] hover:text-[#FFFFFF] hover:from-[#236348] hover:to-[#184E38] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
              >
                <span>{channel.buttonLabel}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#E9C578]" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="mt-4 p-3 rounded-xl bg-[#04150F]/70 border border-[#E9C578]/10 text-[11px] text-[#D9ECF5]/70 font-sans-festive">
        <strong className="text-[#E9C578]">Security Note:</strong> Hackathon organizers will never ask for private keys, passwords, or registration fees. Official emails will only arrive from{' '}
        <span className="font-mono text-[#FFEA9F]">@festivechristmas.dev</span>.
      </div>
    </div>
  );
};
