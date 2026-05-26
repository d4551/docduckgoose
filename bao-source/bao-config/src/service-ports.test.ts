import { describe, expect, it } from "bun:test";
import {
  DEFAULT_PORTS,
  getDefaultPort,
  getPortFromEnv,
  requireDefaultPort,
} from "./service-ports.ts";

describe("service-ports", () => {
  it("exposes canonical BunBuddy default ports", () => {
    expect(DEFAULT_PORTS.basler).toBe(1891);
    expect(DEFAULT_PORTS.baoRuntime).toBeUndefined();
  });

  it("resolves infrastructure defaults", () => {
    expect(requireDefaultPort("redis")).toBe(6379);
    expect(requireDefaultPort("fhir")).toBe(8080);
    expect(getDefaultPort("minioConsole")).toBe(9001);
  });

  it("reads env overrides when present", () => {
    Bun.env.BASLER_BUNBUDDY_PORT = "1999";
    expect(getPortFromEnv("basler")).toBe(1999);
    delete Bun.env.BASLER_BUNBUDDY_PORT;
  });
});
