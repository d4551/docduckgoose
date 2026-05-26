/**
 * Layout Constants for Page Structure.
 *
 * Centralized Tailwind CSS class definitions for consistent page layouts.
 * This module provides:
 *
 * - Page container classes with responsive widths
 * - Section padding and gutter presets
 * - Content stacking utilities
 * - Responsive breakpoint-aware spacing
 *
 * @shared/constants/layout
 */

const WHITESPACE_RE: RegExp = /\s/;
const BASE_CONTAINER_CLASS: string = "container mx-auto w-full";

/** PAGE_CONTAINER_CLASS constant. */
export const PAGE_CONTAINER_CLASS = "container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/**
 * Container width presets.
 *
 * `default` is the canonical 80rem (1280px) shell width per the UI/UX
 * governance spec. `narrow` centers reading content. `full` opts out of the
 * container constraint for split layouts. There is no separate `wide` variant —
 * exceeding 7xl introduces line-length and scan-pattern regressions.
 */
export const PAGE_CONTAINER_WIDTHS: Readonly<{
  narrow: "max-w-3xl";
  default: "max-w-7xl";
  full: "max-w-none";
}> = Object.freeze({
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  full: "max-w-none",
});

/** PAGE_SECTION_PADDING constant. */
export const PAGE_SECTION_PADDING: Readonly<{
  compact: "py-4";
  cozy: "py-6";
  spacious: "py-8";
  relaxed: "py-10";
}> = Object.freeze({
  compact: "py-4",
  cozy: "py-6",
  spacious: "py-8",
  relaxed: "py-10",
});

/** PAGE_SECTION_GUTTER constant. */
export const PAGE_SECTION_GUTTER: Readonly<{
  none: "px-0 py-0";
  compact: "px-4 py-4 sm:px-5 lg:px-6";
  cozy: "px-4 py-6 sm:px-6 lg:px-8";
  spacious: "px-6 py-8 sm:px-8 lg:px-10";
  relaxed: "px-8 py-10 sm:px-10 lg:px-14";
}> = Object.freeze({
  none: "px-0 py-0",
  compact: "px-4 py-4 sm:px-5 lg:px-6",
  cozy: "px-4 py-6 sm:px-6 lg:px-8",
  spacious: "px-6 py-8 sm:px-8 lg:px-10",
  relaxed: "px-8 py-10 sm:px-10 lg:px-14",
});

/**
 * Default vertical spacing between page content blocks.
 */
export const PAGE_CONTENT_STACK = "space-y-6";

/**
 * Resolve Tailwind container + padding classes for a page section.
 *
 * @param [options={}] - Layout options
 * @param [options.width='default'] - Container width preset
 * @param [options.padding='cozy'] - Padding preset(s) or raw class string
 * @param [options.centered=false] - Use narrower width for centered content
 * @param [options.bleed=false] - Disable container constraints (full width)
 * @returns Tailwind class string
 */
export const resolvePageSectionClasses: ({
  width,
  padding,
  centered,
  bleed,
}?: {
  width?: keyof typeof PAGE_CONTAINER_WIDTHS;
  padding?: keyof typeof PAGE_SECTION_GUTTER | (keyof typeof PAGE_SECTION_GUTTER)[] | string;
  centered?: boolean;
  bleed?: boolean;
}) => string = ({
  width = "default",
  padding = "cozy",
  centered = false,
  bleed = false,
}: {
  width?: keyof typeof PAGE_CONTAINER_WIDTHS;
  padding?: keyof typeof PAGE_SECTION_GUTTER | (keyof typeof PAGE_SECTION_GUTTER)[] | string;
  centered?: boolean;
  bleed?: boolean;
} = {}) => {
  const widthKey =
    centered && width !== "full" ? "narrow" : (width as keyof typeof PAGE_CONTAINER_WIDTHS);
  const widthClass = PAGE_CONTAINER_WIDTHS[widthKey] ?? PAGE_CONTAINER_WIDTHS.default;

  const resolvePadding = (value: typeof padding): string => {
    if (Array.isArray(value)) {
      return value
        .map((entry) => (PAGE_SECTION_GUTTER[entry] ? PAGE_SECTION_GUTTER[entry] : entry))
        .join(" ");
    }

    if (WHITESPACE_RE.test(value) || value.includes("-")) {
      return value;
    }
    return PAGE_SECTION_GUTTER[value as keyof typeof PAGE_SECTION_GUTTER]
      ? PAGE_SECTION_GUTTER[value as keyof typeof PAGE_SECTION_GUTTER]
      : PAGE_SECTION_GUTTER.cozy;
  };

  const paddingClass = resolvePadding(padding);

  if (bleed) {
    return `w-full ${paddingClass}`.trim().replace(/\s+/g, " ");
  }

  return `${BASE_CONTAINER_CLASS} ${widthClass} ${paddingClass}`.trim().replace(/\s+/g, " ");
};
