import { motion } from "framer-motion";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import { KedahMap } from "./KedahMap";

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 grid-lines" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[500px] opacity-40" aria-hidden>
        <KedahMap className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.ecosystem.eyebrow} headline={site.ecosystem.headline} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {site.ecosystem.groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                {g.title}
              </div>
              <ul className="mt-6 flex flex-col divide-y divide-white/5">
                {g.items.map((it, i) => (
                  <li
                    key={it}
                    className="group flex items-center justify-between gap-4 py-3 transition-colors hover:text-primary"
                  >
                    <span className="font-display text-[15px] font-medium text-foreground/90 group-hover:text-primary">
                      {it}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60">/{String(i + 1).padStart(2, "0")}</span>
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
