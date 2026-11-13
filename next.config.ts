import type { NextConfig } from "next";

import { basePath } from "./src/lib/base-path";

/**
 * Static export is the default.
 *
 * The site has no dynamic features, so a plain static build is all it needs —
 * and it is what GitHub Pages (and every other static host) wants.
 *
 * Set NEXT_OUTPUT=server to produce a Node server bundle instead. That
 * re-enables Cache Components + Partial Prerendering, which are not
 * compatible with `output: "export"`.
 */
const isServerBuild = process.env.NEXT_OUTPUT === "server";

const remotePatterns = [
  {
    protocol: "https" as const,
    hostname: "**.githubusercontent.com",
    port: "",
    pathname: "/**",
  },
];

const nextConfig: NextConfig = {
  ...(isServerBuild
    ? {
        // Node server bundle.
        cacheComponents: true,
        partialPrefetching: true,
        images: { remotePatterns },
      }
    : {
        // Static export.
        output: "export" as const,

        // GitHub Pages resolves `/about` to `/about.html`; trailing slashes
        // keep URLs clean and stop 404s on nested paths.
        trailingSlash: true,

        // A static export has no image optimiser server.
        images: { unoptimized: true, remotePatterns },
      }),

  basePath,
  assetPrefix: basePath || undefined,

  // Type-safe <Link href="..."> literals.
  typedRoutes: true,

  // Keep the markdown sources in the server bundle.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
