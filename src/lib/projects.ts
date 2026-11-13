import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { renderMarkdown } from "@/lib/markdown";
import { PROJECT_STATUSES, type Project, type ProjectLink, type ProjectStatus } from "@/lib/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

type Frontmatter = {
  title?: string;
  summary?: string;
  year?: number | string;
  status?: string;
  tags?: string[];
  stack?: string[];
  links?: ProjectLink[];
  cover?: string;
  image?: string;
  accent?: string;
  featured?: boolean;
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function asLinks(value: unknown): ProjectLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const { label, href } = item as Partial<ProjectLink>;
    if (typeof label !== "string" || typeof href !== "string") return [];
    return [{ label, href }];
  });
}

function asStatus(value: unknown): ProjectStatus {
  return PROJECT_STATUSES.includes(value as ProjectStatus)
    ? (value as ProjectStatus)
    : "shipped";
}

/** Fallback accent colours, assigned deterministically per slug. */
const ACCENT_PALETTE = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
];

function fallbackAccent(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 100_000;
  }
  return ACCENT_PALETTE[hash % ACCENT_PALETTE.length];
}

function parseProject(fileName: string): Project {
  const slug = fileName.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(PROJECTS_DIR, fileName), "utf8");
  const { data, content } = matter(source);
  const fm = data as Frontmatter;

  const year = Number(fm.year);
  const cover = typeof fm.cover === "string" && fm.cover.trim() ? fm.cover.trim() : null;
  const image = typeof fm.image === "string" && fm.image.trim() ? fm.image.trim() : null;
  const accent = typeof fm.accent === "string" && fm.accent.trim() ? fm.accent.trim() : null;

  return {
    slug,
    title: typeof fm.title === "string" && fm.title.trim() ? fm.title.trim() : slug,
    summary: typeof fm.summary === "string" ? fm.summary.trim() : "",
    year: Number.isFinite(year) ? year : 0,
    status: asStatus(fm.status),
    tags: asStringArray(fm.tags),
    stack: asStringArray(fm.stack),
    links: asLinks(fm.links),
    cover,
    image,
    accent: accent ?? fallbackAccent(slug),
    featured: fm.featured === true,
    body: renderMarkdown(content),
  };
}

/**
 * Every project, newest first.
 *
 * Files are read synchronously so the whole loader is prerender-safe under
 * `cacheComponents` (no request-time I/O, no dynamic APIs).
 */
export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parseProject)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Every distinct tag across all projects, alphabetically. */
export function getAllTags(projects: Project[]): string[] {
  return [...new Set(projects.flatMap((project) => project.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}
