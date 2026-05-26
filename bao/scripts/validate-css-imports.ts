/*
 * validate-css-imports — single source of truth for CSS-discipline gates
 * shared by bao-runtime, registry, forge, and happydumpling.
 *
 * Enforces:
 *   1. No CDN refs in CSS (hard) and no CDN refs as runtime asset URLs in
 *      TS renderers (link/script/import string-literal contexts).
 *   2. Raw hex colors only inside the explicit token files (brand-theme,
 *      daisyui, layout-tokens, fonts, happydumpling-app, happydumpling).
 *      `rgba()`/`hsla()`/`oklch()`/`oklab()` only flag when they wrap a
 *      raw numeric triple (no `var(--*)` operand).
 *   3. font-family literals (string-or-list values) only inside font-token
 *      files. `font-family: var(--*)` and `@font-face` declarations are
 *      legitimate and exempt.
 *   4. Service stylesheets must @import the happydumpling foundation.
 *      base-critical.css is an inlined critical-CSS contract (no import).
 *   5. No Tailwind v3 @apply forms with arbitrary raw colors.
 *   6. No inline `style=""` in TS renderers (email templates exempt — email
 *      clients strip <style> blocks; SVG dynamic style attrs allowed).
 *   7. No duplicate `:root`/`@theme` blocks across services. The @theme
 *      contract lives in bao-source/happydumpling and brand-theme.css.
 *   8. .stylelintrc.json parity for the canonical rules across services.
 *   9. No lint-suppression comments in CSS-related TypeScript renderers.
 */
import type { JsonField, JsonRecord } from "./policy/shared.ts";
import { fail, ok, readJson, requireJsonRecord } from "./policy/shared.ts";

const baohausRoot = Bun.fileURLToPath(new URL("../../", import.meta.url)).replace(/[\\/]$/, "");

/**
 * Service stylesheets that MUST import the happydumpling foundation.
 * base-critical.css is intentionally excluded: it is the inline critical
 * CSS string for the base layout `<head>`, not a service stylesheet.
 */
const FOUNDATION_REQUIRED_STYLESHEETS = [
  "registry/src/client/styles.css",
  "forge/src/client/styles.css",
  "bao-runtime/src/http/templates/styles/htmx-ui.css",
  "bao-desktop/src/styles/app.css",
  "bao-ai-gateway/web/app.css",
  "bao-source/forge-server/src/client/forge-app.css",
  "bao-source/bigbadbao/src/client/bigbadbao.css",
] as const;

const STYLELINT_CONFIGS = [
  "bao-runtime/.stylelintrc.json",
  "registry/.stylelintrc.json",
  "forge/.stylelintrc.json",
] as const;

/** Files allowed to contain raw color literals. Centralized token surfaces. */
const TOKEN_FILE_PATTERNS = [
  /\/happydumpling\/assets\/styles\/brand-theme\.css$/,
  /\/happydumpling\/assets\/styles\/daisyui\.css$/,
  /\/happydumpling\/assets\/styles\/core\/layout-tokens\.css$/,
  /\/happydumpling\/assets\/styles\/fonts\.local\.css$/,
  /\/happydumpling\/assets\/happydumpling\.css$/,
  /\/happydumpling\/assets\/styles\/happydumpling-app\.css$/,
];

/** Files allowed to contain font-family literal lists. */
const FONT_FAMILY_ALLOWED_PATTERNS = [
  /\/happydumpling\/assets\/styles\/fonts\.local\.css$/,
  /\/happydumpling\/assets\/styles\/brand-theme\.css$/,
  /\/happydumpling\/assets\/happydumpling\.css$/,
  /\/happydumpling\/assets\/styles\/happydumpling-app\.css$/,
  /\/happydumpling\/assets\/styles\/daisyui\.css$/,
  /\/happydumpling\/assets\/styles\/core\/layout-tokens\.css$/,
  // Service-level @theme font tokens are legitimate (--font-sans/display/mono).
  /\/registry\/src\/client\/styles\.css$/,
  /\/forge\/src\/client\/styles\.css$/,
];

/**
 * TS paths exempt from inline-style scanning.
 * - Email templates: HTML email clients strip <style> blocks; inline styles
 *   are an industry-best-practice contract (Litmus, MJML, etc.).
 * - Test files: not implementation paths.
 */
const INLINE_STYLE_EXEMPT_PATTERNS = [
  /\/email\/[^/]+\/templates\//,
  /\/email\/templates\//,
  /\.test\./,
  /\/test\//,
  /\/__tests__\//,
  /-test\.ts$/,
  /\.spec\./,
];

const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/g;
const FUNC_COLOR_PATTERN = /\b(?:rgba?|hsla?|oklch|oklab)\(([^()]*)\)/g;
const FONT_FAMILY_PATTERN = /font-family\s*:\s*([^;\n]+)/g;
const ARBITRARY_APPLY_PATTERN = /@apply\s+[^;]*\b(?:bg|text|border)-\[(?:#|rgb|hsl|oklch|oklab)/g;
const ROOT_OR_THEME_PATTERN = /(?:^|\n)\s*(?:@theme\b|:root\s*\{)/g;
const INLINE_STYLE_TS_PATTERN = /\sstyle=["'`]/g;
const BIOME_IGNORE_PATTERN = new RegExp(["biome", "ignore"].join("-"), "g");
const TS_RUNTIME_ASSET_PATTERN =
  /(?:href|src)\s*=\s*["'`](https?:\/\/[^"'`\s]+\.(?:css|woff2?|ttf|otf|js))["'`]|import\s+["'`](https?:\/\/[^"'`]+)["'`]/g;
const CSS_CDN_PATTERN = /https?:\/\/[^"'\s)]+\.(?:css|woff2?|ttf|otf|js)\b/g;
const FONT_FACE_PATTERN = /@font-face\s*\{[^}]*\}/g;
const PATH_SEGMENT_SPLIT_PATTERN = /[\\/]/;
const FUNC_COLOR_VAR_PATTERN = /\bvar\(--/;
const FONT_FAMILY_PREFIX_PATTERN = /^font-family\s*:\s*/;
const FONT_FAMILY_KEYWORD_PATTERN = /^(?:inherit|initial|unset|revert|revert-layer|none)\b/;
const FOUNDATION_IMPORT_PATTERN = /@import\s+["']@baohaus\/happydumpling\/assets\/[^"']+["']/;

const isPathAllowed = (path: string, patterns: readonly RegExp[]): boolean =>
  patterns.some((pattern) => pattern.test(path));

const failures: string[] = [];

const isCssOrTsBuildArtifact = (segments: readonly string[]): boolean =>
  segments.includes("node_modules") ||
  segments.includes("dist") ||
  segments.includes(".bao-build") ||
  segments.includes(".generated") ||
  segments.includes("coverage") ||
  segments.includes("artifacts");

const cssFiles = async (): Promise<string[]> => {
  const files: string[] = [];
  const roots = ["registry/src", "forge/src", "bao-runtime/src", "bao-source/happydumpling/assets"];
  for (const root of roots) {
    for await (const file of new Bun.Glob("**/*.css").scan({
      cwd: `${baohausRoot}/${root}`,
      onlyFiles: true,
    })) {
      const segments = file.split(PATH_SEGMENT_SPLIT_PATTERN);
      if (isCssOrTsBuildArtifact(segments)) {
        continue;
      }
      files.push(`${root}/${file}`);
    }
  }
  return files;
};

const tsRendererFiles = async (): Promise<string[]> => {
  const files: string[] = [];
  for (const root of ["registry/src", "forge/src", "bao-runtime/src"]) {
    for await (const file of new Bun.Glob("**/*.ts").scan({
      cwd: `${baohausRoot}/${root}`,
      onlyFiles: true,
    })) {
      const segments = file.split(PATH_SEGMENT_SPLIT_PATTERN);
      if (isCssOrTsBuildArtifact(segments)) {
        continue;
      }
      files.push(`${root}/${file}`);
    }
  }
  return files;
};

const scan = (
  text: string,
  pattern: RegExp,
  recorder: (line: number, column: number, match: string) => void,
): void => {
  const lines = text.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const lineText = lines[index] ?? "";
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null = pattern.exec(lineText);
    while (match !== null) {
      recorder(index + 1, match.index + 1, match[0]);
      if (!pattern.global) {
        break;
      }
      match = pattern.exec(lineText);
    }
  }
};

/** Strip @font-face blocks before scanning so the family declaration inside is not flagged. */
const stripFontFaceBlocks = (text: string): string => text.replace(FONT_FACE_PATTERN, "");

const reportCssCdnRefs = (path: string, text: string): void => {
  scan(text, CSS_CDN_PATTERN, (line, _column, match) => {
    failures.push(`${path}:${line} CDN reference forbidden in CSS: ${match}`);
  });
};

const reportTsCdnAssetRefs = (path: string, text: string): void => {
  scan(text, TS_RUNTIME_ASSET_PATTERN, (line, _column, match) => {
    failures.push(`${path}:${line} runtime asset CDN reference forbidden: ${match}`);
  });
};

const reportRawColors = (path: string, text: string): void => {
  if (isPathAllowed(path, TOKEN_FILE_PATTERNS)) {
    return;
  }
  scan(text, HEX_COLOR_PATTERN, (line, _column, match) => {
    failures.push(`${path}:${line} raw hex color "${match}" outside token files`);
  });
  scan(text, FUNC_COLOR_PATTERN, (line, _column, match) => {
    // Functions wrapping a `var(--*)` token are legitimate alpha-compositions.
    if (FUNC_COLOR_VAR_PATTERN.test(match)) {
      return;
    }
    failures.push(`${path}:${line} raw color function "${match}" outside token files`);
  });
};

const reportFontFamilyLiterals = (path: string, text: string): void => {
  if (isPathAllowed(path, FONT_FAMILY_ALLOWED_PATTERNS)) {
    return;
  }
  const stripped = stripFontFaceBlocks(text);
  scan(stripped, FONT_FAMILY_PATTERN, (line, _column, match) => {
    const value = match.replace(FONT_FAMILY_PREFIX_PATTERN, "").trim();
    if (value.startsWith("var(")) {
      return;
    }
    if (FONT_FAMILY_KEYWORD_PATTERN.test(value)) {
      return;
    }
    failures.push(`${path}:${line} font-family literal "${value}" outside token files`);
  });
};

const importsFoundation = (text: string): boolean => FOUNDATION_IMPORT_PATTERN.test(text);

const reportFoundationImport = (relativePath: string, text: string): void => {
  if (
    !FOUNDATION_REQUIRED_STYLESHEETS.includes(
      relativePath as (typeof FOUNDATION_REQUIRED_STYLESHEETS)[number],
    )
  ) {
    return;
  }
  if (!importsFoundation(text)) {
    failures.push(
      `${relativePath} must @import @baohaus/happydumpling/assets/* (foundation contract)`,
    );
  }
};

const reportArbitraryApply = (path: string, text: string): void => {
  scan(text, ARBITRARY_APPLY_PATTERN, (line, _column, match) => {
    failures.push(`${path}:${line} arbitrary @apply with raw color: ${match}`);
  });
};

const reportRootThemeBlocks = (path: string, text: string): void => {
  if (isPathAllowed(path, TOKEN_FILE_PATTERNS)) {
    return;
  }
  if (path.endsWith("/base-critical.css")) {
    return;
  }
  let count = 0;
  scan(text, ROOT_OR_THEME_PATTERN, () => {
    count += 1;
  });
  if (count > 1) {
    failures.push(`${path} declares ${count} :root/@theme blocks; foundation owns design tokens`);
  }
};

const reportInlineStyles = (path: string, text: string): void => {
  if (isPathAllowed(path, INLINE_STYLE_EXEMPT_PATTERNS)) {
    return;
  }
  scan(text, INLINE_STYLE_TS_PATTERN, (line) => {
    failures.push(
      `${path}:${line} inline style="" attribute forbidden (use design-token utility classes)`,
    );
  });
};

const reportBiomeIgnore = (path: string, text: string): void => {
  scan(text, BIOME_IGNORE_PATTERN, (line, _column, match) => {
    failures.push(`${path}:${line} ${match} suppression forbidden`);
  });
};

const ruleFingerprint = (rules: JsonRecord): string => {
  const keys = [
    "max-nesting-depth",
    "selector-max-specificity",
    "selector-max-id",
    "declaration-no-important",
  ] as const;
  const view: Record<string, JsonField> = {};
  for (const key of keys) {
    view[key] = rules[key] ?? null;
  }
  return JSON.stringify(view);
};

const reportStylelintParity = async (): Promise<void> => {
  const fingerprints = new Map<string, string>();
  for (const config of STYLELINT_CONFIGS) {
    const path = `${baohausRoot}/${config}`;
    if (!(await Bun.file(path).exists())) {
      failures.push(`${config} missing — every service must publish a stylelint config`);
      continue;
    }
    const record = requireJsonRecord(await readJson(path), config);
    const rules = requireJsonRecord(record.rules ?? {}, `${config}.rules`);
    fingerprints.set(config, ruleFingerprint(rules));
  }
  const unique = new Set(fingerprints.values());
  if (unique.size > 1) {
    const detail = Array.from(fingerprints.entries())
      .map(([name, sig]) => `  ${name} -> ${sig}`)
      .join("\n");
    failures.push(`stylelint config drift detected:\n${detail}`);
  }
};

const main = async (): Promise<void> => {
  for (const path of await cssFiles()) {
    const fullPath = `${baohausRoot}/${path}`;
    const text = await Bun.file(fullPath).text();
    reportCssCdnRefs(path, text);
    reportRawColors(path, text);
    reportFontFamilyLiterals(path, text);
    reportFoundationImport(path, text);
    reportArbitraryApply(path, text);
    reportRootThemeBlocks(path, text);
  }

  for (const path of await tsRendererFiles()) {
    const fullPath = `${baohausRoot}/${path}`;
    const text = await Bun.file(fullPath).text();
    reportTsCdnAssetRefs(path, text);
    reportInlineStyles(path, text);
    reportBiomeIgnore(path, text);
  }

  await reportStylelintParity();

  fail(failures);
  ok("validate:css-imports");
};

await main();
