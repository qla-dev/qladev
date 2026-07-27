/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        qla: {
          blue: '#007bff',
          cyan: '#06b6d4',
          dark: '#050505',
          card: '#0a0a0a',
          border: '#1f1f1f',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)',
        'cyber-grid':
          'radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.1) 0%, transparent 50%)',
      },
      animation: {
        'grid-move': 'gridMove 20s linear infinite',
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        type: 'type 3s steps(40, end)',
        blink: 'blink 1s step-end infinite',
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        'shimmer-slow': 'shimmer 10s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        gridMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        },
        type: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
