/**
 * `.bao` target handler contract.
 *
 * Two canonical ports live here, with distinct responsibilities:
 *
 *   1. `BaoTargetHandlerContract` — runtime installer/uninstaller for a target kind.
 *      Imperative; runs `install` / `uninstall` against a manifest + archive context
 *      and returns the discriminated `BaoTargetHandlerResult` envelope.
 *
 *   2. `BaoTargetSchemaHandler` — declarative manifest-time validator for a target
 *      kind. Owns the kind's TypeBox schema plus optional cross-field invariants.
 *      Consumed by static manifest validators before any install runs.
 *
 * Both ports key by `kind`; consumers register their preferred port in the registry
 * appropriate to their phase (manifest validation vs. runtime installation).
 *
 * @module @baohaus/bao-sdk/target-handler
 */

import type { BaoManifest } from "./manifest.ts";

export type BaoTargetHandlerJsonValue =
  | string
  | number
  | boolean
  | null
  | readonly BaoTargetHandlerJsonValue[]
  | { readonly [key: string]: BaoTargetHandlerJsonValue };

export type BaoTargetHandlerRecord = Readonly<Record<string, BaoTargetHandlerJsonValue>>;

/**
 * Context passed to runtime installer/uninstaller methods on
 * `BaoTargetHandlerContract`. Generic over the concrete target + manifest
 * shapes so packages with TypeBox-derived install-target / manifest types can
 * flow their richer values through without lossy widening.
 */
export interface BaoTargetHandlerContext<
  TTarget = BaoTargetHandlerRecord,
  TManifest = BaoManifest,
> {
  readonly target: TTarget;
  readonly manifest: TManifest;
  readonly archiveBytes?: Uint8Array;
  readonly workingDir?: string;
  readonly sessionId?: string;
}

/** Success result from a target handler operation. */
export interface BaoTargetHandlerSuccessResult {
  ok: true;
  message: string;
  requiresRestart?: boolean;
  details?: BaoTargetHandlerJsonValue;
  /**
   * Binary artifacts emitted by the handler (e.g. activation records,
   * generated stubs). Keyed by archive-relative path. Out-of-JSON because
   * `Uint8Array` does not round-trip cleanly through `BaoTargetHandlerJsonValue`.
   */
  installedFiles?: Readonly<Record<string, Uint8Array>>;
}

/** Failure result from a target handler operation. */
export interface BaoTargetHandlerFailureResult {
  ok: false;
  message: string;
  retryable: boolean;
  phase: "install" | "uninstall" | "validate";
  details?: BaoTargetHandlerJsonValue;
}

/** Result envelope for target handler operations. */
export type BaoTargetHandlerResult = BaoTargetHandlerSuccessResult | BaoTargetHandlerFailureResult;

/** Build canonical success result. */
export function targetHandlerSuccess(input: {
  message: string;
  requiresRestart?: boolean;
  details?: BaoTargetHandlerJsonValue;
  installedFiles?: Readonly<Record<string, Uint8Array>>;
}): BaoTargetHandlerSuccessResult {
  return {
    ok: true,
    message: input.message,
    ...(input.requiresRestart === undefined ? {} : { requiresRestart: input.requiresRestart }),
    ...(input.details === undefined ? {} : { details: input.details }),
    ...(input.installedFiles === undefined ? {} : { installedFiles: input.installedFiles }),
  };
}

/** Build canonical failure result. */
export function targetHandlerFailure(input: {
  message: string;
  retryable: boolean;
  phase: "install" | "uninstall" | "validate";
  details?: BaoTargetHandlerJsonValue;
}): BaoTargetHandlerFailureResult {
  return {
    ok: false,
    message: input.message,
    retryable: input.retryable,
    phase: input.phase,
    ...(input.details === undefined ? {} : { details: input.details }),
  };
}

/** Type guard: target handler result is success. */
export function isTargetHandlerSuccess(
  result: BaoTargetHandlerResult,
): result is BaoTargetHandlerSuccessResult {
  return result.ok;
}

// Lifecycle context + hooks for hot load/unload

/** Context passed to lifecycle hook callbacks. */
export interface BaoLifecycleContext {
  /** Target identifier from manifest. */
  targetId: string;
  /** Target kind (e.g. 'elysia-plugin'). */
  kind: string;
  /** Runtime session ID if within a session. */
  sessionId?: string;
  /** Manifest metadata name. */
  manifestName?: string;
}

/** Healthcheck result from a target's runtime probe. */
export interface BaoHealthcheckResult {
  healthy: boolean;
  message?: string;
  latencyMs?: number;
  details?: BaoTargetHandlerRecord;
}

/**
 * Resource handle returned by activate — runtime calls dispose on deactivate.
 *
 * Follows TC39 Explicit Resource Management pattern (Symbol.dispose).
 * Target handlers return this from onActivate; runtime stores it and calls
 * dispose() on deactivate to clean up timers, subscriptions, caches.
 */
export interface BaoDisposableResource {
  /** Clean up all resources held by this target. */
  dispose(): void | Promise<void>;
}

/**
 * Lifecycle hooks that target handlers can implement for hot load/unload.
 *
 * Call order:
 *   install → onActivate → [running] → onDeactivate → uninstall
 *
 * onActivate returns optional disposable for automatic cleanup.
 */
export interface BaoTargetHandlerLifecycleHooks {
  /** Called after install when target transitions to active state. */
  onActivate?(context: BaoLifecycleContext): Promise<BaoDisposableResource | undefined>;

  /** Called before uninstall when target transitions from active state. */
  onDeactivate?(context: BaoLifecycleContext): Promise<void>;

  /** Runtime health probe — called periodically when target is active. */
  healthcheck?(context: BaoLifecycleContext): Promise<BaoHealthcheckResult>;
}

/**
 * Self-describing target handler contract for `.bao` target kinds.
 *
 * Target handlers implement this interface and register with the
 * BaoTargetHandlerRegistry at bootstrap time. Generic over the manifest shape
 * so packages with TypeBox-derived `BaoManifest` types can flow them through.
 */
export interface BaoTargetHandlerContract<TTarget = BaoTargetHandlerRecord, TManifest = BaoManifest>
  extends Partial<BaoTargetHandlerLifecycleHooks> {
  /** Target kind this handler owns. */
  readonly kind: string;
  /** Human-readable display name for UIs and discovery. */
  readonly displayName: string;
  /** Whether this target can be hot-installed without server restart. */
  readonly hotInstallable: boolean;
  /** Whether failures in this target's install step can be retried. */
  readonly retryable: boolean;
  /** ABI version for target/runtime contract alignment. */
  readonly abiVersion?: number;
  /** Whether cached instances can be reused across requests. */
  readonly supportsReuse?: boolean;

  /** Resolve primary identifier from a target record for allowlist matching. */
  resolveIdentifier(target: TTarget): string;

  /** Compute opaque runtime fingerprint for cache invalidation. */
  runtimeFingerprint?(): string;

  /** Install the target. */
  install(context: BaoTargetHandlerContext<TTarget, TManifest>): Promise<BaoTargetHandlerResult>;

  /** Uninstall the target. */
  uninstall(context: BaoTargetHandlerContext<TTarget, TManifest>): Promise<BaoTargetHandlerResult>;

  /** Validate a target declaration before install. */
  validate?(context: BaoTargetHandlerContext<TTarget, TManifest>): Promise<BaoTargetHandlerResult>;
}

// Schema-handler port — declarative manifest-time validator for a target kind.

/**
 * Manifest-validation issue emitted by `BaoTargetSchemaHandler.validate`.
 * Carries enough context for static manifest validators to surface a
 * structured error before any installer runs.
 */
export interface BaoTargetSchemaIssue {
  /** JSON-pointer-style path within the target record. */
  readonly path?: string;
  /** Human-readable message. */
  readonly message: string;
  /** Severity — error stops install, warning is advisory only. */
  readonly severity: "error" | "warning";
}

/**
 * Minimal handle declaration for a target kind owned by a package's manifest
 * validator. Pairs the kind's TypeBox schema with optional cross-field
 * invariant checks. `TSchema` is purposely typed as `unknown` here to avoid
 * pulling `@sinclair/typebox` into the SDK's published dependency surface;
 * registries downcast to `TSchema` locally where they consume the schema.
 */
export interface BaoTargetSchemaHandler<TTarget = BaoTargetHandlerRecord> {
  /** The target kind string this handler owns. */
  readonly kind: string;
  /** TypeBox schema for kind-specific fields (excluding canonical base fields). */
  readonly schema: unknown;
  /** Optional cross-field invariant checks beyond the schema itself. */
  validate?(target: TTarget): readonly BaoTargetSchemaIssue[];
}
