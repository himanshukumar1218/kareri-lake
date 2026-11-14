import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

// Film grain via inline SVG filter
const GrainOverlay = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: 0.04,
      mixBlendMode: 'overlay',
    }}
  />
);

export function Hero({ trip, reducedMotion }) {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  // Parallax on hero background
  useEffect(() => {
    if (reducedMotion || !bgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      {/* Full-screen hero */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100svh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Kareri Lake — hero section"
      >
        {/* Background image with parallax */}
        <div ref={bgRef} style={{ position: 'absolute', inset: '-10% 0', zIndex: 0 }}>
          <ImageWithFallback
            src="/images/lake/lake-1.jpg"
            alt="Kareri Lake panorama"
            filename="lake-1.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: reducedMotion ? 'none' : 'kenBurns 20s ease-in-out infinite alternate',
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(13,27,42,0.55) 0%, rgba(13,27,42,0.3) 50%, rgba(13,27,42,0.9) 100%)',
            }}
          />
        </div>

        <GrainOverlay />

        {/* Mist layer */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
              background: 'linear-gradient(90deg, transparent 0%, rgba(248,249,250,0.05) 30%, transparent 60%)',
              animation: 'mistDrift 14s ease-in-out infinite alternate',
            }}
          />
        )}

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', padding: '0 1.5rem', maxWidth: 840 }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#4ecdc4',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            Himachal Pradesh · 2,934 m
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              color: '#f8f9fa',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {trip.tagline}
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              color: 'rgba(248,249,250,0.9)',
              marginBottom: '2.5rem',
              maxWidth: 620,
              margin: '0 auto 2.5rem',
              lineHeight: 1.5,
            }}
          >
            {trip.hookLine}
          </p>

          {/* Scroll cue */}
          <div
            aria-label="Scroll down"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              animation: reducedMotion ? 'none' : 'scrollBounce 2s ease-in-out infinite',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'rgba(248,249,250,0.6)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Explore The Lake
            </span>
            <svg width="18" height="26" viewBox="0 0 16 24" aria-hidden="true" fill="none" stroke="#4ecdc4" strokeWidth="2">
              <path d="M8 0 L8 20 M2 14 L8 20 L14 14" />
            </svg>
          </div>
        </div>
      </section>

      {/* Global keyframe animations */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.09); }
        }
        @keyframes mistDrift {
          from { transform: translateX(-15%); }
          to { transform: translateX(15%); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </>
  );
}
