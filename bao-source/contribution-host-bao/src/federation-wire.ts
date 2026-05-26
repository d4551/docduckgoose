/**
 * Canonical cross-origin federation wire shape for the 6 contribution
 * surfaces. Single source of truth consumed by:
 *
 * - every Bao app's `/api/v1/ecosystem/contributions/snapshot` Elysia
 *   route (snapshot producer)
 * - the federation orchestrator that fetches each connected peer's
 *   snapshot and merges them into the local contribution-host singletons
 *   (snapshot consumer)
 *
 * The shape is JSON-safe by construction (readonly arrays, no class
 * instances, no `Map`/`Set`) so cross-origin transport over `fetch` +
 * `Response.json()` round-trips without serialization helpers. Every
 * surface-specific registration is re-exported by-reference from
 * `@baohaus/contribution-registry-bao/<surface>` so the wire shape stays
 * in lock-step with the in-process registration shape — adding a field to
 * `SidebarRegistration` upstream automatically flows through the wire.
 *
 * The federation seam is per the L1 capstone in the cross-peer
 * contribution-host plan. The cross-process SSE bridge wires the
 * `ecosystem.contribution-changed` topic from `@baohaus/bao-boss/topics`
 * so peers invalidate this snapshot endpoint within an SSE round-trip
 * (no page reload).
 *
 * @packageDocumentation
 */

import type { ApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group";
import type { PaletteEntryGroupRegistration } from "@baohaus/contribution-registry-bao/palette-entry-group";
import type { SettingsTabRegistration } from "@baohaus/contribution-registry-bao/settings-tab";
import type { SidebarRegistration } from "@baohaus/contribution-registry-bao/sidebar";
import type { TileGroupRegistration } from "@baohaus/contribution-registry-bao/tile-group";
import type { TopbarRegistration } from "@baohaus/contribution-registry-bao/topbar";
import type { UiAssetPackRegistration } from "@baohaus/contribution-registry-bao/ui-asset-pack";

/**
 * Wire-shape schema version. Bumped on incompatible changes only;
 * additive changes (new optional surface field) keep the version stable.
 * Peers MUST refuse snapshots whose schemaVersion they do not understand
 * (`FEDERATION_SNAPSHOT_SCHEMA_VERSION` is the only value impl paths
 * accept).
 */
export const FEDERATION_SNAPSHOT_SCHEMA_VERSION = 1 as const;
export type FederationSnapshotSchemaVersion = typeof FEDERATION_SNAPSHOT_SCHEMA_VERSION;

/**
 * Canonical capability tier identifiers reported by the peer. Mirrors
 * `@baohaus/bao-sandbox-spec/capabilities` tier order; kept as a literal-
 * union here so the federation orchestrator can filter peers by tier
 * without depending on the sandbox-spec package surface.
 */
export const PEER_CAPABILITY_TIER = {
  t0: "t0",
  t1: "t1",
  t2: "t2",
  t3: "t3",
} as const;
export type PeerCapabilityTier = (typeof PEER_CAPABILITY_TIER)[keyof typeof PEER_CAPABILITY_TIER];

/**
 * Peer identity carried alongside every snapshot. The orchestrator keys
 * federated registrations by `peerId` so a peer-loss event removes that
 * peer's registrations idempotently without affecting others.
 *
 * `origin` is the base URL the snapshot endpoint was reached on; the
 * client must NOT trust this field for routing — it is informational
 * only. The orchestrator uses the URL it called for all subsequent
 * requests.
 */
export interface FederatedPeerIdentity {
  /** Stable per-app identifier (e.g. "bao-runtime", "registry"). */
  readonly peerId: string;
  /** Human-readable name for UI attribution chips. */
  readonly displayName: string;
  /** Base origin of the peer (informational only). */
  readonly origin: string;
  /** Immutable version tag of the running peer build. */
  readonly versionTag: string;
  /** Capability tier reported by the peer at snapshot time. */
  readonly capabilityTier: PeerCapabilityTier;
}

/**
 * Surface-keyed registration buckets. Empty arrays are preserved (rather
 * than omitted) so the wire shape is structurally stable across peers
 * regardless of which surfaces a given peer currently contributes to.
 */
export interface FederatedContributionSurfaces {
  readonly sidebar: readonly SidebarRegistration[];
  readonly settingsTab: readonly SettingsTabRegistration[];
  readonly paletteEntryGroup: readonly PaletteEntryGroupRegistration[];
  readonly apiGroup: readonly ApiGroupRegistration[];
  readonly tileGroup: readonly TileGroupRegistration[];
  readonly topbar: readonly TopbarRegistration[];
  readonly uiAssetPack: readonly UiAssetPackRegistration[];
}

/**
 * Full federation snapshot envelope. The orchestrator hashes
 * `JSON.stringify(envelope.surfaces)` to compute a content etag; the
 * server may pre-compute and ship the etag as `envelope.etag` so 304
 * responses skip the surface payload on revalidation.
 */
export interface FederatedContributionSnapshot {
  readonly schemaVersion: FederationSnapshotSchemaVersion;
  readonly peer: FederatedPeerIdentity;
  /** ISO-8601 timestamp of snapshot capture. */
  readonly snapshotAt: string;
  /**
   * Stable content etag (e.g. SHA-256 hex of surfaces JSON). Used by
   * the orchestrator for `If-None-Match` revalidation. The server MUST
   * compute this deterministically from the surfaces payload so two
   * snapshots of identical state share an etag.
   */
  readonly etag: string;
  readonly surfaces: FederatedContributionSurfaces;
}

/**
 * Per-surface capability filter signature. Returns `true` when the
 * caller's session is permitted to see a registration carrying the given
 * `capabilityRef`. `undefined` means the registration has no capability
 * gate and is always visible.
 *
 * Producers pass the local viewer's effective capability set via a
 * closure; the federation snapshot endpoint applies this filter once per
 * registration before serializing the surfaces.
 */
export type FederationCapabilityFilter = (capabilityRef: string | undefined) => boolean;

/**
 * Canonical route path the federation orchestrator hits on each peer.
 * Held here so route literals stay out of impl paths and every peer
 * mounts the same path.
 */
export const FEDERATION_SNAPSHOT_ROUTE_PATH = "/api/v1/ecosystem/contributions/snapshot" as const;

/**
 * Canonical surface keys used for partial-fetch selection
 * (`?surfaces=sidebar,api-group` query) and for orchestrator filters.
 * Mirrors the surface buckets on {@link FederatedContributionSurfaces}.
 */
export const FEDERATION_SURFACE_KEY = {
  sidebar: "sidebar",
  settingsTab: "settings-tab",
  paletteEntryGroup: "palette-entry-group",
  apiGroup: "api-group",
  tileGroup: "tile-group",
  topbar: "topbar",
  uiAssetPack: "ui-asset-pack",
} as const;
export type FederationSurfaceKey =
  (typeof FEDERATION_SURFACE_KEY)[keyof typeof FEDERATION_SURFACE_KEY];

/**
 * Canonical HTTP header carrying the snapshot etag in both directions
 * (server response + client `If-None-Match` revalidation).
 */
export const FEDERATION_SNAPSHOT_ETAG_HEADER = "etag" as const;

/**
 * Canonical request-conditional header used by the orchestrator to
 * revalidate a previously-fetched snapshot.
 */
export const FEDERATION_SNAPSHOT_IF_NONE_MATCH_HEADER = "if-none-match" as const;
