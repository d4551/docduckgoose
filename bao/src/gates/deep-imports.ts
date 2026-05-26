import { join, relative } from "node:path";
import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { REPO_ROOT } from "../constants.ts";
import { logError, logInfo } from "../logger.ts";
import { findBaohausImports } from "./import-scanner.ts";

const GATE_NAME = "deep-imports";
const SAMPLE_LIMIT = 10;
const STRIP_DOT_SLASH = /^\.\//;

interface DeepImportIssue {
  file: string;
  packageId: string;
  subpath: string;
}

function buildAllowedSubpaths(entry: CatalogPackageEntry): Set<string> {
  const allowed = new Set<string>(entry.publicEntrypoints);
  for (const subpath of entry.publicEntrypoints) {
    allowed.add(subpath.replace(STRIP_DOT_SLASH, ""));
  }
  return allowed;
}

async function scanFile(
  filePath: string,
  owningPackageId: string | null,
  entriesById: Map<string, CatalogPackageEntry>,
): Promise<DeepImportIssue[]> {
  const content = await Bun.file(filePath).text();
  const imports = findBaohausImports(content);
  const issues: DeepImportIssue[] = [];
  for (const entry of imports) {
    if (entry.packageId === owningPackageId) {
      continue;
    }
    const target = entriesById.get(entry.packageId);
    if (!target) {
      continue;
    }
    const allowed = buildAllowedSubpaths(target);
    const stripped = entry.subpath.replace(STRIP_DOT_SLASH, "");
    if (!(allowed.has(entry.subpath) || allowed.has(stripped))) {
      issues.push({
        file: relative(REPO_ROOT, filePath),
        packageId: entry.packageId,
        subpath: entry.subpath,
      });
    }
  }
  return issues;
}

function buildScanGlobs(entries: readonly CatalogPackageEntry[]): string[] {
  const patterns = new Set<string>();
  for (const entry of entries) {
    patterns.add(`${entry.targetSourceProjectPath}/src/**/*.{ts,tsx}`);
    patterns.add(`${entry.targetSourceProjectPath}/tests/**/*.{ts,tsx}`);
  }
  return [...patterns].sort((left, right) => left.localeCompare(right));
}

function resolveOwningPackageId(
  relativeFilePath: string,
  entries: readonly CatalogPackageEntry[],
): string | null {
  const normalizedPath = relativeFilePath.replaceAll("\\", "/");
  for (const entry of entries) {
    if (normalizedPath.startsWith(`${entry.targetSourceProjectPath}/`)) {
      return entry.id;
    }
  }
  return null;
}

export async function runDeepImportsGate(): Promise<number> {
  const catalog = await loadCatalog();
  const entriesById = new Map(catalog.packages.map((entry) => [entry.id, entry] as const));

  const scanGlobs = buildScanGlobs(catalog.packages);
  if (scanGlobs.length === 0) {
    logInfo(GATE_NAME, "No package source directories declared in the catalog");
    return 0;
  }

  const allIssues: DeepImportIssue[] = [];
  for (const globPattern of scanGlobs) {
    const glob = new Bun.Glob(globPattern);
    for await (const match of glob.scan({ cwd: REPO_ROOT })) {
      const absolutePath = join(REPO_ROOT, match);
      const owningPackageId = resolveOwningPackageId(match, catalog.packages);
      allIssues.push(...(await scanFile(absolutePath, owningPackageId, entriesById)));
    }
  }

  if (allIssues.length > 0) {
    logError(GATE_NAME, "Deep imports into non-public subpaths detected", {
      count: allIssues.length,
      samples: allIssues.slice(0, SAMPLE_LIMIT),
    });
    return 1;
  }

  logInfo(GATE_NAME, "No deep cross-package imports detected");
  return 0;
}
