/**
 * Stylized abstract Kedah/Northern-Peninsular silhouette with glowing nodes.
 * Not geographically precise — decorative only.
 */
export function KedahMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 700" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="ktvMapGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.85 0.18 145)" stopOpacity="0.35" />
          <stop offset="1" stopColor="oklch(0.82 0.12 85)" stopOpacity="0.05" />
        </linearGradient>
        <filter id="ktvGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path
        d="M180 90 C 260 60, 360 80, 420 130 C 480 170, 500 230, 470 290 C 500 340, 520 410, 480 470 C 460 520, 400 560, 340 570 C 300 620, 220 640, 170 600 C 110 570, 80 490, 110 410 C 80 350, 90 260, 140 200 C 150 160, 160 120, 180 90 Z"
        fill="url(#ktvMapGrad)"
        stroke="oklch(0.85 0.18 145 / 0.5)"
        strokeWidth="1"
      />
      {[
        [220, 200], [320, 180], [400, 260], [280, 300], [360, 380], [200, 380], [300, 470], [420, 440], [250, 540],
      ].map(([x, y], i) => (
        <g key={i} filter="url(#ktvGlow)">
          <circle cx={x} cy={y} r="3" fill="oklch(0.85 0.18 145)" />
          <circle cx={x} cy={y} r="8" fill="oklch(0.85 0.18 145 / 0.15)" />
        </g>
      ))}
      {/* connecting network lines */}
      <g stroke="oklch(0.85 0.18 145 / 0.35)" strokeWidth="0.7" strokeDasharray="2 3">
        <line x1="220" y1="200" x2="320" y2="180" />
        <line x1="320" y1="180" x2="400" y2="260" />
        <line x1="400" y1="260" x2="280" y2="300" />
        <line x1="280" y1="300" x2="360" y2="380" />
        <line x1="360" y1="380" x2="200" y2="380" />
        <line x1="200" y1="380" x2="300" y2="470" />
        <line x1="300" y1="470" x2="420" y2="440" />
        <line x1="300" y1="470" x2="250" y2="540" />
      </g>
    </svg>
  );
}
