import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, parse, stringify } from "../src/index.ts";

describe("index", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/yaml-bao");
  });

  it("resolves anchors and aliases with an alias safety limit", () => {
    expect(parse("name: &app Bao\ncopy: *app", { maxAliasCount: 2 })).toEqual({
      name: "Bao",
      copy: "Bao",
    });
    expect(() => parse("name: &app Bao\ncopy: *app", { maxAliasCount: 0 })).toThrow(
      "YAML alias count exceeded maxAliasCount",
    );
  });

  it("resolves and stringifies simple custom tags", () => {
    const upperTag = {
      tag: "!upper",
      resolve: (value: string) => value.toUpperCase(),
      identify: (value: unknown) => typeof value === "string" && value === value.toUpperCase(),
      stringify: (value: unknown) => String(value).toLowerCase(),
    };

    expect(parse("name: !upper bao", { customTags: [upperTag] })).toEqual({ name: "BAO" });
    expect(stringify({ name: "BAO" }, { customTags: [upperTag] })).toBe("name: !upper bao");
  });
});
