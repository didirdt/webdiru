export const PROJECT_STATUSES = [
  "shipped",
  "in-progress",
  "experiment",
  "archived",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  status: ProjectStatus;
  tags: string[];
  stack: string[];
  links: ProjectLink[];
  /** Path to a cover image inside /public, e.g. "/projects/foo.webp". */
  cover: string | null;
  /** Path to a sharp image shown in the detail dialog. */
  image: string | null;
  /** Optional hex accent used for the generated cover gradient. */
  accent: string | null;
  featured: boolean;
  /** Rendered markdown body (sanitized HTML). */
  body: string;
};
