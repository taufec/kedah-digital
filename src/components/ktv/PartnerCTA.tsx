import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";

export function PartnerCTA() {
  return (
    <section id="partners" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 grid-lines" aria-hidden />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />

          <div className="relative">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Strategic Collaboration</div>
            <h3 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">{site.cta.headline}</span>
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.cta.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {site.cta.ctas.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={
                    c.primary
                      ? "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_oklch(0.85_0.18_145/0.4)] transition-all hover:shadow-[0_0_40px_oklch(0.85_0.18_145/0.5)]"
                      : "group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
                  }
                >
                  {c.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
