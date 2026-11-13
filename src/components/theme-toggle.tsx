"use client";

import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * The button state is driven purely by CSS (the `dark` class on <html>), so
 * there is no client state to hydrate and no icon flash on first paint.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");

    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";

    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode) — the theme still applies.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <SunIcon className="size-4.5 dark:hidden" />
      <MoonIcon className="hidden size-4.5 dark:block" />
    </button>
  );
}
