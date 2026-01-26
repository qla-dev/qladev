import React, { useState } from 'react';
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
import { TEXT_CONTENT } from './constants';
import { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = TEXT_CONTENT[lang];

  return (
    <div className="font-sans antialiased text-white selection:bg-blue-500 selection:text-white">
      
      <Navbar lang={lang} setLang={setLang} t={t.nav} />
      
      <main>
        <Hero t={t.hero} />
        
        <Stats t={t.stats} />
        
        <About t={t.about} />
        
        <Mission tMission={t.mission} tAlgo={t.algorithm} />

        <Products t={t.products} lang={lang} />
        
        <Services t={t.services} />

        <Algorithm t={t.algorithm} />
        
        <Portfolio t={t.portfolio} />

        <News t={t.news} />

        <Contact t={t.contact} />
      </main>

      <Footer />
      
    </div>
  );
};

export default App;