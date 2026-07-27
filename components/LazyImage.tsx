import React, { useEffect, useRef, useState } from 'react';
import { useScrollRoot } from './ScrollRootContext';

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding'> {
  containerClassName?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  alt,
  className = '',
  containerClassName = '',
  onError,
  onLoad,
  priority = false,
  src,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollRootRef = useScrollRoot();
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [status, setStatus] = useState<'waiting' | 'loading' | 'loaded' | 'error'>(
    priority ? 'loading' : 'waiting',
  );

  useEffect(() => {
    setShouldLoad(priority);
    setStatus(priority ? 'loading' : 'waiting');
  }, [priority, src]);

  useEffect(() => {
    if (shouldLoad || priority) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scrollRoot = scrollRootRef?.current ?? null;
    const preloadDistance = 700;
    const imageBounds = container.getBoundingClientRect();
    const rootBounds = scrollRoot?.getBoundingClientRect() ?? {
      top: 0,
      bottom: window.innerHeight,
    };
    const isVerticallyNear =
      imageBounds.bottom >= rootBounds.top - preloadDistance &&
      imageBounds.top <= rootBounds.bottom + preloadDistance;

    if (isVerticallyNear) {
      setShouldLoad(true);
      setStatus('loading');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      setStatus('loading');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        setStatus('loading');
        observer.disconnect();
      },
      {
        root: scrollRoot,
        rootMargin: `${preloadDistance}px 0px`,
      },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [priority, scrollRootRef, shouldLoad, src]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const image = imageRef.current;
    if (!image?.complete) {
      return;
    }

    setStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
  }, [shouldLoad, src]);

  useEffect(() => {
    if (status !== 'loading') {
      return;
    }

    const timeout = window.setTimeout(() => setStatus('error'), 15000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <span ref={containerRef} className={`relative inline-grid overflow-hidden ${containerClassName}`}>
      {status === 'waiting' || status === 'loading' ? (
        <span
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-black/10"
          aria-hidden="true"
        >
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-blue-500" />
        </span>
      ) : null}
      {status === 'error' ? (
        <span className="absolute inset-0 grid place-items-center bg-black/20 px-3 text-center text-[10px] font-mono uppercase tracking-wider text-gray-500">
          Image unavailable
        </span>
      ) : null}
      <img
        {...props}
        ref={imageRef}
        src={shouldLoad ? src : undefined}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        style={{
          ...style,
          opacity: status === 'loaded' ? style?.opacity : 0,
        }}
        onLoad={(event) => {
          setStatus('loaded');
          onLoad?.(event);
        }}
        onError={(event) => {
          setStatus('error');
          onError?.(event);
        }}
        className={`${className} transition-opacity duration-300`}
      />
    </span>
  );
};
