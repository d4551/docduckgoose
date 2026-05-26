import { loadCatalog } from "../catalog.ts";
import { logError, logInfo } from "../logger.ts";

const GATE_NAME = "ci-oci-path";
const OCI_SAMPLE_LIMIT = 5;

export async function runCiOciPathGate(): Promise<number> {
  const catalog = await loadCatalog();

  const publicEntries = catalog.packages.filter((entry) => entry.channel === "public");
  const internalEntries = catalog.packages.filter((entry) => entry.channel === "internal");
  const composedEntries = catalog.packages.filter((entry) => entry.composeDependencies.length > 0);

  const coverage = {
    public: publicEntries.length,
    internal: internalEntries.length,
    composed: composedEntries.length,
  };

  if (publicEntries.length === 0) {
    logError(GATE_NAME, "Catalog has no public packages to smoke-test", { coverage });
    return 1;
  }

  const missingOciRepo = catalog.packages.filter(
    (entry) => entry.ociRepository !== `baohaus/${entry.id}`,
  );
  if (missingOciRepo.length > 0) {
    logError(GATE_NAME, "Catalog entries have inconsistent OCI repositories", {
      samples: missingOciRepo.slice(0, OCI_SAMPLE_LIMIT).map((entry) => entry.id),
    });
    return 1;
  }

  logInfo(GATE_NAME, "CI OCI coverage preconditions satisfied", { coverage });
  return 0;
}
