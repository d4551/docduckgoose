/**
 * Canonical `SettingsTabRegistration` shape + section taxonomy.
 *
 * Single source of truth for every consumer that contributes a tab to the
 * Settings Workbench through the `.bao` install handler chain: bao-runtime's
 * built-in settings tabs (general, environment, apis, features, instructions,
 * agents, shortcuts, ecosystem), the Bao Agent Web settings dialog, and any
 * future `.bao` plugin that contributes a settings tab. Replaces the prior
 * pattern of each app re-declaring an identical tab descriptor structurally —
 * the "duck-type narrowing" workaround that violates the
 * no-duplicated-schema-shapes hard ban.
 *
 * Companion canonical surfaces (`sidebar`, `palette-entry-group`,
 * `api-group`, `tile-group`) live in sibling subpath modules using the same
 * {@link BaseContributionRegistration} extension pattern.
 *
 * @packageDocumentation
 */
import type { BaseContributionRegistration } from "./types.ts";
/**
 * Canonical settings-workbench sections, in render order. New sections
 * require a deliberate code change here so the cross-app settings taxonomy
 * stays curated rather than drifting per-app. The `order` field drives the
 * default snapshot ordering used by `createContributionRegistry`'s
 * `compare` callback in every consumer app.
 *
 * Matches the `agent-workspace/copy` settings-tab labels emitted by
 * `@baohaus/happydumpling`'s shell partial (`settingsTabGeneral`,
 * `settingsTabEcosystem`, `settingsTabApis`, `settingsTabFeatures`,
 * `settingsTabInstructions`, `settingsTabAgents`, `settingsTabShortcuts`).
 * Contributing packages address sections by id; consumer apps map each id
 * to its localized label through their own i18n module — no hardcoded
 * user-facing strings here.
 */
export declare const SETTINGS_TAB_SECTIONS: {
  readonly general: {
    readonly id: "general";
    readonly order: 0;
  };
  readonly ecosystem: {
    readonly id: "ecosystem";
    readonly order: 1;
  };
  readonly apis: {
    readonly id: "apis";
    readonly order: 2;
  };
  readonly features: {
    readonly id: "features";
    readonly order: 3;
  };
  readonly instructions: {
    readonly id: "instructions";
    readonly order: 4;
  };
  readonly agents: {
    readonly id: "agents";
    readonly order: 5;
  };
  readonly shortcuts: {
    readonly id: "shortcuts";
    readonly order: 6;
  };
};
/** Canonical settings-tab section identifier. */
export type SettingsTabSectionId =
  (typeof SETTINGS_TAB_SECTIONS)[keyof typeof SETTINGS_TAB_SECTIONS]["id"];
/**
 * Settings-tab registration descriptor.
 *
 * `labelKey`, `iconName`, and `tooltipKey` are typed as plain `string` here
 * so contributing packages do not need to depend on the consumer app's icon
 * / label-key taxonomy. Consumers that want tighter typing intersect this
 * shape with a narrower per-app variant at the seam where their built-in
 * settings tabs are declared — runtime validation (`isSettingsTabRegistration`
 * in the install handler) is the source of truth either way.
 *
 * `contentUrl` is the canonical HTMX `hx-get` endpoint the workbench host
 * uses to lazy-load the tab body. The contributing package owns the route
 * at that path; the workbench host only triggers the load and swaps the
 * response into the tab panel slot — no client-side templating across the
 * package boundary.
 *
 * Extends {@link BaseContributionRegistration} so the canonical registry
 * factory's lifecycle invariants (`id`, `extensionId`, `tenantId`) flow
 * through.
 */
export interface SettingsTabRegistration extends BaseContributionRegistration {
  /** Section the tab contributes to. */
  readonly section: SettingsTabSectionId;
  /** Sort key within section; ties break by id. */
  readonly position: number;
  /** i18n key for the tab label. */
  readonly labelKey: string;
  /** HTMX `hx-get` URL that returns the tab body fragment. */
  readonly contentUrl: string;
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
}
