/**
 * Builds a Node server bundle instead of a static export.
 *
 * `output: "export"` and Cache Components cannot be combined, so the server
 * build is a separate target that re-enables Cache Components and Partial
 * Prerendering. Kept in its own script so the default `npm run build` stays
 * a plain static export.
 */
import { spawn } from "node:child_process";

process.env.NEXT_OUTPUT = "server";

const child = spawn("next build", {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
