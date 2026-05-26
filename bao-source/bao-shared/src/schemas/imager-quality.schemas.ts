/**
 * Imager quality schemas.
 *
 * Contract-first schemas for imager quality analysis: metrics, assessment,
 * focus metrics, policy evaluation, and request/response envelopes.
 *
 * @shared/schemas/imager-quality.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import { ImagerSourceSchema } from "./imager-source.schemas";

/**
 * Imager quality request schema.
 */
export const ImagerQualityRequestSchema = Type.Object(
  {
    source: ImagerSourceSchema,
    includeFocus: Type.Optional(Type.Boolean()),
    includeEdges: Type.Optional(Type.Boolean()),
  },
  {
    description: "Quality analysis request payload for imager pipeline",
    additionalProperties: false,
  },
);

/** Inferred type from the ImagerQualityRequest schema. */
export type ImagerQualityRequest = Static<typeof ImagerQualityRequestSchema>;

/**
 * Quality metric schema.
 */
export const ImagerQualityMetricsSchema: Type.TObject<
  {
    readonly blurScore: Type.TNumber;
    readonly brightness: Type.TNumber;
    readonly contrast: Type.TNumber;
    readonly darkRatio: Type.TNumber;
    readonly brightRatio: Type.TNumber;
  },
  "blurScore" | "brightness" | "contrast" | "darkRatio" | "brightRatio",
  never
> = Type.Object(
  {
    blurScore: Type.Number(),
    brightness: Type.Number(),
    contrast: Type.Number(),
    darkRatio: Type.Number(),
    brightRatio: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityMetrics schema. */
export type ImagerQualityMetrics = Static<typeof ImagerQualityMetricsSchema>;

/**
 * Quality assessment schema.
 */
export const ImagerQualityAssessmentSchema: Type.TObject<
  {
    readonly score: Type.TNumber;
    readonly isBlurry: Type.TBoolean;
    readonly isUnderexposed: Type.TBoolean;
    readonly isOverexposed: Type.TBoolean;
    readonly isLowContrast: Type.TBoolean;
    readonly issues: Type.TArray<Type.TString>;
  },
  "issues" | "score" | "isBlurry" | "isUnderexposed" | "isOverexposed" | "isLowContrast",
  never
> = Type.Object(
  {
    score: Type.Number(),
    isBlurry: Type.Boolean(),
    isUnderexposed: Type.Boolean(),
    isOverexposed: Type.Boolean(),
    isLowContrast: Type.Boolean(),
    issues: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityAssessment schema. */
export type ImagerQualityAssessment = Static<typeof ImagerQualityAssessmentSchema>;

/**
 * Focus zone schema.
 */
export const ImagerFocusZoneSchema: Type.TObject<
  { readonly row: Type.TInteger; readonly col: Type.TInteger; readonly score: Type.TNumber },
  "score" | "row" | "col",
  never
> = Type.Object(
  {
    row: Type.Integer({ minimum: 0 }),
    col: Type.Integer({ minimum: 0 }),
    score: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerFocusZone schema. */
export type ImagerFocusZone = Static<typeof ImagerFocusZoneSchema>;

/**
 * Focus metrics schema.
 */
export const ImagerFocusMetricsSchema = Type.Object(
  {
    laplacianVariance: Type.Number(),
    tenengrad: Type.Number(),
    normalizedVariance: Type.Number(),
    overallScore: Type.Number(),
    isFocused: Type.Boolean(),
    zones: Type.Optional(Type.Array(ImagerFocusZoneSchema)),
    bestZone: Type.Optional(ImagerFocusZoneSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerFocusMetrics schema. */
export type ImagerFocusMetrics = Static<typeof ImagerFocusMetricsSchema>;

/**
 * Policy evaluation for imager quality checks.
 */
export const ImagerQualityPolicySchema: Type.TObject<
  {
    readonly passed: Type.TBoolean;
    readonly reasons: Type.TArray<Type.TString>;
    readonly thresholds: Type.TObject<
      {
        readonly minQualityScore: Type.TNumber;
        readonly minFocusScore: Type.TNumber;
        readonly minContrast: Type.TNumber;
        readonly minBrightness: Type.TNumber;
        readonly maxBrightness: Type.TNumber;
        readonly maxDarkRatio: Type.TNumber;
        readonly maxBrightRatio: Type.TNumber;
      },
      | "minQualityScore"
      | "minFocusScore"
      | "minContrast"
      | "minBrightness"
      | "maxBrightness"
      | "maxDarkRatio"
      | "maxBrightRatio",
      never
    >;
  },
  "reasons" | "thresholds" | "passed",
  never
> = Type.Object(
  {
    passed: Type.Boolean(),
    reasons: Type.Array(Type.String()),
    thresholds: Type.Object(
      {
        minQualityScore: Type.Number(),
        minFocusScore: Type.Number(),
        minContrast: Type.Number(),
        minBrightness: Type.Number(),
        maxBrightness: Type.Number(),
        maxDarkRatio: Type.Number(),
        maxBrightRatio: Type.Number(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityPolicy schema. */
export type ImagerQualityPolicy = Static<typeof ImagerQualityPolicySchema>;

/**
 * Imager quality response payload schema.
 */
export const ImagerQualityPayloadSchema = Type.Object(
  {
    deviceId: Type.Optional(Type.String()),
    source: Type.Object(
      {
        deviceId: Type.Optional(Type.String()),
        captured: Type.Boolean(),
        baseUrl: Type.Optional(Type.String()),
      },
      { additionalProperties: false },
    ),
    quality: Type.Object(
      {
        metrics: ImagerQualityMetricsSchema,
        assessment: ImagerQualityAssessmentSchema,
      },
      { additionalProperties: false },
    ),
    focus: Type.Optional(ImagerFocusMetricsSchema),
    edges: Type.Optional(
      Type.Object(
        {
          contours: Type.Number(),
          image: Type.String(),
        },
        { additionalProperties: false },
      ),
    ),
    policy: ImagerQualityPolicySchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityPayload schema. */
export type ImagerQualityPayload = Static<typeof ImagerQualityPayloadSchema>;

/**
 * Imager quality response schema.
 */
export const ImagerQualityResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ImagerQualityPayloadSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityResponse schema. */
export type ImagerQualityResponse = Static<typeof ImagerQualityResponseSchema>;
