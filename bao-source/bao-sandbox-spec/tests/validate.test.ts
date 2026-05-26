import { describe, expect, test } from "bun:test";
import { validateManifest } from "../src/validate.ts";

const minimal = {
  tier: "B1",
  intent: "build",
  rootfs: { base: "bao-toolchain:1" },
  mounts: [{ src: "./", dst: "/work", mode: "ro" }],
  net: { mode: "none" },
  syscalls: { default: "errno", errno: 1, allow: ["read", "write", "openat"] },
  resources: { cpuMilli: 2000, memMiB: 1024, pidLimit: 256 },
};

describe("validateManifest", () => {
  test("accepts a minimal valid manifest", () => {
    const out = validateManifest(minimal);
    expect(out.ok).toBe(true);
    if (!out.ok) return;
    expect(out.manifest.tier).toBe("B1");
    expect(out.manifest.resources.cpuMilli).toBe(2000);
  });

  test("rejects unknown tier", () => {
    const out = validateManifest({ ...minimal, tier: "X9" });
    expect(out.ok).toBe(false);
    if (out.ok) return;
    expect(out.path).toBe("$.tier");
  });

  test("rejects relative mount.dst", () => {
    const out = validateManifest({ ...minimal, mounts: [{ src: "x", dst: "rel", mode: "ro" }] });
    expect(out.ok).toBe(false);
  });

  test("rejects egress-allowlist with no entries", () => {
    const out = validateManifest({ ...minimal, net: { mode: "egress-allowlist", egress: [] } });
    expect(out.ok).toBe(false);
  });

  test("rejects out-of-range port", () => {
    const out = validateManifest({
      ...minimal,
      net: { mode: "egress-allowlist", egress: [{ host: "x", port: 0, protocol: "tcp" }] },
    });
    expect(out.ok).toBe(false);
  });

  test("accepts landlock block", () => {
    const out = validateManifest({
      ...minimal,
      landlock: {
        abi: 9,
        fs: [{ path: "/work", access: ["read-file", "read-dir"] }],
        net: [{ port: 443, access: ["connect-tcp"] }],
      },
    });
    expect(out.ok).toBe(true);
  });

  test("rejects negative resources", () => {
    expect(
      validateManifest({ ...minimal, resources: { cpuMilli: 0, memMiB: 1, pidLimit: 1 } }).ok,
    ).toBe(false);
  });
});
