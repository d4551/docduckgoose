import type { BaoLock, BaoLockResolved } from "./schema-guards.ts";

export function collectUnresolvedReleaseDependencies(lock: BaoLock): BaoLockResolved[] {
  return lock.resolved.filter(
    (entry) =>
      entry.resolvedFrom === "pending-publish" ||
      entry.ociDigest === null ||
      entry.integrity === null ||
      entry.signature === null,
  );
}
