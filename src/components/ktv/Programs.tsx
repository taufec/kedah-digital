import { motion } from "framer-motion";
import { Lightbulb, Coffee, Building2, GraduationCap, Rocket, Handshake } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import { galleryFeatured, gallerySecondary, marqueeImages } from "./gammaImages";
import { ImageMarquee } from "./ImageMarquee";

const ICONS = { Lightbulb, Coffee, Building2, GraduationCap, Rocket, Handshake } as const;

export function Programs() {
  return (
    <section id="programs" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.programs.eyebrow} headline={site.programs.headline} />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.programs.cards.map((c, i) => {
            const Icon = ICONS[c.icon as keyof typeof ICONS] ?? Lightbulb;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_oklch(0.85_0.18_145/0.35)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/25 transition-all group-hover:bg-primary/20 group-hover:ring-primary/50">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial gallery */}
        <div className="mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">
                Galeri Aktiviti
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Momen sebenar dari komuniti KTV.
              </h3>
            </div>
            <div className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:block">
              / 2026
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            <GalleryItem
              src={galleryFeatured}
              caption="Komuniti Teknologi Digital Kedah"
              className="aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[560px]"
              featured
            />
            <div className="grid gap-4 lg:col-span-2">
              {gallerySecondary.slice(0, 3).map((g) => (
                <GalleryItem key={g.caption} src={g.src} caption={g.caption} className="aspect-[16/10] lg:h-[176px] lg:aspect-auto" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed marquee */}
      <div className="mt-16">
        <ImageMarquee images={marqueeImages} />
      </div>
    </section>
  );
}

function GalleryItem({
  src,
  caption,
  className = "",
  featured = false,
}: {
  src: string;
  caption: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-card ${className}`}
    >
      <img
        src={src}
        alt={caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />
      {/* dark overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-background/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />
      <figcaption className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
          <span className={`font-mono uppercase tracking-[0.15em] text-foreground/95 ${featured ? "text-xs sm:text-sm" : "text-[11px]"}`}>
            {caption}
          </span>
        </div>
        <span className="translate-y-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View
        </span>
      </figcaption>
    </motion.figure>
  );
}
