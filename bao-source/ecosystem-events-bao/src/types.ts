/**
 * Ecosystem contribution event types.
 *
 * Canonical wire shapes for the in-process event bus that fans out
 * contribution-surface changes (sidebar / settings-tab /
 * palette-entry-group / api-group / tile-group) to every connected
 * subscriber. Every consumer app (registry, bao-runtime, forge,
 * bao-agent, bao-desktop, .bao AI Gateway) imports these types via the
 * canonical submodule subpath; redeclaring them in impl code is the
 * "no duplicated wire shapes" hard-ban violation this contract surface
 * exists to prevent.
 *
 * @packageDocumentation
 */

/**
 * Contribution-surface discriminator. Held as an `as const` map per the
 * STANDARDS no-enum rule; the literal-union {@link EcosystemContributionSurface}
 * is the only string-typing path permitted in impl code — no string
 * literals at call sites.
 *
 * The five surfaces mirror the four contribution-target kinds declared
 * in `@baohaus/bao-sdk/target-kinds` plus the existing `sidebar` kind:
 *
 * - `sidebar` — navigation entries contributed by `.bao` packages.
 * - `settings-tab` — Settings Workbench tabs (built-in + contributed).
 * - `palette-entry-group` — Command Palette entry groups.
 * - `api-group` — API Explorer tab groups (one per connected service).
 * - `tile-group` — Dashboard tile catalogs.
 * - `ui-asset-pack` — UI/UX asset bundles contributed by `.bao` packages
 *   (theme-pack / design-tokens / motion-preset / density-preset). Drives
 *   the Settings Workbench Appearance card refresh and the shell `<head>`
 *   stylesheet-link injection so installed visual assets become live
 *   without a page reload.
 * - `topbar` — Topbar end-slot region. Drives live updates of the
 *   ecosystem-session-indicator + account dropdown + per-peer presence
 *   badges when a connected `.bao` ecosystem peer comes online/offline
 *   or capability grants change. The shell renders the topbar with an
 *   `<aside>`-style SSE subscription on its `<nav>` element; the SSE
 *   renderer emits `<div id="topbar-end-slot" hx-swap-oob="true">…</div>`
 *   so the slot updates without a page reload.
 */
export const ECOSYSTEM_CONTRIBUTION_SURFACE = {
  sidebar: "sidebar",
  settingsTab: "settings-tab",
  paletteEntryGroup: "palette-entry-group",
  apiGroup: "api-group",
  tileGroup: "tile-group",
  uiAssetPack: "ui-asset-pack",
  topbar: "topbar",
} as const;

export type EcosystemContributionSurfaceKey = keyof typeof ECOSYSTEM_CONTRIBUTION_SURFACE;
export type EcosystemContributionSurface =
  (typeof ECOSYSTEM_CONTRIBUTION_SURFACE)[EcosystemContributionSurfaceKey];

/**
 * Why the surface's registration set is being broadcast. Triggers a
 * re-render of the affected fragment in every subscribing SSE sink.
 */
export const ECOSYSTEM_CONTRIBUTION_CHANGE = {
  installed: "installed",
  uninstalled: "uninstalled",
  capabilityReevaluated: "capability-reevaluated",
} as const;

export type EcosystemContributionChangeKey = keyof typeof ECOSYSTEM_CONTRIBUTION_CHANGE;
export type EcosystemContributionChange =
  (typeof ECOSYSTEM_CONTRIBUTION_CHANGE)[EcosystemContributionChangeKey];

/**
 * Published when a `.bao` package install / uninstall / capability
 * re-evaluation changes a contribution surface's registration set.
 *
 * The bus broadcasts unconditionally; the per-subscriber filter
 * (`shouldDeliverEvent` in `./filter`) owns scope reduction. Events
 * with no scope fields apply to every subscriber subject to per-session
 * capability filtering at render time; `tenantId` narrows to subscribers
 * in the same tenant; `userId` narrows to a single user's open tabs
 * (per-user industry-best-practice scope for capability re-eval — Auth0,
 * Okta, AWS IAM, Google Cloud IAM all flush across sessions).
 */
export interface EcosystemContributionEvent {
  /** Affected contribution surface. */
  readonly surface: EcosystemContributionSurface;
  /** Why the surface registration set is being re-broadcast. */
  readonly change: EcosystemContributionChange;
  /** `.bao` extension owner id; empty string for built-in surface re-eval. */
  readonly extensionId: string;
  /**
   * Tenant scope. When present the SSE sink restricts fanout to
   * subscribers whose session's `activeOrganizationId` matches; when
   * absent every subscriber sees it (subject to the per-session
   * capability filter).
   */
  readonly tenantId?: string;
  /**
   * User scope. Set for `capability-reevaluated` events triggered by a
   * single user's role/grant change — the SSE sink fans out to every
   * open tab of that user (matched by `SessionUser.id`) and skips
   * others. Per-user is the industry-best-practice scope for capability
   * re-eval.
   */
  readonly userId?: string;
  /** ISO-8601 timestamp of the publication. */
  readonly publishedAt: string;
  /**
   * Process-stable identifier of the publisher. Set automatically by
   * `publish()` to the local instance id from {@link getLocalInstanceId}
   * so the cross-process bridge (`./bridge`) can drop replays of its
   * own outbound events without rebroadcasting them — the loopback
   * prevention contract every distributed pub/sub topology requires.
   */
  readonly originInstanceId: string;
  /**
   * Stable peer-id literal of the publisher (`"bao-runtime"`,
   * `"registry"`, `"forge"`, `"bao-ai-gateway"`, etc.). Pinned by the
   * publisher's `install-boot-with-baoboss` call via
   * {@link setLocalPeerId}. Distinct from `originInstanceId` (which is
   * a per-process UUID for loopback dedup); `originPeerId` survives
   * process restart and identifies the LOGICAL publisher, so consumers
   * (e.g. `federation-pull` subscriber in `bao-runtime`) can invalidate
   * exactly one peer's cache entry rather than the whole peer table.
   * Absent when the publisher has not pinned a peer-id (legacy single-
   * process deployments fall back to conservative invalidate-all).
   */
  readonly originPeerId?: string;
  /**
   * Stable per-event identifier. Set automatically by `publish()` to a
   * cryptographically-strong random value via `crypto.randomUUID()`. The
   * cross-process bridge tracks recently-seen ids in a bounded LRU so a
   * broker that re-delivers (at-least-once semantics) does not double-
   * dispatch into local subscribers.
   */
  readonly idempotencyKey: string;
}

/** Listener registered with `ecosystemEventBus.subscribe`. */
export type EcosystemContributionListener = (event: EcosystemContributionEvent) => void;

/** Unsubscribe handle returned by `ecosystemEventBus.subscribe`. */
export type EcosystemEventUnsubscribe = () => void;

/**
 * Per-subscriber scope captured at SSE-open time. Used by `./filter` to
 * decide whether a published event applies to this connection.
 */
export interface SubscriberScope {
  /** `null` for anonymous subscribers (events with `userId` set are skipped). */
  readonly userId: string | null;
  /** `null` for subscribers without an active organization (tenant-scoped events skipped). */
  readonly tenantId: string | null;
}

/**
 * Render function supplied by the consumer's SSE-route handler. Called
 * after the per-subscriber filter accepts an event; returns the HTML
 * fragment that will be encoded into the next SSE message.
 *
 * The renderer receives the event so it can decide per-event behaviour
 * (e.g. for `capability-reevaluated` events the renderer re-resolves
 * the session before re-querying contribution-filtered items). The
 * package itself does NOT know about session-resolver semantics —
 * that responsibility stays with the consuming app.
 */
export type EcosystemFragmentRenderer = (
  event: EcosystemContributionEvent,
) => string | Promise<string>;
