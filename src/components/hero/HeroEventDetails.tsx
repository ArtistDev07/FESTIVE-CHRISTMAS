import React from 'react';
import { Calendar, Clock, MapPin, Award } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig.ts';

export const HeroEventDetails: React.FC = () => {
  return (
    <div
      className="hero-details-strip mx-auto mt-7 flex w-full max-w-4xl flex-wrap items-center justify-center gap-3 sm:gap-4 px-3"
      role="region"
      aria-label="Event Logistics and Details"
    >
      {/* Date Pill */}
      <div className="hero-glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#FFF4DF] shadow-sm transition-all sm:text-sm">
        <Calendar className="h-4 w-4 text-[#E9C578] shrink-0" aria-hidden="true" />
        <span>{eventConfig.eventDate}</span>
      </div>

      {/* Time Pill */}
      <div className="hero-glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#FFF4DF] shadow-sm transition-all sm:text-sm">
        <Clock className="h-4 w-4 text-[#E9C578] shrink-0" aria-hidden="true" />
        <span>{eventConfig.eventTime}</span>
      </div>

      {/* Location / Format Pill */}
      <div className="hero-glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#FFF4DF] shadow-sm transition-all sm:text-sm">
        <MapPin className="h-4 w-4 text-[#EF4050] shrink-0" aria-hidden="true" />
        <span>{eventConfig.eventLocation}</span>
      </div>

      {/* Total Prize Pool Badge */}
      <div className="hero-glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-[#E9C578] shadow-sm transition-all sm:text-sm">
        <Award className="h-4 w-4 text-[#E9C578] shrink-0" aria-hidden="true" />
        <span className="font-semibold">{eventConfig.totalPrizePool}</span>
      </div>
    </div>
  );
};
