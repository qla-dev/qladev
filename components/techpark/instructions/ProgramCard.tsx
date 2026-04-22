import React, { useState } from 'react';
import { ArrowRight, CalendarDays, Clock3, ExternalLink, FileText, Lock, Shield, Users } from 'lucide-react';
import { getProgramScheduleBadgeLabel, getTrackScheduleTimeLabel } from '../programSchedule';
import type { Program, ProgramLevel } from '../types';

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  isBs: boolean;
  groupSizeLabel: string;
  under18Label: string;
  beginnerLabel: string;
  advancedLabel: string;
  agendaButtonLabel: string;
  agendaButtonLabelMobile: string;
  applyButtonLabel: string;
  applyButtonLabelMobile: string;
  activeLevel: ProgramLevel;
  onChooseTrack: (programId: string, level: 'beginner' | 'advanced') => void;
  onOpenAgenda: (programId: string, level: 'beginner' | 'advanced') => void;
}

const getScheduleParts = (label: string) =>
  label
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean);

const formatMainScheduleLabel = (label: string, isBs: boolean) => {
  const firstPart = getScheduleParts(label)[0] ?? label;

  if (!isBs) return firstPart;

  return firstPart.replace(/\s*[-–—]\s*/g, ' i ');
};

const getTrackScheduleLabel = (programId: string, level: ProgramLevel, isBs: boolean) => {
  if (programId === '3d-modeling') {
    return level === 'beginner' ? '17:30-19:00' : '19:30-21:00';
  }

  return isBs ? 'Uskoro satnica' : 'Time coming soon';
};

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  isSelected,
  isBs,
  groupSizeLabel,
  under18Label,
  beginnerLabel,
  advancedLabel,
  agendaButtonLabel,
  agendaButtonLabelMobile,
  applyButtonLabel,
  applyButtonLabelMobile,
  activeLevel,
  onChooseTrack,
  onOpenAgenda,
}) => {
  const Icon = program.icon;
  const [isTutorHovered, setIsTutorHovered] = useState(false);
  const tutorLabels = {
    title: isBs ? 'Mentor' : 'Tutor',
    profile: 'LinkedIn',
    blocked: isBs ? 'Uskoro' : 'Coming soon',
  };
  const tutorTitle = isBs ? program.tutor.titleBs : program.tutor.title;
  const hasTutorLink = Boolean(program.tutor.link);
  const mainScheduleLabel = getProgramScheduleBadgeLabel(program, isBs);
  const beginnerTrackScheduleLabel = getTrackScheduleTimeLabel(program.id, 'beginner', isBs);
  const advancedTrackScheduleLabel = getTrackScheduleTimeLabel(program.id, 'advanced', isBs);
  const totalEnrollment = program.enrolled.beginner + program.enrolled.advanced;
  const totalSeats = program.seats * 2;

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
      className={`group/card rounded-3xl border p-4 sm:p-5 lg:p-7 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_25px_rgba(37,99,235,0.16)]'
          : isTutorHovered
            ? 'border-white/10 bg-white/5'
            : 'border-white/10 bg-white/5 hover:border-blue-500 hover:bg-blue-600/10 hover:shadow-[0_0_25px_rgba(37,99,235,0.16)] focus-visible:border-blue-500 focus-visible:bg-blue-600/10 focus-visible:shadow-[0_0_25px_rgba(37,99,235,0.16)] focus-visible:outline-none'
      }`}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]">
                <Icon className="h-7 w-7 shrink-0" />
              </div>
              <h3 className="min-w-0 text-2xl font-bold tracking-tight">{isBs ? program.titleBs : program.title}</h3>
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

        <p className="text-sm leading-relaxed text-gray-300 font-mono w-full">{isBs ? program.descriptionBs : program.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-blue-300">
            <CalendarDays className="w-3.5 h-3.5 text-blue-300" />
            {mainScheduleLabel}
          </span>
          <span
            title={groupSizeLabel}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-gray-300"
          >
            <Users className="w-3.5 h-3.5 text-blue-300" />
            {totalEnrollment}/{totalSeats}
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-gray-300">
            <Shield className="w-3.5 h-3.5 text-blue-300" />
            {under18Label}
          </span>
        </div>

        {hasTutorLink ? (
          <a
            href={program.tutor.link ?? undefined}
            target="_blank"
            rel="noreferrer noopener"
            onMouseEnter={() => setIsTutorHovered(true)}
            onMouseLeave={() => setIsTutorHovered(false)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={program.tutor.image}
                alt={program.tutor.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-none"
              />
              <div className="min-w-0">
                <div className="text-[11px] font-mono tracking-[0.16em] text-blue-400 uppercase">{tutorLabels.title}</div>
                <div className="mt-1 truncate text-lg font-bold">{program.tutor.name}</div>
                <p className="text-sm text-gray-300 font-mono">{tutorTitle}</p>
              </div>
            </div>

            <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-white transition-colors group-hover:border-blue-500 group-hover:bg-blue-500/20">
              {tutorLabels.profile}
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        ) : (
          <div
            className="rounded-2xl border border-white/10 bg-black/40 p-4"
            onMouseEnter={() => setIsTutorHovered(true)}
            onMouseLeave={() => setIsTutorHovered(false)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={program.tutor.image}
                  alt={program.tutor.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-none"
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-[0.16em] text-blue-400 uppercase">{tutorLabels.title}</div>
                  <div className="mt-1 truncate text-lg font-bold">{program.tutor.name}</div>
                  <p className="text-sm text-gray-300 font-mono">{tutorTitle}</p>
                </div>
              </div>

              <button
                type="button"
                aria-disabled="true"
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-gray-400 cursor-not-allowed"
              >
                {tutorLabels.blocked}
                <Lock className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transition-colors duration-300 group-hover/card:via-blue-500 sm:mt-6"></div>

      <div className="mt-5 grid gap-4 sm:mt-6 md:grid-cols-2">
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-blue-300">
              <Clock3 className="w-3.5 h-3.5 text-blue-300" />
              {beginnerTrackScheduleLabel}
            </span>
            <span
              title={groupSizeLabel}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-gray-300"
            >
              <Users className="w-3.5 h-3.5 text-blue-300" />
              {program.enrolled.beginner}/{program.seats}
            </span>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-black/40 p-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
            <div className="text-xs font-mono tracking-[0.16em] text-blue-400 uppercase">{beginnerLabel}</div>
            <p className="mt-2 text-sm text-gray-300 font-mono leading-relaxed">{isBs ? program.beginnerFocusBs : program.beginnerFocus}</p>
            <div className="mt-auto flex flex-wrap justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenAgenda(program.id, 'beginner');
                }}
                className="mr-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-white transition-colors hover:border-blue-500 hover:bg-blue-500/20"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="sm:hidden">{agendaButtonLabelMobile}</span>
                <span className="hidden sm:inline">{agendaButtonLabel}</span>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onChooseTrack(program.id, 'beginner');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-white transition-colors hover:bg-blue-700"
              >
                <span className="sm:hidden">{applyButtonLabelMobile}</span>
                <span className="hidden sm:inline">{applyButtonLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transition-colors duration-300 group-hover/card:via-blue-500 md:hidden"></div>
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-blue-300">
              <Clock3 className="w-3.5 h-3.5 text-blue-300" />
              {advancedTrackScheduleLabel}
            </span>
            <span
              title={groupSizeLabel}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 text-xs font-mono tracking-[0.14em] uppercase text-gray-300"
            >
              <Users className="w-3.5 h-3.5 text-blue-300" />
              {program.enrolled.advanced}/{program.seats}
            </span>
          </div>
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-black/40 p-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10">
            <div className="text-xs font-mono tracking-[0.16em] text-blue-400 uppercase">{advancedLabel}</div>
            <p className="mt-2 text-sm text-gray-300 font-mono leading-relaxed">{isBs ? program.advancedFocusBs : program.advancedFocus}</p>
            <div className="mt-auto flex flex-wrap justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenAgenda(program.id, 'advanced');
                }}
                className="mr-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-white transition-colors hover:border-blue-500 hover:bg-blue-500/20"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="sm:hidden">{agendaButtonLabelMobile}</span>
                <span className="hidden sm:inline">{agendaButtonLabel}</span>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onChooseTrack(program.id, 'advanced');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-white transition-colors hover:bg-blue-700"
              >
                <span className="sm:hidden">{applyButtonLabelMobile}</span>
                <span className="hidden sm:inline">{applyButtonLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
