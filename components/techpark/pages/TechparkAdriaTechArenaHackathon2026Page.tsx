import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Cloud,
  Code2,
  HeartPulse,
  Landmark,
  MapPin,
  Network,
  Rocket,
  Sparkles,
  Trophy,
  UserCheck,
  Users,
  Workflow,
} from 'lucide-react';
import { SectionHeader } from '../shared/SectionHeader';
import { TechparkPageShell } from '../shared/TechparkPageShell';
import { TechparkSubnavSection } from '../shared/TechparkSubnavSection';
import type { TechparkPageProps } from '../types';

const EVENT_START_DATE = new Date(2026, 8, 12, 0, 0, 0, 0);
const OFFICIAL_EVENT_URL = 'https://adriatecharena.com/events';
const APPLICATION_URL = 'https://adriatecharena.com/apply';

const getCountdown = (target: Date) => {
  const difference = Math.max(target.getTime() - Date.now(), 0);

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
};

export const TechparkAdriaTechArenaHackathon2026Page: React.FC<TechparkPageProps> = ({ lang, onNavigate }) => {
  const isBs = lang === 'bs';
  const [countdown, setCountdown] = useState(() => getCountdown(EVENT_START_DATE));

  useEffect(() => {
    const interval = window.setInterval(() => setCountdown(getCountdown(EVENT_START_DATE)), 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const countdownUnits = useMemo(
    () => [
      { value: countdown.days, label: isBs ? 'DANA' : 'DAYS' },
      { value: countdown.hours, label: isBs ? 'SATI' : 'HOURS' },
      { value: countdown.minutes, label: isBs ? 'MINUTA' : 'MINS' },
      { value: countdown.seconds, label: isBs ? 'SEKUNDI' : 'SECS' },
    ],
    [countdown, isBs],
  );

  const facts = [
    {
      icon: CalendarDays,
      label: isBs ? 'DATUM' : 'DATE',
      value: isBs ? '12–13. septembar 2026.' : '12–13 September 2026',
    },
    {
      icon: Clock3,
      label: isBs ? 'FORMAT' : 'FORMAT',
      value: isBs ? '24-satni startup hackathon' : '24-hour startup hackathon',
    },
    {
      icon: MapPin,
      label: isBs ? 'LOKACIJA' : 'LOCATION',
      value: 'qla.dev Techpark, Sarajevo',
    },
    {
      icon: Users,
      label: isBs ? 'UČESNICI' : 'BUILDERS',
      value: isBs ? 'Oko 50 odabranih buildera' : 'Around 50 selected builders',
    },
  ];

  const tracks = [
    {
      icon: Cloud,
      number: '01',
      title: 'AI Infrastructure',
      text: isBs
        ? 'Alati, platforme i sistemi koji AI čine pouzdanijim, dostupnijim i spremnim za stvarne proizvode.'
        : 'Tools, platforms, and systems that make AI more reliable, accessible, and ready for real products.',
      accent: 'from-blue-500/25 to-cyan-500/5',
    },
    {
      icon: HeartPulse,
      number: '02',
      title: 'HealthTech',
      text: isBs
        ? 'Digitalna rješenja koja unapređuju pristup zdravstvu, rad profesionalaca i iskustvo pacijenata.'
        : 'Digital solutions that improve access to care, professional workflows, and patient experiences.',
      accent: 'from-rose-500/20 to-orange-500/5',
    },
    {
      icon: Landmark,
      number: '03',
      title: 'Fintech',
      text: isBs
        ? 'Novi načini za sigurnije, jednostavnije i pametnije upravljanje novcem i finansijskim uslugama.'
        : 'New ways to make money and financial services safer, simpler, and smarter.',
      accent: 'from-emerald-500/20 to-teal-500/5',
    },
  ];

  const format = [
    {
      icon: UserCheck,
      step: '01',
      title: isBs ? 'ODABIR' : 'SELECT',
      text: isBs
        ? 'Builderi se prijavljuju samostalno ili kao tim. Selekcija se radi prema kvalitetu, motivaciji i miksu vještina.'
        : 'Builders apply individually or as teams. Selection prioritizes quality, motivation, and a strong mix of skills.',
    },
    {
      icon: Network,
      step: '02',
      title: isBs ? 'POVEŽI SE' : 'MEET',
      text: isBs
        ? 'Upoznaj mentore, partnere, vlasnike izazova i druge ozbiljne buildere iz regije i šire.'
        : 'Meet mentors, partners, challenge owners, and serious builders from across the region and beyond.',
    },
    {
      icon: Code2,
      step: '03',
      title: isBs ? 'IZGRADI' : 'BUILD',
      text: isBs
        ? 'Tokom fokusiranog 24-satnog sprinta timovi grade funkcionalne proizvode uz tehničku podršku i mentorstvo.'
        : 'During a focused 24-hour sprint, teams build working products with technical support and mentorship.',
    },
    {
      icon: Trophy,
      step: '04',
      title: isBs ? 'PREDSTAVI' : 'DEMO',
      text: isBs
        ? 'Finalisti predstavljaju rješenja žiriju, partnerima, osnivačima, investitorima i zajednici.'
        : 'Finalists present to judges, partners, founders, investors, and the wider community.',
    },
    {
      icon: Rocket,
      step: '05',
      title: isBs ? 'NASTAVI' : 'CONTINUE',
      text: isBs
        ? 'Najjači projekti dobijaju vidljivost, dalji feedback, upoznavanje s partnerima i priliku za budući Demo Night.'
        : 'Strong projects receive visibility, follow-up, partner introductions, and future Demo Night opportunities.',
    },
  ];

  const heroContent = (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-end">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-mono tracking-[0.18em] text-blue-200 uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          {isBs ? 'PRVO IZDANJE · SARAJEVO' : 'FIRST EDITION · SARAJEVO'}
        </div>
        <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          ADRIA TECH
          <span className="block bg-gradient-to-r from-blue-400 via-white to-cyan-300 bg-clip-text text-transparent">
            ARENA 2026
          </span>
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          {isBs
            ? 'Prvi Adria Tech Arena hackathon dolazi u qla.dev Techpark. Sarajevo otvara regionalnu platformu na kojoj odabrani inžinjeri, dizajneri, studenti i osnivači grade stvarne proizvode — ne prezentacije.'
            : 'The first Adria Tech Arena hackathon is coming to qla.dev Techpark. Sarajevo launches a regional platform where selected engineers, designers, students, and founders build real products — not slide decks.'}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-blue-600 px-6 py-4 text-sm font-bold font-mono tracking-[0.12em] text-white transition-colors hover:bg-blue-500"
          >
            {isBs ? 'PRIJAVI SE' : 'APPLY NOW'} <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={OFFICIAL_EVENT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-6 py-4 text-sm font-bold font-mono tracking-[0.12em] text-white transition-colors hover:border-blue-400 hover:text-blue-300"
          >
            {isBs ? 'SLUŽBENA STRANICA' : 'OFFICIAL PAGE'} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-black/50 p-5 sm:p-6">
        <div className="text-[11px] font-mono tracking-[0.18em] text-blue-300 uppercase">
          {isBs ? 'ARENA SE OTVARA ZA' : 'THE ARENA OPENS IN'}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {countdownUnits.map((unit) => (
            <div key={unit.label} className="rounded-xl border border-white/10 bg-white/[0.04] px-1 py-4 text-center">
              <div className="text-xl font-black text-white sm:text-3xl">{String(unit.value).padStart(2, '0')}</div>
              <div className="mt-1 text-[8px] font-mono tracking-[0.12em] text-gray-400 sm:text-[10px]">{unit.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-sm font-mono text-gray-300">
          <MapPin className="h-4 w-4 shrink-0 text-blue-400" />
          qla.dev Techpark · Braće Mulić 81 · Sarajevo
        </div>
      </div>
    </div>
  );

  return (
    <TechparkPageShell showBackdrop>
      <TechparkSubnavSection
        current="/techpark/adria-tech-arena-hackathon-2026"
        lang={lang}
        onNavigate={onNavigate}
        title="ADRIA TECH ARENA"
        subtitle={heroContent}
      />

      <section className="pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <Icon className="h-5 w-5 text-blue-400" />
                <div className="mt-5 text-[10px] font-mono tracking-[0.18em] text-gray-500">{label}</div>
                <div className="mt-2 text-sm font-bold leading-snug text-white">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-blue-500/25 bg-gradient-to-r from-blue-950/50 via-black/60 to-cyan-950/30 p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="text-[11px] font-mono tracking-[0.2em] text-blue-300 uppercase">
                  {isBs ? 'PRVI PUT U TECHPARKU' : 'FIRST AT TECHPARK'}
                </div>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {isBs ? 'Sarajevo pokreće arenu.' : 'Sarajevo starts the arena.'}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
                {isBs
                  ? 'qla.dev Techpark je domaćin prvog Adria Tech Arena događaja. Ovdje počinje mreža koja povezuje ozbiljne buildere s mentorima, kompanijama, startupima i ljudima koji mogu pomoći da ideja postane stvaran proizvod.'
                  : 'qla.dev Techpark hosts the first Adria Tech Arena event. This is where a network begins—connecting serious builders with mentors, companies, startups, and people who can help turn an idea into a real product.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/35 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? 'TRI IZAZOVA. JEDNA ARENA.' : 'THREE TRACKS. ONE ARENA.'}
            subtitle={isBs ? 'Timovi grade funkcionalne proizvode oko stvarnih problema.' : 'Teams build working products around real problems.'}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {tracks.map(({ icon: Icon, number, title, text, accent }) => (
              <article key={title} className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${accent} p-7`}>
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-white" />
                  <span className="font-mono text-xs text-gray-500">{number}</span>
                </div>
                <h3 className="mt-12 text-2xl font-black text-white">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isBs ? '24 SATA OD IDEJE DO DEMOA' : '24 HOURS FROM IDEA TO DEMO'}
            subtitle={isBs ? 'Jasan format, ozbiljni timovi i fokus na ono što radi.' : 'A clear format, serious teams, and a focus on what works.'}
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 lg:grid-cols-5">
            {format.map(({ icon: Icon, step, title, text }) => (
              <article key={step} className="bg-[#05080e] p-6">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-blue-400" />
                  <span className="font-mono text-xs text-gray-600">{step}</span>
                </div>
                <h3 className="mt-8 text-sm font-black tracking-[0.14em] text-white">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <Users className="h-8 w-8 text-blue-400" />
            <h3 className="mt-7 text-3xl font-black text-white">{isBs ? 'KO TREBA BITI U ARENI?' : 'WHO BELONGS IN THE ARENA?'}</h3>
            <p className="mt-5 leading-relaxed text-gray-300">
              {isBs
                ? 'Inžinjeri, dizajneri, studenti, osnivači i product ljudi koji žele graditi s jednako motivisanim timom. Možeš se prijaviti samostalno ili sa svojim timom.'
                : 'Engineers, designers, students, founders, and product people who want to build with equally motivated peers. Apply individually or with your team.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['ENGINEERS', 'DESIGNERS', 'STUDENTS', 'FOUNDERS', 'PRODUCT'].map((role) => (
                <span key={role} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-mono tracking-[0.13em] text-gray-300">{role}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <Workflow className="h-8 w-8 text-cyan-400" />
            <h3 className="mt-7 text-3xl font-black text-white">{isBs ? 'VAŽNI DATUMI' : 'KEY DATES'}</h3>
            <div className="mt-6 space-y-4">
              {[
                [isBs ? '16. AUGUST' : '16 AUGUST', isBs ? 'Zatvaranje prijava' : 'Applications close'],
                [isBs ? '18. AUGUST' : '18 AUGUST', isBs ? 'Objava odluka' : 'Selection decisions'],
                [isBs ? '12–13. SEPTEMBAR' : '12–13 SEPTEMBER', isBs ? 'Adria Hack Sarajevo u qla.dev Techparku' : 'Adria Hack Sarajevo at qla.dev Techpark'],
              ].map(([date, text]) => (
                <div key={date} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-white/10 pt-4 text-sm">
                  <span className="font-mono font-bold text-blue-300">{date}</span>
                  <span className="text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10">
            <Rocket className="h-6 w-6 text-blue-300" />
          </div>
          <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-6xl">
            {isBs ? 'ARENA SE FORMIRA SADA.' : 'THE ARENA IS FORMING NOW.'}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {isBs
              ? 'Prijavi se za prvo izdanje, upoznaj ljude koji ozbiljno grade i donesi ideju koja može nastaviti živjeti i nakon hackathona.'
              : 'Apply for the first edition, meet people who are serious about building, and bring an idea that can keep moving after the hackathon.'}
          </p>
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-blue-600 px-8 py-4 text-sm font-bold font-mono tracking-[0.14em] text-white transition-colors hover:bg-blue-500"
          >
            {isBs ? 'PRIJAVI SE ZA ADRIA HACK' : 'APPLY FOR ADRIA HACK'} <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs font-mono text-gray-500">
            BuilderBase × Adria Tech Arena · qla.dev Techpark
          </p>
        </div>
      </section>
    </TechparkPageShell>
  );
};
