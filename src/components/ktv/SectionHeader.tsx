import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  headline,
  body,
  align = "left",
}: {
  eyebrow: string;
  headline: string;
  body?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignCls}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        {headline}
      </motion.h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}
