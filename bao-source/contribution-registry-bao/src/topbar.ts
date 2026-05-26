/**
 * Canonical `TopbarRegistration` shape + slot taxonomy.
 *
 * Single source of truth for every consumer that contributes a topbar
 * end-slot entry through the `.bao` install handler chain. Mirrors the
 * sibling-surface pattern established by `./sidebar`,
 * `./palette-entry-group`, and `./tile-group`.
 *
 * Topbar entries land in one of the canonical {@link TOPBAR_SLOTS} slots
 * (start / center / end). The host shell composes the merged registration
 * list inside `renderTopbarEndSlot` and sibling renderers in
 * `@baohaus/happydumpling/server/partials/navbar`.
 *
 * Extends {@link BaseContributionRegistration} so the canonical registry
 * factory's lifecycle invariants (`id`, `extensionId`) flow through.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./types.ts";

/**
 * Canonical topbar slots, in render order. Single source of truth for the
 * cross-app topbar taxonomy: every consumer app renders slots in this
 * order, and every `.bao` plugin contributing a topbar entry must land in
 * one of these slot ids.
 *
 *  - `start`:  Leading region adjacent to the brand mark. Used by
 *              navigation back / breadcrumb-extension chrome.
 *  - `center`: Centered region. Reserved for search / command-palette
 *              triggers and live status badges.
 *  - `end`:    Trailing region. Account dropdown, notifications,
 *              ecosystem-session indicator, theme toggle.
 */
export const TOPBAR_SLOTS = {
  start: { id: "start", order: 0 },
  center: { id: "center", order: 1 },
  end: { id: "end", order: 2 },
} as const satisfies Record<string, { readonly id: string; readonly order: number }>;

/** Canonical topbar slot identifier. */
export type TopbarSlotId = (typeof TOPBAR_SLOTS)[keyof typeof TOPBAR_SLOTS]["id"];

/**
 * Topbar entry registration descriptor.
 *
 * `labelKey`, `iconName`, and `tooltipKey` are typed as plain `string`
 * here so contributing packages do not need to depend on the consumer
 * app's icon / label-key taxonomy. Consumers that want tighter typing
 * intersect this shape with a narrower per-app variant at the seam where
 * their built-in topbar end-slot is declared; runtime validation
 * (`isTopbarRegistration`) is the source of truth either way.
 */
export interface TopbarRegistration extends BaseContributionRegistration {
  /** Slot the entry contributes to. */
  readonly slot: TopbarSlotId;
  /** Sort key within slot; ties break by id. */
  readonly position: number;
  /** i18n key for the entry's primary label (used in aria-label). */
  readonly labelKey: string;
  /** Optional canonical icon name (preferred over inline svg). */
  readonly iconName?: string;
  /** Optional inline SVG for extensions; rendered as decorative. */
  readonly iconSvg?: string;
  /** Optional tooltip i18n key; falls back to {@link labelKey}. */
  readonly tooltipKey?: string;
  /**
   * Optional canonical href; lives in the owning route-constants module.
   * Absence means the entry is a passive indicator (badge / status pill)
   * with no click target.
   */
  readonly href?: string;
  /**
   * Optional badge i18n key; renders next to the icon for entries that
   * surface live counts (notifications, mention badges, queue depth).
   */
  readonly badgeKey?: string;
  /** Optional capability id used for visibility gating. */
  readonly capabilityRef?: string;
  /** Optional feature flag key used for visibility gating. */
  readonly featureFlag?: string;
  /** Role required to view the entry. Same semantics as sidebar. */
  readonly requiredRole?: string;
}

/**
 * Canonical access context evaluated by {@link canRenderTopbarRegistration}.
 *
 * Every Bao app builds the context from its session resolver +
 * feature-flag service + RBAC layer, then passes it into
 * {@link filterTopbarRegistrationsByAccess} to filter the snapshot
 * before rendering.
 */
export interface TopbarAccessContext {
  readonly capabilities: ReadonlySet<string>;
  readonly role: string | null;
  readonly featureFlags: ReadonlySet<string>;
}

/**
 * Pure access decision for a single registration. Returns `true` when
 * every declared gate (`capabilityRef`, `requiredRole`, `featureFlag`) is
 * satisfied by the provided context. Absence of a gate means
 * "always visible".
 */
export function canRenderTopbarRegistration(
  registration: TopbarRegistration,
  context: TopbarAccessContext,
): boolean {
  if (
    registration.capabilityRef !== undefined &&
    !context.capabilities.has(registration.capabilityRef)
  ) {
    return false;
  }
  if (
    registration.requiredRole !== undefined &&
    registration.requiredRole.length > 0 &&
    registration.requiredRole !== context.role
  ) {
    return false;
  }
  if (
    registration.featureFlag !== undefined &&
    !context.featureFlags.has(registration.featureFlag)
  ) {
    return false;
  }
  return true;
}

/**
 * Filter a snapshot through {@link canRenderTopbarRegistration},
 * preserving order. Consumers call this BEFORE projecting registrations
 * into the topbar end-slot props rendered by
 * `@baohaus/happydumpling/server/partials/navbar:renderTopbarEndSlot`.
 */
export function filterTopbarRegistrationsByAccess(
  items: readonly TopbarRegistration[],
  context: TopbarAccessContext,
): readonly TopbarRegistration[] {
  const out: TopbarRegistration[] = [];
  for (const item of items) {
    if (canRenderTopbarRegistration(item, context)) {
      out.push(item);
    }
  }
  return out;
}
