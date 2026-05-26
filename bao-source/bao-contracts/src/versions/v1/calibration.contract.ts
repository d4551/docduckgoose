/**
 * Calibration Contracts v1
 *
 * Defines versioned contracts for the calibration API endpoints:
 * - Snapshot: `GET /api/v1/calibration`
 * - Status: `GET /api/v1/calibration/status`
 * - Run: `POST /api/v1/calibration/run`
 * - Run Job Enqueue: `POST /api/v1/calibration/jobs`
 * - Run Job Status: `GET /api/v1/calibration/jobs/:jobId`
 * - Detail: `GET /api/v1/calibration/:id`
 *
 * @shared/contracts/versions/v1/calibration
 */

import {
  CalibrationDetailRequestSchema,
  CalibrationDetailResponseSchema,
  CalibrationRunJobEnqueueResponseSchema,
  CalibrationRunJobStatusResponseSchema,
  CalibrationRunRequestSchema,
  CalibrationRunResponseSchema,
  CalibrationSnapshotQuerySchema,
  CalibrationSnapshotResponseSchema,
  CalibrationStatusQuerySchema,
  CalibrationStatusResponseSchema,
} from "@baohaus/bao-schemas/calibration.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const SNAPSHOT_CONTRACT_NAME = "calibration-snapshot";
/** Contract name for calibration status queries. */
export const STATUS_CONTRACT_NAME = "calibration-status";
/** Contract name for triggering a calibration run. */
export const RUN_CONTRACT_NAME = "calibration-run";
/** Contract name for enqueuing a calibration run as a background job. */
export const RUN_JOB_CONTRACT_NAME = "calibration-run-job";
/** Contract name for checking calibration job status. */
export const JOB_STATUS_CONTRACT_NAME = "calibration-job-status";
/** Contract name for calibration detail retrieval. */
export const DETAIL_CONTRACT_NAME = "calibration-detail";

/** Request schema for calibration snapshot queries. */
export const CalibrationSnapshotRequestV1: Type.TObject<
  {
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = CalibrationSnapshotQuerySchema;
/** Response schema for calibration snapshot data. */
export const CalibrationSnapshotResponseV1: typeof CalibrationSnapshotResponseSchema =
  CalibrationSnapshotResponseSchema;

/** Request schema for calibration status queries. */
export const CalibrationStatusRequestV1: Type.TObject<
  {
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly deviceType: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TOptional<Type.TString>;
    readonly deviceType: Type.TOptional<Type.TString>;
  }>
> = CalibrationStatusQuerySchema;
/** Response schema for calibration status data. */
export const CalibrationStatusResponseV1: typeof CalibrationStatusResponseSchema =
  CalibrationStatusResponseSchema;

/** Request schema for initiating a calibration run. */
export const CalibrationRunRequestV1: typeof CalibrationRunRequestSchema =
  CalibrationRunRequestSchema;
/** Response schema for a calibration run result. */
export const CalibrationRunResponseV1: typeof CalibrationRunResponseSchema =
  CalibrationRunResponseSchema;

/** Request schema for enqueuing a calibration job (reuses run request). */
export const CalibrationRunJobRequestV1: typeof CalibrationRunRequestSchema =
  CalibrationRunRequestSchema;
/** Response schema for a newly enqueued calibration job. */
export const CalibrationRunJobResponseV1: typeof CalibrationRunJobEnqueueResponseSchema =
  CalibrationRunJobEnqueueResponseSchema;

/** Request schema for checking a calibration job by ID. */
export const CalibrationJobStatusRequestV1: Type.TObject<
  { readonly jobId: Type.TString },
  "jobId",
  never
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Response schema for calibration job status. */
export const CalibrationJobStatusResponseV1: typeof CalibrationRunJobStatusResponseSchema =
  CalibrationRunJobStatusResponseSchema;

/** Request schema for retrieving calibration detail. */
export const CalibrationDetailRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  CalibrationDetailRequestSchema;
/** Response schema for calibration detail data. */
export const CalibrationDetailResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly calibration: Type.TObject<
      {
        readonly id: Type.TString;
        readonly deviceId: Type.TString;
        readonly deviceType: Type.TString;
        readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly data: Type.TUnion<(Type.TNull | Type.TUnknown)[]>;
        readonly errorMessage: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly performedBy: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly expiresAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly createdAt: Type.TString;
        readonly updatedAt: Type.TString;
      },
      | "status"
      | "data"
      | "errorMessage"
      | "performedBy"
      | "expiresAt"
      | "id"
      | "deviceId"
      | "deviceType"
      | "createdAt"
      | "updatedAt",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "calibration",
  never
> = CalibrationDetailResponseSchema;

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Error response schema for calibration contracts. */
export const CalibrationErrorV1 = Type.Object(
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

/** V1 contract for the calibration snapshot endpoint. */
export const CalibrationSnapshotContractV1 = {
  version: CONTRACT_VERSION,
  name: SNAPSHOT_CONTRACT_NAME,
  request: CalibrationSnapshotRequestV1,
  response: CalibrationSnapshotResponseV1,
  errors: CalibrationErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for the calibration status endpoint. */
export const CalibrationStatusContractV1 = {
  version: CONTRACT_VERSION,
  name: STATUS_CONTRACT_NAME,
  request: CalibrationStatusRequestV1,
  response: CalibrationStatusResponseV1,
  errors: CalibrationErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for synchronous calibration run execution. */
export const CalibrationRunContractV1 = {
  version: CONTRACT_VERSION,
  name: RUN_CONTRACT_NAME,
  request: CalibrationRunRequestV1,
  response: CalibrationRunResponseV1,
  errors: CalibrationErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for asynchronous calibration job enqueue. */
export const CalibrationRunJobContractV1 = {
  version: CONTRACT_VERSION,
  name: RUN_JOB_CONTRACT_NAME,
  request: CalibrationRunJobRequestV1,
  response: CalibrationRunJobResponseV1,
  errors: CalibrationErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for checking calibration job status. */
export const CalibrationJobStatusContractV1 = {
  version: CONTRACT_VERSION,
  name: JOB_STATUS_CONTRACT_NAME,
  request: CalibrationJobStatusRequestV1,
  response: CalibrationJobStatusResponseV1,
  errors: CalibrationErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for calibration detail retrieval by ID. */
export const CalibrationDetailContractV1 = {
  version: CONTRACT_VERSION,
  name: DETAIL_CONTRACT_NAME,
  request: CalibrationDetailRequestV1,
  response: CalibrationDetailResponseV1,
  errors: CalibrationErrorV1,
} as const satisfies VersionedContractV1;
