/**
 * BunBuddy Health Contract v1
 *
 * Defines the versioned contract for bunbuddy health endpoint responses.
 * This contract is used for canonical contract validation and schema enforcement.
 *
 * @shared/contracts/versions/v1/bunbuddy-health
 */

import { ProblemDetailsSchema } from "@baohaus/bao-schemas/problem.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import type { VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "bunbuddy-health";

/**
 * Request schema for health endpoint (empty body for GET).
 */
export const BunBuddyHealthRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

/**
 * Response schema for health endpoint.
 *
 * @remarks
 * This matches the canonical BunBuddyHealth schema but is explicitly versioned
 * for contract testing purposes.
 */
export const BunBuddyHealthResponseV1 = Type.Object(
  {
    status: Type.Union([Type.Literal("ok"), Type.Literal("degraded")], {
      description: "Health status indicator",
    }),
    service: Type.String({
      minLength: 1,
      description: "Service identifier",
    }),
    version: Type.String({
      minLength: 1,
      description: "Service version",
    }),
    simulation: Type.Optional(
      Type.Boolean({
        description: "Whether running in simulation mode",
      }),
    ),
    host: Type.Optional(
      Type.Unknown({
        description: "Host information object",
      }),
    ),
    guidance: Type.Optional(
      Type.Array(Type.String(), {
        description: "Setup or troubleshooting hints",
      }),
    ),
    capabilities: Type.Optional(
      Type.Unknown({
        description: "Capability metadata",
      }),
    ),
  },
  {
    additionalProperties: true,
    description: "BunBuddy health endpoint response",
  },
);

/**
 * Error schema for health endpoint failures.
 */
export const BunBuddyHealthErrorV1 = Type.Object(
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
 * Complete health contract definition.
 */
export const BunBuddyHealthContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: BunBuddyHealthRequestV1,
  response: BunBuddyHealthResponseV1,
  errors: BunBuddyHealthErrorV1,
} as const satisfies VersionedContractV1;
