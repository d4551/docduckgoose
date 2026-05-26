import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("@baohaus/otel-api-bao identity", () => {
  it("PACKAGE_NAME", () => expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao"));
  it("UPSTREAM_PACKAGE", () => expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/api@1.9.1"));
});
