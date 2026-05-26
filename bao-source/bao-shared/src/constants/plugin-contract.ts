/**
 * Canonical plugin-contract version constants.
 *
 * Shared across server runtime, build tooling, and schema modules to keep
 * contract version values centralized and free of hardcoded duplication.
 *
 * @shared/constants/plugin-contract
 */

/**
 * Canonical interface-contract version for server plugin metadata.
 */
export const SERVER_PLUGIN_INTERFACE_CONTRACT_VERSION: "1.0.0" = "1.0.0" as const;

/**
 * Canonical capability-contract version for server plugin metadata.
 */
export const SERVER_PLUGIN_CAPABILITY_CONTRACT_VERSION: "1.0.0" = "1.0.0" as const;

/**
 * Canonical manifest version for server plugin snapshots.
 */
export const SERVER_PLUGIN_MANIFEST_VERSION: "2.0.0" = "2.0.0" as const;

/**
 * Manifest fallback version used for migration-safe read normalization.
 */
export const SERVER_PLUGIN_MANIFEST_FALLBACK_VERSION: "1.0.0-fallback" = "1.0.0-fallback" as const;
