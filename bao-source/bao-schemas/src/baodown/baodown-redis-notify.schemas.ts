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

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * BaoDown Redis notify mode values.
 */
export const BaoDownRedisNotifyModeSchema: TUnion<
  (
    | TLiteral<"disabled">
    | TLiteral<"unconfigured">
    | TLiteral<"connecting">
    | TLiteral<"subscribed">
    | TLiteral<"stopped">
    | TLiteral<"error">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("disabled"),
    TypeExports.Literal("unconfigured"),
    TypeExports.Literal("connecting"),
    TypeExports.Literal("subscribed"),
    TypeExports.Literal("stopped"),
    TypeExports.Literal("error"),
  ],
  { description: "BaoDown Redis Pub/Sub notify mode" },
);

/** Inferred type from the BaoDownRedisNotifyMode schema. */
export type BaoDownRedisNotifyMode = Static<typeof BaoDownRedisNotifyModeSchema>;

/**
 * BaoDown Redis notify status schema.
 */
export const BaoDownRedisNotifyStatusSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean({ description: "Whether Redis notify is enabled via config" }),
    mode: BaoDownRedisNotifyModeSchema,
    channel: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    lastConnectedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    lastMessageAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    lastErrorAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    lastError: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    messagesReceived: TypeExports.Integer({ minimum: 0 }),
    reconnectAttempt: TypeExports.Integer({ minimum: 0 }),
  },
  {
    additionalProperties: false,
    description: "Cross-replica BaoDown SSE wakeup status for Redis/KeyDB Pub/Sub.",
  },
);

/** Inferred type from the BaoDownRedisNotifyStatus schema. */
export type BaoDownRedisNotifyStatus = Static<typeof BaoDownRedisNotifyStatusSchema>;
