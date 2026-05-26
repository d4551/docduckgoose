/**
 * Stable BaoDown catalog category slugs for token-driven canvas styling.
 *
 * @shared/baodown/catalog-category
 */

function normalizeCategorySlug(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized.length > 0 ? normalized : "general";
}

/**
 * Infer a palette category slug from a node type id such as `control.start`.
 */
export function inferBaodownCatalogCategorySlugFromTypeId(typeId: string): string {
  const segments = typeId.split(".").filter(Boolean);
  if (segments.length === 0) {
    return "general";
  }
  const root = segments[0] === "baodown" && segments.length > 1 ? segments[1] : segments[0];
  return root ? normalizeCategorySlug(root) : "general";
}

/**
 * Resolve the stable category slug used by canvas CSS selectors.
 */
export function resolveBaodownCatalogCategorySlug(
  typeId: string,
  categoryKey?: string | null,
): string {
  if (categoryKey) {
    const leaf = categoryKey.split(".").at(-1);
    if (leaf) {
      return normalizeCategorySlug(leaf);
    }
  }
  return inferBaodownCatalogCategorySlugFromTypeId(typeId);
}
