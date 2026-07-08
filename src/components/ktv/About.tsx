import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import membersAsset from "@/assets/ktv-members.jpg.asset.json";
import audienceAsset from "@/assets/ktv-talk-audience.png.asset.json";
import meetupAsset from "@/assets/ktv-meetup.png.asset.json";
import nortechAsset from "@/assets/ktv-nortech.png.asset.json";

const CHAPTER_IMAGES = [membersAsset.url, audienceAsset.url, meetupAsset.url, nortechAsset.url];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.about.eyebrow} headline={site.about.headline} body={site.about.body} />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {site.about.cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass hover-lift group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">/ 0{i + 1}</div>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pinned scroll storytelling */}
      <PinnedStory />
    </section>
  );
}

function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const chapters = site.storyChapters;
  const activeIndex = useTransform(scrollYProgress, (v) => {
    const idx = Math.floor(v * chapters.length);
    return Math.min(chapters.length - 1, Math.max(0, idx));
  });

  return (
    <div ref={ref} className="relative mt-32" style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* Left: image stack */}
          <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-card lg:aspect-square">
            {chapters.map((c, i) => {
              const opacity = useTransform(scrollYProgress, [
                (i - 0.5) / chapters.length,
                i / chapters.length,
                (i + 0.5) / chapters.length,
                (i + 1) / chapters.length,
              ], [0, 1, 1, 0]);
              const scale = useTransform(scrollYProgress, [i / chapters.length, (i + 1) / chapters.length], [1.05, 1]);
              return (
                <motion.div key={c.tag} style={{ opacity, scale }} className="absolute inset-0">
                  <img src={CHAPTER_IMAGES[i]} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-strong inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {c.metric}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>

          {/* Right: chapters */}
          <div className="flex flex-col justify-center gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              <motion.span style={{ opacity: scrollYProgress }} className="h-1.5 w-1.5 rounded-full bg-primary" />
              Ekosistem KTV
            </span>
            <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Empat lapisan yang membentuk masa depan digital Kedah.
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {chapters.map((c, i) => {
                const op = useTransform(scrollYProgress, [
                  (i - 0.4) / chapters.length,
                  i / chapters.length,
                  (i + 0.6) / chapters.length,
                ], [0.35, 1, 0.35]);
                return (
                  <motion.div key={c.tag} style={{ opacity: op }} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="font-mono text-xs text-primary">{c.tag}</div>
                    <div>
                      <div className="font-display text-lg font-semibold text-foreground">{c.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{c.body}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div style={{ opacity: activeIndex }} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
