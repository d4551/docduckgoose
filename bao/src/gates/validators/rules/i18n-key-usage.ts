import type { ValidatorContext } from "../context.ts";

const WINDOWS_DRIVE_PATTERN = /^\/[A-Za-z]:\//u;
const TRANSLATE_CALL_PATTERN = /translate(?:Count)?\(locale,\s*"(?<key>[^"]+)"/g;
const I18N_SOURCE_PATTERN = /src\/server\/(?:html|i18n)\/.*\.ts$/;
const RELATIVE_PATH_PATTERN = /^\.\//;

const toPlatformPath = (url: URL): string => {
  const pathname = decodeURIComponent(url.pathname);
  return WINDOWS_DRIVE_PATTERN.test(pathname) ? pathname.slice(1) : pathname;
};

const extractLineNumber = (contents: string, matchIndex: number): number =>
  contents.slice(0, matchIndex).split("\n").length;

const isKeyMissing = (key: string, knownKeys: ReadonlySet<string>): boolean => {
  if (knownKeys.has(key)) {
    return false;
  }

  const isPluralKey =
    knownKeys.has(`${key}.zero`) && knownKeys.has(`${key}.one`) && knownKeys.has(`${key}.other`);

  return !isPluralKey;
};

const validateI18nFile = async (
  ctx: ValidatorContext,
  path: string,
  knownKeys: ReadonlySet<string>,
): Promise<string[]> => {
  const contents = await ctx.readFile(path);
  const violations: string[] = [];

  for (const match of contents.matchAll(TRANSLATE_CALL_PATTERN)) {
    const key = match.groups?.key;
    if (key !== undefined && isKeyMissing(key, knownKeys)) {
      violations.push(`${path}:${extractLineNumber(contents, match.index ?? 0)} missing ${key}`);
    }
  }

  return violations;
};

export const i18nKeyUsage = async (ctx: ValidatorContext): Promise<void> => {
  const localeModules = ctx.config.localeModules;

  if (!localeModules || localeModules.length === 0) {
    return;
  }

  const root = process.cwd();

  const loaded = await Promise.all(
    localeModules.map(async (mod) => {
      const importPath = mod.importPath.replace(RELATIVE_PATH_PATTERN, "");
      const absolutePath = mod.importPath.startsWith("/") ? importPath : `${root}/${importPath}`;
      const url = new URL(`file://${absolutePath.replace(/\\/g, "/")}`);
      const filePath = toPlatformPath(url);
      const modExports = await import(filePath);
      const localeData = mod.localeKey
        ? modExports[mod.localeKey]
        : (modExports.default ?? modExports);
      return ctx.flattenKeys(localeData);
    }),
  );

  const knownKeys = new Set(loaded.flat());
  const violations: string[] = [];

  for (const path of ctx.collectFiles(I18N_SOURCE_PATTERN)) {
    violations.push(...(await validateI18nFile(ctx, path, knownKeys)));
  }

  ctx.failAll(violations, "missing i18n keys referenced by translate/translateCount");
};
