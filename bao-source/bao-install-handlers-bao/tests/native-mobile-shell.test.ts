import { beforeEach, describe, expect, it } from "bun:test";
import { ECOSYSTEM_CONTRIBUTION_SURFACE } from "@baohaus/ecosystem-events-bao/types";
import { NativeMobileShellTargetHandler } from "../src/native-mobile-shell.ts";
import { nativeMobileShellRegistry } from "../src/native-mobile-shell-registry.ts";

const testLogger = {
  info(): void {},
  warn(): void {},
  error(): void {},
};

const ANDROID_TARGET = {
  kind: "native-mobile-shell" as const,
  target: "goose-word-android",
  platform: "android" as const,
  serverMode: "embedded" as const,
  loopbackHost: "127.0.0.1",
  loopbackPort: 8080,
  healthPath: "/api/health",
  dataDirEnvKey: "GOOSE_WORD_DATA_DIR" as const,
  binaryAssetRef: "assets/goose-word-android-arm64",
  iconSetRef: "goose-word-brand",
};

describe("NativeMobileShellTargetHandler", () => {
  beforeEach(() => {
    nativeMobileShellRegistry.resetForTests();
  });

  it("installs android shell registration", async () => {
    const handler = new NativeMobileShellTargetHandler(testLogger);
    const result = await handler.install(ANDROID_TARGET);
    expect(result.ok).toBe(true);
    const rows = nativeMobileShellRegistry.snapshot();
    expect(rows.length).toBe(1);
    expect(rows[0]?.platform).toBe("android");
    expect(rows[0]?.offlineCapable).toBe(true);
  });

  it("rejects android without binaryAssetRef", async () => {
    const handler = new NativeMobileShellTargetHandler(testLogger);
    const { binaryAssetRef: _removed, ...rest } = ANDROID_TARGET;
    const result = await handler.install(rest);
    expect(result.ok).toBe(false);
  });

  it("surface constant is native-mobile-shell", () => {
    expect(ECOSYSTEM_CONTRIBUTION_SURFACE.nativeMobileShell).toBe("native-mobile-shell");
  });
});
