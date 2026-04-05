import React from 'react';
import { Users } from 'lucide-react';
import type { Program, ProgramLevel } from '../types';

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  isBs: boolean;
  groupSizeLabel: string;
  under18Label: string;
  beginnerLabel: string;
  advancedLabel: string;
  activeLevel: ProgramLevel;
  onChooseTrack: (programId: string, level: 'beginner' | 'advanced') => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  isSelected,
  isBs,
  groupSizeLabel,
  under18Label,
  beginnerLabel,
  advancedLabel,
  activeLevel,
  onChooseTrack,
}) => {
  const Icon = program.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onChooseTrack(program.id, activeLevel)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onChooseTrack(program.id, activeLevel);
        }
      }}
      className={`rounded-3xl border p-7 transition-all cursor-pointer ${
        isSelected ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_25px_rgba(37,99,235,0.16)]' : 'border-white/10 bg-white/5 hover:border-blue-500/35'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]">
              <Icon className="h-7 w-7 shrink-0" />
            </div>
            <h3 className="min-w-0 text-2xl font-bold tracking-tight">{isBs ? program.titleBs : program.title}</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 font-mono max-w-2xl">{isBs ? program.descriptionBs : program.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-blue-300">
              {isBs ? program.scheduleBs : program.schedule}
            </span>
            <span
              title={groupSizeLabel}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-gray-300"
            >
              <Users className="w-3.5 h-3.5 text-blue-300" />
              0/{program.seats}
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-gray-300">
              {under18Label}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 lg:min-w-[18rem]">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onChooseTrack(program.id, 'beginner');
            }}
            className="px-3 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono text-[11px] sm:text-xs tracking-[0.1em] sm:tracking-[0.16em] uppercase whitespace-nowrap transition-colors"
          >
            {beginnerLabel}
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onChooseTrack(program.id, 'advanced');
            }}
            className="px-3 py-4 rounded-2xl border border-white/15 hover:border-blue-500 text-white font-bold font-mono text-[11px] sm:text-xs tracking-[0.1em] sm:tracking-[0.16em] uppercase whitespace-nowrap transition-colors"
          >
            {advancedLabel}
          </button>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="text-xs font-mono tracking-[0.16em] text-blue-400 uppercase">{beginnerLabel}</div>
          <p className="mt-2 text-sm text-gray-300 font-mono leading-relaxed">{isBs ? program.beginnerFocusBs : program.beginnerFocus}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
          <div className="text-xs font-mono tracking-[0.16em] text-blue-400 uppercase">{advancedLabel}</div>
          <p className="mt-2 text-sm text-gray-300 font-mono leading-relaxed">{isBs ? program.advancedFocusBs : program.advancedFocus}</p>
        </div>
      </div>
    </div>
  );
};
