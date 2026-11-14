import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './ImageWithFallback';
import { Lightbox } from './Lightbox';

gsap.registerPlugin(ScrollTrigger);

export function LakeSlideshow({ trip, reducedMotion }) {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  // Slides start from lake-2.jpg (lake-1 is hero cover)
  const allPhotos = trip.lakePhotos || [];
  const slides = allPhotos.filter((p) => p.file !== 'lake-1.jpg');
  const activeSlides = slides.length > 0 ? slides : allPhotos;

  const totalTripPhotos = allPhotos.length;

  // Touch swipe support
  const touchStart = useRef({ x: 0, y: 0 });

  const goToSlide = useCallback((index) => {
    const targetIdx = Math.max(0, Math.min(activeSlides.length - 1, index));
    if (!containerRef.current) return;
    const st = ScrollTrigger.getById('lake-slides-pin');
    if (st) {
      const scrollRange = st.end - st.start;
      const targetPos = st.start + (targetIdx / (activeSlides.length - 1)) * scrollRange;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  }, [activeSlides.length]);

  // GSAP ScrollTrigger Pinned Slideshow
  useEffect(() => {
    if (reducedMotion || activeSlides.length <= 1) return;

    const ctx = gsap.context(() => {
      const slideElements = gsap.utils.toArray('.lake-slide-item');
      const captionElements = gsap.utils.toArray('.lake-caption-item');

      // Set initial states
      gsap.set(slideElements, { autoAlpha: 0, scale: 1.05 });
      gsap.set(slideElements[0], { autoAlpha: 1, scale: 1 });
      gsap.set(captionElements, { autoAlpha: 0, y: 20 });
      gsap.set(captionElements[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'lake-slides-pin',
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinWrapperRef.current,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const rawIdx = p * (activeSlides.length - 1);
            const idx = Math.min(activeSlides.length - 1, Math.round(rawIdx));
            setCurrentIndex(idx);
          },
        },
      });

      // Build crossfade animations between consecutive slides
      for (let i = 0; i < activeSlides.length - 1; i++) {
        const nextSlide = slideElements[i + 1];
        const currentSlide = slideElements[i];
        const nextCaption = captionElements[i + 1];
        const currentCaption = captionElements[i];

        // Transition from slide i to i+1
        tl.to(currentCaption, { autoAlpha: 0, y: -15, duration: 0.4 }, `step-${i}`)
          .to(nextSlide, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power1.inOut' }, `step-${i}`)
          .to(currentSlide, { autoAlpha: 0, scale: 0.96, duration: 0.8, ease: 'power1.inOut' }, `step-${i}`)
          .to(nextCaption, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, `step-${i}+=0.3`);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeSlides.length, reducedMotion]);

  // Keyboard navigation when slideshow is in viewport
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToSlide]);

  // Touch gestures for mobile
  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    // Threshold of 50px
    if (Math.abs(dy) > 50 || Math.abs(dx) > 50) {
      if (dy < -50 || dx < -50) {
        goToSlide(currentIndex + 1);
      } else if (dy > 50 || dx > 50) {
        goToSlide(currentIndex - 1);
      }
    }
  };

  // If reduced motion is requested, render clean vertical blocks
  if (reducedMotion) {
    return (
      <section aria-label="Kareri Lake Photos" style={{ background: '#0d1b2a', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {activeSlides.map((photo, i) => (
            <figure key={photo.file} style={{ margin: 0, borderRadius: 12, overflow: 'hidden', background: '#1a3a4a' }}>
              <ImageWithFallback
                src={`/images/lake/${photo.file}`}
                alt={photo.caption}
                filename={photo.file}
                style={{ width: '100%', height: '70vh', objectFit: 'cover' }}
              />
              <figcaption style={{ padding: '1.25rem', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#f8f9fa' }}>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  // Scroll height calculation: N slides -> (N * 100)vh total height
  const containerHeight = `${activeSlides.length * 100}vh`;

  return (
    <>
      <section
        ref={containerRef}
        style={{
          position: 'relative',
          height: containerHeight,
          background: '#0d1b2a',
        }}
        aria-label="Full-screen lake gallery"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pinned Viewport Container */}
        <div
          ref={pinWrapperRef}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100svh',
            overflow: 'hidden',
          }}
        >
          {/* Top Thin Progress Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'rgba(248,249,250,0.1)',
              zIndex: 30,
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #4ecdc4, #f4a94e)',
                width: `${Math.max(5, scrollProgress * 100)}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* All Full-screen Photo Slides */}
          {activeSlides.map((photo, index) => {
            const photoNumInTrip = allPhotos.findIndex((p) => p.file === photo.file) + 1;
            const formattedCurrent = String(photoNumInTrip || index + 2).padStart(2, '0');
            const formattedTotal = String(totalTripPhotos).padStart(2, '0');

            return (
              <div
                key={photo.file}
                className="lake-slide-item"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Photo ${photoNumInTrip} of ${totalTripPhotos}`}
              >
                {/* Background Image with Ken Burns breathing */}
                <ImageWithFallback
                  src={`/images/lake/${photo.file}`}
                  alt={photo.caption}
                  filename={photo.file}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    animation: 'kenBurnsSubtle 24s ease-in-out infinite alternate',
                  }}
                />

                {/* Dark Gradient Overlay for optimal text readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.6) 35%, rgba(13,27,42,0.2) 65%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Subtle Vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 100px rgba(13,27,42,0.7)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Caption + Slide Meta (Bottom Left) */}
                <div
                  className="lake-caption-item"
                  style={{
                    position: 'absolute',
                    bottom: 'clamp(2rem, 6vh, 4.5rem)',
                    left: 'clamp(1.5rem, 5vw, 4rem)',
                    right: 'clamp(4rem, 10vw, 6rem)',
                    zIndex: 20,
                    maxWidth: 720,
                  }}
                >
                  {/* Photo category badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: '0.75rem',
                      background: 'rgba(26,58,74,0.75)',
                      padding: '4px 12px',
                      borderRadius: 20,
                      border: '1px solid rgba(78,205,196,0.3)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#4ecdc4',
                        boxShadow: '0 0 8px #4ecdc4',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#4ecdc4',
                        fontWeight: 600,
                      }}
                    >
                      Kareri Lake Series · {formattedCurrent} / {formattedTotal}
                    </span>
                  </div>

                  {/* Editorial Caption in Display Serif */}
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                      color: '#f8f9fa',
                      lineHeight: 1.25,
                      marginBottom: '0.5rem',
                      textShadow: '0 2px 15px rgba(0,0,0,0.6)',
                    }}
                  >
                    "{photo.caption}"
                  </h2>

                  {/* Expand Lightbox Button */}
                  <button
                    onClick={() =>
                      setLightboxPhoto({
                        src: `/images/lake/${photo.file}`,
                        alt: photo.caption,
                        filename: photo.file,
                        caption: photo.caption,
                      })
                    }
                    aria-label={`Open photo in lightbox: ${photo.caption}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'none',
                      border: 'none',
                      color: 'rgba(248,249,250,0.6)',
                      fontSize: '0.8rem',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '0.5rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f4a94e')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,249,250,0.6)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span>View Fullscreen</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Slide Counter Overlay (Top Right) */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(1.5rem, 4vh, 2.5rem)',
              right: 'clamp(1.5rem, 5vw, 3.5rem)',
              zIndex: 25,
              display: 'flex',
              alignItems: 'baseline',
              gap: 4,
              background: 'rgba(13,27,42,0.6)',
              padding: '6px 14px',
              borderRadius: 24,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(78,205,196,0.2)',
            }}
            aria-live="polite"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#f4a94e',
              }}
            >
              {String(currentIndex + 2).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: 'rgba(248,249,250,0.5)',
              }}
            >
              / {String(totalTripPhotos).padStart(2, '0')}
            </span>
          </div>

          {/* Vertical Navigation Dots (Right Side) */}
          <nav
            aria-label="Slide navigation"
            style={{
              position: 'absolute',
              right: 'clamp(1rem, 3vw, 2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              zIndex: 30,
            }}
          >
            {activeSlides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 2}`}
                aria-current={currentIndex === dotIdx ? 'true' : undefined}
                style={{
                  width: currentIndex === dotIdx ? 12 : 8,
                  height: currentIndex === dotIdx ? 12 : 8,
                  borderRadius: '50%',
                  background: currentIndex === dotIdx ? '#f4a94e' : 'rgba(248,249,250,0.35)',
                  border: currentIndex === dotIdx ? '2px solid rgba(244,169,78,0.5)' : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                  boxShadow: currentIndex === dotIdx ? '0 0 10px #f4a94e' : 'none',
                }}
              />
            ))}
          </nav>
        </div>
      </section>

      {/* Lightbox for high-res viewing */}
      <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} reducedMotion={reducedMotion} />

      {/* Subtle Animation Keyframes */}
      <style>{`
        @keyframes kenBurnsSubtle {
          from { transform: scale(1); }
          to { transform: scale(1.07); }
        }
      `}</style>
    </>
  );
}
