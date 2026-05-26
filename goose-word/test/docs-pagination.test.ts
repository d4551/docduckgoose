import { describe, expect, it } from "bun:test";
import { parseDocsListQuery } from "../src/http/docs-query.ts";
import { renderDocsPagination } from "../src/http/html/docs-pagination.ts";

describe("renderDocsPagination", () => {
  it("renders prev/next when multiple pages exist", () => {
    const query = parseDocsListQuery({ page: "2" });
    const html = renderDocsPagination({ locale: "en", query, total: 45 });
    expect(html).toContain("gw-docs-pagination");
    expect(html).toContain("Previous");
    expect(html).toContain("Next");
    expect(html).toContain("Page 2");
    expect(html).toContain("/ 3");
    expect(html).toContain("Showing 21–40 of 45");
    expect(html).not.toContain("gw-scroll-sentinel");
  });

  it("disables previous on first page", () => {
    const query = parseDocsListQuery({});
    const html = renderDocsPagination({ locale: "en", query, total: 45 });
    expect(html).toContain('aria-disabled="true"');
    expect(html).toContain("Previous");
    expect(html).toContain('hx-get="/docs?page=2"');
  });

  it("renders summary only for a single page", () => {
    const query = parseDocsListQuery({});
    const html = renderDocsPagination({ locale: "en", query, total: 8 });
    expect(html).toContain("Showing 1–8 of 8");
    expect(html).not.toContain("Next");
  });
});
