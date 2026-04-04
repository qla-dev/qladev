import React, { useEffect, useState } from 'react';
import { Menu, Users, X } from 'lucide-react';
import { Language, Translations } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  route: string;
  t: Translations['nav'];
  primaryActionLabel: string;
  onNavigateHomeSection: (id: string) => void;
  onNavigateHomeTop: () => void;
  onNavigateRoute: (path: '/technopark' | '/technopark/instructions' | '/technopark/membership' | '/technopark/sign-in') => void;
  onNavigateTechnoparkSection: (sectionId: string) => void;
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
  onNavigateTechnoparkSection,
  onPrimaryAction,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isTechnoparkRoute = route.startsWith('/technopark');
  const technoparkPeopleCount = '0/15';
  const showMobileFloatingBack = isTechnoparkRoute;
  const logoSrc = isTechnoparkRoute ? '/logo-technopark.png' : 'https://deklarant.ai/build/images/logo-qla-dark.png';
  const logoAlt = isTechnoparkRoute ? 'qla.dev Technopark' : 'qla.dev';
  const logoClassName = isTechnoparkRoute
    ? 'h-11 w-auto object-contain sm:h-12'
    : 'h-10 w-auto object-contain sm:h-11';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { kind: 'anchor' as const, id: 'hero', label: t.home },
    { kind: 'anchor' as const, id: 'about', label: t.about },
    { kind: 'anchor' as const, id: 'products', label: t.products },
    { kind: 'anchor' as const, id: 'services', label: t.services },
    { kind: 'anchor' as const, id: 'news', label: t.news },
    { kind: 'anchor' as const, id: 'contact', label: t.contact },
  ];
  const technoparkNavLinks = [
    { id: 'technopark-ambijent', label: lang === 'bs' ? 'AMBIJENT' : 'AMBIENT' },
    { id: 'technopark-sadrzaj', label: lang === 'bs' ? 'SADRZAJ' : 'AMENITIES' },
    { id: 'technopark-lokacija', label: lang === 'bs' ? 'LOKACIJA' : 'LOCATION' },
    { id: 'technopark-pricing', label: lang === 'bs' ? 'CJENOVNIK' : 'PRICING' },
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
                if (isTechnoparkRoute) {
                  onNavigateHomeTop();
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
                {isTechnoparkRoute ? (
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
                    {technoparkNavLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          onNavigateTechnoparkSection(link.id);
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
              {isTechnoparkRoute && (
                <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-white">
                  <LiveDot />
                  <Users className="h-4 w-4 text-blue-300" />
                  <span className="font-mono text-sm font-bold tracking-[0.14em]">{technoparkPeopleCount}</span>
                </div>
              )}
              <button
                onClick={() => setLang(lang === 'en' ? 'bs' : 'en')}
                className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-mono border border-white/20 px-3 py-1.5 rounded transition-colors"
              >
                <FlagIcon countryCode={lang === 'en' ? 'US' : 'BA'} />
                <span className="leading-none">{lang.toUpperCase()}</span>
              </button>
              {!isTechnoparkRoute && (
                <button
                  onClick={() => {
                    onNavigateRoute('/technopark');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-sm font-bold font-mono text-sm transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                >
                  {t.technopark}
                </button>
              )}
              <button
                onClick={() => {
                  onPrimaryAction();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-sm font-bold font-mono text-sm transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"
              >
                {primaryActionLabel}
              </button>
            </div>

            <div className="-mr-2 flex xl:hidden items-center gap-2">
              {!isTechnoparkRoute && (
                <button
                  onClick={() => {
                    onNavigateRoute('/technopark');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-sm font-bold font-mono text-[11px] tracking-[0.14em] uppercase transition-all"
                >
                  {t.technopark}
                </button>
              )}
              {isTechnoparkRoute && (
                <div className="inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/5 px-2.5 py-2 text-white">
                  <LiveDot />
                  <Users className="h-3.5 w-3.5 text-blue-300" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em]">{technoparkPeopleCount}</span>
                </div>
              )}
              {isTechnoparkRoute && (
                <button
                  onClick={() => {
                    onPrimaryAction();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-sm font-bold font-mono text-[11px] tracking-[0.14em] uppercase transition-all ${
                    route === '/technopark/sign-in'
                      ? 'border border-blue-500/40 bg-blue-500/15 text-blue-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {primaryActionLabel}
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isTechnoparkRoute ? (
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
                  {technoparkNavLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigateTechnoparkSection(link.id);
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
                {!isTechnoparkRoute && (
                  <button
                    onClick={() => {
                      onNavigateRoute('/technopark');
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-sm font-bold font-mono text-sm transition-all"
                  >
                    {t.technopark}
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

      {showMobileFloatingBack && (
        <div className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 xl:hidden">
          <button
            onClick={() => {
              onNavigateHomeTop();
              setIsMobileMenuOpen(false);
            }}
            className="w-full rounded-sm border border-white/10 bg-blue-600 px-5 py-4 text-white font-bold font-mono text-sm tracking-[0.16em] uppercase shadow-[0_0_20px_rgba(37,99,235,0.45)] transition-all hover:bg-blue-700"
          >
            <span className="block">{lang === 'bs' ? 'NAZAD' : 'BACK'}</span>
            <span className="mt-1 block text-[10px] tracking-[0.18em] text-blue-100/80">
              {lang === 'bs' ? 'Povratak na qla.dev home' : 'Return to qla.dev home'}
            </span>
          </button>
        </div>
      )}
    </>
  );
};
