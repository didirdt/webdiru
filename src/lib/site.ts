export const LINK_ICONS = [
  "github",
  "linkedin",
  "x",
  "mail",
  "globe",
  "dribbble",
] as const;

export type LinkIcon = (typeof LINK_ICONS)[number];

export type SiteLink = {
  label: string;
  href: string;
  icon: LinkIcon;
};

/**
 * Single source of truth for everything that is "about you".
 * Edit this file to make the site yours.
 *
 * Placeholders to replace: `url`, the `links` hrefs, and the projects in
 * `content/projects/`.
 */
export const site = {
  name: "Didi Rudiat",
  initials: "DR",
  role: "Full-Stack Software Engineer",
  location: "Bandung, Indonesia",
  availability: "Open to new opportunities",
  email: "Didi.RudiatD12@gmail.com",
  phone: "+62 838 2200 1125",
  /** Canonical origin of the deployed site. Used for metadata / sitemap. */
  url: "https://example.com",
  /** Path to the CV PDF, served from /public. */
  cv: "/cv-didi-rudiat.pdf",
  /** Hard-coded on purpose: `new Date()` is not allowed during prerender. */
  year: 2026,
  headline: "I build complete web products — from database schema to interface.",
  intro:
    "I'm a full-stack engineer based in Bandung, Indonesia, with six years of experience shipping products for studios and startups. I've worked mostly in Ruby on Rails, Node.js and PHP, with React on the front end — and I care about the boring parts that make software hold up: clear structure, fast pages, and code the next person can read.",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/your-handle",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/your-handle",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:Didi.RudiatD12@gmail.com",
      icon: "mail",
    },
  ] satisfies SiteLink[],
} as const;
