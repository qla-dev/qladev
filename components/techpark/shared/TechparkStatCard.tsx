import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TechparkStatCardProps {
  value: React.ReactNode;
  label: React.ReactNode;
  subvalue?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export const TechparkStatCard: React.FC<TechparkStatCardProps> = ({
  value,
  label,
  subvalue,
  badge,
  icon: Icon,
  className = '',
}) => (
  <div className={`relative aspect-square rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:aspect-auto sm:p-5 lg:p-6 ${className}`.trim()}>
    {Icon ? (
      <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/20 text-blue-300 sm:bottom-5 sm:right-5 sm:h-12 sm:w-12">
        <Icon className="h-[1.125rem] w-[1.125rem] sm:h-6 sm:w-6" />
      </div>
    ) : null}

    <div
      className={`flex h-full min-h-0 sm:min-h-[11.5rem] flex-col justify-between ${
        badge ? 'pb-14 sm:pb-16' : ''
      } ${Icon ? 'pr-12 sm:pr-20' : ''}`}
    >
      <div className="pt-2 sm:pt-6">
        <div className="text-[1.42rem] sm:text-[1.7rem] lg:text-[1.85rem] xl:text-[2rem] font-black tracking-tight leading-none whitespace-nowrap">
          {value}
        </div>
        {subvalue ? <div className="mt-1 text-xs sm:text-sm text-gray-500 line-through font-mono">{subvalue}</div> : null}
      </div>

      <div className="mt-3 pb-0.5">
        <div className="mb-2 h-px w-8 bg-gradient-to-r from-blue-500/70 to-transparent sm:mb-3 sm:w-10"></div>
        <div className="max-w-[8.25rem] text-[10px] sm:max-w-[11rem] sm:text-sm font-mono uppercase tracking-[0.13em] sm:tracking-[0.16em] leading-tight text-gray-400">
          {label}
        </div>
      </div>
    </div>

    {badge ? (
      <div className="pointer-events-none absolute bottom-4 left-1/2 inline-flex max-w-[calc(100%-2rem)] -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] sm:bottom-6 sm:px-4 sm:text-[11px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.14em] leading-none text-emerald-300">
        {badge}
      </div>
    ) : null}
  </div>
);
