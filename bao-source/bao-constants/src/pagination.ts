/**
 * Centralized pagination defaults.
 *
 * Single source of truth for list pagination parameters to avoid
 * scattering magic numbers across services.
 *
 * @shared/constants/pagination
 */

/**
 * Default pagination values for list endpoints.
 */
export const PAGINATION: {
  readonly defaultPage: 1;
  readonly defaultPageSize: 20;
  readonly maxPageSize: 100;
  readonly maxPage: 10000;
} = {
  /** Default page number (1-based). */
  defaultPage: 1,
  /** Default number of items per page. */
  defaultPageSize: 20,
  /** Maximum allowed page size. */
  maxPageSize: 100,
  /** Maximum allowed page number (upper bound for skip calculation). */
  maxPage: 10_000,
} as const;

/**
 * Upper bounds for internal (non-paginated) findMany queries to prevent
 * unbounded result sets from consuming excessive memory.
 */
export const QUERY_LIMITS: {
  readonly pipelineBatchImages: 500;
  readonly aiInsightsRecentAnalyses: 500;
  readonly adminTrainingJobs: 200;
  readonly activeWorkflows: 100;
  readonly adminAlertRules: 200;
} = {
  /** Maximum images fetched per pipeline run (batch processing). */
  pipelineBatchImages: 500,
  /** Maximum pathology analyses sampled for AI insight aggregation. */
  aiInsightsRecentAnalyses: 500,
  /** Maximum training jobs returned by admin listing endpoints. */
  adminTrainingJobs: 200,
  /** Maximum active training workflows returned. */
  activeWorkflows: 100,
  /** Maximum alert rules returned by admin listing endpoints. */
  adminAlertRules: 200,
} as const;
