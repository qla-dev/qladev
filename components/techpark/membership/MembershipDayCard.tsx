import React from 'react';
import type { MembershipDay } from '../types';

interface MembershipDayCardProps {
  day: MembershipDay;
  selected: boolean;
  totalSpots: number;
  spotsLabel: string;
  closedLabel: string;
  onClick: () => void;
  lang: 'bs' | 'en';
}

export const MembershipDayCard: React.FC<MembershipDayCardProps> = ({
  day,
  selected,
  totalSpots,
  spotsLabel,
  closedLabel,
  onClick,
  lang,
}) => (
  <button
    onClick={onClick}
    className={`rounded-2xl border p-5 text-left transition-all ${
      selected ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_25px_rgba(37,99,235,0.18)]' : 'border-white/10 bg-white/5 hover:border-white/20'
    } ${day.closed ? 'opacity-70' : ''}`}
  >
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-lg font-bold">{lang === 'bs' ? day.labelBs : day.label}</div>
        <div className="text-xs text-gray-400 font-mono tracking-[0.16em] uppercase">{lang === 'bs' ? day.summaryBs : day.summary}</div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black">{day.closed ? '-' : totalSpots}</div>
        <div className="text-[11px] text-gray-500 font-mono uppercase tracking-[0.14em]">{day.closed ? closedLabel : spotsLabel}</div>
      </div>
    </div>
  </button>
);
