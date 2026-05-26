/**
 * Bao Observability v1 contract definitions.
 *
 * Contract-first boundary for the native observability endpoints:
 * - GET  `/api/v1/bao-observability/metrics`      — query stored metric snapshots
 * - GET  `/api/v1/bao-observability/metrics/live`  — live prom-client snapshot
 * - GET  `/api/v1/bao-observability/traces`        — query stored trace spans
 * - GET  `/api/v1/bao-observability/logs`          — query stored log entries
 * - GET  `/api/v1/bao-observability/alerts`        — list active alert instances
 * - GET  `/api/v1/bao-observability/alerts/rules`  — list alert rules
 * - POST `/api/v1/bao-observability/alerts/rules`  — create alert rule
 *
 * @shared/contracts/versions/v1/bao-observability
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  AlertInstancesListResponseSchema,
  AlertRuleCreateRequestSchema,
  AlertRuleCreateResponseSchema,
  AlertRulesListResponseSchema,
  LogsQueryRequestSchema,
  LogsQueryResponseSchema,
  MetricsQueryRequestSchema,
  MetricsQueryResponseSchema,
  MetricsSnapshotResponseSchema,
  TracesQueryRequestSchema,
  TracesQueryResponseSchema,
} from "../../../schemas/bao-observability.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/** Contract version for all bao-observability endpoints. */
export const CONTRACT_VERSION = "1.0.0";

/** Empty request schema for GET-only endpoints with no query params. */
const EmptyRequestV1 = Type.Object({}, { additionalProperties: false });

// GET /api/v1/bao-observability/metrics

/** Contract name for metrics query. */
export const METRICS_QUERY_CONTRACT_NAME = "bao-observability-metrics-query";

/** Request schema. */
export const BaoMetricsQueryRequestV1: typeof MetricsQueryRequestSchema = MetricsQueryRequestSchema;

/** Response schema. */
export const BaoMetricsQueryResponseV1: Type.TObject<
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
> = MetricsQueryResponseSchema;

/** Error schema. */
export const BaoMetricsQueryErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for metrics query. */
export const BaoMetricsQueryContractV1 = {
  name: METRICS_QUERY_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: API_PATHS.baoObservabilityMetrics,
  request: BaoMetricsQueryRequestV1,
  response: BaoMetricsQueryResponseV1,
  errors: BaoMetricsQueryErrorV1,
} as const satisfies VersionedContractV1;

// GET /api/v1/bao-observability/metrics/live

/** Contract name for live metrics snapshot. */
export const METRICS_LIVE_CONTRACT_NAME = "bao-observability-metrics-live";

/** Response schema. */
export const BaoMetricsLiveResponseV1: Type.TObject<
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
  "ok" | "timestamp" | "data",
  never
> = MetricsSnapshotResponseSchema;

/** Error schema. */
export const BaoMetricsLiveErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for live metrics. */
export const BaoMetricsLiveContractV1 = {
  name: METRICS_LIVE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: `${API_PATHS.baoObservabilityMetrics}/live`,
  request: EmptyRequestV1,
  response: BaoMetricsLiveResponseV1,
  errors: BaoMetricsLiveErrorV1,
} as const satisfies VersionedContractV1;

// GET /api/v1/bao-observability/traces

/** Contract name for traces query. */
export const TRACES_QUERY_CONTRACT_NAME = "bao-observability-traces-query";

/** Request schema. */
export const BaoTracesQueryRequestV1: typeof TracesQueryRequestSchema = TracesQueryRequestSchema;

/** Response schema. */
export const BaoTracesQueryResponseV1: typeof TracesQueryResponseSchema = TracesQueryResponseSchema;

/** Error schema. */
export const BaoTracesQueryErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for traces query. */
export const BaoTracesQueryContractV1 = {
  name: TRACES_QUERY_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: API_PATHS.baoObservabilityTraces,
  request: BaoTracesQueryRequestV1,
  response: BaoTracesQueryResponseV1,
  errors: BaoTracesQueryErrorV1,
} as const satisfies VersionedContractV1;

// GET /api/v1/bao-observability/logs

/** Contract name for logs query. */
export const LOGS_QUERY_CONTRACT_NAME = "bao-observability-logs-query";

/** Request schema. */
export const BaoLogsQueryRequestV1: typeof LogsQueryRequestSchema = LogsQueryRequestSchema;

/** Response schema. */
export const BaoLogsQueryResponseV1: typeof LogsQueryResponseSchema = LogsQueryResponseSchema;

/** Error schema. */
export const BaoLogsQueryErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for logs query. */
export const BaoLogsQueryContractV1 = {
  name: LOGS_QUERY_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: API_PATHS.baoObservabilityLogs,
  request: BaoLogsQueryRequestV1,
  response: BaoLogsQueryResponseV1,
  errors: BaoLogsQueryErrorV1,
} as const satisfies VersionedContractV1;

// GET /api/v1/bao-observability/alerts

/** Contract name for alert instances list. */
export const ALERTS_LIST_CONTRACT_NAME = "bao-observability-alerts-list";

/** Response schema. */
export const BaoAlertsListResponseV1: typeof AlertInstancesListResponseSchema =
  AlertInstancesListResponseSchema;

/** Error schema. */
export const BaoAlertsListErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for alert instances list. */
export const BaoAlertsListContractV1 = {
  name: ALERTS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: API_PATHS.baoObservabilityAlerts,
  request: EmptyRequestV1,
  response: BaoAlertsListResponseV1,
  errors: BaoAlertsListErrorV1,
} as const satisfies VersionedContractV1;

// GET /api/v1/bao-observability/alerts/rules

/** Contract name for alert rules list. */
export const ALERT_RULES_LIST_CONTRACT_NAME = "bao-observability-alert-rules-list";

/** Response schema. */
export const BaoAlertRulesListResponseV1: typeof AlertRulesListResponseSchema =
  AlertRulesListResponseSchema;

/** Error schema. */
export const BaoAlertRulesListErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for alert rules list. */
export const BaoAlertRulesListContractV1 = {
  name: ALERT_RULES_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "GET" as const,
  path: API_PATHS.baoObservabilityAlertRules,
  request: EmptyRequestV1,
  response: BaoAlertRulesListResponseV1,
  errors: BaoAlertRulesListErrorV1,
} as const satisfies VersionedContractV1;

// POST /api/v1/bao-observability/alerts/rules

/** Contract name for alert rule creation. */
export const ALERT_RULES_CREATE_CONTRACT_NAME = "bao-observability-alert-rules-create";

/** Request schema. */
export const BaoAlertRuleCreateRequestV1: typeof AlertRuleCreateRequestSchema =
  AlertRuleCreateRequestSchema;

/** Response schema (single rule, not a list). */
export const BaoAlertRuleCreateResponseV1: typeof AlertRuleCreateResponseSchema =
  AlertRuleCreateResponseSchema;

/** Error schema. */
export const BaoAlertRuleCreateErrorV1: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/** Full contract for alert rule creation. */
export const BaoAlertRuleCreateContractV1 = {
  name: ALERT_RULES_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  method: "POST" as const,
  path: API_PATHS.baoObservabilityAlertRules,
  request: BaoAlertRuleCreateRequestV1,
  response: BaoAlertRuleCreateResponseV1,
  errors: BaoAlertRuleCreateErrorV1,
} as const satisfies VersionedContractV1;
