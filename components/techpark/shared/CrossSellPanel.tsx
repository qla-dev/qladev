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
  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
    <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{badge}</div>
    <div className="mt-2 text-lg font-black leading-tight sm:text-xl">{title}</div>
    <p className="mt-2 text-xs text-blue-100/80 font-mono leading-relaxed sm:text-sm">{text}</p>
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono text-[11px] tracking-[0.16em] uppercase transition-colors sm:text-xs"
    >
      {buttonLabel}
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);
