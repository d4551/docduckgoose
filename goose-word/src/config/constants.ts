/**
 * Single source of truth for goose-word application-level constants.
 * Used to eliminate magic strings/hardcodes across the codebase.
 */

export const PREFS_ROW_ID = "default" as const;

export const PLUGIN_SETTINGS_TAB_ENTRYPOINT = "dist/bao-extensions/settings-tab.js" as const;

export const INSTALL_MODE = "copy-first-local-mvp" as const;

/** Server-side docs table page size (HTMX infinite scroll loads more via rows fragment). */
export const DOCS_PAGE_SIZE = 20 as const;

/** Server-side settings table page size (plugins + enterprise contexts). */
export const SETTINGS_TABLE_PAGE_SIZE = 5 as const;
