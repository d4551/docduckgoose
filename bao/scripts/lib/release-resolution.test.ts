import { describe, expect, test } from "bun:test";
import { collectUnresolvedReleaseDependencies } from "./release-resolution.ts";
import type { BaoLock, BaoLockResolved } from "./schema-guards.ts";

const digest = `sha256:${"a".repeat(64)}`;
const integrity = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
const signature = { provider: "sigstore", bundle: digest };

const resolvedDependency = (
  name: string,
  fields: Partial<BaoLockResolved> = {},
): BaoLockResolved => ({
  name,
  version: "0.1.0",
  ociRepository: name.replace("@baohaus/", "baohaus/"),
  ociDigest: digest,
  integrity,
  signature,
  resolvedFrom: "oci-registry",
  ...fields,
});

const lock = (resolved: BaoLockResolved[]): BaoLock => ({
  schemaVersion: 1,
  id: "bao-package-kit",
  packageName: "@baohaus/bao-package-kit",
  packageVersion: "0.1.0",
  resolved,
});

describe("release resolution debt", () => {
  test("reports pending publish and incomplete trust metadata", () => {
    expect(
      collectUnresolvedReleaseDependencies(
        lock([
          resolvedDependency("@baohaus/clean"),
          resolvedDependency("@baohaus/pending", { resolvedFrom: "pending-publish" }),
          resolvedDependency("@baohaus/no-digest", { ociDigest: null }),
          resolvedDependency("@baohaus/no-integrity", { integrity: null }),
          resolvedDependency("@baohaus/no-signature", { signature: null }),
        ]),
      ).map((entry) => entry.name),
    ).toEqual([
      "@baohaus/pending",
      "@baohaus/no-digest",
      "@baohaus/no-integrity",
      "@baohaus/no-signature",
    ]);
  });
});
