/**
 * OpenUSD Asset Contracts v1
 *
 * Defines versioned contracts for USD asset inventory and scan-session imports.
 *
 * @shared/contracts/versions/v1/usd-assets
 */

import {
  UsdAssetArViewingUrlsResponseSchema,
  UsdAssetListQuerySchema,
  UsdAssetResponseSchema,
  UsdAssetsResponseSchema,
  UsdScanSessionJobStatusResponseSchema,
  UsdScanSessionQueueResponseSchema,
  UsdScanSessionRequestSchema,
  UsdValidationResponseSchema,
} from "@baohaus/bao-schemas/usd.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const LIST_CONTRACT_NAME = "usd-assets-list";
/** Contract name for USD asset detail retrieval. */
export const DETAIL_CONTRACT_NAME = "usd-asset-detail";
/** Contract name for USD asset AR URL generation. */
export const AR_URLS_CONTRACT_NAME = "usd-asset-ar-urls";
/** Contract name for USD asset validation. */
export const VALIDATE_CONTRACT_NAME = "usd-asset-validate";
/** Contract name for creating a scan session import job. */
export const SCAN_SESSION_CREATE_CONTRACT_NAME = "usd-scan-session-import";
/** Contract name for queuing a scan session processing job. */
export const SCAN_SESSION_QUEUE_CONTRACT_NAME = "usd-scan-session-queue";
/** Contract name for checking scan session job status. */
export const SCAN_SESSION_JOB_STATUS_CONTRACT_NAME = "usd-scan-session-job-status";

/**
 * Request schema for USD asset list.
 */
export const UsdAssetsListRequestV1: Type.TObject<
  {
    readonly search: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly search: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = UsdAssetListQuerySchema;

/**
 * Response schema for USD asset list.
 */
export const UsdAssetsListResponseV1: typeof UsdAssetsResponseSchema = UsdAssetsResponseSchema;

/**
 * Request schema for USD asset detail.
 */
export const UsdAssetDetailRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object(
    {
      id: Type.String({ minLength: 1 }),
    },
    { additionalProperties: false },
  );

/**
 * Response schema for USD asset detail.
 */
export const UsdAssetDetailResponseV1: typeof UsdAssetResponseSchema = UsdAssetResponseSchema;

/**
 * Request schema for USD asset AR URLs.
 */
export const UsdAssetArUrlsRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object(
    {
      id: Type.String({ minLength: 1 }),
    },
    { additionalProperties: false },
  );

/**
 * Response schema for USD asset AR URLs.
 */
export const UsdAssetArUrlsResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<
      {
        readonly usdzUrl: Type.TString;
        readonly glbUrl: Type.TOptional<Type.TString>;
        readonly arCompatible: Type.TBoolean;
        readonly platform: Type.TUnion<
          (
            | Type.TLiteral<"ios-quicklook">
            | Type.TLiteral<"android-scene-viewer">
            | Type.TLiteral<"webxr-ar">
            | Type.TLiteral<"unsupported">
          )[]
        >;
      },
      "arCompatible" | "platform" | "usdzUrl",
      "glbUrl"
    >;
  },
  "ok" | "data",
  never
> = UsdAssetArViewingUrlsResponseSchema;

/**
 * Request schema for USD asset validation.
 */
export const UsdAssetValidateRequestV1: Type.TObject<
  {
    readonly id: Type.TString;
    readonly profile: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"arkit"> | Type.TLiteral<"visionos"> | Type.TLiteral<"web">)[]>
    >;
  },
  "id",
  "profile"
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    profile: Type.Optional(
      Type.Union([Type.Literal("arkit"), Type.Literal("visionos"), Type.Literal("web")]),
    ),
  },
  { additionalProperties: false },
);

/**
 * Response schema for USD asset validation.
 */
export const UsdAssetValidateResponseV1: typeof UsdValidationResponseSchema =
  UsdValidationResponseSchema;

/**
 * Request schema for scan session -> USD asset import.
 */
export const UsdScanSessionImportRequestV1: Type.TObject<
  {
    readonly sessionId: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly format: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly sessionId: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly format: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = UsdScanSessionRequestSchema;

/**
 * Response schema for scan session -> USD asset import.
 */
export const UsdScanSessionImportResponseV1: typeof UsdAssetResponseSchema = UsdAssetResponseSchema;

/**
 * Request schema for scan session -> USD asset queue.
 */
export const UsdScanSessionQueueRequestV1: Type.TObject<
  {
    readonly sessionId: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly format: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly sessionId: Type.TString;
    readonly name: Type.TOptional<Type.TString>;
    readonly format: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = UsdScanSessionRequestSchema;

/**
 * Response schema for scan session -> USD asset queue.
 */
export const UsdScanSessionQueueResponseV1: typeof UsdScanSessionQueueResponseSchema =
  UsdScanSessionQueueResponseSchema;

/**
 * Request schema for scan session -> USD job status.
 */
export const UsdScanSessionJobStatusRequestV1: Type.TObject<
  { readonly jobId: Type.TString },
  "jobId",
  never
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for scan session -> USD job status.
 */
export const UsdScanSessionJobStatusResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly job: Type.TObject<
      {
        readonly id: Type.TString;
        readonly state: Type.TString;
        readonly createdOn: Type.TString;
        readonly startedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly completedOn: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly output: Type.TUnion<(Type.TNull | Type.TRecord<Type.TString, Type.TUnknown>)[]>;
      },
      "id" | "startedOn" | "completedOn" | "output" | "state" | "createdOn",
      never
    >;
  },
  "ok" | "job",
  never
> = UsdScanSessionJobStatusResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for USD asset list endpoint.
 */
export const UsdAssetsListErrorV1 = Type.Object(
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
 * Error schema for USD asset detail endpoint.
 */
export const UsdAssetDetailErrorV1 = Type.Object(
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
 * Error schema for USD asset AR URLs endpoint.
 */
export const UsdAssetArUrlsErrorV1 = Type.Object(
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
 * Error schema for USD asset validation endpoint.
 */
export const UsdAssetValidateErrorV1 = Type.Object(
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
 * Error schema for scan session -> USD import endpoint.
 */
export const UsdScanSessionImportErrorV1 = Type.Object(
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
 * Error schema for scan session -> USD queue endpoint.
 */
export const UsdScanSessionQueueErrorV1 = Type.Object(
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
 * Error schema for scan session -> USD job status endpoint.
 */
export const UsdScanSessionJobStatusErrorV1 = Type.Object(
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
 * USD assets list contract definition (v1).
 */
export const UsdAssetsListContractV1 = {
  name: LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdAssetsListRequestV1,
  response: UsdAssetsListResponseV1,
  errors: UsdAssetsListErrorV1,
} as const satisfies VersionedContractV1;

/**
 * USD asset detail contract definition (v1).
 */
export const UsdAssetDetailContractV1 = {
  name: DETAIL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdAssetDetailRequestV1,
  response: UsdAssetDetailResponseV1,
  errors: UsdAssetDetailErrorV1,
} as const satisfies VersionedContractV1;

/**
 * USD asset AR URLs contract definition (v1).
 */
export const UsdAssetArUrlsContractV1 = {
  name: AR_URLS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdAssetArUrlsRequestV1,
  response: UsdAssetArUrlsResponseV1,
  errors: UsdAssetArUrlsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * USD asset validation contract definition (v1).
 */
export const UsdAssetValidateContractV1 = {
  name: VALIDATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdAssetValidateRequestV1,
  response: UsdAssetValidateResponseV1,
  errors: UsdAssetValidateErrorV1,
} as const satisfies VersionedContractV1;

/**
 * USD scan session import contract definition (v1).
 */
export const UsdScanSessionImportContractV1 = {
  name: SCAN_SESSION_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdScanSessionImportRequestV1,
  response: UsdScanSessionImportResponseV1,
  errors: UsdScanSessionImportErrorV1,
} as const satisfies VersionedContractV1;

/**
 * USD scan session queue contract definition (v1).
 */
export const UsdScanSessionQueueContractV1 = {
  name: SCAN_SESSION_QUEUE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdScanSessionQueueRequestV1,
  response: UsdScanSessionQueueResponseV1,
  errors: UsdScanSessionQueueErrorV1,
} as const satisfies VersionedContractV1;

/**
 * USD scan session job status contract definition (v1).
 */
export const UsdScanSessionJobStatusContractV1 = {
  name: SCAN_SESSION_JOB_STATUS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdScanSessionJobStatusRequestV1,
  response: UsdScanSessionJobStatusResponseV1,
  errors: UsdScanSessionJobStatusErrorV1,
} as const satisfies VersionedContractV1;
