import { motion } from "framer-motion";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.problem.eyebrow} headline={site.problem.headline} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {site.problem.cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass hover-lift relative overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 font-mono text-sm text-primary">
                  0{i + 1}
                </div>
                <p className="text-base leading-relaxed text-foreground/90">{c}</p>
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
