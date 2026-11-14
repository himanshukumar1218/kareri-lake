import { useEffect, useRef } from 'react';

export function CustomCursor({ reducedMotion }) {
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    document.body.style.cursor = 'none';

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, label')) {
        ringRef.current?.classList.add('cursor-grown');
      }
    };
    const onOut = () => ringRef.current?.classList.remove('cursor-grown');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      if (ringRef.current) {
        if (reducedMotion) {
          current.current = { ...pos.current };
        } else {
          current.current.x = lerp(current.current.x, pos.current.x, 0.15);
          current.current.y = lerp(current.current.y, pos.current.y, 0.15);
        }
        ringRef.current.style.transform = `translate(${current.current.x - 12}px, ${current.current.y - 12}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <>
      <style>{`
        .cursor-grown {
          width: 48px !important;
          height: 48px !important;
          margin: -12px !important;
          border-color: #f4a94e !important;
        }
      `}</style>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, width: 24, height: 24,
          border: '2px solid #4ecdc4', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, margin 0.2s',
        }}
        className="custom-cursor hidden md:block"
      />
    </>
  );
}
