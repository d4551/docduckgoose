/**
 * Shared report schemas (connector-driven).
 *
 * Defines TypeBox schemas for report generation and management contracts shared between
 * server routes, Eden clients, and UI hydration adapters.
 *
 * @shared/schemas/reports
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiProviderKeySchema } from "./ai-provider.schemas";
import { observabilityFields } from "./route-response.schemas";

const ReportJsonValueSchema = Type.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

const ReportJsonObjectSchema = Type.Object(
  {},
  {
    additionalProperties: ReportJsonValueSchema,
    description: "JSON object with string keys",
  },
);

// Connector Identifiers

/**
 * Supported report connector identifiers.
 *
 * Connectors are pluggable data sources that contribute structured sections into a report.
 */
export const ReportConnectorIdSchema: Type.TUnion<
  (
    | Type.TLiteral<"pipeline_cases">
    | Type.TLiteral<"three_xr_assets">
    | Type.TLiteral<"generic_json">
    | Type.TLiteral<"capability_ownership">
  )[]
> = Type.Union(
  [
    Type.Literal("pipeline_cases"),
    Type.Literal("three_xr_assets"),
    Type.Literal("generic_json"),
    Type.Literal("capability_ownership"),
  ],
  { description: "Report connector identifier" },
);

/** Inferred type from the ReportConnectorId schema. */
export type ReportConnectorId = Static<typeof ReportConnectorIdSchema>;

// Report Output Format

/**
 * Supported report output formats.
 */
export const ReportOutputFormatSchema: Type.TLiteral<"pdf"> = Type.Literal("pdf", {
  description: "Report output format",
});

/** Inferred type from the ReportOutputFormat schema. */
export type ReportOutputFormat = Static<typeof ReportOutputFormatSchema>;

// Connector Configs

/**
 * Pipeline/cases connector configuration.
 */
export const ReportPipelineCasesConnectorConfigSchema: Type.TObject<
  {
    readonly caseIds: Type.TArray<Type.TString>;
    readonly includePipeline: Type.TOptional<Type.TBoolean>;
    readonly includeAnalyses: Type.TOptional<Type.TBoolean>;
  },
  "caseIds",
  Type.InferOptionalKeys<{
    readonly caseIds: Type.TArray<Type.TString>;
    readonly includePipeline: Type.TOptional<Type.TBoolean>;
    readonly includeAnalyses: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    caseIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    includePipeline: Type.Optional(Type.Boolean()),
    includeAnalyses: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportPipelineCasesConnectorConfig schema. */
export type ReportPipelineCasesConnectorConfig = Static<
  typeof ReportPipelineCasesConnectorConfigSchema
>;

/**
 * 3D/Three/XR connector configuration.
 */
export const ReportThreeXrAssetsConnectorConfigSchema: Type.TObject<
  {
    readonly caseId: Type.TOptional<Type.TString>;
    readonly assetIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly includeAnnotations: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly caseId: Type.TOptional<Type.TString>;
    readonly assetIds: Type.TOptional<Type.TArray<Type.TString>>;
    readonly includeAnnotations: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    caseId: Type.Optional(Type.String({ minLength: 1 })),
    assetIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    includeAnnotations: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportThreeXrAssetsConnectorConfig schema. */
export type ReportThreeXrAssetsConnectorConfig = Static<
  typeof ReportThreeXrAssetsConnectorConfigSchema
>;

/**
 * Generic JSON data point allow-list key.
 */
export const ReportDataPointKeySchema: Type.TString = Type.String({
  description: "Allow-listed generic data point key",
});

/** Inferred type from the ReportDataPointKey schema. */
export type ReportDataPointKey = Static<typeof ReportDataPointKeySchema>;

/**
 * Generic JSON connector configuration.
 */
export const ReportGenericJsonConnectorConfigSchema: Type.TObject<
  {
    readonly keys: Type.TArray<Type.TString>;
    readonly params: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  },
  "keys",
  "params"
> = Type.Object(
  {
    keys: Type.Array(ReportDataPointKeySchema, { minItems: 1 }),
    params: Type.Optional(ReportJsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportGenericJsonConnectorConfig schema. */
export type ReportGenericJsonConnectorConfig = Static<
  typeof ReportGenericJsonConnectorConfigSchema
>;

/**
 * Capability ownership connector configuration.
 *
 * @remarks
 * This connector surfaces ownership mapping across AI libraries/plugins/bunbuddies,
 * XR/USD assets, MCP surfaces, and device/driver stacks.
 */
export const ReportCapabilityOwnershipConnectorConfigSchema: Type.TObject<
  {
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly includeOwnerMap: Type.TOptional<Type.TBoolean>;
    readonly includeSurfaces: Type.TOptional<Type.TBoolean>;
    readonly includeMcpSurfaces: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly includeOwnerMap: Type.TOptional<Type.TBoolean>;
    readonly includeSurfaces: Type.TOptional<Type.TBoolean>;
    readonly includeMcpSurfaces: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean({ description: "Force-refresh the ownership snapshot" })),
    includeOwnerMap: Type.Optional(
      Type.Boolean({ description: "Include owner map sections when available" }),
    ),
    includeSurfaces: Type.Optional(
      Type.Boolean({ description: "Include flattened surface inventory (may be large)" }),
    ),
    includeMcpSurfaces: Type.Optional(
      Type.Boolean({ description: "Include MCP surface inventory (may be large)" }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportCapabilityOwnershipConnectorConfig schema. */
export type ReportCapabilityOwnershipConnectorConfig = Static<
  typeof ReportCapabilityOwnershipConnectorConfigSchema
>;

/**
 * Per-connector configuration mapping.
 */
export const ReportConnectorConfigsSchema = Type.Object(
  {
    pipeline_cases: Type.Optional(ReportPipelineCasesConnectorConfigSchema),
    three_xr_assets: Type.Optional(ReportThreeXrAssetsConnectorConfigSchema),
    generic_json: Type.Optional(ReportGenericJsonConnectorConfigSchema),
    capability_ownership: Type.Optional(ReportCapabilityOwnershipConnectorConfigSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportConnectorConfigs schema. */
export type ReportConnectorConfigs = Static<typeof ReportConnectorConfigsSchema>;

// Report Spec

/**
 * AI generation options for reports.
 */
export const ReportAiOptionsSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    provider: Type.Optional(AiProviderKeySchema),
    model: Type.Optional(Type.String({ minLength: 1 })),
    offlineMode: Type.Optional(Type.Boolean()),
    context: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportAiOptions schema. */
export type ReportAiOptions = Static<typeof ReportAiOptionsSchema>;

/**
 * Canonical report generation specification.
 */
export const ReportSpecSchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    type: Type.String({ minLength: 1 }),
    output: ReportOutputFormatSchema,
    connectors: Type.Array(ReportConnectorIdSchema, { minItems: 1 }),
    connectorConfigs: Type.Optional(ReportConnectorConfigsSchema),
    parameters: Type.Optional(ReportJsonObjectSchema),
    ai: Type.Optional(ReportAiOptionsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportSpec schema. */
export type ReportSpec = Static<typeof ReportSpecSchema>;

// Simplified Generate Payload

/**
 * Simplified report generation payload used by UI flows.
 *
 * This payload is transformed into the canonical `ReportSpec` before submission.
 */
export const ReportGeneratePayloadSchema = Type.Object(
  {
    caseIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    title: Type.Optional(Type.String()),
    type: Type.Optional(Type.String()),
    includeAiSummary: Type.Optional(Type.Boolean()),
    provider: Type.Optional(AiProviderKeySchema),
    model: Type.Optional(Type.String()),
    offlineMode: Type.Optional(Type.Boolean()),
    parameters: Type.Optional(ReportJsonObjectSchema),
    context: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportGeneratePayload schema. */
export type ReportGeneratePayload = Static<typeof ReportGeneratePayloadSchema>;

// Jobs

/**
 * Report job status for async generation.
 */
export const ReportJobStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"queued">
    | Type.TLiteral<"running">
    | Type.TLiteral<"succeeded">
    | Type.TLiteral<"failed">
  )[]
> = Type.Union(
  [
    Type.Literal("queued"),
    Type.Literal("running"),
    Type.Literal("succeeded"),
    Type.Literal("failed"),
  ],
  {},
);

/** Inferred type from the ReportJobStatus schema. */
export type ReportJobStatus = Static<typeof ReportJobStatusSchema>;

/**
 * Report job DTO (API-facing).
 */
export const ReportJobDtoSchema: Type.TObject<
  {
    readonly jobId: Type.TString;
    readonly status: Type.TUnion<
      (
        | Type.TLiteral<"queued">
        | Type.TLiteral<"running">
        | Type.TLiteral<"succeeded">
        | Type.TLiteral<"failed">
      )[]
    >;
    readonly progress: Type.TInteger;
    readonly reportId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly error: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly createdAt: Type.TString;
    readonly startedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly finishedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "reportId" | "error" | "startedAt" | "finishedAt" | "jobId" | "status" | "progress" | "createdAt",
  never
> = Type.Object(
  {
    jobId: Type.String({ minLength: 1 }),
    status: ReportJobStatusSchema,
    progress: Type.Integer({ minimum: 0, maximum: 100 }),
    reportId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    error: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.String(),
    startedAt: Type.Union([Type.String(), Type.Null()]),
    finishedAt: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportJobDto schema. */
export type ReportJobDto = Static<typeof ReportJobDtoSchema>;

// Reports

/**
 * Report list item shape returned by `GET /api/v1/reports`.
 */
export const ReportListItemSchema: Type.TObject<
  {
    readonly reportId: Type.TString;
    readonly title: Type.TString;
    readonly type: Type.TString;
    readonly status: Type.TString;
    readonly pages: Type.TUnknown;
    readonly parameters: Type.TUnknown;
    readonly caseIds: Type.TArray<Type.TString>;
    readonly fileAvailable: Type.TBoolean;
    readonly downloadPath: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly createdAt: Type.TString;
    readonly generatedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly lastSharedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly lastSharedMethod: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  | "caseIds"
  | "downloadPath"
  | "generatedAt"
  | "lastSharedAt"
  | "lastSharedMethod"
  | "reportId"
  | "title"
  | "type"
  | "status"
  | "pages"
  | "parameters"
  | "fileAvailable"
  | "createdAt",
  never
> = Type.Object(
  {
    reportId: Type.String({ minLength: 1 }),
    title: Type.String(),
    type: Type.String(),
    status: Type.String(),
    pages: ReportJsonValueSchema,
    parameters: ReportJsonValueSchema,
    caseIds: Type.Array(Type.String()),
    fileAvailable: Type.Boolean(),
    downloadPath: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.String(),
    generatedAt: Type.Union([Type.String(), Type.Null()]),
    lastSharedAt: Type.Union([Type.String(), Type.Null()]),
    lastSharedMethod: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportListItem schema. */
export type ReportListItem = Static<typeof ReportListItemSchema>;

// API Responses

/**
 * Report list response payload returned by `GET /api/v1/reports`.
 */
export const ReportsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(ReportListItemSchema),
    total: Type.Number(),
    page: Type.Number(),
    pageSize: Type.Number(),
    hasMore: Type.Boolean(),
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportsListResponse schema. */
export type ReportsListResponse = Static<typeof ReportsListResponseSchema>;

/**
 * Report detail response payload returned by `GET /api/v1/reports/:reportId`.
 */
export const ReportResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ReportListItemSchema,
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportResponse schema. */
export type ReportResponse = Static<typeof ReportResponseSchema>;

/**
 * Report job creation response payload.
 */
export const CreateReportJobResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ReportJobDtoSchema,
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** Inferred type from the CreateReportJobResponse schema. */
export type CreateReportJobResponse = Static<typeof CreateReportJobResponseSchema>;

/**
 * Single report job response payload.
 */
export const ReportJobResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ReportJobDtoSchema,
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportJobResponse schema. */
export type ReportJobResponse = Static<typeof ReportJobResponseSchema>;

/**
 * Paginated report jobs list response payload.
 */
export const ReportJobsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(ReportJobDtoSchema),
    total: Type.Number(),
    page: Type.Number(),
    pageSize: Type.Number(),
    hasMore: Type.Boolean(),
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportJobsListResponse schema. */
export type ReportJobsListResponse = Static<typeof ReportJobsListResponseSchema>;

// Request Query Schemas (REST)

/**
 * Reports list query schema.
 */
export const ReportsListQuerySchema: Type.TObject<
  {
    readonly status: Type.TOptional<Type.TString>;
    readonly type: Type.TOptional<Type.TString>;
    readonly caseId: Type.TOptional<Type.TString>;
    readonly search: Type.TOptional<Type.TString>;
    readonly page: Type.TOptional<Type.TInteger>;
    readonly pageSize: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly status: Type.TOptional<Type.TString>;
    readonly type: Type.TOptional<Type.TString>;
    readonly caseId: Type.TOptional<Type.TString>;
    readonly search: Type.TOptional<Type.TString>;
    readonly page: Type.TOptional<Type.TInteger>;
    readonly pageSize: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    status: Type.Optional(Type.String()),
    type: Type.Optional(Type.String()),
    caseId: Type.Optional(Type.String()),
    search: Type.Optional(Type.String()),
    page: Type.Optional(Type.Integer({ minimum: 1, maximum: 10_000 })),
    pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportsListQuery schema. */
export type ReportsListQuery = Static<typeof ReportsListQuerySchema>;

/**
 * Report jobs list query schema.
 */
export const ReportJobsListQuerySchema: Type.TObject<
  {
    readonly status: Type.TOptional<Type.TString>;
    readonly reportId: Type.TOptional<Type.TString>;
    readonly page: Type.TOptional<Type.TInteger>;
    readonly pageSize: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly status: Type.TOptional<Type.TString>;
    readonly reportId: Type.TOptional<Type.TString>;
    readonly page: Type.TOptional<Type.TInteger>;
    readonly pageSize: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    status: Type.Optional(Type.String()),
    reportId: Type.Optional(Type.String()),
    page: Type.Optional(Type.Integer({ minimum: 1, maximum: 10_000 })),
    pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportJobsListQuery schema. */
export type ReportJobsListQuery = Static<typeof ReportJobsListQuerySchema>;

// Route Param Schemas (REST)

/**
 * Report id route param schema.
 */
export const ReportIdParamsSchema: Type.TObject<
  { readonly reportId: Type.TString },
  "reportId",
  never
> = Type.Object({ reportId: Type.String({ minLength: 1 }) }, { additionalProperties: false });

/** Inferred type from the ReportIdParams schema. */
export type ReportIdParams = Static<typeof ReportIdParamsSchema>;

/**
 * Report job id route param schema.
 */
export const ReportJobIdParamsSchema: Type.TObject<
  { readonly jobId: Type.TString },
  "jobId",
  never
> = Type.Object({ jobId: Type.String({ minLength: 1 }) }, { additionalProperties: false });

/** Inferred type from the ReportJobIdParams schema. */
export type ReportJobIdParams = Static<typeof ReportJobIdParamsSchema>;
