import { describe, expect, it } from "bun:test";
import {
  err,
  getErrorMessage,
  normalizeError,
  ok,
  toResult,
  toResultAsync,
  toResultSync,
} from "./async-result.ts";

describe("ok", () => {
  it("creates a success result", () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    expect(result.value).toBe(42);
  });

  it("preserves the value type", () => {
    const result = ok("hello");
    expect(result.value).toBe("hello");
  });
});

describe("err", () => {
  it("creates an error result", () => {
    const result = err("something went wrong");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("something went wrong");
  });

  it("preserves Error instances", () => {
    const error = new Error("boom");
    const result = err(error);
    expect(result.ok).toBe(false);
    expect(result.error).toBe(error);
  });
});

describe("normalizeError", () => {
  it("returns the original Error instance unchanged", () => {
    const error = new Error("test error");
    expect(normalizeError(error)).toBe(error);
  });

  it("wraps string errors in Error", () => {
    const result = normalizeError("plain string error");
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("plain string error");
  });

  it("extracts message from object with message property", () => {
    const result = normalizeError({ message: "structured error" });
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("structured error");
  });

  it("handles null input", () => {
    const result = normalizeError(null);
    expect(result).toBeInstanceOf(Error);
  });

  it("handles undefined input", () => {
    const result = normalizeError(undefined);
    expect(result).toBeInstanceOf(Error);
  });

  it("handles number input", () => {
    const result = normalizeError(404);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe("404");
  });
});

describe("getErrorMessage", () => {
  it("returns the message from an Error instance", () => {
    expect(getErrorMessage(new Error("crash"))).toBe("crash");
  });

  it("returns the message from an object with message property", () => {
    expect(getErrorMessage({ message: "wrapped error" })).toBe("wrapped error");
  });

  it('returns "Unknown error" for null', () => {
    expect(getErrorMessage(null)).toBe("Unknown error");
  });

  it('returns "Unknown error" for undefined', () => {
    expect(getErrorMessage(undefined)).toBe("Unknown error");
  });

  it("converts numbers to string", () => {
    expect(getErrorMessage(500)).toBe("500");
  });

  it("converts booleans to string", () => {
    expect(getErrorMessage(true)).toBe("true");
  });
});

describe("toResultSync", () => {
  it("wraps a successful synchronous operation", () => {
    const result = toResultSync(() => 42);
    expect(result.ok).toBe(true);
    expect(result.value).toBe(42);
  });

  it("wraps a throwing synchronous operation preserving the original Error", () => {
    const original = new Error("synchronous crash");
    const result = toResultSync(() => {
      throw original;
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe(original);
    expect(result.error.message).toBe("synchronous crash");
  });

  it("wraps non-Error throws as Error instances", () => {
    const result = toResultSync(() => {
      throw "raw string throw";
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe("raw string throw");
  });

  it("wraps numeric throws as Error instances", () => {
    const result = toResultSync(() => {
      throw 42;
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe("42");
  });

  it("supports error mapper for typed error branches", () => {
    const result = toResultSync(
      () => {
        throw new Error("mapped");
      },
      (error) => ({ code: "CUSTOM", original: error }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("CUSTOM");
      expect(result.error.original).toBeInstanceOf(Error);
    }
  });

  it("supports match method on success", () => {
    const result = toResultSync(() => "success");
    const matched = result.match(
      (v) => `ok: ${v}`,
      (e) => `err: ${e}`,
    );
    expect(matched).toBe("ok: success");
  });

  it("supports match method on error", () => {
    const result = toResultSync(() => {
      throw new Error("fail");
    });
    const matched = result.match(
      (v) => `ok: ${v}`,
      (e) => {
        if (e instanceof Error) return `err: ${e.message}`;
        return `err: ${String(e)}`;
      },
    );
    expect(matched).toBe("err: fail");
  });

  it("supports isOk type guard on success", () => {
    const result = toResultSync(() => 1);
    if (result.isOk()) {
      expect(result.value).toBe(1);
    } else {
      throw new Error("expected ok result");
    }
  });

  it("supports isErr type guard on error", () => {
    const result = toResultSync(() => {
      throw new Error("test");
    });
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(Error);
    } else {
      throw new Error("expected err result");
    }
  });
});

describe("toResult", () => {
  it("wraps a successful synchronous function", async () => {
    const result = await toResult(() => 42);
    expect(result.ok).toBe(true);
    expect(result.value).toBe(42);
  });

  it("wraps a successful async function", async () => {
    const result = await toResult(async () => "async value");
    expect(result.ok).toBe(true);
    expect(result.value).toBe("async value");
  });

  it("wraps a throwing synchronous function", async () => {
    const original = new Error("sync fail in toResult");
    const result = await toResult(() => {
      throw original;
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe(original);
  });

  it("wraps a rejecting async function", async () => {
    const original = new Error("async fail");
    const result = await toResult(async () => {
      throw original;
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe(original);
  });
});

describe("toResultAsync", () => {
  it("wraps a resolved promise", async () => {
    const result = await toResultAsync(Promise.resolve("resolved"));
    expect(result.ok).toBe(true);
    expect(result.value).toBe("resolved");
  });

  it("wraps a rejected promise preserving the original error", async () => {
    const original = new Error("rejected");
    const result = await toResultAsync<string>(Promise.reject(original));
    expect(result.ok).toBe(false);
    expect(result.error).toBe(original);
  });

  it("supports error mapper", async () => {
    const result = await toResultAsync(
      Promise.reject(new Error("mapped async")),
      (error) => `mapped: ${error instanceof Error ? error.message : String(error)}`,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("mapped: mapped async");
    }
  });

  it("supports match method on async success", async () => {
    const result = await toResultAsync(Promise.resolve("value"));
    const matched = result.match(
      (v) => v.toUpperCase(),
      () => "error",
    );
    expect(matched).toBe("VALUE");
  });

  it("supports isOk and isErr type guards", async () => {
    const success = await toResultAsync(Promise.resolve(1));
    expect(success.isOk()).toBe(true);
    expect(success.isErr()).toBe(false);
  });
});
