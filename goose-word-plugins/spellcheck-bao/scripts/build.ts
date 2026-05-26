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
  join(EXTENSION_DIR, "settings-tab.js"),
  'import plugin from "../index.js";\nexport const createSettingsTabRegistrations = plugin.createSettingsTabRegistrations;\n',
);
writeFileSync(
  join(EXTENSION_DIR, "elysia-plugin.js"),
  'import plugin from "../index.js";\nexport default function spellcheckBao(app) {\n  plugin.registerElysia(app);\n  return app;\n}\n',
);

console.log("spellcheck-bao build ok");
