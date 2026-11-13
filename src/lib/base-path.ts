/**
 * Deployment base path handling.
 *
 * GitHub Pages serves a project site from `https://<user>.github.io/<repo>/`,
 * so the build can be given a base path. Next.js applies it to its own
 * `_next/*` assets, but NOT to:
 *
 *   - images rendered with `images.unoptimized` (required by a static export)
 *   - URLs written directly in CSS
 *
 * Both are resolved through `asset()` here.
 */

/** Normalised base path, either "" or "/something". */
export const basePath = (() => {
  const raw = (process.env.NEXT_BASE_PATH ?? "").trim();
  if (!raw) return "";
  return `/${raw.replace(/^\/+|\/+$/g, "")}`;
})();

/**
 * Prefixes a root-relative asset path with the deployment base path.
 *
 * Server-side only: `process.env.NEXT_BASE_PATH` is not available in client
 * components, so prefixed paths are computed before they reach the client.
 */
export function asset(path: string): string {
  if (!basePath) return path;
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
