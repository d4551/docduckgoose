/**
 * XR composition schemas.
 *
 * Defines TypeBox schemas for USD composition plans associated with XR experiences.
 *
 * @shared/schemas/xr-composition.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";
import { XrTransformSchema } from "./xr-runtime.schemas.ts";

/**
 * USD composition arc kinds.
 */
export const XrCompositionArcSchema: Type.TUnion<
  (
    | Type.TLiteral<"sublayer">
    | Type.TLiteral<"reference">
    | Type.TLiteral<"payload">
    | Type.TLiteral<"inherit">
  )[]
> = Type.Union(
  [
    Type.Literal("sublayer"),
    Type.Literal("reference"),
    Type.Literal("payload"),
    Type.Literal("inherit"),
  ],
  { description: "USD composition arc kind" },
);

/** Inferred type from the XrCompositionArc schema. */
export type XrCompositionArc = Static<typeof XrCompositionArcSchema>;

/**
 * Composition layer entry.
 */
export const XrCompositionLayerSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.Optional(Type.String({ minLength: 1 })),
    usdAssetId: Type.Optional(Type.String({ minLength: 1 })),
    primPath: Type.Optional(Type.String({ minLength: 1 })),
    role: Type.Optional(Type.String({ minLength: 1 })),
    arc: Type.Optional(XrCompositionArcSchema),
    variants: Type.Optional(Type.Record(Type.String(), Type.String())),
    transform: Type.Optional(XrTransformSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrCompositionLayer schema. */
export type XrCompositionLayer = Static<typeof XrCompositionLayerSchema>;

/**
 * Composition configuration payload stored on XR experiences.
 */
export const XrCompositionConfigSchema = Type.Object(
  {
    root: XrCompositionLayerSchema,
    layers: Type.Array(XrCompositionLayerSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrCompositionConfig schema. */
export type XrCompositionConfig = Static<typeof XrCompositionConfigSchema>;

/**
 * Composition plan output schema.
 */
export const XrCompositionPlanSchema = Type.Object(
  {
    experienceId: Type.String({ minLength: 1 }),
    root: XrCompositionLayerSchema,
    layers: Type.Array(XrCompositionLayerSchema),
    assets: Type.Array(Type.String({ minLength: 1 })),
    summary: Type.Object(
      {
        layerCount: Type.Integer({ minimum: 0 }),
        assetCount: Type.Integer({ minimum: 0 }),
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
export const XrCompositionPlanResponseDataSchema = Type.Object(
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
