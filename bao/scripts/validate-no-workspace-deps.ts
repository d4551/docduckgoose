import {
  baohausRoot,
  fail,
  ok,
  packageFiles,
  readJson,
  requireJsonRecord,
} from "./policy/shared.ts";

const failures: string[] = [];
for (const file of await packageFiles()) {
  const manifest = requireJsonRecord(await readJson(`${baohausRoot}/${file}`), file);
  for (const field of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    const deps = requireJsonRecord(manifest[field] ?? {}, `${file}.${field}`);
    for (const [name, version] of Object.entries(deps)) {
      if (
        typeof version === "string" &&
        (version.startsWith("workspace:") ||
          version.startsWith("catalog:") ||
          version.startsWith("file:") ||
          version.startsWith("link:") ||
          version.startsWith("npm:") ||
          version.startsWith("https://") ||
          version.startsWith("http://") ||
          version.startsWith("git+") ||
          version.startsWith("git://") ||
          version.startsWith("github:") ||
          version.startsWith("gitlab:") ||
          version.startsWith("bitbucket:"))
      ) {
        failures.push(`${file}: ${field}.${name} uses ${version}`);
      }
    }
  }
}
fail(failures);
ok("validate:no-workspace-deps");
