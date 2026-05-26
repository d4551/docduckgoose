/**
 * Bao Observability shared schemas.
 *
 * TypeBox schemas for the native observability stack (metrics, traces, logs, alerts).
 * Used by both Elysia API plugins and Eden contract definitions.
 *
 * @shared/schemas/bao-observability
 */

import { MS_PER_DAY, MS_PER_HOUR } from "@baohaus/bao-constants/time";
import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const JSON_SCHEMA_ID_KEY = "$id" as const;

// Metrics

/** Metric type enumeration. */
export const MetricTypeSchema: TUnion<
  (TLiteral<"counter"> | TLiteral<"gauge"> | TLiteral<"histogram"> | TLiteral<"summary">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("counter"),
    TypeExports.Literal("gauge"),
    TypeExports.Literal("histogram"),
    TypeExports.Literal("summary"),
  ],
  {},
);

/** TypeScript type for {@link MetricTypeSchema}. */
export type MetricType = Static<typeof MetricTypeSchema>;

/** Single metric data point. */
export const MetricPointSchema: TObject<
  {
    readonly name: TString;
    readonly labels: TRecord<TString, TString>;
    readonly value: TNumber;
    readonly type: TUnion<
      (TLiteral<"counter"> | TLiteral<"gauge"> | TLiteral<"histogram"> | TLiteral<"summary">)[]
    >;
    readonly timestamp: TString;
  },
  "labels" | "name" | "value" | "type" | "timestamp",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      description: "Metric name (e.g. http_requests_total)",
    }),
    labels: TypeExports.Record(TypeExports.String(), TypeExports.String(), {
      description: "Label key-value pairs",
    }),
    value: TypeExports.Number({ description: "Metric value" }),
    type: MetricTypeSchema,
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link MetricPointSchema}. */
export type MetricPoint = Static<typeof MetricPointSchema>;

/** Metrics query request parameters. */
export const MetricsQueryRequestSchema = TypeExports.Object(
  {
    name: TypeExports.Optional(
      TypeExports.String({ description: "Filter by metric name (exact match)" }),
    ),
    namePrefix: TypeExports.Optional(
      TypeExports.String({ description: "Filter by metric name prefix" }),
    ),
    labels: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.String(), {
        description: "Filter by label values",
      }),
    ),
    range: TypeExports.Optional(
      TypeExports.Union(
        [
          TypeExports.Literal("5m"),
          TypeExports.Literal("15m"),
          TypeExports.Literal("1h"),
          TypeExports.Literal("6h"),
          TypeExports.Literal("24h"),
          TypeExports.Literal("7d"),
        ],
        { description: "Time range for query" },
      ),
    ),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 10000, default: 1000 })),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0, default: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link MetricsQueryRequestSchema}. */
export type MetricsQueryRequest = Static<typeof MetricsQueryRequestSchema>;

/** Metrics query response. */
export const MetricsQueryResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TArray<
      TObject<
        {
          readonly name: TString;
          readonly labels: TRecord<TString, TString>;
          readonly value: TNumber;
          readonly type: TUnion<
            (
              | TLiteral<"counter">
              | TLiteral<"gauge">
              | TLiteral<"histogram">
              | TLiteral<"summary">
            )[]
          >;
          readonly timestamp: TString;
        },
        "name" | "labels" | "value" | "type" | "timestamp",
        never
      >
    >;
    readonly count: TInteger;
    readonly hasMore: TBoolean;
    readonly timestamp: TString;
  },
  "ok" | "data" | "timestamp" | "count" | "hasMore",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(MetricPointSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link MetricsQueryResponseSchema}. */
export type MetricsQueryResponse = Static<typeof MetricsQueryResponseSchema>;

/** Live metrics snapshot (current prom-client state). */
export const MetricsSnapshotResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TArray<
      TObject<
        {
          readonly name: TString;
          readonly help: TString;
          readonly type: TString;
          readonly values: TArray<
            TObject<
              {
                readonly labels: TRecord<TString, TString>;
                readonly value: TNumber;
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
    readonly timestamp: TString;
  },
  "ok" | "data" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(
      TypeExports.Object({
        name: TypeExports.String(),
        help: TypeExports.String(),
        type: TypeExports.String(),
        values: TypeExports.Array(
          TypeExports.Object({
            labels: TypeExports.Record(TypeExports.String(), TypeExports.String()),
            value: TypeExports.Number(),
          }),
        ),
      }),
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link MetricsSnapshotResponseSchema}. */
export type MetricsSnapshotResponse = Static<typeof MetricsSnapshotResponseSchema>;

// Traces

/** Single trace span. */
export const TraceSpanSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    traceId: TypeExports.String({ description: "W3C trace ID" }),
    spanId: TypeExports.String({ description: "Span identifier" }),
    parentSpanId: TypeExports.Optional(TypeExports.String()),
    operationName: TypeExports.String(),
    serviceName: TypeExports.String(),
    startTime: TypeExports.String({ format: "date-time" }),
    durationMs: TypeExports.Number({ minimum: 0 }),
    statusCode: TypeExports.Integer({ minimum: 0 }),
    tags: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    events: TypeExports.Optional(TypeExports.Array(TypeExports.Unknown())),
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
export const TracesQueryRequestSchema = TypeExports.Object(
  {
    traceId: TypeExports.Optional(TypeExports.String({ description: "Filter by trace ID" })),
    serviceName: TypeExports.Optional(
      TypeExports.String({ description: "Filter by service name" }),
    ),
    operationName: TypeExports.Optional(
      TypeExports.String({ description: "Filter by operation name" }),
    ),
    minDurationMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    maxDurationMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    range: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("5m"),
        TypeExports.Literal("15m"),
        TypeExports.Literal("1h"),
        TypeExports.Literal("6h"),
        TypeExports.Literal("24h"),
        TypeExports.Literal("7d"),
      ]),
    ),
    limit: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 1,
        maximum: TRACE_QUERY_LIMITS.max,
        default: TRACE_QUERY_LIMITS.default,
      }),
    ),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0, default: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TracesQueryRequestSchema}. */
export type TracesQueryRequest = Static<typeof TracesQueryRequestSchema>;

/** Traces query response. */
export const TracesQueryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(TraceSpanSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link TracesQueryResponseSchema}. */
export type TracesQueryResponse = Static<typeof TracesQueryResponseSchema>;

// Logs

/** Log level enumeration. */
export const LogLevelSchema: TUnion<
  (
    | TLiteral<"debug">
    | TLiteral<"info">
    | TLiteral<"warn">
    | TLiteral<"error">
    | TLiteral<"fatal">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("debug"),
    TypeExports.Literal("info"),
    TypeExports.Literal("warn"),
    TypeExports.Literal("error"),
    TypeExports.Literal("fatal"),
  ],
  {},
);

/** TypeScript type for {@link LogLevelSchema}. */
export type LogLevel = Static<typeof LogLevelSchema>;

/** Single log entry. */
export const LogEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    level: LogLevelSchema,
    message: TypeExports.String(),
    service: TypeExports.String(),
    traceId: TypeExports.Optional(TypeExports.String()),
    spanId: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link LogEntrySchema}. */
export type LogEntry = Static<typeof LogEntrySchema>;

/** Logs query request parameters. */
export const LogsQueryRequestSchema = TypeExports.Object(
  {
    level: TypeExports.Optional(LogLevelSchema),
    service: TypeExports.Optional(TypeExports.String()),
    traceId: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
    search: TypeExports.Optional(
      TypeExports.String({ description: "Full-text search in message" }),
    ),
    range: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("5m"),
        TypeExports.Literal("15m"),
        TypeExports.Literal("1h"),
        TypeExports.Literal("6h"),
        TypeExports.Literal("24h"),
        TypeExports.Literal("7d"),
      ]),
    ),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 10000, default: 500 })),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0, default: 0 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link LogsQueryRequestSchema}. */
export type LogsQueryRequest = Static<typeof LogsQueryRequestSchema>;

/** Logs query response. */
export const LogsQueryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(LogEntrySchema),
    count: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: true },
);

/** TypeScript type for {@link LogsQueryResponseSchema}. */
export type LogsQueryResponse = Static<typeof LogsQueryResponseSchema>;

// Alerts

/** Alert severity enumeration. */
export const AlertSeveritySchema: TUnion<
  (TLiteral<"info"> | TLiteral<"critical"> | TLiteral<"warning">)[]
> = TypeExports.Union(
  [TypeExports.Literal("critical"), TypeExports.Literal("warning"), TypeExports.Literal("info")],
  {},
);

/** TypeScript type for {@link AlertSeveritySchema}. */
export type AlertSeverity = Static<typeof AlertSeveritySchema>;

/** Alert condition operator. */
export const AlertConditionSchema: TUnion<
  (
    | TLiteral<"gt">
    | TLiteral<"gte">
    | TLiteral<"lt">
    | TLiteral<"lte">
    | TLiteral<"eq">
    | TLiteral<"neq">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("gt"),
    TypeExports.Literal("gte"),
    TypeExports.Literal("lt"),
    TypeExports.Literal("lte"),
    TypeExports.Literal("eq"),
    TypeExports.Literal("neq"),
  ],
  {},
);

/** TypeScript type for {@link AlertConditionSchema}. */
export type AlertCondition = Static<typeof AlertConditionSchema>;

/** Alert state enumeration. */
export const AlertStateSchema: TUnion<
  (TLiteral<"pending"> | TLiteral<"firing"> | TLiteral<"resolved">)[]
> = TypeExports.Union(
  [TypeExports.Literal("pending"), TypeExports.Literal("firing"), TypeExports.Literal("resolved")],
  {},
);

/** TypeScript type for {@link AlertStateSchema}. */
export type AlertState = Static<typeof AlertStateSchema>;

/** Alert rule definition. */
export const AlertRuleSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    name: TypeExports.String({ minLength: 1 }),
    description: TypeExports.Optional(TypeExports.String()),
    metricName: TypeExports.String({ minLength: 1 }),
    condition: AlertConditionSchema,
    threshold: TypeExports.Number(),
    duration: TypeExports.Integer({ minimum: 0, description: "Seconds to wait before firing" }),
    severity: AlertSeveritySchema,
    labels: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    receivers: TypeExports.Array(TypeExports.String()),
    enabled: TypeExports.Boolean(),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link AlertRuleSchema}. */
export type AlertRule = Static<typeof AlertRuleSchema>;

/** Alert rule create request. */
export const AlertRuleCreateRequestSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1, maxLength: 255 }),
    description: TypeExports.Optional(TypeExports.String({ maxLength: 1000 })),
    metricName: TypeExports.String({ minLength: 1, maxLength: 255 }),
    condition: AlertConditionSchema,
    threshold: TypeExports.Number(),
    duration: TypeExports.Optional(TypeExports.Integer({ minimum: 0, default: 0 })),
    severity: TypeExports.Optional(AlertSeveritySchema),
    labels: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.String())),
    receivers: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    enabled: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link AlertRuleCreateRequestSchema}. */
export type AlertRuleCreateRequest = Static<typeof AlertRuleCreateRequestSchema>;

/** Alert instance (current state of an alert for a rule+label combination). */
export const AlertInstanceSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    ruleId: TypeExports.String(),
    ruleName: TypeExports.String(),
    fingerprint: TypeExports.String(),
    state: AlertStateSchema,
    severity: AlertSeveritySchema,
    value: TypeExports.Optional(TypeExports.Number()),
    labels: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    firedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    resolvedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link AlertInstanceSchema}. */
export type AlertInstance = Static<typeof AlertInstanceSchema>;

/** Alert rules list response. */
export const AlertRulesListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(AlertRuleSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { [JSON_SCHEMA_ID_KEY]: "BaoAlertRulesListResponse", additionalProperties: true },
);

/** TypeScript type for {@link AlertRulesListResponseSchema}. */
export type AlertRulesListResponse = Static<typeof AlertRulesListResponseSchema>;

/** Alert rule create response (single rule, not a list). */
export const AlertRuleCreateResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: AlertRuleSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { [JSON_SCHEMA_ID_KEY]: "BaoAlertRuleCreateResponse", additionalProperties: true },
);

/** TypeScript type for {@link AlertRuleCreateResponseSchema}. */
export type AlertRuleCreateResponse = Static<typeof AlertRuleCreateResponseSchema>;

/** Alert instances list response. */
export const AlertInstancesListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(AlertInstanceSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
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
