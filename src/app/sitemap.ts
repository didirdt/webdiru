import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: "2026-01-01",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
