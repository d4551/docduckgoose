import { afterEach, describe, expect, it } from "bun:test";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { nativeMobileShellRegistry } from "@baohaus/contribution-registry-bao/native-mobile-shell-registry";
import { installNativeMobileShellFromPackage } from "../src/install/native-mobile-shell-mount.ts";

describe("installNativeMobileShellFromPackage", () => {
  const dir = join(tmpdir(), `gw-shell-${crypto.randomUUID()}`);

  afterEach(() => {
    nativeMobileShellRegistry.resetForTests();
    rmSync(dir, { recursive: true, force: true });
  });

  it("installs android and ios targets via canonical handler", async () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "bao-governance.json"),
      JSON.stringify({
        id: "goose-word-native-shell-bao",
        targets: [
          {
            kind: "native-mobile-shell",
            target: "goose-word-android-shell",
            platform: "android",
            serverMode: "embedded",
            loopbackHost: "127.0.0.1",
            loopbackPort: 8080,
            healthPath: "/api/health",
            dataDirEnvKey: "GOOSE_WORD_DATA_DIR",
            binaryAssetRef: "assets/goose-word-android-arm64",
            iconSetRef: "goose-word-brand",
          },
          {
            kind: "native-mobile-shell",
            target: "goose-word-ios-shell",
            platform: "ios",
            serverMode: "embedded",
            loopbackHost: "127.0.0.1",
            loopbackPort: 8080,
            healthPath: "/api/health",
            dataDirEnvKey: "GOOSE_WORD_DATA_DIR",
            iconSetRef: "goose-word-brand",
          },
        ],
      }),
    );
    const count = await installNativeMobileShellFromPackage(dir);
    expect(count).toBe(2);
    const shells = nativeMobileShellRegistry.snapshot();
    expect(shells.some((s) => s.platform === "android")).toBe(true);
    expect(shells.some((s) => s.platform === "ios")).toBe(true);
  });
});
