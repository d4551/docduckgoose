/**
 * Shared authentication session types.
 *
 * Provides a single source of truth for session user and session payloads
 * across UI, BFF, and services.
 *
 * @packageDocumentation
 */

import type { UserRoleLabel } from "../schemas/user.schemas";

/**
 * Active session user information.
 */
export interface SessionUser {
  /** Unique user identifier (UUID). */
  id: string;
  /** User's email address. */
  email: string;
  /** User's full display name. */
  name: string;
  /** Optional avatar URL. */
  image?: string | null;
  /** Whether the user's email has been verified. */
  emailVerified?: boolean;
  /** User's role determining base permissions. */
  role: UserRoleLabel;
  /** Granular permissions in "resource:action" format. */
  permissions: string[];
  /** Whether the user account is currently active. */
  active: boolean;
  /** User initials for UI display. */
  initials?: string | null;
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
