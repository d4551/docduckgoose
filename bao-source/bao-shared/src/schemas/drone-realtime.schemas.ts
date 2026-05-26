/**
 * Drone realtime status schemas.
 *
 * Defines TypeBox schemas for realtime relay status and
 * recorder status payloads used by BFF endpoints.
 *
 * @shared/schemas/drone-realtime
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DroneRealtimeChannelSchema } from "./drone-summary.schemas.ts";

/**
 * Drone realtime relay status schema.
 */
export const DroneRealtimeRelayStatusSchema: Type.TObject<
  {
    readonly activeChannels: Type.TArray<
      Type.TUnion<
        [Type.TLiteral<"devices" | "telemetry">, ...Type.TLiteral<"devices" | "telemetry">[]]
      >
    >;
    readonly reconnectAttempts: Type.TRecord<Type.TString, Type.TInteger>;
  },
  "activeChannels" | "reconnectAttempts",
  never
> = Type.Object(
  {
    activeChannels: Type.Array(DroneRealtimeChannelSchema),
    reconnectAttempts: Type.Record(Type.String({ minLength: 1 }), Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Drone history recorder config schema.
 */
export const DroneHistoryRecorderConfigSchema: Type.TObject<
  {
    readonly flushMs: Type.TInteger;
    readonly telemetryMinIntervalMs: Type.TInteger;
    readonly retentionDays: Type.TInteger;
    readonly pruneEveryMs: Type.TInteger;
  },
  "flushMs" | "telemetryMinIntervalMs" | "retentionDays" | "pruneEveryMs",
  never
> = Type.Object(
  {
    flushMs: Type.Integer({ minimum: 0 }),
    telemetryMinIntervalMs: Type.Integer({ minimum: 0 }),
    retentionDays: Type.Integer({ minimum: 0 }),
    pruneEveryMs: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Drone history recorder status schema.
 */
export const DroneHistoryRecorderStatusSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    running: Type.Boolean(),
    startedAt: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    lastFlushAt: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    lastPruneAt: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    config: DroneHistoryRecorderConfigSchema,
    buffer: Type.Object(
      {
        telemetry: Type.Integer({ minimum: 0 }),
        events: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    lastFlushCounts: Type.Union([
      Type.Object(
        {
          telemetry: Type.Integer({ minimum: 0 }),
          events: Type.Integer({ minimum: 0 }),
        },
        { additionalProperties: false },
      ),
      Type.Null(),
    ]),
  },
  { additionalProperties: false },
);

/**
 * Drone realtime status response schema.
 */
export const DroneRealtimeStatusResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    realtimeRelay: DroneRealtimeRelayStatusSchema,
    history: DroneHistoryRecorderStatusSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRealtimeRelayStatus schema. */
export type DroneRealtimeRelayStatus = Static<typeof DroneRealtimeRelayStatusSchema>;
/** Inferred type from the DroneHistoryRecorderStatus schema. */
export type DroneHistoryRecorderStatus = Static<typeof DroneHistoryRecorderStatusSchema>;
/** Inferred type from the DroneRealtimeStatusResponse schema. */
export type DroneRealtimeStatusResponse = Static<typeof DroneRealtimeStatusResponseSchema>;
