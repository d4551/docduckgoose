import { describe, expect, test } from "bun:test";
import { evaluateAuthPolicy, sessionCreationPolicyFromAuth } from "./auth-policy.ts";

describe("auth-policy", () => {
  test("blocks session when auth-bao is not loaded", () => {
    const registry = { get: () => undefined };
    const evaluation = evaluateAuthPolicy(registry, { packageNotLoaded: "auth-bao not loaded" });
    expect(evaluation.sessionAllowed).toBe(false);
    expect(evaluation.blockedReason).toBe("auth-bao not loaded");
  });

  test("allows session when auth-bao is loaded", () => {
    const registry = {
      get: (id: string) =>
        id === "auth-bao" ? { loaded: true, packageName: "auth-bao", governance: {} } : undefined,
    };
    const result = sessionCreationPolicyFromAuth(registry, { packageNotLoaded: "missing" });
    expect(result.ok).toBe(true);
  });
});
