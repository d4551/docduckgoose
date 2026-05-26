/**
 * Shared bunbuddy capability snapshot schemas.
 *
 * Defines aggregated bunbuddy capability snapshot payloads used by
 * hardware, drone, and robotics summaries.
 *
 * @shared/schemas/bunbuddy-capability-snapshot
 */

import type { Static, TArray, TNull, TObject, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyCapacitySchema, BunBuddyKindSchema } from "./bunbuddy.schemas.ts";

/**
 * BunBuddy docs metadata schema for aggregated snapshots.
 */
export const BunBuddyDocsInfoSchema: TObject<
  {
    readonly happydumplingPath: TUnion<(TString | TNull)[]>;
    readonly happydumplingUrl: TUnion<(TString | TNull)[]>;
    readonly openapiPath: TUnion<(TString | TNull)[]>;
    readonly openapiUrl: TUnion<(TString | TNull)[]>;
    readonly openapiFile: TUnion<(TString | TNull)[]>;
    readonly notes: TArray<TString>;
  },
  "happydumplingPath" | "happydumplingUrl" | "openapiPath" | "openapiUrl" | "openapiFile" | "notes",
  never
> = TypeExports.Object(
  {
    happydumplingPath: TypeExports.Union([
      TypeExports.String({ minLength: 1 }),
      TypeExports.Null(),
    ]),
    happydumplingUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    openapiPath: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    openapiUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    openapiFile: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    notes: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Aggregated bunbuddy capability snapshot schema.
 */
export const BunBuddyCapabilitySnapshotSchema = TypeExports.Object(
  {
    source: BunBuddyKindSchema,
    status: TypeExports.Union([
      TypeExports.Literal("healthy"),
      TypeExports.Literal("degraded"),
      TypeExports.Literal("unreachable"),
      TypeExports.Literal("not-configured"),
    ]),
    baseUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    health: TypeExports.Union([
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
      TypeExports.Null(),
    ]),
    capabilities: TypeExports.Union([
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
      TypeExports.Null(),
    ]),
    metrics: TypeExports.Union([
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
      TypeExports.Null(),
    ]),
    diagnostics: TypeExports.Union([
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
      TypeExports.Null(),
    ]),
    capacity: TypeExports.Optional(TypeExports.Union([BunBuddyCapacitySchema, TypeExports.Null()])),
    features: TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
    /**
     * Transport-specific supported profiles (e.g., BLE GATT, Classic SPP).
     *
     * For the `ble` bunbuddy, this advertises which BLE profiles are available.
     * Absent for bunbuddies that don't use profile-based transports.
     */
    supportedProfiles: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Transport-specific profiles",
      }),
    ),
    libraries: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    docs: BunBuddyDocsInfoSchema,
    notes: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String({ minLength: 1 }),
    error: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Aggregated bunbuddy capability response payload schema.
 */
export const BunBuddyCapabilitiesSnapshotsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(BunBuddyCapabilitySnapshotSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript types for bunbuddy capability snapshot schemas.
 */
export type BunBuddyDocsInfo = Static<typeof BunBuddyDocsInfoSchema>;
/** Inferred type from the BunBuddyCapabilitySnapshot schema. */
export type BunBuddyCapabilitySnapshot = Static<typeof BunBuddyCapabilitySnapshotSchema>;
/** Inferred type from the BunBuddyCapabilitiesSnapshotsResponse schema. */
export type BunBuddyCapabilitiesSnapshotsResponse = Static<
  typeof BunBuddyCapabilitiesSnapshotsResponseSchema
>;
