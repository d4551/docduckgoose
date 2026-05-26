import { describe, expect, test } from "bun:test";
import {
  captureResult,
  captureResultAsync,
  type FailureValue,
  normalizeFailureMessage,
  type Result,
} from "./data-result";

describe("normalizeFailureMessage", () => {
  test("extracts Error.message", () => {
    expect(normalizeFailureMessage(new Error("boom"), "default")).toBe("boom");
  });

  test("extracts a structured failure object's message field", () => {
    expect(normalizeFailureMessage({ message: "oops" }, "default")).toBe("oops");
  });

  test("passes through a non-empty string failure", () => {
    expect(normalizeFailureMessage("plain-message", "default")).toBe("plain-message");
  });

  test("coerces number/boolean failures to string", () => {
    expect(normalizeFailureMessage(42, "default")).toBe("42");
    expect(normalizeFailureMessage(true, "default")).toBe("true");
  });

  test("returns the fallback for null/undefined/empty-message failures", () => {
    expect(normalizeFailureMessage(null, "fallback")).toBe("fallback");
    expect(normalizeFailureMessage(undefined, "fallback")).toBe("fallback");
    expect(normalizeFailureMessage({ message: "  " }, "fallback")).toBe("fallback");
    expect(normalizeFailureMessage("   ", "fallback")).toBe("fallback");
  });
});

describe("captureResult", () => {
  test("wraps a successful sync operation as ok+data", async () => {
    const result: Result<number, string> = await captureResult<number, string>(
      () => 7,
      (failure) => normalizeFailureMessage(failure as FailureValue, "fail"),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toBe(7);
  });

  test("wraps a successful async operation as ok+data", async () => {
    const result = await captureResult<string, string>(
      async () => "value",
      (failure) => normalizeFailureMessage(failure as FailureValue, "fail"),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toBe("value");
  });

  test("captures a thrown Error via mapFailure", async () => {
    const result = await captureResult<number, string>(
      () => {
        throw new Error("kaboom");
      },
      (failure) => normalizeFailureMessage(failure as FailureValue, "fail"),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("kaboom");
  });

  test("captures a rejected Promise via mapFailure", async () => {
    const result = await captureResult<number, string>(
      async () => {
        throw new Error("async-bad");
      },
      (failure) => normalizeFailureMessage(failure as FailureValue, "fail"),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("async-bad");
  });
});

describe("captureResultAsync", () => {
  test("captures async success as ok+data", async () => {
    const result = await captureResultAsync<number, string>(
      async () => 99,
      (failure) => normalizeFailureMessage(failure as FailureValue, "fail"),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toBe(99);
  });

  test("captures async rejection via mapFailure with custom error shape", async () => {
    const result = await captureResultAsync<number, { detail: string }>(
      async () => {
        throw new Error("explode");
      },
      (failure) => ({ detail: normalizeFailureMessage(failure as FailureValue, "fail") }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.detail).toBe("explode");
  });
});
