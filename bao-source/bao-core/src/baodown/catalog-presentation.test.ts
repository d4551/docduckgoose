import { describe, expect, test } from "bun:test";

import { resolveBaodownCatalogAccentToken } from "./catalog-presentation.ts";

describe("resolveBaodownCatalogAccentToken", () => {
  test("maps known category slugs to semantic tokens", () => {
    expect(resolveBaodownCatalogAccentToken("control", "control")).toBe("primary");
    expect(resolveBaodownCatalogAccentToken("ai", "control")).toBe("secondary");
    expect(resolveBaodownCatalogAccentToken("integration", "data")).toBe("warning");
  });

  test("falls back to edge kind when category slug is unknown", () => {
    expect(resolveBaodownCatalogAccentToken("general", "control")).toBe("primary");
    expect(resolveBaodownCatalogAccentToken("general", "data")).toBe("accent");
  });
});
