import type { ValidatorContext } from "../context.ts";

const MUTATING_FORM_PATTERN = /<form\b[\s\S]*?<\/form>/g;
const MUTATING_ACTION_PATTERN = /hx-(?:post|put|patch|delete)=/u;
const ANY_TARGET_ERROR_PATTERN = /hx-target-error="#(?<id>[^"]+)"/gu;
const TARGET_ERROR_PATTERN = /hx-target-error="#(?<id>[^"]+)"/u;

const extractLineNumber = (contents: string, matchIndex: number): number =>
  contents.slice(0, matchIndex).split("\n").length;

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const includesLiveAlertTarget = (contents: string, id: string): boolean =>
  new RegExp(
    `id="${escapeRegExp(id)}"[^>]*role="alert"[^>]*aria-live="(?:polite|assertive)"|id="${escapeRegExp(id)}"[^>]*aria-live="(?:polite|assertive)"[^>]*role="alert"`,
    "u",
  ).test(contents);

const usesShellMainTarget = (id: string): boolean =>
  id === "main-content" || id.includes("MAIN_CONTENT_ID");

const usesDynamicTargetExpression = (id: string): boolean => id.includes("${");

const validateMutatingForm = (
  path: string,
  contents: string,
  formMatch: RegExpMatchArray,
): string[] => {
  const form = formMatch[0];
  if (!MUTATING_ACTION_PATTERN.test(form)) {
    return [];
  }

  const line = extractLineNumber(contents, formMatch.index ?? 0);
  const violations: string[] = [];

  if (!(form.includes('hx-indicator="') || form.includes("buildAuthFormBehaviorAttributes("))) {
    violations.push(`${path}:${line} missing hx-indicator="#global-indicator"`);
  }

  const targetId = form.match(TARGET_ERROR_PATTERN)?.groups?.id;
  if (
    targetId &&
    !usesDynamicTargetExpression(targetId) &&
    !usesShellMainTarget(targetId) &&
    !includesLiveAlertTarget(contents, targetId)
  ) {
    violations.push(`${path}:${line} missing live alert region #${targetId}`);
  }

  return violations;
};

export const htmxFormContracts = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];

  for (const path of ctx.htmlFiles()) {
    const contents = await ctx.readFile(path);

    for (const targetMatch of contents.matchAll(ANY_TARGET_ERROR_PATTERN)) {
      const targetId = targetMatch.groups?.id;
      if (
        targetId &&
        !usesDynamicTargetExpression(targetId) &&
        !usesShellMainTarget(targetId) &&
        !includesLiveAlertTarget(contents, targetId)
      ) {
        violations.push(
          `${path}:${extractLineNumber(contents, targetMatch.index)} missing live alert region #${targetId}`,
        );
      }
    }

    for (const formMatch of contents.matchAll(MUTATING_FORM_PATTERN)) {
      violations.push(...validateMutatingForm(path, contents, formMatch));
    }
  }

  ctx.failAll(violations, "htmx mutating forms missing indicator or live alert targets");
};
