/**
 * Drone summary schemas.
 *
 * Defines TypeBox schemas for normalized drone status, capability, and
 * realtime summaries used in integration context snapshots and BFF endpoints.
 *
 * @shared/schemas/drone-summary
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DEFAULT_TIMEOUTS } from "../constants/timeouts";
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
export const DroneRealtimeChannelSchema: Type.TUnion<
  [Type.TLiteral<"devices" | "telemetry">, ...Type.TLiteral<"devices" | "telemetry">[]]
> = stringEnum(DRONE_REALTIME_CHANNELS, {
  description: "Drone realtime channel identifier",
});

/**
 * Drone status summary schema.
 */
export const DroneStatusSummarySchema: Type.TObject<
  {
    readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly service: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly version: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly protocols: Type.TArray<Type.TString>;
    readonly activeVehicles: Type.TInteger;
    readonly cacheTtlMs: Type.TUnion<(Type.TInteger | Type.TNull)[]>;
    readonly lastScanTime: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly pendingRequests: Type.TUnion<(Type.TInteger | Type.TNull)[]>;
    readonly pendingWebSockets: Type.TUnion<(Type.TInteger | Type.TNull)[]>;
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
> = Type.Object(
  {
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    service: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    protocols: Type.Array(Type.String({ minLength: 1 })),
    activeVehicles: Type.Integer({ minimum: 0 }),
    cacheTtlMs: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    lastScanTime: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    pendingRequests: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    pendingWebSockets: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Drone capabilities summary schema.
 */
export const DroneCapabilitiesSummarySchema: Type.TObject<
  {
    readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly service: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly version: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly protocols: Type.TArray<Type.TString>;
    readonly endpoints: Type.TArray<Type.TString>;
    readonly features: Type.TRecord<Type.TString, Type.TBoolean>;
  },
  "status" | "service" | "version" | "protocols" | "endpoints" | "features",
  never
> = Type.Object(
  {
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    service: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    protocols: Type.Array(Type.String({ minLength: 1 })),
    endpoints: Type.Array(Type.String({ minLength: 1 })),
    features: Type.Record(Type.String(), Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Drone device summary schema.
 */
export const DroneDeviceSummarySchema: Type.TObject<
  {
    readonly id: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly name: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly protocol: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly type: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly connectionState: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "id" | "name" | "protocol" | "type" | "connectionState",
  never
> = Type.Object(
  {
    id: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    protocol: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    type: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    connectionState: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Drone realtime summary schema.
 */
export const DroneRealtimeSummarySchema: Type.TObject<
  {
    readonly activeChannels: Type.TArray<
      Type.TUnion<
        [Type.TLiteral<"devices" | "telemetry">, ...Type.TLiteral<"devices" | "telemetry">[]]
      >
    >;
    readonly history: Type.TObject<
      {
        readonly enabled: Type.TBoolean;
        readonly running: Type.TBoolean;
        readonly lastFlushAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly lastPruneAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly buffer: Type.TObject<
          { readonly telemetry: Type.TInteger; readonly events: Type.TInteger },
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
> = Type.Object(
  {
    activeChannels: Type.Array(DroneRealtimeChannelSchema),
    history: Type.Object(
      {
        enabled: Type.Boolean(),
        running: Type.Boolean(),
        lastFlushAt: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        lastPruneAt: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
        buffer: Type.Object(
          {
            telemetry: Type.Integer({ minimum: 0 }),
            events: Type.Integer({ minimum: 0 }),
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
export const DroneSummarySnapshotSchema = Type.Object(
  {
    status: Type.Union([DroneStatusSummarySchema, Type.Null()]),
    capabilities: Type.Union([DroneCapabilitiesSummarySchema, Type.Null()]),
    devices: Type.Array(DroneDeviceSummarySchema),
    realtime: Type.Union([DroneRealtimeSummarySchema, Type.Null()]),
    bunbuddySnapshot: Type.Union([BunBuddyCapabilitySnapshotSchema, Type.Null()]),
    baseUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Drone summary request schema.
 */
export const DroneSummaryRequestSchema: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly includeRealtime: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddySnapshot: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly includeRealtime: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddySnapshot: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    timeoutMs: Type.Optional(
      Type.Integer({
        minimum: DEFAULT_TIMEOUTS.droneSummaryMinMs,
        maximum: DEFAULT_TIMEOUTS.droneSummaryMaxMs,
      }),
    ),
    includeRealtime: Type.Optional(Type.Boolean()),
    includeBunBuddySnapshot: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Drone summary response schema.
 */
export const DroneSummaryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: DroneSummarySnapshotSchema,
    errors: Type.Array(Type.String()),
    timestamp: Type.String({ minLength: 1 }),
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
