import { readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import type { CatalogPackageEntry } from "./catalog.ts";
import type { CatalogPackageKind } from "./constants.ts";
import { CATALOG_FILE_PATH, REPO_ROOT } from "./constants.ts";
import { isJsonObject, type JsonObject, type JsonValue, readJsonFile } from "./fs.ts";
import { isCatalogPackageKind, type PackageReadmeContext } from "./readme-contract.ts";
import { collectPackageSourceInsights } from "./readme-source-insights.ts";

const IGNORED_DIRECTORY_NAMES = new Set([
  "node_modules",
  "dist",
  ".bao-build",
  "vendor",
  ".git",
  "coverage",
  "artifacts",
]);

/** Aggregate/meta package roots — keep hand-authored README indexes. */
const EXCLUDED_PACKAGE_ROOTS = new Set([
  REPO_ROOT,
  resolve(REPO_ROOT, "bao-source"),
  resolve(REPO_ROOT, "bao-packages"),
]);

function normalizeRepoPath(absolutePath: string): string {
  return relative(REPO_ROOT, absolutePath).replaceAll("\\", "/");
}

function listExportSubpaths(exportsField: JsonValue | undefined): string[] {
  if (typeof exportsField === "string") {
    return ["."];
  }
  if (!isJsonObject(exportsField)) {
    return [];
  }
  return Object.keys(exportsField).sort((left, right) => left.localeCompare(right));
}

function listDependencies(packageJson: JsonObject): string[] {
  const names: string[] = [];
  for (const field of ["dependencies", "peerDependencies", "optionalDependencies"] as const) {
    const block = packageJson[field];
    if (isJsonObject(block)) {
      for (const key of Object.keys(block)) {
        names.push(key);
      }
    }
  }
  return [...new Set(names)].sort((left, right) => left.localeCompare(right));
}

async function fileExists(path: string): Promise<boolean> {
  return Bun.file(path).exists();
}

async function directoryHasRoutes(packageRoot: string): Promise<boolean> {
  const candidates = [
    join(packageRoot, "src", "routes"),
    join(packageRoot, "src", "http", "routes"),
  ];
  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      return true;
    }
  }
  return false;
}

function inferPackageKind(
  catalogEntry: CatalogPackageEntry | null,
  governanceKind: string | undefined,
): CatalogPackageKind {
  if (catalogEntry !== null) {
    return catalogEntry.packageKind;
  }
  if (governanceKind !== undefined && isCatalogPackageKind(governanceKind)) {
    return governanceKind;
  }
  return "library";
}

async function readGovernanceKind(packageRoot: string): Promise<string | undefined> {
  const path = join(packageRoot, "bao-governance.json");
  if (!(await fileExists(path))) {
    return undefined;
  }
  const value = await readJsonFile(path);
  if (!isJsonObject(value)) {
    return undefined;
  }
  const classification = value.classification;
  if (!isJsonObject(classification)) {
    return undefined;
  }
  const kind = classification.packageKind;
  return typeof kind === "string" ? kind : undefined;
}

export function buildCatalogPathIndex(
  entries: readonly CatalogPackageEntry[],
): Map<string, CatalogPackageEntry> {
  const index = new Map<string, CatalogPackageEntry>();
  const catalogDir = dirname(CATALOG_FILE_PATH);
  for (const entry of entries) {
    const absolute = resolve(catalogDir, entry.targetSourceProjectPath);
    index.set(normalizeRepoPath(absolute), entry);
  }
  return index;
}

export async function buildPackageReadmeContext(
  packageRoot: string,
  catalogByPath: Map<string, CatalogPackageEntry>,
): Promise<PackageReadmeContext> {
  const absoluteRoot = resolve(packageRoot);
  const sourcePath = normalizeRepoPath(absoluteRoot);
  const catalogEntry = catalogByPath.get(sourcePath) ?? null;
  const packageJsonPath = join(absoluteRoot, "package.json");
  const packageJsonValue = await readJsonFile(packageJsonPath);
  if (!isJsonObject(packageJsonValue)) {
    throw new Error(`Invalid package.json: ${packageJsonPath}`);
  }
  const packageJson = packageJsonValue;
  const packageName =
    typeof packageJson.name === "string"
      ? packageJson.name
      : (catalogEntry?.packageName ?? sourcePath.split("/").pop() ?? "unknown");
  const description =
    typeof packageJson.description === "string" ? packageJson.description.trim() : "";
  const exportSubpaths =
    catalogEntry !== null && catalogEntry.exportSubpaths.length > 0
      ? catalogEntry.exportSubpaths
      : listExportSubpaths(packageJson.exports);
  const dependencies = listDependencies(packageJson);
  const hasElysia = dependencies.some((dep) => dep.includes("elysia"));
  const hasRoutes = await directoryHasRoutes(absoluteRoot);
  const governanceKind = await readGovernanceKind(absoluteRoot);
  const id =
    catalogEntry?.id ??
    packageName
      .replace(/^@baohaus\//, "")
      .replace(/^@/, "")
      .replace(/\//g, "-");

  const sourceInsights = await collectPackageSourceInsights(absoluteRoot, exportSubpaths);

  return {
    id,
    packageName,
    packageRoot: absoluteRoot,
    sourcePath,
    description,
    packageKind: inferPackageKind(catalogEntry, governanceKind),
    catalogEntry,
    exportSubpaths,
    dependencies,
    hasElysia,
    hasRoutes,
    sourceInsights,
  };
}

export async function discoverPackageRoots(): Promise<string[]> {
  const roots: string[] = [];

  async function walk(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORY_NAMES.has(entry.name)) {
          continue;
        }
        await walk(join(directory, entry.name));
        continue;
      }
      if (entry.isFile() && entry.name === "package.json") {
        const absolute = resolve(directory);
        if (!EXCLUDED_PACKAGE_ROOTS.has(absolute)) {
          roots.push(directory);
        }
      }
    }
  }

  await walk(REPO_ROOT);
  return roots.sort((left, right) => left.localeCompare(right));
}
