import { describe, expect, test } from "bun:test";
import { parseJsonSafe } from "../src/parse.ts";

describe("parseJsonSafe — primitives", () => {
  test("null/true/false", () => {
    expect(parseJsonSafe("null")).toEqual({ ok: true, value: null });
    expect(parseJsonSafe("true")).toEqual({ ok: true, value: true });
    expect(parseJsonSafe("false")).toEqual({ ok: true, value: false });
  });
  test("numbers", () => {
    expect(parseJsonSafe("0")).toEqual({ ok: true, value: 0 });
    expect(parseJsonSafe("-0")).toEqual({ ok: true, value: -0 });
    expect(parseJsonSafe("123")).toEqual({ ok: true, value: 123 });
    expect(parseJsonSafe("-123")).toEqual({ ok: true, value: -123 });
    expect(parseJsonSafe("1.5")).toEqual({ ok: true, value: 1.5 });
    expect(parseJsonSafe("1e10")).toEqual({ ok: true, value: 1e10 });
    expect(parseJsonSafe("1.5e-3")).toEqual({ ok: true, value: 0.0015 });
  });
  test("strings + escapes", () => {
    expect(parseJsonSafe('"hello"')).toEqual({ ok: true, value: "hello" });
    expect(parseJsonSafe('"a\\nb"')).toEqual({ ok: true, value: "a\nb" });
    expect(parseJsonSafe('"\\u0041"')).toEqual({ ok: true, value: "A" });
  });
});

describe("parseJsonSafe — composite", () => {
  test("empty array/object", () => {
    expect(parseJsonSafe("[]")).toEqual({ ok: true, value: [] });
    expect(parseJsonSafe("{}")).toEqual({ ok: true, value: {} });
  });
  test("nested", () => {
    expect(parseJsonSafe('{"a":[1,2,3],"b":{"c":true}}')).toEqual({
      ok: true,
      value: { a: [1, 2, 3], b: { c: true } },
    });
  });
  test("whitespace tolerated", () => {
    expect(parseJsonSafe(' \n\t{ "a" :  1 } ')).toEqual({ ok: true, value: { a: 1 } });
  });
});

describe("parseJsonSafe — failures (no throw)", () => {
  test("bare token", () => {
    const out = parseJsonSafe("abc");
    expect(out.ok).toBe(false);
    if (out.ok) return;
    expect(out.offset).toBe(0);
  });
  test("unterminated string", () => {
    expect(parseJsonSafe('"abc').ok).toBe(false);
  });
  test("trailing garbage", () => {
    expect(parseJsonSafe("123 garbage").ok).toBe(false);
  });
  test("invalid escape", () => {
    expect(parseJsonSafe('"\\x"').ok).toBe(false);
  });
  test("missing colon", () => {
    expect(parseJsonSafe('{"a" 1}').ok).toBe(false);
  });
  test("trailing comma", () => {
    expect(parseJsonSafe("[1,]").ok).toBe(false);
  });
  test("control char in string", () => {
    expect(parseJsonSafe('"a\x01b"').ok).toBe(false);
  });
  test("number without leading digit", () => {
    expect(parseJsonSafe("-").ok).toBe(false);
  });
});
