/**
 * Cross-workspace package-contract identity coverage.
 *
 * Asserts every workspace package shipping a `src/package-descriptor.ts`
 * keeps `package.json`, `bao-governance.json`, and `bao.lock` aligned by id.
 * Per-package suites in each package's `tests/package-contracts.test.ts`
 * still own domain-specific assertions; this file guarantees the universal
 * contract holds for packages that have not yet authored a per-package suite.
 */

import { describe, expect, test } from "bun:test";
import {
  baohausRoot,
  packageFiles,
  readJson,
  requireJsonRecord,
} from "../scripts/policy/shared.ts";

interface PackageManifestSubset {
  readonly name: string;
}

interface GovernanceIdentity {
  readonly id: string;
}

interface GovernanceSubset {
  readonly identity: GovernanceIdentity;
}

interface BaoLockSubset {
  readonly id: string;
  readonly packageName: string;
}

interface DescriptorPackage {
  readonly relDir: string;
  readonly manifestRelPath: string;
}

const collected: DescriptorPackage[] = [];
const SKIPPED_DIR_SEGMENTS = new Set([
  "node_modules",
  "dist",
  ".bao-build",
  "coverage",
  "artifacts",
]);

function readNonEmptyString(value: unknown, owner: string, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${owner}: ${field} must be a non-empty string`);
  }
  return value;
}

function isManifestSubset(
  record: ReturnType<typeof requireJsonRecord>,
  file: string,
): PackageManifestSubset {
  return { name: readNonEmptyString(record.name, file, "name") };
}

function isGovernanceSubset(
  record: ReturnType<typeof requireJsonRecord>,
  file: string,
): GovernanceSubset {
  const identity = requireJsonRecord(record.identity, `${file}.identity`);
  return {
    identity: { id: readNonEmptyString(identity.id, file, "identity.id") },
  };
}

function isBaoLockSubset(
  record: ReturnType<typeof requireJsonRecord>,
  file: string,
): BaoLockSubset {
  return {
    id: readNonEmptyString(record.id, file, "id"),
    packageName: readNonEmptyString(record.packageName, file, "packageName"),
  };
}

for (const manifestPath of await packageFiles()) {
  const segments = manifestPath.split("/");
  if (segments.some((segment) => SKIPPED_DIR_SEGMENTS.has(segment))) {
    continue;
  }
  const relDir = manifestPath.replace(/\/package\.json$/, "");
  const descriptorAbs = `${baohausRoot}/${relDir}/src/package-descriptor.ts`;
  if (!(await Bun.file(descriptorAbs).exists())) {
    continue;
  }
  // Skip private workspace roots (no governance / lock by design)
  const governanceExists = await Bun.file(`${baohausRoot}/${relDir}/bao-governance.json`).exists();
  if (!governanceExists) {
    continue;
  }
  collected.push({ relDir, manifestRelPath: manifestPath });
}

describe("package-contract identity alignment (cross-workspace)", () => {
  test("at least one descriptor was discovered", () => {
    expect(collected.length).toBeGreaterThan(0);
  });

  for (const pkg of collected) {
    test(`${pkg.relDir} aligns package.json, bao-governance.json, and bao.lock by id`, async () => {
      const manifestRecord = requireJsonRecord(
        await readJson(`${baohausRoot}/${pkg.manifestRelPath}`),
        pkg.manifestRelPath,
      );
      const manifest = isManifestSubset(manifestRecord, pkg.manifestRelPath);

      const governanceRelPath = `${pkg.relDir}/bao-governance.json`;
      const governanceFile = Bun.file(`${baohausRoot}/${governanceRelPath}`);
      expect(await governanceFile.exists()).toBe(true);
      const governanceRecord = requireJsonRecord(
        await readJson(`${baohausRoot}/${governanceRelPath}`),
        governanceRelPath,
      );
      const governance = isGovernanceSubset(governanceRecord, governanceRelPath);

      const lockRelPath = `${pkg.relDir}/bao.lock`;
      const lockFile = Bun.file(`${baohausRoot}/${lockRelPath}`);
      expect(await lockFile.exists()).toBe(true);
      const lockRecord = requireJsonRecord(
        await readJson(`${baohausRoot}/${lockRelPath}`),
        lockRelPath,
      );
      const lock = isBaoLockSubset(lockRecord, lockRelPath);

      expect(manifest.name).toBe(`@baohaus/${governance.identity.id}`);
      expect(lock.id).toBe(governance.identity.id);
      expect(lock.packageName).toBe(manifest.name);
    });
  }
});
