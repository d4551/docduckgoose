/**
 * Drone history schemas.
 *
 * Defines contract-first TypeBox schemas for persisted telemetry and event history.
 *
 * @shared/schemas/drone-history
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DRONE_HISTORY_DEFAULTS } from "../config/drone.defaults";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Drone history limit query schema (accepts numeric strings for query parsing).
 */
export const DroneHistoryLimitSchema: Type.TUnion<(Type.TString | Type.TInteger)[]> = Type.Union(
  [
    Type.Integer({
      minimum: DRONE_HISTORY_DEFAULTS.listBounds.defaultLimit.min,
      maximum: DRONE_HISTORY_DEFAULTS.listBounds.maxLimit.max,
    }),
    Type.String({ minLength: 1, pattern: "^[0-9]+$" }),
  ],
  {},
);

/**
 * Drone history query schema shared by telemetry + event endpoints.
 */
export const DroneHistoryQuerySchema: Type.TObject<
  {
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly since: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly since: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    limit: Type.Optional(DroneHistoryLimitSchema),
    since: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Telemetry history row schema.
 */
export const DroneTelemetryHistoryRowSchema: Type.TObject<
  {
    readonly deviceId: Type.TString;
    readonly timestamp: Type.TString;
    readonly receivedAt: Type.TString;
    readonly baseUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly payload: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
  },
  "baseUrl" | "payload" | "deviceId" | "timestamp" | "receivedAt",
  never
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    timestamp: Type.String({ minLength: 1 }),
    receivedAt: Type.String({ minLength: 1 }),
    baseUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    payload: Type.Union([JsonValueSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Event history row schema.
 */
export const DroneEventHistoryRowSchema: Type.TObject<
  {
    readonly id: Type.TOptional<Type.TString>;
    readonly deviceId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly channel: Type.TString;
    readonly event: Type.TString;
    readonly timestamp: Type.TString;
    readonly receivedAt: Type.TString;
    readonly baseUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly payload: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
  },
  "deviceId" | "baseUrl" | "payload" | "channel" | "event" | "timestamp" | "receivedAt",
  "id"
> = Type.Object(
  {
    id: Type.Optional(Type.String({ minLength: 1 })),
    deviceId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    channel: Type.String({ minLength: 1 }),
    event: Type.String({ minLength: 1 }),
    timestamp: Type.String({ minLength: 1 }),
    receivedAt: Type.String({ minLength: 1 }),
    baseUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    payload: Type.Union([JsonValueSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Telemetry history response schema.
 */
export const DroneTelemetryHistoryResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly items: Type.TArray<
      Type.TObject<
        {
          readonly deviceId: Type.TString;
          readonly timestamp: Type.TString;
          readonly receivedAt: Type.TString;
          readonly baseUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly payload: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
        },
        "baseUrl" | "payload" | "deviceId" | "timestamp" | "receivedAt",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "items" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(DroneTelemetryHistoryRowSchema),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Event history response schema (per device).
 */
export const DroneEventHistoryResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly items: Type.TArray<
      Type.TObject<
        {
          readonly id: Type.TOptional<Type.TString>;
          readonly deviceId: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly channel: Type.TString;
          readonly event: Type.TString;
          readonly timestamp: Type.TString;
          readonly receivedAt: Type.TString;
          readonly baseUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly payload: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
        },
        "deviceId" | "baseUrl" | "payload" | "channel" | "event" | "timestamp" | "receivedAt",
        "id"
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "items" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(DroneEventHistoryRowSchema),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Event history response schema (global).
 */
export const DroneGlobalEventHistoryResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly items: Type.TArray<
      Type.TObject<
        {
          readonly id: Type.TOptional<Type.TString>;
          readonly deviceId: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly channel: Type.TString;
          readonly event: Type.TString;
          readonly timestamp: Type.TString;
          readonly receivedAt: Type.TString;
          readonly baseUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
          readonly payload: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
        },
        "deviceId" | "baseUrl" | "payload" | "channel" | "event" | "timestamp" | "receivedAt",
        "id"
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "items" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(DroneEventHistoryRowSchema),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneHistoryQuery schema. */
export type DroneHistoryQuery = Static<typeof DroneHistoryQuerySchema>;
/** Inferred type from the DroneTelemetryHistoryRow schema. */
export type DroneTelemetryHistoryRow = Static<typeof DroneTelemetryHistoryRowSchema>;
/** Inferred type from the DroneEventHistoryRow schema. */
export type DroneEventHistoryRow = Static<typeof DroneEventHistoryRowSchema>;
/** Inferred type from the DroneTelemetryHistoryResponse schema. */
export type DroneTelemetryHistoryResponse = Static<typeof DroneTelemetryHistoryResponseSchema>;
/** Inferred type from the DroneEventHistoryResponse schema. */
export type DroneEventHistoryResponse = Static<typeof DroneEventHistoryResponseSchema>;
/** Inferred type from the DroneGlobalEventHistoryResponse schema. */
export type DroneGlobalEventHistoryResponse = Static<typeof DroneGlobalEventHistoryResponseSchema>;
