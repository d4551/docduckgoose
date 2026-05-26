/**
 * Bao runtime v1 contract definitions.
 *
 * Contract-first boundary for the Kubernetes-native runtime status endpoints:
 * - GET  `${API_PATHS.baoRuntimeStatus}`
 * - POST `${API_PATHS.baoRuntimeRefresh}`
 * - POST `${API_PATHS.baoRuntimeEnsure}`
 *
 * @shared/contracts/versions/v1/bao-runtime
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import {
  BaoRuntimeEnsureRequestSchema,
  BaoRuntimeEnsureResponseSchema,
  BaoRuntimeRefreshRequestSchema,
  BaoRuntimeRefreshResponseSchema,
  BaoRuntimeStatusResponseSchema,
} from "@baohaus/bao-schemas/bao-runtime.schemas";
import { RefreshBypassCacheQuerySchema } from "../../../schemas/query-params.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version for Bao runtime endpoints. */
export const CONTRACT_VERSION = "1.0.0";

/** Contract name for the runtime status endpoint. */
export const STATUS_CONTRACT_NAME = "bao-runtime-status";

/** Contract name for the runtime refresh endpoint. */
export const REFRESH_CONTRACT_NAME = "bao-runtime-refresh";

/** Contract name for the runtime ensure endpoint. */
export const ENSURE_CONTRACT_NAME = "bao-runtime-ensure";

// GET /api/v1/bao-runtime/status

/** Request schema (query-only, no body). */
export const BaoRuntimeStatusRequestV1: typeof RefreshBypassCacheQuerySchema =
  RefreshBypassCacheQuerySchema;

/** Response schema. */
export const BaoRuntimeStatusResponseV1: typeof BaoRuntimeStatusResponseSchema =
  BaoRuntimeStatusResponseSchema;

/** Error schema. */
export const BaoRuntimeStatusErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract definition for the status endpoint. */
export const BaoRuntimeStatusContractV1 = {
  name: STATUS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: API_PATHS.baoRuntimeStatus,
  request: BaoRuntimeStatusRequestV1,
  response: BaoRuntimeStatusResponseV1,
  errors: BaoRuntimeStatusErrorV1,
} as const satisfies VersionedContractV1;

// POST /api/v1/bao-runtime/refresh

/** Request schema. */
export const BaoRuntimeRefreshRequestV1: typeof BaoRuntimeRefreshRequestSchema =
  BaoRuntimeRefreshRequestSchema;

/** Response schema. */
export const BaoRuntimeRefreshResponseV1: typeof BaoRuntimeRefreshResponseSchema =
  BaoRuntimeRefreshResponseSchema;

/** Error schema. */
export const BaoRuntimeRefreshErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract definition for the refresh endpoint. */
export const BaoRuntimeRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "POST" as const,
  path: API_PATHS.baoRuntimeRefresh,
  request: BaoRuntimeRefreshRequestV1,
  response: BaoRuntimeRefreshResponseV1,
  errors: BaoRuntimeRefreshErrorV1,
} as const satisfies VersionedContractV1;

// POST /api/v1/bao-runtime/ensure

/** Request schema. */
export const BaoRuntimeEnsureRequestV1: typeof BaoRuntimeEnsureRequestSchema =
  BaoRuntimeEnsureRequestSchema;

/** Response schema. */
export const BaoRuntimeEnsureResponseV1: typeof BaoRuntimeEnsureResponseSchema =
  BaoRuntimeEnsureResponseSchema;

/** Error schema. */
export const BaoRuntimeEnsureErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract definition for the ensure endpoint. */
export const BaoRuntimeEnsureContractV1 = {
  name: ENSURE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "POST" as const,
  path: API_PATHS.baoRuntimeEnsure,
  request: BaoRuntimeEnsureRequestV1,
  response: BaoRuntimeEnsureResponseV1,
  errors: BaoRuntimeEnsureErrorV1,
} as const satisfies VersionedContractV1;
