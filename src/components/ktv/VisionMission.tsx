import { motion } from "framer-motion";
import { site } from "@/content/site";

export function VisionMission() {
  return (
    <section id="mission" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{site.vision.eyebrow}</div>
          <h3 className="mt-6 font-serif text-4xl italic leading-[1.05] sm:text-5xl md:text-6xl">
            <span className="text-gradient">{site.vision.headline}</span>
          </h3>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">{site.vision.body}</p>
          <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground/70">
            <span className="h-px w-8 bg-primary/50" />
            <span className="font-mono uppercase tracking-[0.2em]">{site.brand.taglineEn}</span>
          </div>
        </motion.div>

        {/* Mission */}
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{site.mission.eyebrow}</div>
          <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Lima tumpuan yang membentuk hala tuju KTV.
          </h3>
          <div className="mt-8 flex flex-col gap-3">
            {site.mission.points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-primary/40 hover:bg-white/[0.04]"
              >
                <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 font-mono text-[11px] text-primary">
                  0{i + 1}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
