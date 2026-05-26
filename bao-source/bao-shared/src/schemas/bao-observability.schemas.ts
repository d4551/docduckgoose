/**
 * Bao Observability shared schemas.
 *
 * TypeBox schemas for the native observability stack (metrics, traces, logs, alerts).
 * Used by both Elysia API plugins and Eden contract definitions.
 *
 * @shared/schemas/bao-observability
 */

import { MS_PER_DAY, MS_PER_HOUR } from "@baohaus/bao-shared/constants/time";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const JSON_SCHEMA_ID_KEY = "$id" as const;

// Metrics

/** Metric type enumeration. */
export const MetricTypeSchema: Type.TUnion<
  (
    | Type.TLiteral<"counter">
    | Type.TLiteral<"gauge">
    | Type.TLiteral<"histogram">
    | Type.TLiteral<"summary">
  )[]
> = Type.Union(
  [
    Type.Literal("counter"),
    Type.Literal("gauge"),
    Type.Literal("histogram"),
    Type.Literal("summary"),
  ],
  {},
);

/** TypeScript type for {@link MetricTypeSchema}. */
export type MetricType = Static<typeof MetricTypeSchema>;

/** Single metric data point. */
export const MetricPointSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly labels: Type.TRecord<Type.TString, Type.TString>;
    readonly value: Type.TNumber;
    readonly type: Type.TUnion<
      (
        | Type.TLiteral<"counter">
        | Type.TLiteral<"gauge">
        | Type.TLiteral<"histogram">
        | Type.TLiteral<"summary">
      )[]
    >;
    readonly timestamp: Type.TString;
  },
  "labels" | "name" | "value" | "type" | "timestamp",
  never
> = Type.Object(
  {
    name: Type.String({ minLength: 1, description: "Metric name (e.g. http_requests_total)" }),
    labels: Type.Record(Type.String(), Type.String(), { description: "Label key-value pairs" }),
    value: Type.Number({ description: "Metric value" }),
    type: MetricTypeSchema,
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link MetricPointSchema}. */
export type MetricPoint = Static<typeof MetricPointSchema>;

/** Metrics query request parameters. */
export const MetricsQueryRequestSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ description: "Filter by metric name (exact match)" })),
    namePrefix: Type.Optional(Type.String({ description: "Filter by metric name prefix" })),
    labels: Type.Optional(
      Type.Record(Type.String(), Type.String(), { description: "Filter by label values" }),
    ),
    range: Type.Optional(
      Type.Union(
        [
          Type.Literal("5m"),
          Type.Literal("15m"),
          Type.Literal("1h"),
          Type.Literal("6h"),
          Type.Literal("24h"),
          Type.Literal("7d"),
        ],
        { description: "Time range for query" },
      ),
    ),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 10000, default: 1000 })),
    offset: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link MetricsQueryRequestSchema}. */
export type MetricsQueryRequest = Static<typeof MetricsQueryRequestSchema>;

/** Metrics query response. */
export const MetricsQueryResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TArray<
      Type.TObject<
        {
          readonly name: Type.TString;
          readonly labels: Type.TRecord<Type.TString, Type.TString>;
          readonly value: Type.TNumber;
          readonly type: Type.TUnion<
            (
              | Type.TLiteral<"counter">
              | Type.TLiteral<"gauge">
              | Type.TLiteral<"histogram">
              | Type.TLiteral<"summary">
            )[]
          >;
          readonly timestamp: Type.TString;
        },
        "name" | "labels" | "value" | "type" | "timestamp",
        never
      >
    >;
    readonly count: Type.TInteger;
    readonly hasMore: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "ok" | "data" | "timestamp" | "count" | "hasMore",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(MetricPointSchema),
    count: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link MetricsQueryResponseSchema}. */
export type MetricsQueryResponse = Static<typeof MetricsQueryResponseSchema>;

/** Live metrics snapshot (current prom-client state). */
export const MetricsSnapshotResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TArray<
      Type.TObject<
        {
          readonly name: Type.TString;
          readonly help: Type.TString;
          readonly type: Type.TString;
          readonly values: Type.TArray<
            Type.TObject<
              {
                readonly labels: Type.TRecord<Type.TString, Type.TString>;
                readonly value: Type.TNumber;
              },
              "labels" | "value",
              never
            >
          >;
        },
        "values" | "name" | "help" | "type",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "data" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(
      Type.Object({
        name: Type.String(),
        help: Type.String(),
        type: Type.String(),
        values: Type.Array(
          Type.Object({
            labels: Type.Record(Type.String(), Type.String()),
            value: Type.Number(),
          }),
        ),
      }),
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link MetricsSnapshotResponseSchema}. */
export type MetricsSnapshotResponse = Static<typeof MetricsSnapshotResponseSchema>;

// Traces

/** Single trace span. */
export const TraceSpanSchema = Type.Object(
  {
    id: Type.String(),
    traceId: Type.String({ description: "W3C trace ID" }),
    spanId: Type.String({ description: "Span identifier" }),
    parentSpanId: Type.Optional(Type.String()),
    operationName: Type.String(),
    serviceName: Type.String(),
    startTime: Type.String({ format: "date-time" }),
    durationMs: Type.Number({ minimum: 0 }),
    statusCode: Type.Integer({ minimum: 0 }),
    tags: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    events: Type.Optional(Type.Array(Type.Unknown())),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TraceSpanSchema}. */
export type TraceSpan = Static<typeof TraceSpanSchema>;

/** Canonical trace query pagination defaults. */
export const TRACE_QUERY_LIMITS = {
  default: 100,
  max: 1000,
} as const;

/** Traces query request parameters. */
export const TracesQueryRequestSchema = Type.Object(
  {
    traceId: Type.Optional(Type.String({ description: "Filter by trace ID" })),
    serviceName: Type.Optional(Type.String({ description: "Filter by service name" })),
    operationName: Type.Optional(Type.String({ description: "Filter by operation name" })),
    minDurationMs: Type.Optional(Type.Number({ minimum: 0 })),
    maxDurationMs: Type.Optional(Type.Number({ minimum: 0 })),
    range: Type.Optional(
      Type.Union([
        Type.Literal("5m"),
        Type.Literal("15m"),
        Type.Literal("1h"),
        Type.Literal("6h"),
        Type.Literal("24h"),
        Type.Literal("7d"),
      ]),
    ),
    limit: Type.Optional(
      Type.Integer({
        minimum: 1,
        maximum: TRACE_QUERY_LIMITS.max,
        default: TRACE_QUERY_LIMITS.default,
      }),
    ),
    offset: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TracesQueryRequestSchema}. */
export type TracesQueryRequest = Static<typeof TracesQueryRequestSchema>;

/** Traces query response. */
export const TracesQueryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(TraceSpanSchema),
    count: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link TracesQueryResponseSchema}. */
export type TracesQueryResponse = Static<typeof TracesQueryResponseSchema>;

// Logs

/** Log level enumeration. */
export const LogLevelSchema: Type.TUnion<
  (
    | Type.TLiteral<"debug">
    | Type.TLiteral<"info">
    | Type.TLiteral<"warn">
    | Type.TLiteral<"error">
    | Type.TLiteral<"fatal">
  )[]
> = Type.Union(
  [
    Type.Literal("debug"),
    Type.Literal("info"),
    Type.Literal("warn"),
    Type.Literal("error"),
    Type.Literal("fatal"),
  ],
  {},
);

/** TypeScript type for {@link LogLevelSchema}. */
export type LogLevel = Static<typeof LogLevelSchema>;

/** Single log entry. */
export const LogEntrySchema = Type.Object(
  {
    id: Type.String(),
    level: LogLevelSchema,
    message: Type.String(),
    service: Type.String(),
    traceId: Type.Optional(Type.String()),
    spanId: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link LogEntrySchema}. */
export type LogEntry = Static<typeof LogEntrySchema>;

/** Logs query request parameters. */
export const LogsQueryRequestSchema = Type.Object(
  {
    level: Type.Optional(LogLevelSchema),
    service: Type.Optional(Type.String()),
    traceId: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
    search: Type.Optional(Type.String({ description: "Full-text search in message" })),
    range: Type.Optional(
      Type.Union([
        Type.Literal("5m"),
        Type.Literal("15m"),
        Type.Literal("1h"),
        Type.Literal("6h"),
        Type.Literal("24h"),
        Type.Literal("7d"),
      ]),
    ),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 10000, default: 500 })),
    offset: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link LogsQueryRequestSchema}. */
export type LogsQueryRequest = Static<typeof LogsQueryRequestSchema>;

/** Logs query response. */
export const LogsQueryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(LogEntrySchema),
    count: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link LogsQueryResponseSchema}. */
export type LogsQueryResponse = Static<typeof LogsQueryResponseSchema>;

// Alerts

/** Alert severity enumeration. */
export const AlertSeveritySchema: Type.TUnion<
  (Type.TLiteral<"info"> | Type.TLiteral<"critical"> | Type.TLiteral<"warning">)[]
> = Type.Union([Type.Literal("critical"), Type.Literal("warning"), Type.Literal("info")], {});

/** TypeScript type for {@link AlertSeveritySchema}. */
export type AlertSeverity = Static<typeof AlertSeveritySchema>;

/** Alert condition operator. */
export const AlertConditionSchema: Type.TUnion<
  (
    | Type.TLiteral<"gt">
    | Type.TLiteral<"gte">
    | Type.TLiteral<"lt">
    | Type.TLiteral<"lte">
    | Type.TLiteral<"eq">
    | Type.TLiteral<"neq">
  )[]
> = Type.Union(
  [
    Type.Literal("gt"),
    Type.Literal("gte"),
    Type.Literal("lt"),
    Type.Literal("lte"),
    Type.Literal("eq"),
    Type.Literal("neq"),
  ],
  {},
);

/** TypeScript type for {@link AlertConditionSchema}. */
export type AlertCondition = Static<typeof AlertConditionSchema>;

/** Alert state enumeration. */
export const AlertStateSchema: Type.TUnion<
  (Type.TLiteral<"pending"> | Type.TLiteral<"firing"> | Type.TLiteral<"resolved">)[]
> = Type.Union([Type.Literal("pending"), Type.Literal("firing"), Type.Literal("resolved")], {});

/** TypeScript type for {@link AlertStateSchema}. */
export type AlertState = Static<typeof AlertStateSchema>;

/** Alert rule definition. */
export const AlertRuleSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String()),
    metricName: Type.String({ minLength: 1 }),
    condition: AlertConditionSchema,
    threshold: Type.Number(),
    duration: Type.Integer({ minimum: 0, description: "Seconds to wait before firing" }),
    severity: AlertSeveritySchema,
    labels: Type.Record(Type.String(), Type.String()),
    receivers: Type.Array(Type.String()),
    enabled: Type.Boolean(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link AlertRuleSchema}. */
export type AlertRule = Static<typeof AlertRuleSchema>;

/** Alert rule create request. */
export const AlertRuleCreateRequestSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 255 }),
    description: Type.Optional(Type.String({ maxLength: 1000 })),
    metricName: Type.String({ minLength: 1, maxLength: 255 }),
    condition: AlertConditionSchema,
    threshold: Type.Number(),
    duration: Type.Optional(Type.Integer({ minimum: 0, default: 0 })),
    severity: Type.Optional(AlertSeveritySchema),
    labels: Type.Optional(Type.Record(Type.String(), Type.String())),
    receivers: Type.Optional(Type.Array(Type.String())),
    enabled: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link AlertRuleCreateRequestSchema}. */
export type AlertRuleCreateRequest = Static<typeof AlertRuleCreateRequestSchema>;

/** Alert instance (current state of an alert for a rule+label combination). */
export const AlertInstanceSchema = Type.Object(
  {
    id: Type.String(),
    ruleId: Type.String(),
    ruleName: Type.String(),
    fingerprint: Type.String(),
    state: AlertStateSchema,
    severity: AlertSeveritySchema,
    value: Type.Optional(Type.Number()),
    labels: Type.Record(Type.String(), Type.String()),
    firedAt: Type.Optional(Type.String({ format: "date-time" })),
    resolvedAt: Type.Optional(Type.String({ format: "date-time" })),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link AlertInstanceSchema}. */
export type AlertInstance = Static<typeof AlertInstanceSchema>;

/** Alert rules list response. */
export const AlertRulesListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(AlertRuleSchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { [JSON_SCHEMA_ID_KEY]: "BaoAlertRulesListResponse", additionalProperties: true },
);

/** TypeScript type for {@link AlertRulesListResponseSchema}. */
export type AlertRulesListResponse = Static<typeof AlertRulesListResponseSchema>;

/** Alert rule create response (single rule, not a list). */
export const AlertRuleCreateResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: AlertRuleSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { [JSON_SCHEMA_ID_KEY]: "BaoAlertRuleCreateResponse", additionalProperties: true },
);

/** TypeScript type for {@link AlertRuleCreateResponseSchema}. */
export type AlertRuleCreateResponse = Static<typeof AlertRuleCreateResponseSchema>;

/** Alert instances list response. */
export const AlertInstancesListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(AlertInstanceSchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link AlertInstancesListResponseSchema}. */
export type AlertInstancesListResponse = Static<typeof AlertInstancesListResponseSchema>;

// Time range helper

/** Supported time range values across all observability queries. */
export type TimeRange = "5m" | "15m" | "1h" | "6h" | "24h" | "7d";

/** Canonical observability time-window defaults. */
export const DEFAULT_AI_USAGE_TIME_RANGE: TimeRange = "24h";
/** Default retention time range used by observability history queries. */
export const DEFAULT_OBSERVABILITY_RETENTION_TIME_RANGE: TimeRange = "7d";

/** Map time range string to milliseconds. */
export const TIME_RANGE_MS: Record<TimeRange, number> = {
  "5m": 300000,
  "15m": 900000,
  "1h": MS_PER_HOUR,
  "6h": 21600000,
  "24h": MS_PER_DAY,
  "7d": 604800000,
};
