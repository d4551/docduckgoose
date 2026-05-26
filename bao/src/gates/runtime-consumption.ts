import { dirname, join, relative, resolve } from "node:path";
import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { PLATFORM_RUNTIME_ROOT, REPO_ROOT } from "../constants.ts";
import { inspectPath } from "../fs.ts";
import { logError, logInfo } from "../logger.ts";
import { findBaohausImports, findRelativeImports } from "./import-scanner.ts";

const GATE_NAME = "runtime-consumption";
const SAMPLE_LIMIT = 10;
const STRIP_DOT_SLASH = /^\.\//;

const RUNTIME_SOURCE_ROOT = `${PLATFORM_RUNTIME_ROOT}/src`;
const RUNTIME_ROOT_ABSOLUTE = join(REPO_ROOT, PLATFORM_RUNTIME_ROOT);

interface RuntimeIssue {
  file: string;
  reason: "escapes-runtime" | "deep-baohaus-import";
  detail: string;
}

function buildAllowedSubpaths(entry: CatalogPackageEntry): Set<string> {
  const allowed = new Set<string>(entry.publicEntrypoints);
  for (const subpath of entry.publicEntrypoints) {
    allowed.add(subpath.replace(STRIP_DOT_SLASH, ""));
  }
  return allowed;
}

function isOutsideRuntime(filePath: string, specifier: string): boolean {
  const resolved = resolve(dirname(filePath), specifier);
  const relativeToRuntime = relative(RUNTIME_ROOT_ABSOLUTE, resolved);
  return relativeToRuntime.startsWith("..") || relativeToRuntime.startsWith("/");
}

async function scanFile(
  filePath: string,
  entriesById: Map<string, CatalogPackageEntry>,
): Promise<RuntimeIssue[]> {
  const content = await Bun.file(filePath).text();
  const issues: RuntimeIssue[] = [];

  for (const relativeImport of findRelativeImports(content)) {
    if (isOutsideRuntime(filePath, relativeImport.specifier)) {
      issues.push({
        file: relative(REPO_ROOT, filePath),
        reason: "escapes-runtime",
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

export async function runRuntimeConsumptionGate(): Promise<number> {
  const existence = await inspectPath(RUNTIME_ROOT_ABSOLUTE);
  if (!existence.isDirectory) {
    logInfo(GATE_NAME, "Runtime target not populated yet");
    return 0;
  }

  const catalog = await loadCatalog();
  const entriesById = new Map(catalog.packages.map((entry) => [entry.id, entry] as const));
  const allIssues: RuntimeIssue[] = [];

  const glob = new Bun.Glob(`${RUNTIME_SOURCE_ROOT}/**/*.{ts,tsx}`);
  for await (const match of glob.scan({ cwd: REPO_ROOT })) {
    if (
      match.includes("/node_modules/") ||
      match.includes("/dist/") ||
      match.endsWith(".d.ts") ||
      match.endsWith(".test.ts") ||
      match.endsWith(".test.tsx") ||
      match.includes("/__tests__/") ||
      match.includes("/test/")
    ) {
      continue;
    }
    const absolutePath = join(REPO_ROOT, match);
    allIssues.push(...(await scanFile(absolutePath, entriesById)));
  }

  if (allIssues.length > 0) {
    logError(GATE_NAME, "Runtime uses forbidden import paths", {
      count: allIssues.length,
      samples: allIssues.slice(0, SAMPLE_LIMIT),
    });
    return 1;
  }

  logInfo(GATE_NAME, "Runtime consumption paths are clean", {
    knownPackageNames: catalog.packages.length,
  });
  return 0;
}
