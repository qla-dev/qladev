import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-14">
    <div className="flex items-center gap-6 mb-6">
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono uppercase whitespace-nowrap">
        <span className="text-blue-600">/</span> {title}
      </h2>
      <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-grow opacity-50"></div>
    </div>
    <p className="max-w-3xl text-lg text-blue-100 font-mono leading-relaxed">{subtitle}</p>
  </div>
);
