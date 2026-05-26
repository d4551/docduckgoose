/**
 * Shared localized text schemas.
 *
 * Defines the generic `{ key, params }` translation payload used by APIs that
 * return user-facing content for server-rendered or treaty clients.
 *
 * @shared/schemas/i18n
 */

import type {
  Static,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Primitive interpolation value supported by localized message payloads.
 */
export const LocalizedTextParamValueSchema: TUnion<(TString | TNumber)[]> = TypeExports.Union(
  [TypeExports.String(), TypeExports.Number()],
  {
    description: "Template interpolation value",
  },
);

/** TypeScript type for {@link LocalizedTextParamValueSchema}. */
export type LocalizedTextParamValue = Static<typeof LocalizedTextParamValueSchema>;

/**
 * Interpolation parameter map for localized message payloads.
 */
export const LocalizedTextParamsSchema: TRecord<
  TString,
  TUnion<(TString | TNumber)[]>
> = TypeExports.Record(TypeExports.String(), LocalizedTextParamValueSchema, {
  description: "Flat interpolation parameter bag for localized UI text",
});

/** TypeScript type for {@link LocalizedTextParamsSchema}. */
export type LocalizedTextParams = Static<typeof LocalizedTextParamsSchema>;

/**
 * Structured localized text payload consumed by UI translation helpers.
 */
export const LocalizedTextSchema: TObject<
  {
    readonly key: TString;
    readonly params: TOptional<TRecord<TString, TUnion<(TString | TNumber)[]>>>;
  },
  "key",
  "params"
> = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1, description: "Translation key consumed by t()" }),
    params: TypeExports.Optional(LocalizedTextParamsSchema),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link LocalizedTextSchema}. */
export type LocalizedText = Static<typeof LocalizedTextSchema>;
