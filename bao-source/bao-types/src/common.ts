/**
 * Common shared type aliases.
 *
 * These types are intentionally small, dependency-free, and safe to import from
 * both server and client code. Prefer importing these aliases instead of
 * re-declaring `Record<string, unknown>` shapes across the codebase.
 *
 * @shared/types/common
 */

/**
 * Generic record with string keys and unknown values.
 *
 * Use this when you need a safe "object-like" type for unknown JSON payloads.
 */
export type UnknownRecord = Record<string, unknown>;
