import { describe, expect, it } from "bun:test";

import { metrics, UPSTREAM_PACKAGE, ValueType } from "../src/metrics";

describe("metrics", () => {
  it("exports the Bao metrics API surface", () => {
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/api@1.9.1");
    expect(metrics.getMeter).toBeFunction();
    expect(ValueType.INT).toBe(0);
  });
});
