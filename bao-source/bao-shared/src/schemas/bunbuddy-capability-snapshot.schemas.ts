/**
 * Shared bunbuddy capability snapshot schemas.
 *
 * Defines aggregated bunbuddy capability snapshot payloads used by
 * hardware, drone, and robotics summaries.
 *
 * @shared/schemas/bunbuddy-capability-snapshot
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BunBuddyCapacitySchema, BunBuddyKindSchema } from "./bunbuddy.schemas.ts";

/**
 * BunBuddy docs metadata schema for aggregated snapshots.
 */
export const BunBuddyDocsInfoSchema: Type.TObject<
  {
    readonly happydumplingPath: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly happydumplingUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly openapiPath: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly openapiUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly openapiFile: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly notes: Type.TArray<Type.TString>;
  },
  "happydumplingPath" | "happydumplingUrl" | "openapiPath" | "openapiUrl" | "openapiFile" | "notes",
  never
> = Type.Object(
  {
    happydumplingPath: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    happydumplingUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    openapiPath: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    openapiUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    openapiFile: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    notes: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Aggregated bunbuddy capability snapshot schema.
 */
export const BunBuddyCapabilitySnapshotSchema = Type.Object(
  {
    source: BunBuddyKindSchema,
    status: Type.Union([
      Type.Literal("healthy"),
      Type.Literal("degraded"),
      Type.Literal("unreachable"),
    ]),
    baseUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    health: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
    capabilities: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
    metrics: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
    diagnostics: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
    capacity: Type.Optional(Type.Union([BunBuddyCapacitySchema, Type.Null()])),
    features: Type.Record(Type.String(), Type.Boolean()),
    /**
     * Transport-specific supported profiles (e.g., BLE GATT, Classic SPP).
     *
     * For the `ble` bunbuddy, this advertises which BLE profiles are available.
     * Absent for bunbuddies that don't use profile-based transports.
     */
    supportedProfiles: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), { description: "Transport-specific profiles" }),
    ),
    libraries: Type.Record(Type.String(), Type.String()),
    endpoints: Type.Array(Type.String({ minLength: 1 })),
    docs: BunBuddyDocsInfoSchema,
    notes: Type.Array(Type.String()),
    timestamp: Type.String({ minLength: 1 }),
    error: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Aggregated bunbuddy capability response payload schema.
 */
export const BunBuddyCapabilitiesSnapshotsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(BunBuddyCapabilitySnapshotSchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ minLength: 1 }),
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
