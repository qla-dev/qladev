import React, { useEffect, useRef, useState } from 'react';
import { Translations } from '../types';

interface ParallaxCodeProps {
  t: Translations['algorithm'];
}

export const ParallaxCode: React.FC<ParallaxCodeProps> = ({ t }) => {
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
    <section 
      ref={containerRef} 
      className="py-32 bg-gray-900 relative border-t border-white/5"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-[size:30px_30px] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Static Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              {t.title}
            </h2>
            <p className="text-xl text-blue-200 mb-8 font-light">
              {t.subtitle}
            </p>
            <div className="flex items-center gap-4">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
               <div className="h-px bg-red-500/50 flex-grow"></div>
               <span className="font-mono text-red-400 text-xs">RECORDING_INPUT</span>
            </div>
          </div>

          {/* Code View */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-20"></div>
            <div className="bg-[#0c0c0c] rounded-xl border border-white/10 p-6 shadow-2xl min-h-[400px] flex flex-col">
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                 <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                 <div className="w-3 h-3 rounded-full bg-gray-700"></div>
              </div>
              
              <pre className="font-mono text-sm md:text-base text-gray-300 overflow-hidden whitespace-pre-wrap">
                <code className="block">
                  <span className="text-gray-500">{t.codeComment}</span>{'\n'}
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
            </div>
            
            <div className="absolute -right-4 -bottom-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">
               {Math.round(progress * 100)}% COMPILED
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};