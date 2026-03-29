import React from 'react';
import type { FormStatus } from '../types';

interface FormStatusMessageProps {
  status: FormStatus | null;
}

export const FormStatusMessage: React.FC<FormStatusMessageProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-mono ${
        status.type === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
          : 'border-red-500/30 bg-red-500/10 text-red-200'
      }`}
    >
      {status.message}
    </div>
  );
};
