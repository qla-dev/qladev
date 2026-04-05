import React from 'react';
import type { MembershipDay } from '../types';

interface MembershipDayCardProps {
  day: MembershipDay;
  selected: boolean;
  totalSpots: number;
  closedLabel: string;
  onClick: () => void;
  lang: 'bs' | 'en';
}

export const MembershipDayCard: React.FC<MembershipDayCardProps> = ({
  day,
  selected,
  totalSpots,
  closedLabel,
  onClick,
  lang,
}) => (
  <button
    onClick={onClick}
    className={`h-full w-full rounded-2xl border p-4 text-left transition-all ${
      selected ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_25px_rgba(37,99,235,0.18)]' : 'border-white/10 bg-white/5 hover:border-white/20'
    } ${day.closed ? 'opacity-70' : ''}`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-base font-black leading-none sm:text-lg">
          {lang === 'bs' ? day.shortLabelBs : day.shortLabel}
        </div>
        <div className="mt-2 truncate text-[10px] text-gray-400 font-mono tracking-[0.18em] uppercase">
          {day.closed ? closedLabel : lang === 'bs' ? day.summaryBs : day.summary}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-2xl font-black leading-none">{day.closed ? '-' : totalSpots}</div>
      </div>
    </div>
  </button>
);
