import { describe, expect, it } from "bun:test";
import { PACKAGE_NAME, sanitizeHtml, UPSTREAM_PACKAGE } from "../src/index.ts";

describe("package identity", () => {
  it("PACKAGE_NAME", () => expect(PACKAGE_NAME).toBe("@baohaus/sanitize-bao"));
  it("UPSTREAM_PACKAGE", () => expect(UPSTREAM_PACKAGE).toBe("sanitize-html@2.17.2"));
});

describe("sanitizeHtml — allowed tags", () => {
  it("passes through allowed paragraph tag", () => {
    const out = sanitizeHtml("<p>Hello world</p>");
    expect(out).toContain("<p>");
    expect(out).toContain("Hello world");
  });

  it("strips disallowed tags by default (script)", () => {
    const out = sanitizeHtml("<script>alert(1)</script><p>safe</p>");
    expect(out).not.toContain("<script>");
    expect(out).not.toContain("alert(1)");
    expect(out).toContain("safe");
  });

  it("strips style tag by default", () => {
    const out = sanitizeHtml("<style>body{color:red}</style><p>text</p>");
    expect(out).not.toContain("<style>");
    expect(out).toContain("text");
  });

  it("strips iframe", () => {
    const out = sanitizeHtml("<iframe src='http://evil.com'></iframe><p>ok</p>");
    expect(out).not.toContain("<iframe>");
    expect(out).toContain("ok");
  });

  it("preserves nested allowed tags", () => {
    const out = sanitizeHtml("<p><strong>Bold</strong> text</p>");
    expect(out).toContain("<strong>");
    expect(out).toContain("Bold");
  });

  it("preserves allowed heading tags", () => {
    const out = sanitizeHtml("<h1>Title</h1><h2>Subtitle</h2>");
    expect(out).toContain("<h1>");
    expect(out).toContain("<h2>");
  });

  it("preserves list tags", () => {
    const out = sanitizeHtml("<ul><li>Item</li></ul>");
    expect(out).toContain("<ul>");
    expect(out).toContain("<li>");
  });

  it("preserves blockquote", () => {
    const out = sanitizeHtml("<blockquote>Quote</blockquote>");
    expect(out).toContain("<blockquote>");
  });

  it("preserves code and pre", () => {
    const out = sanitizeHtml("<pre><code>const x = 1;</code></pre>");
    expect(out).toContain("<pre>");
    expect(out).toContain("<code>");
  });
});

describe("sanitizeHtml — allowed attributes", () => {
  it("keeps href on anchor", () => {
    const out = sanitizeHtml('<a href="https://example.com">link</a>');
    expect(out).toContain('href="https://example.com"');
  });

  it("strips disallowed attribute (onclick) from anchor", () => {
    const out = sanitizeHtml('<a href="#" onclick="evil()">link</a>');
    expect(out).not.toContain("onclick");
    expect(out).toContain("href");
  });

  it("keeps src and alt on img", () => {
    const out = sanitizeHtml('<img src="pic.jpg" alt="Photo">');
    expect(out).toContain('src="pic.jpg"');
    expect(out).toContain('alt="Photo"');
  });

  it("strips event handler on img", () => {
    const out = sanitizeHtml('<img src="x.jpg" onerror="evil()">');
    expect(out).not.toContain("onerror");
  });

  it("strips all attributes when tag has no allowlist entry", () => {
    const out = sanitizeHtml('<p class="intro" id="main">Text</p>');
    expect(out).not.toContain("class=");
    expect(out).not.toContain("id=");
    expect(out).toContain("Text");
  });
});

describe("sanitizeHtml — custom allowedTags", () => {
  it("strips default allowed tags when overriding allowedTags", () => {
    const out = sanitizeHtml("<p>para</p><b>bold</b>", { allowedTags: ["b"] });
    expect(out).not.toContain("<p>");
    expect(out).toContain("<b>");
    expect(out).toContain("bold");
  });

  it("allows only specified tags", () => {
    const out = sanitizeHtml("<div><span>text</span></div>", { allowedTags: ["span"] });
    expect(out).not.toContain("<div>");
    expect(out).toContain("<span>");
  });
});

describe("sanitizeHtml — disallowedTagsMode escape", () => {
  it("escapes disallowed tags when mode is escape", () => {
    const out = sanitizeHtml("<script>alert(1)</script>", {
      disallowedTagsMode: "escape",
    });
    expect(out).not.toContain("<script>");
    expect(out).toContain("&lt;script&gt;");
  });
});

describe("sanitizeHtml — text content", () => {
  it("preserves plain text", () => {
    const out = sanitizeHtml("Hello world");
    expect(out).toContain("Hello world");
  });

  it("preserves text inside allowed tags", () => {
    const out = sanitizeHtml("<p>Paragraph text</p>");
    expect(out).toContain("Paragraph text");
  });
});
