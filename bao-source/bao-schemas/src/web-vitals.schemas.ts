/**
 * Web Vitals telemetry schemas.
 *
 * Shared TypeBox schemas for Web Vitals report ingestion and summary responses.
 *
 * @shared/schemas/web-vitals.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";

/**
 * Supported Web Vitals metric name values.
 */
export const WEB_VITAL_METRIC_NAMES: readonly ["CLS", "INP", "LCP", "FCP", "TTFB"] = [
  "CLS",
  "INP",
  "LCP",
  "FCP",
  "TTFB",
] as const;

/**
 * Supported Web Vitals rating values.
 */
export const WEB_VITAL_RATINGS: readonly ["good", "needs-improvement", "poor"] = [
  "good",
  "needs-improvement",
  "poor",
] as const;

/**
 * Supported Web Vitals metric names.
 */
export const WebVitalsMetricNameSchema: TUnion<
  [
    TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
    ...TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
  ]
> = stringEnum(WEB_VITAL_METRIC_NAMES, {});

/**
 * Web Vitals rating schema.
 */
export const WebVitalRatingSchema: TUnion<
  [
    TLiteral<"good" | "needs-improvement" | "poor">,
    ...TLiteral<"good" | "needs-improvement" | "poor">[],
  ]
> = stringEnum(WEB_VITAL_RATINGS, {});

/**
 * Web Vitals metric payload schema.
 */
export const WebVitalsMetricSchema = TypeExports.Object({
  name: WebVitalsMetricNameSchema,
  value: TypeExports.Number(),
  delta: TypeExports.Number(),
  id: TypeExports.String({ minLength: 1, maxLength: 200 }),
  rating: TypeExports.Optional(WebVitalRatingSchema),
  navigationType: TypeExports.Optional(TypeExports.String({ maxLength: 50 })),
});

/**
 * Build a Web Vitals report schema with a metrics cap.
 *
 * @param maxMetricsPerReport - Maximum number of metric samples per report.
 * @returns TypeBox schema for the Web Vitals report payload.
 */
export function buildWebVitalsReportSchema(maxMetricsPerReport: number) {
  return TypeExports.Object({
    path: TypeExports.String({ minLength: 1, maxLength: 200 }),
    url: TypeExports.Optional(TypeExports.String()),
    userAgent: TypeExports.Optional(TypeExports.String({ maxLength: 500 })),
    timestamp: TypeExports.String({ format: "date-time" }),
    metrics: TypeExports.Array(WebVitalsMetricSchema, {
      minItems: 1,
      maxItems: maxMetricsPerReport,
    }),
  });
}

/**
 * Web Vitals ingest response schema.
 */
export const WebVitalsReportResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly receivedAt: TString;
    readonly stored: TBoolean;
    readonly metrics: TNumber;
  },
  "ok" | "receivedAt" | "stored" | "metrics",
  never
> = TypeExports.Object({
  ok: TypeExports.Literal(true),
  receivedAt: TypeExports.String(),
  stored: TypeExports.Boolean(),
  metrics: TypeExports.Number(),
});

/**
 * Web Vitals metric summary schema.
 */
export const WebVitalsMetricSummarySchema: TObject<
  {
    readonly name: TUnion<
      [
        TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
        ...TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
      ]
    >;
    readonly count: TNumber;
    readonly p50: TNumber;
    readonly p75: TNumber;
    readonly p95: TNumber;
    readonly min: TNumber;
    readonly max: TNumber;
    readonly lastUpdated: TUnion<(TString | TNull)[]>;
    readonly ratings: TObject<
      {
        readonly good: TNumber;
        readonly needsImprovement: TNumber;
        readonly poor: TNumber;
      },
      "good" | "poor" | "needsImprovement",
      never
    >;
  },
  "name" | "lastUpdated" | "ratings" | "count" | "p50" | "p75" | "p95" | "min" | "max",
  never
> = TypeExports.Object({
  name: WebVitalsMetricNameSchema,
  count: TypeExports.Number(),
  p50: TypeExports.Number(),
  p75: TypeExports.Number(),
  p95: TypeExports.Number(),
  min: TypeExports.Number(),
  max: TypeExports.Number(),
  lastUpdated: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  ratings: TypeExports.Object({
    good: TypeExports.Number(),
    needsImprovement: TypeExports.Number(),
    poor: TypeExports.Number(),
  }),
});

/**
 * Web Vitals path summary schema.
 */
export const WebVitalsPathSummarySchema = TypeExports.Object({
  path: TypeExports.String(),
  lastUpdated: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  metrics: TypeExports.Array(WebVitalsMetricSummarySchema),
});

/**
 * Web Vitals budget threshold schema.
 */
export const WebVitalsBudgetSchema: TObject<
  {
    readonly name: TUnion<
      [
        TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
        ...TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
      ]
    >;
    readonly target: TNumber;
    readonly unit: TUnion<(TLiteral<"ms"> | TLiteral<"score">)[]>;
  },
  "name" | "unit" | "target",
  never
> = TypeExports.Object({
  name: WebVitalsMetricNameSchema,
  target: TypeExports.Number(),
  unit: TypeExports.Union([TypeExports.Literal("ms"), TypeExports.Literal("score")]),
});

/**
 * Web Vitals budget breach schema.
 */
export const WebVitalsBudgetBreachSchema: TObject<
  {
    readonly name: TUnion<
      [
        TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
        ...TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
      ]
    >;
    readonly p75: TNumber;
    readonly target: TNumber;
    readonly delta: TNumber;
  },
  "name" | "p75" | "target" | "delta",
  never
> = TypeExports.Object({
  name: WebVitalsMetricNameSchema,
  p75: TypeExports.Number(),
  target: TypeExports.Number(),
  delta: TypeExports.Number(),
});

/**
 * Web Vitals alerting status schema.
 */
export const WebVitalsAlertingSchema: TObject<
  {
    readonly alertingActive: TBoolean;
    readonly minSamples: TNumber;
    readonly breaches: TArray<
      TObject<
        {
          readonly name: TUnion<
            [
              TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
              ...TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
            ]
          >;
          readonly p75: TNumber;
          readonly target: TNumber;
          readonly delta: TNumber;
        },
        "name" | "p75" | "target" | "delta",
        never
      >
    >;
  },
  "breaches" | "alertingActive" | "minSamples",
  never
> = TypeExports.Object({
  alertingActive: TypeExports.Boolean(),
  minSamples: TypeExports.Number(),
  breaches: TypeExports.Array(WebVitalsBudgetBreachSchema),
});

/**
 * Web Vitals summary response schema.
 */
export const WebVitalsSummaryResponseSchema = TypeExports.Object({
  ok: TypeExports.Literal(true),
  totalReports: TypeExports.Number(),
  totalSamples: TypeExports.Number(),
  lastUpdated: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  maxReports: TypeExports.Number(),
  metrics: TypeExports.Array(WebVitalsMetricSummarySchema),
  paths: TypeExports.Array(WebVitalsPathSummarySchema),
  budgets: TypeExports.Array(WebVitalsBudgetSchema),
  alerting: WebVitalsAlertingSchema,
});

/** Inferred type from the WebVitalsReportResponse schema. */
export type WebVitalsReportResponse = Static<typeof WebVitalsReportResponseSchema>;
/** Inferred type from the WebVitalsSummaryResponse schema. */
export type WebVitalsSummaryResponse = Static<typeof WebVitalsSummaryResponseSchema>;
/** Inferred type from the WebVitals metric-name schema. */
export type WebVitalMetricName = Static<typeof WebVitalsMetricNameSchema>;
/** Inferred type from the WebVitals rating schema. */
export type WebVitalRating = Static<typeof WebVitalRatingSchema>;
/** Inferred type from the WebVitals metric payload schema. */
export type WebVitalSnapshot = Static<typeof WebVitalsMetricSchema>;
/** Inferred type from the WebVitals report payload schema. */
export type WebVitalsReportPayload = Static<ReturnType<typeof buildWebVitalsReportSchema>>;
