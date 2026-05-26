import { Elysia } from "elysia";
import { DEFAULT_LOCALE, type SupportedLocale } from "./bcp47.js";
import type { CatalogBundle } from "./catalog.js";
import { type DetectOptions, detectLocale } from "./detect.js";
import { createT, type Translator } from "./translator.js";

export type I18nPluginOptions = Readonly<{
  catalogs: CatalogBundle;
  defaultLocale?: SupportedLocale;
  supported?: readonly SupportedLocale[];
}>;

export type I18nDerivedContext = Readonly<{
  locale: SupportedLocale;
  t: Translator["t"];
  format: Translator["format"];
}>;

const PLUGIN_NAME = "tangyuan-i18n.plugin";

function buildDetectOptions(
  defaultLocale: SupportedLocale,
  supported: readonly SupportedLocale[] | undefined,
): DetectOptions {
  if (supported === undefined) {
    return { defaultLocale };
  }
  return { defaultLocale, supported };
}

export function createI18nPlugin(options: I18nPluginOptions) {
  const defaultLocale = options.defaultLocale ?? DEFAULT_LOCALE;
  const detectOptions = buildDetectOptions(defaultLocale, options.supported);
  return new Elysia({ name: PLUGIN_NAME }).derive(
    { as: "global" },
    ({ request }): I18nDerivedContext => {
      const locale = detectLocale(request, detectOptions);
      const translator = createT({
        locale,
        catalogs: options.catalogs,
        fallbackLocale: defaultLocale,
      });
      return {
        locale: translator.locale,
        t: translator.t,
        format: translator.format,
      };
    },
  );
}
