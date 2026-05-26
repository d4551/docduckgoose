import { marked } from "@baohaus/markdown-bao";
import { sanitizeHtml } from "@baohaus/sanitize-bao";

const ALLOWED_TAGS = [
  "p",
  "br",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "del",
  "a",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
] as const;

export function renderMarkdown(source: string): string {
  const raw = marked.parse(source);
  return sanitizeHtml(raw, {
    allowedTags: [...ALLOWED_TAGS],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      code: ["class"],
      pre: ["class"],
      th: ["align"],
      td: ["align"],
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "nofollow noopener ugc",
          target: "_blank",
        },
      }),
    },
  });
}
