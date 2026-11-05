import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, CheckCircle2, Info } from 'lucide-react';
import { awardConditionsList } from '../../config/awardsConfig.ts';
import { ScrollReveal } from '../motion/ScrollReveal.tsx';

export const PrizeConditions: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['cond-01']);

  const toggleCondition = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
      <div className="pb-4 mb-6 border-b border-[#E9C578]/20 flex items-center justify-between">
        <div>
          <h3 className="font-serif-festive text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
            Award Conditions & Governance Policies
          </h3>
          <p className="text-xs sm:text-sm text-[#D9ECF5]/80 font-sans-festive mt-1">
            Confirmed guidelines regarding disbursement, fair evaluation, and 100% creator intellectual property retention.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {awardConditionsList.map((cond, idx) => {
          const isExpanded = expandedIds.includes(cond.id);
          return (
            <ScrollReveal key={cond.id} animation="fade-up" delay={idx * 50}>
              <div
                className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                  isExpanded
                    ? 'border-[#E9C578] bg-[#071E16]/95 shadow-[0_8px_24px_rgba(4,20,15,0.7)]'
                    : 'border-[#E9C578]/25 bg-[#09271E]/80 hover:border-[#E9C578]/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleCondition(cond.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578]"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#123D2B] border border-[#E9C578]/30">
                      <Shield className="h-4 w-4 text-[#E9C578]" />
                    </div>
                    <div>
                      <h4 className="font-serif-festive text-lg font-bold text-[#FFFFFF]">
                        {cond.title}
                      </h4>
                      <p className="text-xs text-[#D9ECF5]/80 font-sans-festive line-clamp-1">
                        {cond.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#123D2B] border border-[#E9C578]/30 text-[#E9C578]">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E9C578]/15">
                    <p className="text-xs sm:text-sm text-[#D9ECF5]/90 font-sans-festive leading-relaxed mt-2.5">
                      {cond.details}
                    </p>

                    <ul className="mt-3.5 space-y-2 rounded-xl border border-[#E9C578]/15 bg-[#09271E]/90 p-4">
                      {cond.guidelines.map((g, gIdx) => (
                        <li
                          key={gIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#FFF4DF]"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#25A18E] shrink-0 mt-0.5" />
                          <span className="font-sans-festive">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};
