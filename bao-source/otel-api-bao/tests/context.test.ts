import { describe, expect, it } from "bun:test";
import {
  context,
  createContextKey,
  PACKAGE_NAME,
  propagation,
  ROOT_CONTEXT,
  UPSTREAM_PACKAGE,
  W3CTraceContextPropagator,
} from "../src/context.ts";

describe("./context seam", () => {
  it("re-exports context + propagation singletons", () => {
    expect(typeof context.active).toBe("function");
    expect(typeof propagation.extract).toBe("function");
    expect(typeof propagation.inject).toBe("function");
  });

  it("re-exports ROOT_CONTEXT + createContextKey", () => {
    expect(ROOT_CONTEXT).toBeDefined();
    const key = createContextKey("seam-test");
    expect(typeof key).toBe("symbol");
  });

  it("re-exports W3CTraceContextPropagator constructor", () => {
    const p = new W3CTraceContextPropagator();
    expect(typeof p.extract).toBe("function");
    expect(typeof p.inject).toBe("function");
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/api@1.9.1");
  });
});
