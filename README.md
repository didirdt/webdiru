# Portfolio

A personal project list and portfolio site. One page, Markdown-driven content,
light/dark themes, and no CMS to maintain.

Built with **Next.js 16** (App Router, Cache Components), **React 19**,
**TypeScript**, and **Tailwind CSS v4**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (fully static output) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |

## Making it yours

### 1. Your details

Edit `src/lib/site.ts` — name, role, headline, intro, email, and social links
all live there. Also update `site.url` to your real domain; it is used for
metadata, `sitemap.xml`, `robots.txt`, and the social share image.

**Placeholders to replace before you deploy:**

| Placeholder | Where |
| --- | --- |
| `site.url` = `https://example.com` | `src/lib/site.ts` |
| GitHub / LinkedIn URLs | `src/lib/site.ts` → `site.links` |
| Project details, dates, and links | `content/projects/*.md` |

The project files were written from your CV as a starting point. **Please
correct the details, dates, and links** — they are drafts, not facts.

### 2. Your CV

Your CV is served at [`/cv-didi-rudiat.pdf`](public/cv-didi-rudiat.pdf) and is
linked from the hero button and the footer. To replace it, drop a new PDF in
`public/` and update `site.cv` in `src/lib/site.ts`.

(The original `cv didi-en.pdf` is still in the project root. It is not used by
the site — you can delete it, or keep it as a backup.)

### 3. Your projects

Every project is a Markdown file in `content/projects/`. Create a new file and
it appears on the site automatically.

```markdown
---
title: "My Project"
summary: "One sentence that shows up on the card."
year: 2026
status: shipped          # shipped | in-progress | experiment | archived
tags: ["nextjs", "typescript"]
stack: ["Next.js", "TypeScript", "PostgreSQL"]
links:
  - { label: "Live", href: "https://example.com" }
  - { label: "Source", href: "https://github.com/you/project" }
cover: /projects/my-project.webp   # optional, place the file in /public/projects/
accent: "#6366f1"                  # optional, colour for the generated cover
featured: true                     # optional
---

The body of the project. **Markdown works**, including:

- Bullet lists and `code` blocks
- Headings, links, quotes, and tables
```

The filename becomes the slug, so `my-project.md` → `my-project`.

### 4. Colours and fonts

Design tokens live in `src/app/globals.css`. The light and dark palettes are
CSS variables under `:root` and `.dark`; change them there and the whole site
follows. Fonts are configured in `src/app/layout.tsx` via `next/font`.

### 5. Images

Drop a file in `public/projects/` and reference it from the frontmatter with
`cover: /projects/your-file.webp`. Without a cover, the site generates a
gradient from the project's `accent` colour.

### 6. Logo and photo

Your assets live in `public/`:

| File | Used for |
| --- | --- |
| `logo.png` | Your original file, kept as-is |
| `logo-mark.png` | The "D" glyph — header (used as a CSS mask) |
| `logo-lockup.png` | Mark + `DIDIRU.ID` wordmark — footer (CSS mask) |
| `logo-mark-light.png` | Light version, used in the social share image |
| `icon-512.png` | Source used to build the browser/app icons |
| `foto.jpg` | Your portrait — hero |

The browser tab icon and home-screen icons are Next.js file conventions in
`src/app/`:

| File | Emits |
| --- | --- |
| `favicon.ico` | `<link rel="icon" type="image/x-icon">` — 16/32/48 px |
| `icon.png` | `<link rel="icon" type="image/png" sizes="512x512">` |
| `apple-icon.png` | `<link rel="apple-touch-icon" sizes="180x180">` |

They are built from `logo-mark-light.png` — the pale "D" glyph on the brand
navy. To regenerate them after changing the logo, rebuild `icon-512.png` and
re-run the ImageMagick step (`convert public/icon-512.png
-define icon:auto-resize=16,32,48 src/app/favicon.ico`).

The logo is applied as a **CSS mask**, so a single file is recoloured to follow
the theme: brand navy (`--brand: #04243c`) on light, pale (`#e8f0fa`) on dark.
Only the alpha channel is used, which is why the files are palette-quantised
and small.

To use a different logo, replace `logo-mark.png` and `logo-lockup.png` with
transparent-background PNGs of the same proportions (mark ≈ 227×186, lockup ≈
373×270) and update the `--brand` token in `src/app/globals.css`.

To change the portrait, replace `public/foto.jpg` — it is rendered at a 4:5
crop, focused near the top of the image.

## How it works

```
content/projects/*.md   <- your content
        |
src/lib/projects.ts     <- reads + parses frontmatter (server only)
src/lib/markdown.ts     <- markdown -> sanitised HTML
        |
src/app/page.tsx        <- server component, prerendered at build time
        |
src/components/project-grid.tsx  <- client: filtering + modal
```

A few implementation notes:

- **The whole page is static.** Every route is prerendered at build time, so
  there is no server to run and nothing to fetch on the client.
- **The theme never flashes.** A tiny inline script in `<head>` applies your
  saved theme before the first paint.
- **Markdown is sanitised.** Raw HTML is dropped and the output tree is passed
  through `rehype-sanitize`.
- **Reads are synchronous.** With Next.js 16's Cache Components enabled,
  synchronous file reads during prerender keep the page fully static. No
  `use cache` directive or Suspense boundary is required.

## Project structure

```
src/
  app/
    layout.tsx        fonts, metadata, theme bootstrap
    page.tsx          the one-page portfolio
    globals.css       design tokens + Tailwind theme
    not-found.tsx
    robots.ts
    sitemap.ts
    opengraph-image.tsx / twitter-image.tsx   social share image
  components/
    hero.tsx
    site-header.tsx / site-footer.tsx
    project-grid.tsx  client: tag filters
    project-card.tsx
    project-dialog.tsx  client: accessible modal
    theme-toggle.tsx  client
    icons.tsx
  lib/
    site.ts           your details
    projects.ts       markdown loader
    markdown.ts       markdown renderer
    og-image.tsx      social share image
    types.ts
content/projects/      <- your project files
public/
  cv-didi-rudiat.pdf   <- your CV
  foto.jpg             <- your portrait
  logo*.png            <- your logo
src/app/
  icon.png             <- browser tab icon
  apple-icon.png       <- iOS home screen icon
  favicon.ico          <- legacy browser tab icon
```

## Deploying

The site builds to a static-friendly output and deploys anywhere:

- **Vercel** — import the repo, the defaults work.
- **Netlify / Cloudflare Pages** — build command `npm run build`, publish
  directory `.next` (or use `output: "export"` in `next.config.ts` for a fully
  static export).

Set `site.url` to your domain before deploying so links and the sitemap are
correct.

## Adding individual project pages later

The grid is a single page by design. If you later want shareable URLs like
`/projects/my-project`, add `src/app/projects/[slug]/page.tsx` using
`getProject(slug)` and add `generateStaticParams` — the content layer is
already built for it.
