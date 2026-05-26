/**
 * Robotics capability portfolio contracts v1.
 *
 * Defines the versioned contracts for the robotics capability portfolio surface.
 *
 * @shared/contracts/versions/v1/robotics-capability
 */

import {
  RoboticsCapabilityPortfolioRefreshRequestSchema,
  RoboticsCapabilityPortfolioRequestSchema,
  RoboticsCapabilityPortfolioResponseSchema,
} from "@baohaus/bao-schemas/robotics-capability.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const PORTFOLIO_CONTRACT_NAME = "robotics-capability-portfolio";
/** Contract name for refreshing the robotics capability portfolio. */
export const REFRESH_CONTRACT_NAME = "robotics-capability-portfolio-refresh";

/**
 * Request schema for portfolio read.
 */
export const RoboticsCapabilityPortfolioRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = RoboticsCapabilityPortfolioRequestSchema;

/**
 * Response schema for portfolio read.
 */
export const RoboticsCapabilityPortfolioResponseV1: typeof RoboticsCapabilityPortfolioResponseSchema =
  RoboticsCapabilityPortfolioResponseSchema;

/**
 * Request schema for portfolio refresh.
 */
export const RoboticsCapabilityPortfolioRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = RoboticsCapabilityPortfolioRefreshRequestSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for portfolio read endpoint.
 */
export const RoboticsCapabilityPortfolioErrorV1 = Type.Object(
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
export const RoboticsCapabilityPortfolioRefreshErrorV1 = Type.Object(
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
export const RoboticsCapabilityPortfolioContractV1 = {
  version: CONTRACT_VERSION,
  name: PORTFOLIO_CONTRACT_NAME,
  request: RoboticsCapabilityPortfolioRequestV1,
  response: RoboticsCapabilityPortfolioResponseV1,
  errors: RoboticsCapabilityPortfolioErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Portfolio refresh contract definition.
 */
export const RoboticsCapabilityPortfolioRefreshContractV1 = {
  version: CONTRACT_VERSION,
  name: REFRESH_CONTRACT_NAME,
  request: RoboticsCapabilityPortfolioRefreshRequestV1,
  response: RoboticsCapabilityPortfolioResponseV1,
  errors: RoboticsCapabilityPortfolioRefreshErrorV1,
} as const satisfies VersionedContractV1;
