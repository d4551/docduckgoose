import { blockedFallbackPathPattern, blockedFallbackTermPattern } from "../allowlists.ts";
import type { ValidatorContext } from "../context.ts";

/** Files that define blocked terms/names — self-referential false positives if scanned. */
const SELF_REFERENTIAL_PATHS = new Set([
  "src/gates/validators/allowlists.ts",
  "src/gates/validators/rules/no-fallback-shims.ts",
  // Per-app boot wrappers around the canonical `@baohaus/ecosystem-events-bao`
  // bridge package (allowlisted in root CLAUDE.md governance allowlist). Each
  // app's events-boot file imports `installEcosystemBridgeAtBoot` and the
  // `EcosystemEventBridgeHandle` type from the canonical surface — the literal
  // word "bridge" in those import specifiers is unavoidable because it names
  // the documented industry-best-practice cross-process pub/sub bridge. The
  // boot file itself is a thin DI wrapper, not a fallback shim. Adding it
  // here is the per-app exemption; the canonical bridge implementation lives
  // in `bao-source/ecosystem-events-bao/src/bridge.ts` and is allowlisted
  // separately. New consumers MUST be named `ecosystem-events-boot.service.ts`
  // (forge convention) or `ecosystem-bridge.service.ts` (legacy) and added
  // here explicitly — no glob exemption.
  "src/server/ecosystem-events-boot.service.ts",
  "src/server/ecosystem-bridge.service.ts",
]);

export const noFallbackShims = async (ctx: ValidatorContext): Promise<void> => {
  const contentViolations = await ctx.findAllMatches(
    blockedFallbackTermPattern,
    ctx.srcFiles().filter((path) => !SELF_REFERENTIAL_PATHS.has(path)),
  );
  const pathViolations = ctx
    .policyTsFiles()
    .filter((path) => !SELF_REFERENTIAL_PATHS.has(path))
    .filter((path) => blockedFallbackPathPattern.test(path));

  ctx.failAll([...new Set([...contentViolations, ...pathViolations])], "fallback shim debt found");
};
