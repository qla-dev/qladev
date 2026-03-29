import React, { useEffect, useState } from 'react';

const TechParticles: React.FC = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
      size: number;
      value: string;
      opacity: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const syntax = [
      '{ }', '[]', '()', '</>', '/>', '=>', '!=', '===', '&&', '||', ';',
      'npm', 'git', 'src', '$$', 'const', 'let', 'import', 'export',
      '1', '0', '1', '0', '1', '0',
      '1', '0', '1', '0', '1', '0',
      'return', 'true', 'false', 'if', 'else', 'async', 'await',
      'void', 'null', 'try', 'catch',
    ];

    const tempParticles = [];
    const rows = 8;
    const cols = 8;
    let idCounter = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() > 0.9) continue;

        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;

        tempParticles.push({
          id: idCounter++,
          left: (col * cellWidth) + (Math.random() * (cellWidth * 0.8)),
          top: (row * cellHeight) + (Math.random() * (cellHeight * 0.8)),
          delay: Math.random() * 5,
          size: Math.random() * 14 + 12,
          value: syntax[Math.floor(Math.random() * syntax.length)],
          opacity: Math.random() * 0.5 + 0.1,
          duration: 15 + Math.random() * 15,
        });
      }
    }

    setParticles(tempParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute font-mono font-bold text-blue-500/50 animate-float whitespace-nowrap"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            textShadow: `0 0 ${particle.size / 3}px rgba(59, 130, 246, 0.4)`,
          }}
        >
          {particle.value}
        </div>
      ))}
    </div>
  );
};

export const TechHeroBackdrop: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20 animate-grid-move pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] animate-pulse-fast pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none"></div>
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] animate-spin-slow opacity-60"></div>
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(0,123,255,0.05)_45%,rgba(99,102,241,0.05)_55%,transparent_75%)] bg-[length:200%_100%] animate-shimmer-slow mix-blend-screen"></div>
    </div>
    <TechParticles />
  </>
);
