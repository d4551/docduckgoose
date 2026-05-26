/**
 * Users (Admin Directory) Contracts v1
 *
 * Defines versioned contracts for admin user directory endpoints.
 *
 * @shared/contracts/versions/v1/users
 */

import {
  UserCreatePayloadSchema,
  UserDetailResponseSchema,
  UserIdParamsSchema,
  UserRolesResponseSchema,
  UserSummaryResponseSchema,
  UsersCountResponseSchema,
  UsersListQuerySchema,
  UsersListResponseSchema,
  UserUpdatePayloadSchema,
} from "@baohaus/bao-schemas/user-directory.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version for admin user directory endpoints. */
export const CONTRACT_VERSION = "1.0.0";

/** Contract name for paginated user listing. */
export const USERS_LIST_CONTRACT_NAME = "users-list";
/** Contract name for user detail retrieval. */
export const USERS_DETAIL_CONTRACT_NAME = "users-detail";
/** Contract name for user account creation. */
export const USERS_CREATE_CONTRACT_NAME = "users-create";
/** Contract name for user profile updates. */
export const USERS_UPDATE_CONTRACT_NAME = "users-update";
/** Contract name for user account deletion. */
export const USERS_DELETE_CONTRACT_NAME = "users-delete";
/** Contract name for user count aggregation. */
export const USERS_COUNT_CONTRACT_NAME = "users-count";
/** Contract name for available roles listing. */
export const USERS_ROLES_CONTRACT_NAME = "users-roles";
/** Contract name for user directory summary. */
export const USERS_SUMMARY_CONTRACT_NAME = "users-summary";

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Error response schema for admin user directory contracts. */
export const UsersErrorV1 = Type.Object(
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

const EmptyRequestV1 = Type.Object({}, { additionalProperties: false });

/** V1 contract for paginated user listing. */
export const UsersListContractV1 = {
  name: USERS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsersListQuerySchema,
  response: UsersListResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for retrieving a single user by ID. */
export const UsersDetailContractV1 = {
  name: USERS_DETAIL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UserIdParamsSchema,
  response: UserDetailResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for creating a new user account. */
export const UsersCreateContractV1 = {
  name: USERS_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UserCreatePayloadSchema,
  response: UserDetailResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for updating an existing user profile. */
export const UsersUpdateContractV1 = {
  name: USERS_UPDATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: Type.Intersect([UserIdParamsSchema, UserUpdatePayloadSchema], {
    additionalProperties: false,
  }),
  response: UserDetailResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for deleting a user account. */
export const UsersDeleteContractV1 = {
  name: USERS_DELETE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UserIdParamsSchema,
  response: UserDetailResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for counting users matching filter criteria. */
export const UsersCountContractV1 = {
  name: USERS_COUNT_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsersListQuerySchema,
  response: UsersCountResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for listing available user roles. */
export const UsersRolesContractV1 = {
  name: USERS_ROLES_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: EmptyRequestV1,
  response: UserRolesResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for fetching user directory summary statistics. */
export const UsersSummaryContractV1 = {
  name: USERS_SUMMARY_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: EmptyRequestV1,
  response: UserSummaryResponseSchema,
  errors: UsersErrorV1,
} as const satisfies VersionedContractV1;
