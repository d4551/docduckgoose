/**
 * Layout constants, platform identifiers, and media type for the canonical .bao archive format.
 *
 * Archives are uncompressed tar with canonical, deterministic, lexicographic entry ordering.
 * Empty directories are preserved via `.bao.keep` sentinel files.
 */

/** Schema version of the canonical .bao archive format. */
export const BAO_ARCHIVE_VERSION = 1 as const;

/** IANA-style media type for the canonical .bao archive format. */
export const BAO_ARCHIVE_MEDIA_TYPE = "application/vnd.baohaus.bao.archive.v1+tar" as const;

/** Schema version used in manifest encoding. */
export const BAO_ARCHIVE_SCHEMA_VERSION = 1 as const;

/** Sentinel file used to preserve empty directories in the archive. */
export const BAO_KEEP_FILE = ".bao.keep" as const;

/** Required manifest entry at the head of every .bao archive. */
export const BAO_MANIFEST_ENTRY = "manifest.bin" as const;

import {
  BAO_ARCHIVE_PLATFORM_ID_VALUES,
  type BaoArchivePlatformId,
} from "@baohaus/bao-spec/bao-archive/platform-id";

export type { BaoArchivePlatformId };

/** All supported platform IDs in lexicographic order. */
export const BAO_PLATFORM_IDS: readonly BaoArchivePlatformId[] = BAO_ARCHIVE_PLATFORM_ID_VALUES;

/** Provenance entries included in every .bao archive. */
export const BAO_PROVENANCE_ENTRIES: readonly string[] = [
  "provenance/packument.json",
  "provenance/dependency-graph.json",
  "provenance/licenses.json",
] as const;

/** Canonical entry ordering for a .bao archive. */
export const BAO_ARCHIVE_ENTRY_ORDER: readonly string[] = [
  BAO_MANIFEST_ENTRY,
  ...BAO_PROVENANCE_ENTRIES,
  `payload/shared/${BAO_KEEP_FILE}`,
  "payload/shared/package.json",
  "payload/shared/index.js",
  `payload/platforms/darwin-arm64/${BAO_KEEP_FILE}`,
  `payload/platforms/darwin-x64/${BAO_KEEP_FILE}`,
  `payload/platforms/linux-arm64/${BAO_KEEP_FILE}`,
  `payload/platforms/linux-x64/${BAO_KEEP_FILE}`,
  `payload/platforms/windows-x64/${BAO_KEEP_FILE}`,
] as const;

/** Result of validating an archive entry path against security rules. */
interface ArchivePathValidation {
  readonly valid: boolean;
  readonly reason?: string;
}

/**
 * Validate an archive entry path against security rules.
 *
 * Rejects absolute paths, path traversal via `..`, empty segments, and
 * non-normalized paths. Returns `{ valid: true }` for safe paths.
 */
export function validateArchivePath(path: string): ArchivePathValidation {
  if (path.length === 0) {
    return { valid: false, reason: "Path must not be empty." };
  }

  if (path.startsWith("/") || path.startsWith("\\")) {
    return { valid: false, reason: "Absolute paths are rejected." };
  }

  // Check on Windows-style drive letters (e.g. C:\)
  if (/^[A-Za-z]:[/\\]/u.test(path)) {
    return { valid: false, reason: "Absolute paths are rejected." };
  }

  const segments = path.split(/[/\\]/u);

  for (const segment of segments) {
    if (segment === "..") {
      return { valid: false, reason: "Path traversal via '..' is rejected." };
    }
    if (segment === "") {
      return { valid: false, reason: "Empty path segments are rejected." };
    }
  }

  const forwardSlashed = path.replaceAll("\\", "/");
  if (
    forwardSlashed.includes("/./") ||
    forwardSlashed.startsWith("./") ||
    forwardSlashed.endsWith("/.")
  ) {
    return { valid: false, reason: "Path is not normalized." };
  }

  return { valid: true };
}

/**
 * Map the current runtime platform and architecture to a `BaoArchivePlatformId`.
 *
 * Uses `process.platform` and `process.arch` which are available in Bun.
 */
export function getActivePlatformId(): BaoArchivePlatformId {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === "darwin" && arch === "arm64") {
    return "darwin-arm64";
  }
  if (platform === "darwin" && arch === "x64") {
    return "darwin-x64";
  }
  if (platform === "linux" && arch === "arm64") {
    return "linux-arm64";
  }
  if (platform === "linux" && arch === "x64") {
    return "linux-x64";
  }
  if (platform === "win32" && arch === "x64") {
    return "windows-x64";
  }

  throw new Error(`Unsupported platform/architecture combination: ${platform}-${arch}`);
}

/**
 * Return the extraction prefix order for materializing a .bao archive.
 *
 * Shared payload is extracted first, then the platform-specific payload.
 * On path collisions the platform-specific file wins because it is extracted second.
 */
export function resolveMaterializationOrder(platformId: BaoArchivePlatformId): string[] {
  return ["payload/shared/", `payload/platforms/${platformId}/`];
}
