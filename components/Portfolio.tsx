import React from 'react';
import { Translations } from '../types';
import { CLIENTS_DATA } from '../constants';

interface PortfolioProps {
  t: Translations['portfolio'];
}

export const Portfolio: React.FC<PortfolioProps> = ({ t }) => {
  const marqueeItems = [...CLIENTS_DATA, ...CLIENTS_DATA];

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
          animation: clients-marquee-left 42s linear infinite;
          will-change: transform;
        }

        .clients-marquee-right {
          animation: clients-marquee-right 46s linear infinite;
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
                <span className="text-blue-600">/</span> {t.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-grow opacity-50"></div>
        </div>

        <div className="text-left mb-16 max-w-3xl pl-2">
            <p className="text-blue-100 text-lg font-mono">{t.subtitle}</p>
        </div>

        <div className="relative py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-24"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-24"></div>

          <div className="mb-4 overflow-hidden">
            <div className="clients-marquee-left flex min-w-max gap-4 px-4 md:gap-6 md:px-6">
              {marqueeItems.map((client, idx) => (
                <ClientCard
                  key={`client-row-a-${client.name}-${idx}`}
                  name={client.name}
                  sector={client.sector}
                  mark={client.mark}
                  summary={client.summary}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="clients-marquee-right flex min-w-max gap-4 px-4 md:gap-6 md:px-6">
              {[...marqueeItems].reverse().map((client, idx) => (
                <ClientCard
                  key={`client-row-b-${client.name}-${idx}`}
                  name={client.name}
                  sector={client.sector}
                  mark={client.mark}
                  summary={client.summary}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ClientCardProps {
  name: string;
  sector: string;
  mark: string;
  summary: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ name, sector, mark, summary }) => (
  <div className="w-[260px] shrink-0 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:w-[340px] md:p-6">
    <div className="mb-7 flex items-start justify-between gap-4">
      <DummyPartnerLogo name={name} mark={mark} />
      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-gray-400">
        {sector}
      </span>
    </div>

    <p className="max-w-[18rem] font-mono text-sm leading-relaxed text-blue-100/80">
      {summary}
    </p>
  </div>
);

interface DummyPartnerLogoProps {
  name: string;
  mark: string;
}

const DummyPartnerLogo: React.FC<DummyPartnerLogoProps> = ({ name, mark }) => (
  <div className="flex min-w-0 items-center gap-3">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-400/30 bg-blue-600/20 md:h-14 md:w-14">
      <span className="relative text-lg font-black tracking-[0.2em] text-blue-300 md:text-xl">{mark}</span>
    </div>

    <div className="min-w-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-blue-400">Partner</p>
      <h3 className="truncate text-lg font-black tracking-tight text-white md:text-xl">{name}</h3>
    </div>
  </div>
);
