import { LinkIconGlyph } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="logo-mark h-7 w-8 shrink-0 text-brand transition-transform duration-200 group-hover:scale-105"
          />
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="#projects"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Projects
          </a>

          {site.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              aria-label={link.label}
              title={link.label}
              className="hidden size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
            >
              <LinkIconGlyph icon={link.icon} className="size-4.5" />
            </a>
          ))}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
