/**
 * Drone history schemas.
 *
 * Defines contract-first TypeBox schemas for persisted telemetry and event history.
 *
 * @shared/schemas/drone-history
 */

import { DRONE_HISTORY_DEFAULTS } from "@baohaus/bao-config/drone.defaults";
import type {
  InferOptionalKeys,
  Static,
  TArray,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Drone history limit query schema (accepts numeric strings for query parsing).
 */
export const DroneHistoryLimitSchema: TUnion<(TString | TInteger)[]> = TypeExports.Union(
  [
    TypeExports.Integer({
      minimum: DRONE_HISTORY_DEFAULTS.listBounds.defaultLimit.min,
      maximum: DRONE_HISTORY_DEFAULTS.listBounds.maxLimit.max,
    }),
    TypeExports.String({ minLength: 1, pattern: "^[0-9]+$" }),
  ],
  {},
);

/**
 * Drone history query schema shared by telemetry + event endpoints.
 */
export const DroneHistoryQuerySchema: TObject<
  {
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly since: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly since: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    limit: TypeExports.Optional(DroneHistoryLimitSchema),
    since: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Telemetry history row schema.
 */
export const DroneTelemetryHistoryRowSchema: TObject<
  {
    readonly deviceId: TString;
    readonly timestamp: TString;
    readonly receivedAt: TString;
    readonly baseUrl: TUnion<(TString | TNull)[]>;
    readonly payload: TUnion<(TNull | TUnknown)[]>;
  },
  "baseUrl" | "payload" | "deviceId" | "timestamp" | "receivedAt",
  never
> = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ minLength: 1 }),
    receivedAt: TypeExports.String({ minLength: 1 }),
    baseUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    payload: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Event history row schema.
 */
export const DroneEventHistoryRowSchema: TObject<
  {
    readonly id: TOptional<TString>;
    readonly deviceId: TUnion<(TString | TNull)[]>;
    readonly channel: TString;
    readonly event: TString;
    readonly timestamp: TString;
    readonly receivedAt: TString;
    readonly baseUrl: TUnion<(TString | TNull)[]>;
    readonly payload: TUnion<(TNull | TUnknown)[]>;
  },
  "deviceId" | "baseUrl" | "payload" | "channel" | "event" | "timestamp" | "receivedAt",
  "id"
> = TypeExports.Object(
  {
    id: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    deviceId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    channel: TypeExports.String({ minLength: 1 }),
    event: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ minLength: 1 }),
    receivedAt: TypeExports.String({ minLength: 1 }),
    baseUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    payload: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Telemetry history response schema.
 */
export const DroneTelemetryHistoryResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly items: TArray<
      TObject<
        {
          readonly deviceId: TString;
          readonly timestamp: TString;
          readonly receivedAt: TString;
          readonly baseUrl: TUnion<(TString | TNull)[]>;
          readonly payload: TUnion<(TNull | TUnknown)[]>;
        },
        "baseUrl" | "payload" | "deviceId" | "timestamp" | "receivedAt",
        never
      >
    >;
    readonly timestamp: TString;
  },
  "ok" | "items" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(DroneTelemetryHistoryRowSchema),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Event history response schema (per device).
 */
export const DroneEventHistoryResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly items: TArray<
      TObject<
        {
          readonly id: TOptional<TString>;
          readonly deviceId: TUnion<(TString | TNull)[]>;
          readonly channel: TString;
          readonly event: TString;
          readonly timestamp: TString;
          readonly receivedAt: TString;
          readonly baseUrl: TUnion<(TString | TNull)[]>;
          readonly payload: TUnion<(TNull | TUnknown)[]>;
        },
        "deviceId" | "baseUrl" | "payload" | "channel" | "event" | "timestamp" | "receivedAt",
        "id"
      >
    >;
    readonly timestamp: TString;
  },
  "ok" | "items" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(DroneEventHistoryRowSchema),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Event history response schema (global).
 */
export const DroneGlobalEventHistoryResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly items: TArray<
      TObject<
        {
          readonly id: TOptional<TString>;
          readonly deviceId: TUnion<(TString | TNull)[]>;
          readonly channel: TString;
          readonly event: TString;
          readonly timestamp: TString;
          readonly receivedAt: TString;
          readonly baseUrl: TUnion<(TString | TNull)[]>;
          readonly payload: TUnion<(TNull | TUnknown)[]>;
        },
        "deviceId" | "baseUrl" | "payload" | "channel" | "event" | "timestamp" | "receivedAt",
        "id"
      >
    >;
    readonly timestamp: TString;
  },
  "ok" | "items" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(DroneEventHistoryRowSchema),
    timestamp: TypeExports.String({ minLength: 1 }),
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
