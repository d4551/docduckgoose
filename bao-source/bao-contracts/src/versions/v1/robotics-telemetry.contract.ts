/**
 * Robotics Telemetry Contracts v1
 *
 * Defines the versioned contracts for robotics telemetry capture, listing, and replay.
 *
 * @shared/contracts/versions/v1/robotics-telemetry
 */

import {
  RoboticsTelemetryCaptureRequestSchema,
  RoboticsTelemetryCaptureResponseSchema,
  RoboticsTelemetryListRequestSchema,
  RoboticsTelemetryListResponseSchema,
  RoboticsTelemetryReplayRequestSchema,
  RoboticsTelemetryReplayResponseSchema,
} from "@baohaus/bao-schemas/robotics-telemetry.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const CAPTURE_CONTRACT_NAME = "robotics-telemetry-capture";
/** Contract name for listing robotics telemetry records. */
export const LIST_CONTRACT_NAME = "robotics-telemetry-list";
/** Contract name for replaying robotics telemetry data. */
export const REPLAY_CONTRACT_NAME = "robotics-telemetry-replay";

/**
 * Request schema for telemetry capture.
 */
export const RoboticsTelemetryCaptureRequestV1: Type.TObject<
  {
    readonly robotIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly maxSamples: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly robotIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly maxSamples: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = RoboticsTelemetryCaptureRequestSchema;

/**
 * Response schema for telemetry capture.
 */
export const RoboticsTelemetryCaptureResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly captured: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "captured",
  never
> = RoboticsTelemetryCaptureResponseSchema;

/**
 * Request schema for telemetry list.
 */
export const RoboticsTelemetryListRequestV1: Type.TObject<
  {
    readonly robotId: Type.TOptional<Type.TString>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly robotId: Type.TOptional<Type.TString>;
    readonly since: Type.TOptional<Type.TString>;
    readonly until: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = RoboticsTelemetryListRequestSchema;

/**
 * Response schema for telemetry list.
 */
export const RoboticsTelemetryListResponseV1: typeof RoboticsTelemetryListResponseSchema =
  RoboticsTelemetryListResponseSchema;

/**
 * Request schema for telemetry replay.
 */
export const RoboticsTelemetryReplayRequestV1: typeof RoboticsTelemetryReplayRequestSchema =
  RoboticsTelemetryReplayRequestSchema;

/**
 * Response schema for telemetry replay.
 */
export const RoboticsTelemetryReplayResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly scheduled: Type.TBoolean;
    readonly replayId: Type.TOptional<Type.TString>;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "scheduled",
  "replayId"
> = RoboticsTelemetryReplayResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for telemetry capture endpoint.
 */
export const RoboticsTelemetryCaptureErrorV1 = Type.Object(
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

/**
 * Error schema for telemetry list endpoint.
 */
export const RoboticsTelemetryListErrorV1 = Type.Object(
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

/**
 * Error schema for telemetry replay endpoint.
 */
export const RoboticsTelemetryReplayErrorV1 = Type.Object(
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

/**
 * Telemetry capture contract definition.
 */
export const RoboticsTelemetryCaptureContractV1 = {
  version: CONTRACT_VERSION,
  name: CAPTURE_CONTRACT_NAME,
  request: RoboticsTelemetryCaptureRequestV1,
  response: RoboticsTelemetryCaptureResponseV1,
  errors: RoboticsTelemetryCaptureErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Telemetry list contract definition.
 */
export const RoboticsTelemetryListContractV1 = {
  version: CONTRACT_VERSION,
  name: LIST_CONTRACT_NAME,
  request: RoboticsTelemetryListRequestV1,
  response: RoboticsTelemetryListResponseV1,
  errors: RoboticsTelemetryListErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Telemetry replay contract definition.
 */
export const RoboticsTelemetryReplayContractV1 = {
  version: CONTRACT_VERSION,
  name: REPLAY_CONTRACT_NAME,
  request: RoboticsTelemetryReplayRequestV1,
  response: RoboticsTelemetryReplayResponseV1,
  errors: RoboticsTelemetryReplayErrorV1,
} as const satisfies VersionedContractV1;
