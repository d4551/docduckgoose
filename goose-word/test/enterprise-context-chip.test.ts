import { afterEach, describe, expect, it } from "bun:test";
import { renderEnterpriseContextChip } from "../src/http/html/enterprise-context-chip.ts";
import {
  clearGooseWordContributionSurfaces,
  gooseWordContributionSurfaces,
  setActiveEnterpriseContext,
} from "../src/install/contribution-surfaces.ts";

afterEach(() => {
  clearGooseWordContributionSurfaces();
});

const registerSampleContexts = (): void => {
  gooseWordContributionSurfaces.enterpriseContext.register({
    id: "ctx-a",
    extensionId: "test-bao",
    labelKey: "enterprise.context.writingInsights.personal",
    type: "user",
  });
  gooseWordContributionSurfaces.enterpriseContext.register({
    id: "ctx-b",
    extensionId: "test-bao",
    labelKey: "enterprise.context.writingInsights.admin",
    type: "admin",
  });
  gooseWordContributionSurfaces.enterpriseContext.register({
    id: "ctx-c",
    extensionId: "test-bao",
    labelKey: "enterprise.context.writingInsights.corp",
    type: "enterprise",
  });
};

describe("renderEnterpriseContextChip", () => {
  it("renders dropdown with HTMX switch when multiple contexts exist", () => {
    registerSampleContexts();
    setActiveEnterpriseContext("ctx-b");
    const html = renderEnterpriseContextChip("en");
    expect(html).toContain('id="gw-enterprise-chip"');
    expect(html).toContain("dropdown dropdown-end");
    expect(html).toContain('hx-post="/fragments/enterprise-context/switch/ctx-a"');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain("Admin");
    expect(html).not.toContain('href="/settings" class="btn btn-ghost');
  });

  it("uses gw-topbar-context trigger classes for alignment", () => {
    registerSampleContexts();
    const html = renderEnterpriseContextChip("en");
    expect(html).toContain("gw-topbar-context__trigger");
    expect(html).toContain('role="menu"');
  });
});
