import { describe, expect, test } from "bun:test";
import { assertBaoLock, assertBaoManifest } from "./schema-guards.ts";

const digest = `sha256:${"a".repeat(64)}`;
const integrity = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
const signature = { provider: "sigstore", bundle: digest };

const dependency = {
  name: "@baohaus/bao-core",
  version: "0.1.0",
  ociRepository: "baohaus/bao-core",
  ociDigest: digest,
  integrity,
  signature,
};

const governance = {
  schemaVersion: 1,
  specRevision: "1.0.0",
  mediaType: "application/vnd.baohaus.bao.archive.v1+tar",
  formatKind: "canonical",
  manifestEncoding: "json",
  identity: {
    id: "bao-package-kit",
    packageName: "@baohaus/bao-package-kit",
    packageVersion: "0.1.0",
    ociRepository: "baohaus/bao-package-kit",
    registryNamespace: "baohaus",
  },
  classification: {
    channel: "internal",
    visibility: "hidden",
    packageKind: "internal",
  },
  runtime: {
    installable: false,
    composeDependencies: [],
  },
  publish: {
    gateProfile: "strict",
  },
  dependencies: [dependency],
  sbom: "SBOM.cdx.json",
  provenance: "SLSA.provenance.intoto.jsonl",
  reproducibleBuild: {
    sourceDateEpoch: 0,
    toolchain: { bun: "1.3.13" },
  },
};

describe("Bao schema guards", () => {
  test("accepts governance without embedded dependencies", () => {
    const { dependencies: _dependencies, ...governanceWithoutDependencies } = governance;

    expect(assertBaoManifest(governanceWithoutDependencies).dependencies).toEqual([]);
  });

  test("accept canonical governance and lock metadata with full trust fields", () => {
    expect(assertBaoManifest(governance).dependencies[0]?.ociDigest).toBe(digest);
    expect(
      assertBaoLock({
        schemaVersion: 1,
        id: "bao-package-kit",
        packageName: "@baohaus/bao-package-kit",
        packageVersion: "0.1.0",
        resolved: [{ ...dependency, resolvedFrom: "oci-registry" }],
      }).resolved[0]?.resolvedFrom,
    ).toBe("oci-registry");
  });

  test("rejects weak string dependency signatures", () => {
    expect(() =>
      assertBaoManifest({
        ...governance,
        dependencies: [{ ...dependency, signature: "sigstore-example" }],
      }),
    ).toThrow("bao-governance.json.dependencies[0].signature: must be object");
  });

  test("rejects weak string lock signatures", () => {
    expect(() =>
      assertBaoLock({
        schemaVersion: 1,
        id: "bao-package-kit",
        packageName: "@baohaus/bao-package-kit",
        packageVersion: "0.1.0",
        resolved: [{ ...dependency, resolvedFrom: "oci-registry", signature: "sigstore-example" }],
      }),
    ).toThrow("bao.lock.resolved[0].signature: must be object");
  });

  test("accepts nullable trust fields at schema level (trust enforcement is in release-debt)", () => {
    const manifest = assertBaoManifest({
      ...governance,
      dependencies: [{ ...dependency, ociDigest: null }],
    });
    expect(manifest.dependencies[0]?.ociDigest).toBeNull();
  });

  test("preserves asset-pack target fields from governance for canonical archive manifest generation", () => {
    const manifest = assertBaoManifest({
      ...governance,
      targets: [
        {
          kind: "theme-pack",
          target: "baohaus-aurora-light",
          themeId: "baohaus-aurora-light",
          colorScheme: "light",
          daisyUiVersionRange: ">=5.0.0 <6.0.0",
          stylesheet: "assets/baohaus-aurora-light.css",
        },
      ],
    });

    expect(manifest.targets?.[0]).toEqual({
      kind: "theme-pack",
      target: "baohaus-aurora-light",
      themeId: "baohaus-aurora-light",
      colorScheme: "light",
      daisyUiVersionRange: ">=5.0.0 <6.0.0",
      stylesheet: "assets/baohaus-aurora-light.css",
    });
  });
});
