export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-md bg-primary/15 ring-1 ring-primary/30">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20L12 4l8 16M8 14h8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute inset-0 rounded-md bg-primary/30 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        Kedah <span className="text-primary">Tech Valley</span>
      </span>
    </a>
  );
}
