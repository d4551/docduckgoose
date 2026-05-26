/**
 * RPA Training Handoff Contracts v1
 *
 * Defines the versioned contract for RPA training preview and handoff endpoints.
 *
 * @shared/contracts/versions/v1/rpa-training
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  RpaTrainingHandoffPreviewResponseSchema,
  RpaTrainingHandoffRequestSchema,
  RpaTrainingHandoffResponseEnvelopeSchema,
} from "../../../schemas/rpa.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for training preview endpoint.
 */
export const PREVIEW_CONTRACT_NAME = "rpa-training-handoff-preview";

/**
 * Contract name for training start endpoint.
 */
export const START_CONTRACT_NAME = "rpa-training-handoff-start";

/**
 * Request schema for RPA training preview endpoint.
 */
export const RpaTrainingHandoffPreviewRequestV1: typeof RpaTrainingHandoffRequestSchema =
  RpaTrainingHandoffRequestSchema;

/**
 * Request schema for RPA training start endpoint.
 */
export const RpaTrainingHandoffStartRequestV1: typeof RpaTrainingHandoffRequestSchema =
  RpaTrainingHandoffRequestSchema;

/**
 * Response schema for RPA training preview endpoint.
 */
export const RpaTrainingHandoffPreviewResponseV1: typeof RpaTrainingHandoffPreviewResponseSchema =
  RpaTrainingHandoffPreviewResponseSchema;

/**
 * Response schema for RPA training start endpoint.
 */
export const RpaTrainingHandoffStartResponseV1: typeof RpaTrainingHandoffResponseEnvelopeSchema =
  RpaTrainingHandoffResponseEnvelopeSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for training preview failures.
 */
export const RpaTrainingHandoffPreviewErrorV1 = Type.Object(
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
 * Error schema for training start failures.
 */
export const RpaTrainingHandoffStartErrorV1 = Type.Object(
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
 * RPA training preview contract definition (v1).
 */
export const RpaTrainingHandoffPreviewContractV1 = {
  name: PREVIEW_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: RpaTrainingHandoffPreviewRequestV1,
  response: RpaTrainingHandoffPreviewResponseV1,
  errors: RpaTrainingHandoffPreviewErrorV1,
} as const satisfies VersionedContractV1;

/**
 * RPA training start contract definition (v1).
 */
export const RpaTrainingHandoffStartContractV1 = {
  name: START_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: RpaTrainingHandoffStartRequestV1,
  response: RpaTrainingHandoffStartResponseV1,
  errors: RpaTrainingHandoffStartErrorV1,
} as const satisfies VersionedContractV1;
