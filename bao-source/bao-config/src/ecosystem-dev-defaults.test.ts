import { describe, expect, test } from "bun:test";
import {
  ECOSYSTEM_DEV_BAO_AI_GATEWAY_BASE_URL,
  ECOSYSTEM_DEV_PORTS,
  ECOSYSTEM_DEV_SSO_TRUSTED_ORIGINS,
  ecosystemDevOAuthRedirectUri,
  ecosystemDevOrigin,
} from "./ecosystem-dev-defaults.ts";

describe("ecosystem-dev-defaults", () => {
  test("exposes stable local dev ports", () => {
    expect(ECOSYSTEM_DEV_PORTS.registry).toBe(3000);
    expect(ECOSYSTEM_DEV_PORTS.forge).toBe(3002);
    expect(ECOSYSTEM_DEV_PORTS.baoRuntime).toBe(3010);
    expect(ECOSYSTEM_DEV_PORTS.baoAiGateway).toBe(11435);
  });

  test("builds localhost origins without trailing slash", () => {
    expect(ecosystemDevOrigin("registry")).toBe("http://localhost:3000");
    expect(ecosystemDevOrigin("baoRuntime")).toBe("http://localhost:3010");
    expect(ecosystemDevOrigin("ollama")).toBe("http://localhost:11434");
  });

  test("builds gateway base URL with /v1 suffix", () => {
    expect(ECOSYSTEM_DEV_BAO_AI_GATEWAY_BASE_URL).toBe("http://localhost:11435/v1");
  });

  test("lists SSO trusted origins for localhost and loopback", () => {
    expect(ECOSYSTEM_DEV_SSO_TRUSTED_ORIGINS).toContain("http://localhost:3000");
    expect(ECOSYSTEM_DEV_SSO_TRUSTED_ORIGINS).toContain("http://127.0.0.1:3010");
  });

  test("builds OAuth redirect URIs for core services", () => {
    expect(ecosystemDevOAuthRedirectUri("registry")).toBe(
      "http://localhost:3000/api/auth/callback/oidc",
    );
    expect(ecosystemDevOAuthRedirectUri("forge")).toBe("http://localhost:3002/oauth/callback");
    expect(ecosystemDevOAuthRedirectUri("baoAiGateway")).toBe(
      "http://localhost:11435/auth/callback",
    );
  });
});
