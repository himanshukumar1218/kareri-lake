import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LS_KEY = 'kareri_checklist';

function ProgressRing({ ticked, total }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const pct = total === 0 ? 0 : ticked / total;
  const offset = circumference * (1 - pct);
  return (
    <svg width={72} height={72} aria-label={`${ticked} of ${total} items packed`} role="img">
      <circle cx={36} cy={36} r={radius} fill="none" stroke="rgba(248,249,250,0.1)" strokeWidth={4} />
      <circle
        cx={36} cy={36} r={radius} fill="none"
        stroke={pct === 1 ? '#22c55e' : '#4ecdc4'}
        strokeWidth={4}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '36px 36px', transition: 'stroke-dashoffset 0.4s ease, stroke 0.4s' }}
      />
      <text x={36} y={40} textAnchor="middle" fill="#f8f9fa" fontSize={12} fontFamily="Inter, sans-serif" fontWeight={600}>
        {ticked}/{total}
      </text>
    </svg>
  );
}

function launchConfetti() {
  const colors = ['#4ecdc4', '#f4a94e', '#f8f9fa', '#22c55e', '#a78bfa'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const size = 6 + Math.random() * 8;
    dot.style.cssText = `
      position:absolute;bottom:0;left:${startX}%;
      width:${size}px;height:${size}px;border-radius:50%;background:${color};
      animation:confettiFly ${1.5 + Math.random()}s ease-out ${delay}s forwards;
    `;
    container.appendChild(dot);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFly {
      0% { transform: translateY(0) rotate(0); opacity: 1; }
      100% { transform: translateY(-${window.innerHeight * 0.9}px) rotate(${Math.random() > 0.5 ? '' : '-'}${360 + Math.random() * 360}deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.removeChild(container);
    document.head.removeChild(style);
  }, 3000);
}

function CheckItem({ id, text, checked, onToggle, reducedMotion }) {
  return (
    <li>
      <button
        onClick={() => onToggle(id)}
        aria-checked={checked}
        role="checkbox"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: 'none', border: 'none', cursor: 'pointer',
          width: '100%', textAlign: 'left', padding: '0.5rem 0',
          borderBottom: '1px solid rgba(248,249,250,0.05)',
        }}
      >
        {/* Checkbox */}
        <div style={{
          flexShrink: 0, width: 20, height: 20, borderRadius: 4,
          border: '2px solid',
          borderColor: checked ? '#4ecdc4' : 'rgba(248,249,250,0.3)',
          background: checked ? 'rgba(78,205,196,0.15)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: reducedMotion ? 'none' : 'all 0.2s',
        }}>
          <AnimatePresence>
            {checked && (
              <motion.svg
                key="check"
                width={12} height={12} viewBox="0 0 12 12"
                initial={reducedMotion ? {} : { scale: 0 }}
                animate={reducedMotion ? {} : { scale: 1 }}
                exit={reducedMotion ? {} : { scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                aria-hidden="true"
              >
                <polyline points="2,6 5,9 10,3" fill="none" stroke="#4ecdc4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
        {/* Item text */}
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.875rem',
          color: checked ? 'rgba(248,249,250,0.4)' : 'rgba(248,249,250,0.85)',
          textDecoration: checked ? 'line-through' : 'none',
          transition: reducedMotion ? 'none' : 'all 0.3s',
          lineHeight: 1.5,
        }}>{text}</span>
      </button>
    </li>
  );
}

function GroupCard({ group, items, ticked, onToggle, reducedMotion }) {
  const [open, setOpen] = useState(true);
  const groupTicked = items.filter((item) => ticked.has(`${group}::${item}`)).length;

  return (
    <div style={{ background: '#1a3a4a', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(78,205,196,0.12)', marginBottom: '1rem' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#f8f9fa' }}>{group}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: groupTicked === items.length ? '#22c55e' : '#4ecdc4' }}>
            {groupTicked}/{items.length}
          </span>
        </div>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="#4ecdc4" strokeWidth={2} aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
          <path d="M3 6 L8 11 L13 6" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={reducedMotion ? {} : { height: 'auto', opacity: 1 }}
            exit={reducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '0 1.25rem 1rem' }}>
              {items.map((item) => {
                const id = `${group}::${item}`;
                return (
                  <CheckItem key={id} id={id} text={item} checked={ticked.has(id)} onToggle={onToggle} reducedMotion={reducedMotion} />
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Checklist({ trip, reducedMotion }) {
  const allIds = trip.checklist.flatMap((g) => g.items.map((item) => `${g.group}::${item}`));
  const [ticked, setTicked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      return new Set(saved.filter((id) => allIds.includes(id)));
    } catch { return new Set(); }
  });

  const confettiFired = useRef(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify([...ticked]));
    if (ticked.size === allIds.length && allIds.length > 0 && !confettiFired.current) {
      confettiFired.current = true;
      if (!reducedMotion) launchConfetti();
    } else if (ticked.size < allIds.length) {
      confettiFired.current = false;
    }
  }, [ticked, allIds.length, reducedMotion]);

  const onToggle = useCallback((id) => {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const rulesText = trip.trailRules.join(' · ') + ' · ' + trip.trailRules.join(' · ');

  return (
    <section aria-label="Packing checklist" style={{ background: '#0d1b2a', padding: 'clamp(4rem, 10vh, 8rem) clamp(1rem, 5vw, 4rem)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4ecdc4', marginBottom: '0.75rem' }}>Pack Smart</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#f8f9fa', marginBottom: '1.5rem' }}>What You Need</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProgressRing ticked={ticked.size} total={allIds.length} />
        </div>
        {ticked.size === allIds.length && allIds.length > 0 && (
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#22c55e', fontSize: '0.9rem', marginTop: '0.75rem' }}>
            You're packed. Let's go! 🏔️
          </p>
        )}
      </div>

      {/* Groups grid */}
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {trip.checklist.map((g) => (
          <GroupCard
            key={g.group}
            group={g.group}
            items={g.items}
            ticked={ticked}
            onToggle={onToggle}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Trail rules marquee */}
      <div style={{ marginTop: '3rem', overflow: 'hidden', borderTop: '1px solid rgba(78,205,196,0.15)', borderBottom: '1px solid rgba(78,205,196,0.15)', padding: '0.75rem 0', background: 'rgba(78,205,196,0.03)' }}>
        <div
          aria-label="Trail rules"
          style={{ whiteSpace: 'nowrap', animation: reducedMotion ? 'none' : 'marquee 30s linear infinite' }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(248,249,250,0.5)', letterSpacing: '0.05em' }}>
            {rulesText}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
