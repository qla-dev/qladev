import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  Cpu,
  Rocket,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Language, Translations } from '../types';
import { useScrollRoot } from './ScrollRootContext';

interface AlgorithmProps {
  lang: Language;
  t: Translations['algorithm'];
}

interface PipelineStage {
  eyebrow: string;
  title: string;
  description: string;
  output: string;
  bars: number[];
  icon: LucideIcon;
}

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export const Algorithm: React.FC<AlgorithmProps> = ({ lang, t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRootRef = useScrollRoot();
  const [progress, setProgress] = useState(0);

  const isBs = lang === 'bs';
  const pipeline = useMemo<PipelineStage[]>(
    () =>
      isBs
        ? [
            {
              eyebrow: 'FAZA 01',
              title: 'Ulazni Brief',
              description: 'Pretvaramo zahtjeve, ogranicenja i ciljeve u jasan scope prije prve linije koda.',
              output: 'Jasan input',
              bars: [0.26, 0.41, 0.34, 0.54, 0.45],
              icon: Activity,
            },
            {
              eyebrow: 'FAZA 02',
              title: 'Arhitektura',
              description: 'Definisemo API granice, tok podataka, sigurnost i tehnicki pravac sistema.',
              output: 'Sistemska mapa',
              bars: [0.35, 0.48, 0.43, 0.62, 0.57],
              icon: Cpu,
            },
            {
              eyebrow: 'FAZA 03',
              title: 'Build + Integracija',
              description: 'Spajamo module, cloud servise, uredjaje i kljucne tokove u radni core.',
              output: 'Radni core',
              bars: [0.42, 0.67, 0.58, 0.74, 0.65],
              icon: Workflow,
            },
            {
              eyebrow: 'FAZA 04',
              title: 'Provjera + Harden',
              description: 'Testiramo performanse, recovery i sigurnost dok se flow ne stabilizuje.',
              output: 'Release kandidat',
              bars: [0.31, 0.46, 0.55, 0.5, 0.61],
              icon: ShieldCheck,
            },
            {
              eyebrow: 'FAZA 05',
              title: 'Isporuka + Iteracija',
              description: 'Sistem izlazi live, mjerimo signal i doterujemo ga prema stvarnom usage-u.',
              output: 'Live sistem',
              bars: [0.39, 0.59, 0.52, 0.69, 0.58],
              icon: Rocket,
            },
          ]
        : [
            {
              eyebrow: 'STEP 01',
              title: 'Brief Intake',
              description: 'We turn requirements, edge cases, and business constraints into a clear scope before any code begins.',
              output: 'Scoped input',
              bars: [0.26, 0.41, 0.34, 0.54, 0.45],
              icon: Activity,
            },
            {
              eyebrow: 'STEP 02',
              title: 'Architecture Pass',
              description: 'We define APIs, data flow, security boundaries, and the system direction before execution ramps up.',
              output: 'System map',
              bars: [0.35, 0.48, 0.43, 0.62, 0.57],
              icon: Cpu,
            },
            {
              eyebrow: 'STEP 03',
              title: 'Build + Integrate',
              description: 'Modules, cloud services, devices, and critical flows are connected into a working core.',
              output: 'Working core',
              bars: [0.42, 0.67, 0.58, 0.74, 0.65],
              icon: Workflow,
            },
            {
              eyebrow: 'STEP 04',
              title: 'Verify + Harden',
              description: 'Performance, failure recovery, and security are stress-tested until the flow stays stable.',
              output: 'Release candidate',
              bars: [0.31, 0.46, 0.55, 0.5, 0.61],
              icon: ShieldCheck,
            },
            {
              eyebrow: 'STEP 05',
              title: 'Deploy + Iterate',
              description: 'The system goes live, we measure signal, and refine it from real-world usage instead of guesswork.',
              output: 'Live system',
              bars: [0.39, 0.59, 0.52, 0.69, 0.58],
              icon: Rocket,
            },
          ],
    [isBs]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.78;
      const end = -height * 0.28;

      let nextProgress = (start - top) / (start - end);
      nextProgress = clamp(nextProgress);

      setProgress(nextProgress);
    };

    const scrollTarget = scrollRootRef?.current ?? window;

    scrollTarget.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollRootRef]);

  const stageSpan = pipeline.length;
  const progressAcrossStages = progress * stageSpan;
  const currentStageIndex = Math.min(pipeline.length - 1, Math.floor(progressAcrossStages));
  const activeStage = pipeline[currentStageIndex];

  return (
    <section
      ref={containerRef}
      className="py-16 lg:py-24 bg-gray-900 relative border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50" />
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-center uppercase">
            <span className="text-blue-600">/</span> {t.title}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50" />
        </div>

        <div className="text-center mb-12 max-w-3xl mx-auto px-4">
          <p className="text-blue-100 text-lg font-mono">{t.subtitle}</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 via-blue-950/10 to-black/40 p-5 md:p-8 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-blue-300">
                <Workflow className="h-4 w-4" />
                {t.codeComment}
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/15 text-blue-300 shadow-[0_0_24px_rgba(37,99,235,0.18)]">
                  <activeStage.icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-blue-300">
                    {activeStage.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
                    {activeStage.title}
                  </h3>
                </div>
              </div>

              <p className="mt-5 font-mono text-sm leading-relaxed text-blue-100/80">
                {activeStage.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-300">
                  {isBs ? 'Aktivna faza' : 'Current stage'} {currentStageIndex + 1}/{pipeline.length}
                </span>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-blue-300">
                  {isBs ? 'Izlaz' : 'Output'}: {activeStage.output}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {pipeline.map((stage, index) => {
                const stageProgress = progressAcrossStages - index;
                const stageState =
                  stageProgress >= 1 ? 'done' : stageProgress >= 0 ? 'active' : 'queued';

                return (
                  <div
                    key={stage.title}
                    className={`rounded-[1.25rem] border p-4 transition-all duration-500 ${
                      stageState === 'done'
                        ? 'border-blue-500/30 bg-blue-500/10'
                        : stageState === 'active'
                          ? 'border-white/15 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.06)]'
                          : 'border-white/10 bg-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-blue-300">
                        {stage.eyebrow}
                      </span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          stageState === 'done'
                            ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                            : stageState === 'active'
                              ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                              : 'bg-white/10'
                        }`}
                      />
                    </div>
                    <div className="mt-3 text-sm font-black text-white">{stage.title}</div>
                    <div className="mt-2 font-mono text-xs leading-relaxed text-gray-400">
                      {stage.output}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 overflow-x-auto pb-2">
            <div className="relative h-72 min-w-[760px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-10 h-px bg-blue-500/30" />

              <div className="absolute inset-x-0 bottom-14 top-4 flex items-end gap-4">
                {pipeline.map((stage, stageIndex) => {
                  const stageProgress = progressAcrossStages - stageIndex;
                  const stageReveal = clamp(stageProgress);
                  const isCompleted = stageProgress >= 1;
                  const isActive = stageIndex === currentStageIndex;
                  const pulseIndex = isActive ? Math.min(stage.bars.length - 1, Math.floor(clamp(stageReveal) * stage.bars.length)) : -1;

                  return (
                    <div key={stage.title} className="flex min-w-0 flex-1 flex-col justify-end gap-4">
                      <div className="flex h-full items-end gap-1.5">
                        {stage.bars.map((barValue, barIndex) => {
                          const barReveal = isCompleted
                            ? 1
                            : clamp((stageReveal - barIndex * 0.12) / 0.48);
                          const baseHeight = 14 + barValue * 24;
                          const expandedHeight = 28 + barValue * 58;
                          const height = baseHeight + (expandedHeight - baseHeight) * barReveal;
                          const isPulseBar = isActive && pulseIndex === barIndex && barReveal > 0.35;
                          const background = isPulseBar
                            ? '#ffffff'
                            : isCompleted
                              ? 'rgba(59, 130, 246, 0.9)'
                              : `rgba(37, 99, 235, ${0.22 + barReveal * 0.56})`;
                          const boxShadow = isPulseBar
                            ? '0 0 18px rgba(255,255,255,0.7)'
                            : isCompleted
                              ? '0 0 18px rgba(59,130,246,0.32)'
                              : 'none';

                          return (
                            <div
                              key={`${stage.title}-${barIndex}`}
                              className="flex-1 rounded-t-sm transition-[height,background-color,box-shadow] duration-300"
                              style={{
                                height: `${height}%`,
                                backgroundColor: background,
                                boxShadow,
                              }}
                            />
                          );
                        })}
                      </div>

                      <div className="space-y-1">
                        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-blue-300">
                          {stage.title}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                          {stage.output}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-8 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-600" />
              <span>{isBs ? 'Zavrsena faza' : 'Completed stage'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-white shadow-[0_0_6px_white]" />
              <span>{isBs ? 'Aktivni signal' : 'Active signal'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-900/70" />
              <span>{isBs ? 'Naredni blok' : 'Queued block'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
