import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("./compile", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/tailwind-bao");
    expect(UPSTREAM_PACKAGE).toBe("tailwindcss@4.2.2");
  });
});
