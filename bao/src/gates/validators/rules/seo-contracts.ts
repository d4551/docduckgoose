import type { ShellContract, ValidatorContext } from "../context.ts";
import { contentSatisfiesNeedle, stripCodeComments } from "../helpers.ts";

const DEFAULT_ROUTE_SOURCE_PATTERN = /src\/server\/html\/routes\/.*\.routes\.ts$/;
const ROUTE_SEO_DESCRIPTION_PATTERN = /\b(?:seoDescription|metaDescription|descriptionKey)\b/;
const PATH_ONLY_CANONICAL_PATTERN = /rel="canonical"\s+href="\$\{activePath\}"/;
const PATH_ONLY_ALTERNATE_PATTERN = /rel="alternate"\s+hreflang="[^"]+"\s+href="\$\{activePath\}"/;

const readShellContractContents = async (
  ctx: ValidatorContext,
  shell: ShellContract,
): Promise<string> => {
  const primary = await ctx.readFile(shell.path);
  const related = await Promise.all((shell.relatedPaths ?? []).map((path) => ctx.readFile(path)));
  return stripCodeComments([primary, ...related].join("\n"));
};

const validateShellSeo = async (ctx: ValidatorContext, shell: ShellContract): Promise<string[]> => {
  const violations: string[] = [];
  const contents = await readShellContractContents(ctx, shell);
  const missing = shell.required
    .filter(([needle]) => !contentSatisfiesNeedle(contents, needle))
    .map(([, label]) => label);
  if (missing.length > 0) {
    violations.push(`${shell.path} missing: ${missing.join(", ")}`);
  }

  if (PATH_ONLY_CANONICAL_PATTERN.test(contents) || PATH_ONLY_ALTERNATE_PATTERN.test(contents)) {
    violations.push(`${shell.path} uses path-only canonical or alternate URLs`);
  }
  return violations;
};

const validateRouteSeo = async (ctx: ValidatorContext): Promise<string[]> => {
  const violations: string[] = [];
  for (const path of ctx.collectFiles(
    ctx.config.routeSourcePattern ?? DEFAULT_ROUTE_SOURCE_PATTERN,
  )) {
    const contents = await ctx.readFile(path);
    if (contents.includes("renderPage(") && !ROUTE_SEO_DESCRIPTION_PATTERN.test(contents)) {
      violations.push(`${path} missing: page-specific SEO description`);
    }
  }
  return violations;
};

export const seoContracts = async (ctx: ValidatorContext): Promise<void> => {
  const contracts = ctx.config.shellSeoContracts;

  if (!contracts || contracts.length === 0) {
    return;
  }

  const violations: string[] = [];

  for (const shell of contracts) {
    violations.push(...(await validateShellSeo(ctx, shell)));
  }

  violations.push(...(await validateRouteSeo(ctx)));

  ctx.failAll(violations, "SEO metadata missing");
};
