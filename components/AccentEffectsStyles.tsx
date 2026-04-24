import React from 'react';

export const AccentEffectsStyles: React.FC = () => (
  <style>{`
    .techpark-accent-slash {
      color: rgb(37 99 235);
      display: inline-block;
      text-shadow: 0 0 10px rgba(37, 99, 235, 0.22);
      animation: techparkSlashFlicker 1.9s steps(1, end) infinite;
    }

    .techpark-accent-slash-white {
      color: rgba(255, 255, 255, 0.98);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.18), 0 0 18px rgba(37, 99, 235, 0.08);
    }

    .techpark-accent-line {
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg, rgba(37, 99, 235, 0.98) 0%, rgba(59, 130, 246, 0.68) 44%, rgba(59, 130, 246, 0.26) 78%, transparent 100%);
      box-shadow: 0 0 14px rgba(37, 99, 235, 0.38), 0 0 32px rgba(37, 99, 235, 0.18);
      animation: techparkDividerNeon 3.8s steps(1, end) infinite;
    }

    .techpark-accent-line-reverse {
      transform: scaleX(-1);
    }

    .techpark-accent-line::before {
      content: '';
      position: absolute;
      top: -4px;
      right: 0;
      bottom: -4px;
      left: 0;
      background: linear-gradient(
        90deg,
        rgba(147, 197, 253, 0.62) 0%,
        rgba(96, 165, 250, 0.42) 30%,
        rgba(59, 130, 246, 0.24) 58%,
        transparent 100%
      );
      filter: blur(5px);
      opacity: 0.68;
      animation: techparkDividerAura 3.8s steps(1, end) infinite;
    }

    .techpark-accent-line::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.78) 0%,
        rgba(191, 219, 254, 0.46) 26%,
        rgba(96, 165, 250, 0.18) 58%,
        transparent 100%
      );
      opacity: 0.84;
      animation: techparkDividerCore 3.8s steps(1, end) infinite;
    }

    @keyframes techparkSlashFlicker {
      0%, 12%, 16%, 54%, 58%, 100% {
        opacity: 1;
        text-shadow: 0 0 12px rgba(37, 99, 235, 0.28), 0 0 24px rgba(37, 99, 235, 0.14);
      }
      13%, 15%, 55%, 57% {
        opacity: 0.22;
        text-shadow: 0 0 5px rgba(37, 99, 235, 0.08);
      }
    }

    @keyframes techparkDividerNeon {
      0%, 9%, 13%, 48%, 53%, 100% {
        opacity: 1;
        box-shadow: 0 0 16px rgba(37, 99, 235, 0.44), 0 0 34px rgba(37, 99, 235, 0.24), 0 0 58px rgba(59, 130, 246, 0.12);
      }
      10%, 12%, 49%, 52% {
        opacity: 0.82;
        box-shadow: 0 0 10px rgba(37, 99, 235, 0.26), 0 0 22px rgba(37, 99, 235, 0.12), 0 0 38px rgba(59, 130, 246, 0.05);
      }
      70% {
        opacity: 0.9;
        box-shadow: 0 0 12px rgba(37, 99, 235, 0.32), 0 0 28px rgba(37, 99, 235, 0.16), 0 0 44px rgba(59, 130, 246, 0.08);
      }
      73% {
        opacity: 0.78;
        box-shadow: 0 0 8px rgba(37, 99, 235, 0.22), 0 0 18px rgba(37, 99, 235, 0.1), 0 0 30px rgba(59, 130, 246, 0.04);
      }
      76%, 92% {
        opacity: 1;
        box-shadow: 0 0 16px rgba(37, 99, 235, 0.44), 0 0 34px rgba(37, 99, 235, 0.24), 0 0 58px rgba(59, 130, 246, 0.12);
      }
    }

    @keyframes techparkDividerAura {
      0%, 9%, 13%, 48%, 53%, 100% {
        opacity: 0.84;
      }
      10%, 12%, 49%, 52% {
        opacity: 0.42;
      }
      70% {
        opacity: 0.58;
      }
      73% {
        opacity: 0.36;
      }
      76%, 92% {
        opacity: 0.84;
      }
    }

    @keyframes techparkDividerCore {
      0%, 9%, 13%, 48%, 53%, 100% {
        opacity: 0.94;
      }
      10%, 12%, 49%, 52% {
        opacity: 0.56;
      }
      70% {
        opacity: 0.72;
      }
      73% {
        opacity: 0.5;
      }
      76%, 92% {
        opacity: 0.94;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .techpark-accent-slash,
      .techpark-accent-line,
      .techpark-accent-line::before,
      .techpark-accent-line::after {
        animation: none;
      }
    }
  `}</style>
);
