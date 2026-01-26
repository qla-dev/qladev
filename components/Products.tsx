import React from 'react';
import { Translations, Product } from '../types';
import { PRODUCTS_DATA } from '../constants';
import { ExternalLink, Rocket } from 'lucide-react';

interface ProductsProps {
  t: Translations['products'];
  lang: 'en' | 'bs';
}

export const Products: React.FC<ProductsProps> = ({ t, lang }) => {
  return (
    <section id="products" className="py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50"></div>
             <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-mono text-center">
                <span className="text-blue-600">/</span> {t.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50"></div>
        </div>

        <div className="text-center mb-16 max-w-3xl mx-auto px-4">
             <p className="text-blue-100 text-lg font-mono">
                {t.subtitle}
             </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((product, index) => (
            <div key={index} className="flex flex-col group relative bg-black border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors duration-500">
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`inline-flex items-center gap-2 font-mono text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
                    product.status === 'active' 
                    ? 'text-green-400 border-green-500/30 bg-green-500/10' 
                    : 'text-orange-400 border-orange-500/30 bg-orange-500/10'
                }`}>
                    <span className={`w-2 h-2 rounded-full ${product.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></span>
                    {product.status === 'active' ? t.active : `${t.launchDay} ${product.launchDate}`}
                </span>
              </div>
              
              {/* Main Image (Mockup) */}
              <div className="aspect-video bg-gray-900 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>

              <div className="p-8 relative z-10 flex flex-col flex-grow">
                {/* Title or Logo */}
                <div className="mb-4 h-12 flex items-center">
                  {product.logo ? (
                    <img 
                      src={product.logo} 
                      alt={`${product.title} logo`} 
                      className="h-full max-w-[200px] object-contain object-left"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {product.title}
                    </h3>
                  )}
                </div>

                <p className="text-gray-400 mb-8 text-sm leading-relaxed flex-grow font-light border-l border-white/10 pl-4">
                    {product.description}
                </p>

                <div className="flex gap-4 mt-auto">
                    <button className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs tracking-wider hover:bg-blue-600 hover:border-blue-500 transition-all flex items-center justify-center gap-2 uppercase">
                        {product.cta} <ExternalLink className="w-3 h-3" />
                    </button>
                    {product.secondaryCta && (
                        <button className="px-4 py-3 border border-white/10 text-gray-400 font-bold text-xs tracking-wider hover:text-white hover:border-white transition-all">
                            {product.secondaryCta}
                        </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};