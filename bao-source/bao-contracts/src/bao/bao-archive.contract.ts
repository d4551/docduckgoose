import {
  BAO_ARCHIVE_MEDIA_TYPE,
  BAO_FORMAT_KINDS,
  BAO_MANIFEST_ENCODINGS,
  BAO_MANIFEST_FILE_IDENTIFIER,
  BAO_MANIFEST_SCHEMA_VERSION,
  BAO_SPEC_REVISION,
  PLATFORM_IDS,
  type PlatformId,
} from "@baohaus/bao-schemas/bao-install-primitives.schemas";

export const ARCHIVE_ENTRIES = {
  MANIFEST_BIN: "manifest.bin",
  MANIFEST_JSON: "manifest.json",
  MANIFEST_SIGNATURE: "manifest.signature",

  ATTESTATION_SLSA: "attestations/slsa-provenance.json",
  ATTESTATION_SBOM_CYCLONEDX: "attestations/sbom-cyclonedx.json",
  ATTESTATION_SBOM_SPDX: "attestations/sbom-spdx.json",
  ATTESTATION_VEX: "attestations/vex.json",
  ATTESTATION_LICENSE_SCAN: "attestations/license-scan.json",
  ATTESTATION_VULN_SCAN: "attestations/vuln-scan.json",
  ATTESTATION_SIGSTORE_BUNDLE: "attestations/sigstore.bundle",

  PROVENANCE_BUILD_ENVIRONMENT: "provenance/build-environment.json",
  PROVENANCE_DEP_GRAPH: "provenance/dependency-graph.json",
  PROVENANCE_DEP_LOCK: "provenance/dependency-lock.json",
  PROVENANCE_LICENSES: "provenance/licenses.json",
  PROVENANCE_PACKUMENT: "provenance/packument.json",

  PAYLOAD_SHARED_KEEP: "payload/shared/.bao.keep",
  PLATFORM_KEEP: (platform: PlatformId) => `payload/platforms/${platform}/.bao.keep`,
  PAYLOAD_PLATFORM_PREFIX: (platform: PlatformId) => `payload/platforms/${platform}`,
  PAYLOAD_SHARED_PREFIX: "payload/shared",
  PAYLOAD_BYTECODE_PREFIX: "payload/bytecode",
  PAYLOAD_WASM_PREFIX: "payload/wasm",

  SCHEMA_CONFIG: "schema/config-schema.json",
  SCHEMA_TARGET: "schema/target-schema.json",
  SCHEMA_OPENAPI: "schema/interface-openapi.yaml",
  SCHEMA_ASYNCAPI: "schema/interface-asyncapi.yaml",
  SCHEMA_PRISMA: "schema/prisma-schema.prisma",
  SCHEMA_FLATBUFFER: "schema/flatbuffer.fbs",

  LIFECYCLE_PREFIX: "lifecycle",
  DOCS_PREFIX: "docs",
  OBSERVABILITY_PREFIX: "observability",
  I18N_PREFIX: "i18n",
  STYLES_PREFIX: "styles",
  TESTS_PREFIX: "tests",
  SECURITY_PREFIX: "security",
  SECURITY_TRUST_POLICY: "security/trust-policy.json",
  GOVERNANCE_PREFIX: "governance",
  GOVERNANCE_BAO: "governance/bao-governance.json",
  RELEASE_PREFIX: "release",
} as const;

export const BAO_LAYOUT_A_CORE_ARCHIVE_ENTRIES = [
  ARCHIVE_ENTRIES.MANIFEST_BIN,
  ARCHIVE_ENTRIES.MANIFEST_JSON,
  ARCHIVE_ENTRIES.PAYLOAD_SHARED_KEEP,
] as const;

export const BAO_LAYOUT_A_AUTHORING_REQUIRED_ARCHIVE_ENTRIES = [
  ...BAO_LAYOUT_A_CORE_ARCHIVE_ENTRIES,
  ARCHIVE_ENTRIES.MANIFEST_SIGNATURE,
  ARCHIVE_ENTRIES.ATTESTATION_SLSA,
  ARCHIVE_ENTRIES.ATTESTATION_SBOM_CYCLONEDX,
  ARCHIVE_ENTRIES.ATTESTATION_SBOM_SPDX,
  ARCHIVE_ENTRIES.ATTESTATION_VEX,
  ARCHIVE_ENTRIES.PROVENANCE_BUILD_ENVIRONMENT,
  ARCHIVE_ENTRIES.PROVENANCE_DEP_GRAPH,
  ARCHIVE_ENTRIES.PROVENANCE_DEP_LOCK,
  ARCHIVE_ENTRIES.PROVENANCE_LICENSES,
  ARCHIVE_ENTRIES.PROVENANCE_PACKUMENT,
  ARCHIVE_ENTRIES.SECURITY_TRUST_POLICY,
  ARCHIVE_ENTRIES.GOVERNANCE_BAO,
] as const;

const SECURITY_RULES = {
  NORMALIZE_PATHS: true,
  REJECT_PARENT_TRAVERSAL: true,
  REJECT_EMPTY_SEGMENTS: true,
  REJECT_ABSOLUTE_PATHS: true,
  REJECT_TRAVERSAL_ATTACKS: true,
} as const;

const PATH_NORMALIZATION_RULES = {
  DOUBLE_SLASHES: /\/\//g,
  LEADING_SLASH: /^\/+/,
  TRAILING_SLASH: /\/$/,
  CURRENT_DIR_SEGMENT: /^\.\//,
  BACKSLASH: /\\/g,
} as const;

function isSecurePath(path: string): boolean {
  if (SECURITY_RULES.REJECT_ABSOLUTE_PATHS && path.startsWith("/")) {
    return false;
  }
  if (SECURITY_RULES.REJECT_EMPTY_SEGMENTS) {
    const rawSegments = path.replace(PATH_NORMALIZATION_RULES.BACKSLASH, "/").split("/");
    if (rawSegments.some((segment) => segment.length === 0)) {
      return false;
    }
  }
  if (SECURITY_RULES.REJECT_TRAVERSAL_ATTACKS) {
    const normalized = normalizePath(path);
    if (normalized.length === 0) {
      return false;
    }
    const segments = normalized.split("/");
    if (segments.some((segment) => segment === "..")) {
      return false;
    }
  }
  return true;
}

export function normalizePath(path: string): string {
  let normalized = path.replace(PATH_NORMALIZATION_RULES.BACKSLASH, "/");
  normalized = normalized.replace(PATH_NORMALIZATION_RULES.DOUBLE_SLASHES, "/");
  normalized = normalized.replace(PATH_NORMALIZATION_RULES.LEADING_SLASH, "");
  normalized = normalized.replace(PATH_NORMALIZATION_RULES.TRAILING_SLASH, "");
  normalized = normalized.replace(PATH_NORMALIZATION_RULES.CURRENT_DIR_SEGMENT, "");
  normalized = normalized.replaceAll("\0", "");
  return normalized
    .split("/")
    .filter((segment) => segment.length > 0 && segment !== ".")
    .join("/");
}

export function isValidArchiveEntry(entryPath: string): boolean {
  if (!isSecurePath(entryPath)) {
    return false;
  }
  const normalized = normalizePath(entryPath);
  if (normalized.length === 0) {
    return false;
  }
  if (normalized.includes("\n") || normalized.includes("\r")) {
    return false;
  }
  return true;
}

export function isPlatformId(value: string): value is PlatformId {
  return PLATFORM_IDS.some((platformId) => platformId === value);
}

export function resolveCurrentBaoArchivePlatformId(
  platform: string = process.platform,
  arch: string = process.arch,
): PlatformId | null {
  const platformId = `${platform === "win32" ? "windows" : platform}-${arch}`;
  return isPlatformId(platformId) ? platformId : null;
}

export type { PlatformId };
export {
  BAO_ARCHIVE_MEDIA_TYPE,
  BAO_FORMAT_KINDS,
  BAO_MANIFEST_ENCODINGS,
  BAO_MANIFEST_FILE_IDENTIFIER,
  BAO_MANIFEST_SCHEMA_VERSION,
  BAO_SPEC_REVISION,
  PLATFORM_IDS,
};
