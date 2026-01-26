import React from 'react';
import { Translations } from '../types';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

interface ContactProps {
  t: Translations['contact'];
}

export const Contact: React.FC<ContactProps> = ({ t }) => {
  return (
    <section id="contact" className="py-24 bg-qla-blue text-white relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
                <h2 className="text-5xl font-black mb-8 leading-tight">
                    {t.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                        <MapPin className="w-8 h-8 mb-4 text-cyan-300" />
                        <h3 className="font-bold text-lg mb-2">{t.visit}</h3>
                        <p className="text-blue-100 text-sm">Vilsonovo šetalište 9<br/>71000 Sarajevo<br/>Bosnia & Herzegovina</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
                        <Phone className="w-8 h-8 mb-4 text-cyan-300" />
                        <h3 className="font-bold text-lg mb-2">{t.call}</h3>
                        <p className="text-blue-100 text-sm font-mono text-xl">+387 62 738 230</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur p-6 rounded-lg md:col-span-2">
                        <Mail className="w-8 h-8 mb-4 text-cyan-300" />
                        <h3 className="font-bold text-lg mb-2">{t.email}</h3>
                        <p className="text-blue-100 text-sm font-mono text-xl">contact@qla.dev</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white text-gray-900 p-8 md:p-12 rounded-2xl shadow-2xl">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase text-gray-500">{t.form.name}</label>
                            <input type="text" className="w-full bg-gray-100 border-none p-4 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 uppercase text-gray-500">{t.form.email}</label>
                            <input type="email" className="w-full bg-gray-100 border-none p-4 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
                        </div>
                    </div>
                    
                    <div>
                         <label className="block text-sm font-bold mb-2 uppercase text-gray-500">{t.form.type}</label>
                         <select className="w-full bg-gray-100 border-none p-4 rounded-lg focus:ring-2 focus:ring-blue-500">
                             <option>Web Application</option>
                             <option>Mobile App</option>
                             <option>Hardware/IoT</option>
                             <option>Consulting</option>
                         </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 uppercase text-gray-500">{t.form.message}</label>
                        <textarea className="w-full bg-gray-100 border-none p-4 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500" placeholder="..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        {t.form.submit} <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>

        </div>
       </div>
    </section>
  );
};