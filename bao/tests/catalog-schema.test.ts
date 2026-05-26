import { describe, expect, test } from "bun:test";
import type { CatalogPackageEntry } from "../src/catalog.ts";
import { RELEASE_AUTHORITY } from "../src/constants.ts";
import { validatePackageExportParity } from "../src/gates/catalog-schema.ts";

const catalogEntry = (overrides: Partial<CatalogPackageEntry> = {}): CatalogPackageEntry => ({
  id: "bao-package-kit",
  repoRoot: "bao",
  packageRoot: ".",
  manifestPath: "package.json",
  packageName: "@baohaus/bao-package-kit",
  packageVersion: "0.1.0",
  releaseAuthority: RELEASE_AUTHORITY,
  exportSubpaths: ["."],
  ociRepository: "baohaus/bao-package-kit",
  buildCommand: "bun run build",
  typecheckCommand: "bun run typecheck",
  testCommand: "bun test",
  baoCommand: "bun run bao:build",
  canonicalBaoOutputPath: "../bao/dist/bao/bao-package-kit.bao",
  publishSmokeTarget: "@baohaus/bao-package-kit",
  installSmokeTarget: "@baohaus/bao-package-kit",
  channel: "public",
  visibility: "public",
  packageKind: "library",
  sourceProjectPath: "bao",
  targetSourceProjectPath: "../bao",
  runtimeInstallable: true,
  publishGateProfile: "strict",
  composeDependencies: [],
  runtimeAffinity: ["web"],
  publicEntrypoints: ["."],
  sourceRepo: "baohaus",
  layoutVariant: "monorepo-root",
  ...overrides,
});

describe("catalog schema gate", () => {
  test("rejects package exports missing from catalog exportSubpaths", async () => {
    await expect(
      validatePackageExportParity(catalogEntry({ exportSubpaths: [] })),
    ).resolves.toEqual(
      expect.arrayContaining([expect.stringContaining("package exports missing from catalog")]),
    );
  });

  test("rejects public entrypoints missing from exportSubpaths", async () => {
    await expect(
      validatePackageExportParity(
        catalogEntry({
          exportSubpaths: ["."],
          publicEntrypoints: [".", "./missing-entrypoint"],
        }),
      ),
    ).resolves.toEqual(
      expect.arrayContaining([
        expect.stringContaining("public entrypoints missing from exportSubpaths"),
      ]),
    );
  });
});
