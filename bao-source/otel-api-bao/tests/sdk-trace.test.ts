import { describe, expect, it } from "bun:test";
import {
  BasicTracerProvider,
  BatchSpanProcessor,
  PACKAGE_NAME,
  SimpleSpanProcessor,
  UPSTREAM_PACKAGE,
} from "../src/sdk-trace.ts";

describe("./sdk-trace seam", () => {
  it("re-exports tracer provider + processors", () => {
    expect(typeof BasicTracerProvider).toBe("function");
    expect(typeof SimpleSpanProcessor).toBe("function");
    expect(typeof BatchSpanProcessor).toBe("function");
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/sdk-trace-base@2.6.1");
  });
});
