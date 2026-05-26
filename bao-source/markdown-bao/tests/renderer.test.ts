import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME } from "../src/index.ts";

describe("./renderer", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/markdown-bao");
  });
});
