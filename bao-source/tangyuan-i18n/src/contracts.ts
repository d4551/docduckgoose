import { Optional, Union } from "@baohaus/baobox/type/combinator-core";
import {
  Array as SchemaArray,
  Object as SchemaObject,
  Record as SchemaRecord,
} from "@baohaus/baobox/type/containers";
import { Literal, String as SchemaString } from "@baohaus/baobox/type/primitives";
import type { Static } from "@baohaus/baobox/type/static-types";
import { SUPPORTED_LOCALES } from "./bcp47.js";

export const LocaleSchema = Union(SUPPORTED_LOCALES.map((locale) => Literal(locale)));

export type LocaleIdentifier = Static<typeof LocaleSchema>;

export const MessageCatalogSchema = SchemaRecord(SchemaString({ minLength: 1 }), SchemaString());

export const CatalogBundleSchema = SchemaRecord(LocaleSchema, MessageCatalogSchema);

export const I18nPluginOptionsSchema = SchemaObject({
  catalogs: CatalogBundleSchema,
  defaultLocale: Optional(LocaleSchema),
  supported: Optional(SchemaArray(LocaleSchema)),
});
