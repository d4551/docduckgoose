/**
 * Robotics Summary Contract v1
 *
 * Defines the versioned contract for the aggregated robotics summary endpoint.
 * This is a BFF surface used by the Robotics Command UI.
 *
 * @shared/contracts/versions/v1/robotics-summary
 */

import { ROBOTICS_SUMMARY_DEFAULTS } from "@baohaus/bao-config/robotics.defaults";
import { DEFAULT_TIMEOUTS } from "@baohaus/bao-constants/timeouts";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "robotics-summary";

/**
 * Shared cache metadata shape for robotics summaries.
 */
const RoboticsCacheSummaryV1 = Type.Object(
  {
    cacheTtlMs: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cacheAgeMs: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    lastScanTime: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    cachedDevices: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Robotics status summary payload.
 */
const RoboticsStatusSummaryV1 = Type.Object(
  {
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    service: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    simulation: Type.Union([Type.Boolean(), Type.Null()]),
    protocols: Type.Array(Type.String({ minLength: 1 })),
    activeRobots: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cacheTtlMs: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    lastScanTime: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    timestamp: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Robotics capabilities summary payload.
 */
const RoboticsCapabilitiesSummaryV1 = Type.Object(
  {
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    service: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    version: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    features: Type.Record(Type.String({ minLength: 1 }), Type.Boolean()),
    protocols: Type.Array(Type.String({ minLength: 1 })),
    endpoints: Type.Array(Type.String({ minLength: 1 })),
    cache: Type.Union([RoboticsCacheSummaryV1, Type.Null()]),
    timestamp: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Robotics metrics summary payload.
 */
const RoboticsMetricsSummaryV1 = Type.Object(
  {
    pendingRequests: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    totalRequests: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    connectedRobots: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    totalRobots: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    cacheAgeMs: Type.Union([Type.Integer({ minimum: 0 }), Type.Null()]),
    timestamp: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Robotics device summary payload.
 */
const RoboticsDeviceSummaryV1 = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    type: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    protocol: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    status: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    connected: Type.Boolean(),
    mode: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    vendor: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    model: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    capabilities: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
    discovery: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
    simulated: Type.Boolean(),
  },
  {
    additionalProperties: true,
  },
);

/**
 * Request schema for robotics summary endpoint (query parameters).
 */
export const RoboticsSummaryRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly deviceLimit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly includeBunBuddySnapshot: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly deviceLimit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly includeBunBuddySnapshot: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
  }>
> = Type.Object(
  {
    timeoutMs: Type.Optional(
      Type.Union([
        Type.Integer({
          minimum: DEFAULT_TIMEOUTS.roboticsSummaryMinMs,
          maximum: DEFAULT_TIMEOUTS.roboticsSummaryMaxMs,
        }),
        Type.String({ minLength: 1 }),
      ]),
    ),
    deviceLimit: Type.Optional(
      Type.Union([
        Type.Integer({
          minimum: ROBOTICS_SUMMARY_DEFAULTS.deviceLimitBounds.defaultLimit.min,
          maximum: ROBOTICS_SUMMARY_DEFAULTS.deviceLimitBounds.maxLimit.max,
        }),
        Type.String({ minLength: 1 }),
      ]),
    ),
    includeBunBuddySnapshot: Type.Optional(
      Type.Union([Type.Boolean(), Type.String({ minLength: 1 })]),
    ),
  },
  { additionalProperties: false },
);

/**
 * Response schema for robotics summary endpoint.
 */
export const RoboticsSummaryResponseV1 = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        status: Type.Union([RoboticsStatusSummaryV1, Type.Null()]),
        capabilities: Type.Union([RoboticsCapabilitiesSummaryV1, Type.Null()]),
        metrics: Type.Union([RoboticsMetricsSummaryV1, Type.Null()]),
        bunbuddySnapshot: Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
        devices: Type.Array(RoboticsDeviceSummaryV1),
        timestamp: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    errors: Type.Array(Type.String()),
    timestamp: Type.String({ minLength: 1 }),
  },
  {
    additionalProperties: false,
    description: "Aggregated robotics summary response",
  },
);

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for robotics summary endpoint.
 */
export const RoboticsSummaryErrorV1 = Type.Object(
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
  {},
);

/**
 * Complete robotics summary contract definition.
 */
export const RoboticsSummaryContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: RoboticsSummaryRequestV1,
  response: RoboticsSummaryResponseV1,
  errors: RoboticsSummaryErrorV1,
} as const satisfies VersionedContractV1;
