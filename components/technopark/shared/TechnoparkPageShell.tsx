import React from 'react';

export const TechnoparkPageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative bg-black text-white pt-16 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    <div className="relative z-10">{children}</div>
  </div>
);
