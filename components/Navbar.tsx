import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { Language, Translations } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations['nav'];
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t, onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.home },
    { id: 'about', label: t.about },
    { id: 'products', label: t.products },
    { id: 'services', label: t.services },
    { id: 'news', label: t.news },
    { id: 'portfolio', label: t.portfolio },
    { id: 'contact', label: t.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const FlagIcon = ({ countryCode }: { countryCode: string }) => (
    <img 
      src={`https://flagsapi.com/${countryCode}/flat/64.png`} 
      alt={`${countryCode} Flag`} 
      className="w-6 h-6 object-contain"
    />
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-2xl font-mono font-bold text-white tracking-tighter">
              qla<span className="text-blue-500">.dev</span>
            </span>
            <Terminal className="ml-2 w-5 h-5 text-blue-500 animate-pulse" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-3 py-2 text-sm font-medium font-mono text-gray-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'bs' : 'en')}
              className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-mono border border-white/20 px-3 py-1.5 rounded transition-colors"
            >
              <FlagIcon countryCode={lang === 'en' ? 'US' : 'BA'} />
              <span className="leading-none">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => {
                onStartProject();
                setIsMobileMenuOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-sm font-bold font-mono text-sm transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.6)]"
            >
              {t.cta}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-300 hover:text-white block w-full text-left px-3 py-4 rounded-md text-base font-medium font-mono border-b border-gray-800"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center justify-between px-3 py-4 gap-4">
               <button
                  onClick={() => {
                    setLang(lang === 'en' ? 'bs' : 'en');
                  }}
                  className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-mono border border-white/20 px-3 py-2 rounded"
                >
                  <FlagIcon countryCode={lang === 'en' ? 'US' : 'BA'} />
                  <span className="leading-none">{lang.toUpperCase()}</span>
                </button>
                <button 
                  onClick={() => {
                    onStartProject();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-sm font-bold font-mono text-sm flex-grow"
                >
                  {t.cta}
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};