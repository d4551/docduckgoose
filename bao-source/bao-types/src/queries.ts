/**
 * Shared API query parameter types.
 *
 * Centralizes list/search query shapes so client composables and server
 * endpoints stay aligned without repeating literal objects.
 *
 * @shared/types/queries.ts
 */

import type { TrainingJobsQuery } from "./training.ts";

export type CaseStatus = "pending" | "in-progress" | "completed" | "cancelled" | "archived";

/**
 * Supported case workflow states for list filtering.
 */
export type CaseWorkflowState =
  | "received"
  | "accessioning"
  | "grossing"
  | "processing"
  | "embedding"
  | "sectioning"
  | "staining"
  | "qc"
  | "review"
  | "final";

/**
 * Supported sort keys for case lists.
 */
export type CaseSortBy =
  | "createdAt"
  | "updatedAt"
  | "accessionNumber"
  | "status"
  | "priority"
  | "patientName"
  | "patientLastName"
  | "patientId";

/**
 * Sorting order for case list queries.
 */
export type CaseSortOrder = "asc" | "desc";

/**
 * Supported case priority labels for list filtering.
 */
export type CasePriority = "routine" | "priority" | "urgent" | "stat";

/**
 * Query parameters accepted by the case list endpoint.
 */
export interface CaseListQuery {
  page?: number;
  pageSize?: number;
  sortBy?: CaseSortBy;
  sortOrder?: CaseSortOrder;
  search?: string;
  status?: CaseStatus;
  priority?: CasePriority;
  workflowState?: CaseWorkflowState;
  fromDate?: string;
  toDate?: string;
  assignedTo?: string;
}

/**
 * Query parameters accepted by the users list endpoint.
 */
export interface UsersListQuery {
  page?: number | undefined;
  pageSize?: number | undefined;
  search?: string | undefined;
  role?: string | undefined;
  active?: boolean | undefined;
}

/**
 * Query parameters accepted by the notifications list endpoint.
 */
export interface NotificationsListQuery {
  limit?: number;
}

/**
 * Query parameters accepted by the FHIR patient search endpoint.
 */
export interface FhirPatientSearchQuery {
  identifier?: string;
  name?: string;
  birthdate?: string;
  _count?: string;
}

/**
 * Query parameters accepted by the training jobs list endpoint.
 */
export type TrainingJobsListQuery = TrainingJobsQuery;

/**
 * Query parameters accepted by the ONNX models list endpoint.
 */
export interface OnnxModelsQuery {
  includeMetadata?: boolean;
  includeTags?: boolean;
  search?: string;
  tags?: string[];
  type?: string;
  provider?: string;
  category?: string;
}

/**
 * Query parameters accepted by Hugging Face recommended datasets endpoint.
 */
export interface HuggingFaceRecommendedDatasetsQuery {
  pageSize?: number;
}

/**
 * Query parameters accepted by the calibration snapshot endpoint.
 */
export interface CalibrationSnapshotQuery {
  deviceId?: string;
  limit?: number;
}

/**
 * Query parameters accepted by the registry devices list endpoint.
 */
export interface RegistryDevicesQuery {
  type?: string;
  status?: string;
  connected?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Base query parameters accepted by commerce list endpoints.
 */
export interface CommerceListQueryBase {
  page?: number;
  pageSize?: number;
  search?: string;
}

/**
 * Query parameters accepted by commerce seller list endpoint.
 */
export interface CommerceSellerListQuery extends CommerceListQueryBase {
  status?: "active" | "inactive";
}

/**
 * Query parameters accepted by commerce shop list endpoint.
 */
export interface CommerceShopListQuery extends CommerceListQueryBase {
  status?: "active" | "inactive";
  sellerId?: string;
}

/**
 * Query parameters accepted by commerce product list endpoint.
 */
export interface CommerceProductListQuery extends CommerceListQueryBase {
  sellerId?: string;
  shopId?: string;
  status?: "draft" | "active" | "archived";
}
