/**
 * Hardware Integration Contract v1
 *
 * Defines the versioned contract for the hardware integration summary endpoint.
 *
 * @shared/contracts/versions/v1/hardware-integration
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  HardwareIntegrationRequestSchema,
  HardwareIntegrationResponseSchema,
} from "../../../schemas/hardware-integration.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "hardware-integration";

/**
 * Contract version alias.
 */
export const HARDWARE_INTEGRATION_CONTRACT_VERSION: "1.0.0" = CONTRACT_VERSION;

/**
 * Contract name alias.
 */
export const HARDWARE_INTEGRATION_CONTRACT_NAME: "hardware-integration" = CONTRACT_NAME;

/**
 * Request schema for the hardware integration endpoint.
 */
export const HardwareIntegrationRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = HardwareIntegrationRequestSchema;

/**
 * Response schema for the hardware integration endpoint.
 */
export const HardwareIntegrationResponseV1: typeof HardwareIntegrationResponseSchema =
  HardwareIntegrationResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for hardware integration failures.
 */
export const HardwareIntegrationErrorV1 = Type.Object(
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
 * Complete hardware integration contract definition.
 */
export const HardwareIntegrationContractV1: VersionedContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: HardwareIntegrationRequestV1,
  response: HardwareIntegrationResponseV1,
  errors: HardwareIntegrationErrorV1,
};
