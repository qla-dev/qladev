import type { LucideIcon } from 'lucide-react';
import { Language } from '../../types';

export type TechnoparkRoute = '/technopark' | '/technopark/instructions' | '/technopark/membership' | '/technopark/sign-in';

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

export interface TechnoparkPageProps {
  lang: Language;
  onNavigate: (path: TechnoparkRoute) => void;
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
}

export interface MembershipDay {
  key: MembershipDayKey;
  label: string;
  labelBs: string;
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
