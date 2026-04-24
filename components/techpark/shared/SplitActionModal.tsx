import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SplitActionModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title?: string;
  description?: string;
  promoPanel: React.ReactNode;
  children: React.ReactNode;
  mobileFooter?: React.ReactNode;
  mobileColumnOrder?: 'content-first' | 'promo-first';
}

export const SplitActionModal: React.FC<SplitActionModalProps> = ({
  open,
  onClose,
  eyebrow,
  title,
  description,
  promoPanel,
  children,
  mobileFooter,
  mobileColumnOrder = 'content-first',
}) => {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousWidth = document.body.style.width;
    const isMobile = window.innerWidth < 768;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    // Only apply position: fixed on mobile to prevent scroll issues on desktop
    if (isMobile) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.width = previousWidth;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  const promoPanelOrder = mobileColumnOrder === 'promo-first' ? 'order-1' : 'order-2';
  const contentPanelOrder = mobileColumnOrder === 'promo-first' ? 'order-2' : 'order-1';
  const mobileBottomNavOffset = 'calc(env(safe-area-inset-bottom) + 3rem)';
  const mobileFooterScrollPadding = 'calc(env(safe-area-inset-bottom) + 10rem)';

  return createPortal(
    <div className="fixed inset-0 z-[80] bg-black/88 backdrop-blur-md">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-[calc(env(safe-area-inset-right)+1rem)] top-[calc(env(safe-area-inset-top)+1rem)] z-[95] flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-gray-300 backdrop-blur-sm transition-colors hover:border-blue-500 hover:bg-black/45 hover:text-white"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="h-full overflow-y-auto md:overflow-y-hidden sm:pb-0"
        style={mobileFooter ? { paddingBottom: mobileFooterScrollPadding } : undefined}
      >
        <div className="min-h-full">
          <div className="w-full lg:h-screen">
            <div className="grid w-full bg-[#05070d] lg:h-full lg:overflow-hidden lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
              <div className={`${promoPanelOrder} relative border-b border-white/10 bg-gradient-to-br from-blue-900/45 via-[#07111f] to-black lg:order-1 lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r`}>
                <div className="relative p-5 md:p-6 xl:p-7 lg:h-full">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.25)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20"></div>
                  <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-center lg:h-full">
                    {eyebrow ? (
                      <div className="text-xs font-mono tracking-[0.22em] text-blue-300 uppercase">{eyebrow}</div>
                    ) : null}
                    {title ? (
                      <div className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{title}</div>
                    ) : null}
                    {description ? (
                      <p className="mt-2 text-sm font-mono leading-relaxed text-blue-100/80 md:text-base">{description}</p>
                    ) : null}
                    <div className="mt-6">{promoPanel}</div>
                  </div>
                </div>
              </div>

              <div className={`${contentPanelOrder} relative flex flex-col bg-[#04060b] lg:order-2 lg:min-h-0`}>
                <div className="px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6 xl:px-7 xl:pb-7 xl:pt-7 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
                  <div className="mx-auto w-full max-w-3xl pb-2 lg:flex lg:min-h-full lg:items-center">
                    <div className="w-full">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mobileFooter ? (
        <div
          className="fixed inset-x-0 z-[90] border-t border-white/10 bg-[#04060b]/95 px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] backdrop-blur-md sm:hidden"
          style={{ bottom: mobileBottomNavOffset }}
        >
          {mobileFooter}
        </div>
      ) : null}
    </div>,
    document.body
  );
};
