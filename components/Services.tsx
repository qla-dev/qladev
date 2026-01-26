import React from 'react';
import { Translations } from '../types';
import { SERVICES_DATA } from '../constants';
import * as LucideIcons from 'lucide-react';

interface ServicesProps {
  t: Translations['services'];
}

export const Services: React.FC<ServicesProps> = ({ t }) => {
  return (
    <section id="services" className="py-32 bg-gradient-to-b from-blue-900 via-blue-950 to-black text-white relative">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter">
                {t.title}
            </h2>
            <p className="max-w-2xl text-blue-100 text-lg font-mono border-l-4 border-white pl-6">
                {t.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service, idx) => {
                // @ts-ignore
                const Icon = LucideIcons[service.iconName] || LucideIcons.HelpCircle;

                return (
                    <div key={idx} className="group relative p-1 rounded-2xl overflow-hidden bg-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                        
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