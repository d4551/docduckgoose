/**
 * Unit tests for the adapter result discriminated union helpers.
 */

import { describe, expect, it } from "bun:test";
import { type AdapterResult, adapterErr, adapterOk } from "./result-adapters";

describe("adapterOk", () => {
  it("emits a success result with optional restart and details flags", () => {
    const result = adapterOk("Bun runtime activated", {
      requiresRestart: true,
      details: { plan: "registry", attempts: 1 },
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.message).toBe("Bun runtime activated");
      expect(result.requiresRestart).toBe(true);
      expect(result.details).toEqual({ plan: "registry", attempts: 1 });
    }
  });

  it("omits optional fields when none are supplied", () => {
    const result = adapterOk("Activated");
    expect(result).toEqual({
      ok: true,
      message: "Activated",
      requiresRestart: undefined,
      details: undefined,
    });
  });
});

describe("adapterErr", () => {
  it("emits a failure result tagged with phase, retryable, and structured details", () => {
    const result = adapterErr("Activation failed", "install", true, { reason: "registry-down" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toBe("Activation failed");
      expect(result.phase).toBe("install");
      expect(result.retryable).toBe(true);
      expect(result.details).toEqual({ reason: "registry-down" });
    }
  });
});

describe("AdapterResult discriminated union", () => {
  it("narrows on `ok` so callers can switch on success or failure", () => {
    const results: readonly AdapterResult[] = [
      adapterOk("ok-1"),
      adapterErr("err-1", "verify", false),
    ];

    const phases = results.map((entry) => (entry.ok ? "success" : entry.phase));
    expect(phases).toEqual(["success", "verify"]);
  });
});
