import { existsSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { CATALOG_FILE_PATH, REPO_ROOT } from "../constants.ts";
import { logError, logInfo } from "../logger.ts";

const GATE_NAME = "no-checkedin-bao";

const decoder = new TextDecoder();
const GIT_PATH_SEPARATOR_PATTERN = /\\/g;
const NULL_BYTE = "\0";
const DOT_SLASH_PATTERN = /^\.\//;
const PARENT_DIRECTORY_PREFIX_PATTERN = /^(\.\.\/)+/;
const TRACKED_BAO_BUILD_PATTERN = /(^|\/)\.bao-build\//;
const TRACKED_DS_STORE_PATTERN = /(^|\/)\.DS_Store$/;
const TRACKED_BAO_SCRIPT_JS_PATTERN = /^bao\/scripts\/.*\.js$/;
const TRACKED_BAO_ARCHIVE_PATTERN = /\.bao$/;
const TRACKED_BAO_FIXTURE_PATTERN = /\/(tests?|fixtures)\//;

function normalizeRepoPath(path: string): string {
  return path.replace(GIT_PATH_SEPARATOR_PATTERN, "/").replace(DOT_SLASH_PATTERN, "");
}

function canonicalArchivePath(entry: CatalogPackageEntry): string {
  const resolvedPath = resolve(dirname(CATALOG_FILE_PATH), entry.canonicalBaoOutputPath);
  return normalizeRepoPath(relative(REPO_ROOT, resolvedPath).split(sep).join("/"));
}

function readTrackedFiles(): string[] {
  const result = Bun.spawnSync(["git", "ls-files", "-z"], {
    cwd: REPO_ROOT,
    stdout: "pipe",
    stderr: "pipe",
  });
  if (result.exitCode !== 0) {
    throw new Error(decoder.decode(result.stderr).trim());
  }
  return decoder
    .decode(result.stdout)
    .split(NULL_BYTE)
    .filter((path) => path.length > 0)
    .map(normalizeRepoPath);
}

function archivePolicyPath(path: string): string {
  return normalizeRepoPath(path).replace(PARENT_DIRECTORY_PREFIX_PATTERN, "");
}

function trackedFileExists(path: string): boolean {
  return existsSync(resolve(REPO_ROOT, path));
}

export function collectTrackedArtifactViolations(
  trackedFiles: readonly string[],
  allowedBaoArchivePaths: ReadonlySet<string>,
): string[] {
  const violations: string[] = [];
  for (const trackedFile of trackedFiles.map(archivePolicyPath)) {
    if (TRACKED_BAO_BUILD_PATTERN.test(trackedFile)) {
      violations.push(`${trackedFile}: .bao-build artifacts must not be tracked`);
    }
    if (TRACKED_DS_STORE_PATTERN.test(trackedFile)) {
      violations.push(`${trackedFile}: .DS_Store must not be tracked`);
    }
    if (TRACKED_BAO_SCRIPT_JS_PATTERN.test(trackedFile)) {
      violations.push(`${trackedFile}: generated JavaScript sibling must not be tracked`);
    }
    if (
      TRACKED_BAO_ARCHIVE_PATTERN.test(trackedFile) &&
      !TRACKED_BAO_FIXTURE_PATTERN.test(trackedFile) &&
      !allowedBaoArchivePaths.has(trackedFile)
    ) {
      violations.push(`${trackedFile}: .bao archive is not a catalog canonicalBaoOutputPath`);
    }
  }
  return violations;
}

export async function runNoCheckedInBaoGate(): Promise<number> {
  const catalog = await loadCatalog();
  const allowedBaoArchivePaths = new Set(
    catalog.packages.map((entry) => archivePolicyPath(canonicalArchivePath(entry))),
  );
  const violations = collectTrackedArtifactViolations(
    readTrackedFiles().filter(trackedFileExists),
    allowedBaoArchivePaths,
  );

  if (violations.length > 0) {
    logError(GATE_NAME, "Tracked generated artifacts failed policy", {
      count: violations.length,
      samples: violations.slice(0, 10),
    });
    return 1;
  }

  logInfo(GATE_NAME, "Tracked generated artifact policy passed", {
    allowedBaoArchives: allowedBaoArchivePaths.size,
  });
  return 0;
}
