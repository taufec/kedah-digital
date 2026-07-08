import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { site } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Terima kasih! Pertanyaan anda telah diterima.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={site.contact.eyebrow} headline={site.contact.headline} />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Side */}
          <div className="flex flex-col gap-8">
            <div className="glass-strong rounded-2xl p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Entiti Rasmi</div>
              <div className="mt-4 font-display text-lg font-semibold text-foreground">{site.brand.entity}</div>
              <div className="mt-2 font-mono text-xs text-muted-foreground">Reg. {site.brand.registration}</div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">Ikuti Kami</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {site.contact.socials.map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="glass-strong grid gap-4 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nama" name="name" required />
              <Field label="Emel" name="email" type="email" required />
            </div>
            <Field label="Organisasi" name="organization" />
            <div>
              <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Jenis Pertanyaan
              </label>
              <select
                name="interest"
                required
                defaultValue=""
                className="mt-2 w-full rounded-lg border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
              >
                <option value="" disabled>Pilih satu…</option>
                {site.contact.interests.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Mesej</label>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-2 w-full resize-none rounded-lg border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_40px_oklch(0.85_0.18_145/0.5)] disabled:opacity-70"
            >
              {submitting ? "Menghantar…" : "Hantar Pertanyaan"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
      />
    </div>
  );
}
