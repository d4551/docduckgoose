import type { ValidatorContext } from "../context.ts";
import { stripCodeComments } from "../helpers.ts";

const CONTROL_PATTERN =
  /<(?:input|textarea|select)\b(?<attrs>[^>]*)(?:>(?:[\s\S]*?<\/(?:textarea|select)>)?)/g;
const CONTROL_ID_PATTERN = /\bid="(?<id>[^"]+)"/u;

const extractLineNumber = (contents: string, matchIndex: number): number =>
  contents.slice(0, matchIndex).split("\n").length;

const isIgnoredControl = (attrs: string): boolean =>
  attrs.includes('type="hidden"') || attrs.includes("aria-hidden");

const hasWrappingLabel = (contents: string, matchIndex: number): boolean => {
  const start = Math.max(0, matchIndex - 400);
  const end = Math.min(contents.length, matchIndex + 400);
  const context = contents.slice(start, end);
  return context.includes("<label") && context.includes("</label>");
};

const hasAccessibleLabel = (contents: string, controlId: string, attrs: string): boolean =>
  attrs.includes('aria-label="') ||
  attrs.includes('aria-labelledby="') ||
  attrs.includes("renderLabelledByAttr(") ||
  contents.includes(`for="${controlId}"`);

const validateControl = (path: string, contents: string, match: RegExpMatchArray): string[] => {
  const attrs = match.groups?.attrs ?? "";
  const line = extractLineNumber(contents, match.index ?? 0);

  if (isIgnoredControl(attrs)) {
    return [];
  }

  const controlId = attrs.match(CONTROL_ID_PATTERN)?.groups?.id;
  if (!controlId) {
    return attrs.includes('aria-label="') || hasWrappingLabel(contents, match.index ?? 0)
      ? []
      : [`${path}:${line} missing control id`];
  }

  return hasAccessibleLabel(contents, controlId, attrs)
    ? []
    : [`${path}:${line} missing label for #${controlId}`];
};

export const formLabelControls = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.htmlFiles()) {
    const contents = stripCodeComments(await ctx.readFile(path));

    for (const match of contents.matchAll(CONTROL_PATTERN)) {
      violations.push(...validateControl(path, contents, match));
    }
  }

  ctx.failAll(violations, "form controls missing explicit labels");
};
