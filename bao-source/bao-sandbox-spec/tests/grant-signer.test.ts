import { describe, expect, test } from "bun:test";
import { signCapabilityGrant, verifyCapabilityGrant } from "../src/grant-signer.ts";
import type { CapabilityGrantBody } from "../src/negotiate.ts";

async function freshKeys(): Promise<{ sign: CryptoKey; verify: CryptoKey }> {
  const pair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
  return { sign: pair.privateKey, verify: pair.publicKey };
}

const baseBody = (): CapabilityGrantBody => ({
  id: "grant-001",
  packageId: "pkg-a@1.0.0",
  tenantId: "tenant-a",
  tier: "B1",
  resources: {
    cpuMilli: { request: 100, limit: 500, eviction: "hard" },
    memMiB: { request: 64, limit: 256, eviction: "hard" },
    pidLimit: { request: 4, limit: 16, eviction: "hard" },
    diskMiB: { request: 64, limit: 512, eviction: "hard" },
    concurrencyLimit: { request: 1, limit: 8, eviction: "hard" },
    requestsPerSecond: { request: 1, limit: 10, eviction: "hard" },
    wallClockMs: { request: 1_000, limit: 5_000, eviction: "hard" },
  },
  fs: [{ path: "/work", access: ["read", "write"] }],
  net: { mode: "loopback" },
  syscalls: ["read", "write"],
});

describe("signCapabilityGrant + verifyCapabilityGrant", () => {
  test("sign → verify happy path returns ok", async () => {
    const keys = await freshKeys();
    const issuedAt = new Date("2026-05-10T12:00:00.000Z").toISOString();
    const expiresAt = new Date("2026-05-10T13:00:00.000Z").toISOString();
    const body = baseBody();
    const signed = await signCapabilityGrant({
      body,
      issuedAt,
      expiresAt,
      signingKey: keys.sign,
      fs: body.fs,
      net: body.net,
    });
    expect(signed.ok).toBe(true);
    if (!signed.ok) {
      return;
    }
    const verified = await verifyCapabilityGrant({
      grant: signed.grant,
      tenantId: body.tenantId,
      verifyingKey: keys.verify,
      now: new Date("2026-05-10T12:30:00.000Z"),
    });
    expect(verified.ok).toBe(true);
  });

  test("expired grant fails verification", async () => {
    const keys = await freshKeys();
    const issuedAt = new Date("2026-05-10T11:00:00.000Z").toISOString();
    const expiresAt = new Date("2026-05-10T11:15:00.000Z").toISOString();
    const body = baseBody();
    const signed = await signCapabilityGrant({
      body,
      issuedAt,
      expiresAt,
      signingKey: keys.sign,
      fs: body.fs,
      net: body.net,
    });
    expect(signed.ok).toBe(true);
    if (!signed.ok) {
      return;
    }
    const verified = await verifyCapabilityGrant({
      grant: signed.grant,
      tenantId: body.tenantId,
      verifyingKey: keys.verify,
      now: new Date("2026-05-10T12:30:00.000Z"),
    });
    expect(verified.ok).toBe(false);
    if (!verified.ok) {
      expect(verified.reason).toBe("expired");
    }
  });

  test("tampered grant fails signature verification", async () => {
    const keys = await freshKeys();
    const issuedAt = new Date("2026-05-10T12:00:00.000Z").toISOString();
    const expiresAt = new Date("2026-05-10T13:00:00.000Z").toISOString();
    const body = baseBody();
    const signed = await signCapabilityGrant({
      body,
      issuedAt,
      expiresAt,
      signingKey: keys.sign,
      fs: body.fs,
      net: body.net,
    });
    expect(signed.ok).toBe(true);
    if (!signed.ok) {
      return;
    }
    const tampered = {
      ...signed.grant,
      resources: {
        ...signed.grant.resources,
        cpuMilli: { ...signed.grant.resources.cpuMilli, limit: 999_999 },
      },
    } as const;
    const verified = await verifyCapabilityGrant({
      grant: tampered,
      tenantId: body.tenantId,
      verifyingKey: keys.verify,
      now: new Date("2026-05-10T12:30:00.000Z"),
    });
    expect(verified.ok).toBe(false);
    if (!verified.ok) {
      expect(verified.reason).toBe("signature-invalid");
    }
  });

  test("wrong-key verification fails", async () => {
    const keys = await freshKeys();
    const otherKeys = await freshKeys();
    const issuedAt = new Date("2026-05-10T12:00:00.000Z").toISOString();
    const expiresAt = new Date("2026-05-10T13:00:00.000Z").toISOString();
    const body = baseBody();
    const signed = await signCapabilityGrant({
      body,
      issuedAt,
      expiresAt,
      signingKey: keys.sign,
      fs: body.fs,
      net: body.net,
    });
    expect(signed.ok).toBe(true);
    if (!signed.ok) {
      return;
    }
    const verified = await verifyCapabilityGrant({
      grant: signed.grant,
      tenantId: body.tenantId,
      verifyingKey: otherKeys.verify,
      now: new Date("2026-05-10T12:30:00.000Z"),
    });
    expect(verified.ok).toBe(false);
    if (!verified.ok) {
      expect(verified.reason).toBe("signature-invalid");
    }
  });
});
