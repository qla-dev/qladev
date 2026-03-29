import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface TechnoparkStatCardProps {
  value: React.ReactNode;
  label: React.ReactNode;
  subvalue?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export const TechnoparkStatCard: React.FC<TechnoparkStatCardProps> = ({
  value,
  label,
  subvalue,
  badge,
  icon: Icon,
  className = '',
}) => (
  <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`.trim()}>
    {Icon ? (
      <>
        <div className={`flex min-h-[11.5rem] flex-col justify-center ${badge ? 'pb-20' : ''}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-3xl font-black tracking-tight">{value}</div>
              {subvalue ? <div className="mt-1 text-sm text-gray-500 line-through font-mono">{subvalue}</div> : null}
            </div>
            <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300">
              <Icon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-sm font-mono uppercase tracking-[0.16em] text-gray-400">{label}</div>
        </div>
        {badge ? (
          <div className="pointer-events-none absolute bottom-6 left-1/2 inline-flex max-w-[calc(100%-2rem)] -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-[11px] font-mono uppercase tracking-[0.14em] leading-none text-emerald-300">
            {badge}
          </div>
        ) : null}
      </>
    ) : (
      <>
        <div className={`min-h-[10rem] flex flex-col justify-center text-left ${badge ? 'pb-20' : ''}`}>
          <div className="text-3xl font-black">{value}</div>
          {subvalue ? <div className="mt-1 text-sm text-gray-500 line-through font-mono">{subvalue}</div> : null}
          <div className="mt-2 text-sm font-mono uppercase tracking-[0.16em] text-gray-400">{label}</div>
        </div>
        {badge ? (
          <div className="pointer-events-none absolute bottom-6 left-1/2 inline-flex max-w-[calc(100%-2rem)] -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-[11px] font-mono uppercase tracking-[0.14em] leading-none text-emerald-300">
            {badge}
          </div>
        ) : null}
      </>
    )}
  </div>
);
