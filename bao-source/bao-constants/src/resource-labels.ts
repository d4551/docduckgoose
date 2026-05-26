/**
 * Shared resource label constants and helpers for Baohaus-managed resources.
 */

/**
 * Primary app label key used across Baohaus managed resources.
 */
export const BAOHAUS_LABEL_KEY = "app";

/**
 * Primary app label value used across Baohaus managed resources.
 */
export const BAOHAUS_LABEL_VALUE = "baohaus";

/**
 * Prefix for Baohaus-specific label keys.
 */
export const BAOHAUS_LABEL_PREFIX = "com.baohaus.";

/**
 * Prefix for Baohaus resource names.
 */
export const BAOHAUS_NAME_PREFIX = "baohaus-";

/**
 * Managed label key for Baohaus-owned resources.
 */
export const BAOHAUS_MANAGED_LABEL_KEY: string = `${BAOHAUS_LABEL_PREFIX}managed`;

/**
 * Managed label value for Baohaus-owned resources.
 */
export const BAOHAUS_MANAGED_LABEL_VALUE = "true";

/**
 * Source label key for Baohaus-owned resources.
 */
export const BAOHAUS_SOURCE_LABEL_KEY: string = `${BAOHAUS_LABEL_PREFIX}source`;

/**
 * Service label key for Baohaus-owned resources.
 */
export const BAOHAUS_SERVICE_LABEL_KEY: string = `${BAOHAUS_LABEL_PREFIX}service`;

/**
 * Network label key for Baohaus-owned resources.
 */
export const BAOHAUS_NETWORK_LABEL_KEY: string = `${BAOHAUS_LABEL_PREFIX}network`;

/**
 * Volume label key for Baohaus-owned resources.
 */
export const BAOHAUS_VOLUME_LABEL_KEY: string = `${BAOHAUS_LABEL_PREFIX}volume`;

/**
 * Machine label key for Baohaus-managed resources.
 */
export const BAOHAUS_MACHINE_LABEL_KEY: string = `${BAOHAUS_LABEL_PREFIX}machine`;

/**
 * Build standard Baohaus labels for managed resources.
 *
 * @param source - Label describing the origin of the resource.
 * @param extra - Additional label overrides.
 * @returns Label map for Baohaus-managed resources.
 */
export function buildBaohausLabels(
  source: string,
  extra: Record<string, string> = {},
): Record<string, string> {
  return {
    [BAOHAUS_LABEL_KEY]: BAOHAUS_LABEL_VALUE,
    [BAOHAUS_MANAGED_LABEL_KEY]: BAOHAUS_MANAGED_LABEL_VALUE,
    [BAOHAUS_SOURCE_LABEL_KEY]: source,
    ...extra,
  };
}
