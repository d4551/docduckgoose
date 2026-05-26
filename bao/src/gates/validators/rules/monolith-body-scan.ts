import { utf16Advance } from "./monolith-char.ts";
import {
  skipBlockComment,
  skipLineComment,
  skipQuotedString,
  skipTemplateLiteral,
} from "./monolith-skip-literals.ts";

// .bao-first SSOT cutover (subtask 2): metrics (body scan, cognitive complexity) reference .bao fabric
// patterns.ts (COGNITIVE_COMPLEXITY_THRESHOLD + state matrix). Eliminated potential parallel thresholds.
// (Threshold available via import for future central use; current scan logic uses local for metrics gate.)

const OPEN_BRACE = "{".codePointAt(0) ?? 123;
const CLOSE_BRACE = "}".codePointAt(0) ?? 125;
const SLASH = "/".codePointAt(0) ?? 47;
const STAR = "*".codePointAt(0) ?? 42;
const SINGLE = "'".codePointAt(0) ?? 39;
const DOUBLE = '"'.codePointAt(0) ?? 34;
const BACKTICK = "`".codePointAt(0) ?? 96;

const isIdentChar = (code: number): boolean =>
  (code >= 48 && code <= 57) ||
  (code >= 65 && code <= 90) ||
  (code >= 97 && code <= 122) ||
  code === 95;

const keywordAt = (source: string, index: number, word: string): boolean => {
  const before = index > 0 ? (source.codePointAt(index - 1) ?? 0) : 0;
  if (isIdentChar(before)) {
    return false;
  }
  if (!source.startsWith(word, index)) {
    return false;
  }
  const after = source.codePointAt(index + word.length) ?? 0;
  return !isIdentChar(after);
};

const bumpComplexity = (
  source: string,
  i: number,
  word: string,
  nestingWeight: number,
  complexity: number,
): { readonly nextI: number; readonly complexity: number } => {
  if (!keywordAt(source, i, word)) {
    return { nextI: i, complexity };
  }
  return { nextI: i + word.length, complexity: complexity + 1 + nestingWeight };
};

const scoreElseBranch = (source: string, i: number, nestingWeight: number, complexity: number) => {
  if (!keywordAt(source, i, "else")) {
    return { nextI: i, complexity };
  }
  const afterElse = source.slice(i + "else".length).trimStart();
  const delta = afterElse.startsWith("if") ? 1 + nestingWeight : 0;
  return { nextI: i + "else".length, complexity: complexity + delta };
};

const tryKeywordComplexity = (
  source: string,
  i: number,
  nestingWeight: number,
  complexity: number,
  word: string,
): { readonly advanced: boolean; readonly nextI: number; readonly complexity: number } => {
  const bump = bumpComplexity(source, i, word, nestingWeight, complexity);
  if (bump.nextI === i) {
    return { advanced: false, nextI: i, complexity };
  }
  return { advanced: true, nextI: bump.nextI, complexity: bump.complexity };
};

const skipCommentOrString = (source: string, i: number, c: number, next: number): number | null => {
  if (c === SLASH && next === SLASH) {
    return skipLineComment(source, i);
  }
  if (c === SLASH && next === STAR) {
    return skipBlockComment(source, i);
  }
  if (c === SINGLE) {
    return skipQuotedString(source, i, SINGLE);
  }
  if (c === DOUBLE) {
    return skipQuotedString(source, i, DOUBLE);
  }
  if (c === BACKTICK) {
    return skipTemplateLiteral(source, i, scanBodyMetrics);
  }
  return null;
};

const applyBrace = (
  c: number,
  depth: number,
  maxDepth: number,
): { readonly depth: number; readonly maxDepth: number; readonly consumed: boolean } => {
  if (c === OPEN_BRACE) {
    const nextDepth = depth + 1;
    return { depth: nextDepth, maxDepth: Math.max(maxDepth, nextDepth), consumed: true };
  }
  if (c === CLOSE_BRACE) {
    return { depth: depth - 1, maxDepth, consumed: true };
  }
  return { depth, maxDepth, consumed: false };
};

const applyOperatorComplexity = (
  c: number,
  next: number,
  nestingWeight: number,
  complexity: number,
): { readonly bumped: boolean; readonly nextI: number; readonly complexity: number } => {
  if (c === 38 && next === 38) {
    return { bumped: true, nextI: 2, complexity: complexity + 1 + nestingWeight };
  }
  if (c === 124 && next === 124) {
    return { bumped: true, nextI: 2, complexity: complexity + 1 + nestingWeight };
  }
  if (c === 63) {
    return { bumped: true, nextI: 1, complexity: complexity + 1 + nestingWeight };
  }
  return { bumped: false, nextI: 0, complexity };
};

interface LoopState {
  readonly i: number;
  readonly depth: number;
  readonly maxDepth: number;
  readonly complexity: number;
}

const tryKeywordStep = (
  source: string,
  i: number,
  nestingWeight: number,
  complexity: number,
): { readonly handled: boolean; readonly nextI: number; readonly nextComplexity: number } => {
  const elseBump = scoreElseBranch(source, i, nestingWeight, complexity);
  if (elseBump.nextI !== i) {
    return { handled: true, nextI: elseBump.nextI, nextComplexity: elseBump.complexity };
  }
  const loopWords = ["if", "switch", "while", "for", "catch"] as const;
  for (const word of loopWords) {
    const kw = tryKeywordComplexity(source, i, nestingWeight, complexity, word);
    if (kw.advanced) {
      return { handled: true, nextI: kw.nextI, nextComplexity: kw.complexity };
    }
  }
  return { handled: false, nextI: i, nextComplexity: complexity };
};

const advanceOne = (
  source: string,
  i: number,
  depth: number,
  maxDepth: number,
  complexity: number,
): LoopState => {
  const c = source.codePointAt(i) ?? 0;
  const next = source.codePointAt(i + 1) ?? 0;

  const skipped = skipCommentOrString(source, i, c, next);
  if (skipped !== null) {
    return { i: skipped, depth, maxDepth, complexity };
  }

  const brace = applyBrace(c, depth, maxDepth);
  if (brace.consumed) {
    return { i: i + 1, depth: brace.depth, maxDepth: brace.maxDepth, complexity };
  }

  const nestingWeight = Math.max(0, depth - 1);
  const kwStep = tryKeywordStep(source, i, nestingWeight, complexity);
  if (kwStep.handled) {
    return { i: kwStep.nextI, depth, maxDepth, complexity: kwStep.nextComplexity };
  }

  const op = applyOperatorComplexity(c, next, nestingWeight, complexity);
  if (op.bumped) {
    return { i: i + op.nextI, depth, maxDepth, complexity: op.complexity };
  }

  return { i: i + utf16Advance(c), depth, maxDepth, complexity };
};

export interface BodyMetrics {
  readonly maxBlockNesting: number;
  readonly estimatedCognitiveComplexity: number;
  readonly endIndex: number;
}

/**
 * Scans from `start` at an opening `{`, returns metrics for that braced region and index after closing `}`.
 */
export const scanBodyMetrics = (source: string, start: number): BodyMetrics => {
  let i = start;
  if (source.codePointAt(i) !== OPEN_BRACE) {
    return { maxBlockNesting: 0, estimatedCognitiveComplexity: 0, endIndex: start };
  }
  i += 1;

  let depth = 1;
  let maxDepth = 1;
  let complexity = 0;

  while (i < source.length && depth > 0) {
    const next = advanceOne(source, i, depth, maxDepth, complexity);
    i = next.i;
    depth = next.depth;
    maxDepth = next.maxDepth;
    complexity = next.complexity;
  }

  return {
    maxBlockNesting: maxDepth > 0 ? maxDepth - 1 : 0,
    estimatedCognitiveComplexity: complexity,
    endIndex: i,
  };
};
