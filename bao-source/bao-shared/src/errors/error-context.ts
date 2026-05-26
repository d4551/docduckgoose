/**
 * Per-operation error envelope used by telemetry + error-boundary consumers.
 *
 * Co-located with the canonical `UI_ERROR_CATEGORIES` taxonomy
 * (`./ui-error-classification`). The {@link ErrorSeverity} token comes from
 * `@baohaus/bao-utils/error-severity` — a leaf-level enum that does not pull
 * any UI-layer dependency back into bao-utils.
 *
 * @shared/errors/error-context
 */

import type { ErrorSeverity } from "@baohaus/bao-utils/error-severity";
import type { UiErrorCategory } from "./ui-error-classification";

/**
 * Structured per-operation error envelope.
 */
export interface ErrorContext {
  /** Stable identifier for the subsystem that produced the failure. */
  readonly componentName: string;
  /** Short verb-phrase identifier for the in-flight operation. */
  readonly operation: string;
  /**
   * Optional digest of the input that produced the failure. Useful for grouping
   * identical-payload failures in the analytics pipeline. `null` when the input
   * is too large / non-content-addressable.
   */
  readonly inputDataHash: string | null;
  /** Optional model identifier for AI-model operations. */
  readonly modelName: string | null;
  /** Optional session identifier for request-scoped failures. */
  readonly sessionId: string | null;
  /** Epoch milliseconds when the failure was observed. */
  readonly timestamp: number;
  /** Severity token; see {@link ErrorSeverity}. */
  readonly severity: ErrorSeverity;
  /**
   * Canonical UI category token; see {@link UiErrorCategory}.
   */
  readonly category: UiErrorCategory;
  /** Zero-indexed retry attempt count for this operation. */
  readonly attemptCount: number;
  /** Maximum attempts allowed before the operation is abandoned. */
  readonly maxRetries: number;
}
