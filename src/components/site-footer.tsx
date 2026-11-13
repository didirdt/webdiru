import { DownloadIcon, LinkIconGlyph } from "@/components/icons";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-fg">{site.name}</p>
          <p className="text-sm text-muted">
            {site.role} · {site.location}
          </p>
          <p className="text-sm text-subtle">
            © {site.year} · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>

        <ul className="flex items-center gap-1">
          {site.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={link.label}
                title={link.label}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <LinkIconGlyph icon={link.icon} className="size-4.5" />
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.cv}
              download
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <DownloadIcon className="size-4" />
              CV
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
