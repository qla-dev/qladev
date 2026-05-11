import React from 'react';
import { Translations, Product } from '../types';
import { PRODUCTS_DATA } from '../constants';
import { ExternalLink } from 'lucide-react';

interface ProductsProps {
  t: Translations['products'];
  lang: 'en' | 'bs';
}

const getLogoSurfaceClass = () =>
  'border-white/20 bg-white shadow-[0_14px_36px_rgba(255,255,255,0.08)]';

const renderProductAction = (
  label: string,
  className: string,
  url?: string,
  withIcon = false,
) => {
  const content = (
    <>
      {label}
      {withIcon ? <ExternalLink className="w-3 h-3" /> : null}
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <button className={className}>{content}</button>;
};

export const Products: React.FC<ProductsProps> = ({ t, lang }) => {
  return (
    <section id="products" className="py-16 lg:py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-8">
             <div className="techpark-accent-line techpark-accent-line-reverse h-px flex-grow opacity-70"></div>
             <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-mono text-center">
                <span className="techpark-accent-slash techpark-accent-slash-white">/</span> {t.title}
            </h2>
            <div className="techpark-accent-line h-px flex-grow opacity-70"></div>
        </div>

        <div className="text-center mb-16 max-w-3xl mx-auto px-4">
             <p className="text-blue-100 text-lg font-mono">
                {t.subtitle}
             </p>
        </div>

        <div className="-mx-4 md:mx-0">
          <div className="mt-4 grid grid-flow-col auto-cols-[84%] gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:mt-0 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-8 md:overflow-visible md:snap-none md:px-0 xl:grid-cols-4">
            {PRODUCTS_DATA.map((product, index) => {
              const logoSurfaceClass = getLogoSurfaceClass();
              const secondaryUrl = product.secondaryUrl ?? product.primaryUrl;
              const isSvgPreview = product.image.toLowerCase().endsWith('.svg');
              const imageClassName = isSvgPreview
                ? 'w-full h-full object-cover object-top scale-[1.14] transition-transform duration-700 opacity-95 group-hover:scale-[1.18] group-hover:opacity-100'
                : 'w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover:scale-105 group-hover:opacity-100';

              return (
              <div key={index} className="snap-start flex flex-col group relative bg-black border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors duration-500">
                
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
                      className={imageClassName}
                  />
                </div>

                <div className="p-8 relative z-10 flex flex-col flex-grow">
                  <div className="mb-5 flex min-h-[7.5rem] flex-col items-center justify-center gap-3 text-center">
                    {product.logo ? (
                      <div className={`flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl border px-3 py-4 ${logoSurfaceClass}`}>
                        <img 
                          src={product.logo} 
                          alt={`${product.title} logo`} 
                          className={`h-auto max-h-12 w-auto max-w-full object-contain object-center ${product.logoClassName ?? ''}`}
                        />
                      </div>
                    ) : (
                      <div className={`flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl border px-4 py-4 ${logoSurfaceClass}`}>
                        <h3 className="text-center text-2xl font-bold text-blue-600 transition-colors group-hover:text-blue-700">
                          {product.title}
                        </h3>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-400 mb-8 text-sm leading-relaxed flex-grow font-light border-l border-white/10 pl-4">
                      {product.description}
                  </p>

                  <div className="flex gap-4 mt-auto">
                      {renderProductAction(
                        product.cta,
                        'flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white font-bold text-xs tracking-wider hover:bg-blue-600 hover:border-blue-500 transition-all flex items-center justify-center gap-2 uppercase',
                        product.primaryUrl,
                        true,
                      )}
                      {product.secondaryCta && (
                          renderProductAction(
                            product.secondaryCta,
                            'px-4 py-3 border border-white/10 text-gray-400 font-bold text-xs tracking-wider hover:text-white hover:border-white transition-all',
                            secondaryUrl,
                          )
                      )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
};
