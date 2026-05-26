/**
 * Generic per-surface contribution registry factory.
 *
 * Returns an order-stable in-memory registry keyed by the registration's
 * `id`, with deterministic snapshot ordering driven by a caller-supplied
 * `compare` function. Consumed by every Bao app's `.bao` install handler
 * chain so the lifecycle (register / unregister / unregister-by-owner /
 * snapshot) lives in one place across all five contribution surfaces.
 *
 * Failure modes are surfaced via the {@link RegistryError} discriminated
 * Result type — no `try/catch`, no thrown exceptions in the happy path —
 * so call sites can react to duplicate-id collisions without an exception
 * filter.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./base-contribution.ts";

/**
 * Discriminated failure variants emitted by {@link ContributionRegistry.register}.
 *
 * `duplicate-id` fires when the registry already holds a registration with
 * the same `id` owned by a different `extensionId`. Re-registering the
 * same `id` from the same owner is idempotent and returns success.
 */
export type RegistryError = {
  readonly kind: "duplicate-id";
  readonly id: string;
  readonly currentOwner: string;
  readonly attemptedOwner: string;
};

/**
 * Result discriminator returned by {@link ContributionRegistry.register}.
 * Mirrors the Rust / Effect-TS-style Result discriminator used throughout
 * the Bao codebase to keep error flow exception-free.
 */
export type RegisterResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: RegistryError };

/**
 * Snapshot options for {@link ContributionRegistry.snapshot}. Adding the
 * optional `tenantId` filter here keeps the registry's public method
 * surface stable while letting tenant-aware consumers (capability-gated
 * sidebars, settings workbench tabs scoped to a single org) ask for the
 * subset visible to a specific tenant. Omitting the filter (or passing
 * `null`) returns every registration regardless of tenant — used by
 * platform-internal callers that need the global view.
 */
export interface SnapshotOptions {
  /**
   * Tenant context the caller is rendering for. When set, the snapshot
   * includes every registration whose `tenantId` is `null` (global) plus
   * those whose `tenantId` matches. Never returns cross-tenant entries.
   */
  readonly tenantId?: string | null | undefined;
}

/**
 * Public surface of a per-surface contribution registry. Every method is
 * synchronous because the registry is in-memory; callers that need cross-
 * process visibility publish to `@baohaus/ecosystem-events-bao/service`
 * after a successful local mutation.
 */
export interface ContributionRegistry<T extends BaseContributionRegistration> {
  /**
   * Register a contribution. Idempotent for `(id, extensionId)` pairs
   * (replays the same registration), rejected with `duplicate-id` when
   * a different owner already holds the id.
   */
  readonly register: (registration: T) => RegisterResult;
  /** Drop a single registration by id. Missing ids return `false`. */
  readonly unregister: (id: string) => boolean;
  /**
   * Drop every registration owned by `extensionId`. Returns the number
   * of registrations removed. Used during `.bao` hot-uninstall and
   * re-install (the install handler clears the owner's prior set
   * before re-registering its new contributions).
   */
  readonly unregisterByOwner: (extensionId: string) => number;
  /**
   * Frozen ordered snapshot of every registration, sorted via the
   * caller-supplied compare function passed to
   * {@link createContributionRegistry}. When called with
   * `{ tenantId }`, the snapshot is filtered to entries visible to that
   * tenant: globals (`tenantId === null`) plus matching-tenant entries.
   * Never returns cross-tenant entries.
   */
  readonly snapshot: (options?: SnapshotOptions) => readonly T[];
  /** Current registration count. */
  readonly size: () => number;
  /**
   * Monotonically-incrementing version counter bumped on every successful
   * mutation (`register`, `unregister`, `unregisterByOwner`). Consumers
   * key in-memory snapshot caches against this value so cache lookup
   * returns precomputed envelopes when the registry has not mutated.
   */
  readonly version: () => number;
  /**
   * Test-only utility — clears every registration. Production callers
   * use `unregisterByOwner` or `unregister` with explicit scope.
   */
  readonly resetForTests: () => void;
}

/**
 * Build a fresh registry instance. Each call returns an independent
 * store so apps that host multiple surfaces (sidebar + settings-tab +
 * palette-entry-group + …) hold one registry per surface — no shared
 * mutable state across surfaces.
 *
 * @param compare - Pairwise compare used to order `snapshot()` output.
 *                  Must return a negative number when `a` precedes `b`,
 *                  zero when equal, positive when `a` follows `b`.
 *                  Receives raw registrations so callers can sort by
 *                  surface-specific fields (section + position, group +
 *                  rank, etc.).
 */
export function createContributionRegistry<T extends BaseContributionRegistration>(
  compare: (a: T, b: T) => number,
): ContributionRegistry<T> {
  const registrations = new Map<string, T>();
  let mutationVersion = 0;

  const register = (registration: T): RegisterResult => {
    const existing = registrations.get(registration.id);
    if (existing !== undefined && existing.extensionId !== registration.extensionId) {
      return {
        ok: false,
        error: {
          kind: "duplicate-id",
          id: registration.id,
          currentOwner: existing.extensionId,
          attemptedOwner: registration.extensionId,
        },
      };
    }
    registrations.set(registration.id, registration);
    mutationVersion += 1;
    return { ok: true };
  };

  const unregister = (id: string): boolean => {
    const removed = registrations.delete(id);
    if (removed) {
      mutationVersion += 1;
    }
    return removed;
  };

  const unregisterByOwner = (extensionId: string): number => {
    let removed = 0;
    for (const [id, reg] of registrations) {
      if (reg.extensionId === extensionId) {
        registrations.delete(id);
        removed += 1;
      }
    }
    if (removed > 0) {
      mutationVersion += 1;
    }
    return removed;
  };

  const isVisibleToTenant = (entry: T, tenantFilter: string | null | undefined): boolean => {
    if (tenantFilter === undefined || tenantFilter === null) {
      return true;
    }
    const entryTenant = entry.tenantId ?? null;
    if (entryTenant === null) {
      return true;
    }
    return entryTenant === tenantFilter;
  };

  const snapshot = (options?: SnapshotOptions): readonly T[] => {
    const tenantFilter = options?.tenantId;
    const filtered =
      tenantFilter === undefined || tenantFilter === null
        ? Array.from(registrations.values())
        : Array.from(registrations.values()).filter((entry) =>
            isVisibleToTenant(entry, tenantFilter),
          );
    const ordered = filtered.sort(compare);
    return Object.freeze(ordered);
  };

  const size = (): number => registrations.size;

  const version = (): number => mutationVersion;

  const resetForTests = (): void => {
    registrations.clear();
    mutationVersion += 1;
  };

  return {
    register,
    unregister,
    unregisterByOwner,
    snapshot,
    size,
    version,
    resetForTests,
  };
}
