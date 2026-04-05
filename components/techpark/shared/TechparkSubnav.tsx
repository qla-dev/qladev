import React from 'react';
import type { Language } from '../../../types';
import type { TechparkRoute } from '../types';

interface TechparkSubnavProps {
  current: TechparkRoute;
  lang: Language;
  onNavigate: (path: TechparkRoute) => void;
}

export const TechparkSubnav: React.FC<TechparkSubnavProps> = ({ current, lang, onNavigate }) => {
  const items = [
    { path: '/techpark' as const, label: lang === 'bs' ? 'PREGLED' : 'OVERVIEW' },
    { path: '/techpark/boot-camp' as const, label: 'BOOT-CAMP' },
    { path: '/techpark/membership' as const, label: lang === 'bs' ? 'CLANSTVO' : 'MEMBERSHIP' },
  ];

  return (
    <div className="w-full py-2">
      <div className="overflow-x-auto px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex min-w-max flex-nowrap gap-3 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold font-mono tracking-[0.2em] transition-all ${
                current === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
