import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CircuitBoard,
  Flag,
  Gauge,
  Map as MapIcon,
  Package,
  ShieldCheck,
  Timer,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { TechparkPageShell } from '../shared/TechparkPageShell';
import { TechparkSubnavSection } from '../shared/TechparkSubnavSection';
import type { ProgramLevel, TechparkPageProps } from '../types';

const HACKATHON_START_DATE = new Date(2026, 6, 4, 0, 0, 0, 0);

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

const MapPreview: React.FC<{ level: ProgramLevel }> = ({ level }) => {
  const isAdvanced = level === 'advanced';
  const path = isAdvanced
    ? 'M42,208 C92,156 134,176 172,202 C222,236 286,228 330,184 C372,142 404,130 458,152 C488,166 488,206 454,220 C414,236 360,218 318,192 C278,168 242,162 206,186 C162,214 110,244 68,232 C44,224 30,218 42,208 Z'
    : 'M44,202 C96,132 130,136 174,176 C214,214 266,210 312,170 C356,126 392,118 448,152 C480,172 486,208 448,224 C410,240 360,222 316,194 C276,168 240,164 206,190 C162,220 116,242 72,230 C48,224 32,214 44,202 Z';

  return (
    <svg viewBox="0 0 520 260" className="h-full w-full" role="img" aria-label="Conceptual map preview">
      <defs>
        <linearGradient id={`mapGlow-${level}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isAdvanced ? '#22c55e' : '#60a5fa'} stopOpacity="0.85" />
          <stop offset="55%" stopColor="#a855f7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.65" />
        </linearGradient>
        <pattern id={`grid-${level}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="520" height="260" rx="22" fill="rgba(0,0,0,0.55)" />
      <rect x="0" y="0" width="520" height="260" rx="22" fill={`url(#grid-${level})`} />

      <path d={path} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
      <path d={path} fill="none" stroke={`url(#mapGlow-${level})`} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const TechparkLineFollowerHackathonePage: React.FC<TechparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [selectedTrack, setSelectedTrack] = useState<ProgramLevel>('beginner');
  const [hackathonStartDate] = useState(() => HACKATHON_START_DATE);
  const [countdown, setCountdown] = useState(() => getCountdownParts(hackathonStartDate));
  const judgingRailRef = useRef<HTMLDivElement | null>(null);
  const judgingRailGroupRef = useRef<HTMLDivElement | null>(null);
  const judgingRailDragState = useRef<{ pointerId: number; startX: number; startScrollLeft: number } | null>(null);
  const [judgingRailGroupWidth, setJudgingRailGroupWidth] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdownParts(hackathonStartDate));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [hackathonStartDate]);

  useEffect(() => {
    const group = judgingRailGroupRef.current;
    if (!group) {
      return;
    }

    const updateWidth = () => {
      setJudgingRailGroupWidth(group.offsetWidth);
    };

    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = judgingRailRef.current;
    if (!rail || !judgingRailGroupWidth) {
      return;
    }

    rail.scrollLeft = judgingRailGroupWidth;
  }, [judgingRailGroupWidth]);

  useEffect(() => {
    const rail = judgingRailRef.current;
    if (!rail || !judgingRailGroupWidth) {
      return;
    }

    let raf = 0;
    const handleScroll = () => {
      if (raf) {
        return;
      }

      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const left = rail.scrollLeft;
        if (left <= 0) {
          rail.scrollLeft = left + judgingRailGroupWidth;
        } else if (left >= judgingRailGroupWidth * 2) {
          rail.scrollLeft = left - judgingRailGroupWidth;
        }
      });
    };

    rail.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', handleScroll);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, [judgingRailGroupWidth]);

  const countdownLabels = {
    eyebrow: isBs ? 'START HACKATHONA' : 'HACKATHON START',
    note: isBs ? 'Mapa se otkriva na startu, a 48h sprint pocinje odmah.' : 'Maps are revealed at kickoff, and the 48h sprint starts instantly.',
  };
  const countdownDate = isBs ? '4. JULI 2026. godine' : 'JULY 4, 2026';
  const countdownUnits = useMemo(
    () => [
      { label: isBs ? getBosnianCountdownLabel('days', countdown.days) : getEnglishCountdownLabel('days', countdown.days), value: countdown.days },
      { label: isBs ? getBosnianCountdownLabel('hours', countdown.hours) : getEnglishCountdownLabel('hours', countdown.hours), value: countdown.hours },
      { label: isBs ? getBosnianCountdownLabel('minutes', countdown.minutes) : getEnglishCountdownLabel('minutes', countdown.minutes), value: countdown.minutes },
      { label: isBs ? getBosnianCountdownLabel('seconds', countdown.seconds) : getEnglishCountdownLabel('seconds', countdown.seconds), value: countdown.seconds },
    ],
    [countdown, isBs]
  );

  const heroContent = (
    <div className="space-y-7">
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

      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/25 via-black/35 to-black p-7">
        <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-blue-300">
          LINE-FOLLOWER HACKATHON
        </div>
        <div className="mt-4 space-y-4 text-sm font-mono leading-relaxed text-gray-200">
          <p>
            {isBs
              ? 'Svaki tim dobija isti kit i 48h da napravi autonomnog line follower robota. Mape se ne objavljuju unaprijed — otkrivaju se na startu.'
              : 'Every team gets the same kit and 48 hours to build an autonomous line follower. Maps are not published early — they are revealed at kickoff.'}
          </p>
          <p>
            {isBs
              ? 'Beginner i Advanced track se razlikuju samo po mapi. Pravila, vrijeme i kit ostaju isti.'
              : 'Beginner and Advanced differ only by the map. Rules, timebox, and kit remain the same.'}
          </p>
        </div>
      </div>
    </div>
  );

  const judgingCriteriaCards = useMemo(
    () => [
      {
        weight: 50,
        eyebrow: isBs ? 'VOZNJA' : 'RUN',
        title: isBs ? 'Performanse na mapi' : 'Map performance',
        text: isBs
          ? 'Vrijeme, zavrsavanje mape i kazne. Pobjedjuje robot koji najbrze i najcistije prolazi stazu.'
          : 'Time, completion, and penalties. The winner is the robot that runs fastest and cleanest.',
        bullets: [
          isBs ? 'Cisto pracenje bez “wobble-a”.' : 'Clean tracking without wobble.',
          isBs ? 'Brzina u krivinama bez gubitka linije.' : 'Corner speed without losing the line.',
          isBs ? 'Recovery kad se izgubi linija.' : 'Recovery when the line is lost.',
          isBs ? 'Minimalne intervencije.' : 'Minimal interventions.',
        ],
      },
      {
        weight: 20,
        eyebrow: isBs ? 'STABILNOST' : 'STABILITY',
        title: isBs ? 'Konzistentnost' : 'Consistency',
        text: isBs
          ? 'Trazi se robot koji ponavlja rezultat kroz vise runova, bez “random” failova.'
          : 'We reward robots that repeat results across runs without random failures.',
        bullets: [
          isBs ? 'Mala varijacija vremena.' : 'Low time variance.',
          isBs ? 'Stabilan sensor read.' : 'Stable sensor reads.',
          isBs ? 'Stabilno napajanje.' : 'Stable power.',
          isBs ? 'Brz reset u “ready”.' : 'Fast reset to ready.',
        ],
      },
      {
        weight: 15,
        eyebrow: isBs ? 'HARDVER' : 'HARDWARE',
        title: isBs ? 'Kvalitet izrade' : 'Build quality',
        text: isBs
          ? 'Uredan kabeling, sigurna baterija i stabilna mehanika smanjuju bugove i podizu brzinu.'
          : 'Clean wiring, safe battery mounting, and rigid mechanics reduce bugs and increase speed.',
        bullets: [
          isBs ? 'Baterija osigurana i stabilna.' : 'Battery secured and stable.',
          isBs ? 'Senzor visina konzistentna.' : 'Consistent sensor height.',
          isBs ? 'Konektori sigurni.' : 'Connectors secured.',
          isBs ? 'Nema pregrijavanja.' : 'No overheating.',
        ],
      },
      {
        weight: 10,
        eyebrow: isBs ? 'PROCES' : 'PROCESS',
        title: isBs ? 'Tuning metoda' : 'Tuning method',
        text: isBs
          ? 'Kako dolazite do parametara: kalibracija, biljeske, test matrix, iteracije.'
          : 'How you reach parameters: calibration, notes, test matrix, iterations.',
        bullets: [
          isBs ? 'Baseline -> iterate, ne “random”.' : 'Baseline → iterate, not random.',
          isBs ? 'Biljeske o promjenama.' : 'Notes of changes.',
          isBs ? 'Test plan i merenje.' : 'Test plan and measurement.',
          isBs ? 'Time management (48h).' : 'Time management (48h).',
        ],
      },
      {
        weight: 5,
        eyebrow: isBs ? 'PIT' : 'PIT',
        title: isBs ? 'Objasnjenje rjesenja' : 'Explanation',
        text: isBs
          ? 'Kratko i jasno: kako radi robot i zasto ste birali taj pristup.'
          : 'Short and clear: how it works and why you chose your approach.',
        bullets: [
          isBs ? 'Arhitektura: senzori -> kontrola -> motori.' : 'Architecture: sensors → control → motors.',
          isBs ? 'Sta ste optimizovali i zasto.' : 'What you optimized and why.',
          isBs ? 'Koji je “next step” da imate jos 12h.' : 'Next step if you had 12 more hours.',
          isBs ? 'Lekcije i refleksija.' : 'Lessons and reflection.',
        ],
      },
    ],
    [isBs]
  );

  const handleJudgingRailPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') {
      return;
    }

    const rail = judgingRailRef.current;
    if (!rail) {
      return;
    }

    event.preventDefault();
    judgingRailDragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
    };
    rail.setPointerCapture(event.pointerId);
  };

  const handleJudgingRailPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = judgingRailRef.current;
    const state = judgingRailDragState.current;

    if (!rail || !state || state.pointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - state.startX;
    rail.scrollLeft = state.startScrollLeft - delta;
  };

  const handleJudgingRailPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = judgingRailRef.current;
    const state = judgingRailDragState.current;

    if (!rail || !state || state.pointerId !== event.pointerId) {
      return;
    }

    judgingRailDragState.current = null;
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  };

  const scrollJudgingRail = (direction: -1 | 1) => {
    const rail = judgingRailRef.current;
    if (!rail) {
      return;
    }

    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-judging-card]'));
    if (!cards.length) {
      return;
    }

    const current = rail.scrollLeft;
    const epsilon = 2;
    const offsets = cards.map((card) => card.offsetLeft);

    const targetOffset = direction === 1
      ? offsets.filter((offset) => offset > current + epsilon).sort((a, b) => a - b)[0]
      : offsets.filter((offset) => offset < current - epsilon).sort((a, b) => b - a)[0];

    if (typeof targetOffset !== 'number') {
      return;
    }

    rail.scrollTo({ left: targetOffset, behavior: 'smooth' });
  };

  const renderJudgingCriterionCard = (criterion: (typeof judgingCriteriaCards)[number], key: string) => (
    <div
      key={key}
      data-judging-card
      className="shrink-0 w-[21rem] sm:w-[23rem] lg:w-[26rem] snap-start rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{criterion.eyebrow}</div>
          <div className="mt-2 text-xl font-black tracking-tight text-white">{criterion.title}</div>
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-gray-200">
          {criterion.weight}%
        </div>
      </div>
      <p className="mt-3 text-sm font-mono leading-relaxed text-gray-300">{criterion.text}</p>
      <div className="mt-5 h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"
          style={{ width: `${criterion.weight}%` }}
        />
      </div>
      <div className="mt-5 space-y-2 text-sm font-mono leading-relaxed text-gray-200">
        {criterion.bullets.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <TechparkPageShell showBackdrop>
      <TechparkSubnavSection
        current="/techpark/line-follower-hackathone"
        lang={lang}
        onNavigate={onNavigate}
        title={isBs ? 'LINE FOLLOWER' : 'LINE FOLLOWER'}
        subtitle={heroContent}
      />

      <section className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">TRACKS</div>
                <div className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {isBs ? 'Beginner i Advanced' : 'Beginner & Advanced'}
                </div>
                <p className="mt-3 max-w-3xl text-sm font-mono leading-relaxed text-gray-300">
                  {isBs
                    ? 'Isti kit, isti sat, ista pravila. Jedina razlika je mapa.'
                    : 'Same kit, same clock, same rules. The only difference is the map.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:w-[28rem]">
                <button
                  type="button"
                  onClick={() => setSelectedTrack('beginner')}
                  className={`px-4 py-4 rounded-2xl font-bold font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                    selectedTrack === 'beginner'
                      ? 'bg-blue-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.55)]'
                      : 'border border-white/15 text-gray-300 hover:border-blue-500 hover:bg-blue-500/10'
                  }`}
                >
                  BEGINNER
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTrack('advanced')}
                  className={`px-4 py-4 rounded-2xl font-bold font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                    selectedTrack === 'advanced'
                      ? 'bg-emerald-600 text-white shadow-[0_0_18px_rgba(16,185,129,0.45)]'
                      : 'border border-white/15 text-gray-300 hover:border-emerald-500 hover:bg-emerald-500/10'
                  }`}
                >
                  ADVANCED
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {selectedTrack === 'beginner' ? 'BEGINNER TRACK' : 'ADVANCED TRACK'}
                </div>
                <div className="mt-3 text-2xl font-black tracking-tight text-white">
                  {selectedTrack === 'beginner'
                    ? isBs
                      ? 'Fundamenti + konzistentnost'
                      : 'Fundamentals + consistency'
                    : isBs
                      ? 'Robusnost + adaptacija'
                      : 'Robustness + adaptation'}
                </div>
                <p className="mt-4 text-sm font-mono leading-relaxed text-gray-300">
                  {selectedTrack === 'beginner'
                    ? isBs
                      ? 'Beginner nagradjuje cisto pracenje linije, dobru kalibraciju i stabilan rezultat kroz vise voznji.'
                      : 'Beginner rewards clean tracking, good calibration, and stable results across multiple runs.'
                    : isBs
                      ? 'Advanced testira recover, stabilnost i tuning pod pritiskom na kompleksnijoj mapi.'
                      : 'Advanced tests recovery, stability, and tuning under pressure on a more complex map.'}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    selectedTrack === 'beginner'
                      ? isBs
                        ? 'Siroke krivine + par ostrijih zavoja.'
                        : 'Wide curves with a few sharper turns.'
                      : isBs
                        ? 'Vise “hairpin” zavoja i brze promjene pravca.'
                        : 'More hairpins and rapid direction changes.',
                    isBs ? 'Ista pravila, isti kit.' : 'Same rules, same kit.',
                    isBs ? 'Autonomija bez remote-a.' : 'Autonomy, no remote control.',
                    isBs ? 'Brzina vrijedi samo ako je ponovljiva.' : 'Speed matters only if repeatable.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                    {isBs ? 'KONCEPTUALNI PREVIEW' : 'CONCEPTUAL PREVIEW'}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-gray-200">
                    <MapIcon className="h-4 w-4 text-blue-200" />
                    {selectedTrack === 'beginner' ? 'BEGINNER' : 'ADVANCED'}
                  </div>
                </div>
                <div className="mt-5 aspect-[2/1] w-full overflow-hidden rounded-3xl border border-white/10">
                  <MapPreview level={selectedTrack} />
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-5 text-sm font-mono leading-relaxed text-gray-200">
                  {isBs
                    ? 'Finalne mape se otkrivaju na startu. Preview je samo osjecaj razlike izmedju Beginner i Advanced tezine.'
                    : 'Final maps are revealed at kickoff. This preview only conveys the difference between Beginner and Advanced difficulty.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? 'HISTORIJA LINE FOLLOWERA' : 'HISTORY OF LINE FOLLOWERS'}
            subtitle={isBs
              ? 'Line follower izgleda jednostavno, ali iza njega su senzori, kontrola i iteracije — savrsen “mini” problem robotike.'
              : 'A line follower looks simple, but behind it are sensors, control theory, and iteration — robotics in a small package.'}
          />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7 lg:sticky lg:top-28">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                    {isBs ? 'ZASTO JE OVO KULTNO?' : 'WHY IS THIS A CLASSIC?'}
                  </div>
                  <div className="mt-3 text-2xl font-black tracking-tight text-white">
                    {isBs ? 'Line follower = robotika u malom' : 'Line follower = robotics in miniature'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                  <CircuitBoard className="h-5 w-5 text-blue-200" />
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm font-mono leading-relaxed text-gray-200">
                <p>
                  {isBs
                    ? 'Jedna linija na podu izgleda trivijalno, ali takmicenje brzo pokaze koliko je stvar “sistem”: senzor -> signal -> kontrola -> motor -> fizika.'
                    : 'A single line on the floor looks trivial, but competitions quickly prove it’s a full system: sensor → signal → control → motors → physics.'}
                </p>
                <p>
                  {isBs
                    ? 'Najbolji timovi ne pobijede jer imaju “trik”, nego jer imaju proces: kalibracija, test matrix, biljeske i iteracije koje se mogu ponoviti.'
                    : 'The best teams don’t win because of one trick. They win with process: calibration, a test matrix, notes, and repeatable iterations.'}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                {[
                  {
                    icon: Activity,
                    title: isBs ? 'Senzori' : 'Sensors',
                    text: isBs
                      ? 'Refleksija, filtracija, pragovi i stabilno citanje.'
                      : 'Reflectance, filtering, thresholds, stable reads.',
                  },
                  {
                    icon: Gauge,
                    title: isBs ? 'Kontrola' : 'Control',
                    text: isBs
                      ? 'PID, damping, overshoot i “smooth” voznja.'
                      : 'PID, damping, overshoot, smooth motion.',
                  },
                  {
                    icon: Wrench,
                    title: isBs ? 'Mehanika' : 'Mechanics',
                    text: isBs
                      ? 'Trenje, tezina, sensor height i montaza bez lufta.'
                      : 'Friction, weight, sensor height, rigid mounting.',
                  },
                  {
                    icon: ShieldCheck,
                    title: isBs ? 'Robusnost' : 'Robustness',
                    text: isBs
                      ? 'Recovery kad se izgubi linija, konzistentnost i reset.'
                      : 'Recovery when the line is lost, consistency, reset.',
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                          <Icon className="h-5 w-5 text-blue-200" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-base font-black text-white">{card.title}</div>
                          <div className="text-sm font-mono leading-relaxed text-gray-300">{card.text}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/35 via-white/10 to-transparent" />
              {[
                {
                  era: isBs ? 'RANI DANI' : 'EARLY DAYS',
                  title: isBs ? 'Svjetlo + refleksija' : 'Light + reflectance',
                  text: isBs
                    ? 'Prve verzije su se oslanjale na razliku izmedju bijelog i crnog. Stabilno osvjetljenje je bilo pola pobjede.'
                    : 'Early designs relied on white vs. black reflectance. Stable lighting was half the win.',
                },
                {
                  era: isBs ? 'KONTROLA' : 'CONTROL',
                  title: isBs ? 'PID i tuning kao vjestina' : 'PID and tuning as a skill',
                  text: isBs
                    ? 'Kad su mikrokontroleri postali jeftini, line follower je postao idealan trening za kontrolu: stabilnost, overshoot i damping.'
                    : 'When microcontrollers got cheap, line followers became the perfect control playground: stability, overshoot, damping.',
                },
                {
                  era: isBs ? 'SENZORSKI NIZOVI' : 'SENSOR ARRAYS',
                  title: isBs ? 'Vise senzora, vise informacije' : 'More sensors, more information',
                  text: isBs
                    ? 'Array senzori daju poziciju linije, ne samo “ima/nema”. To otvara brzu i precizniju voznju.'
                    : 'Arrays give line position, not just “yes/no”. That unlocks faster and more precise motion.',
                },
                {
                  era: isBs ? 'DANAS' : 'TODAY',
                  title: isBs ? 'Robusnost pobijedjuje trikove' : 'Robustness beats tricks',
                  text: isBs
                    ? 'Moderni line follower je sistem: mehanika, napajanje, senzori i algoritam. Pobjedjuje tim koji brzo iterira i zadrzi stabilnost.'
                    : 'A modern line follower is a system: mechanics, power, sensors, and algorithm. The winner iterates fast and stays stable.',
                },
              ].map((item) => (
                <div key={item.title} className="relative pl-12 pb-8 last:pb-0">
                  <div className="absolute left-0 top-2 h-9 w-9 rounded-2xl border border-white/10 bg-black/60 backdrop-blur flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" aria-hidden="true" />
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                    <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{item.era}</div>
                    <div className="mt-2 text-xl font-black text-white">{item.title}</div>
                    <p className="mt-3 text-sm font-mono leading-relaxed text-gray-300">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? 'PRAVILA I REGULACIJE' : 'RULES & REGULATIONS'}
            subtitle={isBs
              ? 'Pravila postoje da takmicenje bude fer i sigurno: isti kit, ista pravila, isti sat.'
              : 'Rules keep it fair and safe: same kit, same rules, same clock.'}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: isBs ? 'Fer start' : 'Fair start',
                text: isBs
                  ? 'Svaki tim dobija identican kit. Prednost je u procesu, ne u budzetu.'
                  : 'Every team receives the same kit. Advantage comes from process, not budget.',
              },
              {
                icon: Timer,
                title: isBs ? '48h sat' : '48h clock',
                text: isBs
                  ? 'Vrijeme pocinje nakon otkrivanja mape. Po isteku ide lock-in i nema vise izmjena.'
                  : 'Time starts after the map reveal. When it ends, lock-in happens and changes stop.',
              },
              {
                icon: BatteryCharging,
                title: isBs ? 'Sigurnost' : 'Safety',
                text: isBs
                  ? 'Baterije, kablovi i alat moraju biti sigurni. Opasne modifikacije znace diskvalifikaciju.'
                  : 'Batteries, wiring, and tools must be safe. Unsafe modifications can disqualify a team.',
              },
              {
                icon: Activity,
                title: isBs ? 'Autonomija' : 'Autonomy',
                text: isBs
                  ? 'Tokom voznje nema remote-a. Robot mora sam pratiti liniju i vratiti se na stazu.'
                  : 'No remote control during runs. The robot must follow the line and recover on its own.',
              },
              {
                icon: Wrench,
                title: isBs ? 'Inzenjerski standard' : 'Engineering standard',
                text: isBs
                  ? 'Cist kabeling, stabilna mehanika i dobra kalibracija su dio performansi.'
                  : 'Clean wiring, solid mechanics, and good calibration are part of performance.',
              },
              {
                icon: Users,
                title: isBs ? 'Kultura' : 'Culture',
                text: isBs
                  ? 'Postujte druge timove i prostor. Hackathon je intenzivan, ali ostaje civilizovan.'
                  : 'Respect other teams and the space. Hackathons are intense, but stay civilized.',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[1.75rem] border border-white/10 bg-black/30 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xl font-black tracking-tight text-white">{card.title}</div>
                      <p className="mt-3 text-sm font-mono leading-relaxed text-gray-300">{card.text}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                      <Icon className="h-5 w-5 text-blue-200" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[
              {
                eyebrow: isBs ? 'KIT + MODS' : 'KIT + MODS',
                title: isBs ? 'Sta smijete mijenjati (i zasto)' : 'What you can modify (and why)',
                body: isBs ? (
                  <div className="space-y-4">
                    <p>
                      Kit je zajednicka osnova, ali hackathon nagradjuje optimizaciju. Smijete mijenjati sve sto
                      poboljsava stabilnost i performanse bez dodavanja novih komponenti koje bi promijenile fer start.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Mehanika: sensor height, raspored tezine, montaza, tocak/trenje.',
                        'Softver: PID, filtracija, recovery, speed profile, reset procedura.',
                        'Kabliranje: uredno, sigurno, bez labavih konektora.',
                        'Tuning proces: biljeske, test matrix, “baseline -> iterate” rutina.',
                      ].map((line) => (
                        <div key={line} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-mono text-gray-200">
                          <div className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                            <span>{line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300">
                      Bitno: ako nesto nije jasno, bolje je pitati prije ugradnje nego kasnije riskirati kaznu.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      The kit is the shared baseline, but the hackathon rewards optimization. You can change anything
                      that improves stability and performance without adding new components that would break fairness.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Mechanics: sensor height, weight distribution, mounting, wheels/friction.',
                        'Software: PID, filtering, recovery, speed profile, reset procedure.',
                        'Wiring: clean routing, secure connectors, no loose plugs.',
                        'Tuning process: notes, test matrix, baseline → iterate routine.',
                      ].map((line) => (
                        <div key={line} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-mono text-gray-200">
                          <div className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                            <span>{line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300">If something is unclear, ask before you install it to avoid penalties.</p>
                  </div>
                ),
              },
              {
                eyebrow: isBs ? 'FAIRNESS' : 'FAIRNESS',
                title: isBs ? 'Sta nije dozvoljeno' : 'What is not allowed',
                body: isBs ? (
                  <div className="space-y-4">
                    <p>
                      Da bi svi imali isti start, nije dozvoljeno ubacivati dodatne senzore ili dijelove koji daju
                      hardversku prednost. Takodje, voznja je 100% autonomna.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Dodatni senzori (kamera, lidar, ekstra array, itd.).',
                        'Dodatni motori / driveri / baterije van kit-a.',
                        'Remote upravljanje ili asistencija tokom run-a.',
                        'Opasne modifikacije (short, pregrijavanje, neosigurana baterija).',
                      ].map((line) => (
                        <div key={line} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-mono text-gray-200">
                          <div className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                            <span>{line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300">
                      Ako tim slucajno osteti dio iz kit-a, zamjena ide samo uz organizatore kako bi sve ostalo fer.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      To keep the baseline identical, extra sensors or parts that create hardware advantage are not
                      allowed. Also, runs are 100% autonomous.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Extra sensors (camera, lidar, extra arrays, etc.).',
                        'Extra motors / drivers / batteries outside the kit.',
                        'Remote control or assistance during a run.',
                        'Unsafe modifications (shorts, overheating, unsecured battery).',
                      ].map((line) => (
                        <div key={line} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-mono text-gray-200">
                          <div className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                            <span>{line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300">
                      If a team damages a kit part, replacement goes only through organizers so fairness stays intact.
                    </p>
                  </div>
                ),
              },
              {
                eyebrow: isBs ? 'TIMEKEEPING' : 'TIMEKEEPING',
                title: isBs ? '48h sat + lock-in (parc ferme)' : '48h clock + lock-in (parc fermé)',
                body: isBs ? (
                  <div className="space-y-4">
                    <p>
                      Sat pocinje odmah nakon otkrivanja mape. To je trenutak kad svi dobiju istu informaciju i od tog
                      momenta se racuna 48 sati. Po isteku, robot ide u lock-in i vise se ne mijenja.
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <div className="flex items-start gap-3">
                        <Timer className="mt-0.5 h-5 w-5 text-blue-200" />
                        <div className="space-y-2">
                          <div className="text-base font-black text-white">Lock-in</div>
                          <p className="text-sm text-gray-300">
                            Nakon lock-in-a, dozvoljene su samo procedure start/stop i zamjena baterije ako je to dio
                            kit-a i ako je identicna. Nema tuninga, nema premjestanja senzora.
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      Cilj lock-in-a je da svi voze “finalni” robot, bez zadnjih “trik” izmjena neposredno prije trke.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      The clock starts immediately after the map reveal. That is the moment everyone gets the same
                      information, and from that point the 48 hours are counted. When time ends, the robot goes to
                      lock-in and can’t be changed.
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <div className="flex items-start gap-3">
                        <Timer className="mt-0.5 h-5 w-5 text-blue-200" />
                        <div className="space-y-2">
                          <div className="text-base font-black text-white">Lock-in</div>
                          <p className="text-sm text-gray-300">
                            After lock-in, only start/stop procedures and a battery swap are allowed (if it’s the same
                            kit battery). No tuning, no sensor repositioning.
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      Lock-in exists so everyone races with a final robot — no last-minute “trick” changes right before
                      competition.
                    </p>
                  </div>
                ),
              },
              {
                eyebrow: isBs ? 'RUNS' : 'RUNS',
                title: isBs ? 'Run procedura + intervencije' : 'Run procedure + interventions',
                body: isBs ? (
                  <div className="space-y-4">
                    <p>
                      Run pocinje na start markeru. Tim ima kratko vrijeme za “ready” stanje, a onda robot krece. Ako
                      robot izgubi liniju, treba se vratiti autonomno. Manual intervencija znaci kaznu.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Start: robot se postavi, resetuje i krece na signal.',
                        'Off-track: recovery autonomno; ako ne moze, intervencija uz kaznu.',
                        'Ponovljivost: vise runova, nije samo jedan “lucky”.',
                        'Postovanje staze: nema “skracivanja” ni presjecanja.',
                      ].map((line) => (
                        <div key={line} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-mono text-gray-200">
                          <div className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                            <span>{line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300">
                      Finalna verzija kazni i format kvalifikacija/finala bice objavljeni na startu, ali princip ostaje:
                      autonomija + cist run.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>
                      A run starts at the start marker. Teams get a short time to reach a ready state, then the robot
                      goes on the signal. If the robot loses the line, it must recover autonomously. Manual
                      intervention adds penalties.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Start: place the robot, reset, and start on the signal.',
                        'Off-track: recover autonomously; if not possible, intervene with a penalty.',
                        'Repeatability: multiple runs; not just one lucky attempt.',
                        'Respect the course: no shortcuts, no cutting across.',
                      ].map((line) => (
                        <div key={line} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-mono text-gray-200">
                          <div className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                            <span>{line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300">
                      The final penalty details and qualifier/final format will be announced at kickoff, but the
                      principle stays: autonomy + a clean run.
                    </p>
                  </div>
                ),
              },
            ].map((card) => (
              <details
                key={card.title}
                className="group rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{card.eyebrow}</div>
                    <div className="mt-3 text-2xl font-black tracking-tight text-white">{card.title}</div>
                    <p className="mt-3 text-sm font-mono leading-relaxed text-gray-300">
                      {isBs ? 'Klikni da otvoris detalje i primjere.' : 'Click to expand details and examples.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-2 transition-transform group-open:rotate-180">
                    <ChevronDown className="h-5 w-5 text-blue-200" />
                  </div>
                </summary>
                <div className="mt-6 text-sm font-mono leading-relaxed text-gray-200">{card.body}</div>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/30 p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'BRZI SNAPSHOT' : 'QUICK SNAPSHOT'}
                </div>
                <div className="mt-3 text-2xl font-black tracking-tight text-white">
                  {isBs ? '4 stvari koje svi pamte' : '4 things everyone remembers'}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                <Flag className="h-5 w-5 text-blue-200" />
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm font-mono text-gray-200">
              {[
                { icon: Package, label: isBs ? 'Isti kit' : 'Same kit', text: isBs ? 'Nema extra senzora.' : 'No extra sensors.' },
                { icon: Timer, label: isBs ? '48h' : '48h', text: isBs ? 'Sat krece na reveal.' : 'Clock starts at reveal.' },
                { icon: ShieldCheck, label: isBs ? 'Sigurno' : 'Safe', text: isBs ? 'Baterija osigurana.' : 'Battery secured.' },
                { icon: Activity, label: isBs ? 'Autonomno' : 'Autonomous', text: isBs ? 'Bez remote asistencije.' : 'No remote assistance.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/35 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{item.label}</div>
                        <div className="mt-2 text-sm font-mono text-gray-200">{item.text}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                        <Icon className="h-5 w-5 text-blue-200" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? 'KRITERIJI OCJENJIVANJA' : 'JUDGING CRITERIA'}
            subtitle={isBs
              ? 'Bodovanje nagradjuje brzinu, stabilnost i dobar inzenjerski proces.'
              : 'Scoring rewards speed, stability, and strong engineering process.'}
          />

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/25 via-black/35 to-black p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                    {isBs ? 'SCORE MINDSET' : 'SCORE MINDSET'}
                  </div>
                  <div className="mt-3 text-2xl font-black tracking-tight text-white">
                    {isBs ? 'Brzina + stabilnost + proces' : 'Speed + stability + process'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                  <Trophy className="h-5 w-5 text-blue-200" />
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm font-mono leading-relaxed text-gray-200">
                <p>
                  {isBs
                    ? 'Najvaznije je kako robot vozi na mapi: vrijeme, zavrsavanje i kazne. Ali bodovanje namjerno nagradjuje i konzistentnost, jer jedan “lucky” run nije najbolji robot.'
                    : 'The core is how your robot runs the map: time, completion, and penalties. But scoring also rewards consistency, because one lucky run doesn’t prove the best robot.'}
                </p>
                <p>
                  {isBs
                    ? 'Takodje gledamo kvalitet izrade i tuning metodu. U 48 sati, uredan robot i dobar proces donose vise brzine nego “random” promjene.'
                    : 'We also consider build quality and tuning method. In 48 hours, a clean build and good process produce more speed than random changes.'}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                {[
                  isBs ? 'Vise runova (kvalifikacije + final).' : 'Multiple runs (qualifiers + finals).',
                  isBs ? 'Kazne za intervencije i izlazak sa linije.' : 'Penalties for interventions and leaving the line.',
                  isBs ? 'Tie-break: manja varijacija i bolji tech check.' : 'Tie-break: lower variance and better tech check.',
                  isBs ? 'Beginner/Advanced: isto bodovanje, samo druga mapa.' : 'Beginner/Advanced: same scoring, only map differs.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label={isBs ? 'Prethodna kartica' : 'Previous card'}
                onClick={() => scrollJudgingRail(-1)}
                className="hidden lg:inline-flex absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur transition-colors hover:bg-black/80"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                type="button"
                aria-label={isBs ? 'Sljedeca kartica' : 'Next card'}
                onClick={() => scrollJudgingRail(1)}
                className="hidden lg:inline-flex absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur transition-colors hover:bg-black/80"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>

              <div
                ref={judgingRailRef}
                onPointerDown={handleJudgingRailPointerDown}
                onPointerMove={handleJudgingRailPointerMove}
                onPointerUp={handleJudgingRailPointerUp}
                onPointerCancel={handleJudgingRailPointerUp}
                className="overflow-x-auto pb-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex w-max">
                  <div ref={judgingRailGroupRef} className="flex w-max gap-4 pr-4">
                    {judgingCriteriaCards.map((criterion, index) => renderJudgingCriterionCard(criterion, `main-${index}`))}
                  </div>
                  <div className="flex w-max gap-4 pr-4" aria-hidden="true">
                    {judgingCriteriaCards.map((criterion, index) => renderJudgingCriterionCard(criterion, `clone-a-${index}`))}
                  </div>
                  <div className="flex w-max gap-4 pr-4" aria-hidden="true">
                    {judgingCriteriaCards.map((criterion, index) => renderJudgingCriterionCard(criterion, `clone-b-${index}`))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Flag,
                title: isBs ? 'Penali (primjeri)' : 'Penalties (examples)',
                text: isBs
                  ? 'Intervencije, izlazak sa linije i presjecanje staze nose kazne. Cilj je autonomija i cist run.'
                  : 'Interventions, leaving the line, and cutting the course add penalties. The goal is autonomy and a clean run.',
                bullets: [
                  isBs ? 'Manual “pick up” tokom run-a.' : 'Manual pick-up during a run.',
                  isBs ? 'Gubitak linije bez recovery-a.' : 'Losing the line without recovery.',
                  isBs ? 'Presjecanje / shortcut.' : 'Cutting across / shortcut.',
                ],
              },
              {
                icon: ShieldCheck,
                title: isBs ? 'Tech check' : 'Tech check',
                text: isBs
                  ? 'Sigurnost je obavezna: baterija mora biti osigurana, kablovi uredni, nema short rizika.'
                  : 'Safety is mandatory: battery secured, wiring clean, no short risk.',
                bullets: [
                  isBs ? 'Baterija stabilno montirana.' : 'Battery securely mounted.',
                  isBs ? 'Konektori ne ispadaju u voznji.' : 'Connectors won’t fall out in motion.',
                  isBs ? 'Temperatura motora/drivera pod kontrolom.' : 'Motor/driver temperature under control.',
                ],
              },
              {
                icon: Gauge,
                title: isBs ? 'Tie-break' : 'Tie-break',
                text: isBs
                  ? 'Kad su rezultati blizu, prednost ima tim sa manjom varijacijom i urednijim robotom.'
                  : 'When results are close, advantage goes to the team with lower variance and a cleaner robot.',
                bullets: [
                  isBs ? 'Manja varijacija vremena kroz runove.' : 'Lower variance across runs.',
                  isBs ? 'Manje intervencija.' : 'Fewer interventions.',
                  isBs ? 'Bolji tech check.' : 'Better tech check.',
                ],
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-2xl font-black tracking-tight text-white">{card.title}</div>
                      <p className="mt-3 text-sm font-mono leading-relaxed text-gray-300">{card.text}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                      <Icon className="h-5 w-5 text-blue-200" />
                    </div>
                  </div>
                  <div className="mt-5 space-y-2 text-sm font-mono leading-relaxed text-gray-200">
                    {card.bullets.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> 
 
      {false && (
      <section className="border-t border-white/5 py-24"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <SectionHeader 
            title={isBs ? 'MAPE' : 'MAPS'} 
            subtitle={isBs 
              ? 'Mape se otkrivaju na startu. Beginner i Advanced se razlikuju samo po mapi.'
              : 'Maps are revealed at kickoff. Beginner and Advanced differ only by the map.'}
          />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                    {isBs ? 'MAP REVEAL PROTOKOL' : 'MAP REVEAL PROTOCOL'}
                  </div>
                  <div className="mt-3 text-2xl font-black tracking-tight text-white">
                    {isBs ? 'Ista informacija, isti trenutak' : 'Same information, same moment'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                  <Flag className="h-5 w-5 text-blue-200" />
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm font-mono leading-relaxed text-gray-200">
                {[
                  {
                    icon: Users,
                    title: isBs ? '1) Reveal za sve timove' : '1) Reveal for all teams',
                    text: isBs
                      ? 'Beginner i Advanced mape se predstave svima istovremeno: start/finish, legenda i posebne oznake.'
                      : 'Beginner and Advanced maps are shown to everyone at the same time: start/finish, legend, special markers.',
                  },
                  {
                    icon: MapIcon,
                    title: isBs ? '2) Walk-through + Q&A' : '2) Walk-through + Q&A',
                    text: isBs
                      ? 'Kraci walk-through da nema nejasnoca. Pitanja su dozvoljena prije nego sto sat krene.'
                      : 'A short walk-through to remove ambiguity. Questions are allowed before the clock starts.',
                  },
                  {
                    icon: Timer,
                    title: isBs ? '3) Sat krece (T0)' : '3) Clock starts (T0)',
                    text: isBs
                      ? 'Od tog trenutka imate 48h za iteracije: baseline, tuning, test, optimizacija.'
                      : 'From that moment you have 48h for iteration: baseline, tuning, testing, optimization.',
                  },
                  {
                    icon: Trophy,
                    title: isBs ? '4) Lock-in + trka' : '4) Lock-in + race',
                    text: isBs
                      ? 'Po isteku robot ide u lock-in. Trka se vozi kroz vise runova za konzistentnost i finale.'
                      : 'After time ends the robot goes to lock-in. Racing happens over multiple runs for consistency and finals.',
                  },
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/30 p-5">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                        <Icon className="h-5 w-5 text-blue-200" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-base font-black text-white">{step.title}</div>
                        <p className="text-sm font-mono leading-relaxed text-gray-300">{step.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-6">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'MAP LEGEND (STA GLEDAS)' : 'MAP LEGEND (WHAT YOU LOOK FOR)'}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    {
                      icon: MapIcon,
                      title: isBs ? 'Linija' : 'Line',
                      text: isBs
                        ? 'Sirina i kontrast: kalibracija senzora mora biti brza i stabilna.'
                        : 'Width and contrast: sensor calibration must be fast and stable.',
                    },
                    {
                      icon: Flag,
                      title: isBs ? 'Start/finish' : 'Start/finish',
                      text: isBs
                        ? 'Jasna procedura starta i reset-a smanjuje stres i kazne.'
                        : 'Clear start and reset procedure reduces stress and penalties.',
                    },
                    {
                      icon: Activity,
                      title: isBs ? 'Recovery zone' : 'Recovery',
                      text: isBs
                        ? 'Sekcije gdje robot mora brzo naci liniju bez manualne pomoci.'
                        : 'Sections where the robot must find the line quickly without manual help.',
                    },
                    {
                      icon: ShieldCheck,
                      title: isBs ? 'Kazne' : 'Penalties',
                      text: isBs
                        ? 'Intervencije i presjecanje. Cist run = bodovi.'
                        : 'Interventions and shortcuts. Clean runs score.',
                    },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                            <Icon className="h-5 w-5 text-blue-200" />
                          </div>
                          <div className="space-y-1">
                            <div className="text-base font-black text-white">{card.title}</div>
                            <p className="text-sm font-mono leading-relaxed text-gray-300">{card.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {([
                  {
                    level: 'beginner' as const,
                    eyebrow: 'BEGINNER MAP',
                    badge: isBs ? 'FOUNDATIONS' : 'FOUNDATIONS',
                    bullets: [
                      isBs ? 'Cist ritam i konzistentna voznja.' : 'Clean rhythm and consistent driving.',
                      isBs ? 'Pravi se razlika kroz kalibraciju i PID.' : 'Calibration and PID make the difference.',
                      isBs ? 'Manje “trikova”, vise osnova.' : 'Less gimmicks, more fundamentals.',
                    ],
                  },
                  {
                    level: 'advanced' as const,
                    eyebrow: 'ADVANCED MAP',
                    badge: isBs ? 'ROBUSTNESS' : 'ROBUSTNESS',
                    bullets: [
                      isBs ? 'Kompleksniji zavoji i brze promjene.' : 'More complex turns and rapid changes.',
                      isBs ? 'Recovery mora biti brz i stabilan.' : 'Recovery must be fast and stable.',
                      isBs ? 'Najbolji timovi iteriraju disciplinovano.' : 'Top teams iterate with discipline.',
                    ],
                  },
                ] as const).map((card) => (
                  <div key={card.eyebrow} className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{card.eyebrow}</div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-gray-200">
                        <MapIcon className="h-4 w-4 text-blue-200" />
                        {card.badge}
                      </div>
                    </div>
                    <div className="mt-5 aspect-[2/1] w-full overflow-hidden rounded-3xl border border-white/10">
                      <MapPreview level={card.level} />
                    </div>
                    <div className="mt-5 space-y-3 text-sm font-mono leading-relaxed text-gray-200">
                      {card.bullets.map((line) => (
                        <div key={line} className="flex items-start gap-3">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 via-[#070b12] to-black p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                      {isBs ? 'STA MOZETE URADITI PRIJE REVEAL-A' : 'WHAT YOU CAN DO BEFORE REVEAL'}
                    </div>
                    <div className="mt-3 text-2xl font-black tracking-tight text-white">
                      {isBs ? 'Pripremi proces, ne mapu' : 'Prepare process, not the map'}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                    <CircuitBoard className="h-5 w-5 text-blue-200" />
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    isBs ? 'Reset i start procedura (svaki put isto).' : 'Reset and start procedure (same every time).',
                    isBs ? 'Kalibracija senzora (brzo i stabilno).' : 'Sensor calibration (fast and stable).',
                    isBs ? 'Baseline PID (siguran, ne brz).' : 'Baseline PID (safe, not fast).',
                    isBs ? 'Recovery logika (sta kad se linija izgubi).' : 'Recovery logic (what happens when line is lost).',
                    isBs ? 'Test matrix (sta testiramo i kako mjerimo).' : 'Test matrix (what we test, how we measure).',
                    isBs ? 'Uredna mehanika + kabeling (manje bugova).' : 'Clean mechanics + wiring (fewer bugs).',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-purple-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> 
        </div> 
      </section> 
      )} 
 
      <section className="border-t border-white/5 py-24"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <SectionHeader 
            title={isBs ? 'TIM (SVAKI TIM)' : 'TEAMS (EACH TEAM)'} 
            subtitle={isBs
              ? 'Dobra podjela uloga i disciplina u testiranju su pola pobjede.'
              : 'Clear roles and test discipline are half the win.'}
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                    {isBs ? 'PREPORUKA' : 'RECOMMENDATION'}
                  </div>
                  <div className="mt-3 text-2xl font-black tracking-tight text-white">
                    {isBs ? 'Tim od 3 clana, jasne uloge' : 'Team of 3, clear roles'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                  <Users className="h-5 w-5 text-blue-200" />
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm font-mono leading-relaxed text-gray-200">
                <p>
                  {isBs
                    ? 'U 48 sati, fokus pobijedjuje “multi-tasking”. Najbolji timovi imaju uloge, ali ostaju fleksibilni: svako zna sta radi, a svi razumiju sistem.'
                    : 'In 48 hours, focus beats multitasking. The best teams have roles but stay flexible: everyone owns a part, and everyone understands the system.'}
                </p>
                <p>
                  {isBs
                    ? 'Ako se uloge preklapaju, uradite to svjesno: jedan vodi mehaniku, jedan firmware, jedan test/tuning, ali svi dijele biljeske i odluke.'
                    : 'If roles overlap, do it intentionally: one leads mechanics, one firmware, one test/tuning, but all share notes and decisions.'}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Wrench,
                    title: isBs ? 'Mehanika + montaza' : 'Mechanics + mounting',
                    text: isBs
                      ? 'Sasija, tocak, trenje, visina senzora, raspored tezine, stabilnost.'
                      : 'Chassis, wheels, friction, sensor height, weight distribution, stability.',
                  },
                  {
                    icon: CircuitBoard,
                    title: isBs ? 'Elektronika + firmware' : 'Electronics + firmware',
                    text: isBs
                      ? 'Napajanje, driver, citanje senzora, PID loop, recovery, reset.'
                      : 'Power, driver, sensor reads, PID loop, recovery, reset.',
                  },
                  {
                    icon: Gauge,
                    title: isBs ? 'Test + tuning' : 'Test + tuning',
                    text: isBs
                      ? 'Test matrix, biljeske, iteracije, dizanje brzine, konzistentnost.'
                      : 'Test matrix, notes, iterations, raising speed, consistency.',
                  },
                  {
                    icon: Trophy,
                    title: isBs ? 'Strategija + pit' : 'Strategy + pit',
                    text: isBs
                      ? 'Plan rada, checkpointi, quick fixes, kratko objasnjenje rjesenja.'
                      : 'Work plan, checkpoints, quick fixes, short solution explanation.',
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                          <Icon className="h-5 w-5 text-blue-200" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-base font-black text-white">{card.title}</div>
                          <p className="text-sm font-mono leading-relaxed text-gray-300">{card.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-6">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'TIM CHECKLIST (NE PRESKACI)' : 'TEAM CHECKLIST (DON’T SKIP)'}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    isBs ? 'Wiring diagram + oznaceni konektori.' : 'Wiring diagram + labeled connectors.',
                    isBs ? 'Kalibracija procedure (svaki put isto).' : 'Calibration procedure (same every time).',
                    isBs ? 'Baseline parametri sacuvani.' : 'Baseline parameters saved.',
                    isBs ? 'Test matrix (sta, kako, koliko puta).' : 'Test matrix (what, how, how many times).',
                    isBs ? 'Battery plan (punjenje, zamjene, sigurnost).' : 'Battery plan (charging, swaps, safety).',
                    isBs ? 'Recovery strategija (kad se linija izgubi).' : 'Recovery strategy (when the line is lost).',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{isBs ? '48H WORKFLOW' : '48H WORKFLOW'}</div>
                  <div className="mt-3 text-2xl font-black tracking-tight text-white">
                    {isBs ? 'Iteracije bez haosa' : 'Iteration without chaos'}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                  <Timer className="h-5 w-5 text-blue-200" />
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm font-mono leading-relaxed text-gray-200">
                {[
                  {
                    label: isBs ? 'T0 - T+6h' : 'T0 - T+6h',
                    title: isBs ? 'Baseline i stabilno citanje' : 'Baseline and stable sensing',
                    text: isBs
                      ? 'Sklopi, kalibrisi, zavrsi prvi spori krug. Bez toga nema brzine.'
                      : 'Assemble, calibrate, finish a first slow lap. Without this there is no speed.',
                  },
                  {
                    label: isBs ? 'T+6h - T+24h' : 'T+6h - T+24h',
                    title: isBs ? 'PID tuning + recovery' : 'PID tuning + recovery',
                    text: isBs
                      ? 'Tuning u fazama. Dodaj recovery logiku i testiraj razlicite situacije.'
                      : 'Tune in phases. Add recovery logic and test across situations.',
                  },
                  {
                    label: isBs ? 'T+24h - T+42h' : 'T+24h - T+42h',
                    title: isBs ? 'Brzina uz konzistentnost' : 'Speed with consistency',
                    text: isBs
                      ? 'Dizi brzinu samo kad je stabilno. Mjeri varijaciju i uklanjaj uzrok, ne simptom.'
                      : 'Increase speed only when stable. Measure variance and remove root causes, not symptoms.',
                  },
                  {
                    label: isBs ? 'T+42h - T+48h' : 'T+42h - T+48h',
                    title: isBs ? 'Freeze + priprema za trku' : 'Freeze + race prep',
                    text: isBs
                      ? 'Zakljucaj parametre, uredi kabeling, provjeri bateriju i pripremi reset proceduru.'
                      : 'Freeze parameters, clean wiring, check the battery, and prepare reset procedure.',
                  },
                ].map((step) => (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-black/35 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{step.label}</div>
                        <div className="mt-2 text-lg font-black text-white">{step.title}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                        <Gauge className="h-5 w-5 text-blue-200" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-mono leading-relaxed text-gray-300">{step.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-200" />
                  <div className="space-y-2">
                    <div className="text-base font-black text-white">{isBs ? 'Pit disciplina' : 'Pit discipline'}</div>
                    <p className="text-sm font-mono leading-relaxed text-gray-300">
                      {isBs
                        ? 'Sve promjene zapisati. Jedna promjena po run-u. Ako nesto pokvarite, vratite se na baseline i krenite ponovo.'
                        : 'Write down every change. One change per run. If something breaks, return to baseline and rebuild forward.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? 'STA KIT UKLJUCUJE' : 'WHAT THE KIT INCLUDES'}
            subtitle={isBs
              ? 'Svaki tim dobija identican kit. Sadrzaj je isti 1:1 za sve timove.'
              : 'Every team receives an identical kit. Contents are 1:1 the same for everyone.'}
          />

          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-emerald-300">
                  {isBs ? 'SAME KIT FOR EVERY TEAM' : 'SAME KIT FOR EVERY TEAM'}
                </div>
                <div className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {isBs ? 'Jednak start, isti izazov' : 'Equal start, same challenge'}
                </div>
                <p className="mt-4 max-w-3xl text-sm font-mono leading-relaxed text-gray-300">
                  {isBs
                    ? 'Brendovi i modeli nisu poenta. Poenta je da svi dobiju identicnu listu dijelova, pa da rezultat zavisi od dizajna, tuninga i procesa.'
                    : 'Brands and models are not the point. The point is everyone gets an identical parts list, and results come from design, tuning, and process.'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:w-[26rem]">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'STA JE “IDENTICNO”' : 'WHAT “IDENTICAL” MEANS'}
                </div>
                <div className="mt-4 space-y-3 text-sm font-mono leading-relaxed text-gray-200">
                  {[
                    isBs ? 'Isti broj i tip dijelova za sve timove.' : 'Same count and type of parts for every team.',
                    isBs ? 'Beginner i Advanced dobijaju isti kit.' : 'Beginner and Advanced receive the same kit.',
                    isBs ? 'Zamjena dijelova samo preko organizatora.' : 'Part replacements only via organizers.',
                    isBs ? 'Bez dodatnih senzora i hardware advantage-a.' : 'No extra sensors or hardware advantage.',
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                {
                  icon: CircuitBoard,
                  title: isBs ? 'Core + kontrola' : 'Core + control',
                  items: isBs
                    ? [
                        'Mikrokontroler (Arduino-klasa)',
                        'Motor driver',
                        'Osnovni konektori + kablovi',
                        'USB povezivanje za programiranje',
                      ]
                    : ['Microcontroller (Arduino-class)', 'Motor driver', 'Basic connectors + wiring', 'USB programming connection'],
                },
                {
                  icon: Activity,
                  title: isBs ? 'Senzori' : 'Sensors',
                  items: isBs
                    ? ['IR refleksijski senzorski niz', 'Nosac / rampa za senzore', 'Kalibracija i podesavanje visine']
                    : ['IR reflectance sensor array', 'Sensor mount / bar', 'Calibration + height adjustment'],
                },
                {
                  icon: Wrench,
                  title: isBs ? 'Sasija + pogon' : 'Chassis + drive',
                  items: isBs
                    ? ['Sasija (chassis) + montazni elementi', '2x DC motori + tockovi', 'Rezervni vijci i distanceri']
                    : ['Chassis + mounting hardware', '2x DC motors + wheels', 'Spare screws + standoffs'],
                },
                {
                  icon: BatteryCharging,
                  title: isBs ? 'Napajanje' : 'Power',
                  items: isBs
                    ? ['Baterijski pack', 'Sigurno montiranje baterije', 'Napomene za punjenje i koristenje']
                    : ['Battery pack', 'Safe battery mounting', 'Charging and usage notes'],
                },
                {
                  icon: Package,
                  title: isBs ? 'Materijali' : 'Materials',
                  items: isBs
                    ? ['Zip ties / trake', 'Mali spare set potrosnih stvari', 'Organizacija dijelova u paketu']
                    : ['Zip ties / tape', 'Small set of spares/consumables', 'Organized parts in the kit'],
                },
                {
                  icon: ShieldCheck,
                  title: isBs ? 'Standard' : 'Standard',
                  items: isBs
                    ? ['Isti kit za sve', 'Jednaka pravila za oba tracka', 'Tech check prije trke']
                    : ['Same kit for all', 'Same rules for both tracks', 'Tech check before racing'],
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xl font-black tracking-tight text-white">{card.title}</div>
                        <div className="mt-4 space-y-3 text-sm font-mono leading-relaxed text-gray-200">
                          {card.items.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                        <Icon className="h-5 w-5 text-blue-200" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'STA TIM DONOSI' : 'WHAT YOUR TEAM BRINGS'}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    isBs ? 'Laptop + kabl + editor.' : 'Laptop + cable + editor.',
                    isBs ? 'USB hub / adapteri (ako treba).' : 'USB hub / adapters (if needed).',
                    isBs ? 'Biljeske + test plan.' : 'Notes + test plan.',
                    isBs ? 'Disciplina u iteracijama.' : 'Discipline in iterations.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'STA NE DONOSIMO NA STAZU' : 'WHAT STAYS OUTSIDE THE TRACK'}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    isBs ? 'Dodatne senzore (kamera, lidar, itd.).' : 'Extra sensors (camera, lidar, etc.).',
                    isBs ? 'Dodatne baterije / motore van kit-a.' : 'Extra batteries / motors outside the kit.',
                    isBs ? 'Remote kontrolu tokom run-a.' : 'Remote control during runs.',
                    isBs ? 'Opasne power modifikacije.' : 'Unsafe power modifications.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? 'AGENDA' : 'AGENDA'}
            subtitle={isBs
              ? 'Kickoff, 48h sprint i dan trke. Sat pocinje na reveal-u, a zavrsava lock-inom.'
              : 'Kickoff, a 48h sprint, and race day. The clock starts at reveal and ends at lock-in.'}
          />

          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-blue-300">
                  {isBs ? 'DRAFT AGENDA' : 'DRAFT AGENDA'}
                </div>
                <div className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {isBs ? 'July 4 -> July 6 (48h sprint)' : 'July 4 → July 6 (48h sprint)'}
                </div>
                <p className="mt-4 max-w-3xl text-sm font-mono leading-relaxed text-gray-300">
                  {isBs
                    ? 'Ovo je “flow” agenda: redoslijed i logika dogadjaja. Tacni sati se mogu uskladiti, ali princip ostaje isti: reveal -> 48h -> lock-in -> race.'
                    : 'This is the flow agenda: the order and logic of the event. Exact hours may shift, but the principle stays: reveal → 48h → lock-in → race.'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-6 lg:w-[26rem]">
                <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                  {isBs ? 'ZLATNO PRAVILO' : 'GOLDEN RULE'}
                </div>
                <div className="mt-4 space-y-3 text-sm font-mono leading-relaxed text-gray-200">
                  {[
                    isBs ? 'Baseline prvo, brzina poslije.' : 'Baseline first, speed second.',
                    isBs ? 'Jedna promjena po run-u.' : 'One change per run.',
                    isBs ? 'Biljeske su “superpower”.' : 'Notes are a superpower.',
                    isBs ? 'Lock-in znaci kraj izmjena.' : 'Lock-in means no more changes.',
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                {
                  date: isBs ? 'JULI 4' : 'JULY 4',
                  icon: Flag,
                  title: isBs ? 'Kickoff + map reveal (T0)' : 'Kickoff + map reveal (T0)',
                  items: [
                    isBs ? 'Registracija timova + podjela kitova.' : 'Team check-in + kit handout.',
                    isBs ? 'Reveal mape: legenda, Q&A, pa start sata.' : 'Map reveal: legend, Q&A, then clock start.',
                    isBs ? 'Baseline: sklapanje + kalibracija + prvi spori krug.' : 'Baseline: assembly + calibration + first slow lap.',
                    isBs ? 'Prvi tuning: stabilno pracenje i recovery.' : 'First tuning: stable tracking and recovery.',
                  ],
                },
                {
                  date: isBs ? 'JULI 5' : 'JULY 5',
                  icon: CircuitBoard,
                  title: isBs ? 'Iteracije + robusnost (T+24h)' : 'Iteration + robustness (T+24h)',
                  items: [
                    isBs ? 'Test matrix: krivine, brzine, reset, varijacija.' : 'Test matrix: corners, speeds, reset, variance.',
                    isBs ? 'Stabilizacija napajanja + kabeling.' : 'Power stability + wiring cleanup.',
                    isBs ? 'Optimizacija mehanike: visina senzora, trenje, tezina.' : 'Mechanical tweaks: sensor height, friction, weight.',
                    isBs ? 'Dizanje brzine u fazama, bez gubitka stabilnosti.' : 'Raise speed in phases without losing stability.',
                  ],
                },
                {
                  date: isBs ? 'JULI 6' : 'JULY 6',
                  icon: Trophy,
                  title: isBs ? 'Lock-in + race + awards (T+48h)' : 'Lock-in + race + awards (T+48h)',
                  items: [
                    isBs ? 'Lock-in (parc ferme): predaja robota.' : 'Lock-in (parc fermé): submit the robot.',
                    isBs ? 'Tech check: sigurnost, baterija, konektori, procedura.' : 'Tech check: safety, battery, connectors, procedure.',
                    isBs ? 'Kvalifikacije + finale na mapama.' : 'Qualifiers + finals on the maps.',
                    isBs ? 'Dodjela nagrada + kratki pit debrief.' : 'Awards + short pit debrief.',
                  ],
                },
              ].map((day) => {
                const Icon = day.icon;
                return (
                  <div key={day.date} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-[#070b12] to-black p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">{day.date}</div>
                        <div className="mt-3 text-2xl font-black tracking-tight text-white">{day.title}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                        <Icon className="h-5 w-5 text-blue-200" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-3 text-sm font-mono leading-relaxed text-gray-200">
                      {day.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                      {isBs ? 'MENTOR CHECKPOINTS' : 'MENTOR CHECKPOINTS'}
                    </div>
                    <div className="mt-3 text-2xl font-black tracking-tight text-white">
                      {isBs ? 'Ubrzaj debugging' : 'Speed up debugging'}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                    <ShieldCheck className="h-5 w-5 text-blue-200" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-mono leading-relaxed text-gray-300">
                  {isBs
                    ? 'Tokom sprinta planiramo kratke checkpoint-e gdje tim moze dobiti feedback: kalibracija, PID, recovery, mehanika i sigurnost.'
                    : 'During the sprint we run short checkpoints where teams can get feedback: calibration, PID, recovery, mechanics, and safety.'}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    isBs ? 'Brza provjera senzor signala.' : 'Quick sensor signal check.',
                    isBs ? 'PID tuning sanity check.' : 'PID tuning sanity check.',
                    isBs ? 'Power/wiring pregled.' : 'Power/wiring review.',
                    isBs ? 'Recovery strategija i test plan.' : 'Recovery strategy and test plan.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-purple-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-blue-300">
                      {isBs ? 'READY ZA TRKU' : 'RACE READY'}
                    </div>
                    <div className="mt-3 text-2xl font-black tracking-tight text-white">
                      {isBs ? 'Checklist prije lock-in-a' : 'Checklist before lock-in'}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
                    <Wrench className="h-5 w-5 text-blue-200" />
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm font-mono text-gray-200">
                  {[
                    isBs ? 'Baterija osigurana + punjenje plan.' : 'Battery secured + charging plan.',
                    isBs ? 'Konektori provjereni (ne ispada).' : 'Connectors checked (won’t fall out).',
                    isBs ? 'Sensor height fiksirana.' : 'Sensor height fixed.',
                    isBs ? 'Baseline parametri sacuvani.' : 'Baseline parameters saved.',
                    isBs ? 'Reset/start procedura jasna.' : 'Reset/start procedure clear.',
                    isBs ? 'Recovery radi u 80% slucajeva.' : 'Recovery works in most cases.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-4">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-6">
                  <div className="flex items-start gap-3">
                    <Timer className="mt-0.5 h-5 w-5 text-blue-200" />
                    <div className="space-y-2">
                      <div className="text-base font-black text-white">{isBs ? 'Savjet' : 'Tip'}</div>
                      <p className="text-sm font-mono leading-relaxed text-gray-300">
                        {isBs
                          ? 'Ne ganjaj 1% brzine u zadnjem satu. Zakljucaj stabilan robot i ucini da svaka voznja izgleda isto.'
                          : 'Don’t chase 1% speed in the last hour. Lock a stable robot and make every run look the same.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TechparkPageShell>
  );
};
