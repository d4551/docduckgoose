import type { ValidatorContext } from "../context.ts";
import { scanBodyMetrics } from "./monolith-body-scan.ts";

const FUNCTION_PATTERN =
  /\b(?:export\s+)?(?:async\s+)?function\s+\w+\s*\((?<params>[^)]*)\)\s*{|(?:const|let)\s+\w+\s*=\s*(?:async\s*)?\((?<arrowParams>[^)]*)\)\s*=>\s*{/g;

const countParams = (rawParams: string | undefined): number =>
  rawParams?.trim() ? rawParams.split(",").filter((param) => param.trim().length > 0).length : 0;

interface MonolithThresholds {
  readonly maxLines: number;
  readonly maxFunctionLines: number;
  readonly maxParams: number;
  readonly maxNestedBlockDepth: number;
  readonly maxEstimatedCognitiveComplexity: number;
}

interface FunctionViolationInput {
  readonly path: string;
  readonly startLine: number;
  readonly functionLines: number;
  readonly params: number;
  readonly maxBlockNesting: number;
  readonly estimatedCognitiveComplexity: number;
  readonly limits: MonolithThresholds;
}

const recordFunctionViolations = (input: FunctionViolationInput): string[] => {
  const {
    path,
    startLine,
    functionLines,
    params,
    maxBlockNesting,
    estimatedCognitiveComplexity,
    limits,
  } = input;
  const out: string[] = [];
  if (functionLines > limits.maxFunctionLines) {
    out.push(
      `${path}:${startLine} function spans ${functionLines} lines (limit ${limits.maxFunctionLines})`,
    );
  }
  if (params > limits.maxParams) {
    out.push(`${path}:${startLine} function has ${params} params (limit ${limits.maxParams})`);
  }
  if (maxBlockNesting > limits.maxNestedBlockDepth) {
    out.push(
      `${path}:${startLine} block nesting depth ${maxBlockNesting} (limit ${limits.maxNestedBlockDepth})`,
    );
  }
  if (estimatedCognitiveComplexity > limits.maxEstimatedCognitiveComplexity) {
    out.push(
      `${path}:${startLine} estimated cognitive complexity ${estimatedCognitiveComplexity} (limit ${limits.maxEstimatedCognitiveComplexity})`,
    );
  }
  return out;
};

const collectFileViolations = async (
  ctx: ValidatorContext,
  path: string,
  limits: MonolithThresholds,
): Promise<string[]> => {
  const violations: string[] = [];
  const contents = await ctx.readFile(path);
  const lines = contents.split("\n");
  const lineCount = lines.length;

  if (lineCount > limits.maxLines) {
    violations.push(`${path} (${lineCount} lines > ${limits.maxLines})`);
  }

  for (const match of contents.matchAll(FUNCTION_PATTERN)) {
    const matched = match[0];
    const matchIndex = match.index ?? 0;
    const openBraceIndex = matchIndex + matched.length - 1;
    if (contents[openBraceIndex] !== "{") {
      continue;
    }

    const metrics = scanBodyMetrics(contents, openBraceIndex);
    const startLine = contents.slice(0, matchIndex).split("\n").length;
    const endLine = contents.slice(0, metrics.endIndex).split("\n").length;
    const functionLines = endLine - startLine + 1;
    const params = countParams(match.groups?.params ?? match.groups?.arrowParams);

    violations.push(
      ...recordFunctionViolations({
        path,
        startLine,
        functionLines,
        params,
        maxBlockNesting: metrics.maxBlockNesting,
        estimatedCognitiveComplexity: metrics.estimatedCognitiveComplexity,
        limits,
      }),
    );
  }

  return violations;
};

export const noMonoliths = async (ctx: ValidatorContext): Promise<void> => {
  const violations: string[] = [];
  const limits: MonolithThresholds = {
    maxLines: ctx.config.maxFileLines,
    maxFunctionLines: ctx.config.maxFunctionLines ?? 80,
    maxParams: ctx.config.maxFunctionParams ?? 5,
    maxNestedBlockDepth: ctx.config.maxNestedBlockDepth ?? 4,
    maxEstimatedCognitiveComplexity: ctx.config.maxEstimatedCognitiveComplexity ?? 15,
  };
  const ownedPattern = ctx.config.monolithFilePattern;
  const files = ownedPattern
    ? ctx.collectFiles(ownedPattern).filter((candidate) => !candidate.endsWith(".d.ts"))
    : ctx.policyTsFiles();

  for (const path of files) {
    violations.push(...(await collectFileViolations(ctx, path, limits)));
  }

  const summaryParts = [
    `files > ${limits.maxLines} lines`,
    `functions > ${limits.maxFunctionLines} lines`,
    `functions with > ${limits.maxParams} params`,
    `block nesting > ${limits.maxNestedBlockDepth}`,
    `estimated cognitive complexity > ${limits.maxEstimatedCognitiveComplexity}`,
  ];

  ctx.failAll(violations, `no-monoliths violations (${summaryParts.join("; ")})`);
};
