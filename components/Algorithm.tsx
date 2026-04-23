import React, { useEffect, useState, useRef } from 'react';
import { Translations } from '../types';
import { useScrollRoot } from './ScrollRootContext';

interface AlgorithmProps {
  t: Translations['algorithm'];
}

export const Algorithm: React.FC<AlgorithmProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRootRef = useScrollRoot();
  
  // Generate static random data for the "fingerprint" of the algorithm
  const [baseValues] = useState(() => Array.from({ length: 40 }, () => Math.random() * 0.5 + 0.2)); // 0.2 to 0.7 scale

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      // Get global scroll position
      const scrollY = scrollRootRef?.current?.scrollTop ?? window.scrollY;
      
      // Calculate a "time" variable based on scroll. 
      // Dividing by larger number slows down the wave frequency relative to pixels scrolled
      const time = scrollY * 0.02; 

      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        
        // Combine base value with a sine wave that moves with 'time' (scroll)
        // i * 0.2 defines the frequency of the wave across the bars
        const wave = Math.sin(i * 0.2 + time);
        
        // Map wave (-1 to 1) to a height percentage modifier
        // Base height from random data
        const base = baseValues[i] * 100;
        
        // Apply wave influence. 
        // When wave is high, we boost the height. When low, we suppress it.
        const modifiedHeight = base + (wave * 30);
        
        // Clamp between 5% and 100%
        const finalHeight = Math.max(5, Math.min(100, modifiedHeight));
        
        bar.style.height = `${finalHeight}%`;
        
        // visual reaction: High bars light up
        if (finalHeight > 85) {
             bar.style.backgroundColor = '#ffffff';
             bar.style.boxShadow = '0 0 15px rgba(255,255,255,0.6)';
             bar.style.zIndex = '10';
        } else {
             // Calculate a blue opacity based on height
             const opacity = 0.3 + (finalHeight / 200);
             bar.style.backgroundColor = `rgba(37, 99, 235, ${opacity})`;
             bar.style.boxShadow = 'none';
             bar.style.zIndex = '1';
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [baseValues, scrollRootRef]);

  return (
    <section ref={containerRef} className="py-32 bg-gray-900 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* UNIFIED TITLE */}
        <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50"></div>
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-center uppercase">
                <span className="text-blue-600">/</span> {t.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50"></div>
        </div>

        <div className="text-center mb-16">
            <p className="text-xl text-blue-200 font-light max-w-2xl mx-auto">
              {t.subtitle}
            </p>
        </div>

        {/* Visualizer Container */}
        <div className="h-64 md:h-80 w-full max-w-5xl mx-auto flex items-end justify-between gap-1 px-4 relative">
             {/* Base line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-blue-500/30"></div>
            
            {baseValues.map((_, idx) => (
                <div 
                    key={idx}
                    ref={(el) => { barsRef.current[idx] = el; }}
                    className="w-full rounded-t-sm transition-colors duration-75 will-change-[height, background-color]"
                    style={{ height: '20%' }}
                ></div>
            ))}
        </div>
        
        <div className="mt-8 flex justify-center gap-8 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                <span>MEMORY_HEAP</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-sm shadow-[0_0_5px_white]"></div>
                <span>ACTIVE_PROCESS</span>
            </div>
        </div>

      </div>
    </section>
  );
};
