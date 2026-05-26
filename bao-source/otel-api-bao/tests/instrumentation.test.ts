import { describe, expect, it } from "bun:test";
import {
  InstrumentationBase,
  PACKAGE_NAME,
  registerInstrumentations,
  UPSTREAM_PACKAGE,
} from "../src/instrumentation.ts";

describe("./instrumentation seam", () => {
  it("re-exports InstrumentationBase + registerInstrumentations", () => {
    expect(typeof InstrumentationBase).toBe("function");
    expect(typeof registerInstrumentations).toBe("function");
  });

  it("identity constants", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/otel-api-bao");
    expect(UPSTREAM_PACKAGE).toBe("@opentelemetry/instrumentation@0.214.0");
  });
});
