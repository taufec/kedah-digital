import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { gamma } from "./gammaImages";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 py-16">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Wordmark />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.brand.taglineMs} — {site.brand.taglineEn}.
            </p>
            <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <img src={gamma.pptdk} alt="PPTDK" className="h-14 w-14 shrink-0 rounded-md bg-white/90 object-contain p-1" loading="lazy" />
              <p className="text-xs leading-relaxed text-muted-foreground">{site.footer.legal}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {site.footer.columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">{col.title}</div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <div className="font-mono text-xs text-muted-foreground/70">{site.footer.copyright}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Reg. {site.brand.registration}
          </div>
        </div>
      </div>
    </footer>
  );
}
