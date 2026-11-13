import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components (Next.js 16): enables Partial Prerendering by default.
  cacheComponents: true,
  partialPrefetching: true,

  // Type-safe <Link href="..."> literals.
  typedRoutes: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

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
