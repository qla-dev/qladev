import React, { useState, useEffect } from 'react';
import { Translations } from '../types';
import { ArrowRight, Phone, Terminal, Cpu, ShieldCheck } from 'lucide-react';

interface HeroProps {
  t: Translations['hero'];
}

const TechParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, left: number, top: number, delay: number, size: number, value: string, opacity: number, duration: number}>>([]);

  useEffect(() => {
    const syntax = [
      '{ }', '[]', '()', '</>', '/>', '=>', '!=', '===', '&&', '||', ';', 
      'npm', 'git', 'src', '$$', 'const', 'let', 'import', 'export',
      '1', '0', '1', '0', '1', '0', // High binary density
      '1', '0', '1', '0', '1', '0',
      'return', 'true', 'false', 'if', 'else', 'async', 'await',
      'void', 'null', 'try', 'catch'
    ];

    const tempParticles = [];
    const rows = 8;
    const cols = 8;
    let idCounter = 0;

    // Use a grid system to ensure even distribution
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // 10% chance to skip a cell for organic randomness
        if (Math.random() > 0.9) continue;

        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        
        // Calculate position within the specific grid cell
        // Adding random offset within the cell dimensions
        const left = (c * cellWidth) + (Math.random() * (cellWidth * 0.8));
        const top = (r * cellHeight) + (Math.random() * (cellHeight * 0.8));

        tempParticles.push({
          id: idCounter++,
          left,
          top,
          delay: Math.random() * 5,
          size: Math.random() * 14 + 12, // 12px to 26px
          value: syntax[Math.floor(Math.random() * syntax.length)],
          opacity: Math.random() * 0.5 + 0.1, // Middle ground opacity
          duration: 15 + Math.random() * 15 
        });
      }
    }

    setParticles(tempParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute font-mono font-bold text-blue-500/50 animate-float whitespace-nowrap"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            textShadow: `0 0 ${p.size / 3}px rgba(59, 130, 246, 0.4)` // Softer glow
          }}
        >
          {p.value}
        </div>
      ))}
    </div>
  );
};

const CodeWindow = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const codeLines = [
      "> initializing core systems...",
      "> establishing secure handshake...",
      "> loading modules: [AI, IoT, WEB3]...",
      "> connecting to neural interface...",
      "> optimizing performance metrics...",
      "> allocating memory blocks [0x00...0xFF]...",
      "> compiling assets...",
      "> deploying to production...",
      "> system_ready: true",
      "> welcome to qla.dev"
    ];
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setLines(prev => [...prev, codeLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    // Oversized container bleeding off screen
    <div className="w-full lg:w-[120vw] relative transition-all duration-1000 lg:-mr-[50vw]">
      <div className="glass-card rounded-lg overflow-hidden shadow-[0_0_80px_rgba(0,123,255,0.2)] border border-white/10 relative group h-[400px] lg:h-[600px] flex flex-col">
        {/* Window Header */}
        <div className="bg-gray-900/95 px-6 py-4 flex items-center gap-4 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-sm font-mono text-gray-500 ml-4 flex-grow">root@qla-server:~</div>
          <div className="text-xs font-mono text-blue-500 animate-pulse hidden sm:block">CONNECTION_SECURE</div>
        </div>
        
        {/* Window Body */}
        <div className="p-8 font-mono text-lg md:text-xl h-full overflow-y-auto relative bg-black/90 text-left">
          <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
          {lines.map((line, idx) => (
            <div key={idx} className="mb-3 text-blue-400/90 break-words">
              <span className="text-gray-600 mr-3 opacity-50">$</span>
              <span className={idx === lines.length - 1 ? "animate-pulse text-blue-300" : ""}>{line}</span>
            </div>
          ))}
          <div className="w-3 h-6 bg-blue-500 animate-blink inline-block mt-2 align-middle"></div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000 -z-10"></div>
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-qla-dark pt-20">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20 animate-grid-move"></div>
      
      {/* Animated Orbs - Changed cyan to indigo to avoid green tint */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] animate-pulse-fast pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Subtle Moving Searchlight/Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Rotating subtle radial gradient - Changed to blue/indigo */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] animate-spin-slow opacity-60"></div>
        
        {/* Linear swipe similar to "The Next" text but full screen and faint - Changed second color from cyan to indigo */}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(0,123,255,0.05)_45%,rgba(99,102,241,0.05)_55%,transparent_75%)] bg-[length:200%_100%] animate-shimmer-slow mix-blend-screen"></div>
      </div>

      {/* Floating Tech Particles */}
      <TechParticles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-left relative z-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-400 font-mono text-xs tracking-widest">SYSTEM ONLINE v2.0</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter font-sans mb-6 leading-none">
              DEVELOPING <br />
              {/* Shimmer/Glance Animation */}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-[length:200%_auto] animate-shimmer">
                THE NEXT
              </span> <br />
              GENERATION <br />
              <span className="text-gray-500">OF TECH</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-lg text-gray-400 font-mono leading-relaxed border-l-2 border-blue-500 pl-6">
              {t.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="relative px-8 py-4 bg-blue-600 text-white font-bold font-mono tracking-wider overflow-hidden rounded-sm group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  {t.quote} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="px-8 py-4 bg-transparent border border-gray-700 text-white font-bold font-mono tracking-wider rounded-sm hover:border-blue-500 hover:text-blue-400 transition-all flex items-center gap-2 group">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {t.call}
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-gray-500 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-500" />
                <span>HIGH PERFORMANCE</span>
              </div>
               <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>SECURE ARCHITECTURE</span>
              </div>
            </div>
          </div>

          {/* Code Window / Visual */}
          <div className="relative z-10">
            <CodeWindow />
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};