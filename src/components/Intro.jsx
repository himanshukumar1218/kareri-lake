import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LETTERS = "Kareri Lake".split('');
const SESSION_KEY = 'kareri_intro_seen';

export function Intro({ onComplete, reducedMotion }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const lettersRef = useRef([]);
  const pathRef = useRef(null);
  const [done, setDone] = useState(false);

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    // Animate the curtain lift
    if (reducedMotion || !containerRef.current) {
      setDone(true);
      onComplete();
      return;
    }
    gsap.to(containerRef.current, {
      y: '-100%', duration: 1, ease: 'power2.inOut',
      onComplete: () => { setDone(true); onComplete(); }
    });
  };

  useEffect(() => {
    // Check session - if already seen, skip immediately
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDone(true);
      onComplete();
      return;
    }

    if (reducedMotion) {
      // Just show briefly then complete
      const t = setTimeout(finish, 1000);
      return () => clearTimeout(t);
    }

    const tl = gsap.timeline({ onComplete: finish });

    // Animate each letter in
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
      0.3
    );

    // Draw the mountain SVG path
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(pathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, 0.5);
    }

    // Counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 2934,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.val).toLocaleString() + ' m';
        }
      }
    }, 0.8);

    // Pause then lift
    tl.to({}, { duration: 1 });

    return () => tl.kill();
  }, [reducedMotion]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: '#0d1b2a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Skip button */}
      <button
        onClick={() => { gsap.killTweensOf('*'); finish(); }}
        aria-label="Skip intro"
        style={{
          position: 'absolute', top: 24, right: 24,
          background: 'none', border: '1px solid rgba(248,249,250,0.3)',
          color: '#f8f9fa', padding: '6px 16px', borderRadius: 20,
          fontSize: '0.8rem', fontFamily: 'Inter, sans-serif',
          cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}
      >
        Skip
      </button>

      {/* Title */}
      <div
        aria-label="Kareri Lake"
        style={{ display: 'flex', gap: '0.08em', marginBottom: '1rem' }}
      >
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 700,
              color: '#f8f9fa',
              opacity: 0,
              display: 'inline-block',
              whiteSpace: ch === ' ' ? 'pre' : 'normal',
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* SVG mountain ridge */}
      <svg
        viewBox="0 0 600 110"
        style={{ width: 'min(500px, 80vw)', height: 60, marginBottom: '1.5rem' }}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M 0 100 L 50 60 L 100 75 L 150 30 L 200 55 L 250 20 L 300 45 L 350 70 L 400 40 L 450 65 L 500 30 L 550 50 L 600 100"
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Altitude counter */}
      <div
        ref={counterRef}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: '#f4a94e',
          letterSpacing: '0.15em',
          fontWeight: 300,
        }}
      >
        0 m
      </div>
    </div>
  );
}
