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

interface EqualizerBar {
  stageIndex: number;
  seed: number;
}

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export const Algorithm: React.FC<AlgorithmProps> = ({ lang, t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRootRef = useScrollRoot();
  const [progress, setProgress] = useState(0);
  const [scrollSignal, setScrollSignal] = useState(0);

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

  const equalizerBars = useMemo<EqualizerBar[]>(
    () =>
      pipeline.flatMap((stage, stageIndex) =>
        stage.bars.flatMap((seed, localIndex) => {
          const widenedSeed = clamp(seed + (localIndex % 2 === 0 ? -0.06 : 0.08), 0.18, 0.92);

          return [
            { stageIndex, seed: clamp(widenedSeed - 0.08, 0.16, 0.92) },
            { stageIndex, seed: widenedSeed },
          ];
        })
      ),
    [pipeline]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = scrollRootRef?.current?.scrollTop ?? window.scrollY;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 1.2;
      const end = -height * 0.22;

      let nextProgress = (start - top) / (start - end);
      nextProgress = clamp(nextProgress);

      setProgress(nextProgress);
      setScrollSignal(scrollTop);
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

  const progressAcrossStages = progress * pipeline.length;
  const currentStageIndex = Math.min(pipeline.length - 1, Math.floor(progressAcrossStages));

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

        <div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {pipeline.map((stage, index) => {
              const stageDelta = progressAcrossStages - index;
              const stageState =
                stageDelta >= 1 ? 'done' : stageDelta >= 0 ? 'active' : 'queued';
              const StageIcon = stage.icon;

              return (
                <article
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

                  <div className="mt-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-600/10 text-blue-300">
                      <StageIcon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-black leading-tight text-white">{stage.title}</div>
                      <div className="mt-2 font-mono text-xs leading-relaxed text-gray-400">
                        {stage.output}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative mt-10 h-[22rem] md:h-[29rem]">
          <div className="absolute inset-x-0 top-0 bottom-16 grid grid-cols-5 gap-4">
            {pipeline.map((stage, index) => {
              const stageDelta = progressAcrossStages - index;
              const laneClass =
                stageDelta >= 1
                  ? 'border-blue-500/20 bg-gradient-to-b from-blue-600/8 to-transparent'
                  : stageDelta >= 0
                    ? 'border-white/10 bg-gradient-to-b from-white/5 to-transparent'
                    : 'border-white/5 bg-gradient-to-b from-blue-950/10 to-transparent';

              return (
                <div
                  key={`${stage.title}-lane`}
                  className={`rounded-[1.75rem] border ${laneClass}`}
                />
              );
            })}
          </div>

          <div className="absolute inset-x-0 top-4 bottom-16 flex items-end gap-1.5">
            {equalizerBars.map((bar, index) => {
              const stageDelta = progressAcrossStages - bar.stageIndex;
              const stageActivation = clamp(stageDelta + 0.18);
              const isCompletedStage = stageDelta >= 1;
              const isActiveStage = bar.stageIndex === currentStageIndex;
              const baseHeight = 8 + bar.seed * 18;
              const wave = Math.sin(scrollSignal * 0.022 + index * 0.55) * (4 + stageActivation * 12);
              const liveHeight = 22 + bar.seed * 62 + wave;
              const finalHeight = Math.max(
                6,
                baseHeight + (liveHeight - baseHeight) * stageActivation
              );
              const pulse = isActiveStage
                ? Math.max(0, Math.sin(scrollSignal * 0.03 + index * 0.8))
                : 0;
              const shouldHighlight = isActiveStage && pulse > 0.9;
              const backgroundColor = shouldHighlight
                ? '#ffffff'
                : isCompletedStage
                  ? 'rgba(59, 130, 246, 0.92)'
                  : isActiveStage
                    ? `rgba(37, 99, 235, ${0.45 + pulse * 0.3})`
                    : `rgba(37, 99, 235, ${0.16 + stageActivation * 0.22})`;
              const boxShadow = shouldHighlight
                ? '0 0 18px rgba(255,255,255,0.78)'
                : isCompletedStage
                  ? '0 0 16px rgba(59,130,246,0.35)'
                  : isActiveStage
                    ? '0 0 12px rgba(59,130,246,0.2)'
                    : 'none';

              return (
                <div
                  key={`${bar.stageIndex}-${index}`}
                  className="flex-1 rounded-t-[4px] transition-[height,background-color,box-shadow] duration-200"
                  style={{
                    height: `${finalHeight}%`,
                    backgroundColor,
                    boxShadow,
                  }}
                />
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-16 h-px bg-blue-500/25" />

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-5 gap-4">
            {pipeline.map((stage, index) => {
              const stageDelta = progressAcrossStages - index;
              const textTone =
                stageDelta >= 1
                  ? 'text-blue-300'
                  : stageDelta >= 0
                    ? 'text-white'
                    : 'text-gray-500';

              return (
                <div key={`${stage.title}-label`} className="space-y-1">
                  <div className={`font-mono text-[11px] uppercase tracking-[0.24em] ${textTone}`}>
                    {stage.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                    {stage.output}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-8 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-blue-600" />
            <span>{isBs ? 'Završena faza' : 'Completed stage'}</span>
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
    </section>
  );
};
