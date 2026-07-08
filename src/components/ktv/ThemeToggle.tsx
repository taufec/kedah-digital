import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    if (next) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("ktv-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Tukar ke light mode" : "Tukar ke dark mode"}
      aria-pressed={isDark}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border bg-card/60 text-foreground backdrop-blur-md transition-all hover:border-primary/40 hover:text-primary ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
      {mounted && isDark ? (
        <Sun className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
      ) : (
        <Moon className="relative h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
      )}
    </button>
  );
}
