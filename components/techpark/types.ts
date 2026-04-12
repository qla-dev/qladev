import type { LucideIcon } from 'lucide-react';
import { Language } from '../../types';

export type TechparkRoute =
  | '/techpark'
  | '/techpark/boot-camp'
  | '/techpark/membership'
  | '/techpark/line-follower-hackathone'
  | '/techpark/sign-in';

export type MembershipDayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type MembershipSlotKey = 'slot1' | 'slot2' | 'slot3' | 'slot4';
export type ProgramLevel = 'beginner' | 'advanced';

export interface TechparkPageProps {
  lang: Language;
  onNavigate: (path: TechparkRoute) => void;
}

export interface Amenity {
  title: string;
  titleBs: string;
  description: string;
  descriptionBs: string;
  icon: LucideIcon;
}

export interface Program {
  id: string;
  title: string;
  titleBs: string;
  description: string;
  descriptionBs: string;
  schedule: string;
  scheduleBs: string;
  beginnerFocus: string;
  beginnerFocusBs: string;
  advancedFocus: string;
  advancedFocusBs: string;
  seats: number;
  icon: LucideIcon;
  tutor: {
    name: string;
    title: string;
    titleBs: string;
    image: string;
    link: string | null;
  };
}

export interface ProgramAgendaWeek {
  id: string;
  label: string;
  labelBs: string;
  title: string;
  titleBs: string;
  summary?: string;
  summaryBs?: string;
  points: string[];
  pointsBs: string[];
}

export interface ProgramAgenda {
  programId: string;
  level: ProgramLevel;
  status: 'ready' | 'coming-soon';
  overview: string;
  overviewBs: string;
  weeks: ProgramAgendaWeek[];
}

export interface MembershipDay {
  key: MembershipDayKey;
  label: string;
  labelBs: string;
  shortLabel: string;
  shortLabelBs: string;
  summary: string;
  summaryBs: string;
  closed?: boolean;
}

export interface MembershipSlot {
  key: MembershipSlotKey;
  label: string;
}

export interface FormStatus {
  type: 'success' | 'error';
  message: string;
}
