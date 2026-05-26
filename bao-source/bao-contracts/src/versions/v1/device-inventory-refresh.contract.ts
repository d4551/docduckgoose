/**
 * Device inventory refresh contract v1.
 *
 * Defines the versioned contract for device inventory refresh endpoint.
 *
 * @shared/contracts/versions/v1/device-inventory-refresh
 */

import {
  DeviceInventoryRefreshRequestSchema,
  DeviceInventoryRefreshResponseSchema,
} from "@baohaus/bao-schemas/device-inventory.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for device inventory refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "device-inventory-refresh";

/**
 * Request schema for device inventory refresh endpoint.
 */
export const DeviceInventoryRefreshRequestV1: Type.TObject<
  {
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly persist: Type.TOptional<Type.TBoolean>;
    readonly updateName: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly persist: Type.TOptional<Type.TBoolean>;
    readonly updateName: Type.TOptional<Type.TBoolean>;
  }>
> = DeviceInventoryRefreshRequestSchema;

/**
 * Response schema for device inventory refresh endpoint.
 */
export const DeviceInventoryRefreshResponseV1: typeof DeviceInventoryRefreshResponseSchema =
  DeviceInventoryRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for device inventory refresh failures.
 */
export const DeviceInventoryRefreshErrorV1 = Type.Object(
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
 * Device inventory refresh contract definition (v1).
 */
export const DeviceInventoryRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: DeviceInventoryRefreshRequestV1,
  response: DeviceInventoryRefreshResponseV1,
  errors: DeviceInventoryRefreshErrorV1,
} as const satisfies VersionedContractV1;
