/**
 * Four mandated page-state primitives — loading, empty, error, success.
 *
 * Every routable page must wire all four states through these helpers so the
 * `page-state-contracts` validator passes and so each surface tells the user
 * what is happening at every moment.
 *
 * @packageDocumentation
 */

import { escapeAttr } from "../html.js";
import { renderAlert } from "./alert.js";
import { MAIN_CONTENT_SELECTOR, SHELL_LOADING_INDICATOR_SELECTOR } from "./design-tokens.js";
import { type EmptyStateProps, renderEmptyState } from "./empty-state.js";
import { renderCardSkeleton, renderTableSkeleton } from "./skeleton.js";
import type { TranslateFn } from "./types.js";

/** Skeleton variant used by the shared loading helper. */
export type LoadingSkeletonVariant = "card" | "table" | "spinner";

/** Loading skeleton options for a route-level loading region. */
export interface LoadingSkeletonProps {
  /** Translator callback for the live-region label. */
  readonly translate: TranslateFn;
  /** Skeleton style. Defaults to `card`. */
  readonly variant?: LoadingSkeletonVariant;
  /** Number of table columns when `variant === "table"`. Defaults to 4. */
  readonly columns?: number;
  /** Number of skeleton rows when `variant === "table"`. Defaults to 5. */
  readonly rows?: number;
  /** Optional `aria-label` override. Defaults to `common.a11y.loadingIndicator`. */
  readonly ariaLabel?: string;
}

/** Empty-state options for a route-level empty region. */
export type EmptyStateContractProps = EmptyStateProps;

/** Error-state options for a route-level fatal region. */
export interface ErrorStateProps {
  /** Localised error title. */
  readonly title: string;
  /** Translator callback for the default retry label. */
  readonly translate: TranslateFn;
  /** Optional localised description. */
  readonly description?: string;
  /** Optional retry href. Renders a retry link when provided. */
  readonly retryHref?: string;
  /** Optional retry label. Defaults to `common.actions.retry`. */
  readonly retryLabel?: string;
}

/** Success-state options wrapping rendered content. */
export interface SuccessStateProps {
  /** Rendered HTML content for the success region. */
  readonly contentHtml: string;
  /** Optional `aria-label` for the success region. */
  readonly ariaLabel?: string;
}

/**
 * Render a loading skeleton for an HTMX-loaded data region.
 *
 * @param props - Skeleton variant and translator.
 * @returns HTML string.
 */
export function loadingSkeleton(props: LoadingSkeletonProps): string {
  const variant = props.variant ?? "card";
  const ariaLabel = escapeAttr(props.ariaLabel ?? props.translate("common.a11y.loadingIndicator"));
  if (variant === "table") {
    const columns = props.columns ?? 4;
    const rows = props.rows ?? 5;
    return `<table class="table" role="status" aria-busy="true" aria-label="${ariaLabel}"><tbody>${renderTableSkeleton(columns, rows)}</tbody></table>`;
  }
  if (variant === "spinner") {
    return `<div class="flex items-center justify-center py-12" role="status" aria-busy="true" aria-label="${ariaLabel}"><span class="loading loading-spinner loading-lg" aria-hidden="true"></span><span class="sr-only">${ariaLabel}</span></div>`;
  }
  return `<div role="status" aria-busy="true" aria-label="${ariaLabel}">${renderCardSkeleton(props.translate)}</div>`;
}

/**
 * Render the empty state for a list or data region.
 *
 * Delegates to the shared empty-state primitive and exposes the
 * `emptyState(` token required by `page-state-contracts`.
 *
 * @param props - Empty-state props.
 * @returns HTML string.
 */
export function emptyState(props: EmptyStateContractProps): string {
  return renderEmptyState(props);
}

/**
 * Render the error state for a fatal page region.
 *
 * @param props - Error props.
 * @returns HTML string.
 */
export function errorState(props: ErrorStateProps): string {
  if (!props.retryHref) {
    return renderAlert("error", props.title, props.description);
  }
  const retryLabel = props.retryLabel ?? props.translate("common.actions.retry");
  const detailsHtml = `<div class="mt-3"><a class="btn btn-sm btn-outline" href="${escapeAttr(props.retryHref)}" hx-get="${escapeAttr(props.retryHref)}" hx-target="${escapeAttr(MAIN_CONTENT_SELECTOR)}" hx-swap="innerHTML" hx-indicator="${escapeAttr(SHELL_LOADING_INDICATOR_SELECTOR)}">${escapeAttr(retryLabel)}</a></div>`;
  return renderAlert("error", props.title, props.description, { detailsHtml });
}

/**
 * Wrap rendered content in a success region with an explicit `data-page-state`
 * marker so route modules satisfy the contract's success-state token.
 *
 * @param props - Content and optional `aria-label`.
 * @returns HTML string.
 */
export function successState(props: SuccessStateProps): string {
  const ariaLabel = props.ariaLabel ? ` aria-label="${escapeAttr(props.ariaLabel)}"` : "";
  return `<div data-page-state="ready" role="region"${ariaLabel}>${props.contentHtml}</div>`;
}
