import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-foreground/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#membership"
            className="group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_24px_oklch(0.85_0.18_145/0.5)] md:inline-flex"
          >
            Join Community
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-md border border-foreground/10 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-foreground/5 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {site.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#membership"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Join Community
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
