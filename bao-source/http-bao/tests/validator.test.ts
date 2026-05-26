import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("./validator", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/http-bao");
    expect(UPSTREAM_PACKAGE).toBe("elysia@1.4.28");
  });
});
