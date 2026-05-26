/**
 * Icon Registry Utility.
 *
 * Provides icon name normalization and resolution for the HeroIcon component.
 * This module handles:
 *
 * - Icon name normalization to kebab-case format
 * - Fallback icon resolution when icon is not found
 * - Icon variant resolution (outline, solid)
 * - Case-insensitive icon name matching
 *
 * @baohaus/bao-utils/iconRegistry
 */

// Fallback icon when no icon is found
/** FALLBACK_ICON constant. */
export const FALLBACK_ICON = "beaker";

/**
 * Normalize an icon name to kebab-case.
 *
 * @param name - Icon name to normalize.
 * @returns Normalized icon name.
 */
export function normalizeIconName(name: string | null | undefined): string {
  if (!name || typeof name !== "string") {
    return FALLBACK_ICON;
  }

  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric with dashes
    .replace(/-+/g, "-") // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
}

/**
 * Icon descriptor for rendering variants.
 */
export interface IconDescriptor {
  base: string;
  variant: "outline" | "solid";
  fullName: string;
}

/**
 * Resolve icon descriptor with base name and variant.
 *
 * @param name - Icon name.
 * @param [variant='outline'] - Icon variant ('outline' or 'solid').
 * @returns Icon descriptor with normalized names.
 */
export function resolveIconDescriptor(
  name: string,
  variant: "outline" | "solid" = "outline",
): IconDescriptor {
  const normalizedName = normalizeIconName(name);

  return {
    base: normalizedName,
    variant: variant === "solid" ? "solid" : "outline",
    fullName: variant === "solid" ? `${normalizedName}-solid` : normalizedName,
  };
}

/**
 * Map of common icon name aliases to their canonical names.
 */
export const ICON_ALIASES: Record<string, string> = {
  // Navigation
  home: "home",
  menu: "bars-3",
  hamburger: "bars-3",
  close: "x-mark",
  times: "x-mark",
  back: "arrow-left",
  forward: "arrow-right",
  up: "arrow-up",
  down: "arrow-down",

  // Actions
  search: "magnifying-glass",
  find: "magnifying-glass",
  save: "arrow-down-tray",
  edit: "pencil-square",
  delete: "trash",
  remove: "trash",
  add: "plus",
  create: "plus",
  filter: "funnel",
  sort: "arrows-up-down",
  refresh: "arrow-path",

  // Status
  success: "check-circle",
  error: "x-circle",
  warning: "exclamation-triangle",
  info: "information-circle",
  help: "question-mark-circle",

  // Hardware
  footpedal: "command-line",
  lighting: "light-bulb",
  light: "light-bulb",
  imager: "camera",
  camera: "camera",
  device: "computer-desktop",
  connection: "wifi",
  power: "power",
  calibration: "adjustments-horizontal",

  // Medical/Pathology
  pathology: "beaker",
  specimen: "beaker",
  microscope: "beaker",
  sample: "rectangle-group",
  report: "document-text",
  patient: "user-circle",
  analysis: "chart-bar-square",
  results: "chart-bar-square",
  image: "photo",
  scan: "qr-code",

  // System
  settings: "cog-6-tooth",
  config: "cog-6-tooth",
  profile: "user-circle",
  account: "user-circle",
  dashboard: "presentation-chart-line",
  overview: "squares-2x2",
  notification: "bell",

  // Data
  cloud: "cloud",
  download: "arrow-down-tray",
  upload: "arrow-up-tray",
  database: "circle-stack",
  folder: "folder",
  file: "document-text",

  // UI
  expand: "arrows-pointing-out",
  collapse: "arrows-pointing-in",
  maximize: "arrows-pointing-out",
  minimize: "arrow-down",
  grid: "squares-2x2",
  list: "list-bullet",
};

/**
 * Resolve icon name using aliases.
 *
 * @param name - Icon name (possibly an alias).
 * @returns Canonical icon name.
 */
export function resolveIconAlias(name: string): string {
  const normalizedName = normalizeIconName(name);
  return ICON_ALIASES[normalizedName] || normalizedName;
}

/**
 * Check if an icon name is valid (exists in our mapping or is a standard heroicon).
 *
 * @param name - Icon name to validate.
 * @returns True when the icon name is considered valid.
 */
export function isValidIconName(name: unknown): boolean {
  if (!name || typeof name !== "string") {
    return false;
  }

  const normalized = normalizeIconName(name);
  const resolved = resolveIconAlias(normalized);

  // Consider it valid if it's not empty after normalization
  return resolved.length > 0;
}

/**
 * Get suggested icon names based on a search term.
 *
 * @param searchTerm - Term to search for.
 * @returns Array of suggested icon names.
 */
export function suggestIconNames(searchTerm: unknown): string[] {
  if (!searchTerm || typeof searchTerm !== "string") {
    return [];
  }

  const normalized = normalizeIconName(searchTerm);
  const suggestions = [];

  // Check aliases
  for (const [alias, canonical] of Object.entries(ICON_ALIASES)) {
    if (alias.includes(normalized) || canonical.includes(normalized)) {
      suggestions.push(canonical);
    }
  }

  // Add the normalized search term itself
  if (!suggestions.includes(normalized)) {
    suggestions.push(normalized);
  }

  // Add fallback if no suggestions
  if (suggestions.length === 0) {
    suggestions.push(FALLBACK_ICON);
  }

  return [...new Set(suggestions)]; // Remove duplicates
}

/**
 * Icon categories for organization.
 */
export const ICON_CATEGORIES: Record<string, string[]> = {
  navigation: [
    "home",
    "bars-3",
    "x-mark",
    "chevron-right",
    "chevron-left",
    "arrow-left",
    "arrow-right",
  ],
  actions: ["plus", "minus", "pencil", "trash", "magnifying-glass", "check", "x-mark"],
  status: ["check-circle", "x-circle", "exclamation-triangle", "information-circle", "clock"],
  hardware: ["camera", "light-bulb", "computer-desktop", "server-stack", "cpu-chip"],
  medical: ["beaker", "chart-bar", "chart-bar-square", "academic-cap", "book-open"],
  system: ["cog-6-tooth", "user-circle", "cloud", "shield-check", "key"],
  ui: ["squares-2x2", "list-bullet", "table-cells", "window", "document-text"],
};

/**
 * Get icons by category
 * @param category - Category name
 * @returns Array of icon names in the category
 */
export function getIconsByCategory(category: string): string[] {
  return ICON_CATEGORIES[category] || [];
}

/**
 * Get all available categories
 * @returns Array of category names
 */
export function getIconCategories(): string[] {
  return Object.keys(ICON_CATEGORIES);
}

/**
 * Map an icon name to its canonical icon key.
 * @param name - The icon name to map
 * @param [variant='outline'] - Desired variant
 * @returns Canonical icon key compatible with HeroIcon
 */
export function mapIcon(name: unknown, variant: unknown = "outline"): string {
  if (name == null) {
    return FALLBACK_ICON;
  }
  const trimmed = String(name).trim();
  if (!trimmed) {
    return FALLBACK_ICON;
  }

  const normalized = normalizeIconName(trimmed);
  const resolved = resolveIconAlias(normalized);
  const iconVariant = variant === "solid" ? "solid" : "outline";
  const descriptor = resolveIconDescriptor(resolved, iconVariant);
  return descriptor.base;
}

/**
 * Check if an icon name exists in mappings
 * @param name - The icon name to check
 * @returns True if the icon exists in our aliases
 */
export function hasIcon(name: string): boolean {
  if (!name) {
    return false;
  }
  const normalized = normalizeIconName(name);
  return ICON_ALIASES[normalized] !== undefined;
}
