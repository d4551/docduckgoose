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
const names = new Set(registry.packages.map((entry) => entry.packageName));
const failures: string[] = [];
for (const file of await packageFiles()) {
  const manifest = requireJsonRecord(await readJson(`${baohausRoot}/${file}`), file);
  for (const field of ["dependencies", "peerDependencies", "optionalDependencies"]) {
    const deps = requireJsonRecord(manifest[field] ?? {}, `${file}.${field}`);
    for (const name of Object.keys(deps)) {
      if (name.startsWith("@baohaus/") && !names.has(name)) {
        failures.push(`${file}: ${field}.${name} missing from bao-packages catalog`);
      }
    }
  }
}
fail(failures);
ok("validate:bao-dependency-closure");
