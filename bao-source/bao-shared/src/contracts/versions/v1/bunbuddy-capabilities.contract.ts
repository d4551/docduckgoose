/**
 * BunBuddy Capabilities Contract v1
 *
 * Defines the versioned contract for bunbuddy capabilities endpoints.
 * Used for canonical contract validation and schema enforcement.
 *
 * @shared/contracts/versions/v1/bunbuddy-capabilities
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { ProblemDetailsSchema } from "../../../schemas/problem.schemas";
import type { VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "bunbuddy-capabilities";

/**
 * Request schema for capabilities endpoint (empty for GET).
 */
export const BunBuddyCapabilitiesRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

/**
 * Response schema for capabilities endpoint.
 */
export const BunBuddyCapabilitiesResponseV1 = Type.Object(
  {
    status: Type.Union([Type.Literal("ok"), Type.Literal("degraded")], {
      description: "Service health status",
    }),
    service: Type.String({
      minLength: 1,
      description: "Service identifier",
    }),
    version: Type.String({
      minLength: 1,
      description: "Service version",
    }),
    features: Type.Record(Type.String(), Type.Boolean(), {
      description: "Feature flags map",
    }),
    libraries: Type.Optional(
      Type.Record(Type.String(), Type.String(), {
        description: "Dependency/library versions reported by the bunbuddy",
      }),
    ),
    capacity: Type.Optional(
      Type.Object(
        {
          concurrency: Type.Optional(
            Type.Object({
              inFlight: Type.Optional(Type.Integer({ minimum: 0 })),
              max: Type.Optional(Type.Integer({ minimum: 0 })),
              queueDepth: Type.Optional(Type.Integer({ minimum: 0 })),
              maxQueueDepth: Type.Optional(Type.Integer({ minimum: 0 })),
            }),
          ),
          cpu: Type.Optional(
            Type.Object({
              used: Type.Optional(Type.Number({ minimum: 0 })),
              total: Type.Optional(Type.Number({ minimum: 0 })),
              utilizationPct: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
            }),
          ),
          memory: Type.Optional(
            Type.Object({
              used: Type.Optional(Type.Number({ minimum: 0 })),
              total: Type.Optional(Type.Number({ minimum: 0 })),
              utilizationPct: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
            }),
          ),
          gpu: Type.Optional(
            Type.Object({
              used: Type.Optional(Type.Number({ minimum: 0 })),
              total: Type.Optional(Type.Number({ minimum: 0 })),
              utilizationPct: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
            }),
          ),
          throughputPerMinute: Type.Optional(Type.Number({ minimum: 0 })),
        },
        { additionalProperties: true },
      ),
    ),
    endpoints: Type.Array(Type.String({ minLength: 1 }), {
      description: "Available endpoint paths",
    }),
    notes: Type.Optional(
      Type.Array(Type.String(), {
        description: "Implementation notes or warnings",
      }),
    ),
    timestamp: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Response timestamp",
      }),
    ),
  },
  {
    additionalProperties: true,
    description: "BunBuddy capabilities response",
  },
);

/**
 * Error schema for capabilities endpoint failures.
 */
export const BunBuddyCapabilitiesErrorV1 = Type.Object(
  {
    400: ProblemDetailsSchema,
    401: ProblemDetailsSchema,
    403: ProblemDetailsSchema,
    404: ProblemDetailsSchema,
    409: ProblemDetailsSchema,
    422: ProblemDetailsSchema,
    429: ProblemDetailsSchema,
    500: ProblemDetailsSchema,
    502: ProblemDetailsSchema,
    503: ProblemDetailsSchema,
  },
  { additionalProperties: false },
);

/**
 * Complete capabilities contract definition.
 */
export const BunBuddyCapabilitiesContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: BunBuddyCapabilitiesRequestV1,
  response: BunBuddyCapabilitiesResponseV1,
  errors: BunBuddyCapabilitiesErrorV1,
} as const satisfies VersionedContractV1;
