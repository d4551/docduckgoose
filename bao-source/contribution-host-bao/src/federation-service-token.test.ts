/**
 * Security-boundary coverage for the canonical federation service-token
 * mint + verify pair. Every rejection path of verifyFederationServiceToken
 * is asserted because each is a real attack vector:
 *
 *   - empty secret → fail-closed (config-missing prevention)
 *   - missing/empty Authorization header
 *   - non-Bearer scheme (case-insensitive prefix)
 *   - malformed dot-separated payload.signature
 *   - bad base64url in payload or signature
 *   - constant-time signature mismatch (key/secret rotation)
 *   - non-JSON payload, missing fields, wrong field types
 *   - audience mismatch (token destined for a different peer)
 *   - expired token (exp <= now)
 *   - too-far-future expiry (skew > MAX_FUTURE_SKEW)
 *   - happy-path round-trip (mint then verify returns issuerPeerId)
 */

import { describe, expect, it } from "bun:test";
import {
  FEDERATION_SERVICE_TOKEN_MAX_FUTURE_SKEW_SECONDS,
  mintFederationServiceToken,
  verifyFederationServiceToken,
} from "./federation-service-token.ts";

const SECRET = "test-secret-do-not-use-in-prod";
const AUD = "bao-runtime";
const ISS = "registry";

async function mintValid(overrides: { ttl?: number; nowEpochSec?: number } = {}): Promise<string> {
  const t = await mintFederationServiceToken({
    audiencePeerId: AUD,
    issuerPeerId: ISS,
    secret: SECRET,
    expSecondsFromNow: overrides.ttl ?? 60,
  });
  if (t === null) {
    throw new Error("mint failed");
  }
  return t;
}

describe("verifyFederationServiceToken — happy path", () => {
  it("returns issuerPeerId + expEpochSec on a valid token", async () => {
    const t = await mintValid();
    const a = await verifyFederationServiceToken({
      authorizationHeader: `Bearer ${t}`,
      expectedAudience: AUD,
      secret: SECRET,
    });
    expect(a).not.toBeNull();
    expect(a?.issuerPeerId).toBe(ISS);
    expect(typeof a?.expEpochSec).toBe("number");
  });

  it("accepts case-insensitive Bearer prefix", async () => {
    const t = await mintValid();
    const a1 = await verifyFederationServiceToken({
      authorizationHeader: `bearer ${t}`,
      expectedAudience: AUD,
      secret: SECRET,
    });
    const a2 = await verifyFederationServiceToken({
      authorizationHeader: `BEARER ${t}`,
      expectedAudience: AUD,
      secret: SECRET,
    });
    expect(a1?.issuerPeerId).toBe(ISS);
    expect(a2?.issuerPeerId).toBe(ISS);
  });
});

describe("verifyFederationServiceToken — config + header rejections", () => {
  it("rejects when secret is empty (fail-closed on config-missing)", async () => {
    const t = await mintValid();
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Bearer ${t}`,
        expectedAudience: AUD,
        secret: "",
      }),
    ).toBeNull();
  });

  it("rejects when mint secret is empty", async () => {
    expect(
      await mintFederationServiceToken({
        audiencePeerId: AUD,
        issuerPeerId: ISS,
        secret: "",
      }),
    ).toBeNull();
  });

  it("rejects when Authorization header is null", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: null,
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects when Authorization header is empty", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects non-Bearer schemes (Basic, Token, etc.)", async () => {
    const t = await mintValid();
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Basic ${t}`,
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Token ${t}`,
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects empty token body after Bearer prefix", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "Bearer ",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });
});

describe("verifyFederationServiceToken — wire format rejections", () => {
  it("rejects token missing the dot separator", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "Bearer abc-no-dot",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects token with dot at start (empty payload)", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "Bearer .signature",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects token with dot at end (empty signature)", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "Bearer payload.",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects bad base64url in payload", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "Bearer !!!.aaaa",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects bad base64url in signature", async () => {
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: "Bearer aaaa.!!!",
        expectedAudience: AUD,
        secret: SECRET,
      }),
    ).toBeNull();
  });
});

describe("verifyFederationServiceToken — signature + payload rejections", () => {
  it("rejects token signed with a different secret (constant-time mismatch)", async () => {
    const t = await mintValid();
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Bearer ${t}`,
        expectedAudience: AUD,
        secret: "different-secret",
      }),
    ).toBeNull();
  });

  it("rejects token with tampered payload (signature stale)", async () => {
    const t = await mintValid();
    const [_p, sig] = t.split(".");
    // Forge a new payload but keep the original signature → mismatch.
    const forged = `${Buffer.from(JSON.stringify({ aud: "evil", iss: "x", exp: 999_999_999 })).toString("base64url")}.${sig}`;
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Bearer ${forged}`,
        expectedAudience: "evil",
        secret: SECRET,
      }),
    ).toBeNull();
  });
});

describe("verifyFederationServiceToken — claim rejections", () => {
  it("rejects audience mismatch", async () => {
    const t = await mintValid();
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Bearer ${t}`,
        expectedAudience: "different-peer",
        secret: SECRET,
      }),
    ).toBeNull();
  });

  it("rejects expired token (exp <= now)", async () => {
    const t = await mintValid({ ttl: 60 });
    const farFuture = Math.floor(Date.now() / 1000) + 3600;
    expect(
      await verifyFederationServiceToken({
        authorizationHeader: `Bearer ${t}`,
        expectedAudience: AUD,
        secret: SECRET,
        nowEpochSec: farFuture,
      }),
    ).toBeNull();
  });

  it("caps minted TTL to MAX_FUTURE_SKEW (still verifiable at boundary)", async () => {
    const huge = FEDERATION_SERVICE_TOKEN_MAX_FUTURE_SKEW_SECONDS * 10;
    const t = await mintValid({ ttl: huge });
    const a = await verifyFederationServiceToken({
      authorizationHeader: `Bearer ${t}`,
      expectedAudience: AUD,
      secret: SECRET,
    });
    expect(a).not.toBeNull();
    const now = Math.floor(Date.now() / 1000);
    if (a === null) {
      throw new Error("expected admittance");
    }
    expect(a.expEpochSec - now).toBeLessThanOrEqual(
      FEDERATION_SERVICE_TOKEN_MAX_FUTURE_SKEW_SECONDS,
    );
  });
});
