import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Read once at build time and inline as a data URI. */
const logo = fs
  .readFileSync(path.join(process.cwd(), "public", "logo-mark-light.png"))
  .toString("base64");

const logoUri = `data:image/png;base64,${logo}`;

const chips = [
  "Ruby on Rails",
  "Node.js",
  "React",
  "PHP",
  "PostgreSQL",
  "AWS",
];

export async function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(99,102,241,0.45) 0%, transparent 42%), radial-gradient(circle at 92% 100%, rgba(14,165,233,0.32) 0%, transparent 42%)",
          padding: "72px 80px",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Name row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) only supports a plain <img> */}
          <img
            src={logoUri}
            alt=""
            style={{ width: 66, height: 54, objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "34px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: "960px",
          }}
        >
          I build complete web products — from database schema to interface.
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: "26px", color: "#a1a1aa" }}>
            {site.role} · {site.location}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {chips.map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  fontSize: "20px",
                  color: "#d4d4d8",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
