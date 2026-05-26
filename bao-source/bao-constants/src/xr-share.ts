/**
 * XR share-link environment keys and defaults.
 */

import { MS_PER_HOUR } from "./time";
/**
 * Canonical environment keys for XR share-link expiry policy.
 */
export const XR_SHARE_ENV_KEYS: {
  readonly defaultExpiryHours: "XR_SHARE_DEFAULT_EXPIRY_HOURS";
  readonly maxExpiryHours: "XR_SHARE_MAX_EXPIRY_HOURS";
} = {
  defaultExpiryHours: "XR_SHARE_DEFAULT_EXPIRY_HOURS",
  maxExpiryHours: "XR_SHARE_MAX_EXPIRY_HOURS",
} as const;

/**
 * Canonical XR share-link default values.
 */
export const XR_SHARE_DEFAULTS: {
  readonly defaultExpiryHours: number;
  readonly maxExpiryHours: number;
  readonly hourMs: number;
} = {
  defaultExpiryHours: 168,
  maxExpiryHours: 8760,
  hourMs: MS_PER_HOUR,
} as const;
