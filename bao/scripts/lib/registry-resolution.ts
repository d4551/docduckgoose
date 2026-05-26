import { extractBaoArchiveManifest } from "@baohaus/bao-utils/canonical/bao-archive";
import { sha256Base64, sha256Hex } from "./fs-io.ts";
import type { BaoSignature } from "./schema-guards.ts";

interface ResolvedRegistryPackage {
  readonly ociDigest: string;
  readonly integrity: string;
  readonly signature: BaoSignature;
}

const requireString = (value: string | undefined, path: string): string => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  throw new Error(`${path} must be non-empty string`);
};

const optionalString = (
  target: { keyId?: string; transparencyLog?: string },
  key: "keyId" | "transparencyLog",
  value: string | undefined,
): void => {
  if (typeof value === "string" && value.length > 0) {
    target[key] = value;
  }
};

const extractSignature = (archiveBytes: Uint8Array): BaoSignature => {
  const parsed = extractBaoArchiveManifest(archiveBytes);
  if (parsed === null) {
    throw new Error("registry .bao archive manifest is required");
  }
  const signature = parsed.metadata.signature;
  if (signature === undefined) {
    throw new Error("registry .bao archive manifest metadata.signature is required");
  }
  const result: BaoSignature = {
    provider: requireString(
      signature.algorithm,
      "registry .bao archive manifest metadata.signature.algorithm",
    ),
    bundle: requireString(
      signature.value,
      "registry .bao archive manifest metadata.signature.value",
    ),
  };
  optionalString(result, "keyId", signature.keyId);
  optionalString(result, "transparencyLog", signature.transparencyLog);
  return result;
};

export const buildResolvedRegistryPackage = (
  archiveBytes: Uint8Array,
): ResolvedRegistryPackage => ({
  ociDigest: `sha256:${sha256Hex(archiveBytes)}`,
  integrity: `sha256-${sha256Base64(archiveBytes)}`,
  signature: extractSignature(archiveBytes),
});
