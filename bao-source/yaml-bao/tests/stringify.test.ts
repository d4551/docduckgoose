import { describe, expect, it } from "bun:test";
import { stringifyYAML } from "../src/index.ts";

describe("stringifyYAML — scalars", () => {
  it("stringifies null", () => expect(stringifyYAML(null)).toBe("null"));
  it("stringifies true", () => expect(stringifyYAML(true)).toBe("true"));
  it("stringifies false", () => expect(stringifyYAML(false)).toBe("false"));
  it("stringifies integer", () => expect(stringifyYAML(42)).toBe("42"));
  it("stringifies float", () => expect(stringifyYAML(3.14)).toBe("3.14"));
  it("stringifies plain string", () => expect(stringifyYAML("hello")).toBe("hello"));
});

describe("stringifyYAML — objects", () => {
  it("stringifies flat object", () => {
    const out = stringifyYAML({ name: "Alice", age: 30 });
    expect(out).toContain("name: Alice");
    expect(out).toContain("age: 30");
  });

  it("stringifies nested object", () => {
    const out = stringifyYAML({ person: { name: "Bob" } });
    expect(out).toContain("person:");
    expect(out).toContain("name: Bob");
  });

  it("stringifies empty object as {}", () => {
    expect(stringifyYAML({})).toBe("{}");
  });
});

describe("stringifyYAML — arrays", () => {
  it("stringifies array with items", () => {
    const out = stringifyYAML(["a", "b", "c"]);
    expect(out).toContain("- a");
    expect(out).toContain("- b");
    expect(out).toContain("- c");
  });

  it("stringifies empty array as []", () => {
    expect(stringifyYAML([])).toBe("[]");
  });
});

describe("stringifyYAML — strings with special chars", () => {
  it("quotes strings with newlines", () => {
    const out = stringifyYAML("hello\nworld");
    expect(out).toContain('"');
    expect(out).toContain("\\n");
  });

  it("quotes strings with double quotes", () => {
    const out = stringifyYAML('say "hi"');
    expect(out).toContain('"');
  });
});
