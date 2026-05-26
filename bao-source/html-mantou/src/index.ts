/**
 * @baohaus/html-mantou
 *
 * Bao-native HTML plugin and template helpers.
 * Domain: framework
 */

import { Elysia } from "elysia";

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const PACKAGE_NAME = "@baohaus/html-mantou" as const;
const HTML_CONTENT_TYPE = "text/html; charset=utf8";

interface HTMLTemplate {
  readonly tag: string;
  readonly attributes: Readonly<Record<string, string>>;
  readonly children: readonly (HTMLTemplate | string)[];
}

type HtmlPlugin = Elysia;

function isTemplateStringsArray(value: readonly string[]): value is TemplateStringsArray {
  return Object.hasOwn(value, "raw");
}

function createHtmlPlugin(): HtmlPlugin {
  return new Elysia({ name: "html-mantou" }).onAfterHandle(({ responseValue, set }) => {
    if (isHtml(responseValue) && !("content-type" in set.headers)) {
      set.headers["content-type"] = HTML_CONTENT_TYPE;
    }
  });
}

function html(): HtmlPlugin;
function html(template: TemplateStringsArray, ...values: readonly unknown[]): string;
function html(template?: TemplateStringsArray, ...values: readonly unknown[]): string | HtmlPlugin {
  if (template === undefined) {
    return createHtmlPlugin();
  }

  if (!isTemplateStringsArray(template)) {
    return createHtmlPlugin();
  }

  let result = "";
  for (let index = 0; index < template.length; index++) {
    result += template[index];
    if (index < values.length) {
      const value = values[index];
      result += value === null || value === undefined ? "" : escapeHtml(String(value));
    }
  }
  return result;
}

function hasCustomStringifier(value: object): value is { toString(): string } {
  return value.toString !== Object.prototype.toString;
}

function isHtml(value: unknown): value is string | { toString(): string } {
  if (typeof value === "string") {
    return value.trimStart().startsWith("<");
  }
  return (
    typeof value === "object" &&
    value !== null &&
    hasCustomStringifier(value) &&
    value.toString().trimStart().startsWith("<")
  );
}

function element(
  tag: string,
  attributes: Record<string, string>,
  children: readonly (HTMLTemplate | string)[],
): HTMLTemplate {
  return {
    tag,
    attributes: Object.freeze({ ...attributes }),
    children: Object.freeze([...children]),
  };
}

function render(template: HTMLTemplate | string): string {
  if (typeof template === "string") {
    return escapeHtml(template);
  }
  const attrs = Object.entries(template.attributes)
    .map(([key, value]) => ` ${escapeHtml(key)}="${escapeHtml(value)}"`)
    .join("");
  const children = template.children.map((child) => render(child)).join("");
  return `<${template.tag}${attrs}>${children}</${template.tag}>`;
}

export type { HTMLTemplate };
export { element, html, isHtml, PACKAGE_NAME, render };
