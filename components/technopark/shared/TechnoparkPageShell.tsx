import React from 'react';
import { TechHeroBackdrop } from '../../TechHeroBackdrop';

interface TechnoparkPageShellProps {
  children: React.ReactNode;
  showBackdrop?: boolean;
}

export const TechnoparkPageShell: React.FC<TechnoparkPageShellProps> = ({ children, showBackdrop = false }) => (
  <div className="relative overflow-hidden bg-qla-dark text-white">
    {showBackdrop ? (
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <TechHeroBackdrop />
      </div>
    ) : null}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    <div className="relative z-10">{children}</div>
  </div>
);
