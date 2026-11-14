import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ElevationProfile } from './ElevationProfile';
import { ImageWithFallback } from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

function DayCard({ day, index, reducedMotion }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const difficultyColor =
    day.difficulty.toLowerCase().includes('easy') ? '#22c55e' :
    day.difficulty.toLowerCase().includes('moderate') ? '#f4a94e' : '#ef4444';

  return (
    <article
      ref={cardRef}
      aria-label={`${day.label}: ${day.title}`}
      style={{
        position: 'relative',
        marginBottom: '3rem',
        opacity: reducedMotion ? 1 : (visible ? 1 : 0),
        transform: reducedMotion ? 'none' : (visible ? 'translateY(0)' : 'translateY(40px)'),
        transition: reducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {/* Day badge + connector */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        {/* Timeline dot */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#1a3a4a', border: '2px solid #4ecdc4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            color: '#4ecdc4', fontSize: '1.1rem', flexShrink: 0,
          }}>
            {day.day}
          </div>
        </div>

        {/* Card */}
        <div style={{
          flex: 1,
          background: '#1a3a4a',
          border: '1px solid rgba(78,205,196,0.15)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* Optional trail photo */}
          {day.trailPhoto && (
            <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
              <ImageWithFallback
                src={`/images/trail/${day.trailPhoto}`}
                alt={`${day.title} trail photo`}
                filename={day.trailPhoto}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #1a3a4a 100%)' }} />
            </div>
          )}

          <div style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#4ecdc4' }}>{day.label}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, color: '#f8f9fa', margin: '0.25rem 0 0.1rem' }}>{day.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(248,249,250,0.6)', fontSize: '0.9rem', margin: 0 }}>{day.subtitle}</p>
            </div>

            {/* Meta tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem', color: '#4ecdc4', fontFamily: 'Inter, sans-serif' }}>{day.altitude}</span>
              <span style={{ background: `rgba(0,0,0,0.3)`, border: `1px solid ${difficultyColor}40`, borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem', color: difficultyColor, fontFamily: 'Inter, sans-serif' }}>{day.difficulty}</span>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', background: 'rgba(13,27,42,0.5)', borderRadius: 8, padding: '0.75rem' }}>
              {Object.entries(day.stats).map(([key, val]) => (
                <div key={key} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#f4a94e' }}>{val}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(248,249,250,0.4)', marginTop: 2 }}>{key}</div>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '1rem' }}>
              {day.slots.map((slot, si) => (
                <li key={si} style={{ display: 'flex', gap: '1rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0, fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
                    color: '#4ecdc4', fontWeight: 500, minWidth: 70, paddingTop: 2,
                  }}>{slot.time}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'rgba(248,249,250,0.8)', lineHeight: 1.5 }}>{slot.text}</span>
                </li>
              ))}
            </ul>

            {/* Tip */}
            <div style={{
              background: 'rgba(244,169,78,0.08)', border: '1px solid rgba(244,169,78,0.2)',
              borderRadius: 8, padding: '0.75rem 1rem',
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }} aria-hidden="true">💡</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.825rem', color: 'rgba(248,249,250,0.75)', margin: 0, lineHeight: 1.5 }}>{day.tip}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Plan({ trip, reducedMotion }) {
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);
  const [elevProgress, setElevProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Timeline line fill
      if (timelineLineRef.current) {
        gsap.to(timelineLineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          },
        });
      }

      // Track section scroll progress for elevation profile
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        onUpdate: (self) => setElevProgress(self.progress),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Trip plan"
      style={{ background: '#0d1b2a', padding: 'clamp(4rem, 10vh, 8rem) clamp(1rem, 5vw, 4rem)' }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4ecdc4', marginBottom: '0.75rem' }}>Day by Day</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, color: '#f8f9fa', marginBottom: '0.5rem',
        }}>The Plan</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(248,249,250,0.5)', fontSize: '0.9rem', maxWidth: 540, margin: '0 auto' }}>
          Jaipur se Kareri Lake tak ka roadmap — timings aur momos strictly mandatory.
        </p>
      </div>

      {/* Two-column layout on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '2rem',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <style>{`
          @media (min-width: 900px) {
            .plan-grid { grid-template-columns: 280px minmax(0, 1fr) !important; }
            .plan-sticky { position: sticky !important; top: 2rem !important; align-self: start !important; }
          }
        `}</style>

        <div className="plan-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem' }}>
          {/* Left: sticky elevation + day key */}
          <div className="plan-sticky">
            <ElevationProfile progress={elevProgress} reducedMotion={reducedMotion} />
            <div style={{ marginTop: '1rem', background: 'rgba(26,58,74,0.5)', borderRadius: 8, padding: '1rem', border: '1px solid rgba(78,205,196,0.1)' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#4ecdc4', marginBottom: '0.75rem' }}>Quick Reference</p>
              {[
                ['Route', 'Jaipur → Pathankot → Kareri'],
                ['Trek Distance', '~26 km (round trip)'],
                ['Max Altitude', '2,934 m (Kareri Lake)'],
                ['Base Village', 'Kareri Village (1,983 m)'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(248,249,250,0.5)' }}>{k}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#f8f9fa', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 24, top: 48, bottom: 0, width: 2, background: 'rgba(78,205,196,0.1)' }}>
              <div
                ref={timelineLineRef}
                style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(to bottom, #4ecdc4, rgba(78,205,196,0.3))',
                  transformOrigin: 'top',
                  transform: 'scaleY(0)',
                }}
              />
            </div>

            {trip.days.map((day, i) => (
              <DayCard key={day.day} day={day} index={i} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
