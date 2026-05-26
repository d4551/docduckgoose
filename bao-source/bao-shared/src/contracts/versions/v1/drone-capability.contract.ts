/**
 * Drone capability portfolio contracts v1.
 *
 * Defines the versioned contracts for the drone capability portfolio surface.
 *
 * @shared/contracts/versions/v1/drone-capability
 */

import {
  DroneCapabilityPortfolioRefreshRequestSchema,
  DroneCapabilityPortfolioRequestSchema,
  DroneCapabilityPortfolioResponseSchema,
} from "@baohaus/bao-schemas/drone-capability.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const PORTFOLIO_CONTRACT_NAME = "drone-capability-portfolio";
/** Contract name for refreshing the drone capability portfolio. */
export const REFRESH_CONTRACT_NAME = "drone-capability-portfolio-refresh";

/**
 * Request schema for portfolio read.
 */
export const DroneCapabilityPortfolioRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = DroneCapabilityPortfolioRequestSchema;

/**
 * Response schema for portfolio read.
 */
export const DroneCapabilityPortfolioResponseV1: typeof DroneCapabilityPortfolioResponseSchema =
  DroneCapabilityPortfolioResponseSchema;

/**
 * Request schema for portfolio refresh.
 */
export const DroneCapabilityPortfolioRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = DroneCapabilityPortfolioRefreshRequestSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for portfolio read endpoint.
 */
export const DroneCapabilityPortfolioErrorV1 = Type.Object(
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
 * Error schema for portfolio refresh endpoint.
 */
export const DroneCapabilityPortfolioRefreshErrorV1 = Type.Object(
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
 * Portfolio read contract definition.
 */
export const DroneCapabilityPortfolioContractV1 = {
  version: CONTRACT_VERSION,
  name: PORTFOLIO_CONTRACT_NAME,
  request: DroneCapabilityPortfolioRequestV1,
  response: DroneCapabilityPortfolioResponseV1,
  errors: DroneCapabilityPortfolioErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Portfolio refresh contract definition.
 */
export const DroneCapabilityPortfolioRefreshContractV1 = {
  version: CONTRACT_VERSION,
  name: REFRESH_CONTRACT_NAME,
  request: DroneCapabilityPortfolioRefreshRequestV1,
  response: DroneCapabilityPortfolioResponseV1,
  errors: DroneCapabilityPortfolioRefreshErrorV1,
} as const satisfies VersionedContractV1;
