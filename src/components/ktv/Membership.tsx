import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

export function Membership() {
  return (
    <section id="membership" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.membership.eyebrow} headline={site.membership.headline} />

        <div className="mt-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/70">Struktur Semasa</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {site.membership.current.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass hover-lift group flex flex-col gap-4 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">/ 0{i + 1}</div>
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-primary transition-all group-hover:border-primary/50 group-hover:bg-primary/10">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent/80">Struktur Baharu (Dicadangkan)</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.membership.proposed.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-accent/40"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-4 w-4" />
                </div>
                <span className="font-display text-[15px] font-medium text-foreground/90">{p}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm italic text-muted-foreground">{site.membership.note}</p>
        </div>
      </div>
    </section>
  );
}
