/**
 * Shared Elysia/API error codes.
 *
 * Centralizes the canonical list of error codes emitted by the server so the
 * htmx/HTML client and contract tests can reference a single source of truth.
 *
 * Note: this mirrors the server-side `apps/server/elysia/constants/error-codes.ts`
 * module and is re-exported from there to preserve existing import paths.
 *
 * @shared/errors/error-codes
 */

/**
 * Known error codes used across API responses and internal services.
 */
export const ErrorCode = {
  AuthRequired: "AUTH_REQUIRED",
  InsufficientRole: "INSUFFICIENT_ROLE",
  InvalidPermissionRequirement: "INVALID_PERMISSION_REQUIREMENT",
  InsufficientPermissions: "INSUFFICIENT_PERMISSIONS",
  Forbidden: "FORBIDDEN",
  ValidationError: "VALIDATION_ERROR",
  Conflict: "CONFLICT",
  DbConnectionError: "DB_CONNECTION_ERROR",
  ResourceNotFound: "RESOURCE_NOT_FOUND",
  DuplicateEntry: "DUPLICATE_ENTRY",
  CaseNotFound: "CASE_NOT_FOUND",
  DuplicateAccession: "DUPLICATE_ACCESSION",
  ImageNotFound: "IMAGE_NOT_FOUND",
  RunNotFound: "RUN_NOT_FOUND",
  QuotaExceeded: "QUOTA_EXCEEDED",
  FetchUnavailable: "FETCH_UNAVAILABLE",
  FetchInvalidResponse: "FETCH_INVALID_RESPONSE",
  HttpError: "HTTP_ERROR",
  AiGenerationFailed: "AI_GENERATION_FAILED",
  AiProviderError: "AI_PROVIDER_ERROR",
  AiRateLimited: "AI_RATE_LIMITED",
  AiInvalidOutput: "AI_INVALID_OUTPUT",
  /** AI refused or content was filtered (safety policy). */
  AiContentFilter: "AI_CONTENT_FILTER",
  /** AI output was incomplete (e.g., truncated, invalid JSON). */
  AiOutputIncomplete: "AI_OUTPUT_INCOMPLETE",
  StorageNotReady: "STORAGE_NOT_READY",
  ServiceUnavailable: "SERVICE_UNAVAILABLE",
  HealthSnapshotUnavailable: "HEALTH_SNAPSHOT_UNAVAILABLE",
  InternalError: "INTERNAL_ERROR",
  BadRequest: "BAD_REQUEST",
  PayloadTooLarge: "PAYLOAD_TOO_LARGE",
  Timeout: "TIMEOUT",
  PipelineNotFound: "PIPELINE_NOT_FOUND",
  PipelineExecutionFailed: "PIPELINE_EXECUTION_FAILED",
  PipelineStageFailed: "PIPELINE_STAGE_FAILED",
  PipelineTimeout: "PIPELINE_TIMEOUT",
  ContractMissing: "CONTRACT_MISSING",

  // Orchestration / Dataset Sync
  DatasetNotFound: "DATASET_NOT_FOUND",
  DownloadStartFailed: "DOWNLOAD_START_FAILED",
  JobNotFound: "JOB_NOT_FOUND",
  ListFailed: "LIST_FAILED",
  StatusFailed: "STATUS_FAILED",
  SyncStartFailed: "SYNC_START_FAILED",
  WorkflowCancelFailed: "WORKFLOW_CANCEL_FAILED",
  WorkflowCreateFailed: "WORKFLOW_CREATE_FAILED",
  WorkflowNotFound: "WORKFLOW_NOT_FOUND",
  WorkflowPauseFailed: "WORKFLOW_PAUSE_FAILED",

  // SplatBao Anchors
  SplatbaoAnchorCaptureFailed: "SPLATBAO_ANCHOR_CAPTURE_FAILED",
  SplatbaoAnchorCreateFailed: "SPLATBAO_ANCHOR_CREATE_FAILED",
  SplatbaoAnchorDeleteFailed: "SPLATBAO_ANCHOR_DELETE_FAILED",
  SplatbaoAnchorGetFailed: "SPLATBAO_ANCHOR_GET_FAILED",
  SplatbaoAnchorLinkAlignmentFailed: "SPLATBAO_ANCHOR_LINK_ALIGNMENT_FAILED",
  SplatbaoAnchorLinkDetectionFailed: "SPLATBAO_ANCHOR_LINK_DETECTION_FAILED",
  SplatbaoAnchorLinkGaussianFailed: "SPLATBAO_ANCHOR_LINK_GAUSSIAN_FAILED",
  SplatbaoAnchorLinkParentFailed: "SPLATBAO_ANCHOR_LINK_PARENT_FAILED",
  SplatbaoAnchorsChildrenFailed: "SPLATBAO_ANCHORS_CHILDREN_FAILED",
  SplatbaoAnchorsListFailed: "SPLATBAO_ANCHORS_LIST_FAILED",
  SplatbaoAnchorUnlinkParentFailed: "SPLATBAO_ANCHOR_UNLINK_PARENT_FAILED",
  SplatbaoAnchorUpdateFailed: "SPLATBAO_ANCHOR_UPDATE_FAILED",
  SplatbaoAnnotationsEmbedFailed: "SPLATBAO_ANNOTATIONS_EMBED_FAILED",
  SplatbaoAnnotationsExtractFailed: "SPLATBAO_ANNOTATIONS_EXTRACT_FAILED",
  SplatbaoMeasureFailed: "SPLATBAO_MEASURE_FAILED",
  SplatbaoMeasurementsListFailed: "SPLATBAO_MEASUREMENTS_LIST_FAILED",
  SplatbaoTf2FramesFailed: "SPLATBAO_TF2_FRAMES_FAILED",
  SplatbaoTf2TransformFailed: "SPLATBAO_TF2_TRANSFORM_FAILED",

  // SplatBao Models
  SplatbaoModelAlignFailed: "SPLATBAO_MODEL_ALIGN_FAILED",
  SplatbaoModelAlignFetchFailed: "SPLATBAO_MODEL_ALIGN_FETCH_FAILED",
  SplatbaoModelCreateFailed: "SPLATBAO_MODEL_CREATE_FAILED",
  SplatbaoModelDeleteFailed: "SPLATBAO_MODEL_DELETE_FAILED",
  SplatbaoModelGetFailed: "SPLATBAO_MODEL_GET_FAILED",
  SplatbaoModelListFailed: "SPLATBAO_MODEL_LIST_FAILED",
  SplatbaoModelMatchFailed: "SPLATBAO_MODEL_MATCH_FAILED",

  // SplatBao Steamer (perception)
  SplatbaoSteamerDepthFailed: "SPLATBAO_STEAMER_DEPTH_FAILED",
  SplatbaoSteamerDetectFailed: "SPLATBAO_STEAMER_DETECT_FAILED",
  SplatbaoSteamerZeroShotFailed: "SPLATBAO_STEAMER_ZERO_SHOT_FAILED",

  // SplatBao Training
  SplatbaoDeployFailed: "SPLATBAO_DEPLOY_FAILED",
  SplatbaoDeploymentsListFailed: "SPLATBAO_DEPLOYMENTS_LIST_FAILED",
  SplatbaoOnnxExportFailed: "SPLATBAO_ONNX_EXPORT_FAILED",
  SplatbaoTrainingJobsListFailed: "SPLATBAO_TRAINING_JOBS_LIST_FAILED",
  SplatbaoTrainingStartFailed: "SPLATBAO_TRAINING_START_FAILED",

  // Security
  CsrfViolation: "CSRF_VIOLATION",
} as const;
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Return all known error codes as a stable array.
 *
 * @returns Array of known error codes.
 */
export function allErrorCodes(): readonly ErrorCode[] {
  return Object.values(ErrorCode) as readonly ErrorCode[];
}

/**
 * Check whether a value is a known {@link ErrorCode}.
 *
 * @param value - Candidate value.
 * @returns True when the value is one of the known error codes.
 */
export function isErrorCode(value: string | null | undefined): value is ErrorCode {
  if (!value) {
    return false;
  }
  return (Object.values(ErrorCode) as string[]).includes(value);
}
