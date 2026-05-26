/**
 * Shared report schemas (connector-driven).
 *
 * Defines TypeBox schemas for report generation and management contracts shared between
 * server routes, Eden clients, and UI hydration adapters.
 *
 * @shared/schemas/reports
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderKeySchema } from "./ai-provider.schemas";
import { observabilityFields } from "./route-response.schemas";

const ReportJsonValueSchema = TypeExports.Unknown({
  description: "JSON value (string, number, boolean, null, array, or object)",
});

const ReportJsonObjectSchema = TypeExports.Object(
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
export const ReportConnectorIdSchema: TUnion<
  (
    | TLiteral<"pipeline_cases">
    | TLiteral<"three_xr_assets">
    | TLiteral<"generic_json">
    | TLiteral<"capability_ownership">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("pipeline_cases"),
    TypeExports.Literal("three_xr_assets"),
    TypeExports.Literal("generic_json"),
    TypeExports.Literal("capability_ownership"),
  ],
  { description: "Report connector identifier" },
);

/** Inferred type from the ReportConnectorId schema. */
export type ReportConnectorId = Static<typeof ReportConnectorIdSchema>;

// Report Output Format

/**
 * Supported report output formats.
 */
export const ReportOutputFormatSchema: TLiteral<"pdf"> = TypeExports.Literal("pdf", {
  description: "Report output format",
});

/** Inferred type from the ReportOutputFormat schema. */
export type ReportOutputFormat = Static<typeof ReportOutputFormatSchema>;

// Connector Configs

/**
 * Pipeline/cases connector configuration.
 */
export const ReportPipelineCasesConnectorConfigSchema: TObject<
  {
    readonly caseIds: TArray<TString>;
    readonly includePipeline: TOptional<TBoolean>;
    readonly includeAnalyses: TOptional<TBoolean>;
  },
  "caseIds",
  InferOptionalKeys<{
    readonly caseIds: TArray<TString>;
    readonly includePipeline: TOptional<TBoolean>;
    readonly includeAnalyses: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    caseIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    includePipeline: TypeExports.Optional(TypeExports.Boolean()),
    includeAnalyses: TypeExports.Optional(TypeExports.Boolean()),
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
export const ReportThreeXrAssetsConnectorConfigSchema: TObject<
  {
    readonly caseId: TOptional<TString>;
    readonly assetIds: TOptional<TArray<TString>>;
    readonly includeAnnotations: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly caseId: TOptional<TString>;
    readonly assetIds: TOptional<TArray<TString>>;
    readonly includeAnnotations: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    caseId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    assetIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    includeAnnotations: TypeExports.Optional(TypeExports.Boolean()),
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
export const ReportDataPointKeySchema: TString = TypeExports.String({
  description: "Allow-listed generic data point key",
});

/** Inferred type from the ReportDataPointKey schema. */
export type ReportDataPointKey = Static<typeof ReportDataPointKeySchema>;

/**
 * Generic JSON connector configuration.
 */
export const ReportGenericJsonConnectorConfigSchema: TObject<
  {
    readonly keys: TArray<TString>;
    readonly params: TOptional<TObject<Record<string, never>, never, never>>;
  },
  "keys",
  "params"
> = TypeExports.Object(
  {
    keys: TypeExports.Array(ReportDataPointKeySchema, { minItems: 1 }),
    params: TypeExports.Optional(ReportJsonObjectSchema),
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
export const ReportCapabilityOwnershipConnectorConfigSchema: TObject<
  {
    readonly refresh: TOptional<TBoolean>;
    readonly includeOwnerMap: TOptional<TBoolean>;
    readonly includeSurfaces: TOptional<TBoolean>;
    readonly includeMcpSurfaces: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly refresh: TOptional<TBoolean>;
    readonly includeOwnerMap: TOptional<TBoolean>;
    readonly includeSurfaces: TOptional<TBoolean>;
    readonly includeMcpSurfaces: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(
      TypeExports.Boolean({ description: "Force-refresh the ownership snapshot" }),
    ),
    includeOwnerMap: TypeExports.Optional(
      TypeExports.Boolean({ description: "Include owner map sections when available" }),
    ),
    includeSurfaces: TypeExports.Optional(
      TypeExports.Boolean({ description: "Include flattened surface inventory (may be large)" }),
    ),
    includeMcpSurfaces: TypeExports.Optional(
      TypeExports.Boolean({ description: "Include MCP surface inventory (may be large)" }),
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
export const ReportConnectorConfigsSchema = TypeExports.Object(
  {
    pipeline_cases: TypeExports.Optional(ReportPipelineCasesConnectorConfigSchema),
    three_xr_assets: TypeExports.Optional(ReportThreeXrAssetsConnectorConfigSchema),
    generic_json: TypeExports.Optional(ReportGenericJsonConnectorConfigSchema),
    capability_ownership: TypeExports.Optional(ReportCapabilityOwnershipConnectorConfigSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportConnectorConfigs schema. */
export type ReportConnectorConfigs = Static<typeof ReportConnectorConfigsSchema>;

// Report Spec

/**
 * AI generation options for reports.
 */
export const ReportAiOptionsSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    provider: TypeExports.Optional(AiProviderKeySchema),
    model: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    offlineMode: TypeExports.Optional(TypeExports.Boolean()),
    context: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportAiOptions schema. */
export type ReportAiOptions = Static<typeof ReportAiOptionsSchema>;

/**
 * Canonical report generation specification.
 */
export const ReportSpecSchema = TypeExports.Object(
  {
    title: TypeExports.Optional(TypeExports.String()),
    type: TypeExports.String({ minLength: 1 }),
    output: ReportOutputFormatSchema,
    connectors: TypeExports.Array(ReportConnectorIdSchema, { minItems: 1 }),
    connectorConfigs: TypeExports.Optional(ReportConnectorConfigsSchema),
    parameters: TypeExports.Optional(ReportJsonObjectSchema),
    ai: TypeExports.Optional(ReportAiOptionsSchema),
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
export const ReportGeneratePayloadSchema = TypeExports.Object(
  {
    caseIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    title: TypeExports.Optional(TypeExports.String()),
    type: TypeExports.Optional(TypeExports.String()),
    includeAiSummary: TypeExports.Optional(TypeExports.Boolean()),
    provider: TypeExports.Optional(AiProviderKeySchema),
    model: TypeExports.Optional(TypeExports.String()),
    offlineMode: TypeExports.Optional(TypeExports.Boolean()),
    parameters: TypeExports.Optional(ReportJsonObjectSchema),
    context: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportGeneratePayload schema. */
export type ReportGeneratePayload = Static<typeof ReportGeneratePayloadSchema>;

// Jobs

/**
 * Report job status for async generation.
 */
export const ReportJobStatusSchema: TUnion<
  (TLiteral<"queued"> | TLiteral<"running"> | TLiteral<"succeeded"> | TLiteral<"failed">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("queued"),
    TypeExports.Literal("running"),
    TypeExports.Literal("succeeded"),
    TypeExports.Literal("failed"),
  ],
  {},
);

/** Inferred type from the ReportJobStatus schema. */
export type ReportJobStatus = Static<typeof ReportJobStatusSchema>;

/**
 * Report job DTO (API-facing).
 */
export const ReportJobDtoSchema: TObject<
  {
    readonly jobId: TString;
    readonly status: TUnion<
      (TLiteral<"queued"> | TLiteral<"running"> | TLiteral<"succeeded"> | TLiteral<"failed">)[]
    >;
    readonly progress: TInteger;
    readonly reportId: TUnion<(TString | TNull)[]>;
    readonly error: TUnion<(TString | TNull)[]>;
    readonly createdAt: TString;
    readonly startedAt: TUnion<(TString | TNull)[]>;
    readonly finishedAt: TUnion<(TString | TNull)[]>;
  },
  "reportId" | "error" | "startedAt" | "finishedAt" | "jobId" | "status" | "progress" | "createdAt",
  never
> = TypeExports.Object(
  {
    jobId: TypeExports.String({ minLength: 1 }),
    status: ReportJobStatusSchema,
    progress: TypeExports.Integer({ minimum: 0, maximum: 100 }),
    reportId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    error: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdAt: TypeExports.String(),
    startedAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    finishedAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportJobDto schema. */
export type ReportJobDto = Static<typeof ReportJobDtoSchema>;

// Reports

/**
 * Report list item shape returned by `GET /api/v1/reports`.
 */
export const ReportListItemSchema: TObject<
  {
    readonly reportId: TString;
    readonly title: TString;
    readonly type: TString;
    readonly status: TString;
    readonly pages: TUnknown;
    readonly parameters: TUnknown;
    readonly caseIds: TArray<TString>;
    readonly fileAvailable: TBoolean;
    readonly downloadPath: TUnion<(TString | TNull)[]>;
    readonly createdAt: TString;
    readonly generatedAt: TUnion<(TString | TNull)[]>;
    readonly lastSharedAt: TUnion<(TString | TNull)[]>;
    readonly lastSharedMethod: TUnion<(TString | TNull)[]>;
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
> = TypeExports.Object(
  {
    reportId: TypeExports.String({ minLength: 1 }),
    title: TypeExports.String(),
    type: TypeExports.String(),
    status: TypeExports.String(),
    pages: ReportJsonValueSchema,
    parameters: ReportJsonValueSchema,
    caseIds: TypeExports.Array(TypeExports.String()),
    fileAvailable: TypeExports.Boolean(),
    downloadPath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdAt: TypeExports.String(),
    generatedAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    lastSharedAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    lastSharedMethod: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportListItem schema. */
export type ReportListItem = Static<typeof ReportListItemSchema>;

// API Responses

/**
 * Report list response payload returned by `GET /api/v1/reports`.
 */
export const ReportsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(ReportListItemSchema),
    total: TypeExports.Number(),
    page: TypeExports.Number(),
    pageSize: TypeExports.Number(),
    hasMore: TypeExports.Boolean(),
    ...observabilityFields,
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportsListResponse schema. */
export type ReportsListResponse = Static<typeof ReportsListResponseSchema>;

/**
 * Report detail response payload returned by `GET /api/v1/reports/:reportId`.
 */
export const ReportResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
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
export const CreateReportJobResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
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
export const ReportJobResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
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
export const ReportJobsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(ReportJobDtoSchema),
    total: TypeExports.Number(),
    page: TypeExports.Number(),
    pageSize: TypeExports.Number(),
    hasMore: TypeExports.Boolean(),
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
export const ReportsListQuerySchema: TObject<
  {
    readonly status: TOptional<TString>;
    readonly type: TOptional<TString>;
    readonly caseId: TOptional<TString>;
    readonly search: TOptional<TString>;
    readonly page: TOptional<TInteger>;
    readonly pageSize: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly status: TOptional<TString>;
    readonly type: TOptional<TString>;
    readonly caseId: TOptional<TString>;
    readonly search: TOptional<TString>;
    readonly page: TOptional<TInteger>;
    readonly pageSize: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    status: TypeExports.Optional(TypeExports.String()),
    type: TypeExports.Optional(TypeExports.String()),
    caseId: TypeExports.Optional(TypeExports.String()),
    search: TypeExports.Optional(TypeExports.String()),
    page: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 10_000 })),
    pageSize: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 200 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportsListQuery schema. */
export type ReportsListQuery = Static<typeof ReportsListQuerySchema>;

/**
 * Report jobs list query schema.
 */
export const ReportJobsListQuerySchema: TObject<
  {
    readonly status: TOptional<TString>;
    readonly reportId: TOptional<TString>;
    readonly page: TOptional<TInteger>;
    readonly pageSize: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly status: TOptional<TString>;
    readonly reportId: TOptional<TString>;
    readonly page: TOptional<TInteger>;
    readonly pageSize: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    status: TypeExports.Optional(TypeExports.String()),
    reportId: TypeExports.Optional(TypeExports.String()),
    page: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 10_000 })),
    pageSize: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 200 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the ReportJobsListQuery schema. */
export type ReportJobsListQuery = Static<typeof ReportJobsListQuerySchema>;

// Route Param Schemas (REST)

/**
 * Report id route param schema.
 */
export const ReportIdParamsSchema: TObject<{ readonly reportId: TString }, "reportId", never> =
  TypeExports.Object(
    { reportId: TypeExports.String({ minLength: 1 }) },
    { additionalProperties: false },
  );

/** Inferred type from the ReportIdParams schema. */
export type ReportIdParams = Static<typeof ReportIdParamsSchema>;

/**
 * Report job id route param schema.
 */
export const ReportJobIdParamsSchema: TObject<{ readonly jobId: TString }, "jobId", never> =
  TypeExports.Object(
    { jobId: TypeExports.String({ minLength: 1 }) },
    { additionalProperties: false },
  );

/** Inferred type from the ReportJobIdParams schema. */
export type ReportJobIdParams = Static<typeof ReportJobIdParamsSchema>;
