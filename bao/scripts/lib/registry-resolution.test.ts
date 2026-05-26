import { describe, expect, test } from "bun:test";
import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-contracts/bao/bao-archive.contract";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTargetBase } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { createBaoArchiveBytes } from "@baohaus/bao-utils/canonical/bao-archive";
import { encodeBaoManifestBin } from "@baohaus/bao-utils/canonical/bao-manifest-bin";
import { buildResolvedRegistryPackage } from "./registry-resolution.ts";

const publicAccessPolicy: BaoInstallTargetBase["accessPolicy"] = {
  visibility: "public",
  organizationScopes: [],
  industryScopes: [],
  allowedGroupIds: [],
  requiredPermissions: [],
  maintainerGroupIds: [],
};

const signedManifest = {
  schemaVersion: BAO_MANIFEST_SCHEMA_VERSION,
  metadata: {
    name: "@baohaus/registry-resolution-fixture",
    version: "1.0.0",
    description: "Registry resolution fixture",
    minSchemaVersion: BAO_MANIFEST_SCHEMA_VERSION,
    signature: {
      algorithm: "ed25519",
      value: "A".repeat(64),
      keyId: "baohaus-release-key",
      transparencyLog: "https://rekor.example.test/entries/1",
    },
  },
  description: "Registry resolution fixture",
  targets: [
    {
      kind: "bao-package",
      target: "@baohaus/registry-resolution-fixture",
      accessPolicy: publicAccessPolicy,
      packageName: "@baohaus/registry-resolution-fixture",
      packageVersion: "1.0.0",
      dependencyLock: [],
    },
  ],
} satisfies BaoManifest;

const unsignedManifest = {
  ...signedManifest,
  metadata: {
    ...signedManifest.metadata,
    signature: undefined,
  },
} satisfies BaoManifest;

const encodeArchive = (manifest: BaoManifest): Uint8Array =>
  createBaoArchiveBytes({
    manifest,
    manifestBin: encodeBaoManifestBin(manifest),
  });

const encodedArchive = encodeArchive(signedManifest);
const unsignedArchive = encodeArchive(unsignedManifest);
const invalidArchive = new TextEncoder().encode(
  JSON.stringify({
    metadata: {
      signature: {
        algorithm: "ed25519",
        value: "A".repeat(64),
        keyId: "baohaus-release-key",
        transparencyLog: "https://rekor.example.test/entries/1",
      },
    },
  }),
);
const OCI_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const SRI_PATTERN = /^sha256-[A-Za-z0-9+/]+=*$/;

describe("registry .bao resolution", () => {
  test("builds digest, SRI, and signature metadata from registry .bao archive bytes", () => {
    const resolved = buildResolvedRegistryPackage(encodedArchive);

    expect(resolved.ociDigest).toMatch(OCI_DIGEST_PATTERN);
    expect(resolved.integrity).toMatch(SRI_PATTERN);
    expect(resolved.signature).toEqual({
      provider: "ed25519",
      bundle: "A".repeat(64),
      keyId: "baohaus-release-key",
      transparencyLog: "https://rekor.example.test/entries/1",
    });
  });

  test("rejects registry .bao archives without signature metadata", () => {
    expect(() => buildResolvedRegistryPackage(unsignedArchive)).toThrow(
      "registry .bao archive manifest metadata.signature is required",
    );
  });

  test("rejects registry responses that are not .bao archives", () => {
    expect(() => buildResolvedRegistryPackage(invalidArchive)).toThrow(
      "Archive too small to contain a tar header",
    );
  });
});
