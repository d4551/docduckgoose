import { describe, expect, it } from "bun:test";
import { baggageEntryMetadataFromString, PACKAGE_NAME, UPSTREAM_PACKAGE } from "../src/baggage.ts";

describe("./baggage seam", () => {
  it("re-exports baggageEntryMetadataFromString", () => {
    const meta = baggageEntryMetadataFromString("propagation=w3c");
    expect(meta.toString()).toBe("propagation=w3c");
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/api@1.9.1");
  });
});
