import { describe, expect, test } from "bun:test";
import { canonicalJsonStringify } from "../src/canonical-json.ts";

describe("canonicalJsonStringify", () => {
  test("emits sorted keys at every nesting level", () => {
    const result = canonicalJsonStringify({ b: 1, a: { z: 2, y: 3 }, c: [1, 2] });
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value).toBe('{"a":{"y":3,"z":2},"b":1,"c":[1,2]}');
  });

  test("identical input produces identical bytes regardless of declaration order", () => {
    const a = canonicalJsonStringify({ x: 1, y: 2, z: 3 });
    const b = canonicalJsonStringify({ z: 3, y: 2, x: 1 });
    const c = canonicalJsonStringify({ y: 2, z: 3, x: 1 });
    expect(a.ok && b.ok && c.ok).toBe(true);
    if (a.ok && b.ok && c.ok) {
      expect(a.value).toBe(b.value);
      expect(b.value).toBe(c.value);
    }
  });

  test("rejects NaN and Infinity with non-finite-number reason", () => {
    const nan = canonicalJsonStringify({ x: Number.NaN });
    const inf = canonicalJsonStringify({ x: Number.POSITIVE_INFINITY });
    expect(nan.ok).toBe(false);
    expect(inf.ok).toBe(false);
    if (!nan.ok) {
      expect(nan.reason).toBe("non-finite-number");
    }
  });

  test("drops undefined object properties (matches JSON.stringify semantics)", () => {
    const result = canonicalJsonStringify({ a: 1, b: undefined, c: 3 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe('{"a":1,"c":3}');
    }
  });

  test("undefined array entries serialize as null (matches JSON.stringify)", () => {
    const result = canonicalJsonStringify([1, undefined, 3]);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("[1,null,3]");
    }
  });

  test("preserves array order", () => {
    const result = canonicalJsonStringify([3, 1, 2]);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("[3,1,2]");
    }
  });

  test("escapes strings via JSON.stringify rules", () => {
    const result = canonicalJsonStringify({ k: 'quote"and\\backslash' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe('{"k":"quote\\"and\\\\backslash"}');
    }
  });

  test("nested arrays of objects also sort their keys", () => {
    const result = canonicalJsonStringify({
      items: [
        { b: 2, a: 1 },
        { d: 4, c: 3 },
      ],
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe('{"items":[{"a":1,"b":2},{"c":3,"d":4}]}');
    }
  });
});
