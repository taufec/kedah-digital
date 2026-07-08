import { motion } from "framer-motion";
import { Lightbulb, Coffee, Building2, GraduationCap, Rocket, Handshake } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";
import membersAsset from "@/assets/ktv-members.jpg.asset.json";
import audienceAsset from "@/assets/ktv-talk-audience.png.asset.json";
import meetupAsset from "@/assets/ktv-meetup.png.asset.json";
import nortechAsset from "@/assets/ktv-nortech.png.asset.json";
import techtalkAsset from "@/assets/ktv-techtalk.png.asset.json";

const ICONS = { Lightbulb, Coffee, Building2, GraduationCap, Rocket, Handshake } as const;

const GALLERY = [
  { src: membersAsset.url, caption: "Komuniti Teknologi Digital Kedah", size: "lg" as const },
  { src: audienceAsset.url, caption: "Industry Sharing Sessions", size: "md" as const },
  { src: meetupAsset.url, caption: "Community Meetups", size: "md" as const },
  { src: nortechAsset.url, caption: "NorTech × TechTamu × Noobs", size: "md" as const },
  { src: techtalkAsset.url, caption: "Driving Kedah's Digital Future", size: "md" as const },
];

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
                className="glass hover-lift group flex flex-col gap-4 rounded-2xl p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/25 transition-all group-hover:bg-primary/20">
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

        {/* Gallery */}
        <div className="mt-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/70">Galeri Aktiviti</div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            <GalleryItem item={GALLERY[0]} className="col-span-2 row-span-2 aspect-square md:aspect-auto" />
            {GALLERY.slice(1).map((g, i) => (
              <GalleryItem key={i} item={g} className="aspect-[4/3]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  item,
  className = "",
}: {
  item: { src: string; caption: string };
  className?: string;
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
        src={item.src}
        alt={item.caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
      <figcaption className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/95">{item.caption}</span>
      </figcaption>
    </motion.figure>
  );
}
