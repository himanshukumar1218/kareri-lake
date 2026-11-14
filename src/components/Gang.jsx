import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// 1. Layered Environmental Scenes (Full-screen background + Mid props + Foreground)
// ─────────────────────────────────────────────────────────────────────────────
function PersonThemeEnvironment({ theme, person, reducedMotion }) {
  const bgImg = `/images/people-bg/${person.slug}.jpg`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* ── Layer 1: Optional Custom Image Backdrop ── */}
      <img
        src={bgImg}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.18,
          filter: 'blur(4px)',
        }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* ── Layer 1b: Full-bleed Atmospheric Gradient per theme ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            theme === 'complaint'
              ? 'radial-gradient(ellipse at 50% 15%, rgba(28, 51, 72, 0.7) 0%, #0d1b2a 75%)'
              : theme === 'motivation'
              ? 'radial-gradient(ellipse at 70% 25%, rgba(22, 67, 77, 0.7) 0%, #0d1b2a 75%)'
              : theme === 'tatti'
              ? 'radial-gradient(ellipse at 35% 85%, rgba(21, 59, 59, 0.7) 0%, #0d1b2a 75%)'
              : theme === 'tickets'
              ? 'radial-gradient(ellipse at 50% 90%, rgba(32, 53, 69, 0.7) 0%, #0d1b2a 75%)'
              : theme === 'planner'
              ? 'radial-gradient(ellipse at 50% 40%, rgba(21, 56, 68, 0.7) 0%, #0d1b2a 75%)'
              : theme === 'snack'
              ? 'radial-gradient(ellipse at 60% 30%, rgba(40, 55, 63, 0.7) 0%, #0d1b2a 75%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(26, 58, 74, 0.5) 0%, #0d1b2a 80%)',
        }}
      />

      {/* ── Layer 2: Mid-layer Thematic Props (Spread across the whole screen) ── */}
      {theme === 'complaint' && (
        <>
          {/* Top-Left: Storm cloud with falling raindrops */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              left: 'clamp(4%, 8%, 15%)',
              opacity: 0.85,
              animation: reducedMotion ? 'none' : 'cloudFloat 7s ease-in-out infinite alternate',
            }}
          >
            <svg width="150" height="75" viewBox="0 0 180 90" fill="none">
              <path
                d="M30 70 A25 25 0 0 1 65 40 A35 35 0 0 1 125 35 A30 30 0 0 1 160 70 Z"
                fill="#1a3a4a"
                stroke="#4ecdc4"
                strokeWidth="2"
              />
            </svg>
            {!reducedMotion && (
              <div style={{ display: 'flex', justifyContent: 'space-around', width: 120, margin: '0 auto' }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 2,
                      height: 12,
                      background: '#4ecdc4',
                      borderRadius: 2,
                      animation: `rainDrop 1.1s linear infinite ${i * 0.28}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Top-Right: Miniature sad violin with musical notes */}
          <div
            style={{
              position: 'absolute',
              top: '7%',
              right: 'clamp(4%, 10%, 18%)',
              opacity: 0.75,
              animation: reducedMotion ? 'none' : 'violinFloat 5s ease-in-out infinite alternate',
            }}
          >
            <svg width="65" height="85" viewBox="0 0 60 80" fill="none" stroke="#f4a94e" strokeWidth="1.5">
              <path d="M25 10 C20 18 15 25 15 35 C15 45 22 48 20 55 C18 62 23 70 30 70 C37 70 42 62 40 55 C38 48 45 45 45 35 C45 25 40 18 35 10 Z" />
              <line x1="30" y1="5" x2="30" y2="72" stroke="#f8f9fa" strokeWidth="1" />
              <circle cx="30" cy="40" r="3" fill="#f4a94e" />
            </svg>
            <span style={{ position: 'absolute', top: -10, left: -6, color: '#f4a94e', fontSize: 14 }}>♪</span>
            <span style={{ position: 'absolute', top: 10, right: -8, color: '#4ecdc4', fontSize: 16 }}>♫</span>
          </div>

          {/* Bottom-Left: Knee negotiation alert badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: 'clamp(4%, 8%, 14%)',
              background: 'rgba(26,58,74,0.7)',
              border: '1px solid #f4a94e',
              padding: '4px 10px',
              borderRadius: 6,
              color: '#f4a94e',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              transform: 'rotate(-5deg)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            }}
          >
            ⚠️ KM 3 KNEE NEGOTIATION
          </div>

          {/* Bottom-Right: Ice pack doodle */}
          <div
            style={{
              position: 'absolute',
              bottom: '14%',
              right: 'clamp(4%, 8%, 15%)',
              opacity: 0.5,
              transform: 'rotate(8deg)',
            }}
          >
            <svg width="45" height="45" viewBox="0 0 40 40" fill="none" stroke="#4ecdc4" strokeWidth="1.5">
              <rect x="8" y="8" width="24" height="24" rx="6" />
              <line x1="20" y1="12" x2="20" y2="28" />
              <line x1="12" y1="20" x2="28" y2="20" />
            </svg>
          </div>
        </>
      )}

      {theme === 'motivation' && (
        <>
          {/* Wind streak streams across screen */}
          {[14, 32, 60, 80].map((topPct, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${topPct}%`,
                left: '-20%',
                width: '140%',
                height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(78,205,196,0.35), transparent)',
                animation: reducedMotion ? 'none' : `windFlow ${3 + i * 0.7}s linear infinite`,
              }}
            />
          ))}

          {/* Top-Right: Megaphone with soundwaves */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              right: 'clamp(4%, 10%, 18%)',
              opacity: 0.75,
              transform: 'rotate(-8deg)',
            }}
          >
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="#f4a94e" strokeWidth="1.6">
              <path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2z" />
              <path d="M16 9a4 4 0 0 1 0 6" />
              <path d="M19 6a8 8 0 0 1 0 12" />
            </svg>
          </div>

          {/* Top-Left: Floating energy bolt */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              left: 'clamp(4%, 9%, 16%)',
              animation: reducedMotion ? 'none' : 'floatSlow 4s ease-in-out infinite',
            }}
          >
            <svg width="36" height="48" viewBox="0 0 24 32" fill="#4ecdc4">
              <polygon points="13,0 4,16 11,16 7,32 20,12 13,12" />
            </svg>
          </div>

          {/* Bottom-Right: "Bas 200m aur" badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              right: 'clamp(4%, 8%, 15%)',
              background: 'rgba(26,58,74,0.7)',
              border: '1px solid #4ecdc4',
              padding: '4px 10px',
              borderRadius: 6,
              color: '#4ecdc4',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              transform: 'rotate(6deg)',
            }}
          >
            ⚡ "BAS 200 METER AUR!"
          </div>
        </>
      )}

      {theme === 'tatti' && (
        <>
          {/* Top-Right: Unspooling toilet roll */}
          <div
            style={{
              position: 'absolute',
              top: '6%',
              right: 'clamp(4%, 10%, 18%)',
              animation: reducedMotion ? 'none' : 'floatSlow 4.5s ease-in-out infinite alternate',
              opacity: 0.85,
            }}
          >
            <svg width="75" height="75" viewBox="0 0 100 100" fill="none" stroke="#f8f9fa" strokeWidth="2">
              <ellipse cx="70" cy="30" rx="14" ry="22" />
              <path d="M70 8 L30 18 L30 62 L70 52" fill="rgba(248,249,250,0.08)" />
              <path d="M30 62 Q45 78 20 90" strokeDasharray="3 3" stroke="#f4a94e" />
            </svg>
          </div>

          {/* Bottom-Left: Pine tree silhouettes */}
          <div style={{ position: 'absolute', bottom: '10%', left: 'clamp(2%, 6%, 12%)', opacity: 0.25 }}>
            <svg width="90" height="150" viewBox="0 0 100 160" fill="#4ecdc4">
              <polygon points="50,10 20,60 80,60" />
              <polygon points="50,45 15,100 85,100" />
              <polygon points="50,85 10,140 90,140" />
              <rect x="44" y="140" width="12" height="20" fill="#1a3a4a" />
            </svg>
          </div>

          {/* Bottom-Right: Emergency Bush Scout badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              right: 'clamp(4%, 8%, 15%)',
              background: 'rgba(244,169,78,0.15)',
              border: '1px solid #f4a94e',
              padding: '4px 10px',
              borderRadius: 6,
              color: '#f4a94e',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              transform: 'rotate(4deg)',
            }}
          >
            🧻 EMERGENCY BUSH SCOUT
          </div>
        </>
      )}

      {theme === 'tickets' && (
        <>
          {/* Bottom tracks perspective */}
          <svg
            style={{ position: 'absolute', bottom: 0, left: '15%', width: '70%', height: '30%', opacity: 0.18 }}
            viewBox="0 0 300 120"
            preserveAspectRatio="none"
          >
            <line x1="150" y1="0" x2="20" y2="120" stroke="#4ecdc4" strokeWidth="2" />
            <line x1="150" y1="0" x2="280" y2="120" stroke="#4ecdc4" strokeWidth="2" />
            {[25, 50, 80, 110].map((y) => (
              <line key={y} x1={150 - y * 1} y1={y} x2={150 + y * 1} y2={y} stroke="#f8f9fa" strokeWidth="1.5" />
            ))}
          </svg>

          {/* Top-Right: IRCTC RAC Ticket Stub */}
          <div
            style={{
              position: 'absolute',
              top: '7%',
              right: 'clamp(4%, 9%, 16%)',
              background: 'rgba(26,58,74,0.85)',
              border: '1px dashed #f4a94e',
              padding: '6px 10px',
              borderRadius: 6,
              color: '#f8f9fa',
              fontFamily: 'monospace',
              fontSize: '0.62rem',
              transform: 'rotate(6deg)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ color: '#f4a94e', fontWeight: 'bold' }}>IRCTC / TATKAL</div>
            <div>STATUS: RAC 12 → CNF?</div>
          </div>

          {/* Top-Left: Station clock */}
          <div style={{ position: 'absolute', top: '7%', left: 'clamp(4%, 8%, 15%)', opacity: 0.6 }}>
            <svg width="45" height="45" viewBox="0 0 60 60" fill="none" stroke="#4ecdc4" strokeWidth="2">
              <circle cx="30" cy="30" r="26" />
              <line x1="30" y1="30" x2="30" y2="16" strokeWidth="2.5" />
              <line x1="30" y1="30" x2="42" y2="30" strokeWidth="2" />
            </svg>
          </div>
        </>
      )}

      {theme === 'planner' && (
        <>
          {/* Topographic contour lines */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.16 }}
            viewBox="0 0 800 600"
            fill="none"
            stroke="#4ecdc4"
            strokeWidth="1.2"
          >
            <path d="M50 140 Q220 70 420 150 T760 190" />
            <path d="M30 240 Q240 170 440 260 T790 290" />
            <path d="M70 370 Q270 280 500 380 T740 410" />
            <path d="M40 490 Q320 410 540 500 T800 520" />
          </svg>

          {/* Top-Right: Rotating Compass */}
          <div
            style={{
              position: 'absolute',
              top: '7%',
              right: 'clamp(4%, 9%, 17%)',
              opacity: 0.7,
              animation: reducedMotion ? 'none' : 'spinSlow 35s linear infinite',
            }}
          >
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" stroke="#f4a94e" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="50,10 57,45 50,42 43,45" fill="#f4a94e" />
              <polygon points="50,90 57,55 50,58 43,55" fill="#4ecdc4" />
            </svg>
          </div>

          {/* Bottom-Left: Clown Itinerary Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              left: 'clamp(4%, 8%, 15%)',
              background: 'rgba(26,58,74,0.75)',
              border: '1px solid #4ecdc4',
              padding: '4px 10px',
              borderRadius: 14,
              color: '#f8f9fa',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transform: 'rotate(-4deg)',
            }}
          >
            <span>🤡</span> 14-PAGE PDF (UNREAD)
          </div>
        </>
      )}

      {theme === 'snack' && (
        <>
          {/* Top-Left: Steaming momos */}
          <div
            style={{
              position: 'absolute',
              top: '7%',
              left: 'clamp(4%, 9%, 16%)',
              opacity: 0.8,
              transform: 'rotate(-6deg)',
            }}
          >
            <svg width="55" height="40" viewBox="0 0 70 50" fill="none">
              <path
                d="M10 40 Q35 10 60 40 Q35 48 10 40 Z"
                fill="rgba(244,169,78,0.25)"
                stroke="#f4a94e"
                strokeWidth="2"
              />
              <path d="M25 35 Q35 22 45 35" stroke="#f4a94e" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Top-Right: Steam swirls */}
          <div
            style={{
              position: 'absolute',
              top: '7%',
              right: 'clamp(4%, 9%, 17%)',
              animation: reducedMotion ? 'none' : 'floatSlow 4s ease-in-out infinite',
            }}
          >
            <svg width="50" height="60" viewBox="0 0 60 80" fill="none" stroke="#f4a94e" strokeWidth="2">
              <path d="M20 65 Q10 40 25 25 T20 5" />
              <path d="M38 65 Q28 40 43 25 T38 5" />
            </svg>
          </div>

          {/* Bottom-Right: 4 KG Snacks badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              right: 'clamp(4%, 8%, 15%)',
              background: 'rgba(26,58,74,0.8)',
              border: '1px solid #f4a94e',
              padding: '4px 10px',
              borderRadius: 14,
              color: '#f4a94e',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              transform: 'rotate(5deg)',
            }}
          >
            🥟 4 KG EMERGENCY SNACKS
          </div>
        </>
      )}

      {(!theme || theme === 'sleep') && (
        <>
          <div style={{ position: 'absolute', right: '12%', top: '10%', opacity: 0.7 }}>
            <svg width="45" height="45" viewBox="0 0 50 50" fill="#f4a94e">
              <path d="M25 5 A20 20 0 1 0 45 35 A16 16 0 1 1 25 5 Z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Photo Sticker Component (Supports Cutout PNG or Head & Shoulders Crop)
// ─────────────────────────────────────────────────────────────────────────────
function PersonHeroPhoto({ person, isSlideActive, rotation }) {
  const [hasCutout, setHasCutout] = useState(false);
  const [cutoutTested, setCutoutTested] = useState(false);

  // Check if cutout PNG exists
  useEffect(() => {
    const cutoutImg = new Image();
    cutoutImg.src = `/images/people-cutout/${person.slug}.png`;
    cutoutImg.onload = () => {
      setHasCutout(true);
      setCutoutTested(true);
    };
    cutoutImg.onerror = () => {
      setHasCutout(false);
      setCutoutTested(true);
    };
  }, [person.slug]);

  const photoSrc = person.photo ? `/images/people/${person.photo}` : `/images/people/${person.slug}.jpeg`;
  const focusPosition = person.focus || '50% 15%';

  return (
    <div
      className="person-hero-photo-wrap"
      style={{
        position: 'relative',
        transform: isSlideActive ? `scale(1) rotate(${rotation})` : 'scale(0.9) rotate(0deg)',
        transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 15,
      }}
    >
      {/* If cutout PNG is available, render transparent cutout with sticker outline */}
      {hasCutout ? (
        <div
          className="person-sticker-frame"
          style={{
            width: 'clamp(210px, 72vw, 320px)',
            height: 'clamp(220px, 42svh, 340px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter:
              'drop-shadow(0 0 0 4px #ffffff) drop-shadow(0 0 0 7px rgba(255,255,255,0.25)) drop-shadow(0 20px 35px rgba(0,0,0,0.7))',
          }}
        >
          <img
            src={`/images/people-cutout/${person.slug}.png`}
            alt={person.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      ) : (
        /* Otherwise: Head & shoulders cropped photo with thick white sticker frame */
        <div
          className="person-sticker-frame"
          style={{
            width: 'clamp(210px, 72vw, 320px)',
            height: 'clamp(220px, 42svh, 340px)',
            borderRadius: 22,
            background: '#ffffff',
            padding: 5,
            boxShadow: '0 20px 45px rgba(0,0,0,0.7), 0 0 25px rgba(78,205,196,0.2)',
            overflow: 'hidden',
          }}
        >
          <ImageWithFallback
            src={photoSrc}
            alt={person.name}
            filename={`${person.slug}.jpg`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: focusPosition,
              borderRadius: 17,
              display: 'block',
            }}
          />
        </div>
      )}

      {/* ── Layer 3: Foreground Thematic Accent (Sits in front of photo edge for depth) ── */}
      {person.theme === 'snack' && (
        <div
          style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            background: '#f4a94e',
            color: '#0d1b2a',
            padding: '4px 10px',
            borderRadius: 14,
            fontSize: '0.65rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
            transform: 'rotate(-8deg)',
          }}
        >
          🥟 SNACK BOSS
        </div>
      )}
      {person.theme === 'complaint' && (
        <div
          style={{
            position: 'absolute',
            bottom: -8,
            left: -8,
            background: '#ef4444',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 14,
            fontSize: '0.65rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
            transform: 'rotate(6deg)',
          }}
        >
          🩹 KNEE ALERT
        </div>
      )}
      {person.theme === 'tickets' && (
        <div
          style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            background: '#4ecdc4',
            color: '#0d1b2a',
            padding: '4px 10px',
            borderRadius: 14,
            fontSize: '0.65rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
            transform: 'rotate(-5deg)',
          }}
        >
          🎫 CNF GUARANTEED
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Main Full-Screen People Slideshow Component
// ─────────────────────────────────────────────────────────────────────────────
export function Gang({ trip, reducedMotion }) {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const people = trip.people || [];
  // Total slides = 1 slide per person + 1 grand finale group slide
  const totalSlides = people.length + 1;

  // Touch swipe support
  const touchStart = useRef({ x: 0, y: 0 });

  const goToSlide = useCallback(
    (index) => {
      const targetIdx = Math.max(0, Math.min(totalSlides - 1, index));
      if (!containerRef.current) return;
      const st = ScrollTrigger.getById('gang-slides-pin');
      if (st) {
        const scrollRange = st.end - st.start;
        const targetPos = st.start + (targetIdx / (totalSlides - 1)) * scrollRange;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    },
    [totalSlides]
  );

  // GSAP Pinned Slideshow Timeline
  useEffect(() => {
    if (reducedMotion || totalSlides <= 1) return;

    const ctx = gsap.context(() => {
      const slideNodes = gsap.utils.toArray('.person-slide-item');

      gsap.set(slideNodes, { autoAlpha: 0, scale: 0.96 });
      gsap.set(slideNodes[0], { autoAlpha: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'gang-slides-pin',
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinWrapperRef.current,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const rawIdx = p * (totalSlides - 1);
            const idx = Math.min(totalSlides - 1, Math.round(rawIdx));
            setActiveIndex(idx);
          },
        },
      });

      // Transitions between slides
      for (let i = 0; i < totalSlides - 1; i++) {
        const curr = slideNodes[i];
        const next = slideNodes[i + 1];

        tl.to(curr, { autoAlpha: 0, scale: 0.94, duration: 0.7, ease: 'power2.inOut' }, `p-${i}`)
          .to(next, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, `p-${i}+=0.2`);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [totalSlides, reducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToSlide(activeIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToSlide(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, goToSlide]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dy) > 50 || Math.abs(dx) > 50) {
      if (dy < -50 || dx < -50) {
        goToSlide(activeIndex + 1);
      } else if (dy > 50 || dx > 50) {
        goToSlide(activeIndex - 1);
      }
    }
  };

  // Helper for image path
  const getPersonPhotoSrc = (p) => {
    if (p.photo) return `/images/people/${p.photo}`;
    return `/images/people/${p.slug}.jpeg`;
  };

  // Reduced motion: Clean stacked sections
  if (reducedMotion) {
    return (
      <section aria-label="Meet the Gang" style={{ background: '#0d1b2a', padding: '4rem 1.5rem' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: '#f8f9fa',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          Meet the Gang
        </h2>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {people.map((person) => (
            <article
              key={person.slug}
              style={{
                background: '#1a3a4a',
                borderRadius: 16,
                padding: '1.5rem',
                border: '1px solid rgba(78,205,196,0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
              }}
            >
              <ImageWithFallback
                src={getPersonPhotoSrc(person)}
                alt={person.name}
                filename={`${person.slug}.jpg`}
                style={{
                  width: 160,
                  height: 180,
                  borderRadius: 16,
                  objectFit: 'cover',
                  objectPosition: person.focus || '50% 15%',
                  border: '4px solid #fff',
                }}
              />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#f8f9fa', margin: 0 }}>
                {person.name}
              </h3>
              <p style={{ color: '#4ecdc4', margin: 0, fontWeight: 600 }}>{person.role}</p>
              <p style={{ color: '#f4a94e', fontStyle: 'italic', margin: 0 }}>"{person.roast}"</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Scroll height calculation: totalSlides * 100vh
  const totalContainerHeight = `${totalSlides * 100}vh`;

  return (
    <>
      <section
        ref={containerRef}
        style={{
          position: 'relative',
          height: totalContainerHeight,
          background: '#0d1b2a',
        }}
        aria-label="Meet the gang slideshow"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pinned Viewport (100svh prevents mobile address bar shifts) */}
        <div
          ref={pinWrapperRef}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100svh',
            overflow: 'hidden',
          }}
        >
          {/* Top Section Header Tag */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(0.75rem, 2.5vh, 1.5rem)',
              left: 'clamp(1rem, 4vw, 2.5rem)',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#4ecdc4',
                fontWeight: 600,
                background: 'rgba(26,58,74,0.75)',
                padding: '4px 12px',
                borderRadius: 20,
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(78,205,196,0.3)',
              }}
            >
              The Crew ·{' '}
              {activeIndex < people.length
                ? `Person ${String(activeIndex + 1).padStart(2, '0')} of ${String(people.length).padStart(2, '0')}`
                : 'Full Gang'}
            </span>
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* SLIDES: 1 per person with Unified Centered Composition */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {people.map((person, index) => {
            const isSlideActive = activeIndex === index;
            const odds = person.survivalOdds ?? 70;
            const oddsColor = odds > 80 ? '#22c55e' : odds >= 60 ? '#f4a94e' : '#ef4444';
            const stickerRotation = index % 2 === 0 ? '-2.5deg' : '2.5deg';

            return (
              <div
                key={person.slug}
                className="person-slide-item"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'clamp(3rem, 6vh, 4rem) 16px 88px', // leaves 88px at bottom for avatars
                  boxSizing: 'border-box',
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${person.name} — ${person.role}`}
              >
                {/* Layer 1 & 2: Full-screen Environment Scene */}
                <PersonThemeEnvironment
                  theme={person.theme}
                  person={person}
                  reducedMotion={reducedMotion}
                />

                {/* ── Content Container (Strict 8px Spacing Scale, Centered Alignment) ── */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    maxWidth: 480,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 8, // 8px scale
                  }}
                >
                  {/* ── Speech Bubble: STRICTLY ABOVE PHOTO, Tail Points Down (Never Covers Face) ── */}
                  {person.quote && (
                    <div
                      style={{
                        position: 'relative',
                        background: 'rgba(26,58,74,0.92)',
                        backdropFilter: 'blur(10px)',
                        border: '1.5px solid rgba(78,205,196,0.35)',
                        borderRadius: 14,
                        padding: '6px 14px',
                        color: '#f8f9fa',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(0.72rem, 2vw, 0.85rem)',
                        lineHeight: 1.35,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                        maxWidth: 'min(90vw, 360px)',
                        margin: '0 auto 4px',
                        transform: isSlideActive ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
                        opacity: isSlideActive ? 1 : 0,
                        transition: 'all 0.45s ease 0.2s',
                      }}
                    >
                      <span style={{ color: '#f4a94e', fontWeight: 700 }}>“</span>
                      {person.quote}
                      <span style={{ color: '#f4a94e', fontWeight: 700 }}>”</span>
                      {/* Pointer tail pointing down towards the head */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: -6,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderTop: '6px solid rgba(26,58,74,0.92)',
                        }}
                      />
                    </div>
                  )}

                  {/* ── Hero Photo: ~72vw width, ~42svh height on mobile, head & shoulders crop ── */}
                  <PersonHeroPhoto
                    person={person}
                    isSlideActive={isSlideActive}
                    rotation={stickerRotation}
                  />

                  {/* ── Text Stack: Name (Largest) -> Role -> Roast ── */}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      marginTop: 4,
                    }}
                  >
                    {/* 1. Name: Largest Display Type */}
                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.75rem, 5.5vw, 2.75rem)',
                        fontWeight: 900,
                        color: '#f8f9fa',
                        lineHeight: 1.15,
                        margin: 0,
                        textShadow: '0 3px 15px rgba(0,0,0,0.7)',
                      }}
                    >
                      {person.name}
                    </h2>

                    {/* 2. Role: Tag in Glacial Teal */}
                    <span
                      style={{
                        background: 'rgba(78,205,196,0.15)',
                        border: '1px solid rgba(78,205,196,0.4)',
                        color: '#4ecdc4',
                        padding: '2px 10px',
                        borderRadius: 12,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(0.68rem, 1.8vw, 0.75rem)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {person.role}
                    </span>

                    {/* 3. Roast: Typewriter Accent with Blinking Cursor */}
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: 'italic',
                        fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)',
                        color: '#f4a94e',
                        margin: '2px 0 0',
                        lineHeight: 1.35,
                        maxWidth: 420,
                      }}
                    >
                      "{person.roast}"
                      <span
                        style={{
                          display: 'inline-block',
                          width: 2,
                          height: '0.9em',
                          background: '#f4a94e',
                          marginLeft: 4,
                          animation: 'blinkCursor 0.9s infinite',
                          verticalAlign: 'middle',
                        }}
                      />
                    </p>
                  </div>

                  {/* ── Compact Card: Combined Survival Odds + Biggest Fear ── */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 380,
                      background: 'rgba(26,58,74,0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(78,205,196,0.25)',
                      borderRadius: 10,
                      padding: '6px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      marginTop: 2,
                      boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Odds Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.62rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(248,249,250,0.65)',
                          flexShrink: 0,
                        }}
                      >
                        Survival
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 6,
                          background: 'rgba(248,249,250,0.12)',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: isSlideActive ? `${odds}%` : '0%',
                            background: oddsColor,
                            borderRadius: 3,
                            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: oddsColor,
                          flexShrink: 0,
                        }}
                      >
                        {odds}%
                      </span>
                    </div>

                    {/* Fear Row */}
                    {person.biggestFear && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '0.72rem',
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(248,249,250,0.85)',
                          lineHeight: 1.25,
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ flexShrink: 0, fontSize: '0.8rem' }}>😱</span>
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <strong style={{ color: '#ef4444' }}>Fear:</strong> {person.biggestFear}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* FINAL SLIDE: "That's the Gang" Group Finale */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div
            className="person-slide-item"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(2rem, 5vh, 4rem) 16px 88px',
              textAlign: 'center',
              zIndex: 10,
              boxSizing: 'border-box',
            }}
            role="group"
            aria-roledescription="slide"
            aria-label="That's the gang — full crew collage"
          >
            {/* Background Glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(78,205,196,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#4ecdc4',
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}
            >
              Ready for the climb
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 6.5vw, 4.5rem)',
                fontWeight: 900,
                color: '#f8f9fa',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}
            >
              That's the Gang.
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.85rem, 2.2vw, 1.15rem)',
                color: 'rgba(248,249,250,0.7)',
                maxWidth: 480,
                marginBottom: '1.25rem',
                lineHeight: 1.4,
              }}
            >
              {people.length} brave souls, 1 mountain, 0 common sense. See the full route below.
            </p>

            {/* Overlapping Stickers Photo Collage */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 'clamp(6px, 1.5vw, 12px)',
                maxWidth: 720,
                marginBottom: '1.5rem',
              }}
            >
              {people.map((p, idx) => {
                const rot = (idx % 2 === 0 ? -1 : 1) * (3 + (idx * 2) % 5);
                return (
                  <div
                    key={p.slug}
                    style={{
                      width: 'clamp(72px, 13vw, 105px)',
                      height: 'clamp(88px, 16vw, 130px)',
                      borderRadius: 12,
                      background: '#fff',
                      padding: 3,
                      boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                      transform: `rotate(${rot}deg)`,
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onClick={() => goToSlide(idx)}
                    title={`View ${p.name}`}
                  >
                    <ImageWithFallback
                      src={getPersonPhotoSrc(p)}
                      alt={p.name}
                      filename={`${p.slug}.jpg`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: p.focus || '50% 15%',
                        borderRadius: 9,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Scroll Cue down to Day 0 Plan */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                color: '#f4a94e',
                animation: 'scrollBounce 2s ease-in-out infinite',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                The Full Plan Ahead
              </span>
              <svg width="16" height="20" viewBox="0 0 16 24" fill="none" stroke="#f4a94e" strokeWidth="2">
                <path d="M8 0 L8 20 M2 14 L8 20 L14 14" />
              </svg>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* Mini Avatar Row at Bottom (Clear 80px space preserved) */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <nav
            aria-label="Crew members"
            style={{
              position: 'absolute',
              bottom: 'clamp(0.6rem, 2vh, 1.25rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 35,
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(6px, 1.8vw, 14px)',
              background: 'rgba(13,27,42,0.88)',
              padding: '6px 14px',
              borderRadius: 30,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(78,205,196,0.25)',
              maxWidth: '94vw',
              overflowX: 'auto',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}
          >
            {people.map((p, pIdx) => {
              const isCurrent = activeIndex === pIdx;
              return (
                <button
                  key={p.slug}
                  onClick={() => goToSlide(pIdx)}
                  aria-label={`Show ${p.name}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.25s ease',
                    transform: isCurrent ? 'scale(1.14)' : 'scale(0.92)',
                    opacity: isCurrent ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: isCurrent ? '2px solid #f4a94e' : '2px solid transparent',
                      boxShadow: isCurrent ? '0 0 10px #f4a94e' : 'none',
                    }}
                  >
                    <ImageWithFallback
                      src={getPersonPhotoSrc(p)}
                      alt={p.name}
                      filename={`${p.slug}.jpg`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: p.focus || '50% 15%',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      color: isCurrent ? '#f4a94e' : 'rgba(248,249,250,0.6)',
                      fontWeight: isCurrent ? 700 : 400,
                      maxWidth: 44,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {p.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}

            {/* Final Group Icon Button */}
            <button
              onClick={() => goToSlide(people.length)}
              aria-label="View entire group"
              aria-current={activeIndex === people.length ? 'true' : undefined}
              style={{
                background: activeIndex === people.length ? 'rgba(78,205,196,0.2)' : 'none',
                border: activeIndex === people.length ? '1px solid #4ecdc4' : '1px solid transparent',
                borderRadius: 20,
                padding: '3px 8px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.62rem',
                color: activeIndex === people.length ? '#4ecdc4' : 'rgba(248,249,250,0.5)',
                fontWeight: 600,
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <span>Gang</span>
              <span>⭐</span>
            </button>
          </nav>
        </div>
      </section>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes cloudFloat {
          from { transform: translateX(0); }
          to { transform: translateX(25px); }
        }
        @keyframes rainDrop {
          0% { transform: translateY(-5px); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translateY(65px); opacity: 0; }
        }
        @keyframes violinFloat {
          from { transform: translateY(0) rotate(-3deg); }
          to { transform: translateY(14px) rotate(3deg); }
        }
        @keyframes windFlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
