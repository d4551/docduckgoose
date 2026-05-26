/**
 * User and Authentication Schemas
 *
 * Defines type-safe user models, roles, and authentication-related types
 * shared between client and server. These schemas ensure consistent user
 * data handling across the application.
 *
 * @shared/schemas/user.ts
 *
 * @remarks
 * This module now exports TypeScript types and literal unions only.
 * Runtime validation is handled at the API boundary using Elysia route schemas.
 * These types are derived from the Prisma schema and extended with application-
 * specific properties.
 *
 * @example
 * ```typescript
 * import { User, USER_ROLES, UserRoleType } from '@baohaus/bao-schemas/user.ts';
 *
 * // Check user role
 * if (USER_ROLES.includes(user.role)) {
 *   // Role is valid
 * }
 *
 * // Type-safe role assignment
 * const role: UserRoleType = 'pathologist';
 * ```
 */

/**
 * Valid user roles in the system.
 *
 * Defines the complete set of user roles with their respective permissions:
 * - admin: Full system access and configuration
 * - pathologist: Medical diagnosis and case review
 * - technician: Lab operations and sample processing
 * - technologist: Advanced lab operations and imaging support
 * - viewer: Read-only access to cases and reports
 * - guest: Limited access for demonstration purposes
 */
export const USER_ROLES: readonly [
  "admin",
  "pathologist",
  "technician",
  "technologist",
  "viewer",
  "guest",
] = ["admin", "pathologist", "technician", "technologist", "viewer", "guest"] as const;

/**
 * Type-safe user role enumeration.
 */
export type UserRoleType = (typeof USER_ROLES)[number];

/**
 * Human-readable display labels for each user role.
 */
export const USER_ROLE_LABELS: Record<UserRoleType, string> = {
  admin: "Admin",
  pathologist: "Pathologist",
  technician: "Technician",
  technologist: "Technologist",
  viewer: "Viewer",
  guest: "Guest",
};

/**
 * Fallback label for users without an assigned role.
 */
export const UNASSIGNED_ROLE_LABEL = "Unassigned";

/**
 * Role label union derived from USER_ROLE_LABELS values.
 */
export type UserRoleLabel = (typeof USER_ROLE_LABELS)[UserRoleType];

/**
 * Short descriptions for each user role.
 */
export const USER_ROLE_DESCRIPTIONS: Record<UserRoleType, string> = {
  admin: "Full system administration and policy control.",
  pathologist: "Case review, diagnosis, and AI-assisted workflows.",
  technician: "Lab operations, sample handling, and device control.",
  technologist: "Advanced lab operations and imaging support.",
  viewer: "Read-only access to cases and reports.",
  guest: "Limited access for demos or short-lived reviews.",
};

/**
 * Default role assigned to new users when unspecified.
 */
export const DEFAULT_USER_ROLE: UserRoleType = "viewer";

/**
 * Valid user account statuses.
 *
 * Defines user account lifecycle states:
 * - active: Account is active and can access the system
 * - inactive: Account is temporarily disabled
 * - suspended: Account is suspended due to policy violation
 * - pending: Account is awaiting activation or approval
 */
export const USER_STATUSES: readonly ["active", "inactive", "suspended", "pending"] = [
  "active",
  "inactive",
  "suspended",
  "pending",
] as const;

/**
 * Type-safe user status enumeration.
 */
export type UserStatusType = (typeof USER_STATUSES)[number];

/**
 * User profile information
 *
 * UserProfile
 *
 * @description
 * Contains optional demographic and contact information for a user.
 * This data is used for display purposes and user identification.
 *
 * @example
 * ```typescript
 * const profile: UserProfile = {
 *   firstName: 'Jane',
 *   lastName: 'Smith',
 *   displayName: 'Dr. Smith',
 *   title: 'Senior Pathologist',
 *   department: 'Anatomic Pathology',
 *   phoneNumber: '555-0123'
 * };
 * ```
 */
export interface UserProfile {
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** Optional display name (e.g., 'Dr. Smith') */
  displayName?: string;
  /** Professional title or role designation */
  title?: string;
  /** Department or organizational unit */
  department?: string;
  /** Brief biographical information */
  bio?: string;
  /** URL to user's avatar image */
  avatarUrl?: string;
  /** Contact phone number */
  phoneNumber?: string;
}

/**
 * User application preferences
 *
 * UserPreferences
 *
 * @description
 * Stores user-specific UI and notification preferences. These settings
 * persist across sessions and synchronize across devices.
 *
 * @example
 * ```typescript
 * const preferences: UserPreferences = {
 *   theme: 'dark',
 *   language: 'en-US',
 *   timezone: 'America/New_York',
 *   notifications: {
 *     email: true,
 *     push: false
 *   },
 *   accessibility: {
 *     highContrast: true,
 *     fontSize: 'large'
 *   }
 * };
 * ```
 */
export interface UserPreferences {
  /** UI theme preference (light, dark, or auto based on system) */
  theme?: "light" | "dark" | "auto";
  /** Preferred language code (e.g., 'en-US', 'es-ES') */
  language?: string;
  /** IANA timezone identifier (e.g., 'America/New_York') */
  timezone?: string;
  /** Notification channel preferences */
  notifications?: {
    /** Enable email notifications */
    email?: boolean;
    /** Enable push notifications */
    push?: boolean;
    /** Enable SMS notifications */
    sms?: boolean;
  };
  /** Accessibility and UI customization options */
  accessibility?: {
    /** Enable high contrast mode for better visibility */
    highContrast?: boolean;
    /** Enable reduced motion for accessibility */
    reducedMotion?: boolean;
    /** Font size preference for improved readability */
    fontSize?: "small" | "medium" | "large";
  };
}

/**
 * Complete user entity
 *
 * User
 *
 * @description
 * Represents a complete user entity with authentication, profile, and
 * preference data. This is the primary user model used throughout the
 * application for both client and server operations.
 *
 * @example
 * ```typescript
 * const user: User = {
 *   id: '550e8400-e29b-41d4-a716-446655440000',
 *   username: 'jsmith',
 *   email: 'jsmith@hospital.org',
 *   role: 'pathologist',
 *   status: 'active',
 *   profile: {
 *     firstName: 'Jane',
 *     lastName: 'Smith',
 *     displayName: 'Dr. Smith'
 *   },
 *   createdAt: '2024-01-15T10:00:00Z',
 *   lastLoginAt: '2024-01-20T14:30:00Z'
 * };
 * ```
 */
export interface User {
  /** Unique user identifier (UUID) */
  id: string;
  /** Unique username for authentication */
  username: string;
  /** User's email address (must be unique) */
  email: string;
  /** User's role determining permissions and access */
  role: UserRoleType;
  /** Current account status */
  status: UserStatusType;
  /** Optional profile information */
  profile?: UserProfile;
  /** Optional user preferences */
  preferences?: UserPreferences;
  /** Account creation timestamp (ISO 8601) */
  createdAt?: string;
  /** Last account update timestamp (ISO 8601) */
  updatedAt?: string;
  /** Last successful login timestamp (ISO 8601) */
  lastLoginAt?: string;
}
