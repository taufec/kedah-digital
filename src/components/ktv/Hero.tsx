import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { NetworkBackground } from "./NetworkBackground";
import { gamma } from "./gammaImages";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Layered parallax
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.15]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0.55]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const logoOp = useTransform(scrollYProgress, [0, 0.9], [0.35, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const headlineOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0px", "-140px"]);
  const ctaY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  const style = reduce ? {} : undefined;

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Layer 1 — photo (deepest parallax) */}
      <motion.div
        style={style ?? { scale: bgScale, y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <img
          src={gamma.members}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </motion.div>

      {/* Layer 2 — grid */}
      <motion.div
        style={style ?? { opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 grid-lines"
        aria-hidden
      />

      {/* Layer 3 — network lines */}
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <NetworkBackground />
      </div>

      {/* Layer 4 — Big KTV logo mark, subtle */}
      <motion.div
        style={style ?? { scale: logoScale, opacity: logoOp }}
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 md:right-10 md:block lg:right-24"
        aria-hidden
      >
        <img src={gamma.logo} alt="" className="h-[420px] w-[420px] object-contain opacity-90 invert" />
      </motion.div>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[120%]"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40">
        <motion.div style={style ?? { y: headlineY, opacity: headlineOp }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            PPTDK · Registered 21.04.2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[92px]"
          >
            <span className="text-gradient">{site.hero.headline}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div
            style={style ?? { y: ctaY }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {site.hero.ctas.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
                className={
                  c.primary
                    ? "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_0_1px_oklch(0.85_0.18_145/0.4)] transition-all hover:shadow-[0_0_40px_oklch(0.85_0.18_145/0.55)]"
                    : "group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-foreground/30 hover:bg-foreground/10"
                }
              >
                {c.primary && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                )}
                <span className="relative">{c.label}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            ))}
          </motion.div>

          <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground/70">
            <span className="h-px w-8 bg-primary/50" />
            <span className="font-mono uppercase tracking-[0.2em]">{site.brand.taglineEn}</span>
          </div>
        </motion.div>

        {/* Floating metric cards */}
        <motion.div
          style={style ?? { y: cardsY }}
          className="pointer-events-none mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:w-[300px] lg:-translate-y-1/2 lg:grid-cols-1"
        >
          {site.hero.metrics.map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
              className="glass-strong pointer-events-auto rounded-xl px-4 py-3"
              style={{
                boxShadow: "var(--shadow-elegant)",
                transform: reduce ? undefined : `translateX(${i % 2 === 0 ? "0" : "10px"})`,
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary/80">
                / {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-1 font-display text-sm font-medium text-foreground">{m}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-background/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
      >
        <span>{site.hero.scroll}</span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.a>
    </section>
  );
}
