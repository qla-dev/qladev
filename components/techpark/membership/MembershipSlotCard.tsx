import React from 'react';

interface MembershipSlotCardProps {
  label: string;
  count: number;
  tone: { label: string; classes: string };
  selected: boolean;
  disabled: boolean;
  description: string;
  spotsLabel: string;
  closedLabel: string;
  onClick: () => void;
}

export const MembershipSlotCard: React.FC<MembershipSlotCardProps> = ({
  label,
  count,
  tone,
  selected,
  disabled,
  description,
  spotsLabel,
  closedLabel,
  onClick,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-3xl border p-6 text-left transition-all ${
      selected ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_25px_rgba(37,99,235,0.2)]' : 'border-white/10 bg-white/5 hover:border-white/20'
    } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-xl font-bold">{label}</div>
        <div className="mt-2 text-sm text-gray-400 font-mono">{description}</div>
      </div>
      <span className={`inline-flex px-3 py-1 rounded-full border text-[11px] font-mono tracking-[0.14em] ${tone.classes}`}>
        {count === 0 ? closedLabel : tone.label}
      </span>
    </div>
    <div className="mt-6">
      <div className="flex items-center justify-between text-sm text-gray-300 font-mono mb-2">
        <span>{count}/15</span>
        <span>{spotsLabel}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" style={{ width: `${(count / 15) * 100}%` }}></div>
      </div>
    </div>
  </button>
);
