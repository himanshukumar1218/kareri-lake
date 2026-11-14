import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './ImageWithFallback';

export function Lightbox({ photo, onClose, reducedMotion }) {
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!photo) return;
    closeBtn.current?.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={reducedMotion ? {} : { opacity: 1 }}
          exit={reducedMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reducedMotion ? {} : { scale: 0.92 }}
            animate={reducedMotion ? {} : { scale: 1 }}
            exit={reducedMotion ? {} : { scale: 0.92 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <button
              ref={closeBtn}
              onClick={onClose}
              aria-label="Close photo"
              style={{
                position: 'absolute', top: -40, right: 0,
                background: 'none', border: '1px solid #4ecdc4',
                color: '#4ecdc4', borderRadius: '50%',
                width: 32, height: 32, cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>
            <ImageWithFallback
              src={photo.src}
              alt={photo.alt}
              filename={photo.filename}
              style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', borderRadius: 4 }}
            />
            {photo.caption && (
              <p style={{
                color: '#f8f9fa', textAlign: 'center', marginTop: '1rem',
                fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                fontSize: '1rem', maxWidth: 500,
              }}>{photo.caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
