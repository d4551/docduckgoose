import { dirname, join, relative, resolve } from "node:path";
import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { PLATFORM_REGISTRY_ROOT, REPO_ROOT } from "../constants.ts";
import { inspectPath } from "../fs.ts";
import { logError, logInfo } from "../logger.ts";
import { findBaohausImports, findRelativeImports } from "./import-scanner.ts";

const GATE_NAME = "registry-consumption";
const SAMPLE_LIMIT = 10;
const STRIP_DOT_SLASH = /^\.\//;

const REGISTRY_ROOT_ABSOLUTE = join(REPO_ROOT, PLATFORM_REGISTRY_ROOT);

interface RegistryIssue {
  file: string;
  reason: "escapes-registry" | "deep-baohaus-import";
  detail: string;
}

function buildAllowedSubpaths(entry: CatalogPackageEntry): Set<string> {
  const allowed = new Set<string>(entry.publicEntrypoints);
  for (const subpath of entry.publicEntrypoints) {
    allowed.add(subpath.replace(STRIP_DOT_SLASH, ""));
  }
  return allowed;
}

function isOutsideRegistry(filePath: string, specifier: string): boolean {
  const resolved = resolve(dirname(filePath), specifier);
  const relativeToRegistry = relative(REGISTRY_ROOT_ABSOLUTE, resolved);
  return relativeToRegistry.startsWith("..") || relativeToRegistry.startsWith("/");
}

async function scanFile(
  filePath: string,
  entriesById: Map<string, CatalogPackageEntry>,
): Promise<RegistryIssue[]> {
  const content = await Bun.file(filePath).text();
  const issues: RegistryIssue[] = [];

  for (const relativeImport of findRelativeImports(content)) {
    if (isOutsideRegistry(filePath, relativeImport.specifier)) {
      issues.push({
        file: relative(REPO_ROOT, filePath),
        reason: "escapes-registry",
        detail: relativeImport.specifier,
      });
    }
  }

  for (const baohausImport of findBaohausImports(content)) {
    const target = entriesById.get(baohausImport.packageId);
    if (!target) {
      continue;
    }
    const allowed = buildAllowedSubpaths(target);
    const stripped = baohausImport.subpath.replace(STRIP_DOT_SLASH, "");
    if (!(allowed.has(baohausImport.subpath) || allowed.has(stripped))) {
      issues.push({
        file: relative(REPO_ROOT, filePath),
        reason: "deep-baohaus-import",
        detail:
          baohausImport.subpath === "."
            ? `@baohaus/${baohausImport.packageId}`
            : `@baohaus/${baohausImport.packageId}/${stripped}`,
      });
    }
  }

  return issues;
}

export async function runRegistryConsumptionGate(): Promise<number> {
  const existence = await inspectPath(REGISTRY_ROOT_ABSOLUTE);
  if (!existence.isDirectory) {
    logInfo(GATE_NAME, "Registry target not populated yet");
    return 0;
  }

  const catalog = await loadCatalog();
  const entriesById = new Map(catalog.packages.map((entry) => [entry.id, entry] as const));
  const allIssues: RegistryIssue[] = [];

  const glob = new Bun.Glob(`${PLATFORM_REGISTRY_ROOT}/**/*.{ts,tsx}`);
  for await (const match of glob.scan({ cwd: REPO_ROOT })) {
    if (
      match.includes("/node_modules/") ||
      match.includes("/dist/") ||
      match.endsWith(".d.ts") ||
      match.endsWith(".test.ts") ||
      match.endsWith(".test.tsx") ||
      match.includes("/__tests__/") ||
      match.includes("/tests/")
    ) {
      continue;
    }
    const absolutePath = join(REPO_ROOT, match);
    allIssues.push(...(await scanFile(absolutePath, entriesById)));
  }

  if (allIssues.length > 0) {
    logError(GATE_NAME, "Registry uses forbidden import paths", {
      count: allIssues.length,
      samples: allIssues.slice(0, SAMPLE_LIMIT),
    });
    return 1;
  }

  logInfo(GATE_NAME, "Registry consumption paths are clean");
  return 0;
}
