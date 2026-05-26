import { existsSync, mkdirSync, rmSync, symlinkSync, unlinkSync } from "node:fs";
import { join, resolve } from "node:path";

const gooseWordRoot = resolve(import.meta.dir, "..");
const baoSourceRoot = resolve(gooseWordRoot, "../bao-source");
const handlersRoot = join(baoSourceRoot, "bao-install-handlers-bao");
const handlersModules = join(handlersRoot, "node_modules", "@baohaus");
const gooseModules = join(gooseWordRoot, "node_modules", "@baohaus");

const packages = [
  "bao-install-handlers-bao",
  "bao-sdk",
  "bao-schemas",
  "bao-utils",
  "bao-types",
  "bao-json-safe",
  "baobox",
  "contribution-registry-bao",
  "ecosystem-events-bao",
] as const;

const linkPackage = (modulesDir: string, pkg: string, targetDir: string): void => {
  mkdirSync(modulesDir, { recursive: true });
  const linkPath = join(modulesDir, pkg);
  const rm = Bun.spawnSync(["rm", "-rf", linkPath], { stdout: "ignore", stderr: "ignore" });
  if (rm.exitCode !== 0 && existsSync(linkPath)) {
    throw new Error(`failed to remove existing link path: ${linkPath}`);
  }
  symlinkSync(targetDir, linkPath);
};

for (const pkg of packages) {
  const targetDir = join(baoSourceRoot, pkg);
  if (!existsSync(join(targetDir, "package.json"))) {
    throw new Error(`missing local package: ${targetDir}`);
  }
  linkPackage(gooseModules, pkg, targetDir);
  if (pkg !== "bao-install-handlers-bao") {
    linkPackage(handlersModules, pkg, targetDir);
  }
}

process.stdout.write("linked local @baohaus packages for goose-word + install-handlers\n");
