import { motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

export function Ecosystem() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="ecosystem" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 grid-lines" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.ecosystem.eyebrow} headline={site.ecosystem.headline} />

        {/* Animated network diagram */}
        <div className="mt-12 hidden lg:block">
          <NetworkMap groups={site.ecosystem.groups} active={active} onHover={setActive} />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {site.ecosystem.groups.map((g, gi) => (
            <motion.div
              key={g.title}
              onMouseEnter={() => setActive(gi)}
              onMouseLeave={() => setActive(null)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass-strong relative rounded-2xl p-6 transition-all duration-500 ${
                active === null || active === gi
                  ? "border-white/15 opacity-100"
                  : "opacity-50"
              } hover:border-primary/40 hover:shadow-[0_0_50px_-15px_oklch(0.85_0.18_145/0.5)]`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                {g.title}
              </div>
              <ul className="mt-6 flex flex-col divide-y divide-white/5">
                {g.items.map((it, i) => (
                  <li
                    key={it}
                    className="group flex items-center justify-between gap-4 py-3 transition-all hover:pl-2 hover:text-primary"
                  >
                    <span className="font-display text-[15px] font-medium text-foreground/90 group-hover:text-primary">
                      {it}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm italic text-muted-foreground">{site.ecosystem.note}</p>
      </div>
    </section>
  );
}

function NetworkMap({
  groups,
  active,
  onHover,
}: {
  groups: { title: string; items: string[] }[];
  active: number | null;
  onHover: (i: number | null) => void;
}) {
  // Central hub + one satellite per group with items around
  const CX = 500;
  const CY = 220;

  const positions = groups.map((_, i) => {
    const angle = (Math.PI * 2 * i) / groups.length - Math.PI / 2;
    const R = 170;
    return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
  });

  return (
    <div className="relative mx-auto aspect-[1000/440] w-full max-w-4xl">
      <svg viewBox="0 0 1000 440" className="h-full w-full" role="img" aria-label="Ekosistem KTV">
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.18 145)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.85 0.18 145)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connecting lines */}
        {positions.map((p, i) => {
            const isDim = active !== null && active !== i;
            return (
              <motion.line
                key={i}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="oklch(0.85 0.18 145)"
                strokeWidth={active === i ? 1.5 : 0.8}
                strokeOpacity={isDim ? 0.08 : 0.35}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
              />
            );
        })}

        {/* Hub glow */}
        <circle cx={CX} cy={CY} r={70} fill="url(#hub)" />
        <circle cx={CX} cy={CY} r={22} fill="oklch(0.19 0.02 250)" stroke="oklch(0.85 0.18 145)" strokeWidth="1.5" />
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="oklch(0.97 0.005 250)"
          letterSpacing="2"
        >
          KTV
        </text>

        {/* Nodes */}
        {positions.map((p, i) => {
          const isActive = active === i;
          const isDim = active !== null && !isActive;
          return (
            <g
              key={i}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              style={{ cursor: "pointer", opacity: isDim ? 0.35 : 1, transition: "opacity 0.3s" }}
            >
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 16 : 12}
                fill="oklch(0.19 0.02 250)"
                stroke="oklch(0.85 0.18 145)"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.15, type: "spring" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
              {/* pulse */}
              <circle
                cx={p.x}
                cy={p.y}
                r={12}
                fill="none"
                stroke="oklch(0.85 0.18 145)"
                strokeOpacity="0.4"
                style={{ transformOrigin: `${p.x}px ${p.y}px`, animation: `ping 2.4s ${i * 0.4}s ease-out infinite` }}
              />
              <text
                x={p.x}
                y={p.y > CY ? p.y + 34 : p.y - 22}
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontSize="13"
                fontWeight="600"
                fill="oklch(0.97 0.005 250)"
              >
                {groups[i].title}
              </text>
              <text
                x={p.x}
                y={p.y > CY ? p.y + 50 : p.y - 6}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fill="oklch(0.68 0.02 250)"
                letterSpacing="1.5"
              >
                {groups[i].items.length} nodes
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
