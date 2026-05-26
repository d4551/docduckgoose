import { resolve } from "node:path";
import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { REPO_ROOT } from "../constants.ts";
import { isJsonObject, type JsonObject, type JsonValue, readJsonFile } from "../fs.ts";
import { logError, logInfo } from "../logger.ts";

const GATE_NAME = "package-repos-parity";
const PACKAGE_REPOS_PATH = resolve(REPO_ROOT, "bao-source", "package-repos.json");
const SOURCE_REPO_ROOT_PREFIX = "../bao-source/";
const SOURCE_PACKAGE_REPO_PREFIX = "./";

interface SourcePackageRepoEntry {
  id: string;
  repo: string;
  registryRequired: boolean;
}

interface SourcePackageReposFile {
  packages: SourcePackageRepoEntry[];
}

function isSourcePackageRepoEntry(value: JsonValue): value is JsonObject & SourcePackageRepoEntry {
  return (
    isJsonObject(value) &&
    typeof value.id === "string" &&
    typeof value.repo === "string" &&
    typeof value.registryRequired === "boolean"
  );
}

function isSourcePackageReposFile(value: JsonValue): value is JsonObject & SourcePackageReposFile {
  return (
    isJsonObject(value) &&
    Array.isArray(value.packages) &&
    value.packages.every((entry) => isSourcePackageRepoEntry(entry))
  );
}

function expectedPackageRepoPath(entry: CatalogPackageEntry): string {
  return `${SOURCE_PACKAGE_REPO_PREFIX}${entry.repoRoot.slice(SOURCE_REPO_ROOT_PREFIX.length)}`;
}

async function loadSourcePackageRepos(): Promise<SourcePackageReposFile> {
  const value = await readJsonFile(PACKAGE_REPOS_PATH);
  if (isSourcePackageReposFile(value)) {
    return value;
  }
  throw new Error(`${PACKAGE_REPOS_PATH} has an invalid shape`);
}

export async function runPackageReposParityGate(): Promise<number> {
  const catalog = await loadCatalog();
  const packageRepos = await loadSourcePackageRepos();
  const sourceCatalogEntries = catalog.packages.filter((entry) =>
    entry.repoRoot.startsWith(SOURCE_REPO_ROOT_PREFIX),
  );
  const entriesById = new Map(packageRepos.packages.map((entry) => [entry.id, entry]));
  const catalogEntriesById = new Map(sourceCatalogEntries.map((entry) => [entry.id, entry]));
  const failures: string[] = [];

  for (const catalogEntry of sourceCatalogEntries) {
    const packageRepoEntry = entriesById.get(catalogEntry.id);
    const expectedRepo = expectedPackageRepoPath(catalogEntry);

    if (!packageRepoEntry) {
      failures.push(`${catalogEntry.id}: missing from bao-source/package-repos.json`);
      continue;
    }

    if (packageRepoEntry.repo !== expectedRepo) {
      failures.push(
        `${catalogEntry.id}: repo must be ${expectedRepo}, found ${packageRepoEntry.repo}`,
      );
    }

    if (!packageRepoEntry.registryRequired) {
      failures.push(`${catalogEntry.id}: registryRequired must be true`);
    }
  }

  for (const packageRepoEntry of packageRepos.packages) {
    if (!catalogEntriesById.has(packageRepoEntry.id)) {
      failures.push(
        `${packageRepoEntry.id}: package-repos entry missing from bao-packages catalog`,
      );
    }
  }

  if (failures.length > 0) {
    logError(GATE_NAME, "Source package registry catalog drift detected", {
      count: failures.length,
      failures,
    });
    return 1;
  }

  logInfo(GATE_NAME, "Source package repos match catalog", {
    sourceCatalogPackages: sourceCatalogEntries.length,
  });
  return 0;
}
