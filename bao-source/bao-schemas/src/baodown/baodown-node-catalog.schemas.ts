/**
 * BaoDown node catalog schemas.
 *
 * The node catalog is a contract-first description of the node types supported by BaoDown.
 * It is used by:
 * - Server validation (supported node types, canonical ports, config validation)
 * - UI tooling (palette + inspector forms)
 *
 * BaoDown persists graphs using the BaoDown graph schema. BaklavaJS is editor/view-model only.
 *
 * @shared/schemas/baodown/baodown-node-catalog
 */

import type { Static, TLiteral, TProperties, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "../json.schemas.ts";
import {
  type BaoDownEdgeKind,
  BaoDownEdgeKindSchema,
  type BaoDownPort,
  BaoDownPortSchema,
} from "./baodown-flow.schemas.ts";

/**
 * Node config field kinds supported by the BaoDown catalog contract.
 */
export const BaoDownConfigFieldKindSchema: TUnion<
  (
    | TLiteral<"string">
    | TLiteral<"number">
    | TLiteral<"boolean">
    | TLiteral<"enum">
    | TLiteral<"json">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("string"),
    TypeExports.Literal("number"),
    TypeExports.Literal("boolean"),
    TypeExports.Literal("enum"),
    TypeExports.Literal("json"),
  ],
  {
    description: "Supported config field kinds for BaoDown node definitions.",
  },
);

/**
 * TypeScript type for {@link BaoDownConfigFieldKindSchema}.
 */
export type BaoDownConfigFieldKind = Static<typeof BaoDownConfigFieldKindSchema>;

/**
 * Base config field metadata shared by all field kinds.
 */
export const BaoDownBaseConfigFieldSchema = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1, description: "Stable config key." }),
    kind: BaoDownConfigFieldKindSchema,
    required: TypeExports.Boolean({ description: "Whether the field is required." }),
    labelKey: TypeExports.String({ minLength: 1, description: "i18n label key." }),
    descriptionKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "i18n description key." }),
    ),
  },
  // Base schema intentionally allows additional properties so specialized field kinds can
  // extend it without failing JSON Schema `allOf` constraints.
  { additionalProperties: true },
);

const BaoDownBaseConfigFieldProps = {
  key: TypeExports.String({ minLength: 1, description: "Stable config key." }),
  required: TypeExports.Boolean({ description: "Whether the field is required." }),
  labelKey: TypeExports.String({ minLength: 1, description: "i18n label key." }),
  descriptionKey: TypeExports.Optional(
    TypeExports.String({ minLength: 1, description: "i18n description key." }),
  ),
} satisfies TProperties;

/**
 * String config field.
 */
export const BaoDownStringConfigFieldSchema = TypeExports.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: TypeExports.Literal("string"),
    minLength: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    maxLength: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    default: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Number config field.
 */
export const BaoDownNumberConfigFieldSchema = TypeExports.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: TypeExports.Literal("number"),
    integer: TypeExports.Optional(TypeExports.Boolean()),
    min: TypeExports.Optional(TypeExports.Number()),
    max: TypeExports.Optional(TypeExports.Number()),
    default: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/**
 * Boolean config field.
 */
export const BaoDownBooleanConfigFieldSchema = TypeExports.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: TypeExports.Literal("boolean"),
    default: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Enum option.
 */
export const BaoDownEnumOptionSchema = TypeExports.Object(
  {
    value: TypeExports.String({ minLength: 1 }),
    labelKey: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Enum config field.
 */
export const BaoDownEnumConfigFieldSchema = TypeExports.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: TypeExports.Literal("enum"),
    options: TypeExports.Array(BaoDownEnumOptionSchema, { minItems: 1 }),
    default: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * JSON config field (escape hatch for advanced node types).
 *
 * This should be used sparingly; prefer explicit fields with strict validation.
 */
export const BaoDownJsonConfigFieldSchema = TypeExports.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: TypeExports.Literal("json"),
    schema: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Union of supported config field definitions.
 */
export const BaoDownConfigFieldSchema = TypeExports.Union(
  [
    BaoDownStringConfigFieldSchema,
    BaoDownNumberConfigFieldSchema,
    BaoDownBooleanConfigFieldSchema,
    BaoDownEnumConfigFieldSchema,
    BaoDownJsonConfigFieldSchema,
  ],
  { description: "Config field definition for BaoDown nodes." },
);

/**
 * TypeScript type for {@link BaoDownConfigFieldSchema}.
 */
export type BaoDownConfigField = Static<typeof BaoDownConfigFieldSchema>;

/**
 * Node catalog entry schema for BaoDown node types.
 */
export const BaoDownNodeCatalogEntrySchema = TypeExports.Object(
  {
    typeId: TypeExports.String({ minLength: 1, description: "Node type id." }),
    titleKey: TypeExports.String({ minLength: 1, description: "i18n title key." }),
    descriptionKey: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "i18n description key." }),
    ),
    categoryKey: TypeExports.String({ minLength: 1, description: "i18n palette category key." }),
    kind: BaoDownEdgeKindSchema,
    ports: TypeExports.Object(
      {
        inputs: TypeExports.Array(BaoDownPortSchema),
        outputs: TypeExports.Array(BaoDownPortSchema),
      },
      { additionalProperties: false },
    ),
    configFields: TypeExports.Array(BaoDownConfigFieldSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownNodeCatalogEntrySchema}.
 */
export type BaoDownNodeCatalogEntry = {
  typeId: string;
  titleKey: string;
  descriptionKey?: string | undefined;
  categoryKey: string;
  kind: BaoDownEdgeKind;
  ports: {
    inputs: BaoDownPort[];
    outputs: BaoDownPort[];
  };
  configFields: BaoDownConfigField[];
};

/**
 * Response schema for listing BaoDown node catalog entries.
 */
export const BaoDownNodeCatalogListSchema = TypeExports.Object(
  {
    schemaVersion: TypeExports.Integer({ minimum: 1 }),
    nodes: TypeExports.Array(BaoDownNodeCatalogEntrySchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownNodeCatalogListSchema}.
 */
export type BaoDownNodeCatalogList = {
  schemaVersion: number;
  nodes: BaoDownNodeCatalogEntry[];
};
