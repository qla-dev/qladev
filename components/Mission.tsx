import React, { useEffect, useRef, useState } from 'react';
import { Language, Translations } from '../types';
import { useScrollRoot } from './ScrollRootContext';
import { Cpu, Layers3, Sparkles, Users2 } from 'lucide-react';

interface MissionProps {
  lang: Language;
  tMission: Translations['mission'];
  tAlgo: Translations['algorithm'];
}

export const Mission: React.FC<MissionProps> = ({ lang, tMission, tAlgo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const missionCardRefs = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRootRef = useScrollRoot();
  const missionMeta = lang === 'bs'
    ? {
        systemsTitle: 'SOFTVER + HARDVER',
        systemsText: 'Od digitalnog proizvoda do integracije fizickih uredjaja i infrastrukture.',
        teamTitle: 'ISKUSNI + MLADI',
        teamText: 'Tim koji spaja seniorsko iskustvo sa novom inzenjerskom energijom.',
        primaryLabel: 'PIONIRSKI PRAVAC',
        secondaryLabel: 'MODEL ISPORUKE',
      }
    : {
        systemsTitle: 'SOFTWARE + HARDWARE',
        systemsText: 'From digital products to integrated devices, infrastructure, and field systems.',
        teamTitle: 'SEASONED + YOUNG',
        teamText: 'A team structure that pairs senior experience with fresh engineering energy.',
        primaryLabel: 'PIONEERING DIRECTION',
        secondaryLabel: 'DELIVERY MODEL',
      };

  const codeString = `
class QlaDev extends Future {
  constructor() {
    this.vision = "Limitless";
    this.stack = ["AI", "Cloud", "IoT"];
  }

  async buildSolution(clientNeed) {
    const design = await this.conceptualize(clientNeed);
    const prototype = await this.rapidDevelop(design);
    
    // Optimizing for scale
    while (prototype.performance < 100) {
      prototype.optimize();
    }
    
    return prototype.deploy({ region: "GLOBAL" });
  }

  /* 
   * "Innovation is not just code.
   *  It's about solving the unsolvable."
   */
}
  `.trim();

  useEffect(() => {
    const missionCardOrder = [0, 3, 2, 1];

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start when top enters window, end when bottom leaves
      const start = windowHeight * 0.8;
      const end = -height * 0.2;
      
      let p = (start - top) / (start - end);
      p = Math.max(0, Math.min(1, p)); // Clamp 0-1
      
      setProgress(p);

      // Mission cards pop in with a custom sequence:
      // 1) top-left, 2) bottom-right, 3) bottom-left, 4) top-right
      missionCardOrder.forEach((cardIndex, orderIndex) => {
        const card = missionCardRefs.current[cardIndex];
        if (!card) return;

        const staggerStart = orderIndex * 0.1;
        const revealWindow = 0.26;
        const localProgress = Math.max(0, Math.min(1, (p - 0.08 - staggerStart) / revealWindow));
        const scale = 0.78 + localProgress * 0.22;
        const translateY = (1 - localProgress) * 34;
        const rotateX = (1 - localProgress) * 18;

        card.style.opacity = localProgress.toString();
        card.style.transform = `perspective(900px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
        card.style.boxShadow = `0 ${8 + localProgress * 18}px ${18 + localProgress * 30}px rgba(0,0,0,${0.18 + localProgress * 0.18})`;
      });
    };

    const scrollTarget = scrollRootRef?.current ?? window;

    scrollTarget.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, [scrollRootRef]);

  const charsToShow = Math.floor(progress * codeString.length);
  const visibleCode = codeString.substring(0, charsToShow);

  return (
    <section ref={containerRef} className="pb-16 lg:pb-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* UNIFIED TITLE */}
        <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-center uppercase">
                <span className="text-blue-600">/</span> {tMission.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Mission Text */}
          <div className="relative">
             <div className="pointer-events-none absolute -left-3 top-8 h-24 w-24 rounded-full bg-blue-600/10 blur-3xl"></div>
             <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl"></div>

             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               <article
                 ref={(el) => {
                   missionCardRefs.current[0] = el;
                 }}
                 className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blue-600/12 to-black/60 p-5 will-change-[opacity,transform] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                 style={{ opacity: 0, transform: 'perspective(900px) translateY(34px) scale(0.78) rotateX(18deg)' }}
               >
                 <div className="mb-5 flex items-center gap-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/15 text-blue-300">
                     <Cpu className="h-5 w-5" strokeWidth={1.8} />
                   </div>
                   <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                 </div>
                 <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-blue-300">
                   {missionMeta.systemsTitle}
                 </p>
                 <p className="font-mono text-sm leading-relaxed text-blue-100/80">
                   {missionMeta.systemsText}
                 </p>
               </article>

               <article
                 ref={(el) => {
                   missionCardRefs.current[1] = el;
                 }}
                 className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blue-600/12 to-black/60 p-5 will-change-[opacity,transform] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                 style={{ opacity: 0, transform: 'perspective(900px) translateY(34px) scale(0.78) rotateX(18deg)' }}
               >
                 <div className="mb-5 flex items-center gap-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/15 text-blue-300">
                     <Users2 className="h-5 w-5" strokeWidth={1.8} />
                   </div>
                   <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent"></div>
                 </div>
                 <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-blue-300">
                   {missionMeta.teamTitle}
                 </p>
                 <p className="font-mono text-sm leading-relaxed text-blue-100/80">
                   {missionMeta.teamText}
                 </p>
               </article>

               <article
                 ref={(el) => {
                   missionCardRefs.current[2] = el;
                 }}
                 className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blue-600/12 to-black/60 p-5 will-change-[opacity,transform] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                 style={{ opacity: 0, transform: 'perspective(900px) translateY(34px) scale(0.78) rotateX(18deg)' }}
               >
                 <div className="mb-5 flex items-center gap-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/15 text-blue-300">
                     <Sparkles className="h-5 w-5" strokeWidth={1.8} />
                   </div>
                   <div className="h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                 </div>
                 <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-blue-300">
                   {missionMeta.primaryLabel}
                 </p>
                 <p className="font-mono text-sm leading-relaxed text-blue-100/80">
                   {tMission.text}
                 </p>
               </article>

               <article
                 ref={(el) => {
                   missionCardRefs.current[3] = el;
                 }}
                 className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-blue-600/12 to-black/60 p-5 will-change-[opacity,transform] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                 style={{ opacity: 0, transform: 'perspective(900px) translateY(34px) scale(0.78) rotateX(18deg)' }}
               >
                 <div className="mb-5 flex items-center gap-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600/15 text-blue-300">
                     <Layers3 className="h-5 w-5" strokeWidth={1.8} />
                   </div>
                   <div className="h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                 </div>
                 <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-blue-300">
                   {missionMeta.secondaryLabel}
                 </p>
                 <p className="font-mono text-sm leading-relaxed text-blue-100/80">
                   {tMission.text2}
                 </p>
               </article>
             </div>
          </div>

          {/* Right Column: Parallax Code Window */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="bg-[#0c0c0c] rounded-xl border border-white/10 p-6 shadow-2xl min-h-[400px] flex flex-col relative z-10">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="text-xs font-mono text-gray-600">core_logic.ts</div>
              </div>
              
              <pre className="font-mono text-sm md:text-base text-gray-300 overflow-hidden whitespace-pre-wrap">
                <code className="block">
                  <span className="text-gray-500">{tAlgo.codeComment}</span>{'\n'}
                  <span className="text-blue-400" dangerouslySetInnerHTML={{ 
                    __html: visibleCode
                      .replace(/class/g, '<span class="text-purple-400">class</span>')
                      .replace(/extends/g, '<span class="text-purple-400">extends</span>')
                      .replace(/this/g, '<span class="text-red-400">this</span>')
                      .replace(/async/g, '<span class="text-purple-400">async</span>')
                      .replace(/await/g, '<span class="text-purple-400">await</span>')
                      .replace(/return/g, '<span class="text-purple-400">return</span>')
                   }} />
                   <span className="animate-blink inline-block w-2 h-5 bg-blue-500 ml-1 align-middle"></span>
                </code>
              </pre>
              
              <div className="mt-auto pt-4 flex justify-end">
                <div className="text-xs font-bold bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                   {Math.round(progress * 100)}% COMPILED
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
