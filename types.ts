export type Language = 'en' | 'bs';

export interface NavItem {
  id: string;
  label: string;
}

export interface Product {
  status: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  secondaryCta?: string;
  launchDate?: string;
}

export interface Service {
  title: string;
  description: string;
  iconName: string;
}

export interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    products: string;
    services: string;
    news: string;
    portfolio: string;
    contact: string;
    cta: string;
  };
  hero: {
    title: string;
    subtitle: string;
    quote: string;
    call: string;
  };
  stats: {
    years: string;
    projects: string;
    clients: string;
    services: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
  };
  products: {
    title: string; 
    active: string;
    launchDay: string;
  };
  mission: {
    title: string;
    text: string;
    text2: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  algorithm: {
    title: string;
    subtitle: string;
    codeComment: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
  };
  news: {
    title: string;
    readMore: string;
  };
  contact: {
    title: string;
    visit: string;
    email: string;
    call: string;
    form: {
      name: string;
      email: string;
      type: string;
      message: string;
      submit: string;
    }
  }
}