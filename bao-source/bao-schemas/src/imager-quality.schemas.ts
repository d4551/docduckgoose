/**
 * Imager quality schemas.
 *
 * Contract-first schemas for imager quality analysis: metrics, assessment,
 * focus metrics, policy evaluation, and request/response envelopes.
 *
 * @shared/schemas/imager-quality.schemas.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TNumber,
  TObject,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import { ImagerSourceSchema } from "./imager-source.schemas";

/**
 * Imager quality request schema.
 */
export const ImagerQualityRequestSchema = TypeExports.Object(
  {
    source: ImagerSourceSchema,
    includeFocus: TypeExports.Optional(TypeExports.Boolean()),
    includeEdges: TypeExports.Optional(TypeExports.Boolean()),
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
export const ImagerQualityMetricsSchema: TObject<
  {
    readonly blurScore: TNumber;
    readonly brightness: TNumber;
    readonly contrast: TNumber;
    readonly darkRatio: TNumber;
    readonly brightRatio: TNumber;
  },
  "blurScore" | "brightness" | "contrast" | "darkRatio" | "brightRatio",
  never
> = TypeExports.Object(
  {
    blurScore: TypeExports.Number(),
    brightness: TypeExports.Number(),
    contrast: TypeExports.Number(),
    darkRatio: TypeExports.Number(),
    brightRatio: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityMetrics schema. */
export type ImagerQualityMetrics = Static<typeof ImagerQualityMetricsSchema>;

/**
 * Quality assessment schema.
 */
export const ImagerQualityAssessmentSchema: TObject<
  {
    readonly score: TNumber;
    readonly isBlurry: TBoolean;
    readonly isUnderexposed: TBoolean;
    readonly isOverexposed: TBoolean;
    readonly isLowContrast: TBoolean;
    readonly issues: TArray<TString>;
  },
  "issues" | "score" | "isBlurry" | "isUnderexposed" | "isOverexposed" | "isLowContrast",
  never
> = TypeExports.Object(
  {
    score: TypeExports.Number(),
    isBlurry: TypeExports.Boolean(),
    isUnderexposed: TypeExports.Boolean(),
    isOverexposed: TypeExports.Boolean(),
    isLowContrast: TypeExports.Boolean(),
    issues: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityAssessment schema. */
export type ImagerQualityAssessment = Static<typeof ImagerQualityAssessmentSchema>;

/**
 * Focus zone schema.
 */
export const ImagerFocusZoneSchema: TObject<
  { readonly row: TInteger; readonly col: TInteger; readonly score: TNumber },
  "score" | "row" | "col",
  never
> = TypeExports.Object(
  {
    row: TypeExports.Integer({ minimum: 0 }),
    col: TypeExports.Integer({ minimum: 0 }),
    score: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerFocusZone schema. */
export type ImagerFocusZone = Static<typeof ImagerFocusZoneSchema>;

/**
 * Focus metrics schema.
 */
export const ImagerFocusMetricsSchema = TypeExports.Object(
  {
    laplacianVariance: TypeExports.Number(),
    tenengrad: TypeExports.Number(),
    normalizedVariance: TypeExports.Number(),
    overallScore: TypeExports.Number(),
    isFocused: TypeExports.Boolean(),
    zones: TypeExports.Optional(TypeExports.Array(ImagerFocusZoneSchema)),
    bestZone: TypeExports.Optional(ImagerFocusZoneSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerFocusMetrics schema. */
export type ImagerFocusMetrics = Static<typeof ImagerFocusMetricsSchema>;

/**
 * Policy evaluation for imager quality checks.
 */
export const ImagerQualityPolicySchema: TObject<
  {
    readonly passed: TBoolean;
    readonly reasons: TArray<TString>;
    readonly thresholds: TObject<
      {
        readonly minQualityScore: TNumber;
        readonly minFocusScore: TNumber;
        readonly minContrast: TNumber;
        readonly minBrightness: TNumber;
        readonly maxBrightness: TNumber;
        readonly maxDarkRatio: TNumber;
        readonly maxBrightRatio: TNumber;
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
> = TypeExports.Object(
  {
    passed: TypeExports.Boolean(),
    reasons: TypeExports.Array(TypeExports.String()),
    thresholds: TypeExports.Object(
      {
        minQualityScore: TypeExports.Number(),
        minFocusScore: TypeExports.Number(),
        minContrast: TypeExports.Number(),
        minBrightness: TypeExports.Number(),
        maxBrightness: TypeExports.Number(),
        maxDarkRatio: TypeExports.Number(),
        maxBrightRatio: TypeExports.Number(),
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
export const ImagerQualityPayloadSchema = TypeExports.Object(
  {
    deviceId: TypeExports.Optional(TypeExports.String()),
    source: TypeExports.Object(
      {
        deviceId: TypeExports.Optional(TypeExports.String()),
        captured: TypeExports.Boolean(),
        baseUrl: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: false },
    ),
    quality: TypeExports.Object(
      {
        metrics: ImagerQualityMetricsSchema,
        assessment: ImagerQualityAssessmentSchema,
      },
      { additionalProperties: false },
    ),
    focus: TypeExports.Optional(ImagerFocusMetricsSchema),
    edges: TypeExports.Optional(
      TypeExports.Object(
        {
          contours: TypeExports.Number(),
          image: TypeExports.String(),
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
export const ImagerQualityResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: ImagerQualityPayloadSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerQualityResponse schema. */
export type ImagerQualityResponse = Static<typeof ImagerQualityResponseSchema>;
