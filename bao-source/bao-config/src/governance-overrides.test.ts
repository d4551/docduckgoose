import { describe, expect, test } from "bun:test";
import { resolveEnvironmentDefaults, validateEnvironmentOverride } from "./governance-overrides";

describe("governance overrides", () => {
  test("rejects development-only keys in production-like environments", () => {
    expect(
      validateEnvironmentOverride("production", {
        DEV_AUTO_SIGN_IN: true,
        DEV_SEED_NAME: "Bao Dev",
        PORT: "3010",
      }),
    ).toEqual([
      {
        key: "DEV_AUTO_SIGN_IN",
        reason: "Key 'DEV_AUTO_SIGN_IN' is not permitted in 'production' environment.",
      },
      {
        key: "DEV_SEED_NAME",
        reason: "Key 'DEV_SEED_NAME' is not permitted in 'production' environment.",
      },
    ]);
  });

  test("resolves environment defaults without runtime access", () => {
    expect(resolveEnvironmentDefaults("development")).toMatchObject({
      NODE_ENV: "development",
      DEPLOYMENT_MODE: "CLOUD",
      AI_POLICY_MODE: "FULL_AUTONOMY",
    });
    expect(resolveEnvironmentDefaults("production")).toMatchObject({
      NODE_ENV: "production",
      DEPLOYMENT_MODE: "ON_PREM",
      AI_POLICY_MODE: "ADVISORY_ONLY",
    });
  });
});
