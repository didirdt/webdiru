/**
 * Minimal static server for previewing the exported site locally.
 *
 * `next start` cannot serve an `output: "export"` build, so this does the
 * same job with the two behaviours a static host provides:
 *   - `/path/` serves `/path/index.html`
 *   - unknown paths fall back to `/404.html` with a 404 status
 *
 *   npm run preview
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "out");
const PORT = Number(process.env.PORT) || 4173;

// Mirrors the base path used for the build, e.g. NEXT_BASE_PATH=webdiru
// serves the site at http://localhost:4173/webdiru/
const BASE_PATH = (process.env.NEXT_BASE_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");
const BASE = BASE_PATH ? `/${BASE_PATH}` : "";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt.gz": "application/gzip",
};

function send(res, status, file) {
  res.writeHead(status, {
    "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  createReadStream(file).pipe(res);
}

const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);

  // Redirect the root to the base path when one is configured.
  if (BASE && (url === "/" || url === BASE)) {
    res.writeHead(302, { Location: `${BASE}/` }).end();
    return;
  }

  // Strip the base path before looking for the file.
  const relative = BASE ? url.slice(BASE.length) || "/" : url;
  let file = path.join(ROOT, relative);

  // Block path traversal.
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  if (existsSync(file) && statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }

  if (!existsSync(file)) {
    const notFound = path.join(ROOT, "404.html");
    if (existsSync(notFound)) {
      send(res, 404, notFound);
    } else {
      res.writeHead(404).end("Not found");
    }
    return;
  }

  send(res, 200, file);
});

server.listen(PORT, () => {
  console.log(`preview: serving ${ROOT} at http://localhost:${PORT}${BASE}/`);
});
