import { describe, expect, test } from "bun:test";
import {
  BAO_TARGET_STATE_TRANSITIONS,
  type BaoTargetLifecycleState,
  isValidTargetTransition,
  lifecycleFail,
  lifecycleOk,
} from "./lifecycle.ts";

describe("lifecycle result builders", () => {
  test("lifecycleOk → { ok: true }", () => {
    expect(lifecycleOk()).toEqual({ ok: true });
  });

  test("lifecycleFail → structured error", () => {
    const result = lifecycleFail("CODE", "msg", { ctx: 1 });
    expect(result).toEqual({ ok: false, code: "CODE", error: "msg", details: { ctx: 1 } });
  });

  test("lifecycleFail w/o details omits key", () => {
    const result = lifecycleFail("CODE", "msg");
    expect(result).toEqual({ ok: false, code: "CODE", error: "msg" });
    expect("details" in result).toBe(false);
  });
});

describe("target lifecycle state machine", () => {
  test("idle → installing valid", () => {
    expect(isValidTargetTransition("idle", "installing")).toBe(true);
  });

  test("idle → active invalid (skip states)", () => {
    expect(isValidTargetTransition("idle", "active")).toBe(false);
  });

  test("active → deactivating valid", () => {
    expect(isValidTargetTransition("active", "deactivating")).toBe(true);
  });

  test("active → idle invalid (must deactivate first)", () => {
    expect(isValidTargetTransition("active", "idle")).toBe(false);
  });

  test("any state → failed valid except idle", () => {
    const statesWithFailed: BaoTargetLifecycleState[] = [
      "installing",
      "activating",
      "deactivating",
      "uninstalling",
    ];
    for (const state of statesWithFailed) {
      expect(isValidTargetTransition(state, "failed")).toBe(true);
    }
  });

  test("failed → idle valid (reset)", () => {
    expect(isValidTargetTransition("failed", "idle")).toBe(true);
  });

  test("failed → installing valid (retry)", () => {
    expect(isValidTargetTransition("failed", "installing")).toBe(true);
  });

  test("full happy path: idle→installing→installed→activating→active→deactivating→installed→uninstalling→idle", () => {
    const path: BaoTargetLifecycleState[] = [
      "idle",
      "installing",
      "installed",
      "activating",
      "active",
      "deactivating",
      "installed",
      "uninstalling",
      "idle",
    ];
    for (let i = 0; i < path.length - 1; i++) {
      expect(isValidTargetTransition(path[i], path[i + 1])).toBe(true);
    }
  });

  test("all states present in transitions map", () => {
    const allStates: BaoTargetLifecycleState[] = [
      "idle",
      "installing",
      "installed",
      "activating",
      "active",
      "deactivating",
      "uninstalling",
      "failed",
    ];
    for (const state of allStates) {
      expect(BAO_TARGET_STATE_TRANSITIONS[state]).toBeDefined();
    }
  });
});
