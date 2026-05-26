/**
 * Server-side federation snapshot collector.
 *
 * Walks the 7 local contribution-host singletons, applies tenant
 * isolation + capability filter + capability-ref redaction + partial-
 * surface selection, and produces a JSON-safe
 * {@link FederatedContributionSnapshot} ready to be returned by the
 * `/api/v1/ecosystem/contributions/snapshot` Elysia route on every Bao
 * app.
 *
 * The collector is intentionally pure (no I/O, no logging) so it can be
 * called from inside route handlers without coupling to a framework.
 * Etag computation uses the platform Web Crypto API (`crypto.subtle.digest`)
 * so the deterministic content hash works identically in Bun, Node, and
 * the browser without a runtime-specific dependency. Two snapshots of
 * identical state always share an etag, and the etag includes every
 * filter/selection input so cache validation stays correct.
 *
 * @packageDocumentation
 */

import type { ApiGroupHost } from "./api-group.ts";
import {
  FEDERATION_SNAPSHOT_SCHEMA_VERSION,
  FEDERATION_SURFACE_KEY,
  type FederatedContributionSnapshot,
  type FederatedContributionSurfaces,
  type FederatedPeerIdentity,
  type FederationCapabilityFilter,
  type FederationSurfaceKey,
} from "./federation-wire.ts";
import type { PaletteEntryGroupHost } from "./palette-entry-group.ts";
import type { SettingsTabHost } from "./settings-tab.ts";
import type { SidebarHost } from "./sidebar.ts";
import type { TileGroupHost } from "./tile-group.ts";
import type { TopbarHost } from "./topbar.ts";
import type { UiAssetPackHost } from "./ui-asset-pack.ts";

/**
 * Hosts the snapshot collector reads from. Every host is required so the
 * wire shape stays structurally stable across peers regardless of which
 * surfaces a given peer currently contributes to.
 */
export interface FederationSnapshotHosts {
  readonly sidebar: SidebarHost;
  readonly settingsTab: SettingsTabHost;
  readonly paletteEntryGroup: PaletteEntryGroupHost;
  readonly apiGroup: ApiGroupHost;
  readonly tileGroup: TileGroupHost;
  readonly topbar: TopbarHost;
  readonly uiAssetPack: UiAssetPackHost;
}

/**
 * Collector input.
 *
 * `capabilityFilter` — when present, registrations whose `capabilityRef`
 * the caller's session does not permit are stripped from the wire. When
 * absent, every registration is admitted (the consuming peer's local
 * federation orchestrator filters by viewer capabilities at render time).
 *
 * `tenantId` — when present, only registrations with matching
 * `tenantId` (or `null`/`undefined` = global visibility) are emitted.
 * Absent value disables tenant filtering (useful for tests + admin
 * surfaces).
 *
 * `redactCapabilityRef` — when `true`, every emitted registration has
 * its `capabilityRef` stripped to prevent info-disclosure to authenticated
 * low-tier viewers. Industry-best-practice default for cross-origin
 * federation; consumers re-fetch via per-feature endpoints when they need
 * gating intent visible.
 *
 * `selectedSurfaces` — when present, only listed surface buckets are
 * populated; omitted surfaces emit empty arrays. Enables ?surfaces=...
 * partial-fetch on the wire so orchestrators can pull only what they need.
 *
 * `now` is injectable for deterministic tests; production callers omit
 * it and the collector reads `new Date()`.
 */
export interface FederationSnapshotInput {
  readonly peer: FederatedPeerIdentity;
  readonly hosts: FederationSnapshotHosts;
  readonly capabilityFilter?: FederationCapabilityFilter;
  readonly tenantId?: string | null;
  readonly redactCapabilityRef?: boolean;
  readonly selectedSurfaces?: ReadonlySet<FederationSurfaceKey>;
  readonly now?: () => Date;
}

interface RegistrationLike {
  readonly capabilityRef?: string | undefined;
  readonly tenantId?: string | null | undefined;
}

function admitsCapability(
  filter: FederationCapabilityFilter | undefined,
  capabilityRef: string | undefined,
): boolean {
  return filter === undefined ? true : filter(capabilityRef);
}

function admitsTenant(
  registrationTenantId: string | null | undefined,
  scopeTenantId: string | null | undefined,
): boolean {
  if (scopeTenantId === undefined) {
    return true;
  }
  if (registrationTenantId === null || registrationTenantId === undefined) {
    return true;
  }
  return registrationTenantId === scopeTenantId;
}

function redactCapabilityRefField<T extends RegistrationLike>(registration: T): T {
  if (registration.capabilityRef === undefined) {
    return registration;
  }
  const { capabilityRef: _omitted, ...rest } = registration;
  return { ...rest } satisfies Omit<T, "capabilityRef"> as T;
}

function filterSurface<T extends RegistrationLike>(
  registrations: readonly T[],
  filter: FederationCapabilityFilter | undefined,
  tenantId: string | null | undefined,
  redactCapabilityRef: boolean,
): readonly T[] {
  const admitted = registrations.filter(
    (reg) => admitsCapability(filter, reg.capabilityRef) && admitsTenant(reg.tenantId, tenantId),
  );
  if (!redactCapabilityRef) {
    return admitted;
  }
  return admitted.map((reg) => redactCapabilityRefField(reg));
}

function isSurfaceSelected(
  selected: ReadonlySet<FederationSurfaceKey> | undefined,
  key: FederationSurfaceKey,
): boolean {
  return selected === undefined || selected.has(key);
}

function filterSurfaces(
  hosts: FederationSnapshotHosts,
  input: FederationSnapshotInput,
): FederatedContributionSurfaces {
  const redactCapabilityRef = input.redactCapabilityRef === true;
  const sidebar = isSurfaceSelected(input.selectedSurfaces, FEDERATION_SURFACE_KEY.sidebar)
    ? filterSurface(
        hosts.sidebar.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  const settingsTab = isSurfaceSelected(input.selectedSurfaces, FEDERATION_SURFACE_KEY.settingsTab)
    ? filterSurface(
        hosts.settingsTab.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  const paletteEntryGroup = isSurfaceSelected(
    input.selectedSurfaces,
    FEDERATION_SURFACE_KEY.paletteEntryGroup,
  )
    ? filterSurface(
        hosts.paletteEntryGroup.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  const apiGroup = isSurfaceSelected(input.selectedSurfaces, FEDERATION_SURFACE_KEY.apiGroup)
    ? filterSurface(
        hosts.apiGroup.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  const tileGroup = isSurfaceSelected(input.selectedSurfaces, FEDERATION_SURFACE_KEY.tileGroup)
    ? filterSurface(
        hosts.tileGroup.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  const topbar = isSurfaceSelected(input.selectedSurfaces, FEDERATION_SURFACE_KEY.topbar)
    ? filterSurface(
        hosts.topbar.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  const uiAssetPack = isSurfaceSelected(input.selectedSurfaces, FEDERATION_SURFACE_KEY.uiAssetPack)
    ? filterSurface(
        hosts.uiAssetPack.snapshot(),
        input.capabilityFilter,
        input.tenantId,
        redactCapabilityRef,
      )
    : [];
  return {
    sidebar,
    settingsTab,
    paletteEntryGroup,
    apiGroup,
    tileGroup,
    topbar,
    uiAssetPack,
  };
}

async function computeSurfacesEtag(surfaces: FederatedContributionSurfaces): Promise<string> {
  const payload = new TextEncoder().encode(JSON.stringify(surfaces));
  const digest = await crypto.subtle.digest("SHA-256", payload);
  const bytes = new Uint8Array(digest);
  let hex = "";
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

/**
 * Produce the JSON-safe federation envelope for the supplied local
 * hosts. Pure (no I/O outside the crypto digest) and safe to call inside
 * route handlers.
 */
export async function buildFederatedSnapshot(
  input: FederationSnapshotInput,
): Promise<FederatedContributionSnapshot> {
  const surfaces = filterSurfaces(input.hosts, input);
  const etag = await computeSurfacesEtag(surfaces);
  const nowFn = input.now ?? (() => new Date());
  return {
    schemaVersion: FEDERATION_SNAPSHOT_SCHEMA_VERSION,
    peer: input.peer,
    snapshotAt: nowFn().toISOString(),
    etag,
    surfaces,
  };
}
