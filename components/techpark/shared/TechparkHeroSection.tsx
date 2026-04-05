import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TechHeroBackdrop } from '../../TechHeroBackdrop';
import { TechparkSubnav } from './TechparkSubnav';
import type { TechparkRoute } from '../types';
import type { Language } from '../../../types';

interface TechparkHeroSectionProps {
  current: TechparkRoute;
  lang: Language;
  onNavigate: (path: TechparkRoute) => void;
  showSubnav?: boolean;
  badge: string;
  badgeIcon: LucideIcon;
  title: React.ReactNode;
  subtitle: string;
  rightContent: React.ReactNode;
  leftContent?: React.ReactNode;
  containerClassName?: string;
  gridClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const TechparkHeroSection: React.FC<TechparkHeroSectionProps> = ({
  current,
  lang,
  onNavigate,
  showSubnav = true,
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  rightContent,
  leftContent,
  containerClassName = 'relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 sm:pb-16 lg:pt-28 lg:pb-16',
  gridClassName = 'grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center',
  titleClassName = 'mt-6 text-5xl md:text-6xl font-black tracking-tight leading-none',
  subtitleClassName = 'mt-6 max-w-3xl text-lg text-gray-300 font-mono leading-relaxed border-l-2 border-blue-500 pl-6',
}) => (
  <section className="relative overflow-hidden border-b border-white/5 bg-qla-dark">
    <TechHeroBackdrop />
    <div className={containerClassName}>
      {showSubnav ? (
        <div className="mb-6">
          <TechparkSubnav current={current} lang={lang} onNavigate={onNavigate} />
        </div>
      ) : null}
      <div className={gridClassName}>
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-xs tracking-[0.24em] uppercase">
            <BadgeIcon className="w-4 h-4" />
            {badge}
          </div>
          <h1 className={titleClassName}>{title}</h1>
          <p className={subtitleClassName}>{subtitle}</p>
          {leftContent}
        </div>
        {rightContent}
      </div>
    </div>
  </section>
);
