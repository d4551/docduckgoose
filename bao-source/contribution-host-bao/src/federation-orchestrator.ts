import type { ApiGroupRegistration } from "@baohaus/contribution-registry-bao/api-group";
import type { PaletteEntryGroupRegistration } from "@baohaus/contribution-registry-bao/palette-entry-group";
import {
  SETTINGS_TAB_SECTIONS,
  type SettingsTabRegistration,
  type SettingsTabSectionId,
} from "@baohaus/contribution-registry-bao/settings-tab";
import {
  SIDEBAR_SECTIONS,
  type SidebarRegistration,
  type SidebarSectionId,
} from "@baohaus/contribution-registry-bao/sidebar";
import type { TileGroupRegistration } from "@baohaus/contribution-registry-bao/tile-group";
import {
  TOPBAR_SLOTS,
  type TopbarRegistration,
  type TopbarSlotId,
} from "@baohaus/contribution-registry-bao/topbar";
import type { UiAssetPackRegistration } from "@baohaus/contribution-registry-bao/ui-asset-pack";
import type { FederationSnapshotHosts } from "./federation-snapshot.ts";
import {
  type ValidatedFederatedSnapshot,
  validateFederatedContributionSnapshot,
} from "./federation-validator.ts";
import {
  FEDERATION_SNAPSHOT_ETAG_HEADER,
  FEDERATION_SNAPSHOT_IF_NONE_MATCH_HEADER,
  FEDERATION_SNAPSHOT_ROUTE_PATH,
  type FederatedContributionSnapshot,
  type FederatedPeerIdentity,
} from "./federation-wire.ts";

export type PeerFetchStatus =
  | {
      readonly kind: "served";
      readonly etag: string;
      readonly snapshot: ValidatedFederatedSnapshot;
    }
  | { readonly kind: "not-modified"; readonly etag: string }
  | { readonly kind: "unauthenticated" }
  | { readonly kind: "version-rejected" }
  | { readonly kind: "rate-limited"; readonly retryAfterSeconds: number }
  | { readonly kind: "transport-error"; readonly reason: string }
  | {
      readonly kind: "schema-rejected";
      readonly path: string;
      readonly reason: string;
    };

export interface PeerEndpoint {
  readonly peerId: string;
  readonly origin: string;
  readonly displayName: string;
}

export interface PeerOrchestratorOptions {
  readonly endpoints: readonly PeerEndpoint[];
  readonly localHosts: FederationSnapshotHosts;
  readonly fetchImpl?: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>;
  readonly authorizationHeader?: () => string | null;
  readonly cookieHeader?: () => string | null;
  readonly onPeerStatus?: (peerId: string, status: PeerFetchStatus) => void;
}

interface PeerCacheEntry {
  readonly etag: string;
  readonly mountedIds: ReadonlySet<string>;
}

export interface OrchestratorHandle {
  readonly refreshPeer: (peerId: string) => Promise<PeerFetchStatus>;
  readonly refreshAll: () => Promise<ReadonlyMap<string, PeerFetchStatus>>;
  readonly dropPeer: (peerId: string) => number;
  readonly snapshotPeerEtags: () => ReadonlyMap<string, string>;
}

type WireRow = {
  readonly id: string;
  readonly extensionId: string;
  readonly [k: string]: unknown;
};

function isPeerCapabilityTier(value: string): boolean {
  return value === "t0" || value === "t1" || value === "t2" || value === "t3";
}

function buildFederatedExtensionId(peerId: string, sourceExtensionId: string): string {
  return `federation:${peerId}:${sourceExtensionId}`;
}

function buildFederatedId(peerId: string, sourceId: string): string {
  return `federation:${peerId}:${sourceId}`;
}

function isSidebarSectionId(value: unknown): value is SidebarSectionId {
  if (typeof value !== "string") {
    return false;
  }
  for (const key of Object.keys(SIDEBAR_SECTIONS)) {
    if (key === value) {
      return true;
    }
  }
  return false;
}

function isSettingsTabSectionId(value: unknown): value is SettingsTabSectionId {
  if (typeof value !== "string") {
    return false;
  }
  for (const key of Object.keys(SETTINGS_TAB_SECTIONS)) {
    if (key === value) {
      return true;
    }
  }
  return false;
}

function withTenant<T extends { readonly id: string; readonly extensionId: string }>(
  base: T,
  tenant: unknown,
): T {
  if (typeof tenant === "string" || tenant === null) {
    return { ...base, tenantId: tenant };
  }
  return base;
}

function narrowSidebar(row: WireRow, peerId: string): SidebarRegistration | null {
  const section = row["section"];
  const position = row["position"];
  const labelKey = row["labelKey"];
  const href = row["href"];
  if (
    !isSidebarSectionId(section) ||
    typeof position !== "number" ||
    typeof labelKey !== "string" ||
    typeof href !== "string"
  ) {
    return null;
  }
  const base: SidebarRegistration = {
    id: buildFederatedId(peerId, row.id),
    extensionId: buildFederatedExtensionId(peerId, row.extensionId),
    section,
    position,
    labelKey,
    href,
  };
  return withTenant(base, row["tenantId"]);
}

function narrowSettingsTab(row: WireRow, peerId: string): SettingsTabRegistration | null {
  const section = row["section"];
  const position = row["position"];
  const labelKey = row["labelKey"];
  const contentUrl = row["contentUrl"];
  if (
    !isSettingsTabSectionId(section) ||
    typeof position !== "number" ||
    typeof labelKey !== "string" ||
    typeof contentUrl !== "string"
  ) {
    return null;
  }
  const base: SettingsTabRegistration = {
    id: buildFederatedId(peerId, row.id),
    extensionId: buildFederatedExtensionId(peerId, row.extensionId),
    section,
    position,
    labelKey,
    contentUrl,
  };
  return withTenant(base, row["tenantId"]);
}

function narrowPaletteEntries(value: unknown): PaletteEntryGroupRegistration["entries"] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const out: PaletteEntryGroupRegistration["entries"][number][] = [];
  for (const entry of value) {
    if (entry === null || typeof entry !== "object") {
      return null;
    }
    const indexable: { readonly [k: string]: unknown } = entry;
    const id = indexable["id"];
    const kind = indexable["kind"];
    const labelKey = indexable["labelKey"];
    const actionUrl = indexable["actionUrl"];
    if (
      typeof id !== "string" ||
      typeof kind !== "string" ||
      typeof labelKey !== "string" ||
      typeof actionUrl !== "string"
    ) {
      return null;
    }
    out.push({
      id,
      kind: kind as PaletteEntryGroupRegistration["entries"][number]["kind"],
      labelKey,
      actionUrl,
    });
  }
  return out;
}

function narrowPaletteEntryGroup(
  row: WireRow,
  peerId: string,
): PaletteEntryGroupRegistration | null {
  const headingKey = row["headingKey"];
  const position = row["position"];
  const entries = narrowPaletteEntries(row["entries"]);
  if (typeof headingKey !== "string" || typeof position !== "number" || entries === null) {
    return null;
  }
  const base: PaletteEntryGroupRegistration = {
    id: buildFederatedId(peerId, row.id),
    extensionId: buildFederatedExtensionId(peerId, row.extensionId),
    headingKey,
    position,
    entries,
  };
  return withTenant(base, row["tenantId"]);
}

function narrowApiRoutes(value: unknown): ApiGroupRegistration["routes"] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const out: ApiGroupRegistration["routes"][number][] = [];
  for (const route of value) {
    if (route === null || typeof route !== "object") {
      return null;
    }
    const indexable: { readonly [k: string]: unknown } = route;
    const id = indexable["id"];
    const path = indexable["path"];
    const method = indexable["method"];
    const summaryKey = indexable["summaryKey"];
    if (
      typeof id !== "string" ||
      typeof path !== "string" ||
      typeof method !== "string" ||
      typeof summaryKey !== "string"
    ) {
      return null;
    }
    out.push({
      id,
      path,
      method: method as ApiGroupRegistration["routes"][number]["method"],
      summaryKey,
    });
  }
  return out;
}

function narrowApiGroup(row: WireRow, peerId: string): ApiGroupRegistration | null {
  const serviceId = row["serviceId"];
  const labelKey = row["labelKey"];
  const baseUrl = row["baseUrl"];
  const position = row["position"];
  const routes = narrowApiRoutes(row["routes"]);
  if (
    typeof serviceId !== "string" ||
    typeof labelKey !== "string" ||
    typeof baseUrl !== "string" ||
    typeof position !== "number" ||
    routes === null
  ) {
    return null;
  }
  const base: ApiGroupRegistration = {
    id: buildFederatedId(peerId, row.id),
    extensionId: buildFederatedExtensionId(peerId, row.extensionId),
    serviceId,
    labelKey,
    baseUrl,
    position,
    routes,
  };
  return withTenant(base, row["tenantId"]);
}

function narrowTileSpecs(value: unknown): TileGroupRegistration["tiles"] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const out: TileGroupRegistration["tiles"][number][] = [];
  for (const tile of value) {
    if (tile === null || typeof tile !== "object") {
      return null;
    }
    const indexable: { readonly [k: string]: unknown } = tile;
    const id = indexable["id"];
    const labelKey = indexable["labelKey"];
    const width = indexable["width"];
    const renderUrl = indexable["renderUrl"];
    if (
      typeof id !== "string" ||
      typeof labelKey !== "string" ||
      typeof width !== "string" ||
      typeof renderUrl !== "string"
    ) {
      return null;
    }
    out.push({
      id,
      labelKey,
      width: width as TileGroupRegistration["tiles"][number]["width"],
      renderUrl,
    });
  }
  return out;
}

function narrowTileGroup(row: WireRow, peerId: string): TileGroupRegistration | null {
  const dashboardId = row["dashboardId"];
  const position = row["position"];
  const tiles = narrowTileSpecs(row["tiles"]);
  if (typeof dashboardId !== "string" || typeof position !== "number" || tiles === null) {
    return null;
  }
  const base: TileGroupRegistration = {
    id: buildFederatedId(peerId, row.id),
    extensionId: buildFederatedExtensionId(peerId, row.extensionId),
    dashboardId,
    position,
    tiles,
  };
  return withTenant(base, row["tenantId"]);
}

function isTopbarSlotId(value: unknown): value is TopbarSlotId {
  if (typeof value !== "string") {
    return false;
  }
  for (const key of Object.keys(TOPBAR_SLOTS)) {
    if (key === value) {
      return true;
    }
  }
  return false;
}

function narrowTopbar(row: WireRow, peerId: string): TopbarRegistration | null {
  const slot = row["slot"];
  const position = row["position"];
  const labelKey = row["labelKey"];
  if (!isTopbarSlotId(slot) || typeof position !== "number" || typeof labelKey !== "string") {
    return null;
  }
  const iconName = row["iconName"];
  const iconSvg = row["iconSvg"];
  const tooltipKey = row["tooltipKey"];
  const href = row["href"];
  const badgeKey = row["badgeKey"];
  const capabilityRef = row["capabilityRef"];
  const featureFlag = row["featureFlag"];
  const requiredRole = row["requiredRole"];
  const base: TopbarRegistration = {
    id: buildFederatedId(peerId, row.id),
    extensionId: buildFederatedExtensionId(peerId, row.extensionId),
    slot,
    position,
    labelKey,
    ...(typeof iconName === "string" ? { iconName } : {}),
    ...(typeof iconSvg === "string" ? { iconSvg } : {}),
    ...(typeof tooltipKey === "string" ? { tooltipKey } : {}),
    ...(typeof href === "string" ? { href } : {}),
    ...(typeof badgeKey === "string" ? { badgeKey } : {}),
    ...(typeof capabilityRef === "string" ? { capabilityRef } : {}),
    ...(typeof featureFlag === "string" ? { featureFlag } : {}),
    ...(typeof requiredRole === "string" ? { requiredRole } : {}),
  };
  return withTenant(base, row["tenantId"]);
}

function mergeSidebar(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowSidebar(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.sidebar.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function mergeSettingsTab(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowSettingsTab(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.settingsTab.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function mergePaletteEntryGroup(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowPaletteEntryGroup(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.paletteEntryGroup.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function mergeApiGroup(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowApiGroup(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.apiGroup.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function mergeTileGroup(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowTileGroup(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.tileGroup.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function mergeTopbar(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowTopbar(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.topbar.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function narrowUiAssetPackKind(value: unknown): UiAssetPackRegistration["kind"] | null {
  if (
    value === "theme-pack" ||
    value === "design-tokens" ||
    value === "motion-preset" ||
    value === "density-preset"
  ) {
    return value;
  }
  return null;
}

function narrowUiAssetPackColorScheme(value: unknown): "light" | "dark" | null {
  if (value === "light" || value === "dark") {
    return value;
  }
  return null;
}

function narrowStringArray(value: unknown): readonly string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  for (const entry of value) {
    if (typeof entry !== "string") {
      return null;
    }
  }
  return value as readonly string[];
}

function narrowUiAssetPackMotionProfile(value: unknown): "calm" | "standard" | "expressive" | null {
  if (value === "calm" || value === "standard" || value === "expressive") {
    return value;
  }
  return null;
}

function narrowUiAssetPackDensityLevel(
  value: unknown,
): "compact" | "comfortable" | "spacious" | null {
  if (value === "compact" || value === "comfortable" || value === "spacious") {
    return value;
  }
  return null;
}

function narrowUiAssetPackTokenCategories(
  value: unknown,
): readonly ("spacing" | "radius" | "shadow" | "motion-curve" | "typography")[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  const out: ("spacing" | "radius" | "shadow" | "motion-curve" | "typography")[] = [];
  for (const entry of value) {
    if (
      entry !== "spacing" &&
      entry !== "radius" &&
      entry !== "shadow" &&
      entry !== "motion-curve" &&
      entry !== "typography"
    ) {
      return null;
    }
    out.push(entry);
  }
  return out;
}

function narrowUiAssetPack(row: WireRow, peerId: string): UiAssetPackRegistration | null {
  const kind = narrowUiAssetPackKind(row["kind"]);
  const stylesheet = row["stylesheet"];
  if (kind === null || typeof stylesheet !== "string") {
    return null;
  }
  const id = buildFederatedId(peerId, row.id);
  const extensionId = buildFederatedExtensionId(peerId, row.extensionId);
  const capabilityRefRaw = row["capabilityRef"];
  const capabilityRef = typeof capabilityRefRaw === "string" ? capabilityRefRaw : undefined;
  if (kind === "theme-pack") {
    const themeId = row["themeId"];
    const colorScheme = narrowUiAssetPackColorScheme(row["colorScheme"]);
    const daisyUiVersionRange = row["daisyUiVersionRange"];
    if (
      typeof themeId !== "string" ||
      colorScheme === null ||
      typeof daisyUiVersionRange !== "string"
    ) {
      return null;
    }
    const base: UiAssetPackRegistration = {
      id,
      extensionId,
      kind,
      themeId,
      colorScheme,
      daisyUiVersionRange,
      stylesheet,
      ...(capabilityRef === undefined ? {} : { capabilityRef }),
    };
    return withTenant(base, row["tenantId"]);
  }
  if (kind === "design-tokens") {
    const tokenSetId = row["tokenSetId"];
    const categories = narrowUiAssetPackTokenCategories(row["categories"]);
    if (typeof tokenSetId !== "string" || categories === null) {
      return null;
    }
    const base: UiAssetPackRegistration = {
      id,
      extensionId,
      kind,
      tokenSetId,
      categories,
      stylesheet,
      ...(capabilityRef === undefined ? {} : { capabilityRef }),
    };
    return withTenant(base, row["tenantId"]);
  }
  if (kind === "motion-preset") {
    const presetId = row["presetId"];
    const profile = narrowUiAssetPackMotionProfile(row["profile"]);
    const respectsReducedMotion = row["respectsReducedMotion"];
    if (typeof presetId !== "string" || profile === null || respectsReducedMotion !== true) {
      return null;
    }
    const base: UiAssetPackRegistration = {
      id,
      extensionId,
      kind,
      presetId,
      profile,
      respectsReducedMotion: true,
      stylesheet,
      ...(capabilityRef === undefined ? {} : { capabilityRef }),
    };
    return withTenant(base, row["tenantId"]);
  }
  const presetId = row["presetId"];
  const density = narrowUiAssetPackDensityLevel(row["density"]);
  if (typeof presetId !== "string" || density === null) {
    return null;
  }
  const base: UiAssetPackRegistration = {
    id,
    extensionId,
    kind,
    presetId,
    density,
    stylesheet,
    ...(capabilityRef === undefined ? {} : { capabilityRef }),
  };
  return withTenant(base, row["tenantId"]);
}

function mergeUiAssetPack(
  rows: readonly WireRow[],
  peerId: string,
  hosts: FederationSnapshotHosts,
  mounted: Set<string>,
): void {
  for (const raw of rows) {
    const reg = narrowUiAssetPack(raw, peerId);
    if (reg === null) {
      continue;
    }
    const result = hosts.uiAssetPack.register(reg);
    if (result.ok) {
      mounted.add(reg.id);
    }
  }
}

function unmountAllOwned(mountedIds: ReadonlySet<string>, hosts: FederationSnapshotHosts): number {
  let removed = 0;
  for (const id of mountedIds) {
    if (hosts.sidebar.unregister(id)) {
      removed += 1;
      continue;
    }
    if (hosts.settingsTab.unregister(id)) {
      removed += 1;
      continue;
    }
    if (hosts.paletteEntryGroup.unregister(id)) {
      removed += 1;
      continue;
    }
    if (hosts.apiGroup.unregister(id)) {
      removed += 1;
      continue;
    }
    if (hosts.tileGroup.unregister(id)) {
      removed += 1;
      continue;
    }
    if (hosts.topbar.unregister(id)) {
      removed += 1;
      continue;
    }
    if (hosts.uiAssetPack.unregister(id)) {
      removed += 1;
    }
  }
  return removed;
}

function applySnapshot(
  snapshot: ValidatedFederatedSnapshot,
  peerId: string,
  hosts: FederationSnapshotHosts,
): ReadonlySet<string> {
  const mounted = new Set<string>();
  mergeSidebar(snapshot.surfaces.sidebar, peerId, hosts, mounted);
  mergeSettingsTab(snapshot.surfaces.settingsTab, peerId, hosts, mounted);
  mergePaletteEntryGroup(snapshot.surfaces.paletteEntryGroup, peerId, hosts, mounted);
  mergeApiGroup(snapshot.surfaces.apiGroup, peerId, hosts, mounted);
  mergeTileGroup(snapshot.surfaces.tileGroup, peerId, hosts, mounted);
  mergeTopbar(snapshot.surfaces.topbar, peerId, hosts, mounted);
  mergeUiAssetPack(snapshot.surfaces.uiAssetPack, peerId, hosts, mounted);
  return mounted;
}

async function probePeer(
  endpoint: PeerEndpoint,
  priorEtag: string | undefined,
  fetchImpl: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>,
  headers: Headers,
): Promise<PeerFetchStatus> {
  const url = `${endpoint.origin}${FEDERATION_SNAPSHOT_ROUTE_PATH}`;
  if (priorEtag !== undefined) {
    headers.set(FEDERATION_SNAPSHOT_IF_NONE_MATCH_HEADER, priorEtag);
  }
  const response = await fetchImpl(url, {
    method: "GET",
    credentials: "include",
    headers,
  });
  if (response.status === 304) {
    const etag = response.headers.get(FEDERATION_SNAPSHOT_ETAG_HEADER) ?? priorEtag ?? "";
    return { kind: "not-modified", etag };
  }
  if (response.status === 401) {
    return { kind: "unauthenticated" };
  }
  if (response.status === 406) {
    return { kind: "version-rejected" };
  }
  if (response.status === 429) {
    const retryAfterRaw = response.headers.get("retry-after");
    const retryAfterSeconds = retryAfterRaw === null ? 60 : Number(retryAfterRaw);
    return {
      kind: "rate-limited",
      retryAfterSeconds: Number.isFinite(retryAfterSeconds) ? retryAfterSeconds : 60,
    };
  }
  if (response.status !== 200) {
    return { kind: "transport-error", reason: `http-${response.status}` };
  }
  const etag = response.headers.get(FEDERATION_SNAPSHOT_ETAG_HEADER) ?? "";
  const body = await response.json();
  const validation = validateFederatedContributionSnapshot(body);
  if (!validation.ok) {
    return {
      kind: "schema-rejected",
      path: validation.path,
      reason: validation.reason,
    };
  }
  return { kind: "served", etag, snapshot: validation.value };
}

export function createFederationOrchestrator(options: PeerOrchestratorOptions): OrchestratorHandle {
  const fetchImpl = options.fetchImpl ?? fetch;
  const cache = new Map<string, PeerCacheEntry>();
  const endpointsByPeer = new Map<string, PeerEndpoint>();
  for (const endpoint of options.endpoints) {
    endpointsByPeer.set(endpoint.peerId, endpoint);
  }

  const buildHeaders = (): Headers => {
    const h = new Headers({ accept: "application/json" });
    const authHeader = options.authorizationHeader?.() ?? null;
    if (authHeader !== null && authHeader.length > 0) {
      h.set("authorization", authHeader);
    }
    const cookieHeader = options.cookieHeader?.() ?? null;
    if (cookieHeader !== null && cookieHeader.length > 0) {
      h.set("cookie", cookieHeader);
    }
    return h;
  };

  const refreshPeer = async (peerId: string): Promise<PeerFetchStatus> => {
    const endpoint = endpointsByPeer.get(peerId);
    if (endpoint === undefined) {
      return { kind: "transport-error", reason: "unknown-peer" };
    }
    const prior = cache.get(peerId);
    const headers = buildHeaders();
    const status = await probePeer(endpoint, prior?.etag, fetchImpl, headers);
    if (status.kind === "served") {
      if (prior !== undefined) {
        unmountAllOwned(prior.mountedIds, options.localHosts);
      }
      const mounted = applySnapshot(status.snapshot, peerId, options.localHosts);
      cache.set(peerId, { etag: status.etag, mountedIds: mounted });
    }
    options.onPeerStatus?.(peerId, status);
    return status;
  };

  const refreshAll = async (): Promise<ReadonlyMap<string, PeerFetchStatus>> => {
    const out = new Map<string, PeerFetchStatus>();
    const results = await Promise.all(
      options.endpoints.map(async (endpoint) => {
        const status = await refreshPeer(endpoint.peerId);
        return { peerId: endpoint.peerId, status };
      }),
    );
    for (const { peerId, status } of results) {
      out.set(peerId, status);
    }
    return out;
  };

  const dropPeer = (peerId: string): number => {
    const entry = cache.get(peerId);
    if (entry === undefined) {
      return 0;
    }
    const removed = unmountAllOwned(entry.mountedIds, options.localHosts);
    cache.delete(peerId);
    return removed;
  };

  const snapshotPeerEtags = (): ReadonlyMap<string, string> => {
    const out = new Map<string, string>();
    for (const [peerId, entry] of cache) {
      out.set(peerId, entry.etag);
    }
    return out;
  };

  return { refreshPeer, refreshAll, dropPeer, snapshotPeerEtags };
}

export {
  buildFederatedExtensionId,
  buildFederatedId,
  type FederatedContributionSnapshot,
  type FederatedPeerIdentity,
  isPeerCapabilityTier,
};
