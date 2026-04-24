import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Translations } from '../types';

interface ContactProps {
  t: Translations['contact'];
}

export const Contact: React.FC<ContactProps> = ({ t }) => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-qla-blue text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50" />
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-center uppercase">
            <span className="text-blue-600">/</span> {t.title}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow opacity-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <Mail className="w-8 h-8 mb-4 text-cyan-300" />
                <h3 className="font-bold text-lg mb-2">{t.email}</h3>
                <p className="text-blue-100 text-sm font-mono text-xl">contact@qla.dev</p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <Phone className="w-8 h-8 mb-4 text-cyan-300" />
                <h3 className="font-bold text-lg mb-2">{t.call}</h3>
                <p className="text-blue-100 text-sm font-mono text-xl">+387 67 10 46 240</p>
              </div>

              <div className="bg-white/10 backdrop-blur p-6 rounded-lg md:col-span-2">
                <MapPin className="w-8 h-8 mb-4 text-cyan-300" />
                <h3 className="font-bold text-lg mb-2">{t.visit}</h3>
                <p className="text-blue-100 text-sm">
                  Braće Mulić 81
                  <br />
                  71000 Sarajevo
                  <br />
                  Bosnia & Herzegovina
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-[400px] lg:h-auto relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.1788082019953!2d18.3365875!3d43.831390299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c913598ff523%3A0xc25f9a4094f108ef!2sqla.dev!5e0!3m2!1sen!2sba!4v1776896943998!5m2!1sen!2sba"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="qla.dev location"
              className="w-full h-full"
            />

            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-blue-500/50 transition-colors duration-500 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
