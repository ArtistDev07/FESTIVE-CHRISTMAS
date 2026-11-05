import React from 'react';
import { RoleFilterType } from '../../types/experts.ts';
import { Users, BookOpen, Scale } from 'lucide-react';

interface ExpertRoleFilterProps {
  activeRole: RoleFilterType;
  onSelectRole: (role: RoleFilterType) => void;
  counts: {
    all: number;
    mentor: number;
    judge: number;
  };
}

export const ExpertRoleFilter: React.FC<ExpertRoleFilterProps> = ({
  activeRole,
  onSelectRole,
  counts,
}) => {
  const options: { id: RoleFilterType; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      label: 'Everyone',
      icon: <Users className="h-3.5 w-3.5" />,
      count: counts.all,
    },
    {
      id: 'mentor',
      label: 'Mentors',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      count: counts.mentor,
    },
    {
      id: 'judge',
      label: 'Judges',
      icon: <Scale className="h-3.5 w-3.5" />,
      count: counts.judge,
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter experts by role"
      className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#061C14]/90 border border-[#E9C578]/25 backdrop-blur-md shadow-[0_4px_20px_rgba(4,20,15,0.4)]"
    >
      {options.map((option) => {
        const isActive = activeRole === option.id;
        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${option.id}`}
            id={`tab-${option.id}`}
            type="button"
            onClick={() => onSelectRole(option.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C578] ${
              isActive
                ? 'bg-gradient-to-r from-[#184833] to-[#123D2B] text-[#FFFFFF] border border-[#E9C578]/50 shadow-[0_2px_12px_rgba(233,197,120,0.2)] font-semibold'
                : 'text-[#D9ECF5]/80 hover:text-[#FFFFFF] hover:bg-[#123D2B]/50'
            }`}
          >
            <span className={isActive ? 'text-[#E9C578]' : 'text-[#D9ECF5]/60'}>
              {option.icon}
            </span>
            <span>{option.label}</span>
            <span
              className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-[#E9C578]/20 text-[#FFEA9F]'
                  : 'bg-white/5 text-[#D9ECF5]/60'
              }`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
