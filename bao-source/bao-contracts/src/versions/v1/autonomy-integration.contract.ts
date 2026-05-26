/**
 * Autonomy integration contracts v1.
 *
 * Defines the versioned contracts for autonomy integration snapshots
 * spanning ownership focus, drone, and robotics portfolios.
 *
 * @shared/contracts/versions/v1/autonomy-integration
 */

import {
  AutonomyIntegrationRefreshRequestSchema,
  AutonomyIntegrationRequestSchema,
  AutonomyIntegrationResponseSchema,
} from "@baohaus/bao-schemas/autonomy-integration.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const CONTRACT_NAME = "autonomy-integration";
/** Contract name for refreshing autonomy integration status. */
export const REFRESH_CONTRACT_NAME = "autonomy-integration-refresh";

/**
 * Request schema for autonomy integration snapshot.
 */
export const AutonomyIntegrationRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = AutonomyIntegrationRequestSchema;

/**
 * Response schema for autonomy integration snapshot.
 */
export const AutonomyIntegrationResponseV1: typeof AutonomyIntegrationResponseSchema =
  AutonomyIntegrationResponseSchema;

/**
 * Request schema for autonomy integration refresh.
 */
export const AutonomyIntegrationRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = AutonomyIntegrationRefreshRequestSchema;

/**
 * Response schema for autonomy integration refresh.
 */
export const AutonomyIntegrationRefreshResponseV1: typeof AutonomyIntegrationResponseSchema =
  AutonomyIntegrationResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for autonomy integration snapshot endpoint.
 */
export const AutonomyIntegrationErrorV1 = Type.Object(
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
 * Error schema for autonomy integration refresh endpoint.
 */
export const AutonomyIntegrationRefreshErrorV1 = Type.Object(
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
 * Autonomy integration snapshot contract definition.
 */
export const AutonomyIntegrationContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: AutonomyIntegrationRequestV1,
  response: AutonomyIntegrationResponseV1,
  errors: AutonomyIntegrationErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Autonomy integration refresh contract definition.
 */
export const AutonomyIntegrationRefreshContractV1 = {
  version: CONTRACT_VERSION,
  name: REFRESH_CONTRACT_NAME,
  request: AutonomyIntegrationRefreshRequestV1,
  response: AutonomyIntegrationRefreshResponseV1,
  errors: AutonomyIntegrationRefreshErrorV1,
} as const satisfies VersionedContractV1;
