import { describe, expect, test } from "bun:test";
import {
  isPlainObject,
  parseJsonObjectFromText,
  parseJsonTextToValue,
  readStringField,
} from "../src/json-helpers.ts";
import { settle } from "../src/settle.ts";

describe("settle", () => {
  test("resolves success", async () => {
    const result = await settle(Promise.resolve(42));
    expect(result).toEqual({ ok: true, value: 42 });
  });

  test("resolves failure as cause", async () => {
    const result = await settle(Promise.reject(new Error("boom")));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.cause.message).toBe("boom");
    }
  });
});

describe("json-helpers", () => {
  test("isPlainObject rejects arrays, null, and primitives", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ key: "value" })).toBe(true);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject("string")).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject(true)).toBe(false);
  });

  test("parseJsonTextToValue", async () => {
    const ok = await parseJsonTextToValue('{"a":1}');
    expect(ok).toEqual({ ok: true, value: { a: 1 } });
    const array = await parseJsonTextToValue("[1,2,3]");
    expect(array).toEqual({ ok: true, value: [1, 2, 3] });
    const empty = await parseJsonTextToValue("");
    expect(empty).toEqual({ ok: false });
    const whitespace = await parseJsonTextToValue("   ");
    expect(whitespace).toEqual({ ok: false });
    const bad = await parseJsonTextToValue("{");
    expect(bad).toEqual({ ok: false });
  });

  test("parseJsonObjectFromText + readStringField", async () => {
    const obj = await parseJsonObjectFromText('{"name":"bao"}');
    expect(obj).toEqual({ name: "bao" });
    if (obj !== undefined) {
      expect(readStringField(obj, "name")).toBe("bao");
      expect(readStringField(obj, "missing")).toBeUndefined();
      expect(readStringField({ count: 42 }, "count")).toBeUndefined();
    }
    const array = await parseJsonObjectFromText("[1,2,3]");
    expect(array).toBeUndefined();
  });
});
