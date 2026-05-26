import { calculateRetryDelay } from "./retry";

/**
 * Redaction rule for sanitizing error strings.
 */
export interface ExtensionRedactionRule {
  /**
   * Pattern to replace in an input string.
   */
  pattern: RegExp;
  /**
   * Replacement text for the matched pattern.
   */
  replacement: string;
}

/**
 * Term-based classifier entry for lightweight category mapping.
 */
export interface ExtensionTermClassifier<TCategory extends string> {
  /**
   * Category emitted when any term matches.
   */
  category: TCategory;
  /**
   * Lowercase terms to test against message content.
   */
  terms: readonly string[];
}

/**
 * Build an exponential retry delay with optional jitter.
 *
 * @param params - Retry delay parameters.
 * @returns Delay in milliseconds.
 */
export function buildExtensionRetryDelay(params: {
  attempt: number;
  baseDelayMs: number;
  maxDelayMs: number;
  factor?: number;
  useJitter?: boolean;
}): number {
  return calculateRetryDelay(
    params.attempt,
    params.baseDelayMs,
    params.factor ?? 2,
    params.maxDelayMs,
    params.useJitter ?? false,
  );
}

/**
 * Build a combined abort signal for timeout + upstream cancellation.
 *
 * @param params - Signal composition options.
 * @returns Combined signal plus cleanup when timers or listeners were installed.
 */
export function createExtensionTimeoutSignal(params: {
  timeoutMs?: number;
  upstreamSignal?: AbortSignal | null | undefined;
}): {
  signal: AbortSignal | undefined;
  cleanup?: () => void;
} {
  const timeoutMs = params.timeoutMs ?? 0;
  const upstreamSignal = params.upstreamSignal ?? undefined;
  if ((!timeoutMs || timeoutMs <= 0) && !upstreamSignal) {
    return {
      signal: undefined,
    };
  }

  const controller = new AbortController();
  let upstreamAbortHandler: (() => void) | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  if (upstreamSignal) {
    upstreamAbortHandler = (): void => controller.abort(upstreamSignal.reason);
    if (upstreamSignal.aborted) {
      upstreamAbortHandler();
    } else {
      upstreamSignal.addEventListener("abort", upstreamAbortHandler, { once: true });
    }
  }

  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      controller.abort(new Error(`Request timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      if (upstreamSignal && upstreamAbortHandler && !upstreamSignal.aborted) {
        upstreamSignal.removeEventListener("abort", upstreamAbortHandler);
      }
    },
  };
}

/**
 * Merge inbound headers into a base set using an allowlist.
 *
 * @param params - Header merge options.
 * @returns Merged headers.
 */
export function mergeExtensionHeadersByAllowlist(params: {
  base?: HeadersInit | undefined;
  inbound?: HeadersInit | undefined;
  allowlist: readonly string[];
}): Headers {
  const merged = new Headers(params.base);
  if (!params.inbound) {
    return merged;
  }
  const inbound = new Headers(params.inbound);
  for (const header of params.allowlist) {
    const value = inbound.get(header);
    if (value && !merged.has(header)) {
      merged.set(header, value);
    }
  }
  return merged;
}

/**
 * Apply redaction rules to an input message.
 *
 * @param message - Raw message.
 * @param rules - Redaction rules.
 * @returns Redacted message.
 */
export function redactExtensionMessage(
  message: string,
  rules: readonly ExtensionRedactionRule[],
): string {
  let output = message;
  for (const rule of rules) {
    output = output.replace(rule.pattern, rule.replacement);
  }
  return output;
}

/**
 * Classify message text by first matching term-set.
 *
 * @param params - Classifier options.
 * @returns Classified category.
 */
export function classifyExtensionMessageByTerms<TCategory extends string>(params: {
  message: string;
  classifiers: readonly ExtensionTermClassifier<TCategory>[];
  fallback: TCategory;
}): TCategory {
  const normalized = params.message.toLowerCase();
  for (const classifier of params.classifiers) {
    if (classifier.terms.some((term) => normalized.includes(term))) {
      return classifier.category;
    }
  }
  return params.fallback;
}
