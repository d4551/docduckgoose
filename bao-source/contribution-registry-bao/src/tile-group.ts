/**
 * Canonical `TileGroupRegistration` shape + tile-width taxonomy.
 *
 * Single source of truth for every consumer that contributes a dashboard
 * tile through the `.bao` install handler chain: the canonical
 * `renderDashboardLayout` partial in `@baohaus/happydumpling`, bao-runtime's
 * dashboard composer, and any future `.bao` plugin that contributes a
 * dashboard tile. Replaces the prior pattern of dashboard layouts only
 * being driven by hardcoded panel definitions in
 * `bao-runtime/.../dashboard-panels.ts` — `.bao` extensions can now
 * register dashboard tiles through the same lifecycle every other
 * surface uses.
 *
 * Companion canonical surfaces (`sidebar`, `settings-tab`,
 * `palette-entry-group`, `api-group`) live in sibling subpath modules
 * using the same {@link BaseContributionRegistration} extension pattern.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./types.ts";

/**
 * Canonical tile width tokens. Matches `BaoEcosystemDashboardPanelSize`
 * already exposed by `@baohaus/bao-schemas/bao-ecosystem` and consumed by
 * the `renderDashboardLayout` partial's per-tile size class table. Kept
 * as a literal-union here so contributing packages don't need to depend
 * on the bao-schemas package just to declare a tile.
 */
export const TILE_GROUP_WIDTHS = {
  narrow: "narrow",
  wide: "wide",
  full: "full",
} as const satisfies Record<string, string>;

/** Canonical tile width identifier. */
export type TileGroupWidth = (typeof TILE_GROUP_WIDTHS)[keyof typeof TILE_GROUP_WIDTHS];

/**
 * Per-tile descriptor inside a {@link TileGroupRegistration}.
 *
 * `renderUrl` is the canonical HTMX `hx-get` endpoint the dashboard host
 * uses to lazy-load the tile body. The contributing package owns the
 * route at that path; the dashboard host only triggers the load and
 * swaps the response into the tile slot. No client-side templating
 * across the package boundary.
 */
export interface TileSpec {
  /** Unique tile id within the registration. */
  readonly id: string;
  /** i18n key for the tile header label. */
  readonly labelKey: string;
  /** Canonical width token; drives the grid-column span. */
  readonly width: TileGroupWidth;
  /** HTMX `hx-get` URL that returns the tile body fragment. */
  readonly renderUrl: string;
  /** Optional capability id used for visibility gating. */
  readonly capabilityRef?: string;
}

/**
 * Tile-group registration descriptor.
 *
 * `dashboardId` keys the tile group against a specific dashboard surface
 * (e.g. `crm`, `ecommerce`, `gen-ai`) so a single `.bao` extension can
 * contribute different tile sets to different dashboards. The default
 * tile order is the array's index; user-saved layouts override this via
 * `RegistrySessionDashboardLayout.tiles` on the canonical session
 * payload.
 *
 * Extends {@link BaseContributionRegistration} so the canonical registry
 * factory's lifecycle invariants (`id`, `extensionId`) flow through.
 */
export interface TileGroupRegistration extends BaseContributionRegistration {
  /** Dashboard surface the tile group contributes to. */
  readonly dashboardId: string;
  /** Sort key within dashboard; ties break by id. */
  readonly position: number;
  /** Ordered tile descriptors. */
  readonly tiles: readonly TileSpec[];
  /** Optional capability id used for visibility gating on the whole group. */
  readonly capabilityRef?: string;
}
