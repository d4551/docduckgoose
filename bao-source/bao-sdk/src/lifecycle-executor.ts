/**
 * Bao target lifecycle executor — hot-load / cold-unload state machine.
 *
 * Drives the state transitions defined in lifecycle.ts. Validates before
 * transitioning, calls target handler hooks, and returns structured results.
 *
 * Hot load: idle → installing → installed → activating → active (no restart)
 * Cold load: idle → installing → installed (requires restart)
 * Unload:   active → deactivating → installed → uninstalling → idle
 * Cold unload: active → deactivating → installed (then cold shutdown)
 *
 * @module @baohaus/bao-sdk/lifecycle-executor
 */

import {
  type BaoRuntimeTargetLifecycleOptions,
  type BaoRuntimeTargetLifecycleResult,
  type BaoTargetLifecycleState,
  isValidTargetTransition,
  lifecycleFail,
  lifecycleOk,
} from "./lifecycle.ts";

const COLD_UNLOADABLE_STATES = new Set<BaoTargetLifecycleState>(["installed", "active"]);
const ACTIVE_STATE: BaoTargetLifecycleState = "active";

interface LifecycleCommand {
  readonly targetId: string;
  readonly options: BaoRuntimeTargetLifecycleOptions;
}

function assertTransitionAllowed(
  targetId: string,
  from: BaoTargetLifecycleState,
  to: BaoTargetLifecycleState,
): BaoRuntimeTargetLifecycleResult | null {
  if (isValidTargetTransition(from, to)) {
    return null;
  }
  return lifecycleFail(
    "TRANSITION_FORBIDDEN",
    `Cannot transition ${targetId} from ${from} to ${to}`,
    { targetId, from, to },
  );
}

function assertColdUnloadSupported(
  targetId: string,
  state: BaoTargetLifecycleState,
): BaoRuntimeTargetLifecycleResult | null {
  if (COLD_UNLOADABLE_STATES.has(state)) {
    return null;
  }
  return lifecycleFail(
    "COLD_UNLOAD_FAILED",
    `Target ${targetId} in state ${state} — cannot cold-unload`,
    { targetId, state },
  );
}

/**
 * Transition a target one step toward installation (hot or cold).
 * Returns the result and the resulting state if successful.
 */
export function executeTargetInstall(
  cmd: LifecycleCommand,
  currentState: BaoTargetLifecycleState,
): { result: BaoRuntimeTargetLifecycleResult; nextState: BaoTargetLifecycleState } {
  const { targetId, options } = cmd;

  if (currentState === "idle") {
    const denied = assertTransitionAllowed(targetId, "idle", "installing");
    if (denied) return { result: denied, nextState: currentState };
    return { result: lifecycleOk(), nextState: "installing" };
  }

  if (currentState === "installing") {
    return { result: lifecycleOk(), nextState: "installed" };
  }

  if (currentState === "installed") {
    if (options.enforceHotInstallable === true) {
      return { result: lifecycleOk(), nextState: "activating" };
    }
    return { result: lifecycleOk(), nextState: ACTIVE_STATE };
  }

  if (currentState === "activating") {
    return { result: lifecycleOk(), nextState: ACTIVE_STATE };
  }

  const denied = assertTransitionAllowed(targetId, currentState, "installing");
  if (denied) return { result: denied, nextState: currentState };
  return {
    result: denied ?? lifecycleFail("UNEXPECTED_STATE", `Unexpected state ${currentState}`),
    nextState: currentState,
  };
}

/**
 * Transition a target toward deactivation and uninstall (hot unload).
 * Cold unload: stops at `installed` state without uninstalling.
 */
export function executeTargetUninstall(
  targetId: string,
  currentState: BaoTargetLifecycleState,
  cold: boolean,
): { result: BaoRuntimeTargetLifecycleResult; nextState: BaoTargetLifecycleState } {
  if (currentState === ACTIVE_STATE) {
    const denied = assertTransitionAllowed(targetId, ACTIVE_STATE, "deactivating");
    if (denied) return { result: denied, nextState: currentState };
    return { result: lifecycleOk(), nextState: "deactivating" };
  }

  if (currentState === "deactivating") {
    const nextState: BaoTargetLifecycleState = "installed";
    return { result: lifecycleOk(), nextState };
  }

  if (currentState === "installed") {
    if (cold) {
      const coldResult = assertColdUnloadSupported(targetId, currentState);
      if (coldResult) return { result: coldResult, nextState: currentState };
      return { result: lifecycleOk(), nextState: "installed" };
    }
    return { result: lifecycleOk(), nextState: "uninstalling" };
  }

  if (currentState === "uninstalling") {
    return { result: lifecycleOk(), nextState: "idle" };
  }

  const denied = assertTransitionAllowed(targetId, currentState, "deactivating");
  if (denied) return { result: denied, nextState: currentState };
  return {
    result: lifecycleFail("UNEXPECTED_STATE", `Unexpected state ${currentState}`),
    nextState: currentState,
  };
}

/**
 * Cold-unload a target: stop at `installed` state (files on disk, not running).
 */
export function executeTargetColdUnload(
  targetId: string,
  currentState: BaoTargetLifecycleState,
): { result: BaoRuntimeTargetLifecycleResult; nextState: BaoTargetLifecycleState } {
  return executeTargetUninstall(targetId, currentState, true);
}
