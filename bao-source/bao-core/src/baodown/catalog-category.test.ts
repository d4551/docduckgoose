import { describe, expect, test } from "bun:test";

import {
  inferBaodownCatalogCategorySlugFromTypeId,
  resolveBaodownCatalogCategorySlug,
} from "./catalog-category.ts";

describe("resolveBaodownCatalogCategorySlug", () => {
  test("derives slug from categoryKey leaf segment", () => {
    expect(
      resolveBaodownCatalogCategorySlug(
        "baodown.ai.ai.confidence.filter",
        "baodownAiNodes.catalog.categories.ai",
      ),
    ).toBe("ai");
  });

  test("falls back to type id root segment", () => {
    expect(inferBaodownCatalogCategorySlugFromTypeId("control.start")).toBe("control");
    expect(inferBaodownCatalogCategorySlugFromTypeId("integration.rpa.executeWorkflow")).toBe(
      "integration",
    );
  });
});
