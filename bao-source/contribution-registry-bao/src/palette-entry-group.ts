/**
 * Canonical `PaletteEntryGroupRegistration` shape + entry taxonomy.
 *
 * Single source of truth for every consumer that contributes a Command
 * Palette entry group through the `.bao` install handler chain: bao-runtime's
 * built-in palette groups (nav, actions, ecosystem, search), the Bao Agent
 * Web command palette, registry's `Cmd+K` palette, and any future `.bao`
 * plugin that contributes palette entries. Replaces the prior pattern of
 * each app re-declaring an identical group descriptor structurally — the
 * "duck-type narrowing" workaround that violates the
 * no-duplicated-schema-shapes hard ban.
 *
 * Companion canonical surfaces (`sidebar`, `settings-tab`, `api-group`,
 * `tile-group`) live in sibling subpath modules using the same
 * {@link BaseContributionRegistration} extension pattern.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./types.ts";

/**
 * Canonical palette-entry kinds. Drives the entry icon family + filter
 * facet a user can apply in the palette UI. Matches the
 * `CommandPaletteSearchKind` literal-union already exposed by
 * `bao-agent/src/web/workspace-app-types.ts` and the
 * `BaoCommandPaletteSearchEntry` shape consumed by
 * `@baohaus/happydumpling/client/command-palette-query`. Kept as a literal-
 * union here so contributing packages declare entries without depending on
 * the consumer app's kind taxonomy.
 */
export const PALETTE_ENTRY_KINDS = {
  action: "action",
  api: "api",
  environment: "environment",
  group: "group",
  model: "model",
  navigation: "navigation",
  package: "package",
  project: "project",
  sandbox: "sandbox",
  session: "session",
  setting: "setting",
  storage: "storage",
  workspace: "workspace",
  workflow: "workflow",
} as const satisfies Record<string, string>;

/** Canonical palette-entry kind identifier. */
export type PaletteEntryKind = (typeof PALETTE_ENTRY_KINDS)[keyof typeof PALETTE_ENTRY_KINDS];

/**
 * Per-entry descriptor inside a {@link PaletteEntryGroupRegistration}.
 *
 * The palette is keyboard-driven; each entry fires a navigation or an
 * HTMX action when selected via `Enter` or chord. The host palette owns
 * the routing — the contributing package only declares the entry's
 * identity, label, kind, and action target.
 *
 * `actionUrl` is the canonical destination: an absolute or app-local path
 * the host resolves via its route-constants module (no literal route
 * strings outside route-constants per the hard ban).
 */
export interface PaletteEntrySpec {
  /** Unique entry id within the group registration. */
  readonly id: string;
  /** Canonical kind id; drives icon + facet filter. */
  readonly kind: PaletteEntryKind;
  /** i18n key for the entry label. */
  readonly labelKey: string;
  /** Optional i18n key for the entry detail (secondary line). */
  readonly detailKey?: string;
  /** Canonical action URL (route-constants-owned). */
  readonly actionUrl: string;
  /** Optional canonical icon name (preferred over inline svg). */
  readonly iconName?: string;
  /** Optional inline SVG for extensions; rendered as decorative. */
  readonly iconSvg?: string;
  /** Optional keyboard chord (e.g. "g h" for go-home). */
  readonly chord?: string;
  /** Optional capability id used for visibility gating per entry. */
  readonly capabilityRef?: string;
}

/**
 * Palette-entry-group registration descriptor.
 *
 * `headingKey` is the i18n key for the group heading the palette renders
 * above the entries. `position` drives sort order within the group set;
 * ties break by id. Group-level `capabilityRef` gates the whole group;
 * per-entry gates are evaluated independently.
 *
 * Extends {@link BaseContributionRegistration} so the canonical registry
 * factory's lifecycle invariants (`id`, `extensionId`, `tenantId`) flow
 * through.
 */
export interface PaletteEntryGroupRegistration extends BaseContributionRegistration {
  /** i18n key for the group heading. */
  readonly headingKey: string;
  /** Sort key within the palette; ties break by id. */
  readonly position: number;
  /** Ordered entries. */
  readonly entries: readonly PaletteEntrySpec[];
  /** Optional capability id used for visibility gating on the whole group. */
  readonly capabilityRef?: string;
  /** Optional feature flag key used for visibility gating on the whole group. */
  readonly featureFlag?: string;
}
