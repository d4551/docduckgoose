/**
 * Unit tests for the shared brand context surface.
 */

import { afterEach, describe, expect, it } from "bun:test";
import {
  BRAND_THEME_TOKEN_FIELDS,
  type BrandContext,
  buildDefaultBrandContext,
  configureBrandContextFallbackResolver,
  DEFAULT_BRAND_PROFILE_ID,
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  getCurrentBrandContext,
  peekCurrentBrandContext,
  resolvePrimaryOrigin,
  runWithBrandContext,
} from "./brand";

const TEST_BASE_URL = "https://platform.example.com";

afterEach(() => {
  configureBrandContextFallbackResolver(null);
});

describe("brand context", () => {
  it("builds a default brand context derived from the configured base URL", () => {
    const brandContext = buildDefaultBrandContext(TEST_BASE_URL);

    expect(brandContext.profileId).toBe(DEFAULT_BRAND_PROFILE_ID);
    expect(brandContext.partyId).toBeNull();
    expect(brandContext.isDefault).toBe(true);
    expect(brandContext.primaryHostname).toBe("platform.example.com");
    expect(brandContext.activeHostname).toBe("platform.example.com");
    expect(brandContext.requestOrigin).toBe(TEST_BASE_URL);
    expect(brandContext.lightTheme).toBe(DEFAULT_LIGHT_THEME);
    expect(brandContext.darkTheme).toBe(DEFAULT_DARK_THEME);
  });

  it("exposes every theme token field on both default themes", () => {
    for (const field of BRAND_THEME_TOKEN_FIELDS) {
      expect(typeof DEFAULT_LIGHT_THEME[field]).toBe("string");
      expect(typeof DEFAULT_DARK_THEME[field]).toBe("string");
    }
  });

  it("uses the fallback resolver when no scoped brand context is configured", () => {
    const brandContext = buildDefaultBrandContext(TEST_BASE_URL);
    configureBrandContextFallbackResolver(() => brandContext);
    expect(peekCurrentBrandContext()).toBeNull();
    expect(getCurrentBrandContext()).toBe(brandContext);
  });

  it("propagates the scoped brand context through the AsyncLocalStorage seam", () => {
    const baseBrandContext = buildDefaultBrandContext(TEST_BASE_URL);
    const scopedBrandContext: BrandContext = {
      ...baseBrandContext,
      profileId: "scoped-brand-profile",
      displayName: "Scoped Display Name",
    };

    const result = runWithBrandContext(scopedBrandContext, () => ({
      peeked: peekCurrentBrandContext(),
      current: getCurrentBrandContext(),
    }));
    expect(result.peeked).toBe(scopedBrandContext);
    expect(result.current).toBe(scopedBrandContext);
    expect(peekCurrentBrandContext()).toBeNull();
  });

  it("resolves the canonical origin and respects non-default ports", () => {
    const baseBrandContext = buildDefaultBrandContext(TEST_BASE_URL);
    expect(
      resolvePrimaryOrigin({
        primaryHostname: baseBrandContext.primaryHostname,
        requestOrigin: baseBrandContext.requestOrigin,
      }),
    ).toBe("https://platform.example.com");

    expect(
      resolvePrimaryOrigin({
        primaryHostname: "platform.example.com",
        requestOrigin: "http://platform.example.com:8080/path",
      }),
    ).toBe("http://platform.example.com:8080");

    expect(
      resolvePrimaryOrigin({
        primaryHostname: "platform.example.com",
        requestOrigin: "not-a-url",
      }),
    ).toBe("https://platform.example.com");
  });
});
