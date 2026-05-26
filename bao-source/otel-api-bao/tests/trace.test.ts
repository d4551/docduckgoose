import { describe, expect, it } from "bun:test";
import {
  context,
  PACKAGE_NAME,
  SpanKind,
  SpanStatusCode,
  trace,
  UPSTREAM_PACKAGE,
} from "../src/trace.ts";

describe("./trace seam", () => {
  it("re-exports trace + context", () => {
    expect(typeof trace.getTracer).toBe("function");
    expect(typeof context.active).toBe("function");
  });

  it("re-exports SpanKind enum-like", () => {
    expect(SpanKind.INTERNAL).toBeDefined();
    expect(SpanKind.SERVER).toBeDefined();
  });

  it("re-exports SpanStatusCode", () => {
    expect(SpanStatusCode.OK).toBeDefined();
    expect(SpanStatusCode.ERROR).toBeDefined();
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/api@1.9.1");
  });
});
