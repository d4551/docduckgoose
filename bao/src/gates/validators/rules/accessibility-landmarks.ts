import type { ValidatorContext } from "../context.ts";
import { contentSatisfiesNeedle, stripCodeComments } from "../helpers.ts";

const DIALOG_TAG_PATTERN = /<dialog\b[^>]*>/g;
const DIALOG_LABEL_PATTERN = /\baria-(?:label|labelledby)=/;
const MAIN_TAG_PATTERN = /<main\b/g;

const readShellContractContents = async (
  ctx: ValidatorContext,
  path: string,
  relatedPaths: readonly string[] | undefined,
): Promise<string> => {
  const primary = await ctx.readFile(path);
  const related = await Promise.all(
    (relatedPaths ?? []).map((relatedPath) => ctx.readFile(relatedPath)),
  );
  return stripCodeComments([primary, ...related].join("\n"));
};

const collectDialogViolations = (contents: string, path: string): string[] => {
  const violations: string[] = [];
  for (const dialogMatch of contents.matchAll(DIALOG_TAG_PATTERN)) {
    if (!DIALOG_LABEL_PATTERN.test(dialogMatch[0])) {
      violations.push(`${path} has unlabeled dialog`);
    }
  }
  return violations;
};

export const accessibilityLandmarks = async (ctx: ValidatorContext): Promise<void> => {
  const contracts = ctx.config.shellAccessibilityContracts;

  if (!contracts || contracts.length === 0) {
    return;
  }

  const violations: string[] = [];

  for (const shell of contracts) {
    const contents = await readShellContractContents(ctx, shell.path, shell.relatedPaths);
    const missing = (shell.required as readonly (readonly [string, string])[])
      .filter(([needle]) => !contentSatisfiesNeedle(contents, needle))
      .map(([, label]) => label);
    if (missing.length > 0) {
      violations.push(`${shell.path} missing: ${missing.join(", ")}`);
    }
    const mainCount = (contents.match(MAIN_TAG_PATTERN) ?? []).length;
    if (mainCount !== 1) {
      violations.push(`${shell.path} has ${mainCount} <main> landmarks`);
    }
    violations.push(...collectDialogViolations(contents, shell.path));
  }

  ctx.failAll(violations, "landmarks missing");
};
