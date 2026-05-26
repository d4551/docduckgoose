import { describe, expect, it } from "bun:test";
import { parseYAML } from "../src/index.ts";

describe("parseYAML — scalars", () => {
  it("parses null", () => {
    expect(parseYAML("null")).toBeNull();
    expect(parseYAML("~")).toBeNull();
  });

  it("parses booleans", () => {
    expect(parseYAML("true")).toBe(true);
    expect(parseYAML("false")).toBe(false);
  });

  it("parses integers", () => {
    expect(parseYAML("42")).toBe(42);
    expect(parseYAML("-7")).toBe(-7);
  });

  it("parses floats", () => {
    expect(parseYAML("3.14")).toBeCloseTo(3.14);
  });

  it("parses plain string", () => {
    expect(parseYAML("hello world")).toBe("hello world");
  });
});

describe("parseYAML — flat mapping", () => {
  it("parses single key-value", () => {
    expect(parseYAML("name: Alice")).toEqual({ name: "Alice" });
  });

  it("parses multiple key-value pairs", () => {
    const yaml = "name: Alice\nage: 30\nactive: true";
    expect(parseYAML(yaml)).toEqual({ name: "Alice", age: 30, active: true });
  });

  it("parses null values", () => {
    expect(parseYAML("value: null")).toEqual({ value: null });
  });

  it("parses tilde null values", () => {
    expect(parseYAML("value: ~")).toEqual({ value: null });
  });
});

describe("parseYAML — flat sequence", () => {
  it("parses string items", () => {
    const yaml = "- apple\n- banana\n- cherry";
    expect(parseYAML(yaml)).toEqual(["apple", "banana", "cherry"]);
  });

  it("parses number items", () => {
    const yaml = "- 1\n- 2\n- 3";
    expect(parseYAML(yaml)).toEqual([1, 2, 3]);
  });

  it("parses inline mapping items with continuation fields", () => {
    const yaml = "tags:\n  - name: System\n    description: Health checks";
    expect(parseYAML(yaml)).toEqual({
      tags: [{ name: "System", description: "Health checks" }],
    });
  });
});

describe("parseYAML — nested mapping", () => {
  it("parses nested object", () => {
    const yaml = "person:\n  name: Bob\n  age: 25";
    expect(parseYAML(yaml)).toEqual({ person: { name: "Bob", age: 25 } });
  });

  it("parses deeply nested object", () => {
    const yaml = "a:\n  b:\n    c: deep";
    expect(parseYAML(yaml)).toEqual({ a: { b: { c: "deep" } } });
  });

  it("folds indented scalar continuation lines", () => {
    const yaml = "description: Returns diagnostics for\n  troubleshooting.";
    expect(parseYAML(yaml)).toEqual({
      description: "Returns diagnostics for troubleshooting.",
    });
  });
});

describe("parseYAML — flow syntax", () => {
  it("parses flow sequence", () => {
    expect(parseYAML("[1, 2, 3]")).toEqual([1, 2, 3]);
  });

  it("parses flow mapping", () => {
    expect(parseYAML("{name: Alice, age: 30}")).toEqual({ name: "Alice", age: 30 });
  });
});

describe("parseYAML — comments", () => {
  it("ignores inline comments", () => {
    const yaml = "name: Alice # this is a comment\nage: 30";
    expect(parseYAML(yaml)).toEqual({ name: "Alice", age: 30 });
  });
});
