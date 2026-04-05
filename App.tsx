import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Mission } from './components/Mission';
import { Algorithm } from './components/Algorithm';
import { News } from './components/News';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import {
  TechparkInstructionsPage,
  TechparkLandingPage,
  TechparkMembershipPage,
  TechparkSignInPage,
} from './components/techpark';
import { TEXT_CONTENT } from './constants';
import { Language } from './types';

type AppRoute = '/' | '/techpark' | '/techpark/boot-camp' | '/techpark/membership' | '/techpark/sign-in';
type TransitionDirection = 'forward' | 'backward' | 'auth';
type RouteTransitionPhase = 'steady' | 'exit' | 'enter';

const ROUTES: AppRoute[] = ['/', '/techpark', '/techpark/boot-camp', '/techpark/membership', '/techpark/sign-in'];
const ROUTE_SET = new Set<string>(ROUTES);
const isAppRoute = (route: string): route is AppRoute => ROUTE_SET.has(route);
const LEGACY_ROUTE_REDIRECTS: Partial<Record<string, AppRoute>> = {
  '/technopark': '/techpark',
  '/technopark/instructions': '/techpark/boot-camp',
  '/technopark/boot-camp': '/techpark/boot-camp',
  '/technopark/membership': '/techpark/membership',
  '/technopark/sign-in': '/techpark/sign-in',
  '/techpark/instructions': '/techpark/boot-camp',
};

const trimTrailingSlash = (value: string) => (value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value);

interface PageMeta {
  title: string;
  description: string;
}

const PAGE_META: Record<Language, Record<AppRoute, PageMeta>> = {
  en: {
    '/': {
      title: 'qla.dev - Developing the Next Generation of Tech',
      description: 'Building powerful and tailored software and hardware for in-house teams and businesses of all sizes.',
    },
    '/techpark': {
      title: 'qla.dev Techpark - Creative Tech Space for Under 18',
      description: 'Techpark is a creative tech space for children and youth, with open-space membership, programs, gaming, and maker amenities.',
    },
    '/techpark/boot-camp': {
      title: 'qla.dev Techpark - Boot-camp Programs',
      description: 'Explore Techpark boot-camp programs across web, app, AI, 3D, game development, Roblox, design, and video editing.',
    },
    '/techpark/membership': {
      title: 'qla.dev Techpark - Membership Reservations',
      description: 'Reserve Techpark open-space slots from 08:00 to 16:00 with a 15-person limit and a 4-hour daily maximum.',
    },
    '/techpark/sign-in': {
      title: 'qla.dev Techpark - Member Sign In',
      description: 'Multi-step member sign-in for Techpark reservations, programs, and future attendance check-in.',
    },
  },
  bs: {
    '/': {
      title: 'qla.dev - Razvijamo novu generaciju tehnologije',
      description: 'Gradimo mocna i prilagodjena softverska i hardverska rjesenja za interne timove i biznise svih velicina.',
    },
    '/techpark': {
      title: 'qla.dev Techpark - Kreativni tech prostor za djecu i mlade u Sarajevu',
      description: 'Techpark je kreativni tech prostor za djecu i mlade, sa open-space članstvom, programima, gaming sadrzajem i maker opremom.',
    },
    '/techpark/boot-camp': {
      title: 'qla.dev Techpark - Boot-camp programi',
      description: 'Pregledaj Techpark boot-camp programe za web, app, AI, 3D, game development, Roblox, dizajn i video editing.',
    },
    '/techpark/membership': {
      title: 'qla.dev Techpark - Membership rezervacije',
      description: 'Rezervisi Techpark open-space termine od 08:00 do 16:00, sa limitom od 15 osoba i maksimalno 4 sata dnevno.',
    },
    '/techpark/sign-in': {
      title: 'qla.dev Techpark - Prijava clanova',
      description: 'Visekorak prijava za Techpark clanove, rezervacije, programe i buduci attendance check-in.',
    },
  },
};

const detectBasePath = (pathname: string) => {
  const cleanPath = trimTrailingSlash(pathname);
  const routeMatchers = [...ROUTES.filter((route) => route !== '/'), ...Object.keys(LEGACY_ROUTE_REDIRECTS)];
  const matchedRoute = routeMatchers.find(
    (route) => cleanPath === route || cleanPath.endsWith(route)
  );

  if (matchedRoute) {
    return cleanPath.slice(0, -matchedRoute.length);
  }

  return cleanPath === '/' ? '' : cleanPath;
};

const normalizeRoute = (pathname: string, basePath: string): AppRoute => {
  const cleanPath = trimTrailingSlash(pathname);
  const pathWithoutBase = basePath && cleanPath.startsWith(basePath)
    ? cleanPath.slice(basePath.length) || '/'
    : cleanPath || '/';
  const canonicalPath = LEGACY_ROUTE_REDIRECTS[pathWithoutBase] ?? pathWithoutBase;

  if (canonicalPath === '' || canonicalPath === '/') {
    return '/';
  }

  return isAppRoute(canonicalPath) ? canonicalPath : '/';
};

const getLegacyRedirectRoute = (pathname: string, basePath: string) => {
  const cleanPath = trimTrailingSlash(pathname);
  const pathWithoutBase = basePath && cleanPath.startsWith(basePath)
    ? cleanPath.slice(basePath.length) || '/'
    : cleanPath || '/';

  return LEGACY_ROUTE_REDIRECTS[pathWithoutBase] ?? null;
};

const buildPath = (route: AppRoute, basePath: string) => (route === '/' ? `${basePath || ''}/` : `${basePath}${route}`);
const getAnchorNavOffset = () => {
  const nav = document.querySelector('nav');
  return nav instanceof HTMLElement ? nav.offsetHeight : 80;
};

const App: React.FC = () => {
  const [siteLang, setSiteLang] = useState<Language>('en');
  const [techparkLang, setTechparkLang] = useState<Language>('bs');
  const [startQuoteMode, setStartQuoteMode] = useState(false);
  // Keep the detected base path stable so the app works both at `/` and in a local subfolder.
  const [basePath] = useState(() => detectBasePath(window.location.pathname));
  const [route, setRoute] = useState<AppRoute>(() => normalizeRoute(window.location.pathname, basePath));
  const [displayRoute, setDisplayRoute] = useState<AppRoute>(() => normalizeRoute(window.location.pathname, basePath));
  const [pendingRouteSection, setPendingRouteSection] = useState<{ route: AppRoute; sectionId: string } | null>(null);
  const [routeTransition, setRouteTransition] = useState<{
    phase: RouteTransitionPhase;
    direction: TransitionDirection;
  }>({ phase: 'steady', direction: 'forward' });
  const lang = displayRoute.startsWith('/techpark') ? techparkLang : siteLang;
  const t = TEXT_CONTENT[lang];

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const legacyRedirectRoute = getLegacyRedirectRoute(window.location.pathname, basePath);
    if (legacyRedirectRoute) {
      window.history.replaceState({}, '', buildPath(legacyRedirectRoute, basePath));
    }
  }, [basePath]);

  useEffect(() => {
    const handlePopState = () => {
      const legacyRedirectRoute = getLegacyRedirectRoute(window.location.pathname, basePath);
      if (legacyRedirectRoute) {
        window.history.replaceState({}, '', buildPath(legacyRedirectRoute, basePath));
      }
      setRoute(normalizeRoute(window.location.pathname, basePath));
      setPendingRouteSection(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [basePath]);

  useEffect(() => {
    if (route === displayRoute) {
      return;
    }

    const direction: TransitionDirection =
      route === '/techpark/sign-in' || displayRoute === '/techpark/sign-in'
        ? 'auth'
        : displayRoute.startsWith('/techpark') && route === '/'
          ? 'backward'
          : 'forward';

    const switchTimer = window.setTimeout(() => {
      setDisplayRoute(route);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      setRouteTransition({ phase: 'enter', direction });
    }, 360);

    setRouteTransition({ phase: 'exit', direction });

    return () => {
      window.clearTimeout(switchTimer);
    };
  }, [displayRoute, route]);

  useEffect(() => {
    if (routeTransition.phase !== 'enter') {
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setRouteTransition((current) => ({ ...current, phase: 'steady' }));
      });
    });

    return () => {
      if (firstFrame) {
        window.cancelAnimationFrame(firstFrame);
      }
      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, [routeTransition.phase]);

  useEffect(() => {
    if (!pendingRouteSection || displayRoute !== pendingRouteSection.route) {
      return;
    }

    let cancelled = false;
    let frame = 0;
    let retryTimer = 0;
    let attempts = 0;

    const scrollToSection = () => {
      if (cancelled) {
        return;
      }

      const target = document.getElementById(pendingRouteSection.sectionId);
      if (!target) {
        if (attempts < 8) {
          attempts += 1;
          retryTimer = window.setTimeout(() => {
            frame = window.requestAnimationFrame(scrollToSection);
          }, 80);
        }
        return;
      }

      const navOffset = getAnchorNavOffset();
      const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - navOffset);

      window.scrollTo({ top, left: 0, behavior: 'smooth' });
      setPendingRouteSection(null);
    };

    frame = window.requestAnimationFrame(scrollToSection);

    return () => {
      cancelled = true;
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [displayRoute, pendingRouteSection]);

  useEffect(() => {
    const meta = PAGE_META[lang][route];
    const pageUrl = new URL(buildPath(route, basePath), window.location.origin).toString();
    const ogLocale = lang === 'bs' ? 'bs_BA' : 'en_US';

    document.title = meta.title;
    document.documentElement.lang = lang;

    const setMetaContent = (selector: string, content: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      if (element) {
        element.setAttribute('content', content);
      }
    };

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', pageUrl);
    }

    setMetaContent('meta[name="title"]', meta.title);
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', pageUrl);
    setMetaContent('meta[property="og:locale"]', ogLocale);
    setMetaContent('meta[property="twitter:title"]', meta.title);
    setMetaContent('meta[property="twitter:description"]', meta.description);
    setMetaContent('meta[property="twitter:url"]', pageUrl);
  }, [basePath, lang, route]);

  const pushRoute = (nextRoute: AppRoute) => {
    const targetPath = buildPath(nextRoute, basePath);
    const currentPath = trimTrailingSlash(window.location.pathname);

    if (trimTrailingSlash(targetPath) !== currentPath) {
      window.history.pushState({}, '', targetPath);
    }

    setRoute(nextRoute);
  };

  const navigateToRoute = (nextRoute: AppRoute) => {
    setStartQuoteMode(false);
    setPendingRouteSection(null);
    pushRoute(nextRoute);
  };

  const navigateToRouteSection = (targetRoute: AppRoute, sectionId: string) => {
    setStartQuoteMode(false);

    const scrollToSection = () => {
      const target = document.getElementById(sectionId);
      if (!target) {
        return false;
      }

      const navOffset = getAnchorNavOffset();
      const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - navOffset);

      window.scrollTo({ top, left: 0, behavior: 'smooth' });
      return true;
    };

    if (route === targetRoute && displayRoute === targetRoute) {
      scrollToSection();
      return;
    }

    setPendingRouteSection({ route: targetRoute, sectionId });
    pushRoute(targetRoute);
  };

  const navigateToHomeSection = (sectionId: string) => {
    navigateToRouteSection('/', sectionId);
  };

  const navigateToHomeTop = () => {
    setStartQuoteMode(false);
    setPendingRouteSection(null);

    if (route !== '/' || displayRoute !== '/') {
      pushRoute('/');
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const handlePrimaryAction = () => {
    if (displayRoute.startsWith('/techpark')) {
      navigateToRoute('/techpark/sign-in');
      return;
    }

    if (route !== '/') {
      setStartQuoteMode(true);
      setPendingRouteSection(null);
      pushRoute('/');
      return;
    }

    setStartQuoteMode(true);
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  const primaryActionLabel = displayRoute.startsWith('/techpark')
    ? (lang === 'bs' ? 'PRIJAVA' : 'SIGN IN')
    : t.nav.cta;

  const handleSetLang = (nextLang: Language) => {
    if (displayRoute.startsWith('/techpark')) {
      setTechparkLang(nextLang);
      return;
    }

    setSiteLang(nextLang);
  };

  const renderMainContent = () => {
    if (displayRoute === '/techpark') {
      return <TechparkLandingPage lang={lang} onNavigate={navigateToRoute} />;
    }

    if (displayRoute === '/techpark/boot-camp') {
      return <TechparkInstructionsPage lang={lang} onNavigate={navigateToRoute} />;
    }

    if (displayRoute === '/techpark/membership') {
      return <TechparkMembershipPage lang={lang} onNavigate={navigateToRoute} />;
    }

    if (displayRoute === '/techpark/sign-in') {
      return <TechparkSignInPage lang={lang} onNavigate={navigateToRoute} />;
    }

    return (
      <main>
        <Hero
          t={t.hero}
          lang={lang}
          startQuoteMode={startQuoteMode}
          setStartQuoteMode={setStartQuoteMode}
        />
        <Stats t={t.stats} />

        <div className="relative bg-gradient-to-b from-blue-900 via-[#0a0f1c] to-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <About t={t.about} />
          <Mission tMission={t.mission} tAlgo={t.algorithm} />
        </div>

        <div className="relative bg-gradient-to-b from-blue-900 via-[#0a0f1c] to-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <Products t={t.products} lang={lang} />
          <Services t={t.services} />
        </div>

        <Algorithm t={t.algorithm} />
        <Portfolio t={t.portfolio} />
        <News t={t.news} />
        <Contact t={t.contact} />
      </main>
    );
  };

  const routeContentClassName =
    routeTransition.phase === 'steady'
      ? 'opacity-100 translate-x-0 blur-none scale-100'
      : routeTransition.phase === 'exit'
        ? routeTransition.direction === 'auth'
          ? 'opacity-0 translate-y-10 blur-md scale-[0.97] pointer-events-none select-none'
          : routeTransition.direction === 'forward'
            ? 'opacity-0 -translate-x-12 blur-sm scale-95 pointer-events-none select-none'
            : 'opacity-0 translate-x-12 blur-sm scale-95 pointer-events-none select-none'
        : routeTransition.direction === 'auth'
          ? 'opacity-0 -translate-y-10 blur-md scale-[1.03] pointer-events-none select-none'
          : routeTransition.direction === 'forward'
            ? 'opacity-0 translate-x-12 blur-sm scale-95 pointer-events-none select-none'
            : 'opacity-0 -translate-x-12 blur-sm scale-95 pointer-events-none select-none';

  return (
    <div className="font-sans antialiased text-white selection:bg-blue-500 selection:text-white">
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        route={displayRoute}
        t={t.nav}
        primaryActionLabel={primaryActionLabel}
        onNavigateHomeSection={navigateToHomeSection}
        onNavigateHomeTop={navigateToHomeTop}
        onNavigateRoute={navigateToRoute}
        onNavigateTechparkSection={(sectionId) => navigateToRouteSection('/techpark', sectionId)}
        onPrimaryAction={handlePrimaryAction}
      />

      <div className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${routeContentClassName}`}>
        {renderMainContent()}
      </div>

      <Footer route={displayRoute} />
    </div>
  );
};

export default App;
