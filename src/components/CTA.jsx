import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function launchConfetti() {
  const colors = ['#4ecdc4', '#f4a94e', '#f8f9fa', '#22c55e', '#a78bfa'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 10;
    dot.style.cssText = `
      position:absolute;bottom:0;left:${Math.random() * 100}%;
      width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      background:${color};
      animation:ctaConfetti ${1.5 + Math.random()}s ease-out ${Math.random() * 0.4}s forwards;
    `;
    container.appendChild(dot);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes ctaConfetti { 0% { transform: translateY(0) rotate(0deg); opacity:1; } 100% { transform: translateY(-${Math.round(window.innerHeight * 0.85)}px) rotate(720deg); opacity:0; } }`;
  document.head.appendChild(style);
  setTimeout(() => {
    if (document.body.contains(container)) document.body.removeChild(container);
    if (document.head.contains(style)) document.head.removeChild(style);
  }, 3000);
}

function useCountdown(dateStr) {
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    const target = new Date(dateStr).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [dateStr]);
  return timeLeft;
}

// Global reference to ensure strictly ONE audio can play at any given moment
let globalActiveAudio = null;

function stopGlobalAudio() {
  if (globalActiveAudio) {
    try {
      globalActiveAudio.pause();
      globalActiveAudio.currentTime = 0;
    } catch {}
    globalActiveAudio = null;
  }
}

export function CTA({ trip, reducedMotion }) {
  const [decision, setDecision] = useState(null); // 'in' | 'out' | null
  const timeLeft = useCountdown(trip.tripDate);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopGlobalAudio();
    };
  }, []);

  // Audio player helper guaranteeing only one audio track plays at a time
  const playSound = (type) => {
    try {
      // 1. Immediately stop any active audio
      stopGlobalAudio();

      const configured = type === 'in' ? trip.audioIn : trip.audioOut;
      const baseFile = configured || (type === 'in' ? 'audio1.mp3' : 'audio2.mp3');
      const directPath = baseFile.startsWith('/') ? baseFile : `/audio/${baseFile}`;

      const audio = new Audio(directPath);
      globalActiveAudio = audio;

      audio.onended = () => {
        if (globalActiveAudio === audio) {
          globalActiveAudio = null;
        }
      };

      audio.play().catch(() => {
        // Fallback: try alternate extensions sequentially if primary fails, never overlapping
        const baseName = type === 'in' ? 'audio1' : 'audio2';
        const alternates = ['.mp3', '.wav', '.m4a', '.ogg'];
        let tried = false;

        for (const ext of alternates) {
          if (directPath.endsWith(ext)) continue;
          if (tried) break;
          tried = true;

          const altAudio = new Audio(`/audio/${baseName}${ext}`);
          if (globalActiveAudio === audio) {
            globalActiveAudio = altAudio;
            altAudio.onended = () => {
              if (globalActiveAudio === altAudio) globalActiveAudio = null;
            };
            altAudio.play().catch(() => {});
          }
        }
      });
    } catch {
      // Audio playback fails silently if files are not yet added
    }
  };

  const handleIn = () => {
    setDecision('in');
    playSound('in');
    if (!reducedMotion) launchConfetti();
  };

  const handleOut = () => {
    setDecision('out');
    playSound('out');
  };

  return (
    <section
      aria-label="Join or leave the trek"
      style={{
        background: '#0d1b2a',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background mountain silhouette */}
      <svg
        viewBox="0 0 1200 200"
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: 0.08 }}
        preserveAspectRatio="xMidYMax meet"
      >
        <path
          d="M0 200 L0 160 L80 100 L160 140 L240 70 L320 110 L400 50 L480 90 L560 30 L640 80 L720 20 L800 65 L880 110 L960 60 L1040 100 L1120 70 L1200 110 L1200 200 Z"
          fill="#4ecdc4"
        />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
        {/* Label */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#4ecdc4',
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}
        >
          Decision Time
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 900,
            color: '#f8f9fa',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          {trip.ctaHeadline}
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(248,249,250,0.7)',
            marginBottom: '2.5rem',
            lineHeight: 1.5,
          }}
        >
          {trip.ctaSubline}
        </p>

        {/* Countdown */}
        {timeLeft ? (
          <div style={{ marginBottom: '2.5rem' }}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(248,249,250,0.4)',
                marginBottom: '0.75rem',
              }}
            >
              Time until departure
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                ['Days', timeLeft.d],
                ['Hours', timeLeft.h],
                ['Min', timeLeft.m],
                ['Sec', timeLeft.s],
              ].map(([label, val]) => (
                <div key={label} style={{ textAlign: 'center', minWidth: 56 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#f4a94e',
                      lineHeight: 1,
                    }}
                  >
                    {String(val).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'rgba(248,249,250,0.4)',
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#f4a94e', marginBottom: '2.5rem', fontSize: '1rem' }}>
            The adventure awaits. See you at 2,934 m.
          </p>
        )}

        {/* CTA Buttons: "I'm in" vs "I'm out" */}
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* ── Button 1: "I'm in" ── */}
          <motion.button
            onClick={handleIn}
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            aria-label="I am in"
            style={{
              background: decision === 'in' ? '#22c55e' : '#4ecdc4',
              color: '#0d1b2a',
              border: 'none',
              padding: '0.9rem 2.25rem',
              borderRadius: 40,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: 150,
              boxShadow: decision === 'in' ? '0 0 25px rgba(34, 197, 94, 0.5)' : '0 4px 15px rgba(78, 205, 196, 0.3)',
            }}
          >
            {decision === 'in' ? "✓ You're in! 🎉" : "I'm in"}
          </motion.button>

          {/* ── Button 2: "I'm out" ── */}
          <motion.button
            onClick={handleOut}
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
            aria-label="I am out"
            style={{
              background: decision === 'out' ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
              color: decision === 'out' ? '#ffffff' : '#ef4444',
              border: '1.5px solid #ef4444',
              padding: '0.9rem 2.25rem',
              borderRadius: 40,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: 150,
              boxShadow: decision === 'out' ? '0 0 25px rgba(239, 68, 68, 0.5)' : 'none',
            }}
          >
            {decision === 'out' ? "❌ You're out." : "I'm out"}
          </motion.button>
        </div>

        {/* Reaction Subtext based on decision */}
        <div style={{ minHeight: 32, marginTop: '1.25rem' }}>
          {decision === 'in' && (
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#22c55e',
                fontSize: '0.95rem',
                margin: 0,
                fontWeight: 600,
                animation: 'fadeSlideUp 0.3s ease',
              }}
            >
              Pack your backpack. The glacier doesn't wait! 🏔️✨
            </p>
          )}
          {decision === 'out' && (
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#ef4444',
                fontSize: '0.95rem',
                margin: 0,
                fontWeight: 600,
                animation: 'fadeSlideUp 0.3s ease',
              }}
            >
              🤡 Dignity preserved. We'll send photos from 2,934 m!
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
