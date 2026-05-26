/**
 * Canonical `ApiGroupRegistration` shape + method taxonomy.
 *
 * Single source of truth for every consumer that contributes an API
 * Explorer group through the `.bao` install handler chain: bao-runtime's
 * built-in API groups (one per connected runtime domain), registry's
 * `/api-explorer` route catalog, forge's API explorer view, and any future
 * `.bao` plugin that exposes a connected service catalog. Replaces the
 * prior pattern of each app re-declaring an identical route-catalog group
 * descriptor structurally — the "duck-type narrowing" workaround that
 * violates the no-duplicated-schema-shapes hard ban.
 *
 * Companion canonical surfaces (`sidebar`, `settings-tab`,
 * `palette-entry-group`, `tile-group`) live in sibling subpath modules
 * using the same {@link BaseContributionRegistration} extension pattern.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./types.ts";

/**
 * Canonical HTTP method tokens. Drives the method-badge style and HTMX
 * verb attribute in the API explorer. Matches the `HTTP_METHODS` literal-
 * union already exposed by `@baohaus/openapi-mantou` and consumed by the
 * route-catalog parser in every consumer app. Kept as a literal-union here
 * so contributing packages declare routes without depending on
 * openapi-mantou just to declare a method.
 */
export const API_GROUP_METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
  options: "OPTIONS",
  head: "HEAD",
} as const satisfies Record<string, string>;

/** Canonical HTTP method identifier. */
export type ApiGroupMethod = (typeof API_GROUP_METHODS)[keyof typeof API_GROUP_METHODS];

/**
 * Per-route descriptor inside an {@link ApiGroupRegistration}.
 *
 * `path` is the canonical route path (e.g. `/api/v1/system/health`) the
 * API explorer renders for the user to try. `method` drives the HTMX verb
 * (`hx-get` / `hx-post` / etc.) when the user submits a "Try it" request.
 * The route catalog parser in the consuming app validates that this path
 * exists in the running service before rendering — no client-side stubs
 * across the package boundary.
 */
export interface ApiRouteSpec {
  /** Unique route id within the group registration. */
  readonly id: string;
  /** Canonical HTTP method. */
  readonly method: ApiGroupMethod;
  /** Canonical route path. */
  readonly path: string;
  /** i18n key for the route summary (short description). */
  readonly summaryKey: string;
  /** Optional i18n key for the long description. */
  readonly descriptionKey?: string;
  /** Optional capability id used for visibility gating per route. */
  readonly capabilityRef?: string;
}

/**
 * API-explorer group registration descriptor.
 *
 * `serviceId` identifies the connected service the group corresponds to
 * (e.g. `bao-runtime`, `registry`, `forge`, `bao-ai-gateway`); the API
 * explorer renders one tab per service group. `baseUrl` is the resolved
 * origin the consuming app uses to issue Try-it requests; it lives in the
 * owning app's ecosystem-links config seam, not hard-coded here.
 * `position` drives tab order within the explorer; ties break by id.
 *
 * Extends {@link BaseContributionRegistration} so the canonical registry
 * factory's lifecycle invariants (`id`, `extensionId`, `tenantId`) flow
 * through.
 */
export interface ApiGroupRegistration extends BaseContributionRegistration {
  /** Connected-service identifier (e.g. `bao-runtime`, `registry`). */
  readonly serviceId: string;
  /** i18n key for the group label (tab heading). */
  readonly labelKey: string;
  /** Resolved service origin used for Try-it requests. */
  readonly baseUrl: string;
  /** Sort key within the explorer; ties break by id. */
  readonly position: number;
  /** Ordered route descriptors. */
  readonly routes: readonly ApiRouteSpec[];
  /** Optional capability id used for visibility gating on the whole group. */
  readonly capabilityRef?: string;
  /** Optional feature flag key used for visibility gating on the whole group. */
  readonly featureFlag?: string;
}
