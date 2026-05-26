import { loadCatalog } from "../catalog.ts";
import { logError, logInfo } from "../logger.ts";
import {
  isManifestParityEqual,
  loadPackageBaoGovernanceManifest,
  renderPackageBaoGovernanceManifest,
} from "../manifest.ts";

const GATE_NAME = "manifest-parity";

export async function runManifestParityGate(packageName?: string): Promise<number> {
  const catalog = await loadCatalog();
  const issues: Array<{ id: string; reason: string }> = [];
  const entries =
    packageName === undefined
      ? catalog.packages
      : catalog.packages.filter((entry) => entry.packageName === packageName);

  if (entries.length === 0) {
    logError(GATE_NAME, "Package missing from catalog", { packageName });
    return 1;
  }

  for (const entry of entries) {
    const manifest = await loadPackageBaoGovernanceManifest(entry);
    if (!manifest) {
      issues.push({ id: entry.id, reason: "missing-bao-manifest" });
      continue;
    }
    const expected = renderPackageBaoGovernanceManifest(entry);
    if (!isManifestParityEqual(manifest, expected)) {
      issues.push({ id: entry.id, reason: "manifest-drift" });
    }
  }

  if (issues.length > 0) {
    logError(GATE_NAME, "Package bao-governance.json files drift from catalog", { issues });
    return 1;
  }

  logInfo(GATE_NAME, "Package manifests match the catalog", { entries: entries.length });
  return 0;
}
