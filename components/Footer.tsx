import React from 'react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-2xl font-mono font-bold mb-2">qla<span className="text-blue-600">.dev</span></h4>
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