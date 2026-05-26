import { describe, expect, it } from "bun:test";
import { parse, parseJsonc, stripJsonComments } from "./jsonc.ts";

describe("stripJsonComments", () => {
  it("returns text without comments unchanged", () => {
    const input = `{"key": "value"}`;
    expect(stripJsonComments(input)).toBe(`{"key": "value"}`);
  });

  it("strips single-line comments", () => {
    const input = `{
  // this is a comment
  "key": "value"
}`;
    const result = stripJsonComments(input);
    expect(result).not.toContain("this is a comment");
    expect(JSON.parse(result)).toEqual({ key: "value" });
  });

  it("strips block comments", () => {
    const input = `{
  /* multi-line
     block comment */
  "key": "value"
}`;
    const result = stripJsonComments(input);
    expect(result).not.toContain("multi-line");
    expect(JSON.parse(result)).toEqual({ key: "value" });
  });

  it("strips trailing comments", () => {
    const input = `{ "key": "value" // trailing comment
}`;
    const result = stripJsonComments(input);
    expect(JSON.parse(result)).toEqual({ key: "value" });
  });

  it("preserves comment-like tokens inside strings", () => {
    const input = `{ "url": "https://example.com", "desc": "/* not a comment */" }`;
    const result = stripJsonComments(input);
    expect(JSON.parse(result)).toEqual({
      url: "https://example.com",
      desc: "/* not a comment */",
    });
  });

  it("handles escaped quotes in strings", () => {
    const input = `{ "key": "val\\"ue // not a comment" }`;
    const result = stripJsonComments(input);
    expect(JSON.parse(result)).toEqual({ key: 'val"ue // not a comment' });
  });

  it("returns empty object for empty input", () => {
    expect(parseJsonc("{}")).toEqual({});
  });

  it("returns empty array for empty array input", () => {
    expect(parseJsonc("[]")).toEqual([]);
  });
});

describe("parseJsonc", () => {
  it("parses JSONC with comments", () => {
    const input = `{
  // config
  "port": 3000,
  "host": "localhost"
}`;
    expect(parseJsonc(input)).toEqual({ port: 3000, host: "localhost" });
  });

  it("parses numbers, booleans, null", () => {
    expect(parseJsonc("42")).toBe(42);
    expect(parseJsonc("3.14")).toBe(3.14);
    expect(parseJsonc("true")).toBe(true);
    expect(parseJsonc("false")).toBe(false);
    expect(parseJsonc("null")).toBeNull();
  });

  it("throws on invalid JSON after comment stripping", () => {
    expect(() => parseJsonc("{ invalid }")).toThrow();
  });
});

describe("parse (jsonc-parser compatible)", () => {
  it("parses JSONC when comments are allowed (default)", () => {
    const input = `{
  // a config file
  "key": 1
}`;
    const result = parse(input);
    expect(result).toEqual({ key: 1 });
  });

  it("throws on comments when disallowed", () => {
    const input = `// comment\n{ "key": 1 }`;
    expect(() => parse(input, undefined, { disallowComments: true })).toThrow();
  });

  it("parses JSON without comments when comments disallowed", () => {
    const input = `{ "key": 1 }`;
    const result = parse(input, undefined, { disallowComments: true });
    expect(result).toEqual({ key: 1 });
  });
});
