import { describe, expect, it } from "bun:test";
import { coerceParams, coercePrimitiveParam, sqliteCellToJS, sqliteRowToRecord } from "./query";

describe("coercePrimitiveParam", () => {
  it("returns null for undefined", () => {
    expect(coercePrimitiveParam(undefined)).toBe(null);
  });

  it("returns null for null", () => {
    expect(coercePrimitiveParam(null)).toBe(null);
  });

  it("passes through strings", () => {
    expect(coercePrimitiveParam("hello")).toBe("hello");
  });

  it("passes through finite numbers", () => {
    expect(coercePrimitiveParam(42)).toBe(42);
  });

  it("returns null for NaN", () => {
    expect(coercePrimitiveParam(Number.NaN)).toBe(null);
  });

  it("returns null for Infinity", () => {
    expect(coercePrimitiveParam(Number.POSITIVE_INFINITY)).toBe(null);
    expect(coercePrimitiveParam(Number.NEGATIVE_INFINITY)).toBe(null);
  });

  it("passes through bigints", () => {
    expect(coercePrimitiveParam(123n)).toBe(123n);
  });

  it("converts boolean true to 1", () => {
    expect(coercePrimitiveParam(true)).toBe(1);
  });

  it("converts boolean false to 0", () => {
    expect(coercePrimitiveParam(false)).toBe(0);
  });

  it("converts Date to ISO string", () => {
    const d = new Date("2024-01-15T12:00:00Z");
    expect(coercePrimitiveParam(d)).toBe(d.toISOString());
  });

  it("stringifies plain objects", () => {
    const obj = { a: 1 };
    expect(coercePrimitiveParam(obj)).toBe(JSON.stringify(obj));
  });

  it("stringifies non-SQL types", () => {
    expect(coercePrimitiveParam(Symbol("test"))).toBe("Symbol(test)");
  });

  it("passes through TypedArray bindings", () => {
    const buf = new Uint8Array([1, 2, 3]);
    expect(coercePrimitiveParam(buf)).toBe(buf);
  });
});

describe("coerceParams", () => {
  it("returns empty array for empty input", () => {
    expect(coerceParams([])).toEqual([]);
  });

  it("coerces each element", () => {
    const result = coerceParams(["a", 42, true, null, undefined]);
    expect(result).toEqual(["a", 42, 1, null, null]);
  });

  it("handles mixed types", () => {
    const d = new Date("2024-01-01T00:00:00Z");
    const result = coerceParams(["name", d, 100, false]);
    expect(result[0]).toBe("name");
    expect(result[1]).toBe(d.toISOString());
    expect(result[2]).toBe(100);
    expect(result[3]).toBe(0);
  });
});

describe("sqliteCellToJS", () => {
  it("passes through values unchanged", () => {
    expect(sqliteCellToJS("hello")).toBe("hello");
    expect(sqliteCellToJS(42)).toBe(42);
    expect(sqliteCellToJS(null)).toBe(null);
    expect(sqliteCellToJS(true)).toBe(true);
  });
});

describe("sqliteRowToRecord", () => {
  it("maps columns to row values", () => {
    const result = sqliteRowToRecord(["id", "name", "active"], [1, "Alice", true]);
    expect(result).toEqual({ id: 1, name: "Alice", active: true });
  });

  it("handles empty columns", () => {
    const result = sqliteRowToRecord([], []);
    expect(result).toEqual({});
  });

  it("handles null values", () => {
    const result = sqliteRowToRecord(["id", "name"], [1, null]);
    expect(result).toEqual({ id: 1, name: null });
  });

  it("handles bigint values", () => {
    const result = sqliteRowToRecord(["big"], [123n]);
    expect(result).toEqual({ big: 123n });
  });
});
