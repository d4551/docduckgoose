/**
 * Capability ownership — core enums, requests, source, entry, summary.
 *
 * @shared/schemas/capability-ownership.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import {
  CAPABILITY_OWNERSHIP_KINDS,
  CAPABILITY_OWNERSHIP_STATUSES,
  type CapabilityOwnershipKind,
  CapabilityOwnershipKindSchema,
  type CapabilityOwnershipStatus,
  CapabilityOwnershipStatusSchema,
} from "./capability-ownership/enums.ts";
import {
  CapabilityContractsSchema,
  CapabilityDependencySchema,
} from "./capability-registry.schemas.ts";
import { DriverRegistryScopeSchema } from "./driver-registry.schemas.ts";
import {
  LibraryCategorySchema,
  LibrarySourceSchema,
  LibraryStatusSchema,
} from "./library-registry.schemas.ts";

export {
  CAPABILITY_OWNERSHIP_KINDS,
  CAPABILITY_OWNERSHIP_STATUSES,
  type CapabilityOwnershipKind,
  CapabilityOwnershipKindSchema,
  type CapabilityOwnershipStatus,
  CapabilityOwnershipStatusSchema,
};

// Capability Ownership Requests

/**
 * Schema for capability ownership map requests.
 */
export const CapabilityOwnershipMapRequestSchema: TObject<
  { readonly refresh: TOptional<TBoolean> },
  never,
  "refresh"
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership map requests.
 */
export type CapabilityOwnershipMapRequest = Static<typeof CapabilityOwnershipMapRequestSchema>;

/**
 * Schema for capability ownership focus requests.
 */
export const CapabilityOwnershipFocusRequestSchema: TObject<
  { readonly refresh: TOptional<TBoolean> },
  never,
  "refresh"
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership focus requests.
 */
export type CapabilityOwnershipFocusRequest = Static<typeof CapabilityOwnershipFocusRequestSchema>;

/**
 * Schema for capability ownership coverage requests.
 */
export const CapabilityOwnershipCoverageRequestSchema: TObject<
  { readonly refresh: TOptional<TBoolean> },
  never,
  "refresh"
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership coverage requests.
 */
export type CapabilityOwnershipCoverageRequest = Static<
  typeof CapabilityOwnershipCoverageRequestSchema
>;

/**
 * Schema for capability ownership refresh requests.
 */
export const CapabilityOwnershipRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Idempotency key for refresh requests" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for capability ownership refresh requests.
 */
export type CapabilityOwnershipRefreshRequest = Static<
  typeof CapabilityOwnershipRefreshRequestSchema
>;

// Capability Ownership Source

/**
 * Schema for ownership source metadata.
 */
export const CapabilityOwnershipSourceSchema = TypeExports.Object(
  {
    kind: CapabilityOwnershipKindSchema,
    capabilityId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Capability registry identifier when sourced from plugin/bunbuddy",
      }),
    ),
    bunbuddyKind: TypeExports.Optional(BunBuddyKindSchema),
    library: TypeExports.Optional(
      TypeExports.Object(
        {
          name: TypeExports.String({ minLength: 1 }),
          source: LibrarySourceSchema,
          runtime: TypeExports.String({ minLength: 1 }),
          status: TypeExports.Optional(LibraryStatusSchema),
          categories: TypeExports.Optional(TypeExports.Array(LibraryCategorySchema)),
        },
        { additionalProperties: false },
      ),
    ),
    driver: TypeExports.Optional(
      TypeExports.Object(
        {
          key: TypeExports.String({ minLength: 1 }),
          packageName: TypeExports.String({ minLength: 1 }),
          scope: DriverRegistryScopeSchema,
          notes: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
        },
        { additionalProperties: false },
      ),
    ),
    device: TypeExports.Optional(
      TypeExports.Object(
        {
          id: TypeExports.String({ minLength: 1 }),
          deviceType: TypeExports.String({ minLength: 1 }),
          status: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          transport: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          driverPackage: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          driverStatus: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          driverVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          discoverySource: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          bunbuddyId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          lastSeen: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
          isSimulated: TypeExports.Optional(TypeExports.Boolean()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership sources.
 */
export type CapabilityOwnershipSource = Static<typeof CapabilityOwnershipSourceSchema>;

// Capability Ownership Entry

/**
 * Schema for policy metadata attached to ownership entries.
 */
export const CapabilityOwnershipEntryPolicySchema: TObject<
  {
    readonly ownerOverridden: TBoolean;
    readonly responsibilityOverridden: TBoolean;
    readonly groupId: TOptional<TString>;
    readonly groupLabel: TOptional<TString>;
  },
  "ownerOverridden" | "responsibilityOverridden",
  InferOptionalKeys<{
    readonly ownerOverridden: TBoolean;
    readonly responsibilityOverridden: TBoolean;
    readonly groupId: TOptional<TString>;
    readonly groupLabel: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    ownerOverridden: TypeExports.Boolean(),
    responsibilityOverridden: TypeExports.Boolean(),
    groupId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    groupLabel: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership entry policy metadata.
 */
export type CapabilityOwnershipEntryPolicy = Static<typeof CapabilityOwnershipEntryPolicySchema>;

/**
 * Schema for an ownership entry.
 */
export const CapabilityOwnershipEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    kind: CapabilityOwnershipKindSchema,
    owner: TypeExports.String({ minLength: 1 }),
    responsibility: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String({ minLength: 1 }),
    status: CapabilityOwnershipStatusSchema,
    contracts: CapabilityContractsSchema,
    dependencies: TypeExports.Array(CapabilityDependencySchema),
    source: CapabilityOwnershipSourceSchema,
    observedAt: TypeExports.String({ format: "date-time" }),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    policy: TypeExports.Optional(CapabilityOwnershipEntryPolicySchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership entries.
 */
export type CapabilityOwnershipEntry = Static<typeof CapabilityOwnershipEntrySchema>;

// Capability Ownership Summary

/**
 * Schema for ownership summary counts.
 */
export const CapabilityOwnershipSummarySchema: TObject<
  {
    readonly total: TInteger;
    readonly byKind: TObject<
      {
        readonly plugin: TInteger;
        readonly bunbuddy: TInteger;
        readonly library: TInteger;
        readonly driver: TInteger;
        readonly device: TInteger;
        readonly bao: TInteger;
      },
      "plugin" | "bunbuddy" | "library" | "driver" | "device" | "bao",
      never
    >;
    readonly byStatus: TObject<
      {
        readonly registered: TInteger;
        readonly healthy: TInteger;
        readonly degraded: TInteger;
        readonly unavailable: TInteger;
        readonly available: TInteger;
        readonly unreachable: TInteger;
        readonly "not-configured": TInteger;
      },
      | "registered"
      | "healthy"
      | "degraded"
      | "unavailable"
      | "available"
      | "unreachable"
      | "not-configured",
      never
    >;
  },
  "byKind" | "byStatus" | "total",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    // NOTE: TypeBox's `TypeExports.Record` with a union-of-literals key schema collapses to
    // `Record<never, ...>` for Static<> typing, which breaks downstream indexing.
    // Use explicit objects to preserve strong typing across UI + services.
    byKind: TypeExports.Object(
      {
        plugin: TypeExports.Integer({ minimum: 0 }),
        bunbuddy: TypeExports.Integer({ minimum: 0 }),
        library: TypeExports.Integer({ minimum: 0 }),
        driver: TypeExports.Integer({ minimum: 0 }),
        device: TypeExports.Integer({ minimum: 0 }),
        bao: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    byStatus: TypeExports.Object(
      {
        registered: TypeExports.Integer({ minimum: 0 }),
        healthy: TypeExports.Integer({ minimum: 0 }),
        degraded: TypeExports.Integer({ minimum: 0 }),
        unavailable: TypeExports.Integer({ minimum: 0 }),
        available: TypeExports.Integer({ minimum: 0 }),
        unreachable: TypeExports.Integer({ minimum: 0 }),
        "not-configured": TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership summary counts.
 */
export type CapabilityOwnershipSummary = Static<typeof CapabilityOwnershipSummarySchema>;
