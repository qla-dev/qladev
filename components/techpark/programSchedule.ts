import type { Program, ProgramLevel } from './types';

const getScheduleParts = (label: string) =>
  label
    .split('·')
    .map((part) => part.trim())
    .filter(Boolean);

export const getProgramScheduleDaysLabel = (program: Program, isBs: boolean) => {
  const scheduleLabel = isBs ? program.scheduleBs : program.schedule;
  return getScheduleParts(scheduleLabel)[0] ?? scheduleLabel;
};

export const getProgramScheduleBadgeLabel = (program: Program, isBs: boolean) => {
  const dayLabel = getProgramScheduleDaysLabel(program, isBs);

  if (!isBs) return dayLabel;

  return dayLabel.replace(/\s*[-–—]\s*/g, ' i ');
};

export const getTrackScheduleTimeLabel = (programId: string, level: ProgramLevel, isBs: boolean) => {
  if (programId === '3d-modeling') {
    return level === 'beginner' ? '17:30-19:00' : '19:30-21:00';
  }

  return isBs ? 'Uskoro' : 'Coming soon';
};

export const getTrackScheduleFullLabel = (program: Program, level: ProgramLevel, isBs: boolean) =>
  `${getProgramScheduleDaysLabel(program, isBs)} · ${getTrackScheduleTimeLabel(program.id, level, isBs)}`;
