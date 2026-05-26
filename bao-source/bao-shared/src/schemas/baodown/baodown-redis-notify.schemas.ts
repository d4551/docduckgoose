/**
 * BaoDown Redis Pub/Sub notify status schemas.
 *
 * BaoDown SSE streams rely on cross-replica "wakeup" signals so that replicas that
 * did not originate a run event can promptly poll and stream fresh events.
 *
 * PG LISTEN/NOTIFY is the primary integration; Redis/KeyDB Pub/Sub acts as a
 * multi-replica fallback where PG notifications are unavailable or degraded.
 *
 * This schema is shared between server and client to keep contracts consistent
 * for the BaoDown integration snapshot (`GET /api/v1/baodown/integration`).
 *
 * @shared/schemas/baodown/baodown-redis-notify
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * BaoDown Redis notify mode values.
 */
export const BaoDownRedisNotifyModeSchema: Type.TUnion<
  (
    | Type.TLiteral<"disabled">
    | Type.TLiteral<"unconfigured">
    | Type.TLiteral<"connecting">
    | Type.TLiteral<"subscribed">
    | Type.TLiteral<"stopped">
    | Type.TLiteral<"error">
  )[]
> = Type.Union(
  [
    Type.Literal("disabled"),
    Type.Literal("unconfigured"),
    Type.Literal("connecting"),
    Type.Literal("subscribed"),
    Type.Literal("stopped"),
    Type.Literal("error"),
  ],
  { description: "BaoDown Redis Pub/Sub notify mode" },
);

/** Inferred type from the BaoDownRedisNotifyMode schema. */
export type BaoDownRedisNotifyMode = Static<typeof BaoDownRedisNotifyModeSchema>;

/**
 * BaoDown Redis notify status schema.
 */
export const BaoDownRedisNotifyStatusSchema = Type.Object(
  {
    enabled: Type.Boolean({ description: "Whether Redis notify is enabled via config" }),
    mode: BaoDownRedisNotifyModeSchema,
    channel: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    lastConnectedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastMessageAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastErrorAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastError: Type.Union([Type.String(), Type.Null()]),
    messagesReceived: Type.Integer({ minimum: 0 }),
    reconnectAttempt: Type.Integer({ minimum: 0 }),
  },
  {
    additionalProperties: false,
    description: "Cross-replica BaoDown SSE wakeup status for Redis/KeyDB Pub/Sub.",
  },
);

/** Inferred type from the BaoDownRedisNotifyStatus schema. */
export type BaoDownRedisNotifyStatus = Static<typeof BaoDownRedisNotifyStatusSchema>;
