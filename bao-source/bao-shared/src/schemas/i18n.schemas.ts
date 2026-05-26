/**
 * Shared localized text schemas.
 *
 * Defines the generic `{ key, params }` translation payload used by APIs that
 * return user-facing content for server-rendered or treaty clients.
 *
 * @shared/schemas/i18n
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Primitive interpolation value supported by localized message payloads.
 */
export const LocalizedTextParamValueSchema: Type.TUnion<(Type.TString | Type.TNumber)[]> =
  Type.Union([Type.String(), Type.Number()], {
    description: "Template interpolation value",
  });

/** TypeScript type for {@link LocalizedTextParamValueSchema}. */
export type LocalizedTextParamValue = Static<typeof LocalizedTextParamValueSchema>;

/**
 * Interpolation parameter map for localized message payloads.
 */
export const LocalizedTextParamsSchema: Type.TRecord<
  Type.TString,
  Type.TUnion<(Type.TString | Type.TNumber)[]>
> = Type.Record(Type.String(), LocalizedTextParamValueSchema, {
  description: "Flat interpolation parameter bag for localized UI text",
});

/** TypeScript type for {@link LocalizedTextParamsSchema}. */
export type LocalizedTextParams = Static<typeof LocalizedTextParamsSchema>;

/**
 * Structured localized text payload consumed by UI translation helpers.
 */
export const LocalizedTextSchema: Type.TObject<
  {
    readonly key: Type.TString;
    readonly params: Type.TOptional<
      Type.TRecord<Type.TString, Type.TUnion<(Type.TString | Type.TNumber)[]>>
    >;
  },
  "key",
  "params"
> = Type.Object(
  {
    key: Type.String({ minLength: 1, description: "Translation key consumed by t()" }),
    params: Type.Optional(LocalizedTextParamsSchema),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link LocalizedTextSchema}. */
export type LocalizedText = Static<typeof LocalizedTextSchema>;
