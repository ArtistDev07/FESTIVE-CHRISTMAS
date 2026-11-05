import React, { useState } from 'react';
import {
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  Code,
  CheckCircle2,
  AlertTriangle,
  Award,
  HeartHandshake,
  FileText,
} from 'lucide-react';
import { FestiveContainer } from '../ui/FestiveContainer.tsx';
import { FestiveBadge } from '../ui/FestiveBadge.tsx';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';
import {
  rulesIntroContent,
  eligibilityCards,
  ruleSections,
} from '../../config/rulesConfig.ts';
import { RuleSectionItem } from '../../types/eventInformation.ts';

export const RulesSection: React.FC = () => {
  // All accordion panels are completely collapsed (closed) by default on initial load
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getEligibilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="h-5 w-5 text-[#E9C578]" />;
      case 'globe':
        return <Globe className="h-5 w-5 text-[#25A18E]" />;
      case 'shield':
        return <Shield className="h-5 w-5 text-[#EF4050]" />;
      case 'code':
      default:
        return <Code className="h-5 w-5 text-[#FFD700]" />;
    }
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'rule-01':
        return <Users className="h-5 w-5 text-[#E9C578]" />;
      case 'rule-02':
        return <Code className="h-5 w-5 text-[#25A18E]" />;
      case 'rule-03':
        return <Shield className="h-5 w-5 text-[#EF4050]" />;
      case 'rule-04':
        return <FileText className="h-5 w-5 text-[#E9C578]" />;
      case 'rule-05':
        return <Award className="h-5 w-5 text-[#FFD700]" />;
      case 'rule-06':
      default:
        return <HeartHandshake className="h-5 w-5 text-[#EF4050]" />;
    }
  };

  return (
    <section
      id="rules"
      className="relative z-20 bg-[#09271E] text-[#FFF4DF] py-20 sm:py-28 lg:py-36 overflow-hidden scroll-mt-24 border-t border-[#E9C578]/15"
      aria-labelledby="rules-heading"
    >
      {/* Background ambient radial glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-radial from-[#25A18E]/10 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      <FestiveContainer size="xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <ScrollReveal animation="fade-up" delay={50}>
            <FestiveBadge
              variant="evergreen"
              icon={<Shield className="h-3 w-3 text-[#E9C578]" />}
              className="mb-4"
            >
              {rulesIntroContent.eyebrow}
            </FestiveBadge>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2
              id="rules-heading"
              className="font-section-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] text-shadow-festive leading-[1.15]"
            >
              {rulesIntroContent.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="mt-5 text-base sm:text-lg text-[#D9ECF5]/90 font-sans-festive leading-relaxed max-w-2xl">
              {rulesIntroContent.paragraph}
            </p>
          </ScrollReveal>
        </div>

        {/* Eligibility Highlights Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eligibilityCards.map((card, idx) => (
            <ScrollReveal
              key={card.id}
              animation="fade-up"
              delay={100 + idx * 60}
              className="h-full"
            >
              <div className="group h-full flex flex-col justify-between rounded-2xl border border-[#E9C578]/25 bg-[#071E16]/85 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E9C578] hover:shadow-[0_12px_24px_rgba(4,20,15,0.6)]">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9C578]/15">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E9C578]">
                      {card.label}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#123D2B] border border-[#E9C578]/30">
                      {getEligibilityIcon(card.icon)}
                    </div>
                  </div>

                  <p className="mt-3.5 font-sans-festive text-sm text-[#FFFFFF] font-medium leading-relaxed">
                    {card.value}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#E9C578]/10 text-[10px] font-mono text-[#E9C578]/70 flex items-center justify-between">
                  <span>CORE ELIGIBILITY</span>
                  <CheckCircle2 className="h-3 w-3 text-[#25A18E]" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Rules Accordion Section Header */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto pb-4 border-b border-[#E9C578]/20">
          <h3 className="font-serif-festive text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
            Detailed Participation Rubrics & Policies
          </h3>
          <p className="text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive mt-1">
            Click any section to review explicit guidelines, evaluation criteria, and conduct standards.
          </p>
        </div>

        {/* Accordion Cards */}
        <div className="mt-6 max-w-4xl mx-auto space-y-4">
          {ruleSections.map((rule, index) => {
            const isExpanded = expandedIds.includes(rule.id);
            return (
              <ScrollReveal
                key={rule.id}
                animation="fade-up"
                delay={50 + index * 40}
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                    isExpanded
                      ? 'border-[#E9C578] bg-[#071E16]/95 shadow-[0_8px_24px_rgba(4,20,15,0.7)]'
                      : 'border-[#E9C578]/25 bg-[#09271E]/80 hover:border-[#E9C578]/60'
                  }`}
                >
                  {/* Collapsible Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(rule.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`rule-panel-${rule.id}`}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123D2B] border border-[#E9C578]/30 shadow-inner">
                        {getSectionIcon(rule.id)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#E9C578] font-bold">
                            RULE SECTION 0{index + 1}
                          </span>
                          <span className="text-[10px] font-mono text-[#D9ECF5]/50">
                            • {rule.officialStatus.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="font-serif-festive text-lg sm:text-xl font-bold text-[#FFFFFF] tracking-tight">
                          {rule.title}
                        </h4>
                        <p className="mt-1 text-xs text-[#D9ECF5]/80 font-sans-festive line-clamp-1">
                          {rule.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/30 text-[#E9C578] transition-transform duration-200">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Body Content */}
                  {isExpanded && (
                    <div
                      id={`rule-panel-${rule.id}`}
                      className="px-5 pb-6 sm:px-6 pt-1 border-t border-[#E9C578]/15 animate-in fade-in duration-300"
                    >
                      <p className="text-xs sm:text-sm text-[#D9ECF5]/90 font-sans-festive leading-relaxed mt-3">
                        {rule.details}
                      </p>

                      <div className="mt-4 rounded-xl border border-[#E9C578]/20 bg-[#09271E]/90 p-4">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E9C578] block mb-2.5">
                          Key Directives & Enforced Principles:
                        </span>
                        <ul className="space-y-2">
                          {rule.guidelines.map((guideline, gIdx) => (
                            <li
                              key={gIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FFF4DF]"
                            >
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#25A18E]/20 text-[#25A18E] text-[10px] font-bold mt-0.5">
                                ✓
                              </span>
                              <span className="font-sans-festive leading-relaxed">
                                {guideline}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </FestiveContainer>
    </section>
  );
};
