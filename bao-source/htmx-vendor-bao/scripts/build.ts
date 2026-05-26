import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const packageRoot = resolve(import.meta.dir, "..");

const vendor = spawnSync("bun", [resolve(import.meta.dir, "vendor-assets.ts")], {
  cwd: packageRoot,
  stdio: "inherit",
});
if (vendor.status !== 0) {
  process.exit(vendor.status ?? 1);
}

const tsc = spawnSync("bunx", ["--bun", "tsc", "--project", "tsconfig.json"], {
  cwd: packageRoot,
  stdio: "inherit",
});
process.exit(tsc.status ?? 0);
