
import { Translations, Product, Service, NewsItem, PortfolioItem, StatItem } from './types';
import { Monitor, Smartphone, Server, Scan, Bot, Cloud } from 'lucide-react';

export const TEXT_CONTENT: Record<'en' | 'bs', Translations> = {
  en: {
    nav: {
      home: 'HOMEPAGE',
      about: 'ABOUT',
      products: 'PRODUCTS',
      services: 'SERVICES',
      news: 'NEWS',
      portfolio: 'PORTFOLIO',
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
      subtitle: 'Our flagship products are developed entirely in-house, showcasing our capability to build scalable, mission-critical systems from the ground up.',
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
      subtitle: 'Scroll to execute our core processing logic. We believe in clean code and cleaner solutions.',
      codeComment: '// Executing core business logic...'
    },
    portfolio: {
      title: 'RECENT WORKS',
      subtitle: 'A selection of projects where we helped businesses scale.'
    },
    news: {
      title: 'LATEST NEWS',
      readMore: 'READ MORE'
    },
    contact: {
      title: 'START A PROJECT WITH US',
      visit: 'VISIT US',
      email: 'SEND US EMAIL',
      call: 'GIVE US A CALL',
    }
  },
  bs: {
    nav: {
      home: 'POČETNA',
      about: 'O NAMA',
      products: 'PROIZVODI',
      services: 'USLUGE',
      news: 'VIJESTI',
      portfolio: 'PORTFOLIO',
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
      title: 'PROIZVODI',
      active: 'AKTIVNO',
      launchDay: 'DAN LANSIRANJA',
      subtitle: 'Naši vodeći proizvodi su razvijeni u potpunosti interno, pokazujući našu sposobnost da izgradimo skalabilne sisteme od kritičnog značaja od nule.',
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
      subtitle: 'Skrolajte da izvršite našu osnovnu logiku. Vjerujemo u čist kod i još čistija rješenja.',
      codeComment: '// Izvršavanje poslovne logike...'
    },
    portfolio: {
      title: 'NEDAVNI RADOVI',
      subtitle: 'Izbor projekata gdje smo pomogli preduzećima da rastu.'
    },
    news: {
      title: 'NAJNOVIJE VIJESTI',
      readMore: 'PROČITAJ VIŠE'
    },
    contact: {
      title: 'ZAPOČNITE PROJEKAT SA NAMA',
      visit: 'POSJETITE NAS',
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
    image: 'https://picsum.photos/600/300?random=1',
    cta: 'REGISTER',
    secondaryCta: 'WEB'
  },
  {
    status: 'active',
    title: 'Property Management',
    description: 'A comprehensive Property Management and Booking System designed for modern hospitality needs.',
    image: 'https://picsum.photos/600/300?random=2',
    cta: 'WEBAPP',
    secondaryCta: 'ADMIN'
  },
  {
    status: 'launch',
    title: 'Social Media App',
    description: 'A social media app leaning towards web shopping, NFC/QR technologies for on-table self-ordering, and room service.',
    image: 'https://picsum.photos/600/300?random=3',
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

export const PORTFOLIO_DATA: PortfolioItem[] = [
  { title: 'FinTech Dashboard', category: 'Web App', image: 'https://picsum.photos/400/300?random=10' },
  { title: 'Smart Home Hub', category: 'IoT', image: 'https://picsum.photos/400/300?random=11' },
  { title: 'E-Commerce Giant', category: 'Mobile App', image: 'https://picsum.photos/400/300?random=12' },
  { title: 'Logistics Tracker', category: 'Hardware/Software', image: 'https://picsum.photos/400/300?random=13' },
];

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