/**
 * Canonical .bao archive builder (v2 — unified Layout A).
 *
 * Every per-repo `bao-build.ts` script imports {@link buildBaoArchive}
 * and invokes it from the package working directory.
 *
 * Produces a canonical Layout A `.bao` archive that passes the 18-gate
 * validator and is ingestible by the .bao Registry publisher.
 *
 * Archive layout (Layout A):
 *   manifest.bin            — canonical FlatBuffers BMv1 envelope
 *   manifest.json           — canonical JSON manifest
 *   manifest.signature      — Ed25519 signature (optional, when key available)
 *   attestations/slsa-provenance.json
 *   attestations/sbom-cyclonedx.json
 *   attestations/sbom-spdx.json
 *   attestations/vex.json
 *   attestations/license-scan.json
 *   attestations/vuln-scan.json
 *   provenance/build-environment.json
 *   provenance/dependency-graph.json
 *   provenance/dependency-lock.json
 *   provenance/licenses.json
 *   provenance/packument.json
 *   payload/shared/.bao.keep
 *   payload/shared/**        — shared payload files
 *   lifecycle/**             — lifecycle hook scripts (if any)
 *   governance/**            — governance files
 *   docs/**                  — documentation
 *   i18n/**                  — locale files
 *   schema/config-schema.json
 *   schema/target-schema.json
 *   schema/prisma-schema.prisma (if applicable)
 */
import type { BaoManifest as CanonicalBaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";

interface BuildBaoArchiveOptions {
  /** When true, copy `src/` into the archive payload (used by kit/spec packages that ship sources). */
  readonly includeSourceTree?: boolean;
  readonly targets?: CanonicalBaoManifest["targets"];
  /** Optional override for the archive output directory; defaults to `dist/bao`. */
  readonly outputDir?: string;
}
interface BuildBaoArchiveResult {
  readonly archive: string;
  readonly packageId: string;
  readonly packageName: string;
  readonly packageVersion: string;
  readonly manifestSha: string;
}
declare const buildBaoArchive: (options?: BuildBaoArchiveOptions) => Promise<BuildBaoArchiveResult>;

export { type BuildBaoArchiveOptions, type BuildBaoArchiveResult, buildBaoArchive };
//# sourceMappingURL=build-bao-archive.d.ts.map
