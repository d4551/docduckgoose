import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME } from "../src/index.ts";

describe("./locale", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/dayjs-bao");
  });
});
