import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SplitActionModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  description: string;
  promoPanel: React.ReactNode;
  children: React.ReactNode;
}

export const SplitActionModal: React.FC<SplitActionModalProps> = ({
  open,
  onClose,
  eyebrow,
  title,
  description,
  promoPanel,
  children,
}) => {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] bg-black/88 backdrop-blur-md">
      <div className="absolute inset-3 sm:inset-4">
        <div className="grid h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070d] shadow-[0_0_60px_rgba(0,123,255,0.2)] grid-rows-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:grid-rows-1">
          <div className="relative min-h-0 overflow-y-auto border-b border-white/10 bg-gradient-to-br from-blue-900/45 via-[#07111f] to-black lg:border-b-0 lg:border-r">
            <div className="relative h-full p-5 md:p-6 xl:p-7">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.25)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20 pointer-events-none"></div>
              <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col justify-center">
                <div className="text-xs font-mono tracking-[0.22em] text-blue-300 uppercase">{eyebrow}</div>
                <div className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{title}</div>
                <p className="mt-2 text-sm font-mono leading-relaxed text-blue-100/80 md:text-base">{description}</p>
                <div className="mt-6">{promoPanel}</div>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-col bg-[#04060b]">
            <div className="sticky top-0 z-20 flex justify-end bg-gradient-to-b from-[#04060b] via-[#04060b] to-transparent px-5 pt-5 pb-4 md:px-6 md:pt-6 xl:px-7 xl:pt-7">
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-blue-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 md:px-6 md:pb-6 xl:px-7 xl:pb-7">
              <div className="mx-auto w-full max-w-3xl py-2 md:py-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
