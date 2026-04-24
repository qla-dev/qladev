import React from 'react';
import type { Language } from '../../../types';
import type { TechparkRoute } from '../types';
import { TechparkSubnav } from './TechparkSubnav';

interface TechparkSubnavSectionProps {
  current: TechparkRoute;
  lang: Language;
  onNavigate: (path: TechparkRoute) => void;
  title?: string;
  subtitle?: React.ReactNode;
}

export const TechparkSubnavSection: React.FC<TechparkSubnavSectionProps> = ({
  current,
  lang,
  onNavigate,
  title,
  subtitle,
}) => (
  <section className="relative overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 lg:pt-28 lg:pb-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {title ? (
          <div className="order-2 flex min-w-0 items-center gap-4 xl:order-1 xl:flex-1">
            <h1 className="shrink-0 text-3xl md:text-4xl font-black text-white tracking-tight font-mono uppercase whitespace-nowrap">
              <span className="techpark-accent-slash">/</span> {title}
            </h1>
            <div className="techpark-accent-line hidden h-px flex-1 opacity-70 xl:block"></div>
          </div>
        ) : null}
        <div className={title ? 'order-1 xl:order-2 xl:flex xl:justify-end' : ''}>
          <TechparkSubnav current={current} lang={lang} onNavigate={onNavigate} />
        </div>
      </div>
      {subtitle ? (
        <div className="mt-6 w-full text-base text-blue-100 font-mono leading-relaxed md:text-lg">
          {subtitle}
        </div>
      ) : null}
    </div>
  </section>
);
