/**
 * Canonical `SidebarRegistration` shape + section taxonomy.
 *
 * Single source of truth for every consumer that contributes a sidebar
 * entry through the `.bao` install handler chain: bao-runtime's built-in
 * seeder, the seven baodown-* node packages, and any future `.bao` plugin
 * that contributes navigation. Replaces the prior pattern of each
 * contributing package re-declaring an identical interface structurally
 * (the "duck-type narrowing" workaround that violated the
 * no-duplicated-schema-shapes hard ban).
 *
 * Per the governance allowlist in the root `CLAUDE.md`, surface-specific
 * shapes were originally hosted with the surface's owning consumer
 * (bao-runtime owned `SidebarRegistration`). The contribution-registry-bao
 * CLAUDE.md anticipated "future cycles graduate canonical surface shapes
 * into this package" — this is that graduation for the sidebar surface.
 *
 * Companion canonical surfaces (`settings-tab`, `palette-entry-group`,
 * `api-group`, `tile-group`) live in sibling subpath modules using the
 * same {@link BaseContributionRegistration} extension pattern.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./types.ts";

/**
 * Canonical sidebar sections, in render order. Single source of truth for
 * the cross-app navigation taxonomy: every consumer app (bao-runtime,
 * registry, forge, bao-ai-gateway) renders sections in this order, and
 * every `.bao` plugin contributing a sidebar entry must land in one of
 * these section ids — the validator (`isSidebarRegistration`) rejects any
 * other value.
 *
 * The 12 canonical sections collapse the previously-split section
 * vocabularies: bao-runtime's 7-section list (operations, automation,
 * imaging, intelligence, hardware, commerce, system) and the
 * `@baohaus/happydumpling/defaults/navigation` ECOSYSTEM_NAVIGATION
 * 11-section list (overview, runtime, intelligence, hardware, commerce,
 * automation, clinical, spatial, operate, develop, administer) into one
 * agreed taxonomy. `operate` collapsed into `operations`; `administer`
 * collapsed into `system`. New sections require a coordinated PR across
 * this file + `defaults/navigation.ts` + every consumer app's i18n module.
 *
 * Adding a section requires:
 *  1. Append a `<section>: { id: "<section>", order: N }` entry here.
 *  2. Add the matching `nav.section.<section>` key to every consumer
 *     app's locale source.
 *  3. Decide whether ECOSYSTEM_NAVIGATION grows a section header for it.
 */
export const SIDEBAR_SECTIONS = {
  overview: { id: "overview", order: 0 },
  operations: { id: "operations", order: 1 },
  runtime: { id: "runtime", order: 2 },
  automation: { id: "automation", order: 3 },
  imaging: { id: "imaging", order: 4 },
  spatial: { id: "spatial", order: 5 },
  intelligence: { id: "intelligence", order: 6 },
  hardware: { id: "hardware", order: 7 },
  commerce: { id: "commerce", order: 8 },
  clinical: { id: "clinical", order: 9 },
  develop: { id: "develop", order: 10 },
  system: { id: "system", order: 11 },
} as const satisfies Record<string, { readonly id: string; readonly order: number }>;

/** Canonical sidebar section identifier. */
export type SidebarSectionId = (typeof SIDEBAR_SECTIONS)[keyof typeof SIDEBAR_SECTIONS]["id"];

/**
 * Sidebar registration descriptor.
 *
 * `labelKey`, `iconName`, and `tooltipKey` are typed as plain `string`
 * here so contributing packages do not need to depend on the consumer
 * app's icon / label-key taxonomy. Consumers that want tighter typing
 * (e.g. bao-runtime's `HtmxSidebarLabelKey`) intersect this shape with a
 * narrower per-app variant at the seam where their built-in sidebar is
 * declared — runtime validation (`isSidebarRegistration` in the install
 * handler) is the source of truth either way.
 *
 * Extends {@link BaseContributionRegistration} so the canonical registry
 * factory's lifecycle invariants (`id`, `extensionId`) flow through.
 */
export interface SidebarRegistration extends BaseContributionRegistration {
  /** Section the row contributes to. */
  readonly section: SidebarSectionId;
  /** Sort key within section; ties break by id. */
  readonly position: number;
  /** i18n key for the label. */
  readonly labelKey: string;
  /** Canonical href; lives in the owning route-constants module. */
  readonly href: string;
  /** Optional canonical icon name (preferred over inline svg). */
  readonly iconName?: string;
  /** Optional inline SVG for extensions; rendered as decorative. */
  readonly iconSvg?: string;
  /** Optional tooltip i18n key; falls back to {@link labelKey}. */
  readonly tooltipKey?: string;
  /** Optional capability id used for visibility gating. */
  readonly capabilityRef?: string;
  /** Optional feature flag key used for visibility gating. */
  readonly featureFlag?: string;
  /**
   * Role required to view the entry. Mirrors the Elysia route guard's
   * `roles: [...]` so the entry is hidden for sessions whose role does
   * not match. Evaluated alongside capability + feature flag in the
   * canonical access decision.
   */
  readonly requiredRole?: string;
  /** Optional parent registration id for nested children. */
  readonly parentId?: string;
}

/**
 * Canonical access context evaluated by {@link canRenderSidebarRegistration}.
 *
 * Every Bao app (registry, bao-runtime, forge, bao-ai-gateway, bao-desktop)
 * builds the context from its session resolver + feature-flag service +
 * RBAC layer, then passes it into {@link filterSidebarRegistrationsByAccess}
 * to filter the snapshot before rendering. The boolean composition rules
 * live here exactly once — duplicating them per consumer is the
 * "duplicated wire shape" hard ban violation this seam exists to prevent.
 */
export interface SidebarAccessContext {
  readonly capabilities: ReadonlySet<string>;
  readonly role: string | null;
  readonly featureFlags: ReadonlySet<string>;
}

/**
 * Pure access decision for a single registration. Returns `true` when every
 * declared gate (`capabilityRef`, `requiredRole`, `featureFlag`) is satisfied
 * by the provided context. Absence of a gate means "always visible".
 */
export function canRenderSidebarRegistration(
  registration: SidebarRegistration,
  context: SidebarAccessContext,
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
 * Filter a snapshot through {@link canRenderSidebarRegistration}, preserving
 * order. Consumers call this BEFORE projecting registrations into the
 * `SidebarNavigationProps.items` shape rendered by
 * `@baohaus/happydumpling/server/partials/sidebar`.
 */
export function filterSidebarRegistrationsByAccess(
  items: readonly SidebarRegistration[],
  context: SidebarAccessContext,
): readonly SidebarRegistration[] {
  const out: SidebarRegistration[] = [];
  for (const item of items) {
    if (canRenderSidebarRegistration(item, context)) {
      out.push(item);
    }
  }
  return out;
}
