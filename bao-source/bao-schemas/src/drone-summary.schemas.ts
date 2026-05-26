/**
 * Drone summary schemas.
 *
 * Defines TypeBox schemas for normalized drone status, capability, and
 * realtime summaries used in integration context snapshots and BFF endpoints.
 *
 * @shared/schemas/drone-summary
 */

import { DEFAULT_TIMEOUTS } from "@baohaus/bao-constants/timeouts";
import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyCapabilitySnapshotSchema } from "./bunbuddy-capability-snapshot.schemas.ts";

/**
 * Supported realtime channel identifiers.
 */
export const DRONE_REALTIME_CHANNELS: readonly ["devices", "telemetry"] = [
  "devices",
  "telemetry",
] as const;

/**
 * Type-safe realtime channel identifier.
 */
export type DroneRealtimeChannel = (typeof DRONE_REALTIME_CHANNELS)[number];

/**
 * Drone realtime channel schema.
 */
export const DroneRealtimeChannelSchema: TUnion<
  [TLiteral<"devices" | "telemetry">, ...TLiteral<"devices" | "telemetry">[]]
> = stringEnum(DRONE_REALTIME_CHANNELS, {
  description: "Drone realtime channel identifier",
});

/**
 * Drone status summary schema.
 */
export const DroneStatusSummarySchema: TObject<
  {
    readonly status: TUnion<(TString | TNull)[]>;
    readonly service: TUnion<(TString | TNull)[]>;
    readonly version: TUnion<(TString | TNull)[]>;
    readonly protocols: TArray<TString>;
    readonly activeVehicles: TInteger;
    readonly cacheTtlMs: TUnion<(TInteger | TNull)[]>;
    readonly lastScanTime: TUnion<(TString | TNull)[]>;
    readonly pendingRequests: TUnion<(TInteger | TNull)[]>;
    readonly pendingWebSockets: TUnion<(TInteger | TNull)[]>;
  },
  | "status"
  | "service"
  | "version"
  | "protocols"
  | "cacheTtlMs"
  | "lastScanTime"
  | "pendingRequests"
  | "pendingWebSockets"
  | "activeVehicles",
  never
> = TypeExports.Object(
  {
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    service: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    version: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    protocols: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    activeVehicles: TypeExports.Integer({ minimum: 0 }),
    cacheTtlMs: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
    lastScanTime: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    pendingRequests: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
    pendingWebSockets: TypeExports.Union([TypeExports.Integer({ minimum: 0 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Drone capabilities summary schema.
 */
export const DroneCapabilitiesSummarySchema: TObject<
  {
    readonly status: TUnion<(TString | TNull)[]>;
    readonly service: TUnion<(TString | TNull)[]>;
    readonly version: TUnion<(TString | TNull)[]>;
    readonly protocols: TArray<TString>;
    readonly endpoints: TArray<TString>;
    readonly features: TRecord<TString, TBoolean>;
  },
  "status" | "service" | "version" | "protocols" | "endpoints" | "features",
  never
> = TypeExports.Object(
  {
    status: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    service: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    version: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    protocols: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    features: TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Drone device summary schema.
 */
export const DroneDeviceSummarySchema: TObject<
  {
    readonly id: TUnion<(TString | TNull)[]>;
    readonly name: TUnion<(TString | TNull)[]>;
    readonly protocol: TUnion<(TString | TNull)[]>;
    readonly type: TUnion<(TString | TNull)[]>;
    readonly connectionState: TUnion<(TString | TNull)[]>;
  },
  "id" | "name" | "protocol" | "type" | "connectionState",
  never
> = TypeExports.Object(
  {
    id: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    name: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    protocol: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    type: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    connectionState: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Drone realtime summary schema.
 */
export const DroneRealtimeSummarySchema: TObject<
  {
    readonly activeChannels: TArray<
      TUnion<[TLiteral<"devices" | "telemetry">, ...TLiteral<"devices" | "telemetry">[]]>
    >;
    readonly history: TObject<
      {
        readonly enabled: TBoolean;
        readonly running: TBoolean;
        readonly lastFlushAt: TUnion<(TString | TNull)[]>;
        readonly lastPruneAt: TUnion<(TString | TNull)[]>;
        readonly buffer: TObject<
          { readonly telemetry: TInteger; readonly events: TInteger },
          "telemetry" | "events",
          never
        >;
      },
      "lastFlushAt" | "lastPruneAt" | "buffer" | "enabled" | "running",
      never
    >;
  },
  "activeChannels" | "history",
  never
> = TypeExports.Object(
  {
    activeChannels: TypeExports.Array(DroneRealtimeChannelSchema),
    history: TypeExports.Object(
      {
        enabled: TypeExports.Boolean(),
        running: TypeExports.Boolean(),
        lastFlushAt: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
        lastPruneAt: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
        buffer: TypeExports.Object(
          {
            telemetry: TypeExports.Integer({ minimum: 0 }),
            events: TypeExports.Integer({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * Drone summary snapshot schema.
 */
export const DroneSummarySnapshotSchema = TypeExports.Object(
  {
    status: TypeExports.Union([DroneStatusSummarySchema, TypeExports.Null()]),
    capabilities: TypeExports.Union([DroneCapabilitiesSummarySchema, TypeExports.Null()]),
    devices: TypeExports.Array(DroneDeviceSummarySchema),
    realtime: TypeExports.Union([DroneRealtimeSummarySchema, TypeExports.Null()]),
    bunbuddySnapshot: TypeExports.Union([BunBuddyCapabilitySnapshotSchema, TypeExports.Null()]),
    baseUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Drone summary request schema.
 */
export const DroneSummaryRequestSchema: TObject<
  {
    readonly timeoutMs: TOptional<TInteger>;
    readonly includeRealtime: TOptional<TBoolean>;
    readonly includeBunBuddySnapshot: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly timeoutMs: TOptional<TInteger>;
    readonly includeRealtime: TOptional<TBoolean>;
    readonly includeBunBuddySnapshot: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    timeoutMs: TypeExports.Optional(
      TypeExports.Integer({
        minimum: DEFAULT_TIMEOUTS.droneSummaryMinMs,
        maximum: DEFAULT_TIMEOUTS.droneSummaryMaxMs,
      }),
    ),
    includeRealtime: TypeExports.Optional(TypeExports.Boolean()),
    includeBunBuddySnapshot: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Drone summary response schema.
 */
export const DroneSummaryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: DroneSummarySnapshotSchema,
    errors: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for drone summary requests.
 */
export type DroneSummaryRequest = Static<typeof DroneSummaryRequestSchema>;

/**
 * TypeScript type for drone summary responses.
 */
export type DroneSummaryResponse = Static<typeof DroneSummaryResponseSchema>;
