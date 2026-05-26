import { join } from "node:path";
import { type CatalogFile, type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { PACKAGE_SOURCE_ROOT, REPO_ROOT } from "../constants.ts";
import { inspectPath, listEntries } from "../fs.ts";
import { logError, logInfo } from "../logger.ts";

const GATE_NAME = "boundaries";

interface BoundaryIssue {
  id: string;
  reason: string;
  detail?: string;
}

function inspectCatalogEntry(entry: CatalogPackageEntry, issues: BoundaryIssue[]): void {
  const isNestedWorkspace = entry.layoutVariant === "nested-workspace";
  const isUnderPackageRoot = entry.targetSourceProjectPath.startsWith(`${PACKAGE_SOURCE_ROOT}/`);
  if (!(isNestedWorkspace || isUnderPackageRoot)) {
    issues.push({
      id: entry.id,
      reason: "target-path-outside-bao-source",
      detail: entry.targetSourceProjectPath,
    });
    return;
  }
  if (!entry.ociRepository.startsWith("baohaus/")) {
    issues.push({ id: entry.id, reason: "oci-repo-not-under-baohaus" });
  }
  if (entry.packageName !== `@baohaus/${entry.id}`) {
    issues.push({ id: entry.id, reason: "package-name-mismatch" });
  }
}

async function inspectOrphanDirectories(
  catalog: CatalogFile,
  issues: BoundaryIssue[],
): Promise<void> {
  const sourceRoot = join(REPO_ROOT, PACKAGE_SOURCE_ROOT);
  const existence = await inspectPath(sourceRoot);
  if (!existence.isDirectory) {
    return;
  }
  const directoryEntries = await listEntries(sourceRoot);
  const catalogIds = new Set(catalog.packages.map((entry) => entry.id));
  for (const directoryEntry of directoryEntries) {
    if (directoryEntry.startsWith(".") || directoryEntry === "README.md") {
      continue;
    }
    if (!catalogIds.has(directoryEntry)) {
      issues.push({
        id: directoryEntry,
        reason: "orphan-package-src-directory",
        detail: `${PACKAGE_SOURCE_ROOT}/${directoryEntry}`,
      });
    }
  }
}

export async function runBoundariesGate(): Promise<number> {
  const catalog = await loadCatalog();
  const issues: BoundaryIssue[] = [];

  for (const entry of catalog.packages) {
    inspectCatalogEntry(entry, issues);
  }
  await inspectOrphanDirectories(catalog, issues);

  if (issues.length > 0) {
    logError(GATE_NAME, "Package source boundaries violated", { issues });
    return 1;
  }

  logInfo(GATE_NAME, "Package source boundaries are clean", {
    entries: catalog.packages.length,
  });
  return 0;
}
