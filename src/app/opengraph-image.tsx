import { renderOgImage } from "@/lib/og-image";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Lets the image be generated at build time for `output: "export"`. */
export function generateStaticParams() {
  return [];
}

export default async function OpengraphImage() {
  return renderOgImage();
}
