import { useState } from 'react';

export function ImageWithFallback({ src, alt, filename, className, style }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return (
      <div
        className={className}
        style={{
          background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a4a 50%, #4ecdc4 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          ...style,
        }}
        aria-label={alt}
        role="img"
      >
        <span style={{ color: '#f8f9fa', opacity: 0.5, fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', textAlign: 'center', padding: '0.5rem' }}>
          {filename || alt}
        </span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}
