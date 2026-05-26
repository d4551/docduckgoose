/**
 * Reports Contracts v1
 *
 * Defines contract-first schemas for report generation and management endpoints.
 *
 * @shared/contracts/versions/v1/reports
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  CreateReportJobResponseSchema,
  ReportIdParamsSchema,
  ReportJobIdParamsSchema,
  ReportJobResponseSchema,
  ReportJobsListQuerySchema,
  ReportJobsListResponseSchema,
  ReportResponseSchema,
  ReportSpecSchema,
  ReportsListQuerySchema,
  ReportsListResponseSchema,
} from "../../../schemas/reports.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for create report job endpoint.
 */
export const REPORTS_JOBS_CREATE_CONTRACT_NAME = "reports-jobs-create";

/**
 * Contract name for list report jobs endpoint.
 */
export const REPORTS_JOBS_LIST_CONTRACT_NAME = "reports-jobs-list";

/**
 * Contract name for get report job endpoint.
 */
export const REPORTS_JOBS_DETAIL_CONTRACT_NAME = "reports-jobs-detail";

/**
 * Contract name for list reports endpoint.
 */
export const REPORTS_LIST_CONTRACT_NAME = "reports-list";

/**
 * Contract name for report detail endpoint.
 */
export const REPORTS_DETAIL_CONTRACT_NAME = "reports-detail";

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for reports contract failures.
 */
export const ReportsErrorV1 = Type.Object(
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
 * Create report job contract definition (v1).
 */
export const ReportsJobsCreateContractV1 = {
  name: REPORTS_JOBS_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ReportSpecSchema,
  response: CreateReportJobResponseSchema,
  errors: ReportsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * List report jobs contract definition (v1).
 */
export const ReportsJobsListContractV1 = {
  name: REPORTS_JOBS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ReportJobsListQuerySchema,
  response: ReportJobsListResponseSchema,
  errors: ReportsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Report job detail contract definition (v1).
 */
export const ReportsJobsDetailContractV1 = {
  name: REPORTS_JOBS_DETAIL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ReportJobIdParamsSchema,
  response: ReportJobResponseSchema,
  errors: ReportsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * List reports contract definition (v1).
 */
export const ReportsListContractV1 = {
  name: REPORTS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ReportsListQuerySchema,
  response: ReportsListResponseSchema,
  errors: ReportsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Report detail contract definition (v1).
 */
export const ReportsDetailContractV1 = {
  name: REPORTS_DETAIL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: ReportIdParamsSchema,
  response: ReportResponseSchema,
  errors: ReportsErrorV1,
} as const satisfies VersionedContractV1;
