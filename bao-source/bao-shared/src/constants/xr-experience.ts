/**
 * XR experience contract constraints.
 *
 * Centralizes XR experience field bounds to keep schemas and validation
 * consistent without scattering magic numbers.
 *
 * @shared/constants/xr-experience
 */

/** Maximum length for XR experience names. */
export const XR_EXPERIENCE_NAME_MAX_LENGTH = 255;
/** Maximum length for XR experience descriptions. */
export const XR_EXPERIENCE_DESCRIPTION_MAX_LENGTH = 2000;
/** Minimum allowed XR experience schema version. */
export const XR_EXPERIENCE_SCHEMA_VERSION_MIN = 1;
/** Maximum allowed XR experience schema version. */
export const XR_EXPERIENCE_SCHEMA_VERSION_MAX = 100;
