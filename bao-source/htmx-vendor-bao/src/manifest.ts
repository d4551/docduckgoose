/**
 * @baohaus/htmx-vendor-bao/manifest
 *
 * Stable relative paths inside `dist/vendor/` after `bun run build`.
 */

export const PACKAGE_NAME = "@baohaus/htmx-vendor-bao" as const;
export const UPSTREAM_PACKAGE = "htmx.org@2.0.10" as const;

export const HTMX_CORE_RELATIVE_PATH = "htmx/dist/htmx.min.js" as const;
export const HTMX_VENDOR_EXTENSION_DIR = "htmx-ext" as const;
