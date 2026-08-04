import React from 'react';

export const TechHeroBackdrop: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.45)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_15%_88%,rgba(79,70,229,0.10),transparent_32%)]" />
  </div>
);
