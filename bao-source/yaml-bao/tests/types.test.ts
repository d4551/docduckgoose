import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME } from "../src/index.ts";

describe("./types", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/yaml-bao");
  });
});
