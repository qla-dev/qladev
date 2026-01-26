import React, { useState, useEffect, useRef } from 'react';
import { Translations, Language } from '../types';
import { ArrowRight, Phone, Cpu, ShieldCheck } from 'lucide-react';

interface HeroProps {
  t: Translations['hero'];
  lang: Language;
  startQuoteMode: boolean;
  setStartQuoteMode: (active: boolean) => void;
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
        if (Math.random() > 0.9) continue;

        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        
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

interface TerminalProps {
  t: Translations['hero']['terminal'];
  startQuoteMode: boolean;
  onReset: () => void;
}

const InteractiveTerminal: React.FC<TerminalProps> = ({ t, startQuoteMode, onReset }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0); // 0: Boot, 1: Quote Intro, 2: Q1, 3: Q2, 4: Q3, 5: Success
  const [isSystemTyping, setIsSystemTyping] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Refs for managing async operations and cancellation
  const sequenceId = useRef(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // Focus input when user starts typing phase
  useEffect(() => {
    if (step >= 2 && !isSystemTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, isSystemTyping]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, inputValue, isSystemTyping]);

  const typeLine = async (text: string, delay: number, id: number) => {
    if (sequenceId.current !== id || !isMounted.current) return;

    // Start new line
    setHistory(prev => [...prev, ""]);
    
    let currentLineText = ""; 
    
    for (let i = 0; i < text.length; i++) {
        if (sequenceId.current !== id || !isMounted.current) return;
        await new Promise(resolve => setTimeout(resolve, delay));
        if (sequenceId.current !== id || !isMounted.current) return;
        
        currentLineText += text[i];
        
        setHistory(prev => {
            const newHistory = [...prev];
            // Ensure we are updating the last line
            if (newHistory.length > 0) {
                 newHistory[newHistory.length - 1] = currentLineText;
            }
            return newHistory;
        });
    }
  };

  const delay = (ms: number, id: number) => {
    return new Promise<void>((resolve) => {
      const start = Date.now();
      const check = () => {
         if (sequenceId.current !== id || !isMounted.current) return; // Stop if cancelled or unmounted
         if (Date.now() - start >= ms) resolve();
         else requestAnimationFrame(check);
      };
      check();
    });
  };

  // Main Logic Loop - Runs once on mount
  useEffect(() => {
    sequenceId.current++;
    const myId = sequenceId.current;

    const run = async () => {
      setIsSystemTyping(true);
      setHistory([]); // Always start fresh

      if (!startQuoteMode) {
        // --- BOOT SEQUENCE ---
        await new Promise(r => setTimeout(r, 100));
        if (sequenceId.current !== myId) return;

        for (const line of t.initial) {
          if (sequenceId.current !== myId) break;
          await typeLine(line, 10, myId); 
          await delay(50, myId);
        }
        
        if (sequenceId.current === myId && isMounted.current) {
           setIsSystemTyping(false);
        }

      } else {
        // --- QUOTE SEQUENCE ---
        // Jump straight to input mode without typing intro lines
        await delay(300, myId);
        if (sequenceId.current === myId && isMounted.current) {
            setStep(2); 
            setIsSystemTyping(false);
        }
      }
    };

    run();
  }, [startQuoteMode]); // Technically runs on mount due to key prop in parent, but dependency safe to keep

  // Handle Success Step specially
  useEffect(() => {
    if (step === 5) {
       sequenceId.current++;
       const myId = sequenceId.current;

       const runSuccess = async () => {
           setIsSystemTyping(true);
           setHistory([]); // Clear previous interaction
           await delay(400, myId);
          
           for (const line of t.success) {
             if (sequenceId.current !== myId) break;
             await typeLine(line, 30, myId);
             await delay(300, myId);
           }

           if (sequenceId.current === myId) {
              await delay(800, myId);
              // Adding blank line for separation
              setHistory(prev => [...prev, ""]);
              
              const countdownLine = "Redirecting in ";
              setHistory(prev => [...prev, countdownLine]);
              
              // Animated countdown on the same line
              const counts = ["4...", "3...", "2...", "1...", "0"];
              let currentSuffix = "";
              
              for (const count of counts) {
                  if (sequenceId.current !== myId) return;
                  
                  // Typing effect for the dots/numbers if desired, or just updating the line
                  // Simple update for countdown feels more "terminal"
                  currentSuffix = count;
                  
                  setHistory(prev => {
                      const newH = [...prev];
                      newH[newH.length - 1] = `${countdownLine}${currentSuffix}`;
                      return newH;
                  });
                  
                  await delay(1000, myId);
              }

              if (sequenceId.current === myId && isMounted.current) {
                  onReset(); // This triggers parent state change -> Remounts component -> Boot sequence
              }
           }
       };
       runSuccess();
    }
  }, [step]);


  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== "" && !isSystemTyping) {
      const userText = inputValue;
      setInputValue("");
      
      setHistory(prev => [...prev, `user@qla:~$ ${userText}`]);
      setIsSystemTyping(true);
      
      sequenceId.current++;
      const myId = sequenceId.current;

      await delay(600, myId);
      if (sequenceId.current !== myId) return;

      if (step === 2) {
        await typeLine(t.questions[1], 30, myId);
        if (sequenceId.current === myId) {
            setIsSystemTyping(false);
            setStep(3);
        }
      } else if (step === 3) {
        await typeLine(t.questions[2], 30, myId);
        if (sequenceId.current === myId) {
            setIsSystemTyping(false);
            setStep(4);
        }
      } else if (step === 4) {
        setStep(5); // Triggers success effect
      }
    }
  };

  return (
    <div className="w-full h-full relative">
      <div 
        className="w-full h-full glass-card rounded-lg lg:rounded-r-none lg:border-r-0 overflow-hidden shadow-[0_0_80px_rgba(0,123,255,0.2)] border border-white/10 relative group flex flex-col"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Window Header */}
        <div className="bg-gray-900/95 px-6 py-4 flex items-center gap-4 border-b border-white/5 cursor-text">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-sm font-mono text-gray-500 ml-4 flex-grow">root@qla-server:~</div>
          <div className="text-xs font-mono text-blue-500 animate-pulse hidden sm:block">INTERACTIVE_SESSION</div>
        </div>
        
        {/* Window Body */}
        <div ref={scrollRef} className="p-8 font-mono text-lg md:text-xl h-full overflow-y-auto relative bg-black/95 text-left custom-scrollbar">
          <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
          
          <div className="max-w-[85vw] lg:max-w-xl w-full">
            {history.map((line, idx) => (
                <div key={idx} className={`mb-1 min-h-[1.5rem] break-words flex flex-row items-start`}>
                {line !== "" && (
                     <span className="text-red-500 font-bold mr-3 shrink-0 select-none">$</span>
                )}
                <span className={line.startsWith('user') ? 'text-white' : 'text-blue-400'}>
                    {line}
                </span>
                </div>
            ))}

            {/* Input Line */}
            {!isSystemTyping && step >= 2 && step < 5 && (
                <div className="flex items-center text-white mt-2">
                <span className="text-red-500 font-bold mr-3 shrink-0 select-none">$</span>
                <span className="text-green-500 mr-3 whitespace-nowrap">user@qla:~$</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-white w-full caret-blue-500"
                    autoFocus
                    placeholder={step === 2 ? t.placeholders[0] : step === 3 ? t.placeholders[1] : t.placeholders[2]}
                />
                </div>
            )}
            
            {/* Blinking Cursor block when system is typing */}
            {isSystemTyping && (
                <div className="w-3 h-6 bg-blue-500 animate-blink inline-block ml-3 align-middle"></div>
            )}
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-10 blur-2xl group-hover:opacity-20 transition duration-1000 -z-10"></div>
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ t, lang, startQuoteMode, setStartQuoteMode }) => {

  const handleGetQuote = () => {
    setStartQuoteMode(true);
  };
  
  const handleReset = () => {
    setStartQuoteMode(false);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-qla-dark pt-20">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20 animate-grid-move"></div>
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] animate-pulse-fast pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] animate-spin-slow opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(0,123,255,0.05)_45%,rgba(99,102,241,0.05)_55%,transparent_75%)] bg-[length:200%_100%] animate-shimmer-slow mix-blend-screen"></div>
      </div>

      <TechParticles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          
          {/* Text Content Column */}
          <div className="text-left relative z-20 py-10 lg:py-0">
             
             {/* 
                 Grid Overlay Technique:
                 We place both content blocks in the same grid cell (1/1).
                 This ensures the container height adapts to the tallest content 
                 without layout jumps, and allows for perfect cross-fading overlap.
             */}
             <div className="grid grid-cols-1 items-center">
                
                {/* --- STATE A: DEFAULT HERO --- */}
                <div 
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                    ${!startQuoteMode 
                      ? 'opacity-100 translate-x-0 blur-none scale-100 pointer-events-auto' 
                      : 'opacity-0 -translate-x-12 blur-sm scale-95 pointer-events-none select-none'
                    }
                  `}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      <span className="text-blue-400 font-mono text-xs tracking-widest">SYSTEM ONLINE v2.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter font-sans mb-6 leading-none">
                      {t.titleParts[0]} <br />
                      <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-[length:200%_auto] animate-shimmer">
                        {t.titleParts[1]}
                      </span> <br />
                      {t.titleParts[2]} <br />
                      <span>{t.titleParts[3]}</span>
                    </h1>
                    
                    <p className="mt-6 max-w-xl text-lg text-gray-400 font-mono leading-relaxed border-l-2 border-blue-500 pl-6">
                      {t.subtitle}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                      <button 
                        onClick={handleGetQuote}
                        className="relative px-8 py-4 bg-blue-600 text-white font-bold font-mono tracking-wider overflow-hidden rounded-sm group cursor-pointer z-20"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center gap-2">
                          {t.quote} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      
                      <button className="px-8 py-4 bg-transparent border border-gray-700 text-white font-bold font-mono tracking-wider rounded-sm hover:border-blue-500 hover:text-blue-400 transition-all flex items-center gap-2 group z-20">
                        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        {t.call}
                      </button>
                    </div>
                    
                    <div className="mt-12 flex items-center gap-8 text-gray-500 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-500" />
                        <span>{t.highPerformance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-500" />
                        <span>{t.secureArchitecture}</span>
                      </div>
                    </div>
                </div>

                {/* --- STATE B: QUOTE MODE --- */}
                <div 
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                    ${startQuoteMode 
                      ? 'opacity-100 translate-x-0 blur-none scale-100 pointer-events-auto' 
                      : 'opacity-0 translate-x-12 blur-sm scale-95 pointer-events-none select-none'
                    }
                  `}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 font-mono text-xs tracking-widest">SECURE CHANNEL ESTABLISHED</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter font-sans mb-6 leading-none uppercase">
                       <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-blue-600 bg-[length:200%_auto] animate-shimmer">
                        {t.terminal.quoteIntro[0]}
                      </span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-gray-400 font-mono leading-relaxed border-l-2 border-green-500 pl-6">
                      {t.terminal.quoteIntro[1]}
                    </p>
                    
                    <div className="mt-8 flex items-center gap-4">
                      <button 
                        onClick={handleReset}
                        className="px-6 py-3 border border-red-500/30 text-red-500 font-mono text-xs hover:bg-red-500/10 hover:border-red-500 transition-all flex items-center gap-2 rounded-sm"
                      >
                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                         [ ABORT SEQUENCE ]
                      </button>
                    </div>
                </div>

             </div>
          </div>

          {/* Interactive Terminal - Overflow Layout */}
          <div className="relative z-10 w-full flex items-center h-[400px] lg:h-[600px]">
             {/* 
                 Container logic:
                 Mobile: Width > 100% to simulate overflow right.
                 Desktop: Absolute positioned to screen right edge using massive width or positioning.
                 We use width: 140% and negative margin to push it off-screen on the right.
             */}
             <div className="w-[120%] -mr-[20%] lg:w-[150vw] lg:-mr-[80vw] lg:ml-0 h-full">
                <InteractiveTerminal 
                  key={`${startQuoteMode ? 'mode-quote' : 'mode-terminal'}-${lang}`}
                  t={t.terminal} 
                  startQuoteMode={startQuoteMode} 
                  onReset={handleReset} 
                />
             </div>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none z-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};