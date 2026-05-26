/**
 * Pure heuristic that maps a failure description (message + error-class name +
 * optional model name) onto the canonical {@link UiErrorCategory} +
 * {@link ErrorSeverity} taxonomies.
 *
 * Adopted from the navi error-boundary `_classify_error` regex map; routed
 * through the bao-shared `UiErrorCategory` taxonomy so the categorization
 * stays single-sourced. Severity comes from `@baohaus/bao-utils/error-severity`
 * — both enums are leaf-level (no further dependencies).
 *
 * The function is side-effect-free: it does not log, does not throw, does not
 * mutate. Returns the same output for the same input on every call.
 *
 * @shared/errors/classify-error
 */

import { ERROR_SEVERITY, type ErrorSeverity } from "@baohaus/bao-utils/error-severity";
import { UI_ERROR_CATEGORIES, type UiErrorCategory } from "./ui-error-classification";

/** Input shape supplied to {@link classifyError}. */
export interface ClassifyErrorInput {
  readonly message: string;
  readonly errorTypeName: string;
  readonly modelName?: string | null;
}

/** Classification result returned by {@link classifyError}. */
export interface ClassifyErrorOutput {
  readonly category: UiErrorCategory;
  readonly severity: ErrorSeverity;
}

const NETWORK_KEYWORDS = /\b(connection|dns|network)\b/i;
const TIMEOUT_KEYWORDS = /\btimeout\b/i;
const AUTH_KEYWORDS = /\b(auth|token|api[_-]?key|credential)\b/i;
const QUOTA_KEYWORDS = /\b(quota|rate|limit|exceeded)\b/i;
const RESOURCE_KEYWORDS = /\b(memory|gpu|cuda|resource)\b/i;
const MODEL_LOAD_KEYWORDS = /\b(model|load|import|missing)\b/i;
const CONFIGURATION_KEYWORDS = /\b(config|parameter|invalid)\b/i;

/**
 * Classify a failure description into a canonical category + severity pair.
 *
 * Pure function. Same inputs → same outputs.
 */
export function classifyError(input: ClassifyErrorInput): ClassifyErrorOutput {
  const message = input.message.toLowerCase();
  const errorType = input.errorTypeName.toLowerCase();

  // Timeout is checked before quota because "deadline exceeded" overlaps with
  // QUOTA_KEYWORDS' "exceeded" trigger. errorType-based timeout detection takes
  // priority over message-keyword classification per navi heuristic semantics.
  if (errorType.includes("timeout") || TIMEOUT_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.Timeout, severity: ERROR_SEVERITY.Medium };
  }
  if (NETWORK_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.Network, severity: ERROR_SEVERITY.High };
  }
  if (AUTH_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.Unauthorized, severity: ERROR_SEVERITY.Critical };
  }
  if (QUOTA_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.RateLimited, severity: ERROR_SEVERITY.Medium };
  }
  if (RESOURCE_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.ServerError, severity: ERROR_SEVERITY.High };
  }
  if (MODEL_LOAD_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.ServerError, severity: ERROR_SEVERITY.High };
  }
  if (CONFIGURATION_KEYWORDS.test(message)) {
    return { category: UI_ERROR_CATEGORIES.Validation, severity: ERROR_SEVERITY.Medium };
  }
  if (input.modelName !== null && input.modelName !== undefined && input.modelName.length > 0) {
    return { category: UI_ERROR_CATEGORIES.ServerError, severity: ERROR_SEVERITY.Medium };
  }
  return { category: UI_ERROR_CATEGORIES.Unknown, severity: ERROR_SEVERITY.Medium };
}
