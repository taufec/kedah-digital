import { motion } from "framer-motion";

export function ImageMarquee({ images, speed = 40 }: { images: string[]; speed?: number }) {
  const doubled = [...images, ...images];
  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="group/item relative h-56 w-80 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-card transition-all hover:border-primary/40"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:pause group-hover/item:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-60 transition-opacity group-hover/item:opacity-40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
