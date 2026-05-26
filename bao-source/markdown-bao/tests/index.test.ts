import { describe, expect, it } from "bun:test";
import { marked, PACKAGE_NAME, parse, parser, tokenize } from "../src/index.ts";

describe("index", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/markdown-bao");
  });

  it("parses markdown through marked.parse API", () => {
    expect(marked.parse("# Hello\n\nThis is **bold** and [linked](https://bao.haus).")).toContain(
      "<strong>bold</strong>",
    );
  });

  it("supports lexer and parser helpers", () => {
    const tokens = tokenize("- one\n- two");
    expect(parser(tokens)).toBe("<ul><li>one</li><li>two</li></ul>");
  });

  it("returns a promise when async option is requested", async () => {
    await expect(parse("`code`", { async: true })).resolves.toBe("<p><code>code</code></p>");
  });

  it("renders image markdown before link markdown", () => {
    expect(parse("![alt](https://example.com/x.png)")).toBe(
      '<p><img src="https://example.com/x.png" alt="alt"></p>',
    );
  });

  it("renders simple GFM-style tables", () => {
    expect(parse("| a | b |\n|---|---|\n| 1 | 2 |")).toContain("<table>");
  });

  it("drops raw HTML tags before rendering", () => {
    expect(parse('hi<script>alert(1)</script><img onerror="alert(1)">bye')).toBe("<p>hibye</p>");
  });

  it("supports renderer overrides through marked-compatible options", () => {
    expect(
      parse("# Hello", {
        renderer: {
          heading: (token) => `<h${token.depth} data-bao-heading>${token.text}</h${token.depth}>`,
        },
      }),
    ).toBe("<h1 data-bao-heading>Hello</h1>");
  });

  it("supports block tokenizer extensions and marked.use defaults", () => {
    marked.use({
      extensions: [
        {
          name: "callout",
          level: "block",
          tokenizer: (source) =>
            source.startsWith(":::note")
              ? { type: "extension", name: "callout", text: "Note", raw: ":::note" }
              : null,
          renderer: (token) => `<aside>${token.text}</aside>`,
        },
      ],
    });

    expect(marked.parse(":::note")).toBe("<aside>Note</aside>");
  });
});
