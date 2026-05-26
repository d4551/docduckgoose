import { describe, expect, test } from "bun:test";
import { renderMarkdown } from "../src/markdown/render.ts";

describe("renderMarkdown", () => {
  test("renders bold + code", () => {
    const out = renderMarkdown("**hi** `code`");
    expect(out).toContain("<strong>hi</strong>");
    expect(out).toContain("<code>code</code>");
  });

  test("strips script tags", () => {
    const out = renderMarkdown("hi<script>alert(1)</script>bye");
    expect(out).not.toContain("<script>");
    expect(out).not.toContain("alert(1)");
  });

  test("strips javascript: URLs", () => {
    const out = renderMarkdown("[click](javascript:alert(1))");
    expect(out).not.toContain("javascript:");
  });

  test("strips on* attributes", () => {
    const out = renderMarkdown('<img src=x onerror="alert(1)">');
    expect(out).not.toContain("onerror");
  });

  test("links get rel=nofollow noopener", () => {
    const out = renderMarkdown("[ok](https://example.com)");
    expect(out).toContain('rel="nofollow noopener ugc"');
    expect(out).toContain('target="_blank"');
  });

  test("preserves code fences", () => {
    const out = renderMarkdown("```ts\nconst x = 1;\n```");
    expect(out).toContain("<pre>");
    expect(out).toContain("<code");
    expect(out).toContain("const x = 1;");
  });

  test("images blocked by default", () => {
    const out = renderMarkdown("![alt](https://example.com/x.png)");
    expect(out).not.toContain("<img");
  });

  test("images allowed when opt-in https-only", () => {
    const out = renderMarkdown("![alt](https://example.com/x.png)", { allowImages: true });
    expect(out).toContain("<img");
    expect(out).toContain("https://example.com/x.png");
    const httpOut = renderMarkdown("![alt](http://example.com/x.png)", { allowImages: true });
    expect(httpOut).not.toContain("http://example.com/x.png");
    expect(httpOut).not.toContain('src="http:');
  });

  test("table renders", () => {
    const out = renderMarkdown("| a | b |\n|---|---|\n| 1 | 2 |");
    expect(out).toContain("<table>");
    expect(out).toContain("<th>a</th>");
  });
});
