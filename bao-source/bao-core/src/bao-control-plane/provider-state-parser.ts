/**
 * BaoControlPlane provider state parsing utilities.
 *
 * Shared parsers for local-cluster summary and bootstrap-summary-reader.
 * Single source of truth for parsePrivilegedOwnerStatus, deriveBootstrapMode,
 * parseNullableString, parseNullableNumber, parseStringArray.
 *
 * @packageDocumentation
 */

import type {
  BaoControlPlaneBootstrapMode,
  BaoControlPlanePrivilegedOwnerStatus,
} from "./provider-state.types";

/**
 * Parse privileged host-runtime owner status from summary JSON.
 *
 * @param value - Raw JSON value.
 * @returns Canonical privileged-owner status or null.
 */
export function parsePrivilegedOwnerStatus(
  value: unknown,
): BaoControlPlanePrivilegedOwnerStatus | null {
  if (value === "available" || value === "unavailable" || value === "version-mismatch") {
    return value;
  }
  return null;
}

/**
 * Derive canonical bootstrap mode from the effective provider.
 *
 * @param resolvedProvider - Effective provider token (k0, k3, k8).
 * @returns Canonical bootstrap mode.
 */
export function deriveBootstrapMode(resolvedProvider: string | null): BaoControlPlaneBootstrapMode {
  if (resolvedProvider === "k8") {
    return "attached";
  }
  if (resolvedProvider === "k0" || resolvedProvider === "k3") {
    return "bootstrap-direct";
  }
  return "bootstrap-direct";
}

/**
 * Parse a nullable trimmed string value.
 *
 * @param value - Raw JSON value.
 * @returns Trimmed string or null.
 */
export function parseNullableString(value: unknown): string | null {
  if (value === undefined || value === null) {
    return null;
  }
  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
}

/**
 * Parse a finite numeric value from summary JSON.
 *
 * @param value - Raw JSON value.
 * @returns Finite number or null.
 */
export function parseNullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Parse a string array from an untyped JSON value.
 *
 * @param value - Raw JSON value.
 * @returns Canonical string array.
 */
export function parseStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];
}
