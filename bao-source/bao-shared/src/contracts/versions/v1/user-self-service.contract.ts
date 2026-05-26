/**
 * User self-service contracts v1
 *
 * Defines versioned contracts for authenticated user profile + preferences endpoints.
 *
 * @shared/contracts/versions/v1/user-self-service
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { UserIdParamsSchema } from "../../../schemas/user-directory.schemas";
import {
  UserPreferenceActionResponseSchema,
  UserPreferenceDeleteParamsSchema,
  UserPreferencesQuerySchema,
  UserPreferencesResponseSchema,
  UserPreferenceUpsertPayloadSchema,
  UserProfileResponseSchema,
  UserProfileUpdatePayloadSchema,
} from "../../../schemas/user-self-service.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version for user self-service endpoints. */
export const CONTRACT_VERSION = "1.0.0";

/** Contract name for user profile updates. */
export const USER_PROFILE_UPDATE_CONTRACT_NAME = "user-profile-update";
/** Contract name for retrieving user preferences. */
export const USER_PREFERENCES_GET_CONTRACT_NAME = "user-preferences-get";
/** Contract name for upserting a user preference. */
export const USER_PREFERENCE_UPSERT_CONTRACT_NAME = "user-preferences-upsert";
/** Contract name for deleting a user preference. */
export const USER_PREFERENCE_DELETE_CONTRACT_NAME = "user-preferences-delete";

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/** Error response schema for user self-service contracts. */
export const UserSelfServiceErrorV1 = Type.Object(
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

/** V1 contract for updating the authenticated user's profile. */
export const UserProfileUpdateContractV1 = {
  name: USER_PROFILE_UPDATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: Type.Intersect([UserIdParamsSchema, UserProfileUpdatePayloadSchema], {
    additionalProperties: false,
  }),
  response: UserProfileResponseSchema,
  errors: UserSelfServiceErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for retrieving user preferences. */
export const UserPreferencesGetContractV1 = {
  name: USER_PREFERENCES_GET_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: Type.Intersect([UserIdParamsSchema, UserPreferencesQuerySchema], {
    additionalProperties: false,
  }),
  response: UserPreferencesResponseSchema,
  errors: UserSelfServiceErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for creating or updating a user preference. */
export const UserPreferenceUpsertContractV1 = {
  name: USER_PREFERENCE_UPSERT_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: Type.Intersect([UserIdParamsSchema, UserPreferenceUpsertPayloadSchema], {
    additionalProperties: false,
  }),
  response: UserPreferenceActionResponseSchema,
  errors: UserSelfServiceErrorV1,
} as const satisfies VersionedContractV1;

/** V1 contract for deleting a user preference. */
export const UserPreferenceDeleteContractV1 = {
  name: USER_PREFERENCE_DELETE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: Type.Intersect([UserPreferenceDeleteParamsSchema, UserPreferencesQuerySchema], {
    additionalProperties: false,
  }),
  response: UserPreferenceActionResponseSchema,
  errors: UserSelfServiceErrorV1,
} as const satisfies VersionedContractV1;
