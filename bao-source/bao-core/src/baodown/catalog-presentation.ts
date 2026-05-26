/**
 * Token-driven BaoDown catalog presentation derived from registry metadata.
 *
 * @shared/baodown/catalog-presentation
 */

import type { BaoDownEdgeKind } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";

/** daisyUI semantic tokens used by canvas nodes and palette badges. */
export type BaodownCatalogAccentToken =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

const CATEGORY_ACCENT_BY_SLUG: Readonly<Record<string, BaodownCatalogAccentToken>> = {
  ai: "secondary",
  annotation: "info",
  annotations: "info",
  commerce: "success",
  control: "primary",
  data: "accent",
  hardware: "error",
  integration: "warning",
  medical: "info",
  storage: "success",
  transform: "secondary",
  trigger: "warning",
};

/**
 * Resolve the accent token that drives node chrome and palette badges.
 */
export function resolveBaodownCatalogAccentToken(
  categorySlug: string,
  kind: BaoDownEdgeKind,
): BaodownCatalogAccentToken {
  const mapped = CATEGORY_ACCENT_BY_SLUG[categorySlug];
  if (mapped) {
    return mapped;
  }
  return kind === "control" ? "primary" : "accent";
}
