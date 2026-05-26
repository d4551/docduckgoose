type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}
type JsonRecord = JsonObject;

interface CatalogEntry {
  packageName: string;
  sourceRepo: string;
}
interface Catalog {
  packages: CatalogEntry[];
}

const ignoredSegments = [".git", "node_modules", "dist", "coverage", "artifacts", ".bao-build"];

const isRecord = (value: JsonField): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: JsonField): value is string =>
  typeof value === "string" && value.length > 0;

const isUnknownArray = (value: JsonField): value is JsonValue[] => Array.isArray(value);

const die = (message: string): never => {
  throw new Error(message);
};

const requiredString = (value: JsonField, path: string): string => {
  if (isNonEmptyString(value)) {
    return value;
  }
  return die(`${path} must be a non-empty string`);
};

const catalogEntry = (value: JsonField, index: number): CatalogEntry => {
  if (!isRecord(value)) {
    return die(`catalog.packages[${index}] must be an object`);
  }
  return {
    packageName: requiredString(value.packageName, `catalog.packages[${index}].packageName`),
    sourceRepo: requiredString(value.sourceRepo, `catalog.packages[${index}].sourceRepo`),
  };
};

const TRAILING_SLASH_PATTERN = /[\\/]$/;
const SEPARATOR_PATTERN = /[\\/]/;

const trimTrailingSlash = (path: string): string => path.replace(TRAILING_SLASH_PATTERN, "");

const repoRoot = trimTrailingSlash(Bun.fileURLToPath(new URL("../..", import.meta.url)));
const baohausRoot = trimTrailingSlash(Bun.fileURLToPath(new URL("../../..", import.meta.url)));
const catalogPath = `${baohausRoot}/bao-packages/bao-packages.json`;

const readJson = async (path: string): Promise<JsonValue> =>
  JSON.parse(await Bun.file(path).text());

const requireJsonRecord = (value: JsonField, path: string): JsonRecord => {
  if (isRecord(value)) {
    return value;
  }
  return die(`${path} must be an object`);
};

const repositoryDirectoryNames = async (): Promise<string[]> => {
  const entries: string[] = [];
  for await (const entry of new Bun.Glob("*").scan({
    cwd: baohausRoot,
    onlyFiles: false,
  })) {
    if (!ignoredSegments.includes(entry)) {
      const stat = await Bun.file(`${baohausRoot}/${entry}`).stat();
      if (stat.isDirectory()) {
        entries.push(entry);
      }
    }
  }
  return entries;
};

const packageFiles = async (): Promise<string[]> => {
  const files: string[] = [];
  for (const repo of await repositoryDirectoryNames()) {
    if (await Bun.file(`${baohausRoot}/${repo}/package.json`).exists()) {
      files.push(`${repo}/package.json`);
    }
    for await (const file of new Bun.Glob("packages/*/package.json").scan({
      cwd: `${baohausRoot}/${repo}`,
    })) {
      const segments = file.split(SEPARATOR_PATTERN);
      if (!ignoredSegments.some((segment) => segments.includes(segment))) {
        files.push(`${repo}/${file}`);
      }
    }
  }
  for await (const file of new Bun.Glob("bao-source/*/package.json").scan({
    cwd: baohausRoot,
  })) {
    files.push(file);
  }
  for await (const file of new Bun.Glob("bao-source/*/src/bunbuddies/*-bunbuddy/package.json").scan(
    {
      cwd: baohausRoot,
    },
  )) {
    files.push(file);
  }
  for await (const file of new Bun.Glob("bao-packages/*/package.json").scan({
    cwd: baohausRoot,
  })) {
    files.push(file);
  }
  if (await Bun.file(`${baohausRoot}/package.json`).exists()) {
    files.push("package.json");
  }
  return [...new Set(files)].sort();
};

const catalog = async (): Promise<Catalog> => {
  const record = requireJsonRecord(await readJson(catalogPath), "catalog");
  const packages = record.packages;
  if (!isUnknownArray(packages)) {
    return die("catalog.packages must be an array");
  }
  return { packages: packages.map(catalogEntry) };
};

const fail = (messages: string[]): void => {
  if (messages.length === 0) {
    return;
  }
  Bun.stderr.write(`${messages.join("\n")}\n`);
  process.exitCode = 1;
  throw new Error("Validation failed");
};

const ok = (name: string): void => {
  Bun.stdout.write(`${name} passed\n`);
};

export type { JsonField, JsonRecord, JsonValue };
export {
  baohausRoot,
  catalog,
  catalogPath,
  fail,
  ignoredSegments,
  ok,
  packageFiles,
  readJson,
  repoRoot,
  requireJsonRecord,
};
