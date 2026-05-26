/**
 * `.bao` archive contract constants.
 *
 * Defines the canonical `.bao` archive layout shared by schema validation,
 * installers, registry persistence, and archive generation flows.
 *
 * @shared/bao/bao-archive-contract
 */

/**
 * Canonical `.bao` archive schema version.
 */
export const BAO_ARCHIVE_SCHEMA_VERSION: 1 = 1 as const;

/**
 * OCI/media type for canonical `.bao` archive blobs.
 */
export const BAO_ARCHIVE_MEDIA_TYPE: "application/vnd.baohaus.bao.archive.v1+tar" =
  "application/vnd.baohaus.bao.archive.v1+tar" as const;

/**
 * Canonical manifest entry path within a `.bao` archive.
 */
export const BAO_ARCHIVE_MANIFEST_ENTRY_PATH: "manifest.bin" = "manifest.bin" as const;

/**
 * Canonical shared payload root within a `.bao` archive.
 */
export const BAO_ARCHIVE_SHARED_PAYLOAD_ROOT: "payload/shared/" = "payload/shared/" as const;

/**
 * Canonical per-platform payload root prefix within a `.bao` archive.
 */
export const BAO_ARCHIVE_PLATFORM_PAYLOAD_ROOT: "payload/platforms/" =
  "payload/platforms/" as const;

/**
 * Canonical packument provenance entry path.
 */
export const BAO_ARCHIVE_PACKUMENT_ENTRY_PATH: "provenance/packument.json" =
  "provenance/packument.json" as const;

/**
 * Canonical dependency graph provenance entry path.
 */
export const BAO_ARCHIVE_DEPENDENCY_GRAPH_ENTRY_PATH: "provenance/dependency-graph.json" =
  "provenance/dependency-graph.json" as const;

/**
 * Canonical license provenance entry path.
 */
export const BAO_ARCHIVE_LICENSES_ENTRY_PATH: "provenance/licenses.json" =
  "provenance/licenses.json" as const;

/**
 * Placeholder file used to preserve empty archive directories deterministically.
 */
export const BAO_ARCHIVE_KEEP_FILE_NAME: ".bao.keep" = ".bao.keep" as const;

/**
 * Supported platform slice identifiers for canonical `.bao` archives.
 */
export const BAO_ARCHIVE_PLATFORM_IDS: {
  readonly darwinArm64: "darwin-arm64";
  readonly darwinX64: "darwin-x64";
  readonly linuxArm64: "linux-arm64";
  readonly linuxX64: "linux-x64";
  readonly linuxMuslArm64: "linux-musl-arm64";
  readonly linuxMuslX64: "linux-musl-x64";
  readonly windowsArm64: "windows-arm64";
  readonly windowsX64: "windows-x64";
  readonly freebsdX64: "freebsd-x64";
} = {
  darwinArm64: "darwin-arm64",
  darwinX64: "darwin-x64",
  linuxArm64: "linux-arm64",
  linuxX64: "linux-x64",
  linuxMuslArm64: "linux-musl-arm64",
  linuxMuslX64: "linux-musl-x64",
  windowsArm64: "windows-arm64",
  windowsX64: "windows-x64",
  freebsdX64: "freebsd-x64",
} as const;

/**
 * `.bao` platform slice identifier type.
 */
export type BaoArchivePlatformId =
  (typeof BAO_ARCHIVE_PLATFORM_IDS)[keyof typeof BAO_ARCHIVE_PLATFORM_IDS];

/**
 * Ordered platform slice identifiers used for deterministic archive generation.
 */
export const BAO_ARCHIVE_PLATFORM_ID_VALUES: readonly [
  "darwin-arm64",
  "darwin-x64",
  "linux-arm64",
  "linux-x64",
  "linux-musl-arm64",
  "linux-musl-x64",
  "windows-arm64",
  "windows-x64",
  "freebsd-x64",
] = [
  BAO_ARCHIVE_PLATFORM_IDS.darwinArm64,
  BAO_ARCHIVE_PLATFORM_IDS.darwinX64,
  BAO_ARCHIVE_PLATFORM_IDS.linuxArm64,
  BAO_ARCHIVE_PLATFORM_IDS.linuxX64,
  BAO_ARCHIVE_PLATFORM_IDS.linuxMuslArm64,
  BAO_ARCHIVE_PLATFORM_IDS.linuxMuslX64,
  BAO_ARCHIVE_PLATFORM_IDS.windowsArm64,
  BAO_ARCHIVE_PLATFORM_IDS.windowsX64,
  BAO_ARCHIVE_PLATFORM_IDS.freebsdX64,
] as const satisfies readonly BaoArchivePlatformId[];

/**
 * Resolve the canonical archive payload root for one platform slice.
 *
 * @param platformId - Canonical platform identifier.
 * @returns Archive directory prefix for the platform payload.
 */
export function resolveBaoArchivePlatformPayloadRoot(platformId: BaoArchivePlatformId): string {
  return `${BAO_ARCHIVE_PLATFORM_PAYLOAD_ROOT}${platformId}/`;
}

/**
 * Resolve the keep-file path for the shared payload directory.
 *
 * @returns Canonical shared keep-file path.
 */
export function resolveBaoArchiveSharedKeepFilePath(): string {
  return `${BAO_ARCHIVE_SHARED_PAYLOAD_ROOT}${BAO_ARCHIVE_KEEP_FILE_NAME}`;
}

/**
 * Resolve the keep-file path for one platform slice.
 *
 * @param platformId - Canonical platform identifier.
 * @returns Canonical platform keep-file path.
 */
export function resolveBaoArchivePlatformKeepFilePath(platformId: BaoArchivePlatformId): string {
  return `${resolveBaoArchivePlatformPayloadRoot(platformId)}${BAO_ARCHIVE_KEEP_FILE_NAME}`;
}

/**
 * Resolve the current runtime's canonical `.bao` platform id.
 *
 * Returns `null` when the current platform is outside the supported archive
 * slice matrix.
 *
 * @param platform - Optional runtime platform override.
 * @param arch - Optional runtime architecture override.
 * @returns Canonical platform id or null.
 */
export function resolveCurrentBaoArchivePlatformId(
  platform: string = process.platform,
  arch: string = process.arch,
): BaoArchivePlatformId | null {
  if (platform === "darwin" && arch === "arm64") {
    return BAO_ARCHIVE_PLATFORM_IDS.darwinArm64;
  }
  if (platform === "darwin" && arch === "x64") {
    return BAO_ARCHIVE_PLATFORM_IDS.darwinX64;
  }
  if (platform === "linux" && arch === "arm64") {
    return BAO_ARCHIVE_PLATFORM_IDS.linuxArm64;
  }
  if (platform === "linux" && arch === "x64") {
    return BAO_ARCHIVE_PLATFORM_IDS.linuxX64;
  }
  if (platform === "linux-musl" && arch === "arm64") {
    return BAO_ARCHIVE_PLATFORM_IDS.linuxMuslArm64;
  }
  if (platform === "linux-musl" && arch === "x64") {
    return BAO_ARCHIVE_PLATFORM_IDS.linuxMuslX64;
  }
  if (platform === "win32" && arch === "arm64") {
    return BAO_ARCHIVE_PLATFORM_IDS.windowsArm64;
  }
  if (platform === "win32" && arch === "x64") {
    return BAO_ARCHIVE_PLATFORM_IDS.windowsX64;
  }
  if (platform === "freebsd" && arch === "x64") {
    return BAO_ARCHIVE_PLATFORM_IDS.freebsdX64;
  }
  return null;
}
