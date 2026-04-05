import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CrossSellPanelProps {
  badge: string;
  title: string;
  text: string;
  buttonLabel: string;
  onClick: () => void;
}

export const CrossSellPanel: React.FC<CrossSellPanelProps> = ({
  badge,
  title,
  text,
  buttonLabel,
  onClick,
}) => (
  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
    <div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{badge}</div>
    <div className="mt-2 text-xl font-black leading-tight">{title}</div>
    <p className="mt-2 text-sm text-blue-100/80 font-mono leading-relaxed">{text}</p>
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono text-xs tracking-[0.16em] uppercase transition-colors"
    >
      {buttonLabel}
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);
