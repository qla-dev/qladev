import React, { useEffect, useState } from 'react';

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
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <span className={`relative inline-grid overflow-hidden ${containerClassName}`}>
      {status === 'loading' ? (
        <span
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-black/10"
          aria-hidden="true"
        >
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-blue-500" />
        </span>
      ) : null}
      <img
        {...props}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        style={{
          ...style,
          opacity: status === 'loading' ? 0 : style?.opacity,
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
