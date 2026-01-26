import React from 'react';
import { Translations } from '../types';
import { PORTFOLIO_DATA } from '../constants';

interface PortfolioProps {
  t: Translations['portfolio'];
}

export const Portfolio: React.FC<PortfolioProps> = ({ t }) => {
  return (
    <section id="portfolio" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">{t.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.map((item, idx) => (
                <div key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-900">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end p-6">
                        <span className="text-cyan-400 font-mono text-xs mb-1">{item.category}</span>
                        <h3 className="text-white font-bold text-xl">{item.title}</h3>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};