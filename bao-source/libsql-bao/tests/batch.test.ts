import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("./batch", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/libsql-bao");
    expect(UPSTREAM_PACKAGE).toBe("@libsql/client@0.17.2");
  });
});
