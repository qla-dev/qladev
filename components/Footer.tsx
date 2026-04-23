import React from 'react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  route: string;
}

export const Footer: React.FC<FooterProps> = ({ route }) => {
  const isHomeRoute = route === '/';
  const isTechparkRoute = route.startsWith('/techpark');
  const hasMobileBottomNav = isHomeRoute || isTechparkRoute;
  const logoSrc = isTechparkRoute ? '/logo-techpark.png' : 'https://deklarant.ai/build/images/logo-qla-dark.png';
  const logoAlt = isTechparkRoute ? 'qla.dev Techpark' : 'qla.dev';

  return (
    <footer
      className={`bg-black text-white border-t border-gray-900 ${
        hasMobileBottomNav ? 'pt-12 pb-20 md:py-12' : 'py-12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-6 md:mb-0 text-center md:text-left">
            <img
              src={logoSrc}
              alt={logoAlt}
              className="mb-2 block h-10 w-auto object-contain mx-auto md:mx-0"
              loading="lazy"
              decoding="async"
            />
            <p className="text-gray-500 text-sm">Shaping the tech of the future.</p>
        </div>

        <div className="flex gap-6 mb-6 md:mb-0">
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-blue-600 transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-gray-900 rounded-full hover:bg-blue-600 transition-colors"><Instagram size={20} /></a>
        </div>

        <div className="text-gray-600 text-sm font-mono">
            &copy; {new Date().getFullYear()} qla.dev. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
