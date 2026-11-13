/**
 * Post-build fixes for static hosting (GitHub Pages, Netlify, Cloudflare).
 *
 * 1. `.nojekyll` — GitHub Pages runs Jekyll by default, and Jekyll ignores any
 *    directory whose name starts with an underscore. Next.js writes its
 *    assets to `_next/`, so without this file the site loads with no CSS or
 *    JavaScript at all.
 *
 * 2. Social card images — Next.js exports the generated Open Graph image as
 *    an extensionless file (`out/opengraph-image`). Static hosts serve those
 *    as `application/octet-stream`, and the Twitter/X card validator rejects
 *    anything that is not `image/png` or `image/jpeg`. Copy them to a `.png`
 *    name and point the meta tags at the copy.
 */
import { copyFile, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.cwd(), "out");

const IMAGE_ALIASES = [
  ["opengraph-image", "og.png"],
  ["twitter-image", "og-twitter.png"],
];

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await htmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      found.push(full);
    }
  }
  return found;
}

async function main() {
  if (!(await exists(OUT))) {
    console.error("postbuild: no `out` directory — did the build run?");
    process.exit(1);
  }

  // 1. Disable Jekyll on GitHub Pages.
  await writeFile(path.join(OUT, ".nojekyll"), "");
  console.log("postbuild: wrote .nojekyll");

  // 2. Give the generated social images a .png extension and re-point the tags.
  for (const [source, alias] of IMAGE_ALIASES) {
    const from = path.join(OUT, source);
    if (!(await exists(from))) continue;
    await copyFile(from, path.join(OUT, alias));
    console.log(`postbuild: ${source} -> ${alias}`);
  }

  let rewritten = 0;
  for (const file of await htmlFiles(OUT)) {
    let html = await readFile(file, "utf8");
    const before = html;

    for (const [source, alias] of IMAGE_ALIASES) {
      html = html.replaceAll(`/${source}?`, `/${alias}?`);
    }

    if (html !== before) {
      await writeFile(file, html);
      rewritten += 1;
    }
  }
  console.log(`postbuild: rewrote social image URLs in ${rewritten} file(s)`);
}

main().catch((error) => {
  console.error("postbuild failed:", error);
  process.exit(1);
});
