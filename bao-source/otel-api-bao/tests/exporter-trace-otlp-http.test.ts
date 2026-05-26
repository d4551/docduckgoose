import { describe, expect, it } from "bun:test";
import {
  OTLPTraceExporter,
  PACKAGE_NAME,
  UPSTREAM_PACKAGE,
} from "../src/exporter-trace-otlp-http.ts";

describe("./exporter-trace-otlp-http seam", () => {
  it("re-exports OTLPTraceExporter constructor", () => {
    expect(typeof OTLPTraceExporter).toBe("function");
    const inst = new OTLPTraceExporter({ url: "http://localhost:4318/v1/traces" });
    expect(typeof inst.export).toBe("function");
    expect(typeof inst.shutdown).toBe("function");
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/exporter-trace-otlp-http@0.214.0");
  });
});
