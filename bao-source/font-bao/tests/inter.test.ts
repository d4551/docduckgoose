import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("./inter", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/font-bao");
    expect(UPSTREAM_PACKAGE).toBe("@fontsource packages");
  });
});
