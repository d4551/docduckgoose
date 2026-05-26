/**
 * Central rule registry. Each consumer repo calls:
 *   import { createRules } from "@baohaus/bao-package-kit/gates/validators/rules";
 *   import { createValidatorContext } from "@baohaus/bao-package-kit/gates/validators/context";
 *   const ctx = await createValidatorContext(root, ruleName, config);
 *   const allRules = createRules(ctx);
 *   await allRules[ruleName]();
 */

import type { ValidatorContext } from "./context.ts";
import { accessibilityLandmarks } from "./rules/accessibility-landmarks.ts";
import { baoArchivePolicy } from "./rules/bao-archive-policy.ts";
import { formLabelControls } from "./rules/form-label-controls.ts";
import { htmxFormContracts } from "./rules/htmx-form-contracts.ts";
import { htmxSwapCompleteness } from "./rules/htmx-swap-completeness.ts";
import { i18nKeyUsage } from "./rules/i18n-key-usage.ts";
import { i18nParity } from "./rules/i18n-parity.ts";
import { i18nTranslationQuality } from "./rules/i18n-translation-quality.ts";
import { noArbitrarySpacing } from "./rules/no-arbitrary-spacing.ts";
import { noBannedColors } from "./rules/no-banned-colors.ts";
import { noBareTryCatch } from "./rules/no-bare-try-catch.ts";
import { noClientFetchDrift } from "./rules/no-client-fetch-drift.ts";
import { noConsole } from "./rules/no-console.ts";
import { noDeadExports } from "./rules/no-dead-exports.ts";
import { noDebugMarkers } from "./rules/no-debug-markers.ts";
import { noDirectEnvAccess } from "./rules/no-direct-env-access.ts";
import { noDirectRouteLiterals } from "./rules/no-direct-route-literals.ts";
import { noFallbackShims } from "./rules/no-fallback-shims.ts";
import { noHardcodedUserStrings } from "./rules/no-hardcoded-user-strings.ts";
import { noLocalStyles } from "./rules/no-local-styles.ts";
import { noMonoliths } from "./rules/no-monoliths.ts";
import { noNodeImports } from "./rules/no-node-imports.ts";
import { noRawDesignTokens } from "./rules/no-raw-design-tokens.ts";
import { noRetiredPatterns } from "./rules/no-retired-patterns.ts";
import { noSchemaDuplication } from "./rules/no-schema-duplication.ts";
import { noTdzRisks } from "./rules/no-tdz-risks.ts";
import { noTsIgnore } from "./rules/no-ts-ignore.ts";
import { noUnknownCasts } from "./rules/no-unknown-casts.ts";
import { noUnsafeStorage } from "./rules/no-unsafe-storage.ts";
import { pageStateContracts } from "./rules/page-state-contracts.ts";
import { seoContracts } from "./rules/seo-contracts.ts";
import { uiHtmxErrorTargetNotMainContent } from "./rules/ui-htmx-error-target-not-main-content.ts";
import { uiNoPeerOriginLiterals } from "./rules/ui-no-peer-origin-literals.ts";
import { uiStatusBadgeIconRequired } from "./rules/ui-status-badge-icon-required.ts";

export type RuleExecutor = () => Promise<void>;

export const CORE_15_RULE_NAMES = [
  "no-monoliths",
  "no-raw-design-tokens",
  "no-local-styles",
  "no-hardcoded-user-strings",
  "i18n-parity",
  "no-direct-route-literals",
  "no-direct-env-access",
  "no-client-fetch-drift",
  "no-schema-duplication",
  "no-unsafe-storage",
  "page-state-contracts",
  "seo-contracts",
  "accessibility-landmarks",
  "no-dead-exports",
  "no-fallback-shims",
  "no-tdz-risks",
  "i18n-translation-quality",
] as const;

export const ALL_RULE_NAMES = [
  ...CORE_15_RULE_NAMES,
  "no-retired-patterns",
  "no-arbitrary-spacing",
  "no-console",
  "no-debug-markers",
  "no-bare-try-catch",
  "no-ts-ignore",
  "no-unknown-casts",
  "no-node-imports",
  "htmx-swap-completeness",
  "bao-archive-policy",
  "no-banned-colors",
  "i18n-key-usage",
  "form-label-controls",
  "htmx-form-contracts",
  "ui-htmx-error-target-not-main-content",
  "ui-status-badge-icon-required",
  "ui-no-peer-origin-literals",
] as const;

export type AllRuleName = (typeof ALL_RULE_NAMES)[number];

export const createRules = (ctx: ValidatorContext): Record<AllRuleName, RuleExecutor> => ({
  "no-monoliths": () => noMonoliths(ctx),
  "no-raw-design-tokens": () => noRawDesignTokens(ctx),
  "no-local-styles": () => noLocalStyles(ctx),
  "no-hardcoded-user-strings": () => noHardcodedUserStrings(ctx),
  "i18n-parity": () => i18nParity(ctx),
  "no-direct-route-literals": () => noDirectRouteLiterals(ctx),
  "no-direct-env-access": () => noDirectEnvAccess(ctx),
  "no-client-fetch-drift": () => noClientFetchDrift(ctx),
  "no-schema-duplication": async () => noSchemaDuplication(ctx),
  "no-unsafe-storage": () => noUnsafeStorage(ctx),
  "page-state-contracts": () => pageStateContracts(ctx),
  "seo-contracts": () => seoContracts(ctx),
  "accessibility-landmarks": () => accessibilityLandmarks(ctx),
  "no-dead-exports": () => noDeadExports(ctx),
  "no-fallback-shims": () => noFallbackShims(ctx),
  "no-tdz-risks": () => noTdzRisks(ctx),
  "i18n-translation-quality": () => i18nTranslationQuality(ctx),
  "no-retired-patterns": () => noRetiredPatterns(ctx),
  "no-arbitrary-spacing": () => noArbitrarySpacing(ctx),
  "no-console": () => noConsole(ctx),
  "no-debug-markers": () => noDebugMarkers(ctx),
  "no-bare-try-catch": () => noBareTryCatch(ctx),
  "no-ts-ignore": () => noTsIgnore(ctx),
  "no-unknown-casts": () => noUnknownCasts(ctx),
  "no-node-imports": () => noNodeImports(ctx),
  "htmx-swap-completeness": () => htmxSwapCompleteness(ctx),
  "bao-archive-policy": () => baoArchivePolicy(ctx),
  "no-banned-colors": () => noBannedColors(ctx),
  "i18n-key-usage": () => i18nKeyUsage(ctx),
  "form-label-controls": () => formLabelControls(ctx),
  "htmx-form-contracts": () => htmxFormContracts(ctx),
  "ui-htmx-error-target-not-main-content": () => uiHtmxErrorTargetNotMainContent(ctx),
  "ui-status-badge-icon-required": () => uiStatusBadgeIconRequired(ctx),
  "ui-no-peer-origin-literals": () => uiNoPeerOriginLiterals(ctx),
});
