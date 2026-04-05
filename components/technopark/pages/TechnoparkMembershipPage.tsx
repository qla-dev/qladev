import React, { useMemo, useState } from 'react';
import { createAvailability, membershipDays, membershipSlots, slotOrder } from '../data';
import { MembershipDayCard } from '../membership/MembershipDayCard';
import { MembershipSlotCard } from '../membership/MembershipSlotCard';
import { CrossSellPanel } from '../shared/CrossSellPanel';
import { FormStatusMessage } from '../shared/FormStatusMessage';
import { SplitActionModal } from '../shared/SplitActionModal';
import { TechnoparkPageShell } from '../shared/TechnoparkPageShell';
import { TechnoparkSubnavSection } from '../shared/TechnoparkSubnavSection';
import type {
  FormStatus,
  MembershipDayKey,
  MembershipSlotKey,
  TechnoparkPageProps,
} from '../types';
import { getSpotsTone } from '../utils';

export const TechnoparkMembershipPage: React.FC<TechnoparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [availability, setAvailability] = useState(createAvailability);
  const [selectedDay, setSelectedDay] = useState<MembershipDayKey>('monday');
  const [selectedSlots, setSelectedSlots] = useState<MembershipSlotKey[]>([]);
  const [formData, setFormData] = useState({ fullName: '', age: '', guardianContact: '', email: '', notes: '' });
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [focusedSlot, setFocusedSlot] = useState<MembershipSlotKey | null>(null);
  const reservationFlowText: React.ReactNode = isBs ? (
    <>
      Izaberi dan, klikni slobodan termin i potvrdi rezervaciju. Tokom svog rezervisanog termina mozes koristiti puni
      Technopark open-space setup:
      <br />
      AI coding mjesta, chill lounge, gaming zonu, snack zonu i ostale sadrzaje prostora.
    </>
  ) : (
    <>
      Choose a day, click an available slot, and confirm the reservation. During the reserved slot, members can use
      the full Technopark open-space setup:
      <br />
      AI coding stations, the chill lounge, gaming zone, snack zone, and the rest of the space amenities.
    </>
  );

  const labels = {
    sectionTitle: isBs ? 'REZERVACIJE' : 'RESERVATIONS',
    sectionSubtitle: reservationFlowText,
    reserveTitle: isBs ? 'REZERVACIJE' : 'RESERVATIONS',
    reserveSubtitle: reservationFlowText,
    summaryTitle: isBs ? 'TVOJ DAN' : 'YOUR DAY',
    formTitle: isBs ? 'POTVRDI REZERVACIJU' : 'CONFIRM RESERVATION',
    formButton: isBs ? 'REZERVISI TERMINE' : 'RESERVE SLOTS',
    selectedEmpty: isBs ? 'Izaberi do 2 termina' : 'Choose up to 2 slots',
    spotsLeft: isBs ? 'mjesta slobodno' : 'spots left',
    closed: isBs ? 'ZATVORENO' : 'CLOSED',
    monthlyPass: isBs ? 'Mjesecni pass' : 'Monthly pass',
    maxDaily: isBs ? 'Maks. 4h dnevno' : '4h max per day',
    maxCapacity: isBs ? '15 osoba po terminu' : '15 people per slot',
    under18: isBs ? 'Samo za ispod 18 godina' : 'Under 18 only',
    fullName: isBs ? 'Ime i prezime' : 'Full name',
    age: isBs ? 'Godine' : 'Age',
    guardian: isBs ? 'Roditelj / kontakt telefon' : 'Guardian / contact phone',
    notes: isBs ? 'Napomena' : 'Notes',
    modalTitle: isBs ? 'EARLY BIRD MEMBERSHIP' : 'EARLY BIRD MEMBERSHIP',
    modalSubtitle: isBs ? 'Prijava je otvorena za u18 clanove. Zakljucaj 60 KM cijenu prije 1. maja.' : 'Enrollment is open for under-18 members. Lock the 60 KM offer before May 1.',
    promoText: isBs ? 'Mjesecni pass ukljucuje open space, gaming zonu, snack zonu i dnevni limit od 4h.' : 'The monthly pass includes open space, gaming zone, snack zone, and a 4-hour daily limit.',
    guardianNoteTitle: isBs ? 'NAPOMENA ZA RODITELJA / STARATELJA' : 'PARENT / GUARDIAN NOTE',
    guardianNoteText: isBs
      ? 'Zbog toga sto je ovaj membership namijenjen u18 clanovima, prijavu i potvrdu rezervacije treba da preuzme roditelj ili staratelj.'
      : 'Because this membership is intended for under-18 members, the reservation and confirmation step should be completed by a parent or guardian.',
    discount: isBs ? '40% POPUST DO 1. MAJA' : '40% OFF BEFORE MAY 1',
    oldPrice: '100 KM',
    newPrice: '60 KM',
    focusedSlot: isBs ? 'Fokus termin' : 'Focused slot',
    crossSellBadge: 'BOOT-CAMP BONUS',
    crossSellTitle: isBs ? 'Uz open space dobijas 40% popusta na svaki boot-camp program.' : 'Get 40% off every boot-camp program with open space.',
    crossSellText: isBs ? 'Ako zelis i boot-camp od 17:00, membership ti otvara povoljniji ulaz u svaki Technopark boot-camp program.' : 'If you also want the 17:00 boot-camp, membership unlocks a better entry price for every Technopark boot-camp program.',
    crossSellButton: isBs ? 'POGLEDAJ BOOT-CAMP' : 'VIEW BOOT-CAMP',
  };

  const selectedDayConfig = membershipDays.find((day) => day.key === selectedDay) ?? membershipDays[0];
  const selectedDaySpots = useMemo(
    () => membershipSlots.reduce((total, slot) => total + availability[selectedDay][slot.key], 0),
    [availability, selectedDay]
  );
  const selectedSlotLabels = useMemo(
    () =>
      selectedSlots
        .map((slot) => membershipSlots.find((item) => item.key === slot)?.label)
        .filter((value): value is string => Boolean(value)),
    [selectedSlots]
  );
  const focusedSlotLabel = focusedSlot ? membershipSlots.find((slot) => slot.key === focusedSlot)?.label ?? '--' : '--';

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleSlot = (slotKey: MembershipSlotKey) => {
    if (selectedDayConfig.closed || availability[selectedDay][slotKey] === 0) {
      return;
    }

    setStatus(null);
    setSelectedSlots((current) => {
      if (current.includes(slotKey)) {
        return current.filter((item) => item !== slotKey);
      }

      if (current.length >= 2) {
        setStatus({
          type: 'error',
          message: isBs ? 'Maksimalno mozes izabrati 2 termina dnevno.' : 'You can select a maximum of 2 slots per day.',
        });
        return current;
      }

      return [...current, slotKey].sort((a, b) => slotOrder[a] - slotOrder[b]);
    });
  };

  const openReserveModal = (slotKey?: MembershipSlotKey) => {
    if (slotKey) {
      if (selectedDayConfig.closed || availability[selectedDay][slotKey] === 0) {
        return;
      }

      setFocusedSlot(slotKey);
      toggleSlot(slotKey);
    } else {
      setFocusedSlot(null);
    }

    setIsReserveModalOpen(true);
  };

  const openProgramsOffer = () => {
    setIsReserveModalOpen(false);
    onNavigate('/technopark/boot-camp');
  };

  const handleReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const age = Number(formData.age);

    if (selectedDayConfig.closed) {
      setStatus({ type: 'error', message: isBs ? 'Nedjelja je zatvorena za rezervacije.' : 'Sunday is closed for reservations.' });
      return;
    }

    if (!selectedSlots.length) {
      setStatus({ type: 'error', message: isBs ? 'Izaberi barem jedan termin.' : 'Select at least one time slot.' });
      return;
    }

    if (!formData.fullName || !formData.guardianContact || !formData.email || Number.isNaN(age)) {
      setStatus({
        type: 'error',
        message: isBs ? 'Popuni obavezna polja prije potvrde rezervacije.' : 'Fill in the required fields before confirming the reservation.',
      });
      return;
    }

    if (age <= 0 || age >= 18) {
      setStatus({
        type: 'error',
        message: isBs ? 'Technopark membership je samo za osobe ispod 18 godina.' : 'Technopark membership is only available for people under 18.',
      });
      return;
    }

    if (selectedSlots.some((slot) => availability[selectedDay][slot] === 0)) {
      setStatus({
        type: 'error',
        message: isBs ? 'Jedan od izabranih termina vise nije slobodan.' : 'One of the selected slots is no longer available.',
      });
      return;
    }

    setAvailability((current) => {
      const next = createAvailability();
      membershipDays.forEach((day) => {
        membershipSlots.forEach((slot) => {
          next[day.key][slot.key] = current[day.key][slot.key];
        });
      });
      selectedSlots.forEach((slot) => {
        next[selectedDay][slot] = Math.max(0, next[selectedDay][slot] - 1);
      });
      return next;
    });

    setStatus({
      type: 'success',
      message: isBs
        ? `Rezervacija potvrdena za ${selectedDayConfig.labelBs}: ${selectedSlotLabels.join(', ')}.`
        : `Reservation confirmed for ${selectedDayConfig.label}: ${selectedSlotLabels.join(', ')}.`,
    });
    setSelectedSlots([]);
    setFocusedSlot(null);
    setFormData({ fullName: '', age: '', guardianContact: '', email: '', notes: '' });
  };

  return (
    <TechnoparkPageShell showBackdrop>
      <TechnoparkSubnavSection
        current="/technopark/membership"
        lang={lang}
        onNavigate={onNavigate}
        title={labels.sectionTitle}
        subtitle={labels.sectionSubtitle}
      />

      <section className="pt-3 pb-24 lg:pt-5 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 lg:space-y-5">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {membershipDays.map((day) => {
                const totalSpots = membershipSlots.reduce((sum, slot) => sum + availability[day.key][slot.key], 0);
                return (
                  <MembershipDayCard
                    key={day.key}
                    day={day}
                    selected={day.key === selectedDay}
                    totalSpots={totalSpots}
                    spotsLabel={labels.spotsLeft}
                    closedLabel={labels.closed}
                    lang={lang}
                    onClick={() => {
                      setSelectedDay(day.key);
                      setSelectedSlots([]);
                      setFocusedSlot(null);
                      setStatus(null);
                    }}
                  />
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {membershipSlots.map((slot) => {
                const count = availability[selectedDay][slot.key];
                const selected = selectedSlots.includes(slot.key);
                const disabled = selectedDayConfig.closed || count === 0;
                return (
                  <MembershipSlotCard
                    key={slot.key}
                    label={slot.label}
                    count={count}
                    tone={getSpotsTone(count)}
                    selected={selected}
                    disabled={disabled}
                    description={selected ? (isBs ? 'Izabrano za rezervaciju' : 'Selected for reservation') : '08:00 - 16:00 access'}
                    spotsLabel={labels.spotsLeft}
                    closedLabel={labels.closed}
                    onClick={() => openReserveModal(slot.key)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SplitActionModal
        open={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        eyebrow={labels.modalTitle}
        title={`${labels.newPrice} / ${labels.monthlyPass}`}
        description={labels.modalSubtitle}
        promoPanel={
          <div className="space-y-3.5">
            <div className="inline-flex px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-mono tracking-[0.16em] uppercase">{labels.discount}</div>
            <div className="flex items-end gap-3">
              <div className="text-6xl font-black tracking-tight">{labels.newPrice}</div>
              <div className="text-xl text-gray-500 line-through font-mono">{labels.oldPrice}</div>
            </div>
            <p className="text-sm text-blue-100/80 font-mono leading-relaxed">{labels.promoText}</p>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
              <div className="text-[11px] font-mono tracking-[0.16em] text-amber-200 uppercase">{labels.guardianNoteTitle}</div>
              <p className="mt-2 text-sm text-white/85 font-mono leading-relaxed">{labels.guardianNoteText}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.summaryTitle}</div>
                <div className="mt-2 text-2xl font-black">{isBs ? selectedDayConfig.labelBs : selectedDayConfig.label}</div>
                <div className="mt-2 text-sm text-gray-400 font-mono">{selectedSlotLabels.length ? selectedSlotLabels.join(' + ') : labels.selectedEmpty}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="text-xs font-mono tracking-[0.16em] text-blue-300 uppercase">{labels.focusedSlot}</div>
                <div className="mt-2 text-2xl font-black">{focusedSlotLabel}</div>
                <div className="mt-2 text-sm text-gray-400 font-mono">{selectedDaySpots} {labels.spotsLeft}</div>
              </div>
            </div>
            <CrossSellPanel
              badge={labels.crossSellBadge}
              title={labels.crossSellTitle}
              text={labels.crossSellText}
              buttonLabel={labels.crossSellButton}
              onClick={openProgramsOffer}
            />
          </div>
        }
      >
        <form onSubmit={handleReservation} className="space-y-3.5">
          <div className="text-xl font-bold">{labels.formTitle}</div>
          <input value={formData.fullName} onChange={(event) => setField('fullName', event.target.value)} placeholder={labels.fullName} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          <div className="grid md:grid-cols-2 gap-4">
            <input value={formData.age} onChange={(event) => setField('age', event.target.value)} placeholder={labels.age} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
            <input value={formData.email} onChange={(event) => setField('email', event.target.value)} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          </div>
          <input value={formData.guardianContact} onChange={(event) => setField('guardianContact', event.target.value)} placeholder={labels.guardian} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          <textarea value={formData.notes} onChange={(event) => setField('notes', event.target.value)} placeholder={labels.notes} rows={3} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
          <FormStatusMessage status={status} />
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => setIsReserveModalOpen(false)} className="sm:flex-1 px-6 py-4 border border-white/15 rounded-sm font-bold font-mono text-sm tracking-[0.16em] uppercase text-gray-300 hover:text-white hover:border-blue-500 transition-colors">Close</button>
            <button type="submit" className="sm:flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-sm font-bold font-mono text-sm tracking-[0.18em] uppercase transition-all hover:shadow-[0_0_18px_rgba(37,99,235,0.55)]">{labels.formButton}</button>
          </div>
        </form>
      </SplitActionModal>
    </TechnoparkPageShell>
  );
};
