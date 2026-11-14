import './index.css'
import { useState } from 'react'
import { trip } from './data/trip.js'
import { useReducedMotion } from './hooks/useReducedMotion.js'
import { useLenis } from './hooks/useLenis.js'
import { CustomCursor } from './components/CustomCursor.jsx'
import { Intro } from './components/Intro.jsx'
import { Hero } from './components/Hero.jsx'
import { LakeSlideshow } from './components/LakeSlideshow.jsx'
import { Gang } from './components/Gang.jsx'
import { Plan } from './components/Plan.jsx'
import { Checklist } from './components/Checklist.jsx'
import { CTA } from './components/CTA.jsx'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [introComplete, setIntroComplete] = useState(false)
  
  // Init Lenis smooth scroll (skipped if reducedMotion)
  useLenis(reducedMotion)

  return (
    <>
      {/* Skip to main content link (a11y) */}
      <a
        href="#main-content"
        style={{
          position: 'fixed', top: -60, left: 16, zIndex: 10000,
          background: '#4ecdc4', color: '#0d1b2a',
          padding: '8px 16px', borderRadius: 4,
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          textDecoration: 'none', fontSize: '0.875rem',
          transition: 'top 0.2s',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '16px'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-60px'; }}
      >
        Skip to main content
      </a>

      {/* Custom cursor (desktop only) */}
      <CustomCursor reducedMotion={reducedMotion} />

      {/* Intro animation overlay */}
      <Intro onComplete={() => setIntroComplete(true)} reducedMotion={reducedMotion} />

      {/* Main site (visible under/after intro) */}
      <main id="main-content">
        <Hero trip={trip} reducedMotion={reducedMotion} />
        <LakeSlideshow trip={trip} reducedMotion={reducedMotion} />
        <Gang trip={trip} reducedMotion={reducedMotion} />
        <Plan trip={trip} reducedMotion={reducedMotion} />
        <Checklist trip={trip} reducedMotion={reducedMotion} />
        <CTA trip={trip} reducedMotion={reducedMotion} />
      </main>
    </>
  )
}
