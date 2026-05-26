import { afterEach, describe, expect, it } from "bun:test";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import { renderPageShell } from "../src/http/html/layout.ts";
import { closeUserPrefsStore, resetUserPrefsStoreForTests } from "../src/services/user-prefs.ts";

const tempDb = (): string =>
  join(import.meta.dir, `.prefs-shell-test-${crypto.randomUUID()}.sqlite`);

afterEach(() => {
  closeUserPrefsStore();
});

const renderTestShell = (): string => {
  const dbPath = tempDb();
  resetUserPrefsStoreForTests(dbPath);
  const html = renderPageShell({
    locale: "en",
    titleKey: "docs.title",
    bodyHtml: "<p>test</p>",
    activeNav: "docs",
  });
  closeUserPrefsStore();
  unlinkSync(dbPath);
  return html;
};

describe("renderPageShell HTML output", () => {
  it("produces a valid DOCTYPE", () => {
    const html = renderTestShell();
    expect(html.trimStart().startsWith("<!DOCTYPE html>")).toBe(true);
  });

  it("contains exactly one .bao-glass element (the dock nav)", () => {
    const html = renderTestShell();
    const baoGlassMatches = html.match(/class="[^"]*\bbao-glass\b[^"]*"/g);
    const filtered = (baoGlassMatches ?? []).filter((m) => !m.includes("bao-glass__content"));
    expect(filtered.length).toBe(1);
  });

  it("all .bao-glass__content elements exist (dock items)", () => {
    const html = renderTestShell();
    const contentMatches = html.match(/bao-glass__content/g);
    expect(contentMatches).not.toBeNull();
    expect(contentMatches?.length ?? 0).toBeGreaterThanOrEqual(2);
  });

  it("SVG filter #bao-glass-lens is present", () => {
    const html = renderTestShell();
    expect(html).toContain('id="bao-glass-lens"');
  });

  it("SVG filter contains feDisplacementMap", () => {
    const html = renderTestShell();
    expect(html).toContain("feDisplacementMap");
  });

  it("SVG filter contains feTurbulence", () => {
    const html = renderTestShell();
    expect(html).toContain("feTurbulence");
  });

  it("no inline backdrop-filter styles in HTML output", () => {
    const html = renderTestShell();
    expect(html).not.toMatch(/style="[^"]*backdrop-filter/);
  });

  it("dock nav has aria-label", () => {
    const html = renderTestShell();
    const navMatch = html.match(/<nav[^>]*aria-label="[^"]+"/);
    expect(navMatch).not.toBeNull();
  });

  it("dock anchors have aria-label attributes", () => {
    const html = renderTestShell();
    const dockSection = html.slice(html.indexOf("<nav"));
    const anchors = dockSection.match(/<a [^>]*>/g) ?? [];
    expect(anchors.length).toBeGreaterThanOrEqual(2);
    for (const anchor of anchors) {
      expect(anchor).toContain("aria-label=");
    }
  });

  it("html tag has lang attribute set to locale", () => {
    const html = renderTestShell();
    expect(html).toMatch(/<html[^>]*\slang="en"/);
  });

  it("html tag has data-theme attribute", () => {
    const html = renderTestShell();
    expect(html).toMatch(/<html[^>]*\sdata-theme="/);
  });

  it("html tag has data-bao-ui-tokens attribute", () => {
    const html = renderTestShell();
    expect(html).toMatch(/<html[^>]*\sdata-bao-ui-tokens="baohaus-aurora"/);
  });

  it("contains main element with id gw-main", () => {
    const html = renderTestShell();
    expect(html).toContain('id="gw-main"');
  });

  it("body content is injected into main", () => {
    const html = renderTestShell();
    expect(html).toContain("<p>test</p>");
  });

  it("active nav item has aria-current=page", () => {
    const html = renderTestShell();
    expect(html).toContain('aria-current="page"');
  });

  it("includes goose chibi mascot with role=img", () => {
    const html = renderTestShell();
    expect(html).toContain('role="img"');
    expect(html).toContain("gw-goose-chibi");
  });

  it("offline toast output has role=status and aria-live", () => {
    const html = renderTestShell();
    const toastMatch = html.match(/<output[^>]*id="gw-offline-toast"[^>]*/);
    expect(toastMatch).not.toBeNull();
    const toastOutput = toastMatch?.[0] ?? "";
    expect(toastOutput).toContain('role="status"');
    expect(toastOutput).toContain('aria-live="polite"');
  });
});
