export const BOOTCAMP_PROGRAMS = [
  { id: 'web-dev', title: 'Web Dev', titleBs: 'Web Dev' },
  { id: '3d-modeling', title: '3D Modeling and 3D Print', titleBs: '3D Modeling and 3D Print' },
  { id: 'app-dev', title: 'App Dev', titleBs: 'App Dev' },
  { id: 'ui-ux', title: 'UI/UX Graphic Design', titleBs: 'UI/UX Graphic Design' },
  { id: 'ai-program', title: 'AI Program', titleBs: 'AI Program' },
  { id: 'arduino-robotics', title: 'Arduino and Robotics', titleBs: 'Arduino i Robotika' },
  { id: 'game-dev', title: 'Game Dev', titleBs: 'Game Dev' },
  { id: 'roblox-game-dev', title: 'Roblox Game Dev', titleBs: 'Roblox Game Dev' },
  { id: 'video-editing', title: 'Video Editing', titleBs: 'Video Editing' },
];

const BOOTCAMP_PROGRAM_MAP = new Map(BOOTCAMP_PROGRAMS.map((program) => [program.id, program]));
const BOOTCAMP_PROGRAM_PREFIXES = [
  '/techpark/boot-camp/',
  '/techpark/instructions/',
  '/technopark/boot-camp/',
  '/technopark/instructions/',
];

export const getBootCampProgramById = (programId) => BOOTCAMP_PROGRAM_MAP.get(programId) ?? null;
export const isBootCampProgramId = (programId) => BOOTCAMP_PROGRAM_MAP.has(programId);
export const getBootCampProgramPath = (programId) => `/techpark/boot-camp/${programId}`;

export const getBootCampProgramIdFromPath = (pathname) => {
  for (const prefix of BOOTCAMP_PROGRAM_PREFIXES) {
    if (!pathname.startsWith(prefix)) {
      continue;
    }

    const [candidate] = pathname.slice(prefix.length).split('/');

    if (candidate && isBootCampProgramId(candidate)) {
      return candidate;
    }
  }

  return null;
};

export const getBootCampProgramIdFromSearch = (search) => {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const preferred = params.get('program') ?? params.get('camp');

  if (preferred && isBootCampProgramId(preferred)) {
    return preferred;
  }

  for (const [key, value] of params.entries()) {
    if (isBootCampProgramId(key)) {
      return key;
    }

    if ((key === 'program' || key === 'camp') && value && isBootCampProgramId(value)) {
      return value;
    }
  }

  return null;
};

export const getBootCampProgramMeta = (lang, programId) => {
  const program = getBootCampProgramById(programId);

  if (!program) {
    return null;
  }

  if (lang === 'bs') {
    return {
      title: `qla.dev Techpark - ${program.titleBs} boot-camp prijava`,
      description: `Otvori direktnu prijavu za ${program.titleBs} program unutar qla.dev Techparka. Pregledaj program, Beginner i Advanced put, mentora i uđi odmah u prijavni modal.`,
    };
  }

  return {
    title: `qla.dev Techpark - ${program.title} Boot-camp Enrollment`,
    description: `Open the direct enrollment flow for the ${program.title} program inside qla.dev Techpark. Review the program, compare Beginner and Advanced tracks, and land straight in the application modal.`,
  };
};
