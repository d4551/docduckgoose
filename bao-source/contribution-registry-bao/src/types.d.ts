/**
 * Base contribution-registration shape.
 *
 * Every concrete registration (sidebar, settings-tab, palette-entry-group,
 * api-group, tile-group, etc.) extends {@link BaseContributionRegistration}
 * with surface-specific fields. The base captures the lifecycle invariants
 * the registry factory relies on:
 *
 * - `id` — unique within the registry; collisions are rejected
 *   (`unregister(id)` removes a registration; `unregisterByOwner` clears
 *   every registration with a matching `extensionId`).
 * - `extensionId` — owning `.bao` extension or the synthetic `builtin`
 *   owner for app-seeded registrations; the registry uses it for hot-swap
 *   cleanup.
 *
 * The contribution surface itself is referenced through
 * `EcosystemContributionSurface` re-exported here from
 * `@baohaus/ecosystem-events-bao/types` — there is no duplicate string
 * union in this package.
 *
 * @packageDocumentation
 */
export type {
  EcosystemContributionSurface,
  EcosystemContributionSurfaceKey,
} from "@baohaus/ecosystem-events-bao/types";
export { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
/**
 * Lifecycle-only fields every registration must carry. Concrete
 * surface-specific shapes extend this with their own typed fields
 * (label, href, icon, capability gating, …) in the consuming app.
 *
 * `tenantId` is the optional multi-tenant isolation boundary added in
 * Block 14 of the cycle-3 plan: `null` (the default) marks a global
 * registration visible to every tenant; a non-null string marks a
 * tenant-scoped registration only visible when
 * {@link ContributionRegistry.snapshot} is called with the same
 * `tenantId` in its options. Producers default to `null` for app-seeded
 * built-ins and to `tenantId` (resolved via the canonical
 * `RegistrySession.activeOrganizationId` plumbing) for `.bao` installs
 * issued by a tenant-scoped extension.
 */
export interface BaseContributionRegistration {
  /** Unique registration id within the registry. */
  readonly id: string;
  /** Owning `.bao` extension id, or the synthetic `builtin` owner. */
  readonly extensionId: string;
  /** Multi-tenant isolation boundary; `null` (default) = global visibility. */
  readonly tenantId?: string | null | undefined;
}
export declare const BUILTIN_CONTRIBUTION_EXTENSION_ID = "builtin";
export type ContributionOwnerRef = Pick<BaseContributionRegistration, "extensionId">;
export declare function contributionRegistrationIsHostOwned(
  registration: ContributionOwnerRef,
): boolean;
export declare function resolveContributionEcosystemEnvironmentId(
  registration: ContributionOwnerRef,
): string | undefined;
