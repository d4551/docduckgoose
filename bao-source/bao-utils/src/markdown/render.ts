import { marked } from "@baohaus/markdown-bao";
import { type SanitizeOptions, sanitizeHtml } from "@baohaus/sanitize-bao";

interface RenderOptions {
  readonly allowImages?: boolean;
}

const baseAllowedTags: readonly string[] = [
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
];

const baseAllowedAttributes: Record<string, string[]> = {
  a: ["href", "name", "target", "rel"],
  code: ["class"],
  pre: ["class"],
  th: ["align"],
  td: ["align"],
};

const transformTags: SanitizeOptions["transformTags"] = {
  a: (tagName, attribs) => ({
    tagName,
    attribs: {
      ...attribs,
      rel: "nofollow noopener ugc",
      target: "_blank",
    },
  }),
};

const buildOptions = (opts: RenderOptions): SanitizeOptions => {
  const allowedTags = [...baseAllowedTags];
  const allowedAttributes = { ...baseAllowedAttributes };
  if (opts.allowImages === true) {
    allowedTags.push("img");
    allowedAttributes.img = ["src", "alt", "title"];
  }
  return {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: opts.allowImages === true ? { img: ["https"] } : {},
    disallowedTagsMode: "discard",
    transformTags,
  };
};

const renderMarkdown = (input: string, options: RenderOptions = {}): string => {
  const html = marked.parse(input, { async: false, gfm: true, breaks: false });
  return sanitizeHtml(typeof html === "string" ? html : "", buildOptions(options));
};

export type { RenderOptions };
export { renderMarkdown };
