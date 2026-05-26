import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const EXTENSION_DIR = join(ROOT, "dist", "bao-extensions");

const proc = Bun.spawn(
  ["bun", "build", "./src/index.ts", "--target=bun", "--format=esm", "--outdir=dist"],
  {
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
  },
);
const code = await proc.exited;
if (code !== 0) {
  process.exit(code);
}

mkdirSync(EXTENSION_DIR, { recursive: true });

writeFileSync(
  join(EXTENSION_DIR, "theme.js"),
  `import plugin from "../index.js";
export const createThemeRegistrations = plugin.createThemeRegistrations;
`,
);

console.log("theme-aurora-glass-bao build ok");
