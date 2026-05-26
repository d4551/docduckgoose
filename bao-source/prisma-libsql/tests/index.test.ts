import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("index", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/prisma-libsql");
    expect(UPSTREAM_PACKAGE).toBe("@prisma/adapter-libsql@7.7.0");
  });
});
