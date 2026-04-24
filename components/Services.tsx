import React, { useEffect, useMemo, useRef } from 'react';
import { Translations } from '../types';
import { SERVICES_DATA } from '../constants';
import * as LucideIcons from 'lucide-react';
import { useScrollRoot } from './ScrollRootContext';

interface ServicesProps {
  t: Translations['services'];
}

export const Services: React.FC<ServicesProps> = ({ t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRootRef = useScrollRoot();
  const serviceRevealOrder = useMemo(() => {
    const order = Array.from({ length: SERVICES_DATA.length }, (_, index) => index);

    for (let index = order.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
    }

    return order;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.68;
      const end = -height * 0.18;

      let progress = (start - top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      serviceRevealOrder.forEach((cardIndex, orderIndex) => {
        const card = serviceCardRefs.current[cardIndex];
        if (!card) return;

        const staggerStart = orderIndex * 0.08;
        const revealWindow = 0.24;
        const localProgress = Math.max(0, Math.min(1, (progress - 0.22 - staggerStart) / revealWindow));
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
    handleScroll();

    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, [scrollRootRef, serviceRevealOrder]);

  return (
    <section ref={containerRef} id="services" className="pb-16 lg:pb-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEFT ALIGNED TITLE STYLE */}
        <div className="flex items-center gap-6 mb-8">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-left uppercase whitespace-nowrap">
                <span className="text-blue-600">/</span> {t.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-grow opacity-50"></div>
        </div>
        
        <div className="text-left mb-16 pl-2">
            <p className="max-w-2xl text-blue-100 text-lg font-mono">
                {t.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service, idx) => {
                // @ts-ignore
                const Icon = LucideIcons[service.iconName] || LucideIcons.HelpCircle;

                return (
                    <div
                        key={idx}
                        ref={(el) => {
                            serviceCardRefs.current[idx] = el;
                        }}
                        className="group relative p-1 rounded-2xl overflow-hidden bg-white/10 transition-all duration-300 will-change-[opacity,transform]"
                        style={{
                            opacity: 0,
                            transform: 'perspective(900px) translateY(34px) scale(0.78) rotateX(18deg)',
                        }}
                    >
                        
                        <div className="relative h-full bg-blue-950/40 backdrop-blur-md rounded-xl p-8 flex flex-col items-start border border-blue-400/20 group-hover:border-blue-400/50 transition-colors">
                             <div className="mb-6 relative">
                                <div className="absolute -inset-2 bg-white/10 rounded-full blur-lg group-hover:bg-white/30 transition-colors"></div>
                                <div className="relative w-14 h-14 bg-blue-600 border border-blue-400/30 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>
                             </div>
                            
                            <h3 className="text-2xl font-bold mb-3 font-sans tracking-tight text-white">
                                {service.title}
                            </h3>
                            <p className="text-blue-100/80 text-sm leading-relaxed font-mono">
                                {service.description}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  );
};
