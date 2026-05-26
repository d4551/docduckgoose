/**
 * Shared helpers for path existence checks.
 *
 * Provides Bun-first predicates for sync/async checks and avoids duplicated
 * `Bun.file(...).size` checks across script/runtime modules.
 *
 * @packageDocumentation
 */

const MISSING_PATH_LAST_MODIFIED: number = Bun.file(
  `${process.cwd()}/.baohaus-missing-path-sentinel-${process.pid}-${Date.now()}`,
).lastModified;

/**
 * Check whether a filesystem path exists.
 *
 * @param path - Absolute or relative path.
 * @returns `true` when the target path exists.
 */
export function pathExists(path: string): Promise<boolean> {
  return Bun.file(path).exists();
}

/**
 * Check whether a filesystem path exists using Bun sync-style error wrapping.
 *
 * This keeps Bun CLI/runtime modules from re-implementing executable/path checks.
 *
 * @param path - Absolute or relative path.
 * @returns `true` when the target path exists.
 */
export function pathExistsSync(path: string): boolean {
  const normalized = String(path).trim();
  if (!normalized) {
    return false;
  }
  const lastModified = Bun.file(normalized).lastModified;
  return Number.isFinite(lastModified) && lastModified !== MISSING_PATH_LAST_MODIFIED;
}
