/**
 * Drone History Contract v1
 *
 * Defines versioned contracts for persisted drone telemetry and event history.
 *
 * @shared/contracts/versions/v1/drone-history
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  DroneEventHistoryResponseSchema,
  DroneGlobalEventHistoryResponseSchema,
  DroneHistoryQuerySchema,
  DroneTelemetryHistoryResponseSchema,
} from "../../../schemas/drone-history.schemas.ts";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/** Contract name for drone telemetry history. */
export const TELEMETRY_CONTRACT_NAME = "drone-history-telemetry";
/** Contract name for drone event history. */
export const EVENTS_CONTRACT_NAME = "drone-history-events";
/** Contract name for global drone event history. */
export const GLOBAL_EVENTS_CONTRACT_NAME = "drone-history-global-events";

/** Request schema for drone history queries (telemetry and events). */
export const DroneHistoryRequestV1: Type.TObject<
  {
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly since: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly since: Type.TOptional<Type.TString>;
  }>
> = DroneHistoryQuerySchema;
/** Response schema for drone telemetry history. */
export const DroneTelemetryHistoryResponseV1: Type.TObject<
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
> = DroneTelemetryHistoryResponseSchema;
/** Response schema for drone event history. */
export const DroneEventHistoryResponseV1: Type.TObject<
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
> = DroneEventHistoryResponseSchema;
/** Response schema for global drone event history. */
export const DroneGlobalEventHistoryResponseV1: Type.TObject<
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
> = DroneGlobalEventHistoryResponseSchema;

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Error response schema for drone history contracts. */
export const DroneHistoryErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/** V1 contract definition for drone telemetry history retrieval. */
export const DroneTelemetryHistoryContractV1 = {
  version: CONTRACT_VERSION,
  name: TELEMETRY_CONTRACT_NAME,
  request: DroneHistoryRequestV1,
  response: DroneTelemetryHistoryResponseV1,
  errors: DroneHistoryErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract definition for drone event history retrieval. */
export const DroneEventHistoryContractV1 = {
  version: CONTRACT_VERSION,
  name: EVENTS_CONTRACT_NAME,
  request: DroneHistoryRequestV1,
  response: DroneEventHistoryResponseV1,
  errors: DroneHistoryErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract definition for global drone event history retrieval. */
export const DroneGlobalEventHistoryContractV1 = {
  version: CONTRACT_VERSION,
  name: GLOBAL_EVENTS_CONTRACT_NAME,
  request: DroneHistoryRequestV1,
  response: DroneGlobalEventHistoryResponseV1,
  errors: DroneHistoryErrorV1,
} as const satisfies VersionedContractV1;
