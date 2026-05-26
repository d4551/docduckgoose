import { describe, expect, test } from "bun:test";
import {
  generateIdempotencyKey,
  IDEMPOTENCY_HEADER_CANDIDATES,
  isValidIdempotencyKey,
  MAX_IDEMPOTENCY_KEY_LENGTH,
  normalizeIdempotencyKey,
  resolveIdempotencyHeaderValue,
  validateIdempotencyKey,
} from "./idempotency";

describe("MAX_IDEMPOTENCY_KEY_LENGTH", () => {
  test("caps inbound keys at 128 bytes", () => {
    expect(MAX_IDEMPOTENCY_KEY_LENGTH).toBe(128);
  });
});

describe("normalizeIdempotencyKey", () => {
  test("trims surrounding whitespace", () => {
    expect(normalizeIdempotencyKey("  abc  ")).toBe("abc");
  });
  test("returns null for blank input", () => {
    expect(normalizeIdempotencyKey("   ")).toBeNull();
    expect(normalizeIdempotencyKey(null)).toBeNull();
    expect(normalizeIdempotencyKey(undefined)).toBeNull();
  });
});

describe("resolveIdempotencyHeaderValue", () => {
  test("reads from both canonical header names", () => {
    for (const name of IDEMPOTENCY_HEADER_CANDIDATES) {
      const headers = new Headers({ [name]: "key-123" });
      expect(resolveIdempotencyHeaderValue(headers)).toBe("key-123");
    }
  });
  test("returns null when no header is present", () => {
    expect(resolveIdempotencyHeaderValue(new Headers())).toBeNull();
  });
});

describe("validateIdempotencyKey", () => {
  test("accepts a valid alphanumeric key", () => {
    const result = validateIdempotencyKey("abc-123_v2");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.key).toBe("abc-123_v2");
    }
  });
  test("rejects missing/blank input with reason=missing", () => {
    expect(validateIdempotencyKey(null)).toEqual({ ok: false, reason: "missing" });
    expect(validateIdempotencyKey("   ")).toEqual({ ok: false, reason: "missing" });
  });
  test("rejects oversized input with reason=too-long", () => {
    const big = "a".repeat(MAX_IDEMPOTENCY_KEY_LENGTH + 1);
    expect(validateIdempotencyKey(big)).toEqual({ ok: false, reason: "too-long" });
  });
  test("rejects keys with leading/trailing separators with reason=format", () => {
    expect(validateIdempotencyKey("-abc")).toEqual({ ok: false, reason: "format" });
    expect(validateIdempotencyKey("abc-")).toEqual({ ok: false, reason: "format" });
    expect(validateIdempotencyKey("abc def")).toEqual({ ok: false, reason: "format" });
  });
});

describe("isValidIdempotencyKey", () => {
  test("matches validateIdempotencyKey on the happy path", () => {
    expect(isValidIdempotencyKey("k1.k2_k3-k4")).toBe(true);
  });
  test("rejects empty and oversized strings", () => {
    expect(isValidIdempotencyKey("")).toBe(false);
    expect(isValidIdempotencyKey("x".repeat(MAX_IDEMPOTENCY_KEY_LENGTH + 1))).toBe(false);
  });
});

describe("generateIdempotencyKey", () => {
  test("respects maxLength truncation", () => {
    const key = generateIdempotencyKey({ prefix: "pre", maxLength: 8 });
    expect(key.length).toBeLessThanOrEqual(8);
  });
});
