/**
 * `.bao` runtime target lifecycle types.
 *
 * Result envelopes and options for apply/remove operations
 * on runtime targets.
 *
 * @module @baohaus/bao-sdk/lifecycle
 */

/** Persistence mutation mode for runtime extension descriptors. */
export type DescriptorMutationMode = "ignore" | "upsert" | "delete";

/** Target handler execution order for descriptor mutations. */
export type DescriptorMutationOrder = "before-handler" | "after-handler" | "none";

/** JSON-safe detail value for lifecycle result envelopes. */
export type BaoLifecycleDetailValue =
  | string
  | number
  | boolean
  | null
  | readonly BaoLifecycleDetailValue[]
  | { readonly [key: string]: BaoLifecycleDetailValue };

/** Options for apply/remove operations on a single runtime target. */
export interface BaoRuntimeTargetLifecycleOptions {
  runtimeSessionId?: string | null;
  descriptorMutation: DescriptorMutationMode;
  enforceHotInstallable?: boolean;
}

/** Result envelope for runtime target lifecycle operations. */
export type BaoRuntimeTargetLifecycleResult =
  | { ok: true }
  | { ok: false; code: string; error: string; details?: BaoLifecycleDetailValue };

/** Build successful lifecycle result. */
export function lifecycleOk(): BaoRuntimeTargetLifecycleResult {
  return { ok: true };
}

/** Build failed lifecycle result. */
export function lifecycleFail(
  code: string,
  error: string,
  details?: BaoLifecycleDetailValue,
): BaoRuntimeTargetLifecycleResult {
  return { ok: false, code, error, ...(details === undefined ? {} : { details }) };
}

/** Supported lifecycle execution modes for runtime sessions. */
export const BAO_RUNTIME_EXECUTION_MODES = {
  install: "install",
  mount: "mount",
} as const;
export type BaoRuntimeExecutionMode =
  (typeof BAO_RUNTIME_EXECUTION_MODES)[keyof typeof BAO_RUNTIME_EXECUTION_MODES];

/** Runtime session source kinds. */
export const BAO_RUNTIME_SESSION_SOURCE_KINDS = {
  registry: "registry",
  local: "local",
} as const;
export type BaoRuntimeSessionSourceKind =
  (typeof BAO_RUNTIME_SESSION_SOURCE_KINDS)[keyof typeof BAO_RUNTIME_SESSION_SOURCE_KINDS];

/** Runtime session state type. */
export type BaoRuntimeSessionState =
  | "pending"
  | "mounting"
  | "mounted"
  | "activating"
  | "active"
  | "deactivating"
  | "unmounting"
  | "unmounted"
  | "failed";

// Target lifecycle state machine

/**
 * Individual target lifecycle states for hot load/unload.
 *
 * State machine:
 *   idle → installing → installed → activating → active
 *   active → deactivating → installed → uninstalling → idle
 *   any → failed
 */
export type BaoTargetLifecycleState =
  | "idle"
  | "installing"
  | "installed"
  | "activating"
  | "active"
  | "deactivating"
  | "uninstalling"
  | "failed";

/** Valid state transitions for target lifecycle. */
export const BAO_TARGET_STATE_TRANSITIONS: Record<
  BaoTargetLifecycleState,
  readonly BaoTargetLifecycleState[]
> = {
  idle: ["installing"],
  installing: ["installed", "failed"],
  installed: ["activating", "uninstalling"],
  activating: ["active", "failed"],
  active: ["deactivating"],
  deactivating: ["installed", "failed"],
  uninstalling: ["idle", "failed"],
  failed: ["idle", "installing"],
} as const;

/** Check if a state transition is valid. */
export function isValidTargetTransition(
  from: BaoTargetLifecycleState,
  to: BaoTargetLifecycleState,
): boolean {
  return (BAO_TARGET_STATE_TRANSITIONS[from] as readonly string[]).includes(to);
}
