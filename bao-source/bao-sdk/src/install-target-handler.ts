/**
 * `.bao` install-target handler contract — runtime-side variant.
 *
 * Distinct from {@link import("./target-handler.ts").BaoTargetHandlerContract}
 * which carries the richer `BaoTargetHandlerContext { target, manifest,
 * archiveBytes, workingDir, sessionId }` for handlers that need archive
 * context. This module exposes the SIMPLER per-app variant: `install`
 * and `uninstall` take a single `BaoInstallTargetRecord` (a structural
 * `Record<string, BoundaryInput>`) and the contract REQUIRES a
 * `targetSchema` for runtime registration + validation.
 *
 * Why two contracts? Most contribution-surface and UI-asset-pack
 * handlers don't touch the archive bytes — they only project
 * structurally-validated target fields into a process-local registry.
 * Forcing those handlers to thread an unused `manifest` / `archiveBytes`
 * through every call site would inflate the surface for zero
 * runtime benefit. The simpler shape lives here so per-app handler
 * files import a single canonical contract — no per-app local
 * declaration of `BaoInstallTargetHandlerContract`,
 * `BaoInstallTargetHandlerResult`, `targetHandlerSuccess`,
 * `targetHandlerFailure`, or `BaoInstallTargetRecord`.
 *
 * Lifted from `bao-runtime/src/domains/packages/services/bao-install/bao-handler-registry.ts`
 * — the single source of truth for the install-target handler shape.
 * Re-declaring these names in any impl path is the "no duplicated
 * wire shapes" violation this seam exists to prevent.
 *
 * @module @baohaus/bao-sdk/install-target-handler
 */

import type { UnknownRecord } from "@baohaus/bao-types/common";
import type { TSchema } from "@baohaus/baobox/elysia";

/**
 * Boundary record passed into install / uninstall. Aliased to the
 * canonical {@link UnknownRecord} shape (`Record<string, unknown>`)
 * from `@baohaus/bao-types/common` — the single source of truth for
 * structurally-validated boundary data across the workspace. Per-app
 * narrowing helpers (`asConfigSection`, `readField`, `asJsonRecord`,
 * `isRecord`) project these records into typed shapes inside each
 * handler. Re-declaring the record shape in any impl path is the
 * "no duplicated wire shapes" violation this seam exists to prevent.
 */
export type BaoInstallTargetRecord = UnknownRecord;

/** Diagnostic detail value attached to install / uninstall results. */
export type BaoInstallTargetHandlerDetailValue = unknown;

/** Success result from an install target handler. */
export interface BaoInstallTargetHandlerSuccessResult {
  readonly ok: true;
  readonly message: string;
  readonly requiresRestart?: boolean;
  readonly details?: BaoInstallTargetHandlerDetailValue;
}

/** Failure result from an install target handler. */
export interface BaoInstallTargetHandlerFailureResult {
  readonly ok: false;
  readonly message: string;
  readonly retryable: boolean;
  readonly phase: "install" | "uninstall" | "validate";
  readonly details?: BaoInstallTargetHandlerDetailValue;
}

/** Result envelope for install target handler operations. */
export type BaoInstallTargetHandlerResult =
  | BaoInstallTargetHandlerSuccessResult
  | BaoInstallTargetHandlerFailureResult;

/** Build a canonical success result. */
export function targetHandlerSuccess(input: {
  message: string;
  requiresRestart?: boolean;
  details?: BaoInstallTargetHandlerDetailValue;
}): BaoInstallTargetHandlerSuccessResult {
  return {
    ok: true,
    message: input.message,
    ...(input.requiresRestart === undefined ? {} : { requiresRestart: input.requiresRestart }),
    ...(input.details === undefined ? {} : { details: input.details }),
  };
}

/** Build a canonical failure result. */
export function targetHandlerFailure(input: {
  message: string;
  retryable: boolean;
  phase: "install" | "uninstall" | "validate";
  details?: BaoInstallTargetHandlerDetailValue;
}): BaoInstallTargetHandlerFailureResult {
  return {
    ok: false,
    message: input.message,
    retryable: input.retryable,
    phase: input.phase,
    ...(input.details === undefined ? {} : { details: input.details }),
  };
}

/** Type guard: install target handler result is success. */
export function isTargetHandlerSuccess(
  result: BaoInstallTargetHandlerResult,
): result is BaoInstallTargetHandlerSuccessResult {
  return result.ok;
}

/**
 * Self-describing install target handler contract for `.bao` target
 * kinds. Handlers implement this interface and register themselves
 * with the per-app `BaoTargetHandlerRegistry` at bootstrap time.
 */
export interface BaoInstallTargetHandlerContract {
  /** Target kind this handler owns (open string, not a fixed union). */
  readonly kind: string;
  /** Human-readable display name for UIs and discovery endpoints. */
  readonly displayName: string;
  /** Whether this target can be hot-installed without a server restart. */
  readonly hotInstallable: boolean;
  /** Whether failures in this target's install step can be retried. */
  readonly retryable: boolean;
  /** TypeBox schema for validating this kind's target declarations. */
  readonly targetSchema: TSchema;
  /** ABI version used to validate target/runtime contract alignment. */
  readonly abiVersion?: number;
  /** Whether cached instances can be reused across requests. */
  readonly supportsReuse?: boolean;

  /** Resolve the primary identifier from a target record. */
  resolveIdentifier(target: BaoInstallTargetRecord): string;

  /** Compute an opaque runtime fingerprint for cache invalidation. */
  runtimeFingerprint?(): string;

  /** Install the target. */
  install(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult>;

  /** Uninstall the target. */
  uninstall(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult>;

  /** Validate the target can be installed. */
  validate(target: BaoInstallTargetRecord): Promise<BaoInstallTargetHandlerResult>;
}

// Class A handler host context (consumed by @baohaus/bao-install-handlers-bao)

/**
 * Minimal logger port the canonical Class A handlers consume. Apps inject
 * their concrete logger (registry, bao-runtime, forge, gateway) at
 * construction time so install lifecycle failures are never silently
 * swallowed.
 */
export interface BaoInstallHandlerLoggerPort {
  readonly info: (message: string, context?: Readonly<Record<string, string>>) => void;
  readonly warn: (message: string, context?: Readonly<Record<string, string>>) => void;
  readonly error: (message: string, context?: Readonly<Record<string, string>>) => void;
}

/**
 * Module-host port the htmx-extension handler consumes during uninstall to
 * release the dynamically-imported handler module from the host's module
 * cache. Optional because most handlers do not load arbitrary host modules.
 */
export interface BaoInstallHandlerModuleHostPort {
  readonly unregisterModule: (id: string) => void;
}

/**
 * Per-app capabilities Class A install handlers consume at construction.
 * Constructed once by the consuming app at boot and threaded into every
 * `new XTargetHandler(hostContext)` call. The contract lives here (not in
 * `host-context.ts`, which carries the extension-module DI host context)
 * so consumers import a single canonical contract from one subpath.
 *
 * Why each field exists (no speculative surface):
 *
 * - `resolveExtensionModuleImportSpecifier` — Six contribution-surface
 *   handlers (`sidebar`, `nav`, `settings-tab`, `palette-entry-group`,
 *   `api-group`, `tile-group`) call this twice each to normalize an
 *   extension module's import specifier (relative paths become
 *   cache-busted `file://` URLs; package specifiers pass through) before
 *   dynamic `import()`. The app owns workspace-root resolution + cache
 *   epoch.
 * - `resolveHtmlRouteExtensionModuleSpecifier` — The htmx-extension
 *   handler uses a distinct variant that resolves HTML-route module
 *   imports under a different cache key. Separated from the generic
 *   resolver because route-module hot-reload epochs are independent.
 * - `resolveDriverRegistryDir` — The ui-component-kit handler writes the
 *   extracted driver bundle into a host-owned filesystem location whose
 *   path depends on the app's install-config seam.
 * - `resolveFailOnImportError` — Soft-fail allowlist toggle threaded from
 *   the app's install-config. Handlers honor this to convert
 *   `import()`-time failures into structured non-fatal results during
 *   validation-by-import.
 * - `rebuildAndReloadElysiaApp` — Optional callback the htmx-extension
 *   handler invokes after registering / unregistering an HTML route so
 *   the host's Elysia app picks up the route change without a full
 *   process restart. Not all apps support hot-swap; the field is
 *   optional so apps that can only restart simply omit it.
 * - `moduleHost` — Optional module-host port the htmx-extension handler
 *   consumes during uninstall to release the dynamically-imported route
 *   module from the host's module cache. Optional for the same reason.
 * - `logger` — Required structured logger.
 */
export interface BaoInstallTargetHandlerHostContext {
  readonly resolveExtensionModuleImportSpecifier: (moduleId: string) => string;
  readonly resolveHtmlRouteExtensionModuleSpecifier: (moduleId: string) => string;
  readonly resolveDriverRegistryDir: () => string;
  readonly resolveFailOnImportError: (kind: string) => boolean;
  readonly rebuildAndReloadElysiaApp?: () => Promise<void>;
  readonly moduleHost?: BaoInstallHandlerModuleHostPort;
  readonly logger: BaoInstallHandlerLoggerPort;
}
