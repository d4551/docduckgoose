/**
 * Canonical tenancy contract schemas.
 *
 * Single source of truth for all tenancy-related TypeBox wire contracts used
 * across bao-runtime (server), registry (fleet projection), bao-core (session
 * projection), happydumpling (UI partials), and the agentic fabric (hot-load
 * context providers).
 *
 * Architecture:
 * - bao-runtime Prisma schema = database truth (AuthUser, Organization, Tenant, Workspace, WorkspaceMember)
 * - This module = wire/contract layer (TypeBox validated, JSON-safe)
 * - bao-core/auth/session = TypeScript projection interfaces (SessionUser, SessionOrganization)
 * - happydumpling imports only from this module (runtime-free, no bao-core)
 * - Agentic fabric context providers consume TenancyFabricContextKey constants
 *
 * @packageDocumentation
 * @since 0.2.0
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Fabric context key for the active organization id (string | null).
 * Hot-loaded .bao packages read this from the fabric context instead of
 * importing from runtime/session directly.
 *
 * @since 0.2.0
 */
export const TENANCY_CTX_ACTIVE_ORG_ID = "tenancy.activeOrganizationId" as const;

/**
 * Fabric context key for the user's tenant id.
 *
 * @since 0.2.0
 */
export const TENANCY_CTX_TENANT_ID = "tenancy.tenantId" as const;

/**
 * Fabric context key for the list of org memberships visible to this session.
 *
 * @since 0.2.0
 */
export const TENANCY_CTX_ORGANIZATIONS = "tenancy.organizations" as const;

/**
 * Fabric context key for the list of workspace memberships visible to this session.
 *
 * @since 0.2.0
 */
export const TENANCY_CTX_WORKSPACES = "tenancy.workspaces" as const;

/**
 * Capability tag that grants a hot-loaded .bao package access to the tenancy
 * context via the fabric context provider.
 *
 * @since 0.2.0
 */
export const BAO_CAPABILITY_TENANCY = "bao.capability.tenancy" as const;

/**
 * Capability tag for packages that can switch the active organization.
 *
 * @since 0.2.0
 */
export const BAO_CAPABILITY_TENANCY_SWITCH = "bao.capability.tenancy.switch" as const;

/**
 * TypeBox schema for an organization membership visible to a session.
 *
 * This is the canonical wire shape consumed by:
 * - happydumpling active-org-chip (import as `TenancyOrganization`)
 * - bao-ecosystem graph (BaoEcosystemTenancyOrganization alias)
 * - session projection (mirrors SessionOrganization in bao-core/auth/session)
 *
 * Field semantics match the better-auth organization plugin output.
 *
 * @since 0.2.0
 */
export const TenancyOrganizationSchema = TypeExports.Object(
  {
    /** Organization UUID (from AuthSession.activeOrganizationId). */
    id: TypeExports.String({ minLength: 1 }),
    /** Human-readable organization name (may be absent on minimal projections). */
    name: TypeExports.Optional(TypeExports.String()),
    /** Stable URL-safe slug. */
    slug: TypeExports.Optional(TypeExports.String()),
    /** Membership role string (e.g. "owner" | "admin" | "member"). */
    role: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Inferred TypeScript type from {@link TenancyOrganizationSchema}.
 *
 * Replaces all local `ActiveOrgChipMembership` mirrors in happydumpling.
 * Structurally identical to `SessionOrganization` in bao-core/auth/session
 * but sourced from bao-schemas so happydumpling stays runtime-free.
 *
 * @since 0.2.0
 */
export type TenancyOrganization = Static<typeof TenancyOrganizationSchema>;

/**
 * TypeBox schema for a workspace membership visible to a session.
 *
 * Structurally identical to {@link TenancyOrganizationSchema} (same id/name/slug/role
 * projection). Aliased separately so consumers can express intent clearly.
 *
 * @since 0.2.0
 */
export const TenancyWorkspaceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.Optional(TypeExports.String()),
    slug: TypeExports.Optional(TypeExports.String()),
    role: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Inferred TypeScript type from {@link TenancyWorkspaceSchema}.
 *
 * @since 0.2.0
 */
export type TenancyWorkspace = Static<typeof TenancyWorkspaceSchema>;

/**
 * TypeBox schema for a resolved tenant scope descriptor.
 *
 * Produced by bao-runtime's tenant-scope resolver; consumed by the fabric
 * context provider to surface tenantId + kind to hot-loaded packages.
 *
 * @since 0.2.0
 */
export const TenantScopeSchema = TypeExports.Object(
  {
    /** Resolved tenant UUID. */
    tenantId: TypeExports.String({ minLength: 1 }),
    /**
     * Tenant kind:
     * - `PERSONAL` — mirrors user's private namespace.
     * - `ORG` — mirrors a better-auth Organization (1:1 by shared id).
     * - `SYSTEM` — reserved escape-hatch (withSystemContext).
     */
    kind: TypeExports.Union([
      TypeExports.Literal("PERSONAL"),
      TypeExports.Literal("ORG"),
      TypeExports.Literal("SYSTEM"),
    ]),
    /** Stable slug for the tenant. */
    slug: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Inferred TypeScript type from {@link TenantScopeSchema}.
 *
 * @since 0.2.0
 */
export type TenantScope = Static<typeof TenantScopeSchema>;

/**
 * TypeBox schema for the payload sent when a user switches active organization.
 *
 * Used by the active-org-chip HTMX handler and any fabric event listener
 * that reacts to org-switch events.
 *
 * @since 0.2.0
 */
export const ActiveOrgSwitchPayloadSchema = TypeExports.Object(
  {
    /** UUID of the organization to switch to, or null to clear active org. */
    organizationId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Inferred TypeScript type from {@link ActiveOrgSwitchPayloadSchema}.
 *
 * @since 0.2.0
 */
export type ActiveOrgSwitchPayload = Static<typeof ActiveOrgSwitchPayloadSchema>;

/**
 * TypeBox schema for an organization membership record as returned by
 * admin directory endpoints.
 *
 * Maps the `OrganizationMember` Prisma model projected over the wire.
 * Used by admin /users handlers and any fabric context provider that
 * needs to surface the full membership list for a tenant.
 *
 * @since 0.2.0
 */
export const TenancyMembershipSchema = TypeExports.Object(
  {
    /** UUID of the organization. */
    organizationId: TypeExports.String({ minLength: 1 }),
    /** UUID of the user. */
    userId: TypeExports.String({ minLength: 1 }),
    /** Membership role string (e.g. "owner" | "admin" | "member"). */
    role: TypeExports.String(),
    /** ISO-8601 timestamp when the membership was created. */
    createdAt: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Inferred TypeScript type from {@link TenancyMembershipSchema}.
 *
 * @since 0.2.0
 */
export type TenancyMembership = Static<typeof TenancyMembershipSchema>;

/**
 * TypeBox schema for the session user projection sent over the wire.
 *
 * This is the TypeBox-validated version of the TypeScript interface
 * `SessionUser` in `bao-core/auth/session`. Clients that need runtime
 * validation (e.g. fabric context providers, HTMX handlers) use this schema;
 * TypeScript-only consumers use `SessionUser` directly.
 *
 * @since 0.2.0
 */
export const SessionUserProjectionSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    email: TypeExports.String({ format: "email" }),
    firstName: TypeExports.String(),
    lastName: TypeExports.String(),
    displayName: TypeExports.String(),
    image: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    role: TypeExports.String(),
    permissions: TypeExports.Array(TypeExports.String()),
    active: TypeExports.Boolean(),
    initials: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    activeOrganizationId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    organizations: TypeExports.Optional(TypeExports.Array(TenancyOrganizationSchema)),
    groupIds: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
  },
  { additionalProperties: false },
);

/**
 * Inferred TypeScript type from {@link SessionUserProjectionSchema}.
 *
 * @since 0.2.0
 */
export type SessionUserProjection = Static<typeof SessionUserProjectionSchema>;
