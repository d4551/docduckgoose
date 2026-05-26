/**
 * XR experience option constants.
 *
 * Provides the canonical runtime lists for XR experience enums (status, visibility,
 * config type, scope). These constants are shared between:
 * - TypeBox schemas (to prevent contract drift)
 * - UI filters and labels
 * - Eden treaty inference
 *
 * @shared/constants/xr-experience.options
 */

/**
 * Supported XR experience versioning workflow statuses.
 */
export const XR_EXPERIENCE_STATUSES: readonly ["draft", "published", "archived"] = [
  "draft",
  "published",
  "archived",
] as const;

/**
 * Supported XR experience visibility scopes.
 */
export const XR_EXPERIENCE_VISIBILITIES: readonly ["private", "team", "public"] = [
  "private",
  "team",
  "public",
] as const;

/**
 * Supported XR experience config schema identifiers.
 */
export const XR_EXPERIENCE_CONFIG_TYPES: readonly ["generic", "placement", "scene", "composition"] =
  ["generic", "placement", "scene", "composition"] as const;

/**
 * Supported XR experience list scopes.
 */
export const XR_EXPERIENCE_SCOPES: readonly ["mine", "shared", "all"] = [
  "mine",
  "shared",
  "all",
] as const;
