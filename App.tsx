import React, { useEffect, useRef, useState } from 'react';
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
import { ScrollRootProvider } from './components/ScrollRootContext';
import {
  TechparkInstructionsPage,
  TechparkLandingPage,
  TechparkLineFollowerHackathonePage,
  TechparkMembershipPage,
  TechparkSignInPage,
} from './components/techpark';
import { TEXT_CONTENT } from './constants';
import { Language } from './types';

type AppRoute =
  | '/'
  | '/techpark'
  | '/techpark/boot-camp'
  | '/techpark/membership'
  | '/techpark/line-follower-hackathone'
  | '/techpark/sign-in';
type TransitionDirection = 'forward' | 'backward' | 'auth';
type RouteTransitionPhase = 'steady' | 'exit' | 'enter';

const ROUTES: AppRoute[] = ['/', '/techpark', '/techpark/boot-camp', '/techpark/membership', '/techpark/line-follower-hackathone', '/techpark/sign-in'];
const ROUTE_SET = new Set<string>(ROUTES);
const isAppRoute = (route: string): route is AppRoute => ROUTE_SET.has(route);
const LEGACY_ROUTE_REDIRECTS: Partial<Record<string, AppRoute>> = {
  '/technopark': '/techpark',
  '/technopark/instructions': '/techpark/boot-camp',
  '/technopark/boot-camp': '/techpark/boot-camp',
  '/technopark/membership': '/techpark/membership',
  '/technopark/sign-in': '/techpark/sign-in',
  '/techpark/instructions': '/techpark/boot-camp',
  '/techpark/line-follower-hackathon': '/techpark/line-follower-hackathone',
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
    '/techpark/line-follower-hackathone': {
      title: 'qla.dev Techpark - Line-Follower Hackathon',
      description: '48-hour kit-based robotics sprint with Beginner and Advanced tracks. Build a line follower and race on maps revealed at kickoff.',
    },
    '/techpark/sign-in': {
      title: 'qla.dev Techpark - Member Sign In',
      description: 'Multi-step member sign-in for Techpark reservations, programs, and future attendance check-in.',
    },
  },
  bs: {
    '/': {
      title: 'qla.dev - Razvijamo novu generaciju tehnologije',
      description: 'Gradimo moćna i prilagođena softverska i hardverska rješenja za interne potrebe i biznise svih veličina.',
    },
    '/techpark': {
      title: 'qla.dev Techpark - Kreativni tech prostor za djecu i mlade u Sarajevu',
      description: 'Techpark je kreativni tech prostor za djecu i mlade, sa boot-camp programima, open-space članstvom, gaming sadržajem i 3D print opremom.',
    },
    '/techpark/boot-camp': {
      title: 'qla.dev Techpark - Boot-camp programi',
      description: 'Prijavi se na jedan od boot-camp programa unutar qla.dev Techparka. Izaberi između Web Deva, App Deva, AI-a, 3D-a, UI/UX-a, Robotike, Game Deva, Robloxa i Video Editinga.',
    },
    '/techpark/membership': {
      title: 'qla.dev Techpark - Membership rezervacije',
      description: 'Rezerviši Techpark open-space termine od 08:00 do 16:00, sa limitom od 15 osoba i maksimalno 4 sata dnevno.',
    },
    '/techpark/line-follower-hackathone': {
      title: 'qla.dev Techpark - Line-Follower Hackathon',
      description: '48h robotički sprint sa istim kitom za sve timove, Beginner i Advanced trackovima, i mapama koje se otkrivaju na startu.',
    },
    '/techpark/sign-in': {
      title: 'qla.dev Techpark - Prijava članova',
      description: 'Višekorak prijava za Techpark članove, rezervacije, programe i budući attendance check-in.',
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
  const [activeHomeSection, setActiveHomeSection] = useState<string | null>(null);
  const appScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lang = displayRoute.startsWith('/techpark') ? techparkLang : siteLang;
  const t = TEXT_CONTENT[lang];

  const getScrollContainer = (_targetRoute: AppRoute) => appScrollContainerRef.current;

  const getScrollTop = (targetRoute: AppRoute) => {
    const scrollContainer = getScrollContainer(targetRoute);
    return scrollContainer ? scrollContainer.scrollTop : (window.scrollY || window.pageYOffset || 0);
  };

  const scrollViewportTo = (targetRoute: AppRoute, top: number, behavior: ScrollBehavior) => {
    const scrollContainer = getScrollContainer(targetRoute);

    if (scrollContainer) {
      scrollContainer.scrollTo({ top, behavior });
      return;
    }

    window.scrollTo({ top, left: 0, behavior });
  };

  const scrollElementIntoViewport = (targetRoute: AppRoute, element: HTMLElement, behavior: ScrollBehavior) => {
    const navOffset = getAnchorNavOffset();
    const scrollContainer = getScrollContainer(targetRoute);

    if (scrollContainer) {
      const top = Math.max(
        0,
        scrollContainer.scrollTop
          + element.getBoundingClientRect().top
          - scrollContainer.getBoundingClientRect().top
          - navOffset
      );
      scrollContainer.scrollTo({ top, behavior });
      return;
    }

    const top = Math.max(0, getScrollTop(targetRoute) + element.getBoundingClientRect().top - navOffset);
    window.scrollTo({ top, left: 0, behavior });
  };

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
      window.requestAnimationFrame(() => {
        scrollViewportTo(route, 0, 'auto');
      });
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

      scrollElementIntoViewport(pendingRouteSection.route, target, 'smooth');
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

      scrollElementIntoViewport(targetRoute, target, 'smooth');
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

    scrollViewportTo('/', 0, 'auto');
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
    const hero = document.getElementById('hero');
    if (hero) {
      scrollElementIntoViewport('/', hero, 'smooth');
    }
  };

  const primaryActionLabel = displayRoute.startsWith('/techpark')
    ? (lang === 'bs' ? 'PRIJAVA' : 'SIGN IN')
    : t.nav.cta;
  const isTechparkRoute = displayRoute.startsWith('/techpark');
  const usesInternalScrollShell = displayRoute === '/' || isTechparkRoute;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('techpark-ios-fix-active', usesInternalScrollShell);

    return () => {
      root.classList.remove('techpark-ios-fix-active');
    };
  }, [usesInternalScrollShell]);

  useEffect(() => {
    if (!usesInternalScrollShell) {
      return;
    }

    const root = document.documentElement;
    root.classList.add('ios26-tint-refresh');

    const rafId = window.requestAnimationFrame(() => {
      root.classList.remove('ios26-tint-refresh');
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      root.classList.remove('ios26-tint-refresh');
    };
  }, [displayRoute, usesInternalScrollShell]);

  useEffect(() => {
    if (!usesInternalScrollShell) {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [usesInternalScrollShell]);

  useEffect(() => {
    if (displayRoute !== '/') {
      setActiveHomeSection(null);
      return;
    }

    const scrollContainer = appScrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const trackedSections = ['products', 'services', 'contact'] as const;

    const updateActiveHomeSection = () => {
      const probeY = window.innerHeight * 0.42;
      const matchedSection = trackedSections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });

      setActiveHomeSection(matchedSection ?? null);
    };

    updateActiveHomeSection();
    scrollContainer.addEventListener('scroll', updateActiveHomeSection, { passive: true });
    window.addEventListener('resize', updateActiveHomeSection);

    return () => {
      scrollContainer.removeEventListener('scroll', updateActiveHomeSection);
      window.removeEventListener('resize', updateActiveHomeSection);
    };
  }, [displayRoute]);

  const handleSetLang = (nextLang: Language) => {
    if (isTechparkRoute) {
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

    if (displayRoute === '/techpark/line-follower-hackathone') {
      return <TechparkLineFollowerHackathonePage lang={lang} onNavigate={navigateToRoute} />;
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
          <Mission lang={lang} tMission={t.mission} tAlgo={t.algorithm} />
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
  const routeContent = renderMainContent();

  return (
    <div className="font-sans antialiased text-white selection:bg-blue-500 selection:text-white">
      <div className="safari-tint-sentinel" aria-hidden="true"></div>
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        route={displayRoute}
        scrollContainerRef={appScrollContainerRef}
        activeHomeSection={activeHomeSection}
        t={t.nav}
        primaryActionLabel={primaryActionLabel}
        onNavigateHomeSection={navigateToHomeSection}
        onNavigateHomeTop={navigateToHomeTop}
        onNavigateRoute={navigateToRoute}
        onNavigateTechparkSection={(sectionId) => navigateToRouteSection('/techpark', sectionId)}
        onPrimaryAction={handlePrimaryAction}
      />

      <ScrollRootProvider value={appScrollContainerRef}>
        {usesInternalScrollShell ? (
          <div
            ref={appScrollContainerRef}
            className="fixed inset-0 overflow-y-auto overscroll-y-contain bg-black"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className={`min-h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${routeContentClassName}`}>
              {routeContent}
              <Footer route={displayRoute} />
            </div>
          </div>
        ) : (
          <>
            <div className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${routeContentClassName}`}>
              {routeContent}
            </div>
            <Footer route={displayRoute} />
          </>
        )}
      </ScrollRootProvider>
    </div>
  );
};

export default App;
