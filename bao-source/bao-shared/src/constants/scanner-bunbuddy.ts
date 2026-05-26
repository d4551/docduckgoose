/**
 * Shared scanner BunBuddy constants.
 *
 * Centralizes scanner ingestion/source labels so server modules keep one
 * canonical vocabulary for metadata and device synchronization.
 *
 * @packageDocumentation
 */

/**
 * Canonical BunBuddy kind used by scanner integration routes.
 */
export const SCANNER_BUNBUDDY_KIND: "scanner" = "scanner" as const;

/**
 * Canonical context type for scanner hardware entries in BunBuddy discovery payloads.
 */
export const SCANNER_BUNBUDDY_CONTEXT_TYPE_SCANNER: "scanner" = "scanner" as const;

/**
 * Canonical context + registry type for turntable hardware entries.
 */
export const SCANNER_BUNBUDDY_CONTEXT_TYPE_TURNTABLE: "turntable" = "turntable" as const;

/**
 * Canonical registry device type for 3D scanners.
 */
export const SCANNER_REGISTRY_DEVICE_TYPE_SCANNER: "3d-scanner" = "3d-scanner" as const;

/**
 * Canonical registry device type for turntable devices.
 */
export const SCANNER_REGISTRY_DEVICE_TYPE_TURNTABLE: "turntable" = "turntable" as const;

/**
 * Default vendor fallback for scanner/turntable BunBuddy payloads.
 */
export const SCANNER_DEFAULT_VENDOR: "Revopoint" = "Revopoint" as const;

/**
 * Default human-readable turntable name when device payloads omit it.
 */
export const SCANNER_DEFAULT_TURNTABLE_NAME: "Turntable" = "Turntable" as const;

/**
 * Canonical metadata source label for scan-session import workflows.
 */
export const SCAN_SESSION_METADATA_SOURCE: "scan-session" = "scan-session" as const;

/**
 * Canonical source labels for persisted scan artifacts.
 */
export const SCAN_ARTIFACT_SOURCES: {
  readonly storageUrl: "storageUrl";
  readonly objectStorage: "object_storage";
  readonly scannerBunBuddy: "scanner_bunbuddy";
} = {
  storageUrl: "storageUrl",
  objectStorage: "object_storage",
  scannerBunBuddy: "scanner_bunbuddy",
} as const;

/**
 * Union of supported scan artifact source labels.
 */
export type ScanArtifactSource = (typeof SCAN_ARTIFACT_SOURCES)[keyof typeof SCAN_ARTIFACT_SOURCES];
