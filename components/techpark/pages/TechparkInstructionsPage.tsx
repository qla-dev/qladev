import React, { useEffect, useState } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { getProgramAgenda } from '../agenda';
import { programs } from '../data';
import { ProgramCard } from '../instructions/ProgramCard';
import { getProgramScheduleDaysLabel, getTrackScheduleTimeLabel } from '../programSchedule';
import { CrossSellPanel } from '../shared/CrossSellPanel';
import { FormStatusMessage } from '../shared/FormStatusMessage';
import { SplitActionModal } from '../shared/SplitActionModal';
import { TechparkPageShell } from '../shared/TechparkPageShell';
import { TechparkSubnavSection } from '../shared/TechparkSubnavSection';
import type { FormStatus, ProgramLevel, TechparkPageProps } from '../types';

const PROGRAM_START_DATE = new Date(2026, 5, 1, 0, 0, 0, 0);

const getCountdownParts = (targetDate: Date) => {
  const diff = Math.max(targetDate.getTime() - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const getBosnianCountdownLabel = (unit: 'days' | 'hours' | 'minutes' | 'seconds', value: number) => {
  const mod10 = value % 10;
  const mod100 = value % 100;
  const fewForm = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);

  if (unit === 'days') return value === 1 ? 'DAN' : 'DANA';
  if (unit === 'hours') return value === 1 ? 'SAT' : fewForm ? 'SATA' : 'SATI';
  if (unit === 'minutes') return value === 1 ? 'MINUTA' : fewForm ? 'MINUTE' : 'MINUTA';
  return value === 1 ? 'SEKUNDA' : fewForm ? 'SEKUNDE' : 'SEKUNDI';
};

const getEnglishCountdownLabel = (unit: 'days' | 'hours' | 'minutes' | 'seconds', value: number) => {
  if (unit === 'days') return value === 1 ? 'DAY' : 'DAYS';
  if (unit === 'hours') return value === 1 ? 'HOUR' : 'HOURS';
  if (unit === 'minutes') return value === 1 ? 'MIN' : 'MINS';
  return value === 1 ? 'SEC' : 'SECS';
};

export const TechparkInstructionsPage: React.FC<TechparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0].id);
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel>('beginner');
  const [formData, setFormData] = useState({ fullName: '', age: '', guardianContact: '', email: '', motivation: '' });
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [programStartDate] = useState(() => PROGRAM_START_DATE);
  const [countdown, setCountdown] = useState(() => getCountdownParts(programStartDate));

  const selectedProgram = programs.find((program) => program.id === selectedProgramId) ?? programs[0];
  const selectedAgenda = getProgramAgenda(selectedProgramId, selectedLevel);
  const selectedProgramEnrollment = selectedProgram.enrolled[selectedLevel];
  const selectedProgramScheduleDaysLabel = getProgramScheduleDaysLabel(selectedProgram, isBs);
  const selectedProgramScheduleTimeLabel = getTrackScheduleTimeLabel(selectedProgram.id, selectedLevel, isBs);
  const selectedProgramPrice = selectedLevel === 'beginner' ? '180 KM' : '300 KM';
  const selectedProgramOldPrice = selectedLevel === 'beginner' ? '200 KM' : undefined;
  const selectedProgramDiscount = selectedLevel === 'beginner'
    ? (isBs ? '10% POPUST DO 1. MAJA' : '10% OFF BEFORE MAY 1')
    : undefined;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts(programStartDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [programStartDate]);

  const labels = {
    sectionTitle: 'BOOT-CAMP',
    sectionSubtitle: isBs ? (
      <div className="space-y-4">
        <p>
          Boot-camp je simulacija stvarnog rada u modernim tehnološkim kompanijama: učesnici se dijele u timove od po
          3 člana i kroz mentorisani rad prolaze kroz procese razvoja proizvoda, od ideje i planiranja do izrade
          funkcionalnog krajnjeg proizvoda.
        </p>
        <p>
          Svaki tim radi kao mini tech ekipa, sa jasnim ulogama, zadacima, rokovima, feedbackom i prezentacijom
          rezultata, tako da znanje ne ostane samo teorija nego završi kao konkretan output.
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        <p>
          Boot-camp is not a classic course, but a simulation of real work inside modern tech companies: participants
          are split into teams of 3 and move through mentored product-development processes, from idea and planning to
          a functional end product.
        </p>
        <p>
          Each team works like a mini tech unit with clear roles, tasks, deadlines, feedback, and result
          presentations, so the learning does not stay theoretical but ends in concrete output.
        </p>
      </div>
    ),
    programsTitle: 'BOOT-CAMP',
    programsSubtitle: isBs ? 'Boot-camp simulira stvaran product rad u timovima od 3 člana, sa ciljem da svaka grupa dođe do konkretnog krajnjeg proizvoda.' : 'Boot-camp simulates real product work in teams of 3, with the goal that each group reaches a concrete end product.',
    joinTitle: isBs ? 'PRIJAVA NA BOOT-CAMP' : 'BOOT-CAMP ENROLLMENT',
    joinButton: isBs ? 'POŠALJI PRIJAVU' : 'SEND ENROLLMENT',
    beginner: 'BEGINNER · 3M',
    advanced: 'ADVANCED · 6M',
    selectedTrack: isBs ? 'IZABRANI PUT' : 'SELECTED TRACK',
    groupSize: isBs ? 'maks. po grupi' : 'max per group',
    under18: 'u18',
    name: isBs ? 'Ime i prezime' : 'Full name',
    age: isBs ? 'Godine' : 'Age',
    guardian: isBs ? 'Roditelj / kontakt telefon' : 'Guardian / contact phone',
    motivation: isBs ? 'Šta želiš naučiti?' : 'What do you want to learn?',
    modalTitle: isBs ? 'BOOT-CAMP PRIJAVA' : 'BOOT-CAMP ENROLLMENT',
    selectedProgram: isBs ? 'Odabrani program' : 'Selected program',
    programDescription: isBs ? 'Opis programa' : 'Program description',
    enrolled: isBs ? 'upisano / limit' : 'enrolled / cap',
    schedule: isBs ? 'Raspored' : 'Schedule',
    scheduleDays: isBs ? 'Dani' : 'Days',
    scheduleDaysSubtitle: isBs ? 'Unutar Techparka' : 'Inside Techpark',
    scheduleTime: isBs ? 'Satnica' : 'Time',
    programPriceLabel: isBs ? 'mjesečna cijena' : 'monthly price',
    crossSellBadge: isBs ? 'OPEN SPACE BONUS' : 'OPEN SPACE BONUS',
    crossSellTitle: isBs ? 'Dodaj open space uz 50% popusta.' : 'Add open space with 50% off.',
    crossSellText: isBs ? 'Ako uz program želiš i dnevni boravak za rad, druženje ili gaming, open space membership dobijaš uz dodatni bundle popust.' : 'If you also want daytime space for building, hanging out, or gaming, you can add open-space membership with an extra bundle discount.',
    crossSellButton: isBs ? 'OTVORI OPEN SPACE' : 'OPEN SPACE OFFER',
    close: isBs ? 'Zatvori' : 'Close',
    agendaButton: isBs ? 'PLAN I PROGRAM' : 'PROGRAM AGENDA',
    agendaButtonMobile: isBs ? 'PROGRAM' : 'AGENDA',
    applyButton: isBs ? 'PRIJAVI SE' : 'APPLY NOW',
    applyButtonMobile: isBs ? 'PRIJAVA' : 'APPLY',
    agendaTitle: isBs ? 'PLAN I PROGRAM' : 'PROGRAM AGENDA',
    agendaOverview: isBs ? 'Pregled puta' : 'Track overview',
    agendaTimeline: isBs ? 'Sedmični plan' : 'Weekly agenda',
    agendaReady: isBs ? 'Detaljan plan' : 'Detailed agenda',
    agendaSoon: isBs ? 'Agenda uskoro' : 'Agenda coming soon',
    agendaStart: isBs ? 'Početak' : 'Start',
    agendaDuration: isBs ? 'Trajanje' : 'Duration',
    mentor: isBs ? 'Mentor' : 'Tutor',
    tutorProfile: 'LinkedIn',
    tutorBlocked: isBs ? 'Uskoro' : 'Coming soon',
    weeksCount: isBs ? 'sedmica' : 'weeks',
  };

  const beginnerLabel = isBs ? 'BEGINNER · 3 MJESECA' : 'BEGINNER · 3 MONTHS';
  const advancedLabel = isBs ? 'ADVANCED · 6 MJESECI' : 'ADVANCED · 6 MONTHS';
  const beginnerShortLabel = 'BEGINNER';
  const advancedShortLabel = 'ADVANCED';
  const selectedDuration = selectedLevel === 'beginner'
    ? (isBs ? '3 mjeseca' : '3 months')
    : (isBs ? '6 mjeseci' : '6 months');
  const countdownLabels = {
    eyebrow: isBs ? 'POČETAK PROGRAMA' : 'PROGRAM START',
    note: isBs ? 'Svi boot-camp programi počinju istog datuma.' : 'All boot-camp programs start on the same date.',
  };
  const countdownDate = isBs ? '1. JUNI 2026. godine' : 'JUNE 1, 2026';
  const countdownUnits = [
    {
      label: isBs ? getBosnianCountdownLabel('days', countdown.days) : getEnglishCountdownLabel('days', countdown.days),
      value: countdown.days,
    },
    {
      label: isBs ? getBosnianCountdownLabel('hours', countdown.hours) : getEnglishCountdownLabel('hours', countdown.hours),
      value: countdown.hours,
    },
    {
      label: isBs ? getBosnianCountdownLabel('minutes', countdown.minutes) : getEnglishCountdownLabel('minutes', countdown.minutes),
      value: countdown.minutes,
    },
    {
      label: isBs ? getBosnianCountdownLabel('seconds', countdown.seconds) : getEnglishCountdownLabel('seconds', countdown.seconds),
      value: countdown.seconds,
    },
  ];
  const sectionContent = (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="text-[11px] font-mono tracking-[0.2em] text-blue-300 uppercase">{countdownLabels.eyebrow}</div>
          <div className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">{countdownDate}</div>
          <p className="mt-2 text-sm font-mono text-gray-400">{countdownLabels.note}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {countdownUnits.map((unit) => (
            <div key={unit.label} className="rounded-2xl border border-white/10 bg-black/30 px-2 py-3 text-center sm:px-4">
              <div className="text-xl font-black text-white sm:text-3xl">{String(unit.value).padStart(2, '0')}</div>
              <div className="mt-1 text-[9px] font-mono tracking-[0.14em] text-blue-300 uppercase sm:text-[10px] sm:tracking-[0.18em]">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>

      {labels.sectionSubtitle}
    </div>
  );

  const chooseTrack = (programId: string, level: ProgramLevel) => {
    setSelectedProgramId(programId);
    setSelectedLevel(level);
    setStatus(null);
    setIsJoinModalOpen(true);
  };

  const openAgenda = (programId: string, level: ProgramLevel) => {
    setSelectedProgramId(programId);
    setSelectedLevel(level);
    setIsAgendaModalOpen(true);
  };

  const openMembershipOffer = () => {
    setIsJoinModalOpen(false);
    onNavigate('/techpark/membership');
  };

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleEnroll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const age = Number(formData.age);

    if (!formData.fullName || !formData.guardianContact || !formData.email || !formData.motivation || Number.isNaN(age)) {
      setStatus({ type: 'error', message: isBs ? 'Popuni sva polja prije prijave na boot-camp.' : 'Fill in all fields before sending the boot-camp enrollment.' });
      return;
    }

    if (age <= 0 || age >= 18) {
      setStatus({ type: 'error', message: isBs ? 'Programi su dostupni samo za osobe ispod 18 godina.' : 'Programs are only available for participants under 18.' });
      return;
    }

    setStatus({
      type: 'success',
      message: isBs
        ? `Prijava poslana za ${selectedProgram.titleBs} (${selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}).`
        : `Enrollment sent for ${selectedProgram.title} (${selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}).`,
    });
    setFormData({ fullName: '', age: '', guardianContact: '', email: '', motivation: '' });
  };

  const selectedTutorTitle = isBs ? selectedProgram.tutor.titleBs : selectedProgram.tutor.title;
  const hasTutorLink = Boolean(selectedProgram.tutor.link);
  const agendaOverview = isBs ? selectedAgenda.overviewBs : selectedAgenda.overview;
  const agendaWeeks = selectedAgenda.weeks.map((week) => ({
    ...week,
    label: isBs ? week.labelBs : week.label,
    title: isBs ? week.titleBs : week.title,
    summary: isBs ? week.summaryBs : week.summary,
    points: isBs ? week.pointsBs : week.points,
  }));

  return (
    <TechparkPageShell showBackdrop>
      <TechparkSubnavSection
        current="/techpark/boot-camp"
        lang={lang}
        onNavigate={onNavigate}
        title={labels.sectionTitle}
        subtitle={sectionContent}
      />

      <section className="pt-3 pb-24 lg:pt-5 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 lg:space-y-5">
            <div className="space-y-5">
              {programs.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  isSelected={program.id === selectedProgramId}
                  isBs={isBs}
                  groupSizeLabel={labels.groupSize}
                  under18Label={labels.under18}
                  beginnerLabel={beginnerLabel}
                  beginnerShortLabel={beginnerShortLabel}
                  advancedLabel={advancedLabel}
                  advancedShortLabel={advancedShortLabel}
                  agendaButtonLabel={labels.agendaButton}
                  agendaButtonLabelMobile={labels.agendaButtonMobile}
                  applyButtonLabel={labels.applyButton}
                  applyButtonLabelMobile={labels.applyButtonMobile}
                  activeLevel={program.id === selectedProgramId ? selectedLevel : 'beginner'}
                  onChooseTrack={chooseTrack}
                  onOpenAgenda={openAgenda}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SplitActionModal
        open={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        eyebrow=""
        title=""
        description=""
        promoPanel={
          <div className="space-y-4">
            <div className="text-3xl font-black tracking-tight sm:text-[2.35rem]">{isBs ? selectedProgram.titleBs : selectedProgram.title}</div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[11px] font-mono tracking-[0.16em] uppercase">{labels.selectedProgram}</div>
              <div className="text-base text-gray-300 font-mono sm:text-lg">{selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}</div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.enrolled}</div><div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedProgramEnrollment}/{selectedProgram.seats}</div><div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{labels.under18}</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.scheduleDays}</div><div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedProgramScheduleDaysLabel}</div><div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{labels.scheduleDaysSubtitle}</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.scheduleTime}</div><div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedProgramScheduleTimeLabel}</div><div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{selectedDuration}</div></div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.programPriceLabel}</div><div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedProgramPrice}</div>{selectedProgramOldPrice ? <div className="mt-2 text-[11px] text-gray-400 line-through font-mono sm:text-xs">{selectedProgramOldPrice}</div> : <div className="mt-2 whitespace-nowrap text-[11px] text-gray-400 font-mono sm:text-xs">{isBs ? 'Advanced put' : 'Advanced path'}</div>}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.programDescription}</div>
              <p className="mt-2 text-xs text-blue-100/80 font-mono leading-relaxed sm:text-sm">{isBs ? selectedProgram.descriptionBs : selectedProgram.description}</p>
            </div>
            <CrossSellPanel
              badge={labels.crossSellBadge}
              title={labels.crossSellTitle}
              text={labels.crossSellText}
              buttonLabel={labels.crossSellButton}
              onClick={openMembershipOffer}
            />
          </div>
        }
        mobileFooter={
          <button
            type="submit"
            form="bootcamp-enrollment-form"
            className="w-full rounded-sm bg-blue-600 px-5 py-4 font-bold font-mono text-sm tracking-[0.16em] uppercase text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-700"
          >
            <span className="block">{labels.joinButton}</span>
            <span className="mt-1 block text-[10px] tracking-[0.18em] text-blue-100/80">
              {selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}
            </span>
          </button>
        }
      >
        <form id="bootcamp-enrollment-form" onSubmit={handleEnroll} className="flex flex-col pb-6 sm:pb-0 lg:min-h-full">
          <div className="space-y-4">
            <div className="text-xl font-bold">{labels.joinTitle}</div>
            <select value={selectedProgramId} onChange={(event) => setSelectedProgramId(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {isBs ? program.titleBs : program.title}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setSelectedLevel('beginner')} className={`px-3 py-3 rounded-2xl font-bold font-mono text-[11px] sm:text-xs tracking-[0.1em] sm:tracking-[0.16em] uppercase whitespace-nowrap transition-colors ${selectedLevel === 'beginner' ? 'bg-blue-600 text-white' : 'border border-white/15 text-gray-300 hover:border-blue-500'}`}><span className="sm:hidden">{beginnerShortLabel}</span><span className="hidden sm:inline">{beginnerLabel}</span></button>
              <button type="button" onClick={() => setSelectedLevel('advanced')} className={`px-3 py-3 rounded-2xl font-bold font-mono text-[11px] sm:text-xs tracking-[0.1em] sm:tracking-[0.16em] uppercase whitespace-nowrap transition-colors ${selectedLevel === 'advanced' ? 'bg-blue-600 text-white' : 'border border-white/15 text-gray-300 hover:border-blue-500'}`}><span className="sm:hidden">{advancedShortLabel}</span><span className="hidden sm:inline">{advancedLabel}</span></button>
            </div>
            <input value={formData.fullName} onChange={(event) => setField('fullName', event.target.value)} placeholder={labels.name} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
            <div className="grid md:grid-cols-2 gap-4">
              <input value={formData.age} onChange={(event) => setField('age', event.target.value)} placeholder={labels.age} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
              <input value={formData.email} onChange={(event) => setField('email', event.target.value)} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
            </div>
            <input value={formData.guardianContact} onChange={(event) => setField('guardianContact', event.target.value)} placeholder={labels.guardian} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
            <textarea value={formData.motivation} onChange={(event) => setField('motivation', event.target.value)} placeholder={labels.motivation} rows={4} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
            <FormStatusMessage status={status} />
          </div>
          <div className="mt-6 hidden pt-6 sm:block">
            <button type="submit" className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-sm font-bold font-mono text-sm tracking-[0.18em] uppercase transition-all hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]">{labels.joinButton}</button>
          </div>
        </form>
      </SplitActionModal>

      <SplitActionModal
        open={isAgendaModalOpen}
        onClose={() => setIsAgendaModalOpen(false)}
        mobileColumnOrder="promo-first"
        eyebrow=""
        title=""
        description=""
        promoPanel={
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">
              {labels.agendaTitle}
            </div>
            <div className="text-3xl font-black tracking-tight sm:text-[2.35rem]">{isBs ? selectedProgram.titleBs : selectedProgram.title}</div>
            <div className="text-base font-mono text-gray-300 sm:text-lg">{selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}</div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">
                {selectedAgenda.status === 'ready' ? labels.agendaReady : labels.agendaSoon}
              </div>
              <p className="mt-3 text-sm font-mono leading-relaxed text-blue-100/85 sm:text-[15px]">{agendaOverview}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.agendaStart}</div>
                <div className="mt-2 text-base font-black leading-tight tracking-tight sm:text-lg lg:text-[1.2rem]">{countdownDate}</div>
                <div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{selectedAgenda.status === 'ready' ? labels.agendaReady : labels.agendaSoon}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.scheduleDays}</div>
                <div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedProgramScheduleDaysLabel}</div>
                <div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{labels.scheduleDaysSubtitle}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.scheduleTime}</div>
                <div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedProgramScheduleTimeLabel}</div>
                <div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{selectedDuration}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.agendaDuration}</div>
                <div className="mt-2 whitespace-nowrap text-lg font-black tracking-tight sm:text-xl lg:text-[1.4rem]">{selectedDuration}</div>
                <div className="mt-2 text-[11px] text-gray-400 font-mono sm:text-xs">{agendaWeeks.length} {labels.weeksCount}</div>
              </div>
            </div>
            {hasTutorLink ? (
              <a
                href={selectedProgram.tutor.link ?? undefined}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={selectedProgram.tutor.image}
                    alt={selectedProgram.tutor.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono tracking-[0.16em] text-blue-400 uppercase">{labels.mentor}</div>
                    <div className="mt-1 truncate text-lg font-bold">{selectedProgram.tutor.name}</div>
                    <p className="text-sm font-mono text-gray-300">{selectedTutorTitle}</p>
                  </div>
                </div>
                <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-white transition-colors group-hover:border-blue-500 group-hover:bg-blue-500/20">
                  {labels.tutorProfile}
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <img
                      src={selectedProgram.tutor.image}
                      alt={selectedProgram.tutor.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono tracking-[0.16em] text-blue-400 uppercase">{labels.mentor}</div>
                      <div className="mt-1 truncate text-lg font-bold">{selectedProgram.tutor.name}</div>
                      <p className="text-sm font-mono text-gray-300">{selectedTutorTitle}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase text-gray-400">
                    {labels.tutorBlocked}
                    <Lock className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            )}
          </div>
        }
      >
        <div className="space-y-5">
          <div className="border-b border-white/10 pb-4">
            <div className="text-[11px] font-mono tracking-[0.2em] text-blue-300 uppercase">{labels.agendaTimeline}</div>
            <div className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {selectedAgenda.status === 'ready' ? labels.agendaReady : labels.agendaSoon}
            </div>
            <p className="mt-2 text-sm font-mono text-gray-400">
              {agendaWeeks.length} {labels.weeksCount}
            </p>
          </div>

          <div className="space-y-4 pb-4">
            {agendaWeeks.map((week, index) => (
              <div key={week.id} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-sm font-black text-white">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono tracking-[0.16em] text-blue-300 uppercase">{week.label}</div>
                    <div className="mt-1 text-xl font-bold tracking-tight text-white">{week.title}</div>
                    {week.summary ? (
                      <p className="mt-2 text-sm font-mono leading-relaxed text-gray-300">{week.summary}</p>
                    ) : null}
                    <ul className="mt-4 space-y-2">
                      {week.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm font-mono leading-relaxed text-blue-100/85">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SplitActionModal>
    </TechparkPageShell>
  );
};
