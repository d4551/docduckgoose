import type { ValidatorConfig } from "../bao/src/gates/validators/context.ts";

/**
 * Validator configuration for goose-word.
 * Defines allowlists for legitimate exceptions to hard bans when the full
 * Bao code-quality gate suite is run against this package.
 *
 * Usage (from monorepo root or bao/):
 *   bun run --cwd ./bao validate all -- --root ./goose-word -c ./goose-word/validator.config.ts
 *   (or integrate into goose-word/scripts/bao-validate.ts)
 */
export const validatorConfig = {
  maxFileLines: 1000,
  allowedDirectEnvAccessFiles: new Set([
    "src/config/paths.ts",
    "src/config/speech.ts",
  ]),
  allowedClientStorageFiles: new Set<string>(), // none currently used
  allowedClientFetchFiles: new Set([
    // Sanctioned client transport layer (SSOT routes + centralized fetch).
    // All client-side network calls for speech, preferences, health, etc.
    // go through these after the SSOT injection work.
    "bao-source/goose-word-ui-bao/public/client/api-client.js",
    "bao-source/goose-word-ui-bao/public/client/routes.js",
  ]),
  routeExclusionPath: "src/config/routes.ts",
  deadExportIgnorePrefixes: [],
  // Dynamic <style> for @font-face blocks generated from the user-selected
  // font catalog + preferences. This is data-driven runtime CSS, not raw
  // design tokens or arbitrary one-off styles. Covered by the no-local-styles
  // gate allowlist + source comments.
  ignorePatterns: [],
} satisfies ValidatorConfig;