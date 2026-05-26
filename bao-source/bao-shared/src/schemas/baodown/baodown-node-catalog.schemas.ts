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

import type { Static, TProperties } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const BaoDownConfigFieldKindSchema: Type.TUnion<
  (
    | Type.TLiteral<"string">
    | Type.TLiteral<"number">
    | Type.TLiteral<"boolean">
    | Type.TLiteral<"enum">
    | Type.TLiteral<"json">
  )[]
> = Type.Union(
  [
    Type.Literal("string"),
    Type.Literal("number"),
    Type.Literal("boolean"),
    Type.Literal("enum"),
    Type.Literal("json"),
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
export const BaoDownBaseConfigFieldSchema = Type.Object(
  {
    key: Type.String({ minLength: 1, description: "Stable config key." }),
    kind: BaoDownConfigFieldKindSchema,
    required: Type.Boolean({ description: "Whether the field is required." }),
    labelKey: Type.String({ minLength: 1, description: "i18n label key." }),
    descriptionKey: Type.Optional(
      Type.String({ minLength: 1, description: "i18n description key." }),
    ),
  },
  // Base schema intentionally allows additional properties so specialized field kinds can
  // extend it without failing JSON Schema `allOf` constraints.
  { additionalProperties: true },
);

const BaoDownBaseConfigFieldProps = {
  key: Type.String({ minLength: 1, description: "Stable config key." }),
  required: Type.Boolean({ description: "Whether the field is required." }),
  labelKey: Type.String({ minLength: 1, description: "i18n label key." }),
  descriptionKey: Type.Optional(
    Type.String({ minLength: 1, description: "i18n description key." }),
  ),
} satisfies TProperties;

/**
 * String config field.
 */
export const BaoDownStringConfigFieldSchema = Type.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: Type.Literal("string"),
    minLength: Type.Optional(Type.Integer({ minimum: 0 })),
    maxLength: Type.Optional(Type.Integer({ minimum: 1 })),
    default: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Number config field.
 */
export const BaoDownNumberConfigFieldSchema = Type.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: Type.Literal("number"),
    integer: Type.Optional(Type.Boolean()),
    min: Type.Optional(Type.Number()),
    max: Type.Optional(Type.Number()),
    default: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/**
 * Boolean config field.
 */
export const BaoDownBooleanConfigFieldSchema = Type.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: Type.Literal("boolean"),
    default: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Enum option.
 */
export const BaoDownEnumOptionSchema = Type.Object(
  {
    value: Type.String({ minLength: 1 }),
    labelKey: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Enum config field.
 */
export const BaoDownEnumConfigFieldSchema = Type.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: Type.Literal("enum"),
    options: Type.Array(BaoDownEnumOptionSchema, { minItems: 1 }),
    default: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * JSON config field (escape hatch for advanced node types).
 *
 * This should be used sparingly; prefer explicit fields with strict validation.
 */
export const BaoDownJsonConfigFieldSchema = Type.Object(
  {
    ...BaoDownBaseConfigFieldProps,
    kind: Type.Literal("json"),
    schema: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Union of supported config field definitions.
 */
export const BaoDownConfigFieldSchema = Type.Union(
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
export const BaoDownNodeCatalogEntrySchema = Type.Object(
  {
    typeId: Type.String({ minLength: 1, description: "Node type id." }),
    titleKey: Type.String({ minLength: 1, description: "i18n title key." }),
    descriptionKey: Type.Optional(
      Type.String({ minLength: 1, description: "i18n description key." }),
    ),
    categoryKey: Type.String({ minLength: 1, description: "i18n palette category key." }),
    kind: BaoDownEdgeKindSchema,
    ports: Type.Object(
      {
        inputs: Type.Array(BaoDownPortSchema),
        outputs: Type.Array(BaoDownPortSchema),
      },
      { additionalProperties: false },
    ),
    configFields: Type.Array(BaoDownConfigFieldSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownNodeCatalogEntrySchema}.
 */
export type BaoDownNodeCatalogEntry = {
  typeId: string;
  titleKey: string;
  descriptionKey?: string;
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
export const BaoDownNodeCatalogListSchema = Type.Object(
  {
    schemaVersion: Type.Integer({ minimum: 1 }),
    nodes: Type.Array(BaoDownNodeCatalogEntrySchema),
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
