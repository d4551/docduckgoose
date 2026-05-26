/**
 * Shared role-to-permission mapping utilities.
 *
 * Centralizes the RBAC permission mapping so client and server
 * can derive permissions consistently from the same role values.
 *
 * @shared/auth/permissions
 */

import {
  DEFAULT_USER_ROLE,
  USER_ROLE_LABELS,
  USER_ROLES,
  type UserRoleLabel,
  type UserRoleType,
} from "@baohaus/bao-schemas/user.schemas";
import { DRONE_CONTROL_PERMISSIONS } from "./drone-permissions";

/**
 * Role to permissions mapping.
 */
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: [
    "*",
    "admin",
    "system:admin",
    "cases:read",
    "cases:write",
    "analysis:run",
    "devices:control",
    "user:manage",
    "system:configure",
    ...Object.values(DRONE_CONTROL_PERMISSIONS),
  ],
  pathologist: ["cases:read", "cases:write", "analysis:run"],
  technician: [
    "cases:read",
    "analysis:view",
    "devices:control",
    ...Object.values(DRONE_CONTROL_PERMISSIONS),
  ],
  // Supported synonym used by seed data and docs.
  technologist: [
    "cases:read",
    "analysis:view",
    "devices:control",
    ...Object.values(DRONE_CONTROL_PERMISSIONS),
  ],
  viewer: ["cases:read"],
  guest: ["cases:read"],
};

/**
 * Normalize a role value to a lowercase key.
 *
 * @param role - Role value from auth payloads.
 * @returns Normalized role key.
 */
export function normalizeRoleKey(role: string | null | undefined): string {
  return (role ?? "").trim().toLowerCase();
}

/**
 * Group aliases emitted for each role in OIDC claims and external integrations.
 */
export const ROLE_GROUP_ALIASES: Record<UserRoleType, readonly string[]> = {
  admin: ["administrators", "admins"],
  pathologist: ["pathologists"],
  technician: ["technicians"],
  technologist: ["technologists"],
  viewer: ["viewers", "readonly"],
  guest: ["guests"],
};

const USER_ROLE_SET: Set<UserRoleType> = new Set<UserRoleType>(USER_ROLES);
const ROLE_PRIORITY: readonly UserRoleType[] = USER_ROLES;

/**
 * Normalize a group name for role matching.
 *
 * @param value - Raw group name.
 * @returns Normalized group name.
 */
export function normalizeGroupName(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

/**
 * Determine if a normalized role key is a known role.
 *
 * @param value - Normalized role key.
 * @returns True when the role key is recognized.
 */
export function isUserRoleKey(value: string): value is UserRoleType {
  return USER_ROLE_SET.has(value as UserRoleType);
}

/**
 * Resolve a canonical role key for an incoming role label or key.
 *
 * @param role - Role value from auth payloads.
 * @returns Canonical role key.
 */
export function resolveRoleKey(role: string | null | undefined): UserRoleType {
  const normalized = normalizeRoleKey(role);
  return isUserRoleKey(normalized) ? normalized : DEFAULT_USER_ROLE;
}

/**
 * Resolve a canonical role label from an incoming role label or key.
 *
 * @param role - Role value from auth payloads.
 * @returns Canonical role label.
 */
export function resolveRoleLabel(role: string | null | undefined): UserRoleLabel {
  const key = resolveRoleKey(role);
  return USER_ROLE_LABELS[key];
}

/**
 * Resolve group aliases for the provided role.
 *
 * @param role - Role value from auth payloads.
 * @param options - Optional inclusion controls for derived aliases.
 * @returns List of normalized group aliases.
 */
export function resolveRoleGroupAliases(
  role: string | null | undefined,
  options?: { includeRoleKey?: boolean; includeRoleLabel?: boolean; includeAliases?: boolean },
): string[] {
  const key = resolveRoleKey(role);
  const includeRoleKey = options?.includeRoleKey ?? true;
  const includeRoleLabel = options?.includeRoleLabel ?? true;
  const includeAliases = options?.includeAliases ?? true;
  const aliases = includeAliases ? (ROLE_GROUP_ALIASES[key] ?? []) : [];
  const groups = new Set<string>();

  if (includeRoleKey) {
    const normalizedKey = normalizeGroupName(key);
    if (normalizedKey) {
      groups.add(normalizedKey);
    }
  }
  if (includeRoleLabel) {
    const normalizedLabel = normalizeGroupName(USER_ROLE_LABELS[key]);
    if (normalizedLabel) {
      groups.add(normalizedLabel);
    }
  }
  for (const alias of aliases) {
    const normalized = normalizeGroupName(alias);
    if (normalized) {
      groups.add(normalized);
    }
  }

  return Array.from(groups);
}

/**
 * Resolve a role key from a set of group names.
 *
 * @param groups - Group names from identity provider.
 * @param overrides - Optional role alias overrides (merged with ROLE_GROUP_ALIASES).
 * @returns Matching role key or null.
 */
export function resolveRoleFromGroups(
  groups: string[] | null | undefined,
  overrides?: Partial<Record<UserRoleType, readonly string[]>>,
): UserRoleType | null {
  if (!groups?.length) {
    return null;
  }
  const normalizedGroups = groups.map(normalizeGroupName).filter(Boolean);
  if (!normalizedGroups.length) {
    return null;
  }

  for (const role of ROLE_PRIORITY) {
    const roleAliases = buildRoleAliases(role, overrides);
    if (hasRoleAliasMatch(normalizedGroups, roleAliases)) {
      return role;
    }
  }

  return null;
}

function buildRoleAliases(
  role: UserRoleType,
  overrides?: Partial<Record<UserRoleType, readonly string[]>>,
): Set<string> {
  const roleAliases = new Set<string>(resolveRoleGroupAliases(role));
  const overrideAliases = overrides?.[role] ?? [];

  for (const alias of overrideAliases) {
    const normalized = normalizeGroupName(alias);
    if (normalized) {
      roleAliases.add(normalized);
    }
  }
  return roleAliases;
}

function hasRoleAliasMatch(groups: string[], aliases: Set<string>): boolean {
  const normalizedAliases = [...aliases].filter(Boolean);
  if (!normalizedAliases.length) {
    return false;
  }
  const pattern = new RegExp(
    normalizedAliases.map((alias) => alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  );

  return groups.some((group) => aliases.has(group) || pattern.test(group));
}

/**
 * Derives permission array from a user role.
 *
 * @param role - User role.
 * @returns Array of permission strings for the role.
 */
export function derivePermissions(role: string | null | undefined): string[] {
  const normalized = normalizeRoleKey(role);
  const permissions = ROLE_PERMISSIONS[normalized];
  if (permissions?.length) {
    return permissions;
  }
  return ROLE_PERMISSIONS.viewer ?? ["cases:read"];
}
