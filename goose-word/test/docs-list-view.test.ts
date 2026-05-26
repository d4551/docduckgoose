import { describe, expect, it } from "bun:test";
import { renderDocRowsFragment } from "../src/http/html/docs-list-view.ts";
import type { DocRecord } from "../src/services/doc-store.ts";

const makeDoc = (overrides: Partial<DocRecord> = {}): DocRecord => ({
  id: overrides.id ?? crypto.randomUUID(),
  title: overrides.title ?? "Test Doc",
  body: overrides.body ?? "body content",
  slug: overrides.slug ?? "test-doc",
  updatedAt: overrides.updatedAt ?? new Date().toISOString(),
  filePath: overrides.filePath ?? "/tmp/test-doc.md",
});

describe("renderDocRowsFragment", () => {
  it("renders one <tr> per doc", () => {
    const docs = [makeDoc(), makeDoc(), makeDoc()];
    const html = renderDocRowsFragment("en", docs, 0);
    const trCount = (html.match(/<tr\b/g) ?? []).length;
    expect(trCount).toBeGreaterThanOrEqual(3);
  });

  it("emits scroll sentinel when docs.length >= 20 (page size)", () => {
    const docs = Array.from({ length: 20 }, () => makeDoc());
    const html = renderDocRowsFragment("en", docs, 0);
    expect(html).toContain("gw-scroll-sentinel");
    expect(html).toContain("hx-get=");
    expect(html).toContain("hx-trigger=");
  });

  it("scroll sentinel URL contains correct offset", () => {
    const docs = Array.from({ length: 20 }, () => makeDoc());
    const html = renderDocRowsFragment("en", docs, 5);
    expect(html).toContain("offset=25");
  });

  it("omits scroll sentinel when docs.length < 20", () => {
    const docs = Array.from({ length: 19 }, () => makeDoc());
    const html = renderDocRowsFragment("en", docs, 0);
    expect(html).not.toContain("gw-scroll-sentinel");
  });

  it("returns empty string for empty docs array", () => {
    const html = renderDocRowsFragment("en", [], 0);
    expect(html).toBe("");
  });

  it("escapes HTML in doc title", () => {
    const docs = [makeDoc({ title: '<script>alert("xss")</script>' })];
    const html = renderDocRowsFragment("en", docs, 0);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("includes doc edit link with correct id", () => {
    const id = "abc-def-123";
    const docs = [makeDoc({ id })];
    const html = renderDocRowsFragment("en", docs, 0);
    expect(html).toContain(`/docs/${id}`);
  });

  it("includes delete link for each doc", () => {
    const id = "del-test-id";
    const docs = [makeDoc({ id })];
    const html = renderDocRowsFragment("en", docs, 0);
    expect(html).toContain(`/docs/${id}/delete`);
  });

  it("includes aria-label on action buttons", () => {
    const docs = [makeDoc()];
    const html = renderDocRowsFragment("en", docs, 0);
    const buttons = html.match(/<(a|button)[^>]*aria-label="[^"]+"/g) ?? [];
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders with ja locale", () => {
    const docs = [makeDoc()];
    const html = renderDocRowsFragment("ja", docs, 0);
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders with ko locale", () => {
    const docs = [makeDoc()];
    const html = renderDocRowsFragment("ko", docs, 0);
    expect(html.length).toBeGreaterThan(0);
  });

  it("rows have animation-delay style for staggered entrance", () => {
    const docs = [makeDoc(), makeDoc(), makeDoc()];
    const html = renderDocRowsFragment("en", docs, 0);
    expect(html).toContain("animation-delay:");
  });
});
