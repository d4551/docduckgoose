/**
 * Shared MCP schemas.
 *
 * Provides TypeBox schemas for MCP REST payloads and integration summaries so
 * server and client contracts stay aligned.
 *
 * @shared/schemas/mcp.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * MCP icon descriptor schema.
 */
const McpIconSchema = Type.Object(
  {
    url: Type.String({ minLength: 1 }),
    mimeType: Type.Optional(Type.String()),
    size: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * JSON schema payload for MCP tool input/output schemas.
 */
export const McpSchemaDefinitionSchema: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object(
  {},
  {
    additionalProperties: Type.Unknown(),
    description: "JSON Schema payload for MCP tool inputs/outputs.",
  },
);

/**
 * MCP tool definition schema used by REST endpoints.
 */
export const McpToolDefinitionSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    title: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String()),
    icons: Type.Optional(Type.Array(McpIconSchema)),
    inputSchema: Type.Optional(McpSchemaDefinitionSchema),
    outputSchema: Type.Optional(McpSchemaDefinitionSchema),
    readinessIncludedInResponse: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource definition schema.
 */
export const McpResourceDefinitionSchema = Type.Object(
  {
    uri: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    title: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String()),
    mimeType: Type.Optional(Type.String()),
    icons: Type.Optional(Type.Array(McpIconSchema)),
  },
  { additionalProperties: false },
);

/**
 * MCP resource template definition schema.
 */
export const McpResourceTemplateDefinitionSchema = Type.Object(
  {
    uriTemplate: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    title: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String()),
    mimeType: Type.Optional(Type.String()),
    icons: Type.Optional(Type.Array(McpIconSchema)),
  },
  { additionalProperties: false },
);

/**
 * MCP pagination query schema for list endpoints.
 */
export const McpPaginationQuerySchema: Type.TObject<
  {
    readonly cursor: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly cursor: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    cursor: Type.Optional(Type.String({ minLength: 1 })),
    // Query params arrive as strings in most HTTP servers; accept both.
    limit: Type.Optional(Type.Union([Type.Integer(), Type.String({ pattern: "^[0-9]+$" })])),
    provider: Type.Optional(Type.String({ minLength: 1 })),
    source: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * MCP provider filter query schema for non-paginated endpoints.
 */
export const McpProviderQuerySchema: Type.TObject<
  {
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly provider: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    provider: Type.Optional(Type.String({ minLength: 1 })),
    source: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * MCP tool call request schema.
 */
export const McpToolCallRequestSchema: Type.TObject<
  {
    readonly arguments: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly arguments: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    arguments: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * MCP resource content schema (REST responses).
 */
export const McpResourceContentSchema: Type.TObject<
  {
    readonly uri: Type.TString;
    readonly mimeType: Type.TOptional<Type.TString>;
    readonly text: Type.TOptional<Type.TString>;
    readonly blob: Type.TOptional<Type.TString>;
    readonly data: Type.TOptional<Type.TUnknown>;
  },
  "uri",
  Type.InferOptionalKeys<{
    readonly uri: Type.TString;
    readonly mimeType: Type.TOptional<Type.TString>;
    readonly text: Type.TOptional<Type.TString>;
    readonly blob: Type.TOptional<Type.TString>;
    readonly data: Type.TOptional<Type.TUnknown>;
  }>
> = Type.Object(
  {
    uri: Type.String({ minLength: 1 }),
    mimeType: Type.Optional(Type.String()),
    text: Type.Optional(Type.String()),
    blob: Type.Optional(Type.String()),
    data: Type.Optional(Type.Unknown()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource read result schema (registry read).
 */
export const McpResourceContentResultSchema: Type.TObject<
  {
    readonly uri: Type.TString;
    readonly mimeType: Type.TOptional<Type.TString>;
    readonly text: Type.TOptional<Type.TString>;
    readonly blob: Type.TOptional<Type.TString>;
  },
  "uri",
  Type.InferOptionalKeys<{
    readonly uri: Type.TString;
    readonly mimeType: Type.TOptional<Type.TString>;
    readonly text: Type.TOptional<Type.TString>;
    readonly blob: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    uri: Type.String({ minLength: 1 }),
    mimeType: Type.Optional(Type.String()),
    text: Type.Optional(Type.String()),
    blob: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP endpoint group schema for a capability domain.
 */
export const McpIntegrationEndpointGroupSchema: Type.TObject<
  {
    readonly tools: Type.TString;
    readonly toolCall: Type.TString;
    readonly resources: Type.TString;
    readonly resourceRead: Type.TString;
    readonly templates: Type.TString;
    readonly context: Type.TString;
  },
  "tools" | "toolCall" | "resources" | "resourceRead" | "templates" | "context",
  never
> = Type.Object(
  {
    tools: Type.String(),
    toolCall: Type.String(),
    resources: Type.String(),
    resourceRead: Type.String(),
    templates: Type.String(),
    context: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * MCP endpoint group schema for context bundles (list-focused naming).
 */
export const McpContextEndpointGroupSchema: Type.TObject<
  {
    readonly toolsList: Type.TString;
    readonly toolCall: Type.TString;
    readonly resourcesList: Type.TString;
    readonly resourceRead: Type.TString;
    readonly templatesList: Type.TString;
    readonly context: Type.TString;
  },
  "toolsList" | "toolCall" | "resourcesList" | "resourceRead" | "templatesList" | "context",
  never
> = Type.Object(
  {
    toolsList: Type.String(),
    toolCall: Type.String(),
    resourcesList: Type.String(),
    resourceRead: Type.String(),
    templatesList: Type.String(),
    context: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * MCP provider source schema.
 */
export const McpProviderSourceSchema: Type.TUnion<
  (Type.TLiteral<"builtin"> | Type.TLiteral<"bao"> | Type.TLiteral<"runtime">)[]
> = Type.Union([Type.Literal("builtin"), Type.Literal("bao"), Type.Literal("runtime")], {});

/**
 * Scalar value allowed inside MCP provider metadata attributes.
 */
export const McpProviderMetadataAttributeValueSchema: Type.TUnion<
  (Type.TBoolean | Type.TNumber | Type.TString)[]
> = Type.Union([Type.Boolean(), Type.Number(), Type.String({ minLength: 1 })], {});

/**
 * Shared MCP provider metadata schema.
 *
 * Carries registry-owned descriptive metadata contributed by built-in catalogs,
 * `.bao` manifests, and BunBuddy contracts.
 */
export const McpProviderMetadataSchema: Type.TObject<
  {
    readonly description: Type.TOptional<Type.TString>;
    readonly docsPath: Type.TOptional<Type.TString>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly attributes: Type.TOptional<
      Type.TRecord<Type.TString, Type.TUnion<(Type.TString | Type.TBoolean | Type.TNumber)[]>>
    >;
  },
  never,
  Type.InferOptionalKeys<{
    readonly description: Type.TOptional<Type.TString>;
    readonly docsPath: Type.TOptional<Type.TString>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly attributes: Type.TOptional<
      Type.TRecord<Type.TString, Type.TUnion<(Type.TString | Type.TBoolean | Type.TNumber)[]>>
    >;
  }>
> = Type.Object(
  {
    description: Type.Optional(Type.String({ minLength: 1 })),
    docsPath: Type.Optional(Type.String({ minLength: 1 })),
    tags: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        minItems: 1,
      }),
    ),
    attributes: Type.Optional(
      Type.Record(Type.String({ minLength: 1 }), McpProviderMetadataAttributeValueSchema),
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
export const McpProviderSummarySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    displayName: Type.String({ minLength: 1 }),
    ownerId: Type.String({ minLength: 1 }),
    source: McpProviderSourceSchema,
    toolCount: Type.Integer({ minimum: 0 }),
    resourceCount: Type.Integer({ minimum: 0 }),
    templateCount: Type.Integer({ minimum: 0 }),
    registeredAt: Type.String({ format: "date-time" }),
    metadata: Type.Optional(McpProviderMetadataSchema),
  },
  { additionalProperties: false },
);

/**
 * MCP provider inventory entry used by integration summaries.
 */
export const McpIntegrationProviderSchema = Type.Object(
  {
    ...McpProviderSummarySchema.properties,
    endpoints: McpIntegrationEndpointGroupSchema,
  },
  { additionalProperties: false },
);

/**
 * Generic provider-backed MCP endpoint inventory.
 */
export const McpIntegrationEndpointsSchema: Type.TObject<
  {
    readonly base: Type.TString;
    readonly rpc: Type.TString;
    readonly contexts: Type.TString;
    readonly providerContext: Type.TString;
    readonly resources: Type.TString;
    readonly resourceRead: Type.TString;
    readonly templates: Type.TString;
    readonly tools: Type.TString;
    readonly toolCall: Type.TString;
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
> = Type.Object(
  {
    base: Type.String(),
    rpc: Type.String(),
    contexts: Type.String(),
    providerContext: Type.String(),
    resources: Type.String(),
    resourceRead: Type.String(),
    templates: Type.String(),
    tools: Type.String(),
    toolCall: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * MCP context bundle schema for REST responses.
 */
export const McpContextBundleSchema = Type.Object(
  {
    provider: McpProviderSummarySchema,
    tools: Type.Array(McpToolDefinitionSchema),
    resources: Type.Array(McpResourceDefinitionSchema),
    templates: Type.Array(McpResourceTemplateDefinitionSchema),
    endpoints: McpContextEndpointGroupSchema,
    summary: Type.Optional(Type.Union([Type.Unknown(), Type.Null()])),
    docs: Type.Optional(Type.Unknown()),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * MCP integration summary schema.
 */
export const McpStreamHealthSchema: Type.TObject<
  {
    readonly backend: Type.TUnion<(Type.TLiteral<"redis"> | Type.TLiteral<"single-node-memory">)[]>;
    readonly degraded: Type.TBoolean;
    readonly redisSubscribed: Type.TBoolean;
    readonly listeners: Type.TInteger;
    readonly bufferedEvents: Type.TInteger;
    readonly lastEventAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "backend" | "lastEventAt" | "degraded" | "redisSubscribed" | "listeners" | "bufferedEvents",
  never
> = Type.Object(
  {
    backend: Type.Union([Type.Literal("redis"), Type.Literal("single-node-memory")]),
    degraded: Type.Boolean(),
    redisSubscribed: Type.Boolean(),
    listeners: Type.Integer({ minimum: 0 }),
    bufferedEvents: Type.Integer({ minimum: 0 }),
    lastEventAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * MCP subscription registry health schema.
 */
export const McpSubscriptionsHealthSchema: Type.TObject<
  {
    readonly backend: Type.TUnion<(Type.TLiteral<"redis"> | Type.TLiteral<"memory">)[]>;
    readonly ttlSeconds: Type.TInteger;
    readonly subscribers: Type.TInteger;
    readonly subscriptions: Type.TInteger;
    readonly lastActivityAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "backend" | "lastActivityAt" | "ttlSeconds" | "subscribers" | "subscriptions",
  never
> = Type.Object(
  {
    backend: Type.Union([Type.Literal("redis"), Type.Literal("memory")]),
    ttlSeconds: Type.Integer({ minimum: 0 }),
    subscribers: Type.Integer({ minimum: 0 }),
    subscriptions: Type.Integer({ minimum: 0 }),
    lastActivityAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
  },
  { additionalProperties: false },
);

/** TypeBox schema for MCP integration summary payloads. */
export const McpIntegrationSummarySchema = Type.Object(
  {
    timestamp: Type.String({ format: "date-time" }),
    endpoints: McpIntegrationEndpointsSchema,
    providers: Type.Array(McpIntegrationProviderSchema),
    totals: Type.Object(
      {
        tools: Type.Integer({ minimum: 0 }),
        resources: Type.Integer({ minimum: 0 }),
        templates: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    sources: Type.Record(Type.String(), Type.Integer({ minimum: 0 })),
    toolSources: Type.Record(Type.String(), Type.Integer({ minimum: 0 })),
    stream: McpStreamHealthSchema,
    subscriptions: McpSubscriptionsHealthSchema,
  },
  { additionalProperties: false },
);

/**
 * MCP resources list response schema.
 */
export const McpResourcesListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    resources: Type.Array(McpResourceDefinitionSchema),
    count: Type.Integer({ minimum: 0 }),
    nextCursor: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource templates list response schema.
 */
export const McpResourceTemplatesResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    templates: Type.Array(McpResourceTemplateDefinitionSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP tools list response schema.
 */
export const McpToolsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    tools: Type.Array(McpToolDefinitionSchema),
    count: Type.Integer({ minimum: 0 }),
    nextCursor: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP resource read response schema (hardware/RPA).
 */
export const McpResourceReadResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    uri: Type.String({ minLength: 1 }),
    contents: Type.Array(McpResourceContentSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP registry resource read response schema.
 */
export const McpRegistryResourceReadResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    resource: McpResourceContentResultSchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP context response schema.
 */
export const McpContextResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    context: McpContextBundleSchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP provider context list entry schema.
 */
export const McpProviderContextEntrySchema = Type.Object(
  {
    context: McpContextBundleSchema,
  },
  { additionalProperties: false },
);

/**
 * MCP provider context list response schema.
 */
export const McpContextsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    contexts: Type.Array(McpProviderContextEntrySchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * MCP tool call success response schema.
 */
export const McpToolCallSuccessResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly requestId: Type.TOptional<Type.TString>;
  },
  "timestamp" | "ok",
  Type.InferOptionalKeys<{
    readonly ok: Type.TLiteral<true>;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly requestId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ok: Type.Literal(true),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
  },
  {
    additionalProperties: Type.Unknown(),
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

/* -----------------------------------------------------------------------------
 * Bao MCP server descriptor metadata.
 *
 * Describes free-form descriptor metadata attached to MCP servers as packaged
 * inside `.bao` archives (description, docs path, tags, attribute map).
 * --------------------------------------------------------------------------- */

const BaoMcpNonEmptyStringSchema = Type.String({ minLength: 1 });

/** Permitted scalar value type for Bao MCP descriptor attributes. */
export const BaoMcpMetadataAttributeValueSchema = Type.Union([
  Type.Boolean(),
  Type.Number(),
  Type.String(),
]);

/** Bao MCP descriptor metadata attached to packaged MCP servers. */
export const BaoMcpMetadataSchema = Type.Object(
  {
    description: Type.Optional(BaoMcpNonEmptyStringSchema),
    docsPath: Type.Optional(BaoMcpNonEmptyStringSchema),
    tags: Type.Optional(Type.Array(BaoMcpNonEmptyStringSchema, { minItems: 1 })),
    attributes: Type.Optional(
      Type.Record(BaoMcpNonEmptyStringSchema, BaoMcpMetadataAttributeValueSchema),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the BaoMcpMetadataAttributeValueSchema. */
export type BaoMcpMetadataAttributeValue = Static<typeof BaoMcpMetadataAttributeValueSchema>;

/** Inferred type from the BaoMcpMetadataSchema. */
export type BaoMcpMetadata = Static<typeof BaoMcpMetadataSchema>;
