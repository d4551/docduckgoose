import { describe, expect, it } from "bun:test";
import { element, html, PACKAGE_NAME, render } from "../src/index.ts";

describe("html-mantou", () => {
  it("exports package identity", () => {
    expect(PACKAGE_NAME).toBe("@baohaus/html-mantou");
  });

  it("renders template", () => {
    const name = "world";
    const result = html`<h1>Hello ${name}</h1>`;
    expect(result).toBe("<h1>Hello world</h1>");
  });

  it("escapes HTML in template interpolation", () => {
    const malicious = "<script>alert(1)</script>";
    const result = html`<div>${malicious}</div>`;
    expect(result).toBe("<div>&lt;script&gt;alert(1)&lt;/script&gt;</div>");
    expect(result).not.toContain("<script>");
  });

  it("escapes ampersand in template interpolation", () => {
    const result = html`<div>${"&"}</div>`;
    expect(result).toBe("<div>&amp;</div>");
  });

  it("escapes quotes in template interpolation", () => {
    const result = html`<div>${'"'}</div><div>${"'"}</div>`;
    expect(result).toBe("<div>&quot;</div><div>&#39;</div>");
  });

  it("escapes greater-than in template interpolation", () => {
    const result = html`<div>${">"}</div>`;
    expect(result).toBe("<div>&gt;</div>");
  });

  it("escapes less-than in template interpolation", () => {
    const result = html`<div>${"<"}</div>`;
    expect(result).toBe("<div>&lt;</div>");
  });

  it("handles null interpolation in template", () => {
    const result = html`<div>${null}</div>`;
    expect(result).toBe("<div></div>");
  });

  it("handles undefined interpolation in template", () => {
    const result = html`<div>${undefined}</div>`;
    expect(result).toBe("<div></div>");
  });

  it("creates element with attributes and children", () => {
    const tmpl = element("div", { class: "test" }, ["Hello"]);
    expect(tmpl.tag).toBe("div");
    expect(tmpl.attributes).toEqual({ class: "test" });
    expect(tmpl.children).toEqual(["Hello"]);
  });

  it("renders element to string", () => {
    const tmpl = element("div", { class: "test" }, ["Hello"]);
    const result = render(tmpl);
    expect(result).toBe('<div class="test">Hello</div>');
  });

  it("escapes HTML in element children", () => {
    const tmpl = element("div", {}, ["<script>alert(1)</script>"]);
    const result = render(tmpl);
    expect(result).toContain("&lt;script&gt;");
    expect(result).not.toContain("<script>");
  });

  it("escapes HTML in element attributes", () => {
    const tmpl = element("div", { title: "<script>alert(1)</script>" }, ["Test"]);
    const result = render(tmpl);
    expect(result).toContain("&lt;script&gt;");
    expect(result).not.toContain("<script>");
  });

  it("handles nested elements", () => {
    const inner = element("span", {}, ["Inner"]);
    const outer = element("div", { class: "outer" }, [inner]);
    const result = render(outer);
    expect(result).toBe('<div class="outer"><span>Inner</span></div>');
  });

  it("handles multiple children", () => {
    const tmpl = element("ul", {}, [
      element("li", {}, ["Item 1"]),
      element("li", {}, ["Item 2"]),
      element("li", {}, ["Item 3"]),
    ]);
    const result = render(tmpl);
    expect(result).toBe("<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
  });

  it("handles element with no children", () => {
    const tmpl = element("div", { class: "empty" }, []);
    const result = render(tmpl);
    expect(result).toBe('<div class="empty"></div>');
  });

  it("handles element with no attributes", () => {
    const tmpl = element("div", {}, ["Content"]);
    const result = render(tmpl);
    expect(result).toBe("<div>Content</div>");
  });

  it("handles string input to render", () => {
    const result = render("<script>alert(1)</script>");
    expect(result).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("prevents XSS via template interpolation", () => {
    const xssPayload = '<img src=x onerror="alert(1)">';
    const result = html`<div>${xssPayload}</div>`;
    expect(result).toContain("&lt;img");
    expect(result).toContain("src=x");
    expect(result).toContain("onerror=");
    expect(result).not.toContain("<img");
  });

  it("prevents XSS via element attributes", () => {
    const xssPayload = '" onclick="alert(1)" ';
    const tmpl = element("a", { href: xssPayload }, ["Link"]);
    const result = render(tmpl);
    // Quotes in attribute value are escaped, preventing attribute injection
    expect(result).toContain("&quot;");
    // The onclick is part of the escaped attribute value, not executable
    expect(result).toBe('<a href="&quot; onclick=&quot;alert(1)&quot; ">Link</a>');
  });
});
