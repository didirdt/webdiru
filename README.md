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
all live there. `site.url` is already set to your real domain and is used for
metadata, `sitemap.xml`, `robots.txt`, and the social share image.

**Still worth a look before you deploy:**

| Item | Where |
| --- | --- |
| Project details, dates, and links | `content/projects/*.md` |
| The Expertise section | `src/lib/site.ts` → `skillGroups` |

Your GitHub (`github.com/didirdt`) and LinkedIn
(`linkedin.com/in/didi-rudiat-341448b4`) are already set.

### 2. Your expertise

The **Expertise** section is driven by `skillGroups` in `src/lib/site.ts` —
an array of `{ title, note, items }`. Add, remove, or reword entries there and
the section re-renders. There is no separate component to touch.

### 3. Your CV

Your CV is served at [`/cv-didi-rudiat.pdf`](public/cv-didi-rudiat.pdf) and is
linked from the hero button and the footer. To replace it, drop a new PDF in
`public/` and update `site.cv` in `src/lib/site.ts`.

### 4. Your projects

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
cover: "/projects/my-project.webp"   # optional, place the file in /public/projects/
image: "/projects/my-project.webp"   # optional, sharp image for the detail dialog
accent: "#6366f1"                  # optional, colour for the generated cover
featured: true                     # optional
---

The body of the project. **Markdown works**, including:

- Bullet lists and `code` blocks
- Headings, links, quotes, and tables
```

The filename becomes the slug, so `my-project.md` → `my-project`.

### 5. Colours and fonts

Design tokens live in `src/app/globals.css`. The light and dark palettes are
CSS variables under `:root` and `.dark`; change them there and the whole site
follows. Fonts are configured in `src/app/layout.tsx` via `next/font`.

### 6. Images

Each project card shows a **blurred cover**; the detail dialog shows a **sharp
image** of the same project.

| Frontmatter | Used for | Folder |
| --- | --- | --- |
| `cover:` | Blurred background of the card | `public/covers/` |
| `image:` | Sharp image at the top of the dialog | `public/projects/` |

Both are optional — a project without them falls back to a gradient built from
its `accent` colour.

The current covers are real: a screenshot of the Taxsam encoder app, the USSI
IBS Core site, the Taxsam Learning Center, and this site itself. The rest are
generated artwork themed to each project (a node graph for the network
monitor, phone frames for the mobile apps, a chart for the dashboard).

To use your own images, drop them in `public/covers/` and `public/projects/`
with matching names and update the frontmatter. Keep them 1200×630 (16:9).

### 7. Logo and photo

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
    expertise.tsx
    site-header.tsx / site-footer.tsx
    project-grid.tsx  client: tag filters
    project-card.tsx
    project-dialog.tsx  client: accessible modal
    theme-toggle.tsx  client
    icons.tsx
  lib/
    site.ts           your details + expertise groups
    base-path.ts      base path handling for static hosts
    projects.ts       markdown loader
    markdown.ts       markdown renderer
    og-image.tsx      social share image
    types.ts
content/projects/      <- your project files
scripts/
  postbuild.mjs       static-host fixes (.nojekyll, social image)
  serve.mjs           local preview of out/
  build-server.mjs    optional Node server build
public/
  cv-didi-rudiat.pdf   <- your CV
  foto.jpg             <- your portrait
  logo*.png            <- your logo
  covers/*.webp        <- blurred card backgrounds
  projects/*.webp      <- sharp images for the detail dialog
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

## Deploying

The site builds to a fully static export in `out/` — no server required.

```bash
npm run build     # static export -> out/
npm run preview   # serve out/ at http://localhost:4173
npm run build:server   # optional: Node server bundle instead
```

### GitHub Pages (free)

The build is automated by `.github/workflows/deploy.yml`. To switch it on:

1. **Repo → Settings → Pages → Source: "GitHub Actions"**
2. Push to `main` — the workflow builds and deploys
3. The site appears at `https://didirdt.github.io/webdiru`

A project Pages site is served from a sub-path, so the build sets
`NEXT_BASE_PATH=webdiru`. If you later point `didiru.web.id` at GitHub Pages,
set `NEXT_BASE_PATH` to empty and `CUSTOM_DOMAIN` to `didiru.web.id` in the
workflow file — the site then moves to the domain root and a `CNAME` file is
written automatically.

### Other hosts

`out/` is a plain static folder — drop it on Netlify, Cloudflare Pages, Vercel,
or any web server. Set `NEXT_BASE_PATH` if the site is not served from the
domain root.

### What the deployment handles

| Issue | Fix |
| --- | --- |
| GitHub Pages' Jekyll ignores `_next/` | `scripts/postbuild.mjs` writes `.nojekyll` |
| Extensionless OG image breaks card scrapers | Postbuild copies it to `og.png` and re-points the meta tags |
| Images and CSS URLs ignore the base path | `src/lib/base-path.ts` prefixes them |
| `output: "export"` rejects `export const dynamic` | Route handlers opt in with `generateStaticParams` |

> Note: `output: "export"` and Cache Components (Partial Prerendering) cannot
> be combined. The export is the default because the site has no dynamic
> features; `npm run build:server` produces a Node bundle with both enabled.

## Adding individual project pages later

The grid is a single page by design. If you later want shareable URLs like
`/projects/my-project`, add `src/app/projects/[slug]/page.tsx` using
`getProject(slug)` and add `generateStaticParams` — the content layer is
already built for it.
