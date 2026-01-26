import React, { useEffect, useRef, useState } from 'react';
import { Translations } from '../types';

interface MissionProps {
  tMission: Translations['mission'];
  tAlgo: Translations['algorithm'];
}

export const Mission: React.FC<MissionProps> = ({ tMission, tAlgo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const charsToShow = Math.floor(progress * codeString.length);
  const visibleCode = codeString.substring(0, charsToShow);

  return (
    <section ref={containerRef} className="py-24 bg-qla-dark relative border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Mission Text */}
          <div className="text-left">
             <div className="inline-block mb-6">
                <h3 className="text-3xl md:text-5xl font-black leading-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    {tMission.title}
                </h3>
                <div className="h-1 w-1/3 bg-blue-600 mt-2"></div>
             </div>
             
             <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {tMission.text}
             </p>
             <p className="text-xl text-white font-light border-l-4 border-blue-500 pl-6">
                {tMission.text2}
             </p>
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