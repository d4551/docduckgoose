import { describe, expect, test } from "bun:test";
import { compileManifest } from "../src/compile.ts";
import type { BaoSandboxManifest } from "../src/schema.ts";

const manifest: BaoSandboxManifest = {
  tier: "B1",
  intent: "build",
  rootfs: { base: "bao-toolchain:1" },
  mounts: [{ src: "./", dst: "/work", mode: "ro" }],
  net: { mode: "none" },
  syscalls: { default: "errno", errno: 1, allow: ["read", "write", "openat", "exit_group"] },
  resources: { cpuMilli: 2000, memMiB: 1024, pidLimit: 256 },
};

describe("compileManifest", () => {
  test("compiles to seccomp + limits without landlock", () => {
    const out = compileManifest(manifest, { arch: "x86_64" });
    expect(out.ok).toBe(true);
    if (!out.ok) {
      return;
    }
    expect(out.artefacts.seccomp.arch).toBe("x86_64");
    expect(out.artefacts.seccomp.rules.length).toBe(4);
    expect(out.artefacts.seccomp.defaultResult.action).toBe("errno");
    expect(out.artefacts.limits.cpuMilli).toBe(2000);
    expect(out.artefacts.landlock).toBeUndefined();
  });

  test("compiles landlock fs+net masks correctly", () => {
    const out = compileManifest(
      {
        ...manifest,
        landlock: {
          abi: 9,
          fs: [{ path: "/work", access: ["read-file", "read-dir"] }],
          net: [{ port: 443, access: ["connect-tcp"] }],
        },
      },
      { arch: "x86_64" },
    );
    expect(out.ok).toBe(true);
    if (!out.ok) {
      return;
    }
    const ll = out.artefacts.landlock;
    expect(ll).toBeDefined();
    if (!ll) {
      return;
    }
    expect(ll.handledAccessFs).toBe((1n << 2n) | (1n << 3n));
    expect(ll.handledAccessNet).toBe(1n << 1n);
    expect(ll.rules.length).toBe(2);
  });

  test("kill-process default action propagates", () => {
    const out = compileManifest(
      { ...manifest, syscalls: { default: "kill-process" } },
      { arch: "x86_64" },
    );
    expect(out.ok).toBe(true);
    if (!out.ok) {
      return;
    }
    expect(out.artefacts.seccomp.defaultResult.action).toBe("kill-process");
  });
});
