import React, { useEffect, useState, useRef } from 'react';
import { Translations } from '../types';
import { STATS_DATA } from '../constants';

interface StatsProps {
  t: Translations['stats'];
}

interface StatItemProps {
  end: number;
  suffix: string;
  label: string;
  start: boolean;
}

// Hook for counting animation
const useCounter = (end: number, duration: number = 2000, start: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

export const Stats: React.FC<StatsProps> = ({ t }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const labels = [t.years, t.projects, t.clients, t.services];

  return (
    <section ref={ref} className="bg-black py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS_DATA.map((stat, idx) => (
            <StatItem 
              key={idx} 
              end={stat.value} 
              suffix={stat.suffix} 
              label={labels[idx]} 
              start={inView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem: React.FC<StatItemProps> = ({ end, suffix, label, start }) => {
  const count = useCounter(end, 2000, start);
  
  return (
    <div className="text-center group">
      <div className="flex items-center justify-center mb-2">
        <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700 tracking-tighter">
          {count}{suffix}
        </span>
      </div>
      <span className="text-white font-mono text-sm md:text-base uppercase tracking-widest border-b-2 border-transparent group-hover:border-blue-500 transition-colors pb-1">
        {label}
      </span>
    </div>
  );
};
