import { describe, expect, test } from "bun:test";
import {
  buildComputerUseRunnerArgv,
  buildComputerUseSandboxManifest,
  COMPUTER_USE_BROWSER_PACKAGE_NAME,
  COMPUTER_USE_OWNER_SURFACES,
  COMPUTER_USE_RUNNER_PATH,
  COMPUTER_USE_SCREENSHOT_PATH,
  isComputerUseOwnerSurface,
} from "./computer-use.ts";

describe("computer-use contract", () => {
  test("builds a B2 browser sandbox manifest for loopback targets", () => {
    const manifest = buildComputerUseSandboxManifest({
      targetUrl: "http://localhost:3000/packages",
      viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    });

    expect(manifest.tier).toBe("B2");
    expect(manifest.intent).toBe("shell");
    expect(manifest.rootfs.base).toBe(COMPUTER_USE_BROWSER_PACKAGE_NAME);
    expect(manifest.net.mode).toBe("loopback");
    expect(manifest.entrypoint).toBe(COMPUTER_USE_RUNNER_PATH);
    expect(manifest.env?.map((entry) => entry.name)).toContain(
      "BAO_COMPUTER_USE_DEVICE_SCALE_FACTOR",
    );
  });

  test("builds an egress allowlist for external targets", () => {
    const manifest = buildComputerUseSandboxManifest({
      targetUrl: "https://example.com/docs",
    });

    expect(manifest.net).toEqual({
      mode: "egress-allowlist",
      egress: [{ host: "example.com", port: 443, protocol: "tcp" }],
    });
  });

  test("builds runner argv without route or command drift", () => {
    expect(
      buildComputerUseRunnerArgv({
        targetUrl: "http://localhost:3002/api-explorer",
        viewport: { width: 1024, height: 768 },
        fullPage: true,
      }),
    ).toEqual([
      "bun",
      COMPUTER_USE_RUNNER_PATH,
      "screenshot",
      "--url",
      "http://localhost:3002/api-explorer",
      "--output",
      COMPUTER_USE_SCREENSHOT_PATH,
      "--width",
      "1024",
      "--height",
      "768",
      "--scale",
      "1",
      "--full-page",
    ]);
  });

  test("uses the shared owner-surface contract for Forge and .bao Registry visual runs", () => {
    expect(COMPUTER_USE_OWNER_SURFACES).toContain("forge");
    expect(COMPUTER_USE_OWNER_SURFACES).toContain("bao-registry");
    expect(isComputerUseOwnerSurface("bao-registry")).toBe(true);
    expect(isComputerUseOwnerSurface("registry")).toBe(false);
  });
});
