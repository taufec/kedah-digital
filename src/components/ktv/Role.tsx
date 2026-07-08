import { motion } from "framer-motion";
import { Sparkles, Users, GraduationCap, Network } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

const ICONS = { Sparkles, Users, GraduationCap, Network } as const;

export function Role() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.role.eyebrow} headline={site.role.headline} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.role.pillars.map((p, i) => {
            const Icon = ICONS[p.icon as keyof typeof ICONS] ?? Sparkles;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass hover-lift group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/25 transition-all group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_oklch(0.85_0.18_145/0.4)]">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">Pillar / 0{i + 1}</div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
