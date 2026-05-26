/**
 * Capability Registry List Contract v1
 *
 * Defines the versioned contract for the capability registry list endpoint.
 *
 * @shared/contracts/versions/v1/capability-registry-list
 */

import { BunBuddyKindSchema } from "@baohaus/bao-schemas/bunbuddy.schemas";
import {
  CapabilityKindSchema,
  CapabilityListResponseSchema,
  CapabilityStatusSchema,
} from "@baohaus/bao-schemas/capability-registry.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "capability-registry-list";

/**
 * Request schema for capability registry list endpoint.
 */
export const CapabilityRegistryListRequestV1 = Type.Object(
  {
    kind: Type.Optional(CapabilityKindSchema),
    status: Type.Optional(CapabilityStatusSchema),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    bunbuddyKind: Type.Optional(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Response schema for capability registry list endpoint.
 */
export const CapabilityRegistryListResponseV1: typeof CapabilityListResponseSchema =
  CapabilityListResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for capability registry list failures.
 */
export const CapabilityRegistryListErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Capability registry list contract definition (v1).
 */
export const CapabilityRegistryListContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityRegistryListRequestV1,
  response: CapabilityRegistryListResponseV1,
  errors: CapabilityRegistryListErrorV1,
} as const satisfies VersionedContractV1;
