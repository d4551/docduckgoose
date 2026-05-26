/**
 * Setup Wizard Contract v1
 *
 * Defines the versioned contract for the system setup wizard snapshot endpoint.
 *
 * @shared/contracts/versions/v1/setup-wizard
 */

import {
  SetupWizardRefreshRequestSchema,
  SetupWizardRefreshResponseSchema,
  SetupWizardRequestSchema,
  SetupWizardResponseSchema,
  SetupWizardRunRequestSchema,
  SetupWizardRunResponseSchema,
  SetupWizardRunStatusRequestSchema,
  SetupWizardRunStatusResponseSchema,
} from "@baohaus/bao-schemas/setup-wizard.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for setup wizard snapshot endpoint.
 */
export const CONTRACT_NAME = "setup-wizard";

/**
 * Contract name for setup wizard refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "setup-wizard-refresh";

/**
 * Request schema for setup wizard snapshot endpoint.
 */
export const SetupWizardRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = SetupWizardRequestSchema;

/**
 * Response schema for setup wizard snapshot endpoint.
 */
export const SetupWizardResponseV1: typeof SetupWizardResponseSchema = SetupWizardResponseSchema;

/**
 * Request schema for setup wizard refresh endpoint.
 */
export const SetupWizardRefreshRequestV1: Type.TObject<
  {
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly autoRepair: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly autoRepair: Type.TOptional<Type.TBoolean>;
  }>
> = SetupWizardRefreshRequestSchema;

/**
 * Response schema for setup wizard refresh endpoint.
 */
export const SetupWizardRefreshResponseV1: typeof SetupWizardRefreshResponseSchema =
  SetupWizardRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for setup wizard snapshot failures.
 */
export const SetupWizardErrorV1 = Type.Object(
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
 * Error schema for setup wizard refresh failures.
 */
export const SetupWizardRefreshErrorV1 = Type.Object(
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
 * Setup wizard contract definition (v1).
 */
export const SetupWizardContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: SetupWizardRequestV1,
  response: SetupWizardResponseV1,
  errors: SetupWizardErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Setup wizard refresh contract definition (v1).
 */
export const SetupWizardRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: SetupWizardRefreshRequestV1,
  response: SetupWizardRefreshResponseV1,
  errors: SetupWizardRefreshErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract name for setup wizard run endpoint.
 */
export const RUN_CONTRACT_NAME = "setup-wizard-run";

/**
 * Request schema for setup wizard run endpoint.
 */
export const SetupWizardRunRequestV1: Type.TObject<
  {
    readonly action: Type.TUnion<(Type.TLiteral<"configure"> | Type.TLiteral<"setup:auto">)[]>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "action",
  "idempotencyKey"
> = SetupWizardRunRequestSchema;

/**
 * Response schema for setup wizard run endpoint.
 */
export const SetupWizardRunResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly status: Type.TUnion<(Type.TLiteral<"queued"> | Type.TLiteral<"deduplicated">)[]>;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "status" | "timestamp" | "jobId",
  "correlationId"
> = SetupWizardRunResponseSchema;

/**
 * Error schema for setup wizard run failures.
 */
export const SetupWizardRunErrorV1 = Type.Object(
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
 * Setup wizard run contract definition (v1).
 */
export const SetupWizardRunContractV1 = {
  name: RUN_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: SetupWizardRunRequestV1,
  response: SetupWizardRunResponseV1,
  errors: SetupWizardRunErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Contract name for setup wizard run status endpoint.
 */
export const RUN_STATUS_CONTRACT_NAME = "setup-wizard-run-status";

/**
 * Request schema for setup wizard run status endpoint.
 */
export const SetupWizardRunStatusRequestV1: Type.TObject<
  { readonly jobId: Type.TString },
  "jobId",
  never
> = SetupWizardRunStatusRequestSchema;

/**
 * Response schema for setup wizard run status endpoint.
 */
export const SetupWizardRunStatusResponseV1: typeof SetupWizardRunStatusResponseSchema =
  SetupWizardRunStatusResponseSchema;

/**
 * Error schema for setup wizard run status failures.
 */
export const SetupWizardRunStatusErrorV1 = Type.Object(
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
 * Setup wizard run status contract definition (v1).
 */
export const SetupWizardRunStatusContractV1 = {
  name: RUN_STATUS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: SetupWizardRunStatusRequestV1,
  response: SetupWizardRunStatusResponseV1,
  errors: SetupWizardRunStatusErrorV1,
} as const satisfies VersionedContractV1;
