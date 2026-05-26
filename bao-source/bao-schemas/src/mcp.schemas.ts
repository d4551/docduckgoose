/**
 * Shared MCP schemas.
 *
 * Provides TypeBox schemas for MCP REST payloads and integration summaries so
 * server and client contracts stay aligned.
 *
 * @shared/schemas/mcp.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * MCP icon descriptor schema.
 */
const McpIconSchema = TypeExports.Object(
  {
    url: TypeExports.String({ minLength: 1 }),
    mimeType: TypeExports.Optional(TypeExports.String()),
    size: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * JSON schema payload for MCP tool input/output schemas.
 */
export const McpSchemaDefinitionSchema: TObject<
  Record<string, never>,
  never,
  never
> = TypeExports.Object(
  {},
  {
    additionalProperties: TypeExports.Unknown(),
    description: "JSON Schema payload for MCP tool inputs/outputs.",
  },
);

/**
 * MCP tool definition schema used by REST endpoints.
 */
export const McpToolDefinitionSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    title: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String()),
    icons: TypeExports.Optional(TypeExports.Array(McpIconSchema)),
    inputSchema: TypeExports.Optional(McpSchemaDefinitionSchema),
    outputSchema: TypeExports.Optional(McpSchemaDefinitionSchema),
    readinessIncludedInResponse: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource definition schema.
 */
export const McpResourceDefinitionSchema = TypeExports.Object(
  {
    uri: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    title: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String()),
    mimeType: TypeExports.Optional(TypeExports.String()),
    icons: TypeExports.Optional(TypeExports.Array(McpIconSchema)),
  },
  { additionalProperties: false },
);

/**
 * MCP resource template definition schema.
 */
export const McpResourceTemplateDefinitionSchema = TypeExports.Object(
  {
    uriTemplate: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    title: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String()),
    mimeType: TypeExports.Optional(TypeExports.String()),
    icons: TypeExports.Optional(TypeExports.Array(McpIconSchema)),
  },
  { additionalProperties: false },
);

/**
 * MCP pagination query schema for list endpoints.
 */
export const McpPaginationQuerySchema: TObject<
  {
    readonly cursor: TOptional<TString>;
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly provider: TOptional<TString>;
    readonly source: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly cursor: TOptional<TString>;
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly provider: TOptional<TString>;
    readonly source: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    cursor: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    // Query params arrive as strings in most HTTP servers; accept both.
    limit: TypeExports.Optional(
      TypeExports.Union([TypeExports.Integer(), TypeExports.String({ pattern: "^[0-9]+$" })]),
    ),
    provider: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    source: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * MCP provider filter query schema for non-paginated endpoints.
 */
export const McpProviderQuerySchema: TObject<
  {
    readonly provider: TOptional<TString>;
    readonly source: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly provider: TOptional<TString>;
    readonly source: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    provider: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    source: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * MCP tool call request schema.
 */
export const McpToolCallRequestSchema: TObject<
  {
    readonly arguments: TOptional<TRecord<TString, TUnknown>>;
    readonly idempotencyKey: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly arguments: TOptional<TRecord<TString, TUnknown>>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    arguments: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    ),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * MCP resource content schema (REST responses).
 */
export const McpResourceContentSchema: TObject<
  {
    readonly uri: TString;
    readonly mimeType: TOptional<TString>;
    readonly text: TOptional<TString>;
    readonly blob: TOptional<TString>;
    readonly data: TOptional<TUnknown>;
  },
  "uri",
  InferOptionalKeys<{
    readonly uri: TString;
    readonly mimeType: TOptional<TString>;
    readonly text: TOptional<TString>;
    readonly blob: TOptional<TString>;
    readonly data: TOptional<TUnknown>;
  }>
> = TypeExports.Object(
  {
    uri: TypeExports.String({ minLength: 1 }),
    mimeType: TypeExports.Optional(TypeExports.String()),
    text: TypeExports.Optional(TypeExports.String()),
    blob: TypeExports.Optional(TypeExports.String()),
    data: TypeExports.Optional(TypeExports.Unknown()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource read result schema (registry read).
 */
export const McpResourceContentResultSchema: TObject<
  {
    readonly uri: TString;
    readonly mimeType: TOptional<TString>;
    readonly text: TOptional<TString>;
    readonly blob: TOptional<TString>;
  },
  "uri",
  InferOptionalKeys<{
    readonly uri: TString;
    readonly mimeType: TOptional<TString>;
    readonly text: TOptional<TString>;
    readonly blob: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    uri: TypeExports.String({ minLength: 1 }),
    mimeType: TypeExports.Optional(TypeExports.String()),
    text: TypeExports.Optional(TypeExports.String()),
    blob: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP endpoint group schema for a capability domain.
 */
export const McpIntegrationEndpointGroupSchema: TObject<
  {
    readonly tools: TString;
    readonly toolCall: TString;
    readonly resources: TString;
    readonly resourceRead: TString;
    readonly templates: TString;
    readonly context: TString;
  },
  "tools" | "toolCall" | "resources" | "resourceRead" | "templates" | "context",
  never
> = TypeExports.Object(
  {
    tools: TypeExports.String(),
    toolCall: TypeExports.String(),
    resources: TypeExports.String(),
    resourceRead: TypeExports.String(),
    templates: TypeExports.String(),
    context: TypeExports.String(),
  },
  { additionalProperties: false },
);

/**
 * MCP endpoint group schema for context bundles (list-focused naming).
 */
export const McpContextEndpointGroupSchema: TObject<
  {
    readonly toolsList: TString;
    readonly toolCall: TString;
    readonly resourcesList: TString;
    readonly resourceRead: TString;
    readonly templatesList: TString;
    readonly context: TString;
  },
  "toolsList" | "toolCall" | "resourcesList" | "resourceRead" | "templatesList" | "context",
  never
> = TypeExports.Object(
  {
    toolsList: TypeExports.String(),
    toolCall: TypeExports.String(),
    resourcesList: TypeExports.String(),
    resourceRead: TypeExports.String(),
    templatesList: TypeExports.String(),
    context: TypeExports.String(),
  },
  { additionalProperties: false },
);

/**
 * MCP provider source schema.
 */
export const McpProviderSourceSchema: TUnion<
  (TLiteral<"builtin"> | TLiteral<"bao"> | TLiteral<"runtime">)[]
> = TypeExports.Union(
  [TypeExports.Literal("builtin"), TypeExports.Literal("bao"), TypeExports.Literal("runtime")],
  {},
);

/**
 * Scalar value allowed inside MCP provider metadata attributes.
 */
export const McpProviderMetadataAttributeValueSchema: TUnion<(TBoolean | TNumber | TString)[]> =
  TypeExports.Union(
    [TypeExports.Boolean(), TypeExports.Number(), TypeExports.String({ minLength: 1 })],
    {},
  );

/**
 * Shared MCP provider metadata schema.
 *
 * Carries registry-owned descriptive metadata contributed by built-in catalogs,
 * `.bao` manifests, and BunBuddy contracts.
 */
export const McpProviderMetadataSchema: TObject<
  {
    readonly description: TOptional<TString>;
    readonly docsPath: TOptional<TString>;
    readonly tags: TOptional<TArray<TString>>;
    readonly attributes: TOptional<TRecord<TString, TUnion<(TString | TBoolean | TNumber)[]>>>;
  },
  never,
  InferOptionalKeys<{
    readonly description: TOptional<TString>;
    readonly docsPath: TOptional<TString>;
    readonly tags: TOptional<TArray<TString>>;
    readonly attributes: TOptional<TRecord<TString, TUnion<(TString | TBoolean | TNumber)[]>>>;
  }>
> = TypeExports.Object(
  {
    description: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    docsPath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    tags: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        minItems: 1,
      }),
    ),
    attributes: TypeExports.Optional(
      TypeExports.Record(
        TypeExports.String({ minLength: 1 }),
        McpProviderMetadataAttributeValueSchema,
      ),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for MCP provider metadata.
 */
export type McpProviderMetadata = Static<typeof McpProviderMetadataSchema>;

/**
 * Shared MCP provider summary schema.
 */
export const McpProviderSummarySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    displayName: TypeExports.String({ minLength: 1 }),
    ownerId: TypeExports.String({ minLength: 1 }),
    source: McpProviderSourceSchema,
    toolCount: TypeExports.Integer({ minimum: 0 }),
    resourceCount: TypeExports.Integer({ minimum: 0 }),
    templateCount: TypeExports.Integer({ minimum: 0 }),
    registeredAt: TypeExports.String({ format: "date-time" }),
    metadata: TypeExports.Optional(McpProviderMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * MCP provider inventory entry used by integration summaries.
 */
export const McpIntegrationProviderSchema = TypeExports.Object(
  {
    ...McpProviderSummarySchema.properties,
    endpoints: McpIntegrationEndpointGroupSchema,
  },
  { additionalProperties: false },
);

/**
 * Generic provider-backed MCP endpoint inventory.
 */
export const McpIntegrationEndpointsSchema: TObject<
  {
    readonly base: TString;
    readonly rpc: TString;
    readonly contexts: TString;
    readonly providerContext: TString;
    readonly resources: TString;
    readonly resourceRead: TString;
    readonly templates: TString;
    readonly tools: TString;
    readonly toolCall: TString;
  },
  | "tools"
  | "toolCall"
  | "resources"
  | "resourceRead"
  | "templates"
  | "base"
  | "rpc"
  | "contexts"
  | "providerContext",
  never
> = TypeExports.Object(
  {
    base: TypeExports.String(),
    rpc: TypeExports.String(),
    contexts: TypeExports.String(),
    providerContext: TypeExports.String(),
    resources: TypeExports.String(),
    resourceRead: TypeExports.String(),
    templates: TypeExports.String(),
    tools: TypeExports.String(),
    toolCall: TypeExports.String(),
  },
  { additionalProperties: false },
);

/**
 * MCP context bundle schema for REST responses.
 */
export const McpContextBundleSchema = TypeExports.Object(
  {
    provider: McpProviderSummarySchema,
    tools: TypeExports.Array(McpToolDefinitionSchema),
    resources: TypeExports.Array(McpResourceDefinitionSchema),
    templates: TypeExports.Array(McpResourceTemplateDefinitionSchema),
    endpoints: McpContextEndpointGroupSchema,
    summary: TypeExports.Optional(TypeExports.Union([TypeExports.Unknown(), TypeExports.Null()])),
    docs: TypeExports.Optional(TypeExports.Unknown()),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * MCP integration summary schema.
 */
export const McpStreamHealthSchema: TObject<
  {
    readonly backend: TUnion<(TLiteral<"redis"> | TLiteral<"single-node-memory">)[]>;
    readonly degraded: TBoolean;
    readonly redisSubscribed: TBoolean;
    readonly listeners: TInteger;
    readonly bufferedEvents: TInteger;
    readonly lastEventAt: TUnion<(TString | TNull)[]>;
  },
  "backend" | "lastEventAt" | "degraded" | "redisSubscribed" | "listeners" | "bufferedEvents",
  never
> = TypeExports.Object(
  {
    backend: TypeExports.Union([
      TypeExports.Literal("redis"),
      TypeExports.Literal("single-node-memory"),
    ]),
    degraded: TypeExports.Boolean(),
    redisSubscribed: TypeExports.Boolean(),
    listeners: TypeExports.Integer({ minimum: 0 }),
    bufferedEvents: TypeExports.Integer({ minimum: 0 }),
    lastEventAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
  },
  { additionalProperties: false },
);

/**
 * MCP subscription registry health schema.
 */
export const McpSubscriptionsHealthSchema: TObject<
  {
    readonly backend: TUnion<(TLiteral<"redis"> | TLiteral<"memory">)[]>;
    readonly ttlSeconds: TInteger;
    readonly subscribers: TInteger;
    readonly subscriptions: TInteger;
    readonly lastActivityAt: TUnion<(TString | TNull)[]>;
  },
  "backend" | "lastActivityAt" | "ttlSeconds" | "subscribers" | "subscriptions",
  never
> = TypeExports.Object(
  {
    backend: TypeExports.Union([TypeExports.Literal("redis"), TypeExports.Literal("memory")]),
    ttlSeconds: TypeExports.Integer({ minimum: 0 }),
    subscribers: TypeExports.Integer({ minimum: 0 }),
    subscriptions: TypeExports.Integer({ minimum: 0 }),
    lastActivityAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
  },
  { additionalProperties: false },
);

/** TypeBox schema for MCP integration summary payloads. */
export const McpIntegrationSummarySchema = TypeExports.Object(
  {
    timestamp: TypeExports.String({ format: "date-time" }),
    endpoints: McpIntegrationEndpointsSchema,
    providers: TypeExports.Array(McpIntegrationProviderSchema),
    totals: TypeExports.Object(
      {
        tools: TypeExports.Integer({ minimum: 0 }),
        resources: TypeExports.Integer({ minimum: 0 }),
        templates: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    sources: TypeExports.Record(TypeExports.String(), TypeExports.Integer({ minimum: 0 })),
    toolSources: TypeExports.Record(TypeExports.String(), TypeExports.Integer({ minimum: 0 })),
    stream: McpStreamHealthSchema,
    subscriptions: McpSubscriptionsHealthSchema,
  },
  { additionalProperties: false },
);

/**
 * MCP resources list response schema.
 */
export const McpResourcesListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    resources: TypeExports.Array(McpResourceDefinitionSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    nextCursor: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource templates list response schema.
 */
export const McpResourceTemplatesResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    templates: TypeExports.Array(McpResourceTemplateDefinitionSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP tools list response schema.
 */
export const McpToolsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    tools: TypeExports.Array(McpToolDefinitionSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    nextCursor: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource read response schema (hardware/RPA).
 */
export const McpResourceReadResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    uri: TypeExports.String({ minLength: 1 }),
    contents: TypeExports.Array(McpResourceContentSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP registry resource read response schema.
 */
export const McpRegistryResourceReadResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    resource: McpResourceContentResultSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP context response schema.
 */
export const McpContextResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    context: McpContextBundleSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP provider context list entry schema.
 */
export const McpProviderContextEntrySchema = TypeExports.Object(
  {
    context: McpContextBundleSchema,
  },
  { additionalProperties: false },
);

/**
 * MCP provider context list response schema.
 */
export const McpContextsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    contexts: TypeExports.Array(McpProviderContextEntrySchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP tool call success response schema.
 */
export const McpToolCallSuccessResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
    readonly requestId: TOptional<TString>;
  },
  "timestamp" | "ok",
  InferOptionalKeys<{
    readonly ok: TLiteral<true>;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
    readonly requestId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
  },
  {
    additionalProperties: TypeExports.Unknown(),
  },
);

/** Inferred type from the McpSchemaDefinition schema. */
export type McpSchemaDefinition = Static<typeof McpSchemaDefinitionSchema>;
/** Inferred type from the McpToolDefinition schema. */
export type McpToolDefinition = Static<typeof McpToolDefinitionSchema>;
/** Inferred type from the McpResourceDefinition schema. */
export type McpResourceDefinition = Static<typeof McpResourceDefinitionSchema>;
/** Inferred type from the McpResourceTemplateDefinition schema. */
export type McpResourceTemplateDefinition = Static<typeof McpResourceTemplateDefinitionSchema>;
/** Inferred type from the McpPaginationQuery schema. */
export type McpPaginationQuery = Static<typeof McpPaginationQuerySchema>;
/** Inferred type from the McpProviderQuery schema. */
export type McpProviderQuery = Static<typeof McpProviderQuerySchema>;
/** Inferred type from the McpToolCallRequest schema. */
export type McpToolCallRequest = Static<typeof McpToolCallRequestSchema>;
/** Inferred type from the McpResourceContent schema. */
export type McpResourceContent = Static<typeof McpResourceContentSchema>;
/** Inferred type from the McpResourceContentResult schema. */
export type McpResourceContentResult = Static<typeof McpResourceContentResultSchema>;
/** Inferred type from the McpProviderSource schema. */
export type McpProviderSource = Static<typeof McpProviderSourceSchema>;
/** Inferred type from the McpProviderSummary schema. */
export type McpProviderSummary = Static<typeof McpProviderSummarySchema>;
/** Inferred type from the McpIntegrationEndpointGroup schema. */
export type McpIntegrationEndpointGroup = Static<typeof McpIntegrationEndpointGroupSchema>;
/** Inferred type from the McpIntegrationProvider schema. */
export type McpIntegrationProvider = Static<typeof McpIntegrationProviderSchema>;
/** Inferred type from the McpIntegrationEndpoints schema. */
export type McpIntegrationEndpoints = Static<typeof McpIntegrationEndpointsSchema>;
/** Inferred type from the McpContextEndpointGroup schema. */
export type McpContextEndpointGroup = Static<typeof McpContextEndpointGroupSchema>;
/** Inferred type from the McpContextBundle schema. */
export type McpContextBundle = Static<typeof McpContextBundleSchema>;
/** Inferred type from the McpIntegrationSummary schema. */
export type McpIntegrationSummary = Static<typeof McpIntegrationSummarySchema>;
/** Inferred type from the McpResourcesListResponse schema. */
export type McpResourcesListResponse = Static<typeof McpResourcesListResponseSchema>;
/** Inferred type from the McpResourceTemplatesResponse schema. */
export type McpResourceTemplatesResponse = Static<typeof McpResourceTemplatesResponseSchema>;
/** Inferred type from the McpToolsListResponse schema. */
export type McpToolsListResponse = Static<typeof McpToolsListResponseSchema>;
/** Inferred type from the McpResourceReadResponse schema. */
export type McpResourceReadResponse = Static<typeof McpResourceReadResponseSchema>;
/** Inferred type from the McpRegistryResourceReadResponse schema. */
export type McpRegistryResourceReadResponse = Static<typeof McpRegistryResourceReadResponseSchema>;
/** Inferred type from the McpContextResponse schema. */
export type McpContextResponse = Static<typeof McpContextResponseSchema>;
/** Inferred type from the McpProviderContextEntry schema. */
export type McpProviderContextEntry = Static<typeof McpProviderContextEntrySchema>;
/** Inferred type from the McpContextsListResponse schema. */
export type McpContextsListResponse = Static<typeof McpContextsListResponseSchema>;
/** Inferred type from the McpToolCallSuccessResponse schema. */
export type McpToolCallSuccessResponse = Static<typeof McpToolCallSuccessResponseSchema>;
