/**
 * BunBuddy Devices Contract v1
 *
 * Defines the versioned contract for bunbuddy device listing endpoints.
 * Used for canonical contract validation and schema enforcement.
 *
 * @shared/contracts/versions/v1/bunbuddy-devices
 */

import {
  BunBuddyDeviceSchema,
  BunBuddyListMetaSchema,
} from "@baohaus/bao-schemas/bunbuddy.schemas";
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
export const CONTRACT_NAME = "bunbuddy-devices";

/**
 * Request schema for devices endpoint (empty for GET).
 */
export const BunBuddyDevicesRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

/**
 * Response schema for devices endpoint.
 */
export const BunBuddyDevicesResponseV1 = Type.Object(
  {
    devices: Type.Array(BunBuddyDeviceSchema, {
      description: "List of discovered devices",
    }),
    meta: BunBuddyListMetaSchema,
  },
  {
    additionalProperties: true,
    description: "BunBuddy device list response",
  },
);

/**
 * Error schema for device listing failures.
 */
export const BunBuddyDevicesErrorV1 = Type.Object(
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
 * Complete devices contract definition.
 */
export const BunBuddyDevicesContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: BunBuddyDevicesRequestV1,
  response: BunBuddyDevicesResponseV1,
  errors: BunBuddyDevicesErrorV1,
} as const satisfies VersionedContractV1;
