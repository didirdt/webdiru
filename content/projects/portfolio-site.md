---
title: "This Portfolio"
summary: "The site you're reading — a static, Markdown-driven portfolio built with Next.js 16 and Tailwind CSS v4."
year: 2026
status: shipped
tags: ["nextjs", "typescript", "tailwind", "design"]
stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Markdown", "React 19"]
cover: "/covers/portfolio-site.webp"
image: "/projects/portfolio-site.webp"
links:
  - { label: "Source", href: "https://github.com/your-handle" }
  - { label: "Download CV", href: "/cv-didi-rudiat.pdf" }
accent: "#ec4899"
---

A portfolio that stays maintainable: every project is a Markdown file, and
the site is fully static.

### Why static

A portfolio doesn't need a server. Building it as prerendered HTML means it
loads instantly, costs nothing to host, and can't break because a database
is unreachable.

### Decisions worth noting

- **Content as Markdown.** A project is a file in `content/projects/`, not a
  row in a database or a page in a CMS.
- **No theme flash.** A tiny inline script applies the saved theme before the
  first paint.
- **Sanitised rendering.** Markdown goes through a sanitising pipeline, so
  the content can't inject markup.
- **Prerendered by default.** Every route is static; the only client
  JavaScript is the filter and the modal.

### Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Markdown
