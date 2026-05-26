import {
  baohausRoot,
  catalog,
  fail,
  ok,
  packageFiles,
  readJson,
  requireJsonRecord,
} from "./policy/shared.ts";

const registry = await catalog();
const catalogNames = new Map(registry.packages.map((entry) => [entry.packageName, entry]));
const seen = new Set<string>();
const failures: string[] = [];
for (const file of await packageFiles()) {
  // Workspace roots (e.g., bao-source/) are not publishable packages;
  // they exist only to group sub-packages and provide shared resolution.
  if (file === "bao-source/package.json") {
    continue;
  }
  const manifest = requireJsonRecord(await readJson(`${baohausRoot}/${file}`), file);
  if (typeof manifest.name === "string" && manifest.name.startsWith("@baohaus/")) {
    seen.add(manifest.name);
    if (!catalogNames.has(manifest.name)) {
      failures.push(`${file}: ${manifest.name} missing from bao-packages catalog`);
    }
  }
}
for (const [name, entry] of catalogNames) {
  if (!seen.has(name)) {
    failures.push(`${entry.sourceRepo}: catalog entry ${name} has no package.json`);
  }
}
fail(failures);
ok("validate:registry-parity");
