
import { Translations, Product, Service, NewsItem, StatItem, Client, RealClient } from './types';
import { Monitor, Smartphone, Server, Scan, Bot, Cloud } from 'lucide-react';

// Environment variable for resources, defaulting to the production domain
export const RESOURCES_URL = 'https://qla.dev';

export const TEXT_CONTENT: Record<'en' | 'bs', Translations> = {
  en: {
    nav: {
      techpark: 'TECHPARK',
      home: 'HOMEPAGE',
      about: 'ABOUT',
      products: 'PRODUCTS',
      services: 'SERVICES',
      news: 'NEWS',
      portfolio: 'PARTNERS',
      contact: 'CONTACT',
      cta: 'START A PROJECT',
    },
    hero: {
      titleParts: [
        'DEVELOPING',
        'THE NEXT',
        'GENERATION',
        'OF TECH'
      ],
      subtitle: 'Building powerful and tailored software and hardware for in-house as well as for businesses of all sizes.',
      quote: 'GET A QUOTE',
      call: 'CALL',
      highPerformance: 'HIGH PERFORMANCE',
      secureArchitecture: 'SECURE ARCHITECTURE',
      terminal: {
        initial: [
          "Initializing qla.dev kernel v4.2.0...",
          "Verifying system integrity... [OK]",
          "Mounting virtual file system... [RW]",
          "Loading core modules:",
          "  > Artificial Intelligence... [LOADED]",
          "  > Internet of Things... [LOADED]",
          "  > Cloud Infrastructure... [LOADED]",
          "Starting background services:",
          "  [+] SecureProtocol_v3",
          "  [+] DataStream_Sync",
          "  [+] NeuralNet_Optimizer",
          "Allocating memory blocks... [DONE]",
          "Establishing secure uplink... [CONNECTED]",
          "System ONLINE. Waiting for input..."
        ],
        quoteIntro: [
          "GET A QUOTE FROM US",
          "Tell us more about your needs"
        ],
        placeholders: [
          "Type your project details here...",
          "Type your email address...",
          "Type your name..."
        ],
        questions: [
          "What functionality are you looking for?",
          "Where can we send the proposal? (Email)",
          "Who should we address it to? (Name)"
        ],
        success: [
          "Thank you for reaching out.",
          "Our team has received your request.",
          "We will contact you shortly."
        ]
      }
    },
    stats: {
      years: 'IN BUSINESS',
      projects: 'DONE PROJECTS',
      clients: 'SATISFIED CLIENTS',
      services: 'IT SERVICES',
    },
    about: {
      title: 'OUR OWN SOLUTIONS',
      p1: 'We are proud to present our software solutions, developed entirely in-house and based on our unique ideas and vision. These proprietary tools are not for sale, as they reflect our passion for innovation and solving real-world challenges through our own creative lens.',
      p2: 'In addition to our internal projects, we also engage in traditional B2B development. We collaborate with clients to bring their ideas to life, delivering tailored software solutions that meet their specific needs.',
      p3: 'Our commitment extends beyond delivery. We provide dedicated support and continuous optimization, ensuring your digital infrastructure adapts, scales, and thrives in an ever-changing technological landscape.'
    },
    products: {
      title: 'PRODUCTS',
      active: 'ACTIVE',
      launchDay: 'LAUNCH DAY',
      subtitle: 'Our key products are developed entirely in-house, largely for local users and the real needs of the market around us. We build them from the ground up as scalable, dependable systems with a clear function, a distinct identity, and long-term impact on both the market and society.',
    },
    mission: {
      title: 'POWERING THE DIGITAL REVOLUTION',
      text: 'qla.dev is a pioneering company specializing in seamlessly developing software and hardware solutions, redefining innovation in the digital age.',
      text2: 'Combining the expertise of seasoned professionals with the fresh perspectives of young engineers, our team delivers IT services that span diverse industries.'
    },
    services: {
      title: 'OUR SERVICES',
      subtitle: 'At qla.dev, our primary focus is on developing advanced software solutions that solve complex challenges of individuals and enterprises, with hardware integration available to complement and enhance our software-driven approaches.'
    },
    algorithm: {
      title: 'THE ALGORITHM',
      subtitle: 'Scroll through the qla.dev delivery pipeline, from scoped input to release-ready systems.',
      codeComment: '// Executing core business logic...'
    },
    portfolio: {
      title: 'OUR PARTNERS',
      subtitle: 'A growing network of brands, operators, and institutions that trust qla.dev to design, integrate, and evolve the digital systems behind their business.'
    },
    news: {
      title: 'LATEST NEWS',
      readMore: 'READ MORE'
    },
    contact: {
      title: 'START A PROJECT WITH US',
      visit: 'VISIT US AT qla.dev Techpark',
      email: 'SEND US EMAIL',
      call: 'GIVE US A CALL',
    }
  },
  bs: {
    nav: {
      techpark: 'TECHPARK',
      home: 'POČETNA',
      about: 'O NAMA',
      products: 'PROIZVODI',
      services: 'USLUGE',
      news: 'VIJESTI',
      portfolio: 'PARTNERI',
      contact: 'KONTAKT',
      cta: 'ZAPOČNI PROJEKAT',
    },
    hero: {
      titleParts: [
        'RAZVIJAMO',
        'SLJEDEĆU',
        'GENERACIJU',
        'TEHNOLOGIJE'
      ],
      subtitle: 'Izrada moćnih i prilagođenih softverskih i hardverskih rješenja za in-house potrebe kao i za sve vrste i oblike biznisa.',
      quote: 'ZATRAŽI PONUDU',
      call: 'POZOVI',
      highPerformance: 'VISOKE PERFORMANSE',
      secureArchitecture: 'SIGURNA ARHITEKTURA',
      terminal: {
        initial: [
          "Inicijalizacija qla.dev kernela v4.2.0...",
          "Provjera integriteta sistema... [OK]",
          "Montiranje fajl sistema... [RW]",
          "Učitavanje osnovnih modula:",
          "  > Vještačka Inteligencija... [UČITANO]",
          "  > Internet of Things... [UČITANO]",
          "  > Cloud Infrastruktura... [UČITANO]",
          "Pokretanje servisa:",
          "  [+] SecureProtocol_v3",
          "  [+] DataStream_Sync",
          "  [+] NeuralNet_Optimizer",
          "Alociranje memorijskih blokova... [GOTOVO]",
          "Uspostavljanje sigurne veze... [POVEZANO]",
          "Sistem ONLINE. Čekam unos..."
        ],
        quoteIntro: [
          "ZATRAŽITE PONUDU OD NAS",
          "Recite nam više o tome šta vam treba"
        ],
        placeholders: [
          "Upišite detalje projekta ovdje...",
          "Upišite vašu email adresu...",
          "Vaše ime..."
        ],
        questions: [
          "Kakvu funkcionalnost tražite?",
          "Gdje da pošaljemo ponudu? (Email)",
          "Na koga da naslovimo? (Ime)"
        ],
        success: [
          "Hvala što ste nas kontaktirali.",
          "Naš tim je primio vaš zahtjev.",
          "Javit ćemo vam se uskoro."
        ]
      }
    },
    stats: {
      years: 'GODINA POSLOVANJA',
      projects: 'ZAVRŠENIH PROJEKATA',
      clients: 'ZADOVOLJNIH KLIJENATA',
      services: 'IT USLUGA',
    },
    about: {
      title: 'NAŠA RJEŠENJA',
      p1: 'Ponosni smo što predstavljamo naša softverska rješenja, razvijena u potpunosti unutar kuće i zasnovana na našim jedinstvenim idejama i viziji. Ovi alati nisu na prodaju, jer odražavaju našu strast za inovacijama.',
      p2: 'Pored internih projekata, bavimo se i tradicionalnim B2B razvojem. Sarađujemo s klijentima kako bismo oživjeli njihove ideje, isporučujući prilagođena rješenja.',
      p3: 'Naša posvećenost seže dalje od isporuke. Pružamo posvećenu podršku i kontinuiranu optimizaciju, osiguravajući da vaša digitalna infrastruktura napreduje i raste u okruženju koje se stalno mijenja.'
    },
    products: {
      title: 'DOMAĆI PROIZVODI',
      active: 'AKTIVNO',
      launchDay: 'DAN LANSIRANJA',
      subtitle: 'Naši ključni proizvodi razvijaju se u potpunosti interno, u najvećoj mjeri za domaće korisnike i stvarne potrebe našeg okruženja. Gradimo ih od nule kao skalabilne i pouzdane sisteme od kritičnog značaja, sa jasnom funkcijom, prepoznatljivim identitetom i dugoročnim uticajem na tržište i društvo.',
    },
    mission: {
      title: 'POKREĆEMO DIGITALNU REVOLUCIJU',
      text: 'qla.dev je pionirska kompanija specijalizovana za razvoj softverskih i hardverskih rješenja, redefinišući inovacije u digitalnom dobu.',
      text2: 'Kombinujući stručnost iskusnih profesionalaca sa svježim perspektivama mladih inženjera, naš tim pruža IT usluge koje obuhvataju različite industrije.'
    },
    services: {
      title: 'NAŠE USLUGE',
      subtitle: 'U qla.dev, naš primarni fokus je na razvoju naprednih softverskih rješenja koja rješavaju složene izazove pojedinaca i preduzeća.'
    },
    algorithm: {
      title: 'ALGORITAM',
      subtitle: 'Skrolajte kroz qla.dev delivery pipeline, od jasnog briefa do sistema spremnog za produkciju.',
      codeComment: '// Izvršavanje poslovne logike...'
    },
    portfolio: {
      title: 'NAŠI PARTNERI',
      subtitle: 'Rastuća mreža brendova, operatera i institucija koji vjeruju qla.dev timu za dizajn, integraciju i razvoj digitalnih sistema iza svog poslovanja.'
    },
    news: {
      title: 'NAJNOVIJE VIJESTI',
      readMore: 'PROČITAJ VIŠE'
    },
    contact: {
      title: 'ZAPOČNITE PROJEKAT SA NAMA',
      visit: 'POSJETITE qla.dev Techpark',
      email: 'POŠALJITE NAM EMAIL',
      call: 'NAZOVITE NAS',
    }
  }
};

export const PRODUCTS_DATA: Product[] = [
  {
    status: 'active',
    title: 'deklarant.ai',
    description: 'An AI-powered platform that scans invoices, extracts data, and automatically fills customs declarations. It suggests correct tariff codes and streamlines documentation.',
    image: 'https://deklarant.ai/build/images/homepage/img/korak-3.png',
    logo: `${RESOURCES_URL}/logo-light-ai-1024x133.png`,
    cta: 'REGISTER',
    primaryUrl: 'https://deklarant.ai/',
    secondaryCta: 'WEB',
    secondaryUrl: 'https://deklarant.ai/'
  },
  {
    status: 'active',
    title: 'Restingo',
    description: 'A hospitality booking and property platform designed for modern stays, discovery, availability search, and listing management.',
    image: `${RESOURCES_URL}/laptab-min-e1736282362439.png`,
    logo: 'https://restingo.com/wp-content/uploads/2025/10/logo-resting.png',
    logoSurface: 'light',
    cta: 'WEBAPP',
    primaryUrl: 'https://restingo.com/',
    secondaryCta: 'ADMIN'
  },
  {
    status: 'active',
    title: 'eNalog.app',
    description: 'An operations dashboard for work orders, purchasing, materials, and reporting, built for teams that need one clear control layer across daily production admin.',
    image: '/enalog-app-preview.svg',
    cta: 'OPEN APP',
    primaryUrl: 'https://enalog.app/'
  },
  {
    status: 'active',
    title: 'trackpal.app',
    description: 'A pallet-return and logistics platform focused on QR scans, client balances, collection workflows, and operational visibility across transport and warehouse flow.',
    image: '/trackpal-app-preview.svg',
    logo: '/trackpal-logo.png',
    logoSurface: 'light',
    cta: 'OPEN APP',
    primaryUrl: 'https://trackpal.app/'
  },
  {
    status: 'active',
    title: 'GeoVizija',
    description: 'A magazine-style editorial portal for nature, travel, society, and technology stories, built around a strong visual front page and category-led publishing.',
    image: '/geovizija-preview.svg',
    cta: 'OPEN SITE',
    primaryUrl: 'https://geovizija.com/'
  },
  {
    status: 'active',
    title: 'NFFIS',
    description: 'A forest-fire intelligence and early-warning platform that combines live conditions, weather metrics, and risk analysis in a map-driven national monitoring interface.',
    image: '/nffis-preview.svg',
    cta: 'OPEN APP',
    primaryUrl: 'https://nffis.com/'
  },
  {
    status: 'active',
    title: 'snovi.fm',
    description: 'A sleep-focused audio platform with bedtime stories, calming narration, and peaceful wind-down rituals designed for both children and adults.',
    image: '/snovi-fm-cover.jpg',
    logo: '/snovi-fm-logo.png',
    logoSurface: 'light',
    logoClassName: 'max-h-[3.75rem]',
    cta: 'LISTEN',
    primaryUrl: 'http://snovi.fm/',
    secondaryCta: 'WEB',
    secondaryUrl: 'http://snovi.fm/'
  },
  {
    status: 'launch',
    title: 'Social Media App',
    description: 'A social media app leaning towards web shopping, NFC/QR technologies for on-table self-ordering, and room service.',
    image: `${RESOURCES_URL}/home-slika-telefoni.png`,
    cta: 'COMING SOON',
    launchDate: '01.06.2026'
  }
];

export const SERVICES_DATA: Service[] = [
  { title: 'Web Applications', description: 'Robust and scalable web solutions.', iconName: 'Monitor' },
  { title: 'Mobile Applications', description: 'Native and cross-platform mobile experiences.', iconName: 'Smartphone' },
  { title: 'API Development', description: 'Secure and efficient RESTful APIs.', iconName: 'Server' },
  { title: 'QR & NFC Integration', description: 'Connecting physical and digital worlds.', iconName: 'Scan' },
  { title: 'AI & Automations', description: 'Intelligent process automation.', iconName: 'Bot' },
  { title: 'Cloud Development', description: 'Scalable infrastructure and storage.', iconName: 'Cloud' },
];

export const REAL_CLIENTS: RealClient[] = [
  {
    name: 'Centar za razvoj poduzetništva',
    subtitle: 'Entrepreneurship Development Center',
    industry: 'Incubator',
    description: 'Sarajevo entrepreneurship center and incubator supporting startups, scaleups, and small businesses through incubation, acceleration, education, mentorship, and grants.',
    logo: 'https://crp.ba/wp-content/uploads/2025/04/CRP-Logo-H.png',
    logoSurface: 'light',
    link: 'https://crp.ba/',
  },
  {
    name: 'MaxMedia',
    subtitle: 'Digital Marketing + Media Agency',
    industry: 'Outdoor Media',
    description: 'Bosnia and Herzegovina media company focused on outdoor advertising, indoor placements, LED network coverage, and digital marketing for broad campaign visibility.',
    logo: 'https://maxmedia.ba/wp-content/uploads/2023/12/imageedit_0_4084366946.png',
    logoSurface: 'light',
    link: 'https://maxmedia.ba/',
  },
  {
    name: 'JICA',
    subtitle: 'Japan International Cooperation Agency',
    industry: 'Development',
    description: 'Japan\'s international cooperation agency supporting developing regions through technical cooperation, ODA grants, ODA loans, partnerships, and recovery initiatives.',
    logo: 'https://www.jica.go.jp/english/assets/img/logo-en.png',
    link: 'https://www.jica.go.jp/english/',
  },
  {
    name: 'Bonaco Media',
    subtitle: 'Media Production + Creative Studio',
    industry: 'Creative Agency',
    description: 'Sarajevo digital marketing and creative agency covering social media, SEO, web design, graphic design, event management, photography, and video production.',
    logo: 'https://bonacomedia.com/wp-content/uploads/2024/09/IMG-464ae62e583541c1741590a1929839bc-V.png',
    logoSurface: 'dark',
    link: 'http://bonacomedia.com/',
  },
  {
    name: 'No+Vello',
    subtitle: 'Beauty + Wellness Brand',
    industry: 'Laser Aesthetics',
    description: 'Beauty franchise in Bosnia and Herzegovina focused on laser epilation and photoepilation, with 9 centers, modern equipment, and medically supervised treatments.',
    logo: 'https://nomasvello.ba/_next/static/images/Nomasvello-Logo-fab54f2e731e115fd018e130b0b62af2.png',
    link: 'https://nomasvello.ba/',
  },
  {
    name: 'jumpCLICK',
    subtitle: 'Digital Marketing Agency',
    industry: 'Performance Media',
    description: 'Global media agency built around media buying, performance-based ad campaigns, proprietary analytics, and high-volume lead generation for advertisers.',
    logo: 'https://www.jumpclick.com/images/jumpclick-final-white.png',
    logoSurface: 'dark',
    link: 'https://www.jumpclick.com/',
  },
  {
    name: 'ABC 1968 doo',
    subtitle: 'Citroen Dealership',
    industry: 'Auto Retail',
    description: 'Official Bosnian Citroen reseller and service center offering new vehicles, used vehicles, servicing, test drives, and aftersales support.',
    logo: 'https://logos-world.net/wp-content/uploads/2021/09/Citroen-Logo.png',
    link: 'https://koncesionar.citroen.ba/abc1968',
  },
  {
    name: 'MobitelBA',
    subtitle: 'Consumer Electronics + Gadget Store',
    industry: 'E-Commerce',
    description: 'Bosnia and Herzegovina online electronics retailer focused on mobile phones, tablets, smartwatches, gaming, audio gear, and a broad catalog of tech accessories.',
    logo: 'https://mobitelba.ba/resources/img/logo-novi2.png',
    logoSurface: 'dark',
    link: 'https://mobitelba.ba/',
  },
  {
    name: 'TRENDY CNC',
    subtitle: 'Metal Processing + CNC Manufacturing',
    industry: 'Manufacturing',
    description: 'Metal-processing company with more than 20 CNC machines, focused on machining, milling, turning, welding, and serial metal parts for export-oriented industrial production.',
    logo: 'https://enalog.app/images/logo/TrendyCNC.png',
    logoSize: 'large',
    link: 'https://www.trendy-doo.com/',
  },
  {
    name: 'Doc.ba',
    subtitle: 'Web + Mobile + GIS Development',
    industry: 'Software Studio',
    description: 'Sarajevo software studio focused on web development, mobile apps, GIS, branding, UI/UX, hosting, and digital marketing.',
    logo: 'https://doc.ba/static/media/logo-white.7491fb41.svg',
    logoSurface: 'dark',
    link: 'https://doc.ba/',
  },
  {
    name: 'BoWido',
    subtitle: 'B2B Windows + Doors Partner',
    industry: 'Building Systems',
    description: 'Dutch B2B supplier of kunststof and aluminium windows and doors, with extranet ordering, technical support, delivery logistics, and aftersales service.',
    logo: 'https://bowido.nl/wp-content/uploads/2025/10/Bowido-logo-oranje.svg',
    link: 'https://bowido.nl/',
  },
];

export const CLIENTS_DATA: Client[] = [
  { name: 'AETHER LOGISTICS', sector: 'Logistics', mark: 'AL', summary: 'Routing, warehouse visibility, and fleet operations.' },
  { name: 'NOVA RETAIL', sector: 'Retail', mark: 'NR', summary: 'Store systems, loyalty flows, and checkout automation.' },
  { name: 'HELIX HEALTH', sector: 'Healthcare', mark: 'HH', summary: 'Patient workflows, booking layers, and data dashboards.' },
  { name: 'VERTEX SYSTEMS', sector: 'Infrastructure', mark: 'VS', summary: 'Monitoring, control rooms, and field-service integration.' },
  { name: 'LUMEN HOSPITALITY', sector: 'Hospitality', mark: 'LH', summary: 'Reservations, property tooling, and guest-facing software.' },
  { name: 'ORBIT PAY', sector: 'Fintech', mark: 'OP', summary: 'Transaction flows, admin surfaces, and internal tooling.' },
  { name: 'ATLAS INDUSTRIES', sector: 'Manufacturing', mark: 'AI', summary: 'Operations planning, traceability, and machine data sync.' },
  { name: 'FLUX MEDIA', sector: 'Media', mark: 'FM', summary: 'Content ops, campaign tooling, and publishing workflows.' },
] as const;

export const NEWS_DATA: NewsItem[] = [
  { date: 'OCT 24, 2024', title: 'qla.dev Expands AI Capabilities', excerpt: 'We have integrated new generative models into our Deklarant platform.' },
  { date: 'SEP 15, 2024', title: 'Partnership with Local University', excerpt: 'Fostering the next generation of engineers through our internship program.' },
  { date: 'AUG 01, 2024', title: 'Launch of Property Manager V2', excerpt: 'Better booking engines and faster sync times for all our clients.' },
];

export const STATS_DATA: Omit<StatItem, 'label'>[] = [
  { value: 12, suffix: 'y' },
  { value: 55, suffix: '+' },
  { value: 35, suffix: '+' },
  { value: 10, suffix: '+' },
];
