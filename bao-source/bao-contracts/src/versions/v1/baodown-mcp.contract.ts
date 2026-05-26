/**
 * BaoDown MCP resource contracts v1.
 *
 * Contract-first boundary for BaoDown MCP resource operations exposed via the
 * `baodown-mcp.service.ts` JSON-RPC resource provider:
 *
 * - `vault://baodown/definitions` - List flow definitions (paginated, filterable)
 * - `vault://baodown/runs`        - List runs (paginated, filterable)
 * - `vault://baodown/stats`       - Registry stats snapshot
 * - `vault://baodown/nodes`       - Available node catalog
 * - `vault://baodown/integration` - Integration endpoints, wakeup status, and clinical readiness
 *
 * These contracts enable type-safe consumption of BaoDown MCP resources from
 * the htmx/HTML client via Eden Treaty, and serve as the shared schema boundary
 * between the server MCP service layer and any downstream consumer.
 *
 * @shared/contracts/versions/v1/baodown-mcp
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

// Constants

/**
 * Semantic version for all BaoDown MCP contracts.
 */
export const BAODOWN_MCP_CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for the definitions list resource.
 */
export const BAODOWN_MCP_DEFINITIONS_CONTRACT_NAME = "baodown-mcp-definitions";

/**
 * Contract name for the runs list resource.
 */
export const BAODOWN_MCP_RUNS_CONTRACT_NAME = "baodown-mcp-runs";

/**
 * Contract name for the stats snapshot resource.
 */
export const BAODOWN_MCP_STATS_CONTRACT_NAME = "baodown-mcp-stats";

/**
 * Contract name for the node catalog resource.
 */
export const BAODOWN_MCP_NODES_CONTRACT_NAME = "baodown-mcp-nodes";

/**
 * Contract name for the integration status resource.
 */
export const BAODOWN_MCP_INTEGRATION_CONTRACT_NAME = "baodown-mcp-integration";

// Shared error envelope

/**
 * Shared error envelope for BaoDown MCP resource operations.
 */
const BaoDownMcpErrorEnvelope: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Standard error schema covering HTTP status codes relevant to
 * authenticated read-only MCP resource operations.
 */
export const BaoDownMcpErrorsV1 = Type.Object(
  {
    400: BaoDownMcpErrorEnvelope,
    401: BaoDownMcpErrorEnvelope,
    403: BaoDownMcpErrorEnvelope,
    404: BaoDownMcpErrorEnvelope,
    429: BaoDownMcpErrorEnvelope,
    500: BaoDownMcpErrorEnvelope,
    503: BaoDownMcpErrorEnvelope,
  },
  { additionalProperties: false },
);

// Shared pagination

/**
 * Pagination metadata schema for paginated BaoDown MCP list responses.
 */
const BaoDownMcpPaginationSchema = Type.Object(
  {
    /** Total count of matching records. */
    total: Type.Integer({ minimum: 0, description: "Total count of matching records." }),
    /** Maximum items per page. */
    limit: Type.Integer({ minimum: 1, description: "Maximum items per page." }),
    /** Zero-based offset into the result set. */
    offset: Type.Integer({ minimum: 0, description: "Zero-based offset into the result set." }),
  },
  { additionalProperties: false },
);

// Shared link schemas

/**
 * HATEOAS-style link set for a BaoDown definition resource.
 */
const BaoDownMcpDefinitionLinksSchema: Type.TObject<
  {
    readonly definition: Type.TString;
    readonly versions: Type.TString;
    readonly runs: Type.TString;
  },
  "definition" | "versions" | "runs",
  never
> = Type.Object(
  {
    /** REST path to the definition detail. */
    definition: Type.String({ description: "REST path to the definition detail." }),
    /** REST path to the definition versions list. */
    versions: Type.String({ description: "REST path to the definition versions list." }),
    /** REST path to the definition runs list. */
    runs: Type.String({ description: "REST path to the definition runs list." }),
  },
  { additionalProperties: false },
);

/**
 * HATEOAS-style link set for a BaoDown run resource.
 */
const BaoDownMcpRunLinksSchema: Type.TObject<
  {
    readonly run: Type.TString;
    readonly cancel: Type.TString;
    readonly events: Type.TString;
  },
  "run" | "cancel" | "events",
  never
> = Type.Object(
  {
    /** REST path to the run detail. */
    run: Type.String({ description: "REST path to the run detail." }),
    /** REST path to cancel the run. */
    cancel: Type.String({ description: "REST path to cancel the run." }),
    /** REST path to the run events SSE stream. */
    events: Type.String({ description: "REST path to the run events SSE stream." }),
  },
  { additionalProperties: false },
);

// Definition item schema (MCP resource shape)

/**
 * Schema for a single BaoDown definition item as returned by the MCP
 * definitions resource.
 */
export const BaoDownMcpDefinitionItemSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TString;
    readonly description: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly tags: Type.TArray<Type.TString>;
    readonly owner: Type.TUnion<(Type.TUnknown | Type.TNull)[]>;
    readonly publishedVersionId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly createdAt: Type.TString;
    readonly updatedAt: Type.TString;
    readonly mcpUri: Type.TString;
    readonly links: Type.TObject<
      {
        readonly definition: Type.TString;
        readonly versions: Type.TString;
        readonly runs: Type.TString;
      },
      "versions" | "definition" | "runs",
      never
    >;
  },
  | "name"
  | "description"
  | "tags"
  | "id"
  | "updatedAt"
  | "createdAt"
  | "owner"
  | "publishedVersionId"
  | "mcpUri"
  | "links",
  never
> = Type.Object(
  {
    /** Unique definition identifier. */
    id: Type.String({ description: "Unique definition identifier." }),
    /** Human-readable definition name. */
    name: Type.String({ description: "Human-readable definition name." }),
    /** Optional description. */
    description: Type.Union([Type.String(), Type.Null()], {
      description: "Optional description.",
    }),
    /** Tags assigned to the definition. */
    tags: Type.Array(Type.String(), { description: "Tags assigned to the definition." }),
    /** Owner metadata (arbitrary JSON). */
    owner: Type.Union([Type.Unknown(), Type.Null()], {
      description: "Owner metadata (arbitrary JSON).",
    }),
    /** Published version ID, or null if unpublished. */
    publishedVersionId: Type.Union([Type.String(), Type.Null()], {
      description: "Published version ID, or null if unpublished.",
    }),
    /** ISO 8601 creation timestamp. */
    createdAt: Type.String({ description: "ISO 8601 creation timestamp." }),
    /** ISO 8601 last-updated timestamp. */
    updatedAt: Type.String({ description: "ISO 8601 last-updated timestamp." }),
    /** MCP resource URI for this definition. */
    mcpUri: Type.String({ description: "MCP resource URI for this definition." }),
    /** HATEOAS links. */
    links: BaoDownMcpDefinitionLinksSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpDefinitionItemSchema}.
 */
export type BaoDownMcpDefinitionItem = Static<typeof BaoDownMcpDefinitionItemSchema>;

// Run item schema (MCP resource shape)

/**
 * Schema for a single BaoDown run item as returned by the MCP runs resource.
 */
export const BaoDownMcpRunItemSchema = Type.Object(
  {
    /** Unique run identifier. */
    id: Type.String({ description: "Unique run identifier." }),
    /** Parent definition identifier. */
    definitionId: Type.String({ description: "Parent definition identifier." }),
    /** Version identifier that was executed. */
    versionId: Type.String({ description: "Version identifier that was executed." }),
    /** Current run status. */
    status: Type.String({ description: "Current run status." }),
    /** How the run was triggered. */
    triggerType: Type.String({ description: "How the run was triggered." }),
    /** Trigger payload (arbitrary JSON). */
    trigger: Type.Union([Type.Unknown(), Type.Null()], {
      description: "Trigger payload (arbitrary JSON).",
    }),
    /** Trigger context payload (arbitrary JSON). */
    triggerContext: Type.Union([Type.Unknown(), Type.Null()], {
      description: "Trigger context payload (arbitrary JSON).",
    }),
    /** ISO 8601 start timestamp, or null if not yet started. */
    startedAt: Type.Union([Type.String(), Type.Null()], {
      description: "ISO 8601 start timestamp, or null if not yet started.",
    }),
    /** ISO 8601 finish timestamp, or null if not yet finished. */
    finishedAt: Type.Union([Type.String(), Type.Null()], {
      description: "ISO 8601 finish timestamp, or null if not yet finished.",
    }),
    /** Correlation ID for distributed tracing. */
    correlationId: Type.Union([Type.String(), Type.Null()], {
      description: "Correlation ID for distributed tracing.",
    }),
    /** Request ID for request-level tracing. */
    requestId: Type.Union([Type.String(), Type.Null()], {
      description: "Request ID for request-level tracing.",
    }),
    /** Idempotency key to prevent duplicate runs. */
    idempotencyKey: Type.Union([Type.String(), Type.Null()], {
      description: "Idempotency key to prevent duplicate runs.",
    }),
    /** MCP resource URI for this run. */
    mcpUri: Type.String({ description: "MCP resource URI for this run." }),
    /** HATEOAS links. */
    links: BaoDownMcpRunLinksSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpRunItemSchema}.
 */
export type BaoDownMcpRunItem = Static<typeof BaoDownMcpRunItemSchema>;

// vault://baodown/definitions

/**
 * Request schema for the BaoDown MCP definitions resource.
 *
 * All fields are optional query parameters used for filtering and pagination.
 */
export const BaoDownMcpDefinitionsRequestV1: Type.TObject<
  {
    readonly search: Type.TOptional<Type.TString>;
    readonly tag: Type.TOptional<Type.TString>;
    readonly published: Type.TOptional<Type.TBoolean>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly search: Type.TOptional<Type.TString>;
    readonly tag: Type.TOptional<Type.TString>;
    readonly published: Type.TOptional<Type.TBoolean>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    /** Free-text search across name and description. */
    search: Type.Optional(
      Type.String({ description: "Free-text search across name and description." }),
    ),
    /** Filter by tag. */
    tag: Type.Optional(Type.String({ description: "Filter by tag." })),
    /** When true, only return published definitions. */
    published: Type.Optional(
      Type.Boolean({ description: "When true, only return published definitions." }),
    ),
    /** Maximum items to return. */
    limit: Type.Optional(Type.Integer({ minimum: 1, description: "Maximum items to return." })),
    /** Zero-based offset for pagination. */
    offset: Type.Optional(
      Type.Integer({ minimum: 0, description: "Zero-based offset for pagination." }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpDefinitionsRequestV1}.
 */
export type BaoDownMcpDefinitionsRequest = Static<typeof BaoDownMcpDefinitionsRequestV1>;

/**
 * Response schema for the BaoDown MCP definitions resource.
 *
 * Returns a paginated list of definition items with total count.
 */
export const BaoDownMcpDefinitionsResponseV1 = Type.Object(
  {
    /** Array of definition items. */
    items: Type.Array(BaoDownMcpDefinitionItemSchema, {
      description: "Array of definition items.",
    }),
    ...BaoDownMcpPaginationSchema.properties,
    /** ISO 8601 snapshot timestamp. */
    timestamp: Type.String({ description: "ISO 8601 snapshot timestamp." }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpDefinitionsResponseV1}.
 */
export type BaoDownMcpDefinitionsResponse = Static<typeof BaoDownMcpDefinitionsResponseV1>;

/**
 * Full contract definition for the BaoDown MCP definitions resource.
 */
export const BaoDownMcpDefinitionsContractV1 = {
  version: BAODOWN_MCP_CONTRACT_VERSION,
  name: BAODOWN_MCP_DEFINITIONS_CONTRACT_NAME,
  uri: "vault://baodown/definitions",
  request: BaoDownMcpDefinitionsRequestV1,
  response: BaoDownMcpDefinitionsResponseV1,
  errors: BaoDownMcpErrorsV1,
} as const satisfies VersionedContractV1;

// vault://baodown/runs

/**
 * Request schema for the BaoDown MCP runs resource.
 *
 * All fields are optional query parameters used for filtering and pagination.
 */
export const BaoDownMcpRunsRequestV1: Type.TObject<
  {
    readonly definitionId: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly definitionId: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    /** Filter by parent definition ID. */
    definitionId: Type.Optional(Type.String({ description: "Filter by parent definition ID." })),
    /** Filter by run status. */
    status: Type.Optional(
      Type.String({ description: "Filter by run status (e.g. RUNNING, COMPLETED)." }),
    ),
    /** Maximum items to return. */
    limit: Type.Optional(Type.Integer({ minimum: 1, description: "Maximum items to return." })),
    /** Zero-based offset for pagination. */
    offset: Type.Optional(
      Type.Integer({ minimum: 0, description: "Zero-based offset for pagination." }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpRunsRequestV1}.
 */
export type BaoDownMcpRunsRequest = Static<typeof BaoDownMcpRunsRequestV1>;

/**
 * Response schema for the BaoDown MCP runs resource.
 *
 * Returns a paginated list of run items with total count.
 */
export const BaoDownMcpRunsResponseV1 = Type.Object(
  {
    /** Array of run items. */
    items: Type.Array(BaoDownMcpRunItemSchema, { description: "Array of run items." }),
    ...BaoDownMcpPaginationSchema.properties,
    /** ISO 8601 snapshot timestamp. */
    timestamp: Type.String({ description: "ISO 8601 snapshot timestamp." }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpRunsResponseV1}.
 */
export type BaoDownMcpRunsResponse = Static<typeof BaoDownMcpRunsResponseV1>;

/**
 * Full contract definition for the BaoDown MCP runs resource.
 */
export const BaoDownMcpRunsContractV1 = {
  version: BAODOWN_MCP_CONTRACT_VERSION,
  name: BAODOWN_MCP_RUNS_CONTRACT_NAME,
  uri: "vault://baodown/runs",
  request: BaoDownMcpRunsRequestV1,
  response: BaoDownMcpRunsResponseV1,
  errors: BaoDownMcpErrorsV1,
} as const satisfies VersionedContractV1;

// vault://baodown/stats

/**
 * Request schema for the BaoDown MCP stats resource.
 *
 * No parameters required; returns a point-in-time snapshot.
 */
export const BaoDownMcpStatsRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * TypeScript type for {@link BaoDownMcpStatsRequestV1}.
 */
export type BaoDownMcpStatsRequest = Static<typeof BaoDownMcpStatsRequestV1>;

/**
 * Stats counters returned by the BaoDown MCP stats resource.
 */
export const BaoDownMcpStatsCountersSchema: Type.TObject<
  {
    readonly definitions: Type.TInteger;
    readonly runs: Type.TInteger;
    readonly activeRuns: Type.TInteger;
    readonly schedules: Type.TInteger;
    readonly webhooks: Type.TInteger;
  },
  "definitions" | "runs" | "activeRuns" | "schedules" | "webhooks",
  never
> = Type.Object(
  {
    /** Total number of flow definitions. */
    definitions: Type.Integer({ minimum: 0, description: "Total number of flow definitions." }),
    /** Total number of runs across all definitions. */
    runs: Type.Integer({ minimum: 0, description: "Total number of runs across all definitions." }),
    /** Number of currently active (non-terminal) runs. */
    activeRuns: Type.Integer({
      minimum: 0,
      description: "Number of currently active (non-terminal) runs.",
    }),
    /** Total number of schedules. */
    schedules: Type.Integer({ minimum: 0, description: "Total number of schedules." }),
    /** Total number of registered webhooks. */
    webhooks: Type.Integer({ minimum: 0, description: "Total number of registered webhooks." }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpStatsCountersSchema}.
 */
export type BaoDownMcpStatsCounters = Static<typeof BaoDownMcpStatsCountersSchema>;

/**
 * Response schema for the BaoDown MCP stats resource.
 */
export const BaoDownMcpStatsResponseV1: Type.TObject<
  {
    readonly stats: Type.TObject<
      {
        readonly definitions: Type.TInteger;
        readonly runs: Type.TInteger;
        readonly activeRuns: Type.TInteger;
        readonly schedules: Type.TInteger;
        readonly webhooks: Type.TInteger;
      },
      "definitions" | "runs" | "activeRuns" | "schedules" | "webhooks",
      never
    >;
    readonly timestamp: Type.TString;
  },
  "timestamp" | "stats",
  never
> = Type.Object(
  {
    /** Aggregated BaoDown registry counters. */
    stats: BaoDownMcpStatsCountersSchema,
    /** ISO 8601 snapshot timestamp. */
    timestamp: Type.String({ description: "ISO 8601 snapshot timestamp." }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpStatsResponseV1}.
 */
export type BaoDownMcpStatsResponse = Static<typeof BaoDownMcpStatsResponseV1>;

/**
 * Full contract definition for the BaoDown MCP stats resource.
 */
export const BaoDownMcpStatsContractV1 = {
  version: BAODOWN_MCP_CONTRACT_VERSION,
  name: BAODOWN_MCP_STATS_CONTRACT_NAME,
  uri: "vault://baodown/stats",
  request: BaoDownMcpStatsRequestV1,
  response: BaoDownMcpStatsResponseV1,
  errors: BaoDownMcpErrorsV1,
} as const satisfies VersionedContractV1;

// vault://baodown/nodes

/**
 * Request schema for the BaoDown MCP nodes resource.
 *
 * No parameters required; returns the full node catalog.
 */
export const BaoDownMcpNodesRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * TypeScript type for {@link BaoDownMcpNodesRequestV1}.
 */
export type BaoDownMcpNodesRequest = Static<typeof BaoDownMcpNodesRequestV1>;

/**
 * Response schema for the BaoDown MCP nodes resource.
 *
 * Returns the node catalog from the node registry. The `catalog` field
 * uses an opaque `Unknown` array because the full `BaoDownNodeCatalogList`
 * schema is complex and the contract only needs to validate the envelope.
 * Downstream consumers should validate individual items against
 * `BaoDownNodeCatalogEntrySchema` from `@shared/schemas/baodown/baodown-node-catalog`.
 */
export const BaoDownMcpNodesResponseV1: Type.TObject<
  { readonly catalog: Type.TUnknown; readonly timestamp: Type.TString },
  "catalog" | "timestamp",
  never
> = Type.Object(
  {
    /** Node catalog payload (array of catalog entries or structured catalog object). */
    catalog: Type.Unknown({ description: "Node catalog payload from the node registry." }),
    /** ISO 8601 snapshot timestamp. */
    timestamp: Type.String({ description: "ISO 8601 snapshot timestamp." }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpNodesResponseV1}.
 */
export type BaoDownMcpNodesResponse = Static<typeof BaoDownMcpNodesResponseV1>;

/**
 * Full contract definition for the BaoDown MCP nodes resource.
 */
export const BaoDownMcpNodesContractV1 = {
  version: BAODOWN_MCP_CONTRACT_VERSION,
  name: BAODOWN_MCP_NODES_CONTRACT_NAME,
  uri: "vault://baodown/nodes",
  request: BaoDownMcpNodesRequestV1,
  response: BaoDownMcpNodesResponseV1,
  errors: BaoDownMcpErrorsV1,
} as const satisfies VersionedContractV1;

// vault://baodown/integration

/**
 * Request schema for the BaoDown MCP integration resource.
 *
 * No parameters required; returns the current integration snapshot.
 */
export const BaoDownMcpIntegrationRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * TypeScript type for {@link BaoDownMcpIntegrationRequestV1}.
 */
export type BaoDownMcpIntegrationRequest = Static<typeof BaoDownMcpIntegrationRequestV1>;

/**
 * Endpoint paths returned by the BaoDown MCP integration resource.
 */
const BaoDownMcpIntegrationEndpointsSchema = Type.Object(
  {
    /** Base API path for BaoDown. */
    base: Type.String({ description: "Base API path for BaoDown." }),
    /** Integration API path for BaoDown. */
    integration: Type.String({ description: "Integration API path for BaoDown." }),
  },
  { additionalProperties: false },
);

/**
 * Clinical integration service state schema.
 */
const BaoDownMcpClinicalServiceStateSchema = Type.Union([
  Type.Literal("online"),
  Type.Literal("auth_required"),
  Type.Literal("unreachable"),
  Type.Literal("not_configured"),
]);

/**
 * Clinical integration service status schema.
 */
const BaoDownMcpClinicalServiceStatusSchema = Type.Object(
  {
    key: Type.Union([Type.Literal("baofire"), Type.Literal("dimsum")]),
    label: Type.String({ minLength: 1 }),
    url: Type.Union([Type.String(), Type.Null()]),
    publicUrl: Type.Union([Type.String(), Type.Null()]),
    status: BaoDownMcpClinicalServiceStateSchema,
    statusCode: Type.Union([Type.Integer({ minimum: 100, maximum: 599 }), Type.Null()]),
    latencyMs: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    checkedAt: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * BaoDown MCP Baofire status schema.
 */
const BaoDownMcpBaofireStatusSchema = Type.Object(
  {
    service: Type.Object(
      {
        ...BaoDownMcpClinicalServiceStatusSchema.properties,
        key: Type.Literal("baofire"),
      },
      { additionalProperties: false },
    ),
    provider: Type.Union([Type.Literal("baofire"), Type.Literal("azure")]),
    enabled: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * BaoDown MCP Dimsum status schema.
 */
const BaoDownMcpDimsumStatusSchema = Type.Object(
  {
    service: Type.Object(
      {
        ...BaoDownMcpClinicalServiceStatusSchema.properties,
        key: Type.Literal("dimsum"),
      },
      { additionalProperties: false },
    ),
    persistenceBackend: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the BaoDown MCP integration resource.
 *
 * Reports the BaoDown REST endpoint paths and the operational status of
 * cross-replica wakeup mechanisms (PG LISTEN/NOTIFY and Redis Pub/Sub).
 */
export const BaoDownMcpIntegrationResponseV1 = Type.Object(
  {
    /** BaoDown REST endpoint paths. */
    endpoints: BaoDownMcpIntegrationEndpointsSchema,
    /** PG LISTEN/NOTIFY wakeup status. */
    pgNotify: Type.Unknown({ description: "PG LISTEN/NOTIFY wakeup status payload." }),
    /** Redis Pub/Sub wakeup status. */
    redisNotify: Type.Unknown({ description: "Redis Pub/Sub wakeup status payload." }),
    /** Baofire integration readiness. */
    baofire: BaoDownMcpBaofireStatusSchema,
    /** Dimsum integration readiness and backend mode. */
    dimsum: BaoDownMcpDimsumStatusSchema,
    /** ISO 8601 snapshot timestamp. */
    timestamp: Type.String({ description: "ISO 8601 snapshot timestamp." }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link BaoDownMcpIntegrationResponseV1}.
 */
export type BaoDownMcpIntegrationResponse = Static<typeof BaoDownMcpIntegrationResponseV1>;

/**
 * Full contract definition for the BaoDown MCP integration resource.
 */
export const BaoDownMcpIntegrationContractV1 = {
  version: BAODOWN_MCP_CONTRACT_VERSION,
  name: BAODOWN_MCP_INTEGRATION_CONTRACT_NAME,
  uri: "vault://baodown/integration",
  request: BaoDownMcpIntegrationRequestV1,
  response: BaoDownMcpIntegrationResponseV1,
  errors: BaoDownMcpErrorsV1,
} as const satisfies VersionedContractV1;
