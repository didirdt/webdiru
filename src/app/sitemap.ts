import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * `output: "export"` requires every route handler to opt into static
 * generation. `generateStaticParams` is the opt-in that works alongside
 * Cache Components (`export const dynamic` is rejected by it).
 */
export function generateStaticParams() {
  return [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // The site is served with a trailing slash (`trailingSlash: true`).
      url: `${site.url}/`,
      lastModified: "2026-01-01",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
