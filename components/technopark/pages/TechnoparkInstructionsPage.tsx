import React, { useState } from 'react';
import { CalendarDays, ShieldCheck, Ticket, Users } from 'lucide-react';
import { programs } from '../data';
import { ProgramCard } from '../instructions/ProgramCard';
import { CrossSellPanel } from '../shared/CrossSellPanel';
import { FloatingActionButton } from '../shared/FloatingActionButton';
import { FormStatusMessage } from '../shared/FormStatusMessage';
import { SectionHeader } from '../shared/SectionHeader';
import { SplitActionModal } from '../shared/SplitActionModal';
import { TechnoparkHeroSection } from '../shared/TechnoparkHeroSection';
import { TechnoparkPageShell } from '../shared/TechnoparkPageShell';
import { TechnoparkStatCard } from '../shared/TechnoparkStatCard';
import type { FormStatus, ProgramLevel, TechnoparkPageProps } from '../types';

export const TechnoparkInstructionsPage: React.FC<TechnoparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0].id);
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel>('beginner');
  const [formData, setFormData] = useState({ fullName: '', age: '', guardianContact: '', email: '', motivation: '' });
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const selectedProgram = programs.find((program) => program.id === selectedProgramId) ?? programs[0];
  const selectedProgramPrice = selectedLevel === 'beginner' ? '180 KM' : '300 KM';
  const selectedProgramOldPrice = selectedLevel === 'beginner' ? '200 KM' : undefined;
  const selectedProgramDiscount = selectedLevel === 'beginner'
    ? (isBs ? '10% POPUST DO 1. MAJA' : '10% OFF BEFORE MAY 1')
    : undefined;

  const labels = {
    badge: isBs ? 'instrukcije od 17:00' : 'instruction tracks from 17:00',
    title: isBs ? 'IZABERI PROGRAM I PRIDRUZI SE BRZO' : 'CHOOSE A TRACK AND JOIN FAST',
    subtitle: isBs
      ? 'Osam programa, svaki sa Beginner putem od 3 mjeseca i Advanced putem od 6 mjeseci. Sve grupe su za osobe ispod 18 godina.'
      : 'Eight programs, each with a Beginner path of 3 months and an Advanced path of 6 months. Every group is built for participants under 18.',
    programsTitle: isBs ? 'PROGRAMI' : 'PROGRAMS',
    programsSubtitle: isBs ? 'Klik na Beginner ili Advanced odmah puni formu za prijavu.' : 'Click Beginner or Advanced and the join form updates instantly.',
    joinTitle: isBs ? 'PRIJAVA NA PROGRAM' : 'PROGRAM ENROLLMENT',
    joinButton: isBs ? 'POSALJI PRIJAVU' : 'SEND ENROLLMENT',
    beginner: 'BEGINNER · 3M',
    advanced: 'ADVANCED · 6M',
    selectedTrack: isBs ? 'IZABRANI PUT' : 'SELECTED TRACK',
    groupSize: isBs ? 'maks. po grupi' : 'max per group',
    under18: isBs ? 'samo za u18' : 'under 18 only',
    name: isBs ? 'Ime i prezime' : 'Full name',
    age: isBs ? 'Godine' : 'Age',
    guardian: isBs ? 'Roditelj / kontakt telefon' : 'Guardian / contact phone',
    motivation: isBs ? 'Sta zelis nauciti?' : 'What do you want to learn?',
    floatingJoin: isBs ? 'PRIDRUZI SE' : 'JOIN NOW',
    floatingHint: isBs ? 'Otvara prijavu programa' : 'Open program enrollment',
    modalTitle: 'PROGRAM ENROLLMENT',
    modalSubtitle: isBs ? 'Odaberi smjer i posalji prijavu kroz split modal prozor.' : 'Choose a track and send the enrollment through the split modal flow.',
    modalText: isBs ? 'Svaki program ima Beginner 3M i Advanced 6M put, sa mentorisanim radom i prostorom za showcase projekte.' : 'Each program has a Beginner 3M path and Advanced 6M path, with mentored work and room for showcase projects.',
    selectedProgram: isBs ? 'Odabrani program' : 'Selected program',
    enrolled: isBs ? 'upisano / limit' : 'enrolled / cap',
    programPriceLabel: isBs ? 'mjesecna cijena kursa' : 'monthly course price',
    crossSellBadge: isBs ? 'OPEN SPACE BONUS' : 'OPEN SPACE BONUS',
    crossSellTitle: isBs ? 'Dodaj open space uz 50% popusta.' : 'Add open space with 50% off.',
    crossSellText: isBs ? 'Ako uz program zelis i dnevni boravak za rad, druzenje ili gaming, open space membership dobijas uz dodatni bundle popust.' : 'If you also want daytime space for building, hanging out, or gaming, you can add open-space membership with an extra bundle discount.',
    crossSellButton: isBs ? 'OTVORI OPEN SPACE' : 'OPEN SPACE OFFER',
  };

  const beginnerLabel = isBs ? 'BEGINNER · 3 MJESECA' : 'BEGINNER · 3 MONTHS';
  const advancedLabel = isBs ? 'ADVANCED · 6 MJESECI' : 'ADVANCED · 6 MONTHS';
  const modalText = isBs
    ? 'Svaki program ima Beginner put od 3 mjeseca i Advanced put od 6 mjeseci, sa mentorisanim radom i prostorom za showcase projekte.'
    : 'Each program has a Beginner path of 3 months and an Advanced path of 6 months, with mentored work and room for showcase projects.';
  const selectedDuration = selectedLevel === 'beginner'
    ? (isBs ? '3 mjeseca' : '3 months')
    : (isBs ? '6 mjeseci' : '6 months');

  const chooseTrack = (programId: string, level: ProgramLevel) => {
    setSelectedProgramId(programId);
    setSelectedLevel(level);
    setStatus(null);
    setIsJoinModalOpen(true);
  };

  const openMembershipOffer = () => {
    setIsJoinModalOpen(false);
    onNavigate('/technopark/membership');
  };

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleEnroll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const age = Number(formData.age);

    if (!formData.fullName || !formData.guardianContact || !formData.email || !formData.motivation || Number.isNaN(age)) {
      setStatus({ type: 'error', message: isBs ? 'Popuni sva polja prije prijave na program.' : 'Fill in all fields before sending the enrollment.' });
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

  return (
    <TechnoparkPageShell>
      <TechnoparkHeroSection
        current="/technopark/instructions"
        lang={lang}
        onNavigate={onNavigate}
        badge={labels.badge}
        badgeIcon={CalendarDays}
        title={labels.title}
        subtitle={labels.subtitle}
        rightContent={
          <div className="grid gap-4 sm:grid-cols-2 lg:w-full lg:max-w-[34rem] lg:justify-self-center">
            {[
              { value: '17:00 +', label: isBs ? 'Pocetak programa' : 'Program start time', icon: CalendarDays },
              { value: selectedProgramPrice, label: labels.programPriceLabel, subvalue: selectedProgramOldPrice, badge: selectedProgramDiscount, icon: Ticket },
              { value: `0/${selectedProgram.seats}`, label: labels.enrolled, icon: Users },
              { value: 'U18', label: isBs ? 'Samo za djecu i mlade' : 'For children and youth', icon: ShieldCheck },
            ].map((card) => (
              <TechnoparkStatCard key={card.label} value={card.value} label={card.label} subvalue={card.subvalue} badge={card.badge} icon={card.icon} />
            ))}
          </div>
        }
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={labels.programsTitle} subtitle={labels.programsSubtitle} />
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/30 via-black to-black p-7">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-center">
                <div>
                  <div className="text-xs font-mono tracking-[0.2em] text-blue-400 uppercase">{labels.selectedTrack}</div>
                  <div className="mt-3 text-3xl font-black">{isBs ? selectedProgram.titleBs : selectedProgram.title}</div>
                  <div className="mt-2 text-gray-400 font-mono">{selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-2xl font-black">{selectedDuration}</div><div className="mt-1 text-xs text-gray-500 font-mono uppercase tracking-[0.14em]">{selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}</div></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-2xl font-black">0/{selectedProgram.seats}</div><div className="mt-1 text-xs text-gray-500 font-mono uppercase tracking-[0.14em]">{labels.enrolled}</div></div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-2xl font-black">{isBs ? selectedProgram.scheduleBs : selectedProgram.schedule}</div><div className="mt-1 text-xs text-gray-500 font-mono uppercase tracking-[0.14em]">{labels.under18}</div></div>
              </div>
            </div>

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
                  advancedLabel={advancedLabel}
                  activeLevel={program.id === selectedProgramId ? selectedLevel : 'beginner'}
                  onChooseTrack={chooseTrack}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FloatingActionButton label={labels.floatingJoin} hint={labels.floatingHint} onClick={() => setIsJoinModalOpen(true)} />

      <SplitActionModal
        open={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        eyebrow={labels.modalTitle}
        title={`${isBs ? selectedProgram.titleBs : selectedProgram.title} / ${selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}`}
        description={labels.modalSubtitle}
        promoPanel={
          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[11px] font-mono tracking-[0.16em] uppercase">{labels.selectedProgram}</div>
            <div className="text-4xl font-black tracking-tight">{isBs ? selectedProgram.titleBs : selectedProgram.title}</div>
            <div className="text-lg text-gray-300 font-mono">{selectedLevel === 'beginner' ? beginnerLabel : advancedLabel}</div>
            <p className="text-sm text-blue-100/80 font-mono leading-relaxed">{modalText}</p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.enrolled}</div><div className="mt-2 text-2xl font-black">0/{selectedProgram.seats}</div><div className="mt-2 text-sm text-gray-400 font-mono">{labels.under18}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">Schedule</div><div className="mt-2 text-2xl font-black">{isBs ? selectedProgram.scheduleBs : selectedProgram.schedule}</div><div className="mt-2 text-sm text-gray-400 font-mono">{selectedDuration}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.programPriceLabel}</div><div className="mt-2 text-2xl font-black">{selectedProgramPrice}</div>{selectedProgramOldPrice ? <div className="mt-2 text-sm text-gray-400 line-through font-mono">{selectedProgramOldPrice}</div> : <div className="mt-2 text-sm text-gray-400 font-mono">{isBs ? 'Advanced put' : 'Advanced path'}</div>}</div>
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
      >
        <form onSubmit={handleEnroll} className="space-y-4">
          <div className="text-xl font-bold">{labels.joinTitle}</div>
          <select value={selectedProgramId} onChange={(event) => setSelectedProgramId(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {isBs ? program.titleBs : program.title}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setSelectedLevel('beginner')} className={`px-4 py-3 rounded-2xl font-bold font-mono text-xs tracking-[0.16em] uppercase transition-colors ${selectedLevel === 'beginner' ? 'bg-blue-600 text-white' : 'border border-white/15 text-gray-300 hover:border-blue-500'}`}>{beginnerLabel}</button>
            <button type="button" onClick={() => setSelectedLevel('advanced')} className={`px-4 py-3 rounded-2xl font-bold font-mono text-xs tracking-[0.16em] uppercase transition-colors ${selectedLevel === 'advanced' ? 'bg-blue-600 text-white' : 'border border-white/15 text-gray-300 hover:border-blue-500'}`}>{advancedLabel}</button>
          </div>
          <input value={formData.fullName} onChange={(event) => setField('fullName', event.target.value)} placeholder={labels.name} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          <div className="grid md:grid-cols-2 gap-4">
            <input value={formData.age} onChange={(event) => setField('age', event.target.value)} placeholder={labels.age} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
            <input value={formData.email} onChange={(event) => setField('email', event.target.value)} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          </div>
          <input value={formData.guardianContact} onChange={(event) => setField('guardianContact', event.target.value)} placeholder={labels.guardian} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          <textarea value={formData.motivation} onChange={(event) => setField('motivation', event.target.value)} placeholder={labels.motivation} rows={4} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          <FormStatusMessage status={status} />
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => setIsJoinModalOpen(false)} className="sm:flex-1 px-6 py-4 border border-white/15 rounded-sm font-bold font-mono text-sm tracking-[0.16em] uppercase text-gray-300 hover:text-white hover:border-blue-500 transition-colors">Close</button>
            <button type="submit" className="sm:flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-sm font-bold font-mono text-sm tracking-[0.18em] uppercase transition-all hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]">{labels.joinButton}</button>
          </div>
        </form>
      </SplitActionModal>
    </TechnoparkPageShell>
  );
};
