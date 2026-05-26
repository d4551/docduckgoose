import { describe, expect, test } from "bun:test";
import { interpolate, parseIcu } from "./icu.js";

describe("parseIcu", () => {
  test("splits text and placeholders", () => {
    expect(parseIcu("Hello {name}!")).toEqual([
      { kind: "text", value: "Hello " },
      { kind: "placeholder", name: "name", format: null },
      { kind: "text", value: "!" },
    ]);
  });

  test("parses plural segments with offset", () => {
    const segments = parseIcu("{n, plural, offset:1 =0 {none} one {one more} other {# more}}");
    expect(segments).toEqual([
      {
        kind: "plural",
        name: "n",
        offset: 1,
        cases: { "=0": "none", one: "one more", other: "# more" },
      },
    ]);
  });
});

describe("interpolate", () => {
  test("interpolates simple placeholders", () => {
    expect(interpolate("Hello {name}!", { name: "World" }, "en-GB")).toBe("Hello World!");
  });

  test("formats numbers with locale", () => {
    expect(interpolate("{n, number}", { n: 1234.5 }, "en-GB")).toBe("1,234.5");
  });

  test("selects plural categories", () => {
    const template = "{count, plural, =0 {no items} one {one item} other {# items}}";
    expect(interpolate(template, { count: 0 }, "en-GB")).toBe("no items");
    expect(interpolate(template, { count: 1 }, "en-GB")).toBe("one item");
    expect(interpolate(template, { count: 3 }, "en-GB")).toBe("3 items");
  });

  test("selects discriminant values", () => {
    const template = "{role, select, admin {Admin} editor {Editor} other {Guest}}";
    expect(interpolate(template, { role: "admin" }, "en-GB")).toBe("Admin");
    expect(interpolate(template, { role: "viewer" }, "en-GB")).toBe("Guest");
  });
});
