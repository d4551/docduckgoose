/**
 * Web Vitals telemetry schemas.
 *
 * Shared TypeBox schemas for Web Vitals report ingestion and summary responses.
 *
 * @shared/schemas/web-vitals.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const WebVitalsMetricNameSchema: Type.TUnion<
  [
    Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
    ...Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
  ]
> = stringEnum(WEB_VITAL_METRIC_NAMES, {});

/**
 * Web Vitals rating schema.
 */
export const WebVitalRatingSchema: Type.TUnion<
  [
    Type.TLiteral<"good" | "needs-improvement" | "poor">,
    ...Type.TLiteral<"good" | "needs-improvement" | "poor">[],
  ]
> = stringEnum(WEB_VITAL_RATINGS, {});

/**
 * Web Vitals metric payload schema.
 */
export const WebVitalsMetricSchema = Type.Object({
  name: WebVitalsMetricNameSchema,
  value: Type.Number(),
  delta: Type.Number(),
  id: Type.String({ minLength: 1, maxLength: 200 }),
  rating: Type.Optional(WebVitalRatingSchema),
  navigationType: Type.Optional(Type.String({ maxLength: 50 })),
});

/**
 * Build a Web Vitals report schema with a metrics cap.
 *
 * @param maxMetricsPerReport - Maximum number of metric samples per report.
 * @returns TypeBox schema for the Web Vitals report payload.
 */
export function buildWebVitalsReportSchema(maxMetricsPerReport: number) {
  return Type.Object({
    path: Type.String({ minLength: 1, maxLength: 200 }),
    url: Type.Optional(Type.String()),
    userAgent: Type.Optional(Type.String({ maxLength: 500 })),
    timestamp: Type.String({ format: "date-time" }),
    metrics: Type.Array(WebVitalsMetricSchema, {
      minItems: 1,
      maxItems: maxMetricsPerReport,
    }),
  });
}

/**
 * Web Vitals ingest response schema.
 */
export const WebVitalsReportResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly receivedAt: Type.TString;
    readonly stored: Type.TBoolean;
    readonly metrics: Type.TNumber;
  },
  "ok" | "receivedAt" | "stored" | "metrics",
  never
> = Type.Object({
  ok: Type.Literal(true),
  receivedAt: Type.String(),
  stored: Type.Boolean(),
  metrics: Type.Number(),
});

/**
 * Web Vitals metric summary schema.
 */
export const WebVitalsMetricSummarySchema: Type.TObject<
  {
    readonly name: Type.TUnion<
      [
        Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
        ...Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
      ]
    >;
    readonly count: Type.TNumber;
    readonly p50: Type.TNumber;
    readonly p75: Type.TNumber;
    readonly p95: Type.TNumber;
    readonly min: Type.TNumber;
    readonly max: Type.TNumber;
    readonly lastUpdated: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly ratings: Type.TObject<
      {
        readonly good: Type.TNumber;
        readonly needsImprovement: Type.TNumber;
        readonly poor: Type.TNumber;
      },
      "good" | "poor" | "needsImprovement",
      never
    >;
  },
  "name" | "lastUpdated" | "ratings" | "count" | "p50" | "p75" | "p95" | "min" | "max",
  never
> = Type.Object({
  name: WebVitalsMetricNameSchema,
  count: Type.Number(),
  p50: Type.Number(),
  p75: Type.Number(),
  p95: Type.Number(),
  min: Type.Number(),
  max: Type.Number(),
  lastUpdated: Type.Union([Type.String(), Type.Null()]),
  ratings: Type.Object({
    good: Type.Number(),
    needsImprovement: Type.Number(),
    poor: Type.Number(),
  }),
});

/**
 * Web Vitals path summary schema.
 */
export const WebVitalsPathSummarySchema = Type.Object({
  path: Type.String(),
  lastUpdated: Type.Union([Type.String(), Type.Null()]),
  metrics: Type.Array(WebVitalsMetricSummarySchema),
});

/**
 * Web Vitals budget threshold schema.
 */
export const WebVitalsBudgetSchema: Type.TObject<
  {
    readonly name: Type.TUnion<
      [
        Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
        ...Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
      ]
    >;
    readonly target: Type.TNumber;
    readonly unit: Type.TUnion<(Type.TLiteral<"ms"> | Type.TLiteral<"score">)[]>;
  },
  "name" | "unit" | "target",
  never
> = Type.Object({
  name: WebVitalsMetricNameSchema,
  target: Type.Number(),
  unit: Type.Union([Type.Literal("ms"), Type.Literal("score")]),
});

/**
 * Web Vitals budget breach schema.
 */
export const WebVitalsBudgetBreachSchema: Type.TObject<
  {
    readonly name: Type.TUnion<
      [
        Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
        ...Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
      ]
    >;
    readonly p75: Type.TNumber;
    readonly target: Type.TNumber;
    readonly delta: Type.TNumber;
  },
  "name" | "p75" | "target" | "delta",
  never
> = Type.Object({
  name: WebVitalsMetricNameSchema,
  p75: Type.Number(),
  target: Type.Number(),
  delta: Type.Number(),
});

/**
 * Web Vitals alerting status schema.
 */
export const WebVitalsAlertingSchema: Type.TObject<
  {
    readonly alertingActive: Type.TBoolean;
    readonly minSamples: Type.TNumber;
    readonly breaches: Type.TArray<
      Type.TObject<
        {
          readonly name: Type.TUnion<
            [
              Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">,
              ...Type.TLiteral<"CLS" | "INP" | "LCP" | "FCP" | "TTFB">[],
            ]
          >;
          readonly p75: Type.TNumber;
          readonly target: Type.TNumber;
          readonly delta: Type.TNumber;
        },
        "name" | "p75" | "target" | "delta",
        never
      >
    >;
  },
  "breaches" | "alertingActive" | "minSamples",
  never
> = Type.Object({
  alertingActive: Type.Boolean(),
  minSamples: Type.Number(),
  breaches: Type.Array(WebVitalsBudgetBreachSchema),
});

/**
 * Web Vitals summary response schema.
 */
export const WebVitalsSummaryResponseSchema = Type.Object({
  ok: Type.Literal(true),
  totalReports: Type.Number(),
  totalSamples: Type.Number(),
  lastUpdated: Type.Union([Type.String(), Type.Null()]),
  maxReports: Type.Number(),
  metrics: Type.Array(WebVitalsMetricSummarySchema),
  paths: Type.Array(WebVitalsPathSummarySchema),
  budgets: Type.Array(WebVitalsBudgetSchema),
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
