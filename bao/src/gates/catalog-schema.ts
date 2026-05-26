import { type CatalogPackageEntry, loadCatalog } from "../catalog.ts";
import { isJsonObject, readJsonFile } from "../fs.ts";
import { logError, logInfo } from "../logger.ts";
import { resolvePackageJsonPath } from "../package-json.ts";

const GATE_NAME = "catalog-schema";

function sortedUnique(values: readonly string[]): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

async function readPackageExportSubpaths(entry: CatalogPackageEntry): Promise<string[]> {
  const packageJson = await readJsonFile(resolvePackageJsonPath(entry));
  if (!(isJsonObject(packageJson) && isJsonObject(packageJson.exports))) {
    return [];
  }
  return sortedUnique(Object.keys(packageJson.exports));
}

export async function validatePackageExportParity(entry: CatalogPackageEntry): Promise<string[]> {
  const packageExportSubpaths = await readPackageExportSubpaths(entry);
  const catalogExportSubpaths = sortedUnique(entry.exportSubpaths);
  const missingFromCatalog = packageExportSubpaths.filter(
    (subpath) => !catalogExportSubpaths.includes(subpath),
  );
  const staleCatalogExports = catalogExportSubpaths.filter(
    (subpath) => !packageExportSubpaths.includes(subpath),
  );
  const stalePublicEntrypoints = sortedUnique(entry.publicEntrypoints).filter(
    (subpath) => subpath !== "." && !catalogExportSubpaths.includes(subpath),
  );
  const failures: string[] = [];

  if (missingFromCatalog.length > 0) {
    failures.push(
      `${entry.id}: package exports missing from catalog: ${missingFromCatalog.join(", ")}`,
    );
  }

  if (staleCatalogExports.length > 0) {
    failures.push(
      `${entry.id}: catalog exports missing from package.json: ${staleCatalogExports.join(", ")}`,
    );
  }

  if (stalePublicEntrypoints.length > 0) {
    failures.push(
      `${entry.id}: public entrypoints missing from exportSubpaths: ${stalePublicEntrypoints.join(", ")}`,
    );
  }

  return failures;
}

export async function runCatalogSchemaGate(): Promise<number> {
  const catalogResult = await loadCatalog().then(
    (value) => ({ ok: true as const, value }),
    (error) => ({
      ok: false as const,
      error: error instanceof Error ? error.message : String(error),
    }),
  );

  if (!catalogResult.ok) {
    logError(GATE_NAME, "Catalog failed shape validation", { error: catalogResult.error });
    return 1;
  }

  const failures: string[] = [];
  for (const entry of catalogResult.value.packages) {
    failures.push(...(await validatePackageExportParity(entry)));
  }

  if (failures.length > 0) {
    logError(GATE_NAME, "Catalog package export parity failed", {
      count: failures.length,
      failures,
    });
    return 1;
  }

  logInfo(GATE_NAME, "Catalog schema is valid", {
    entries: catalogResult.value.packages.length,
  });
  return 0;
}
