import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

export function News() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.news.eyebrow} headline={site.news.headline} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {site.news.items.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass hover-lift group flex h-full flex-col gap-5 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">{n.category}</span>
                <span className="text-muted-foreground/70">{n.date}</span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-foreground">{n.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                Baca Lagi
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
