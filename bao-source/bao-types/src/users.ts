/**
 * Shared user directory domain types.
 *
 * These types are derived from TypeBox schemas in `@baohaus/bao-schemas/user-directory.schemas.ts`
 * to keep contracts drift-resistant across server routes, Eden clients, and UI hydration.
 *
 * @shared/types/users
 */

import type { UserSummary } from "@baohaus/bao-schemas/user-directory.schemas";

export type {
  UserCreatePayload,
  UserDeleteResponse,
  UserDetailResponse,
  UserIdParams,
  UserListItem,
  UserRoleOption,
  UserRolesResponse,
  UserSummary,
  UserSummaryResponse,
  UserSummaryRole,
  UserSummarySessions,
  UserSummarySsoProviders,
  UserSummaryTotals,
  UsersCountResponse,
  UsersListResponse,
  UserUpdatePayload,
} from "@baohaus/bao-schemas/user-directory.schemas";

/**
 * Default empty user summary payload for UI fallbacks.
 */
export const DEFAULT_USER_SUMMARY: UserSummary = {
  totals: {
    total: 0,
    active: 0,
    inactive: 0,
    unknown: 0,
    verified: 0,
    unverified: 0,
  },
  sessions: {
    active: 0,
  },
  ssoProviders: {
    total: 0,
    domains: 0,
  },
  roles: [],
  lastCreatedAt: null,
  updatedAt: "",
};
