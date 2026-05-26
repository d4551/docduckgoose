/**
 * Training Jobs Contract v1
 *
 * Defines versioned contracts for all training job API endpoints:
 * - GET  /stats           (training stats)
 * - GET  /jobs            (list jobs)
 * - POST /jobs            (create job)
 * - GET  /jobs/:id        (job detail)
 * - PATCH /jobs/:id       (update progress)
 * - GET  /jobs/:id/artifacts       (list artifacts)
 * - POST /jobs/:id/artifacts       (upload artifact)
 * - POST /jobs/:id/complete        (complete job)
 * - POST /jobs/:id/pause           (pause job)
 * - POST /jobs/:id/resume          (resume job)
 * - POST /jobs/:id/cancel          (cancel job)
 *
 * @shared/contracts/versions/v1/training-jobs
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  TrainingArtifactResponseSchema,
  TrainingArtifactsResponseSchema,
  TrainingJobCompleteRequestSchema,
  TrainingJobCreateRequestSchema,
  TrainingJobProgressUpdateSchema,
  TrainingJobResponseSchema,
  TrainingJobStatsResponseSchema,
  TrainingJobsQuerySchema,
  TrainingJobsResponseSchema,
} from "../../../schemas/training.schemas.ts";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const TRAINING_JOBS_CONTRACT_VERSION = "1.0.0";

// Shared Error Envelopes

/** Standard HTTP error statuses for training endpoints. */
const TrainingErrorEnvelope: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Common error schema for training endpoints.
 */
function buildTrainingErrorsV1(): ReturnType<typeof Type.Object> {
  return Type.Object(
    {
      400: TrainingErrorEnvelope,
      401: TrainingErrorEnvelope,
      403: TrainingErrorEnvelope,
      404: TrainingErrorEnvelope,
      422: TrainingErrorEnvelope,
      429: TrainingErrorEnvelope,
      500: TrainingErrorEnvelope,
      503: TrainingErrorEnvelope,
    },
    { additionalProperties: false },
  );
}
const TrainingErrorsV1: ReturnType<typeof buildTrainingErrorsV1> = buildTrainingErrorsV1();

// GET /stats

/**
 * Contract name for training stats endpoint.
 */
export const TRAINING_STATS_CONTRACT_NAME = "training-stats";

/**
 * Request schema for training stats (no params).
 */
export const TrainingStatsRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, {});

/**
 * Response schema for training stats endpoint.
 */
export const TrainingStatsResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly message: Type.TOptional<Type.TString>;
    readonly data: Type.TObject<
      {
        readonly total: Type.TInteger;
        readonly pending: Type.TInteger;
        readonly queued: Type.TInteger;
        readonly running: Type.TInteger;
        readonly completed: Type.TInteger;
        readonly failed: Type.TInteger;
        readonly canceled: Type.TInteger;
        readonly active: Type.TInteger;
        readonly timestamp: Type.TString;
      },
      | "pending"
      | "queued"
      | "running"
      | "completed"
      | "failed"
      | "canceled"
      | "total"
      | "timestamp"
      | "active",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "data",
  "message"
> = TrainingJobStatsResponseSchema;

/**
 * Error schema for training stats endpoint.
 */
export const TrainingStatsErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training stats contract definition.
 */
export const TrainingStatsContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_STATS_CONTRACT_NAME,
  request: TrainingStatsRequestV1,
  response: TrainingStatsResponseV1,
  errors: TrainingStatsErrorV1,
} as const satisfies VersionedContractV1;

// GET /jobs

/**
 * Contract name for training jobs list endpoint.
 */
export const TRAINING_JOBS_LIST_CONTRACT_NAME = "training-jobs-list";

/**
 * Request schema for training jobs list (query params).
 */
export const TrainingJobsListRequestV1: Type.TObject<
  {
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"pending">
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"canceled">
        )[]
      >
    >;
    readonly page: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly pageSize: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"pending">
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"canceled">
        )[]
      >
    >;
    readonly page: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly pageSize: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
  }>
> = TrainingJobsQuerySchema;

/**
 * Response schema for training jobs list endpoint.
 */
export const TrainingJobsListResponseV1: typeof TrainingJobsResponseSchema =
  TrainingJobsResponseSchema;

/**
 * Error schema for training jobs list endpoint.
 */
export const TrainingJobsListErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training jobs list contract definition.
 */
export const TrainingJobsListContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOBS_LIST_CONTRACT_NAME,
  request: TrainingJobsListRequestV1,
  response: TrainingJobsListResponseV1,
  errors: TrainingJobsListErrorV1,
} as const satisfies VersionedContractV1;

// POST /jobs

/**
 * Contract name for training job creation endpoint.
 */
export const TRAINING_JOB_CREATE_CONTRACT_NAME = "training-job-create";

/**
 * Request schema for training job creation.
 */
export const TrainingJobCreateRequestV1: typeof TrainingJobCreateRequestSchema =
  TrainingJobCreateRequestSchema;

/**
 * Response schema for training job creation.
 */
export const TrainingJobCreateResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job creation.
 */
export const TrainingJobCreateErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job creation contract definition.
 */
export const TrainingJobCreateContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_CREATE_CONTRACT_NAME,
  request: TrainingJobCreateRequestV1,
  response: TrainingJobCreateResponseV1,
  errors: TrainingJobCreateErrorV1,
} as const satisfies VersionedContractV1;

// GET /jobs/:id

/**
 * Contract name for training job detail endpoint.
 */
export const TRAINING_JOB_DETAIL_CONTRACT_NAME = "training-job-detail";

/**
 * Request schema for training job detail (path params).
 */
export const TrainingJobDetailRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1 }) }, {});

/**
 * Response schema for training job detail.
 */
export const TrainingJobDetailResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job detail.
 */
export const TrainingJobDetailErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job detail contract definition.
 */
export const TrainingJobDetailContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_DETAIL_CONTRACT_NAME,
  request: TrainingJobDetailRequestV1,
  response: TrainingJobDetailResponseV1,
  errors: TrainingJobDetailErrorV1,
} as const satisfies VersionedContractV1;

// PATCH /jobs/:id

/**
 * Contract name for training job progress update endpoint.
 */
export const TRAINING_JOB_UPDATE_CONTRACT_NAME = "training-job-update";

/**
 * Request schema for training job progress update.
 */
export const TrainingJobUpdateRequestV1: typeof TrainingJobProgressUpdateSchema =
  TrainingJobProgressUpdateSchema;

/**
 * Response schema for training job progress update.
 */
export const TrainingJobUpdateResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job progress update.
 */
export const TrainingJobUpdateErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job progress update contract definition.
 */
export const TrainingJobUpdateContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_UPDATE_CONTRACT_NAME,
  request: TrainingJobUpdateRequestV1,
  response: TrainingJobUpdateResponseV1,
  errors: TrainingJobUpdateErrorV1,
} as const satisfies VersionedContractV1;

// POST /jobs/:id/complete

/**
 * Contract name for training job completion endpoint.
 */
export const TRAINING_JOB_COMPLETE_CONTRACT_NAME = "training-job-complete";

/**
 * Request schema for training job completion.
 */
export const TrainingJobCompleteRequestV1: typeof TrainingJobCompleteRequestSchema =
  TrainingJobCompleteRequestSchema;

/**
 * Response schema for training job completion.
 */
export const TrainingJobCompleteResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job completion.
 */
export const TrainingJobCompleteErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job completion contract definition.
 */
export const TrainingJobCompleteContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_COMPLETE_CONTRACT_NAME,
  request: TrainingJobCompleteRequestV1,
  response: TrainingJobCompleteResponseV1,
  errors: TrainingJobCompleteErrorV1,
} as const satisfies VersionedContractV1;

// POST /jobs/:id/pause

/**
 * Contract name for training job pause endpoint.
 */
export const TRAINING_JOB_PAUSE_CONTRACT_NAME = "training-job-pause";

/**
 * Request schema for training job pause (path params only).
 */
export const TrainingJobPauseRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1 }) }, {});

/**
 * Response schema for training job pause.
 */
export const TrainingJobPauseResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job pause.
 */
export const TrainingJobPauseErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job pause contract definition.
 */
export const TrainingJobPauseContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_PAUSE_CONTRACT_NAME,
  request: TrainingJobPauseRequestV1,
  response: TrainingJobPauseResponseV1,
  errors: TrainingJobPauseErrorV1,
} as const satisfies VersionedContractV1;

// POST /jobs/:id/resume

/**
 * Contract name for training job resume endpoint.
 */
export const TRAINING_JOB_RESUME_CONTRACT_NAME = "training-job-resume";

/**
 * Request schema for training job resume (path params only).
 */
export const TrainingJobResumeRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1 }) }, {});

/**
 * Response schema for training job resume.
 */
export const TrainingJobResumeResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job resume.
 */
export const TrainingJobResumeErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job resume contract definition.
 */
export const TrainingJobResumeContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_RESUME_CONTRACT_NAME,
  request: TrainingJobResumeRequestV1,
  response: TrainingJobResumeResponseV1,
  errors: TrainingJobResumeErrorV1,
} as const satisfies VersionedContractV1;

// POST /jobs/:id/cancel

/**
 * Contract name for training job cancel endpoint.
 */
export const TRAINING_JOB_CANCEL_CONTRACT_NAME = "training-job-cancel";

/**
 * Request schema for training job cancel (path params only).
 */
export const TrainingJobCancelRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object({ id: Type.String({ minLength: 1 }) }, {});

/**
 * Response schema for training job cancel.
 */
export const TrainingJobCancelResponseV1: typeof TrainingJobResponseSchema =
  TrainingJobResponseSchema;

/**
 * Error schema for training job cancel.
 */
export const TrainingJobCancelErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training job cancel contract definition.
 */
export const TrainingJobCancelContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_JOB_CANCEL_CONTRACT_NAME,
  request: TrainingJobCancelRequestV1,
  response: TrainingJobCancelResponseV1,
  errors: TrainingJobCancelErrorV1,
} as const satisfies VersionedContractV1;

// GET /jobs/:id/artifacts

/**
 * Contract name for training artifacts list endpoint.
 */
export const TRAINING_ARTIFACTS_LIST_CONTRACT_NAME = "training-artifacts-list";

/**
 * Request schema for training artifacts list (path params).
 */
export const TrainingArtifactsListRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = Type.Object({ id: Type.String({ minLength: 1 }) }, {});

/**
 * Response schema for training artifacts list.
 */
export const TrainingArtifactsListResponseV1: typeof TrainingArtifactsResponseSchema =
  TrainingArtifactsResponseSchema;

/**
 * Error schema for training artifacts list.
 */
export const TrainingArtifactsListErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training artifacts list contract definition.
 */
export const TrainingArtifactsListContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_ARTIFACTS_LIST_CONTRACT_NAME,
  request: TrainingArtifactsListRequestV1,
  response: TrainingArtifactsListResponseV1,
  errors: TrainingArtifactsListErrorV1,
} as const satisfies VersionedContractV1;

// POST /jobs/:id/artifacts

/**
 * Contract name for training artifact upload endpoint.
 */
export const TRAINING_ARTIFACT_UPLOAD_CONTRACT_NAME = "training-artifact-upload";

/**
 * Request schema for training artifact upload (path params + multipart body).
 */
export const TrainingArtifactUploadRequestV1: Type.TObject<
  { readonly id: Type.TString },
  "id",
  never
> = Type.Object({ id: Type.String({ minLength: 1 }) }, {});

/**
 * Response schema for training artifact upload.
 */
export const TrainingArtifactUploadResponseV1: typeof TrainingArtifactResponseSchema =
  TrainingArtifactResponseSchema;

/**
 * Error schema for training artifact upload.
 */
export const TrainingArtifactUploadErrorV1: typeof TrainingErrorsV1 = TrainingErrorsV1;

/**
 * Complete training artifact upload contract definition.
 */
export const TrainingArtifactUploadContractV1 = {
  version: TRAINING_JOBS_CONTRACT_VERSION,
  name: TRAINING_ARTIFACT_UPLOAD_CONTRACT_NAME,
  request: TrainingArtifactUploadRequestV1,
  response: TrainingArtifactUploadResponseV1,
  errors: TrainingArtifactUploadErrorV1,
} as const satisfies VersionedContractV1;
