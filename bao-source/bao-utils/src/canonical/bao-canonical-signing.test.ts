import { describe, expect, test } from "bun:test";
import { loadCanonicalArchiveSigningKey } from "./bao-canonical-signing";

describe("canonical archive signing key policy", () => {
  test("rejects missing private key when ephemeral signing is disabled", async () => {
    await expect(
      loadCanonicalArchiveSigningKey(undefined, { allowEphemeralPrivateKey: false }),
    ).rejects.toThrow("Archive signing requires a configured Ed25519 private JWK");
  });

  test("allows deliberate ephemeral signing for local verification", async () => {
    const signingKey = await loadCanonicalArchiveSigningKey(undefined, {
      allowEphemeralPrivateKey: true,
    });

    expect(signingKey.keyId.length).toBeGreaterThan(0);
  });
});
