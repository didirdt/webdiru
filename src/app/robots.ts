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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
