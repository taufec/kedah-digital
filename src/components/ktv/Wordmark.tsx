import { gamma } from "./gammaImages";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-white/[0.06] ring-1 ring-white/10 transition-all group-hover:ring-primary/40">
        <img src={gamma.logo} alt="Kedah Tech Valley" className="h-7 w-7 object-contain invert" />
        <span className="pointer-events-none absolute inset-0 rounded-md bg-primary/25 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        Kedah <span className="text-primary">Tech Valley</span>
      </span>
    </a>
  );
}
