import React from 'react';
import { Translations } from '../types';
import { NEWS_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';

interface NewsProps {
  t: Translations['news'];
}

export const News: React.FC<NewsProps> = ({ t }) => {
  return (
    <section id="news" className="py-16 lg:py-24 bg-qla-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LEFT ALIGNED TITLE STYLE */}
        <div className="flex items-center gap-6 mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-left uppercase whitespace-nowrap">
                <span className="text-blue-600">/</span> {t.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-grow opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_DATA.map((news, idx) => (
                <div key={idx} className="group cursor-pointer">
                    <div className="border-l-2 border-white/10 pl-6 py-2 group-hover:border-blue-500 transition-colors duration-300">
                        <span className="text-xs font-mono text-blue-400 mb-2 block">{news.date}</span>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {news.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                            {news.excerpt}
                        </p>
                        <div className="flex items-center text-white text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                            {t.readMore} <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
