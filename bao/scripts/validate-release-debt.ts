type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonField = JsonValue | undefined;
interface JsonObject {
  readonly [key: string]: JsonField;
}
type JsonRecord = JsonObject;
const TRAILING_SLASH_PATTERN = /[\\/]$/;

const trimTrailingSlash = (path: string): string => path.replace(TRAILING_SLASH_PATTERN, "");
const repoRootPath = trimTrailingSlash(Bun.fileURLToPath(new URL("../..", import.meta.url)));

interface DebtRule {
  name: string;
  pattern: RegExp;
}

const pathExcludes = [
  "/node_modules/",
  "/dist/",
  "/build/",
  "/.git/",
  "/.bao-build/",
  "/generated/",
  "/prisma/generated/",
  "/vendor/",
  "/app.contract.generated",
  "/app.contract.metadata.generated",
  "/validate-release-debt.ts",
];

const fileExtensions = new Set([
  ".css",
  ".html",
  ".json",
  ".prisma",
  ".plist",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);
const scanGlobs = [
  "README.md",
  "docs/**/*",
  "bao-packages/**/*.json",
  "bao/{src,scripts,schemas}/**/*",
  "bao/*.{json,ts,md}",
  "forge/{src,scripts,docs,prisma}/**/*",
  "forge/*.{json,ts,md,css}",
  "registry/{src,scripts,docs,prisma}/**/*",
  "registry/*.{json,ts,md,css}",
  "bao-runtime/{src,scripts,docs,prisma,tests}/**/*",
  "bao-runtime/*.{json,ts,md,css,prisma}",
  "bao-source/*/{src,scripts,docs,prisma}/**/*",
  "bao-source/*/*.{json,ts,md,css,prisma}",
] as const;
const packageArchiveScriptPattern =
  /^(?:(?:bao|forge|registry|bao-runtime)|bao-source\/[^/]+)\/scripts\/bao-(?:build|validate)\.ts$/u;
const retiredArchiveSidecarPattern = /\bmanifest\.(?:json|sha256|signature)\b/u;

function literal(value: string): RegExp {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "u");
}

function either(parts: readonly string[]): RegExp {
  return new RegExp(parts.map((part) => literal(part).source).join("|"), "u");
}

const oldManifestName = ["bao", "manifest", "json"].join(".");
const oldArchiveOutputPath = ["dist", ["dump", "lingify"].join("")].join("/");
const oldArchiveMedia = ["application/vnd", "baohaus", "bao", "v1+tar"].join(".");
const oldRegistryName = [["pan", "try"].join(""), "pao"].join("-");
const debtTerms = [
  ["temporary", "shim"].join(" "),
  ["temporary", "bridge"].join(" "),
  ["legacy", "shim"].join(" "),
  ["legacy", "bridge"].join(" "),
  ["compatibility", "bridge"].join(" "),
  ["debt", "creating", "wrapper"].join("-"),
  [["mon", "key"].join(""), "patch"].join(" "),
];

const rules: readonly DebtRule[] = [
  { name: "biome-suppression", pattern: literal(["biome", "ignore"].join("-")) },
  { name: "ts-ignore", pattern: literal(["@ts", "ignore"].join("-")) },
  { name: "ts-expect-error", pattern: literal(["@ts", "expect", "error"].join("-")) },
  { name: "explicit-any-cast", pattern: /\bas\s+any\b/u },
  {
    name: "double-unknown-cast",
    pattern: new RegExp(`\\bas\\s+${["un", "known"].join("")}\\s+as\\b`, "u"),
  },
  { name: "ignored-shell-failure", pattern: /\|\|\s*true/u },
  { name: "soft-test-pass-with-no-tests", pattern: literal("--pass-with-no-tests") },
  { name: "cdn-url", pattern: /https?:\/\/[^\s"'`)]*cdn[^\s"'`)]*/iu },
  {
    name: "retired-registry-name",
    pattern: either([oldRegistryName, oldRegistryName.replace("-", "/")]),
  },
  { name: "retired-governance-name", pattern: literal(oldManifestName) },
  { name: "retired-archive-output-path", pattern: literal(oldArchiveOutputPath) },
  { name: "retired-archive-media", pattern: literal(oldArchiveMedia) },
  {
    name: "migration-version",
    pattern: new RegExp(`-${["mi", "grate"].join("")}\\.\\d{8}\\.\\d+`, "u"),
  },
  { name: "debt-language", pattern: new RegExp(`\\b(?:${debtTerms.join("|")})s?\\b`, "iu") },
];

function isRecord(value: JsonField): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isUnknownArray(value: JsonField): value is JsonValue[] {
  return Array.isArray(value);
}

function recordField(record: JsonRecord, key: string): JsonField {
  return record[key];
}

function packageKey(record: JsonRecord): string | null {
  const name = recordField(record, "name");
  const version = recordField(record, "version");
  if (typeof name !== "string" || typeof version !== "string") {
    return null;
  }
  return `${name}@${version}`;
}

function hasNullTrustField(record: JsonRecord): boolean {
  return (
    recordField(record, "ociDigest") === null ||
    recordField(record, "integrity") === null ||
    recordField(record, "signature") === null
  );
}

async function readJsonRecord(path: string): Promise<JsonRecord> {
  const value = await Bun.file(`${repoRootPath}/${path}`).json();
  if (!isRecord(value)) {
    throw new Error(`${path}: JSON root must be object`);
  }
  return value;
}

function collectResolvedByPackage(resolved: readonly JsonValue[]): Map<string, JsonRecord> {
  const resolvedByPackage = new Map<string, JsonRecord>();
  for (const entry of resolved) {
    if (!isRecord(entry)) {
      continue;
    }
    const key = packageKey(entry);
    if (key !== null) {
      resolvedByPackage.set(key, entry);
    }
  }
  return resolvedByPackage;
}

function collectDependencyTrustViolations(
  dependencies: readonly JsonValue[],
  resolvedByPackage: ReadonlyMap<string, JsonRecord>,
  path: string,
): string[] {
  const violations: string[] = [];
  for (const dependency of dependencies) {
    if (!(isRecord(dependency) && hasNullTrustField(dependency))) {
      continue;
    }
    const key = packageKey(dependency);
    const resolution = key === null ? undefined : resolvedByPackage.get(key);
    if (!resolution || recordField(resolution, "resolvedFrom") !== "pending-publish") {
      violations.push(`null-trust-field: ${path} ${key ?? "unresolved dependency"}`);
    }
  }
  return violations;
}

function collectResolvedTrustViolations(
  resolvedByPackage: ReadonlyMap<string, JsonRecord>,
  lockPath: string,
): string[] {
  const violations: string[] = [];
  for (const entry of resolvedByPackage.values()) {
    if (recordField(entry, "resolvedFrom") === "oci-registry" && hasNullTrustField(entry)) {
      violations.push(
        `null-trust-field: ${lockPath} ${packageKey(entry) ?? "unresolved dependency"}`,
      );
    }
  }
  return violations;
}

async function validatePendingTrust(path: string, violations: string[]): Promise<void> {
  const normalizedPath = path.replaceAll("\\", "/");
  const manifest = await readJsonRecord(normalizedPath);
  const dependencies = recordField(manifest, "dependencies");
  if (!isUnknownArray(dependencies)) {
    return;
  }

  const lockPath = `${normalizedPath.slice(0, normalizedPath.lastIndexOf("/") + 1)}bao.lock`;
  const lock = await readJsonRecord(lockPath);
  const resolved = recordField(lock, "resolved");
  if (!isUnknownArray(resolved)) {
    violations.push(`trust-resolution: ${lockPath} resolved must be array`);
    return;
  }

  const resolvedByPackage = collectResolvedByPackage(resolved);
  violations.push(
    ...collectDependencyTrustViolations(dependencies, resolvedByPackage, normalizedPath),
  );
  violations.push(...collectResolvedTrustViolations(resolvedByPackage, lockPath));
}

function hasIncludedExtension(path: string): boolean {
  const dotIndex = path.lastIndexOf(".");
  return dotIndex >= 0 && fileExtensions.has(path.slice(dotIndex));
}

function shouldScan(path: string): boolean {
  const normalized = `/${path.replaceAll("\\", "/")}`;
  return (
    hasIncludedExtension(normalized) &&
    !pathExcludes.some((exclude) => normalized.includes(exclude))
  );
}

function collectConditionalViolations(path: string, text: string): string[] {
  const normalized = path.replaceAll("\\", "/");
  if (packageArchiveScriptPattern.test(normalized) && retiredArchiveSidecarPattern.test(text)) {
    return [`retired-archive-sidecar-name: ${path}`];
  }
  return [];
}

const violations: string[] = [];
const scanPaths = new Set<string>();

for (const pattern of scanGlobs) {
  for await (const path of new Bun.Glob(pattern).scan({ cwd: repoRootPath, onlyFiles: true })) {
    scanPaths.add(path);
  }
}

for (const path of scanPaths) {
  if (!shouldScan(path)) {
    continue;
  }

  const text = await Bun.file(`${repoRootPath}/${path}`).text();
  for (const rule of rules) {
    if (rule.pattern.test(text)) {
      violations.push(`${rule.name}: ${path}`);
    }
  }
  violations.push(...collectConditionalViolations(path, text));
  if (path.endsWith("bao-governance.json")) {
    await validatePendingTrust(path, violations);
  }
}

if (violations.length > 0) {
  throw new Error(`Release debt scan failed:\n${violations.join("\n")}`);
}

Bun.stdout.write("release debt scan passed\n");
