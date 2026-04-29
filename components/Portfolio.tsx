import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Translations } from '../types';
import { REAL_CLIENTS } from '../constants';

interface PortfolioProps {
  t: Translations['portfolio'];
}

export const Portfolio: React.FC<PortfolioProps> = ({ t }) => {
  const marqueeItems = [...REAL_CLIENTS];
  const crpIndex = marqueeItems.findIndex((client) => client.link === 'https://crp.ba/');

  if (crpIndex >= 0) {
    const [crpClient] = marqueeItems.splice(crpIndex, 1);
    marqueeItems.splice(2, 0, crpClient);
  }

  const loopingItems = [...marqueeItems, ...marqueeItems];

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
      <style>{`
        @keyframes clients-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes clients-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .clients-marquee-left {
          animation: clients-marquee-left 60s linear infinite;
          will-change: transform;
        }

        .clients-marquee-right {
          animation: clients-marquee-right 66s linear infinite;
          will-change: transform;
        }

        .clients-marquee-left:hover,
        .clients-marquee-right:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-left,
          .clients-marquee-right {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LEFT ALIGNED TITLE STYLE */}
        <div className="flex items-center gap-6 mb-8">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-left uppercase whitespace-nowrap">
                <span className="techpark-accent-slash">/</span> {t.title}
            </h2>
            <div className="techpark-accent-line h-px flex-grow opacity-70"></div>
        </div>

        <div className="text-left mb-16 max-w-3xl pl-2">
            <p className="text-blue-100 text-lg font-mono">{t.subtitle}</p>
        </div>

        <div className="relative py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-24"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-24"></div>

          <div className="mb-4 overflow-hidden">
            <div className="clients-marquee-left flex min-w-max gap-4 px-4 md:gap-6 md:px-6">
              {loopingItems.map((client, idx) => (
                <MarqueeClientCard
                  key={`client-row-a-${client.name}-${idx}`}
                  client={client}
                  visualIndex={idx}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="clients-marquee-right flex min-w-max gap-4 px-4 md:gap-6 md:px-6">
              {[...loopingItems].reverse().map((client, idx) => (
                <MarqueeClientCard
                  key={`client-row-b-${client.name}-${idx}`}
                  client={client}
                  visualIndex={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface MarqueeClientCardProps {
  client: (typeof REAL_CLIENTS)[number];
  visualIndex: number;
}

const MarqueeClientCard: React.FC<MarqueeClientCardProps> = ({ client, visualIndex }) => {
  const resolvedLogoSurface = client.logoSurface ?? (visualIndex % 2 === 0 ? 'light' : 'dark');
  const logoSurfaceClass = resolvedLogoSurface === 'dark'
    ? 'bg-[#0a1020] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]'
    : 'bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]';
  const logoSizeClass = client.logoSize === 'large'
    ? 'h-16 md:h-20'
    : 'h-12 md:h-14';

  return (
    <a
      href={client.link}
      target="_blank"
      rel="noreferrer noopener"
      className="group min-h-[280px] w-[260px] shrink-0 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 md:w-[340px] md:p-6"
    >
      <div className={`mb-6 w-full rounded-[1.25rem] p-4 ${logoSurfaceClass}`}>
        <div className="flex min-h-[72px] w-full items-center justify-center md:min-h-[84px]">
          <img
            src={client.logo}
            alt={client.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`mx-auto w-auto max-w-full object-contain ${logoSizeClass}`}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-4">
        <div>
          <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-gray-400">
            {client.industry}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h3 className="min-w-0 text-lg font-black tracking-tight text-white md:text-xl">{client.name}</h3>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-blue-300 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/10">
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>

        <p className="max-w-[18rem] font-mono text-sm leading-relaxed text-blue-100/80">
          {client.description}
        </p>
      </div>
    </a>
  );
};
