/**
 * Blocked fallback/shim vocabulary for `no-fallback-shims`.
 */

const BLOCKED_FALLBACK_TERMS = [
  "inline fallback",
  "fallback shim",
  "fallback wrapper",
  "fallback adapter",
  "fallback bridge",
  "fallback compat",
  "fallback polyfill",
  "shim",
  "wrapper",
  "compat",
  "polyfill",
  "bridge",
];

const blockedFallbackPathPatternConst =
  /(?:^|\/)[^/]*(?:shim|wrapper|compat|polyfill|bridge|adapter)[^/]*(?:\/|$)/i;

const blockedFallbackTermPatternConst = new RegExp(
  `\\b(?<blockedTerm>${BLOCKED_FALLBACK_TERMS.join("|")})\\b`,
  "i",
);

export const blockedFallbackPathPattern = blockedFallbackPathPatternConst;

export const blockedFallbackTermPattern = blockedFallbackTermPatternConst;
