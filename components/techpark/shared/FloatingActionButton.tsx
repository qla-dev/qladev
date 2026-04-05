import React from 'react';

interface FloatingActionButtonProps {
  label: string;
  hint: string;
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ label, hint, onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-40 bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-sm font-bold font-mono text-sm tracking-[0.16em] uppercase shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all"
  >
    <span className="block">{label}</span>
    <span className="block mt-1 text-[10px] tracking-[0.18em] text-blue-100/80">{hint}</span>
  </button>
);
