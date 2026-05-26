/**
 * Library Registry Contracts v1
 *
 * Defines versioned contracts for library registry endpoints.
 *
 * @shared/contracts/versions/v1/library-registry
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DEFAULT_TIMEOUTS } from "../../../constants/timeouts";
import { BunBuddyKindSchema } from "../../../schemas/bunbuddy.schemas";
import {
  LibraryCategorySchema,
  LibraryCoverageResponseSchema,
  LibraryDetailResponseSchema,
  LibraryOverviewResponseSchema,
  LibraryRegistryRefreshRequestSchema,
  LibraryRegistryResponseSchema,
  LibrarySourceSchema,
  LibraryStatusSchema,
} from "../../../schemas/library-registry.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const LIST_CONTRACT_NAME = "library-registry-list";
/** Contract name for library detail retrieval. */
export const DETAIL_CONTRACT_NAME = "library-registry-detail";
/** Contract name for library coverage report. */
export const COVERAGE_CONTRACT_NAME = "library-registry-coverage";
/** Contract name for library registry overview. */
export const OVERVIEW_CONTRACT_NAME = "library-registry-overview";
/** Contract name for refreshing library registry data. */
export const REFRESH_CONTRACT_NAME = "library-registry-refresh";
/** Contract name for refreshing the library overview. */
export const OVERVIEW_REFRESH_CONTRACT_NAME = "library-registry-overview-refresh";

/**
 * Shared timeout schema for registry requests.
 */
const LibraryTimeoutSchema: Type.TOptional<Type.TInteger> = Type.Optional(
  Type.Integer({
    minimum: DEFAULT_TIMEOUTS.libraryRegistrySnapshotMinMs,
    maximum: DEFAULT_TIMEOUTS.libraryRegistrySnapshotMaxMs,
  }),
);

/**
 * Request schema for library registry listing.
 */
export const LibraryRegistryListRequestV1 = Type.Object(
  {
    name: Type.Optional(Type.String()),
    source: Type.Optional(LibrarySourceSchema),
    runtime: Type.Optional(Type.String()),
    status: Type.Optional(LibraryStatusSchema),
    bunbuddyKind: Type.Optional(BunBuddyKindSchema),
    category: Type.Optional(LibraryCategorySchema),
    timeoutMs: LibraryTimeoutSchema,
  },
  { additionalProperties: false },
);

/**
 * Response schema for library registry listing.
 */
export const LibraryRegistryListResponseV1: typeof LibraryRegistryResponseSchema =
  LibraryRegistryResponseSchema;

/**
 * Request schema for library registry detail.
 */
export const LibraryRegistryDetailRequestV1: Type.TObject<
  { readonly name: Type.TString; readonly timeoutMs: Type.TOptional<Type.TInteger> },
  "name",
  "timeoutMs"
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    timeoutMs: LibraryTimeoutSchema,
  },
  { additionalProperties: false },
);

/**
 * Response schema for library registry detail.
 */
export const LibraryRegistryDetailResponseV1: typeof LibraryDetailResponseSchema =
  LibraryDetailResponseSchema;

/**
 * Request schema for library coverage snapshot.
 */
export const LibraryRegistryCoverageRequestV1: Type.TObject<
  { readonly timeoutMs: Type.TOptional<Type.TInteger> },
  never,
  "timeoutMs"
> = Type.Object(
  {
    timeoutMs: LibraryTimeoutSchema,
  },
  { additionalProperties: false },
);

/**
 * Response schema for library coverage snapshot.
 */
export const LibraryRegistryCoverageResponseV1: typeof LibraryCoverageResponseSchema =
  LibraryCoverageResponseSchema;

/**
 * Request schema for library overview snapshot.
 */
export const LibraryRegistryOverviewRequestV1: Type.TObject<
  { readonly timeoutMs: Type.TOptional<Type.TInteger> },
  never,
  "timeoutMs"
> = Type.Object(
  {
    timeoutMs: LibraryTimeoutSchema,
  },
  { additionalProperties: false },
);

/**
 * Response schema for library overview snapshot.
 */
export const LibraryRegistryOverviewResponseV1: typeof LibraryOverviewResponseSchema =
  LibraryOverviewResponseSchema;

/**
 * Request schema for library registry refresh.
 */
export const LibraryRegistryRefreshRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ...LibraryRegistryRefreshRequestSchema.properties,
    timeoutMs: LibraryTimeoutSchema,
  },
  { additionalProperties: false },
);

/**
 * Response schema for library registry refresh.
 */
export const LibraryRegistryRefreshResponseV1: typeof LibraryRegistryResponseSchema =
  LibraryRegistryResponseSchema;

/**
 * Request schema for library overview refresh.
 */
export const LibraryRegistryOverviewRefreshRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ...LibraryRegistryRefreshRequestSchema.properties,
    timeoutMs: LibraryTimeoutSchema,
  },
  { additionalProperties: false },
);

/**
 * Response schema for library overview refresh.
 */
export const LibraryRegistryOverviewRefreshResponseV1: typeof LibraryOverviewResponseSchema =
  LibraryOverviewResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for library registry list endpoint.
 */
export const LibraryRegistryListErrorV1 = Type.Object(
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
 * Error schema for library registry detail endpoint.
 */
export const LibraryRegistryDetailErrorV1 = Type.Object(
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
 * Error schema for library registry coverage endpoint.
 */
export const LibraryRegistryCoverageErrorV1 = Type.Object(
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
 * Error schema for library registry overview endpoint.
 */
export const LibraryRegistryOverviewErrorV1 = Type.Object(
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
 * Error schema for library registry refresh endpoint.
 */
export const LibraryRegistryRefreshErrorV1 = Type.Object(
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
 * Error schema for library registry overview refresh endpoint.
 */
export const LibraryRegistryOverviewRefreshErrorV1 = Type.Object(
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
 * Library registry list contract definition (v1).
 */
export const LibraryRegistryListContractV1 = {
  name: LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: LibraryRegistryListRequestV1,
  response: LibraryRegistryListResponseV1,
  errors: LibraryRegistryListErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Library registry detail contract definition (v1).
 */
export const LibraryRegistryDetailContractV1 = {
  name: DETAIL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: LibraryRegistryDetailRequestV1,
  response: LibraryRegistryDetailResponseV1,
  errors: LibraryRegistryDetailErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Library registry coverage contract definition (v1).
 */
export const LibraryRegistryCoverageContractV1 = {
  name: COVERAGE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: LibraryRegistryCoverageRequestV1,
  response: LibraryRegistryCoverageResponseV1,
  errors: LibraryRegistryCoverageErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Library registry overview contract definition (v1).
 */
export const LibraryRegistryOverviewContractV1 = {
  name: OVERVIEW_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: LibraryRegistryOverviewRequestV1,
  response: LibraryRegistryOverviewResponseV1,
  errors: LibraryRegistryOverviewErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Library registry refresh contract definition (v1).
 */
export const LibraryRegistryRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: LibraryRegistryRefreshRequestV1,
  response: LibraryRegistryRefreshResponseV1,
  errors: LibraryRegistryRefreshErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Library registry overview refresh contract definition (v1).
 */
export const LibraryRegistryOverviewRefreshContractV1 = {
  name: OVERVIEW_REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: LibraryRegistryOverviewRefreshRequestV1,
  response: LibraryRegistryOverviewRefreshResponseV1,
  errors: LibraryRegistryOverviewRefreshErrorV1,
} as const satisfies VersionedContractV1;
