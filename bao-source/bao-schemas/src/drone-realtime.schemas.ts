/**
 * Drone realtime status schemas.
 *
 * Defines TypeBox schemas for realtime relay status and
 * recorder status payloads used by BFF endpoints.
 *
 * @shared/schemas/drone-realtime
 */

import type {
  Static,
  TArray,
  TInteger,
  TLiteral,
  TObject,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { DroneRealtimeChannelSchema } from "./drone-summary.schemas.ts";

/**
 * Drone realtime relay status schema.
 */
export const DroneRealtimeRelayStatusSchema: TObject<
  {
    readonly activeChannels: TArray<
      TUnion<[TLiteral<"devices" | "telemetry">, ...TLiteral<"devices" | "telemetry">[]]>
    >;
    readonly reconnectAttempts: TRecord<TString, TInteger>;
  },
  "activeChannels" | "reconnectAttempts",
  never
> = TypeExports.Object(
  {
    activeChannels: TypeExports.Array(DroneRealtimeChannelSchema),
    reconnectAttempts: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      TypeExports.Integer({ minimum: 0 }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Drone history recorder config schema.
 */
export const DroneHistoryRecorderConfigSchema: TObject<
  {
    readonly flushMs: TInteger;
    readonly telemetryMinIntervalMs: TInteger;
    readonly retentionDays: TInteger;
    readonly pruneEveryMs: TInteger;
  },
  "flushMs" | "telemetryMinIntervalMs" | "retentionDays" | "pruneEveryMs",
  never
> = TypeExports.Object(
  {
    flushMs: TypeExports.Integer({ minimum: 0 }),
    telemetryMinIntervalMs: TypeExports.Integer({ minimum: 0 }),
    retentionDays: TypeExports.Integer({ minimum: 0 }),
    pruneEveryMs: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Drone history recorder status schema.
 */
export const DroneHistoryRecorderStatusSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    running: TypeExports.Boolean(),
    startedAt: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    lastFlushAt: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    lastPruneAt: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    config: DroneHistoryRecorderConfigSchema,
    buffer: TypeExports.Object(
      {
        telemetry: TypeExports.Integer({ minimum: 0 }),
        events: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    lastFlushCounts: TypeExports.Union([
      TypeExports.Object(
        {
          telemetry: TypeExports.Integer({ minimum: 0 }),
          events: TypeExports.Integer({ minimum: 0 }),
        },
        { additionalProperties: false },
      ),
      TypeExports.Null(),
    ]),
  },
  { additionalProperties: false },
);

/**
 * Drone realtime status response schema.
 */
export const DroneRealtimeStatusResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    realtimeRelay: DroneRealtimeRelayStatusSchema,
    history: DroneHistoryRecorderStatusSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRealtimeRelayStatus schema. */
export type DroneRealtimeRelayStatus = Static<typeof DroneRealtimeRelayStatusSchema>;
/** Inferred type from the DroneHistoryRecorderStatus schema. */
export type DroneHistoryRecorderStatus = Static<typeof DroneHistoryRecorderStatusSchema>;
/** Inferred type from the DroneRealtimeStatusResponse schema. */
export type DroneRealtimeStatusResponse = Static<typeof DroneRealtimeStatusResponseSchema>;
