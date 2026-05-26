import {
  fail,
  type JsonField,
  type JsonValue,
  ok,
  readJson,
  requireJsonRecord,
} from "./policy/shared.ts";

const BAOHAUS_SCOPE = "@baohaus/";
const cwd = process.cwd();

type JsonRecord = ReturnType<typeof requireJsonRecord>;

const requireArrayField = (
  record: JsonRecord,
  field: string,
  path: string,
): readonly JsonValue[] => {
  const value = record[field];
  if (Array.isArray(value)) {
    return value;
  }
  throw new Error(`${path}.${field} must be an array`);
};

const collectNamedEntries = (entries: readonly JsonField[], path: string): Set<string> => {
  const names = new Set<string>();
  entries.forEach((entry, index) => {
    const record = requireJsonRecord(entry, `${path}[${index}]`);
    const name = record.name;
    if (typeof name === "string" && name.length > 0) {
      names.add(name);
      return;
    }
    throw new Error(`${path}[${index}].name must be a non-empty string`);
  });
  return names;
};

const collectPackageRuntimeDependencies = (record: JsonRecord): string[] => {
  const dependencies = requireJsonRecord(record.dependencies ?? {}, "package.json.dependencies");
  return Object.keys(dependencies)
    .filter((name) => name.startsWith(BAOHAUS_SCOPE))
    .sort();
};

const assertDependencySet = (
  expected: readonly string[],
  actual: ReadonlySet<string>,
  label: string,
): string[] =>
  expected.filter((name) => !actual.has(name)).map((name) => `${label}: missing ${name}`);

const optionalNamedSet = async (
  path: string,
  arrayField: string,
  label: string,
): Promise<{ label: string; names: Set<string> } | null> => {
  if (!(await Bun.file(path).exists())) {
    return null;
  }
  const record = requireJsonRecord(await readJson(path), label);
  return {
    label,
    names: collectNamedEntries(
      requireArrayField(record, arrayField, label),
      `${label}.${arrayField}`,
    ),
  };
};

const packageJson = requireJsonRecord(await readJson(`${cwd}/package.json`), "package.json");
const runtimeDependencies = collectPackageRuntimeDependencies(packageJson);
const governance = requireJsonRecord(
  await readJson(`${cwd}/bao-governance.json`),
  "bao-governance.json",
);
const lock = requireJsonRecord(await readJson(`${cwd}/bao.lock`), "bao.lock");

const checks = [
  {
    label: "bao-governance.json.dependencies",
    names: collectNamedEntries(
      requireArrayField(governance, "dependencies", "bao-governance.json"),
      "bao-governance.json.dependencies",
    ),
  },
  {
    label: "bao.lock.resolved",
    names: collectNamedEntries(
      requireArrayField(lock, "resolved", "bao.lock"),
      "bao.lock.resolved",
    ),
  },
];

const optionalChecks = await Promise.all([
  optionalNamedSet(
    `${cwd}/.bao-build/bao-governance.json`,
    "dependencies",
    ".bao-build/bao-governance.json",
  ),
  optionalNamedSet(`${cwd}/.bao-build/bao.lock`, "resolved", ".bao-build/bao.lock"),
  optionalNamedSet(`${cwd}/.bao-build/SBOM.cdx.json`, "components", ".bao-build/SBOM.cdx.json"),
]);

const failures = [...checks, ...optionalChecks.filter((check) => check !== null)].flatMap((check) =>
  assertDependencySet(runtimeDependencies, check.names, check.label),
);

fail(failures);
ok("validate:bao-runtime-dependency-parity");
