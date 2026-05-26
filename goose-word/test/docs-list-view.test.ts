import { describe, expect, it } from "bun:test";
import { parseDocsListQuery } from "../src/http/docs-query.ts";
import { renderDocsListPanel } from "../src/http/html/docs-list-view.ts";
import type { DocRecord } from "../src/services/doc-store.ts";

const defaultQuery = parseDocsListQuery({});

const makeDoc = (overrides: Partial<DocRecord> = {}): DocRecord => ({
  id: overrides.id ?? crypto.randomUUID(),
  title: overrides.title ?? "Test Doc",
  body: overrides.body ?? "body content",
  slug: overrides.slug ?? "test-doc",
  updatedAt: overrides.updatedAt ?? new Date().toISOString(),
  filePath: overrides.filePath ?? "/tmp/test-doc.md",
});

describe("renderDocsListPanel", () => {
  it("renders one row per doc on the page", () => {
    const docs = [makeDoc(), makeDoc(), makeDoc()];
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, docs.length);
    const rowCount = (html.match(/<tr class="hover gw-row-enter"/g) ?? []).length;
    expect(rowCount).toBe(3);
  });

  it("uses server pagination controls instead of infinite scroll", () => {
    const docs = Array.from({ length: 20 }, () => makeDoc());
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, 45);
    expect(html).toContain("gw-docs-pagination");
    expect(html).not.toContain("gw-scroll-sentinel");
    expect(html).toContain("Next");
  });

  it("page two link preserves sort and search", () => {
    const query = parseDocsListQuery({ page: "2", q: "alpha", sort: "title", dir: "asc" });
    const html = renderDocsListPanel("en", [], [], [], query, 30);
    expect(html).toContain('hx-get="/docs?q=alpha&amp;sort=title&amp;dir=asc"');
  });

  it("escapes HTML in doc title", () => {
    const docs = [makeDoc({ title: '<script>alert("xss")</script>' })];
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, docs.length);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("includes doc edit link with correct id", () => {
    const id = "abc-def-123";
    const docs = [makeDoc({ id })];
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, docs.length);
    expect(html).toContain(`/docs/${id}`);
  });

  it("includes delete toggle for each doc", () => {
    const id = "del-test-id";
    const docs = [makeDoc({ id })];
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, docs.length);
    expect(html).toContain(`data-delete-href="/docs/${id}/delete"`);
  });

  it("renders sortable table headers with aria-sort", () => {
    const docs = [makeDoc()];
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, docs.length);
    expect(html).toContain('aria-sort="descending"');
    expect(html).toContain("sort=title");
  });

  it("renders user templates with delete action", () => {
    const docs = [makeDoc()];
    const html = renderDocsListPanel(
      "en",
      docs,
      [],
      [
        {
          id: "template-1",
          title: "Saved starter",
          description: "Reusable draft",
          body: "# Starter",
          draftStyle: "notes",
          updatedAt: "2026-05-26T00:00:00.000Z",
        },
      ],
      defaultQuery,
      docs.length,
    );
    expect(html).toContain("Saved starter");
    expect(html).toContain("/docs/new?template=user%3Atemplate-1");
    expect(html).toContain("/templates/template-1/delete");
    expect(html).toContain("/templates/template-1/edit");
    expect(html).not.toContain("Reusable draft</span>");
  });

  it("rows use gw-row-enter class for entrance animation", () => {
    const docs = [makeDoc(), makeDoc(), makeDoc()];
    const html = renderDocsListPanel("en", docs, [], [], defaultQuery, docs.length);
    expect(html).toContain("gw-row-enter");
    expect(html).not.toContain("animation-delay:");
  });
});
