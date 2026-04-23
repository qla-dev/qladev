import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Menu, Ticket, Users, X } from 'lucide-react';
import { Language, Translations } from '../types';
import type { TechparkRoute } from './techpark/types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  route: string;
  t: Translations['nav'];
  primaryActionLabel: string;
  onNavigateHomeSection: (id: string) => void;
  onNavigateHomeTop: () => void;
  onNavigateRoute: (path: TechparkRoute) => void;
  onNavigateTechparkSection: (sectionId: string) => void;
  onPrimaryAction: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  route,
  t,
  primaryActionLabel,
  onNavigateHomeSection,
  onNavigateHomeTop,
  onNavigateRoute,
  onNavigateTechparkSection,
  onPrimaryAction,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFloatingSwitcherVisible, setIsMobileFloatingSwitcherVisible] = useState(false);
  const isTechparkRoute = route.startsWith('/techpark');
  const techparkPeopleCount = '0/15';
  const showMobileFloatingTechparkSwitcher =
    isTechparkRoute && route !== '/techpark/sign-in' && isMobileFloatingSwitcherVisible;
  const logoSrc = isTechparkRoute ? '/logo-techpark.png' : 'https://deklarant.ai/build/images/logo-qla-dark.png';
  const logoAlt = isTechparkRoute ? 'qla.dev Techpark' : 'qla.dev';
  const logoClassName = isTechparkRoute
    ? 'h-11 w-auto object-contain sm:h-12'
    : 'h-10 w-auto object-contain sm:h-11';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setIsScrolled(scrollY > 50);
      setIsMobileFloatingSwitcherVisible(scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    setIsScrolled(scrollY > 50);
    setIsMobileFloatingSwitcherVisible(scrollY > 300);
  }, [route]);

  const navLinks = [
    { kind: 'anchor' as const, id: 'hero', label: t.home },
    { kind: 'anchor' as const, id: 'about', label: t.about },
    { kind: 'anchor' as const, id: 'products', label: t.products },
    { kind: 'anchor' as const, id: 'services', label: t.services },
    { kind: 'anchor' as const, id: 'news', label: t.news },
    { kind: 'anchor' as const, id: 'contact', label: t.contact },
  ];
  const techparkNavLinks = [
    { id: 'techpark-ambijent', label: lang === 'bs' ? 'AMBIJENT' : 'AMBIENT' },
    { id: 'techpark-sadrzaj', label: lang === 'bs' ? 'SADRŽAJ' : 'AMENITIES' },
    { id: 'techpark-lokacija', label: lang === 'bs' ? 'LOKACIJA' : 'LOCATION' },
    { id: 'techpark-pricing', label: lang === 'bs' ? 'CJENOVNIK' : 'PRICING' },
  ];

  const techparkFloatingActions = [
    {
      path: '/techpark/boot-camp' as const,
      label: 'BOOT-CAMP',
      icon: CalendarDays,
      variant: 'primary' as const,
    },
    {
      path: '/techpark/membership' as const,
      label: lang === 'bs' ? 'ČLANSTVO' : 'MEMBERSHIP',
      icon: Ticket,
      variant: 'secondary' as const,
    },
  ];

  const handleNavClick = (link: (typeof navLinks)[number]) => {
    onNavigateHomeSection(link.id);
    setIsMobileMenuOpen(false);
  };

  const FlagIcon = ({ countryCode }: { countryCode: string }) => (
    <img
      src={`https://flagsapi.com/${countryCode}/flat/64.png`}
      alt={`${countryCode} Flag`}
      className="w-6 h-6 object-contain"
    />
  );

  const LiveDot = () => (
    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
    </span>
  );

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => {
                if (isTechparkRoute) {
                  onNavigateRoute('/techpark');
                } else {
                  onNavigateHomeSection('hero');
                }
                setIsMobileMenuOpen(false);
              }}
              className="flex-shrink-0 flex items-center cursor-pointer"
              aria-label={logoAlt}
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                className={logoClassName}
                loading="eager"
                decoding="async"
              />
            </button>

            <div className="hidden xl:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isTechparkRoute ? (
                  <>
                    <button
                      onClick={() => {
                        onNavigateHomeTop();
                        setIsMobileMenuOpen(false);
                      }}
                      className="relative px-3 py-2 text-sm font-medium font-mono text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      qla.dev
                    </button>
                    {techparkNavLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          onNavigateTechparkSection(link.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className="relative px-3 py-2 text-sm font-medium font-mono text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </button>
                    ))}
                  </>
                ) : (
                  navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link)}
                      className="relative px-3 py-2 text-sm font-medium font-mono text-gray-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-4">
              {isTechparkRoute && (
                <div className="inline-flex h-10 items-center gap-2 rounded border border-white/20 px-3 text-white">
                  <LiveDot />
                  <Users className="h-4 w-4 text-blue-300" />
                  <span className="font-mono text-sm font-bold tracking-[0.14em]">{techparkPeopleCount}</span>
                </div>
              )}
              <button
                onClick={() => setLang(lang === 'en' ? 'bs' : 'en')}
                className="inline-flex h-10 items-center gap-2 rounded border border-white/20 px-3 text-sm font-mono text-gray-300 transition-colors hover:text-white"
              >
                <FlagIcon countryCode={lang === 'en' ? 'US' : 'BA'} />
                <span className="leading-none">{lang.toUpperCase()}</span>
              </button>
              {!isTechparkRoute && (
                <button
                  onClick={() => {
                  onNavigateRoute('/techpark');
                  setIsMobileMenuOpen(false);
                }}
                  className="inline-flex h-10 items-center justify-center rounded-sm bg-blue-600 px-5 text-sm font-bold font-mono text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                >
                  {t.techpark}
                </button>
              )}
              <button
                onClick={() => {
                  onPrimaryAction();
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex h-10 items-center justify-center rounded-sm bg-blue-600 px-5 text-sm font-bold font-mono text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"
              >
                {primaryActionLabel}
              </button>
            </div>

            <div className="-mr-2 flex xl:hidden items-center gap-2">
              {!isTechparkRoute && (
                <button
                  onClick={() => {
                    onNavigateRoute('/techpark');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-sm font-bold font-mono text-[11px] tracking-[0.14em] uppercase transition-all"
                >
                  {t.techpark}
                </button>
              )}
              {isTechparkRoute && (
                <div className="inline-flex items-center gap-1.5 rounded border border-white/20 px-3 py-2 text-white">
                  <LiveDot />
                  <Users className="h-3.5 w-3.5 text-blue-300" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em]">{techparkPeopleCount}</span>
                </div>
              )}
              {isTechparkRoute && (
                <button
                  onClick={() => {
                    onPrimaryAction();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-sm font-bold font-mono text-[11px] tracking-[0.14em] uppercase transition-all ${
                    route === '/techpark/sign-in'
                      ? 'border border-blue-500/40 bg-blue-500/15 text-blue-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {primaryActionLabel}
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-gray-900 inline-flex items-center justify-center p-1.5 rounded-sm text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isTechparkRoute ? (
                <>
                  <button
                    onClick={() => {
                      onNavigateHomeTop();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-white block w-full text-left px-3 py-4 rounded-md text-base font-medium font-mono border-b border-gray-800"
                  >
                    qla.dev
                  </button>
                  {techparkNavLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigateTechparkSection(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-300 hover:text-white block w-full text-left px-3 py-4 rounded-md text-base font-medium font-mono border-b border-gray-800"
                    >
                      {link.label}
                    </button>
                  ))}
                </>
              ) : (
                navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className="text-gray-300 hover:text-white block w-full text-left px-3 py-4 rounded-md text-base font-medium font-mono border-b border-gray-800"
                  >
                    {link.label}
                  </button>
                ))
              )}

              <div className="flex items-center justify-between px-3 pt-4 gap-4">
                <button
                  onClick={() => setLang(lang === 'en' ? 'bs' : 'en')}
                  className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-mono border border-white/20 px-3 py-2 rounded"
                >
                  <FlagIcon countryCode={lang === 'en' ? 'US' : 'BA'} />
                  <span className="leading-none">{lang.toUpperCase()}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 px-3 py-4">
                {!isTechparkRoute && (
                  <button
                    onClick={() => {
                      onNavigateRoute('/techpark');
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-sm font-bold font-mono text-sm transition-all"
                  >
                    {t.techpark}
                  </button>
                )}
                <button
                  onClick={() => {
                    onPrimaryAction();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-sm font-bold font-mono text-sm"
                >
                  {primaryActionLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {showMobileFloatingTechparkSwitcher && (
        <div className="fixed bottom-0 left-0 right-0 z-[5000] w-full border-t border-white/10 bg-[#050912] px-2 pt-2 pb-[max(0.9rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.6)] xl:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(37,99,235,0.24),transparent_48%),radial-gradient(circle_at_right,rgba(59,130,246,0.14),transparent_42%)] opacity-90" />
          <div className="relative grid grid-cols-2 gap-2">
              {techparkFloatingActions.map((action) => {
                const isActive = route === action.path;
                const Icon = action.icon;

                return (
                  <button
                    key={action.path}
                    onClick={() => {
                      onNavigateRoute(action.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm border px-4 py-3.5 text-[11px] font-bold font-mono uppercase tracking-[0.14em] leading-none transition-colors ${
                      action.variant === 'primary'
                        ? isActive
                          ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                          : 'border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700'
                        : isActive
                          ? 'border-blue-500/50 bg-blue-500/10 text-white shadow-[0_0_16px_rgba(37,99,235,0.2)]'
                          : 'border-white/15 bg-[#0b1220] text-gray-200 hover:border-blue-500 hover:bg-blue-500/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${action.variant === 'secondary' && !isActive ? 'text-blue-300' : ''}`} />
                    <span className="truncate leading-tight">{action.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
