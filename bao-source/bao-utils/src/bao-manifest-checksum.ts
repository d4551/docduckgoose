/**
 * Shared `.bao` manifest checksum helpers.
 *
 * Generates the deterministic unsigned payload hash used by manifest trust
 * verification and checked-in example authoring.
 *
 * Uses the shared {@link stableJsonStringify} for normalization so that
 * checksum computation is identical regardless of call site (server, scripts,
 * shared library).
 *
 * @baohaus/bao-utils/bao-manifest-checksum
 */

import { createHash } from "node:crypto";
import { stableJsonStringify } from "./stable-json.ts";

/**
 * Supported checksum algorithms for `.bao` manifests.
 */
export type BaoManifestChecksumAlgorithm = "sha256" | "sha1";

/** Trust-only field names stripped before checksum computation. */
const TRUST_FIELD_NAMES: Set<unknown> = new Set(["checksum", "signature", "$schema"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Remove trust-only fields from a manifest object segment.
 *
 * @param value - Manifest object segment to sanitize.
 * @returns Copy without checksum/signature/schema fields.
 */
function omitTrustFields(value: object): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value)) {
    if (TRUST_FIELD_NAMES.has(key) || nested === undefined) {
      continue;
    }
    normalized[key] = nested;
  }
  return normalized;
}

/**
 * Build the canonical unsigned manifest payload used for hashing.
 *
 * @param manifest - Parsed `.bao` manifest payload.
 * @returns Unsigned manifest payload with trust fields removed.
 */
export function buildUnsignedBaoManifestPayload(
  manifest: Record<string, unknown>,
): Record<string, unknown> {
  const metadata = omitTrustFields(isRecord(manifest.metadata) ? manifest.metadata : {});
  const targets = Array.isArray(manifest.targets)
    ? manifest.targets
        .filter((t): t is Record<string, unknown> => t !== null && typeof t === "object")
        .map((target) => omitTrustFields(target))
    : [];

  return {
    schemaVersion: manifest.schemaVersion,
    metadata,
    ...(typeof manifest.description === "string" && manifest.description.trim().length > 0
      ? { description: manifest.description }
      : {}),
    ...(Array.isArray(manifest.dependencies) ? { dependencies: manifest.dependencies } : {}),
    targets,
  };
}

/**
 * Build the canonical unsigned target payload used for hashing.
 *
 * @param target - Parsed `.bao` target payload.
 * @returns Unsigned target payload with trust fields removed.
 */
export function buildUnsignedBaoTargetPayload(
  target: Record<string, unknown>,
): Record<string, unknown> {
  return omitTrustFields(target);
}

/**
 * Serialize a manifest payload into its canonical checksum string form.
 *
 * @param manifest - Parsed `.bao` manifest payload.
 * @returns Stable JSON string ready for hashing.
 */
export function serializeBaoManifestForChecksum(manifest: Record<string, unknown>): string {
  const unsignedPayload = buildUnsignedBaoManifestPayload(manifest);
  return stableJsonStringify(unsignedPayload);
}

/**
 * Serialize a target payload into its canonical checksum string form.
 *
 * @param target - Parsed `.bao` target payload.
 * @returns Stable JSON string ready for hashing.
 */
export function serializeBaoTargetForChecksum(target: Record<string, unknown>): string {
  const unsignedPayload = buildUnsignedBaoTargetPayload(target);
  return stableJsonStringify(unsignedPayload);
}

/**
 * Compute a deterministic checksum for a `.bao` manifest payload.
 *
 * @param manifest - Parsed `.bao` manifest payload.
 * @param algorithm - Digest algorithm to use.
 * @returns Hex-encoded manifest checksum.
 */
export function computeBaoManifestChecksum(
  manifest: Record<string, unknown>,
  algorithm: BaoManifestChecksumAlgorithm = "sha256",
): string {
  return createHash(algorithm).update(serializeBaoManifestForChecksum(manifest)).digest("hex");
}
