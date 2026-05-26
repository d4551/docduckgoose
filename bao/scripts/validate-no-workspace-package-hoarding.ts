import {
  baohausRoot,
  catalog,
  fail,
  ok,
  packageFiles,
  readJson,
  requireJsonRecord,
} from "./policy/shared.ts";

const STRIP_PARENT_PREFIX = /^\.\.\//;

const registry = await catalog();
const allowedRoots = new Set(
  registry.packages.map((entry) =>
    entry.sourceRepo.replace(STRIP_PARENT_PREFIX, "").replaceAll("\\", "/"),
  ),
);
const failures: string[] = [];
for (const file of await packageFiles()) {
  // Workspace roots (e.g., bao-source/) are not catalog-owned publishable repos.
  if (file === "bao-source/package.json") {
    continue;
  }
  const manifest = requireJsonRecord(await readJson(`${baohausRoot}/${file}`), file);
  if (typeof manifest.name !== "string" || !manifest.name.startsWith("@baohaus/")) {
    continue;
  }
  const repoRoot = file.replaceAll("\\", "/").split("/").slice(0, -1).join("/");
  if (!allowedRoots.has(repoRoot)) {
    failures.push(`${file}: Bao package source is outside catalog-owned source repo`);
  }
}
fail(failures);
ok("validate:no-workspace-package-hoarding");
