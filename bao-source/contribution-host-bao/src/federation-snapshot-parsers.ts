/**
 * Federation snapshot route constants and request parsers.
 *
 * Shared by every Bao app's `/api/v1/ecosystem/contributions/snapshot` route
 * (bao-runtime, forge, registry, and future peers).
 *
 * @packageDocumentation
 */

import {
  FEDERATION_SNAPSHOT_SCHEMA_VERSION,
  FEDERATION_SURFACE_KEY,
  type FederationSurfaceKey,
} from "./federation-wire.ts";

export const ACCEPT_VERSION_HEADER = "accept-version";
export const CONTENT_VERSION_HEADER = "content-version";
export const SURFACES_QUERY_PARAM = "surfaces";
export const FEDERATION_VARY_HEADER_VALUE = "Cookie, Authorization, If-None-Match";
export const FEDERATION_CACHE_CONTROL_VALUE = "private, no-cache, must-revalidate";

export const ALL_FEDERATION_SURFACE_KEYS: readonly FederationSurfaceKey[] = [
  FEDERATION_SURFACE_KEY.sidebar,
  FEDERATION_SURFACE_KEY.settingsTab,
  FEDERATION_SURFACE_KEY.paletteEntryGroup,
  FEDERATION_SURFACE_KEY.apiGroup,
  FEDERATION_SURFACE_KEY.tileGroup,
  FEDERATION_SURFACE_KEY.topbar,
  FEDERATION_SURFACE_KEY.uiAssetPack,
];

export function isFederationSurfaceKey(value: string): value is FederationSurfaceKey {
  for (const key of ALL_FEDERATION_SURFACE_KEYS) {
    if (key === value) {
      return true;
    }
  }
  return false;
}

export function parseSelectedSurfaces(
  raw: string | null,
): ReadonlySet<FederationSurfaceKey> | undefined {
  if (raw === null || raw.length === 0) {
    return undefined;
  }
  const out = new Set<FederationSurfaceKey>();
  for (const token of raw.split(",")) {
    const trimmed = token.trim();
    if (trimmed.length === 0) {
      continue;
    }
    if (!isFederationSurfaceKey(trimmed)) {
      return undefined;
    }
    out.add(trimmed);
  }
  return out.size === 0 ? undefined : out;
}

export function isAcceptedVersion(header: string | null): boolean {
  if (header === null || header.length === 0) {
    return true;
  }
  return header.trim() === String(FEDERATION_SNAPSHOT_SCHEMA_VERSION);
}
