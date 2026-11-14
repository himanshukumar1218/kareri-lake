// ElevationProfile.jsx
export function ElevationProfile({ progress, reducedMotion }) {
  // Map real altitudes to SVG Y coordinates (SVG height 100, min alt 1457, max 2934)
  const svgW = 300, svgH = 80;
  const minAlt = 1457, maxAlt = 2934, range = maxAlt - minAlt;
  const toY = (alt) => svgH - ((alt - minAlt) / range) * (svgH - 10) - 5;

  // Key points: (x, altitude)
  const pts = [
    [0, 1457],    // Day 0: Dharamshala
    [40, 1983],   // Day 1: Kareri village
    [80, 2300],   // Forest
    [120, 2600],  // Mid-climb
    [160, 2934],  // Lake (peak)
    [200, 2600],  // Descent
    [240, 1983],  // Back to village
    [300, 1457],  // Back to Dharamshala
  ];

  const pathD = pts.map(([x, alt], i) => `${i === 0 ? 'M' : 'L'} ${x} ${toY(alt)}`).join(' ');

  // Compute path length roughly (sum of segment lengths)
  const totalLen = pts.reduce((acc, [x, alt], i) => {
    if (i === 0) return 0;
    const [px, palt] = pts[i - 1];
    return acc + Math.hypot(x - px, toY(alt) - toY(palt));
  }, 0);

  const offset = reducedMotion ? 0 : totalLen * (1 - Math.min(progress, 1));

  const dayLabels = [
    { x: 25, label: 'Day 0' },
    { x: 95, label: 'Day 1' },
    { x: 165, label: 'Day 2' },
    { x: 245, label: 'Day 3' },
  ];

  return (
    <div style={{ padding: '1rem', background: 'rgba(13,27,42,0.9)', borderRadius: 8, border: '1px solid rgba(78,205,196,0.2)' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#4ecdc4', marginBottom: '0.5rem', textAlign: 'center' }}>Elevation Profile</p>
      <svg viewBox={`0 0 ${svgW} ${svgH + 20}`} style={{ width: '100%', overflow: 'visible' }} aria-label="Elevation profile of Kareri Lake trek">
        {/* Grid lines */}
        {[1457, 1983, 2934].map((alt) => (
          <line key={alt} x1={0} y1={toY(alt)} x2={svgW} y2={toY(alt)} stroke="rgba(248,249,250,0.08)" strokeWidth={1} />
        ))}
        {/* Altitude labels */}
        {[1457, 1983, 2934].map((alt) => (
          <text key={alt} x={2} y={toY(alt) - 3} fill="rgba(248,249,250,0.4)" fontSize={6} fontFamily="Inter, sans-serif">{alt}m</text>
        ))}

        {/* Area fill */}
        <path
          d={`${pathD} L 300 ${svgH} L 0 ${svgH} Z`}
          fill="url(#elevGrad)"
          opacity={0.3}
        />
        <defs>
          <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ecdc4" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#4ecdc4" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Main path */}
        <path
          d={pathD}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLen}
          strokeDashoffset={offset}
          style={{ transition: reducedMotion ? 'none' : 'stroke-dashoffset 0.5s ease' }}
        />

        {/* Peak marker */}
        <circle cx={160} cy={toY(2934)} r={3} fill="#f4a94e" />
        <text x={163} y={toY(2934) - 4} fill="#f4a94e" fontSize={7} fontFamily="Inter, sans-serif">2,934 m</text>

        {/* Day labels */}
        {dayLabels.map(({ x, label }) => (
          <text key={label} x={x} y={svgH + 14} fill="rgba(248,249,250,0.5)" fontSize={7} fontFamily="Inter, sans-serif" textAnchor="middle">{label}</text>
        ))}
      </svg>
    </div>
  );
}
