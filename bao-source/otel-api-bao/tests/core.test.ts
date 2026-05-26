import { describe, expect, it } from "bun:test";
import { ExportResultCode, PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/core.ts";

describe("./core seam", () => {
  it("re-exports ExportResultCode", () => {
    expect(ExportResultCode.SUCCESS).toBeDefined();
    expect(ExportResultCode.FAILED).toBeDefined();
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/core@2.6.1");
  });
});
