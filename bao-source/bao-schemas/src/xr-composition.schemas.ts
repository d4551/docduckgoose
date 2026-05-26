/**
 * XR composition schemas.
 *
 * Defines TypeBox schemas for USD composition plans associated with XR experiences.
 *
 * @shared/schemas/xr-composition.ts
 */

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";
import { XrTransformSchema } from "./xr-runtime.schemas.ts";

/**
 * USD composition arc kinds.
 */
export const XrCompositionArcSchema: TUnion<
  (TLiteral<"sublayer"> | TLiteral<"reference"> | TLiteral<"payload"> | TLiteral<"inherit">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("sublayer"),
    TypeExports.Literal("reference"),
    TypeExports.Literal("payload"),
    TypeExports.Literal("inherit"),
  ],
  { description: "USD composition arc kind" },
);

/** Inferred type from the XrCompositionArc schema. */
export type XrCompositionArc = Static<typeof XrCompositionArcSchema>;

/**
 * Composition layer entry.
 */
export const XrCompositionLayerSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    usdAssetId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    primPath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    role: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    arc: TypeExports.Optional(XrCompositionArcSchema),
    variants: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.String())),
    transform: TypeExports.Optional(XrTransformSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrCompositionLayer schema. */
export type XrCompositionLayer = Static<typeof XrCompositionLayerSchema>;

/**
 * Composition configuration payload stored on XR experiences.
 */
export const XrCompositionConfigSchema = TypeExports.Object(
  {
    root: XrCompositionLayerSchema,
    layers: TypeExports.Array(XrCompositionLayerSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrCompositionConfig schema. */
export type XrCompositionConfig = Static<typeof XrCompositionConfigSchema>;

/**
 * Composition plan output schema.
 */
export const XrCompositionPlanSchema = TypeExports.Object(
  {
    experienceId: TypeExports.String({ minLength: 1 }),
    root: XrCompositionLayerSchema,
    layers: TypeExports.Array(XrCompositionLayerSchema),
    assets: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    summary: TypeExports.Object(
      {
        layerCount: TypeExports.Integer({ minimum: 0 }),
        assetCount: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrCompositionPlan schema. */
export type XrCompositionPlan = Static<typeof XrCompositionPlanSchema>;

/**
 * Composition plan response schema.
 */
export const XrCompositionPlanResponseDataSchema = TypeExports.Object(
  { plan: XrCompositionPlanSchema },
  { additionalProperties: false },
);

/** Inferred type from the XrCompositionPlanResponseData schema. */
export type XrCompositionPlanResponseData = Static<typeof XrCompositionPlanResponseDataSchema>;

/**
 * Composition plan response schema.
 */
export const XrCompositionPlanResponseSchema = enhancedSuccessWithDataSchema(
  XrCompositionPlanResponseDataSchema,
  {
    description: "XR composition plan response envelope.",
  },
);

/** Inferred type from the XrCompositionPlanResponse schema. */
export type XrCompositionPlanResponse = Static<typeof XrCompositionPlanResponseSchema>;
