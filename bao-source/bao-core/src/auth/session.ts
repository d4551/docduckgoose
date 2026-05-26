/**
 * Shared authentication session types.
 *
 * Provides a single source of truth for session user and session payloads
 * across UI, BFF, and services.
 *
 * @packageDocumentation
 */

import type { UserRoleLabel } from "@baohaus/bao-schemas/user.schemas";

/**
 * Organization membership attached to the canonical session user.
 */
export interface SessionOrganization {
  /** Registry organization identifier. */
  id: string;
  /** Human-readable organization name when supplied by the Registry IdP. */
  name?: string | undefined;
  /** Stable organization slug when supplied by the Registry IdP. */
  slug?: string | undefined;
  /** Membership role inside the organization. */
  role?: string | undefined;
}

/**
 * Active session user information.
 */
export interface SessionUser {
  /** Unique user identifier (UUID). */
  id: string;
  /** User's email address. */
  email: string;
  /** Given name (NOT NULL upstream). */
  firstName: string;
  /** Family name (NOT NULL upstream). */
  lastName: string;
  /** Derived display name (`${firstName} ${lastName}`). */
  displayName: string;
  /** Optional avatar URL. */
  image?: string | null | undefined;
  /** Whether the user's email has been verified. */
  emailVerified?: boolean | undefined;
  /** User's role determining base permissions. */
  role: UserRoleLabel;
  /** Granular permissions in "resource:action" format. */
  permissions: string[];
  /** Whether the user account is currently active. */
  active: boolean;
  /** User initials for UI display. */
  initials?: string | null | undefined;
  /**
   * Active Better Auth `organization` plugin id, or `null` when the user has
   * no active organization (or the plugin is disabled in the consuming app).
   * Tenancy keys on this value when non-null and fall back to `id` otherwise.
   */
  activeOrganizationId?: string | null | undefined;
  /** Registry organization memberships visible to this session. */
  organizations?: readonly SessionOrganization[] | undefined;
  /** Registry/group identifiers visible to this session. */
  groupIds?: readonly string[] | undefined;
}

/**
 * Auth session payload returned by Better Auth.
 */
export interface AuthSession {
  /** Authenticated user profile. */
  user: SessionUser;
  /** Session metadata (cookie-backed). */
  session: {
    id: string;
    createdAt: string;
    expiresAt: string;
    updatedAt?: string;
    token?: string;
    userId?: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
}
