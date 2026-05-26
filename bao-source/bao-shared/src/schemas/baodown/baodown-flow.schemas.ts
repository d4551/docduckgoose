/**
 * Vault-native flows (BaoDown) contract schemas.
 *
 * These schemas define the persisted/server contract for BaoDown graphs. They are:
 * - Not flow-json import payloads
 * - Not BaklavaJS serialization
 *
 * BaklavaJS is treated as an editor/view-model only; the persisted shape is defined here.
 *
 * @shared/schemas/baodown/baodown-flow
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import {
  BAODOWN_CONTROL_EDGE_KIND,
  BAODOWN_DATA_EDGE_KIND,
  BAODOWN_GRAPH_SCHEMA_VERSION as BAODOWN_GRAPH_SCHEMA_VERSION_VALUE,
} from "../../baodown/baodown-graph-contract.ts";
import { JsonValueSchema } from "../json.schemas.ts";
import { StreamErrorEvent } from "../streaming.schemas.ts";

/**
 * Current persisted graph schema version supported by this build.
 */
export const BAODOWN_GRAPH_SCHEMA_VERSION: typeof BAODOWN_GRAPH_SCHEMA_VERSION_VALUE =
  BAODOWN_GRAPH_SCHEMA_VERSION_VALUE;

/**
 * Supported persisted graph schema versions.
 */
function buildBaoDownGraphSchemaVersionSchema() {
  return Type.Union([Type.Literal(BAODOWN_GRAPH_SCHEMA_VERSION)], {
    description: "Supported BaoDown graph schema versions.",
  });
}
/** Schema for persisted BaoDown graph schema versions accepted by this build. */
export const BaoDownGraphSchemaVersionSchema = buildBaoDownGraphSchemaVersionSchema();

/**
 * TypeScript type for {@link BaoDownGraphSchemaVersionSchema}.
 */
export type BaoDownGraphSchemaVersion = Static<typeof BaoDownGraphSchemaVersionSchema>;

/**
 * Edge kinds supported by BaoDown graphs.
 *
 * `control` edges drive orchestration order (DAG execution).
 * `data` edges represent data dependencies (optional; may be ignored by some runtimes).
 */
export const BaoDownEdgeKindSchema: Type.TUnion<
  (Type.TLiteral<"control"> | Type.TLiteral<"data">)[]
> = Type.Union([Type.Literal(BAODOWN_CONTROL_EDGE_KIND), Type.Literal(BAODOWN_DATA_EDGE_KIND)], {
  description: "Edge kind for BaoDown graphs.",
});

/**
 * TypeScript type for {@link BaoDownEdgeKindSchema}.
 */
export type BaoDownEdgeKind = Static<typeof BaoDownEdgeKindSchema>;

/**
 * Node position in the editor coordinate space.
 */
export const BaoDownNodePositionSchema: Type.TObject<
  { readonly x: Type.TNumber; readonly y: Type.TNumber },
  "x" | "y",
  never
> = Type.Object(
  {
    x: Type.Number({ description: "X coordinate." }),
    y: Type.Number({ description: "Y coordinate." }),
  },
  {
    description: "Editor position for a node.",
  },
);

/**
 * TypeScript type for {@link BaoDownNodePositionSchema}.
 */
export type BaoDownNodePosition = Static<typeof BaoDownNodePositionSchema>;

/**
 * Port definition for a node input/output.
 */
export const BaoDownPortSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly label: Type.TOptional<Type.TString>;
    readonly kind: Type.TUnion<(Type.TLiteral<"control"> | Type.TLiteral<"data">)[]>;
    readonly required: Type.TOptional<Type.TBoolean>;
  },
  "id" | "kind",
  Type.InferOptionalKeys<{
    readonly id: Type.TString;
    readonly label: Type.TOptional<Type.TString>;
    readonly kind: Type.TUnion<(Type.TLiteral<"control"> | Type.TLiteral<"data">)[]>;
    readonly required: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    id: Type.String({ minLength: 1, description: "Stable port id (unique within the node)." }),
    label: Type.Optional(Type.String({ minLength: 1, description: "Human-readable label." })),
    kind: BaoDownEdgeKindSchema,
    required: Type.Optional(
      Type.Boolean({
        description:
          "Whether this input port must have a connected edge. When omitted, validation may apply kind-specific defaults.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Node port definition.",
  },
);

/**
 * TypeScript type for {@link BaoDownPortSchema}.
 */
export type BaoDownPort = Static<typeof BaoDownPortSchema>;

/**
 * Node port container.
 */
export const BaoDownNodePortsSchema = Type.Object(
  {
    inputs: Type.Array(BaoDownPortSchema, { description: "Input ports." }),
    outputs: Type.Array(BaoDownPortSchema, { description: "Output ports." }),
  },
  {
    additionalProperties: false,
    description: "Node ports definition.",
  },
);

/**
 * TypeScript type for {@link BaoDownNodePortsSchema}.
 */
export type BaoDownNodePorts = Static<typeof BaoDownNodePortsSchema>;

/**
 * BaoDown node schema.
 */
export const BaoDownNodeSchema = Type.Object(
  {
    id: Type.String({ minLength: 1, description: "Stable node id (unique within the graph)." }),
    type: Type.String({
      minLength: 1,
      description: "Node type id (resolved via the node catalog/registry).",
    }),
    position: BaoDownNodePositionSchema,
    ports: BaoDownNodePortsSchema,
    config: Type.Record(Type.String({ minLength: 1 }), JsonValueSchema, {
      description: "Node config payload (validated by the node type schema at runtime).",
    }),
  },
  {
    additionalProperties: false,
    description: "Persisted node shape for BaoDown graphs.",
  },
);

/**
 * TypeScript type for {@link BaoDownNodeSchema}.
 */
export type BaoDownNode = Static<typeof BaoDownNodeSchema>;

/**
 * BaoDown edge schema.
 *
 * Runtime semantics:
 * - The executor resolves handler `inputs` by the target port id (`toPort`).
 * - The value for a connected input port is the upstream node's completed output.
 * - Multiple edges to the same `{toNode,toPort,kind}` are rejected by validation.
 *
 * Multi-port output contract:
 * - Nodes with a single output port return a raw `JsonValue`.
 * - Nodes with multiple output ports return `Record<portId, JsonValue | undefined>`.
 * - The executor extracts port-level values via `extractPortOutput(output, portId)`.
 * - Control edges resolve fired ports via `resolveFiredControlPorts(output, ports)`.
 */
export const BaoDownEdgeSchema: Type.TObject<
  {
    readonly fromNode: Type.TString;
    readonly fromPort: Type.TString;
    readonly toNode: Type.TString;
    readonly toPort: Type.TString;
    readonly kind: Type.TUnion<(Type.TLiteral<"control"> | Type.TLiteral<"data">)[]>;
  },
  "kind" | "fromNode" | "fromPort" | "toNode" | "toPort",
  never
> = Type.Object(
  {
    fromNode: Type.String({ minLength: 1, description: "Source node id." }),
    fromPort: Type.String({ minLength: 1, description: "Source port id." }),
    toNode: Type.String({ minLength: 1, description: "Target node id." }),
    toPort: Type.String({ minLength: 1, description: "Target port id." }),
    kind: BaoDownEdgeKindSchema,
  },
  {
    additionalProperties: false,
    description: "Edge between two node ports.",
  },
);

/**
 * TypeScript type for {@link BaoDownEdgeSchema}.
 */
export type BaoDownEdge = Static<typeof BaoDownEdgeSchema>;

/**
 * Persisted BaoDown graph schema.
 */
export const BaoDownGraphSchema = Type.Object(
  {
    schemaVersion: BaoDownGraphSchemaVersionSchema,
    nodes: Type.Array(BaoDownNodeSchema),
    edges: Type.Array(BaoDownEdgeSchema),
  },
  {
    additionalProperties: false,
    description: "Persisted contract for a BaoDown graph.",
  },
);

/**
 * TypeScript type for {@link BaoDownGraphSchema}.
 */
export type BaoDownGraph = Static<typeof BaoDownGraphSchema>;

// Node Output Contract

/**
 * BaoDown node output schema.
 *
 * Defines the runtime output contract for node handlers:
 * - **Single-port nodes** return a raw `JsonValue` (or `undefined`).
 * - **Multi-port nodes** return a `Record<portId, JsonValue | undefined>` mapping
 *   each output port id to its emitted value.
 *
 * The executor stores completed outputs per node in a `Map<nodeId, BaoDownNodeOutput>`.
 * Downstream edges resolve their input values by extracting the relevant port output
 * from the upstream node's stored output.
 */
export const BaoDownNodeOutputSchema: Type.TUnion<
  (Type.TUnknown | Type.TRecord<Type.TString, Type.TUnion<(Type.TUnknown | Type.TUndefined)[]>>)[]
> = Type.Union(
  [
    JsonValueSchema,
    Type.Record(Type.String(), Type.Union([JsonValueSchema, Type.Undefined()]), {
      description: "Multi-port output keyed by port id.",
    }),
  ],
  {
    description:
      "Node output: raw JsonValue for single-port nodes, Record<portId, JsonValue | undefined> for multi-port.",
  },
);

/**
 * TypeScript type for {@link BaoDownNodeOutputSchema}.
 */
export type BaoDownNodeOutput = Static<typeof BaoDownNodeOutputSchema>;

/**
 * Supported trigger kinds for starting a BaoDown run.
 */
export const BaoDownTriggerKindSchema: Type.TUnion<
  (
    | Type.TLiteral<"manual">
    | Type.TLiteral<"schedule">
    | Type.TLiteral<"api">
    | Type.TLiteral<"webhook">
  )[]
> = Type.Union(
  [Type.Literal("manual"), Type.Literal("schedule"), Type.Literal("api"), Type.Literal("webhook")],
  {
    description: "Trigger kind for BaoDown runs.",
  },
);

/**
 * TypeScript type for {@link BaoDownTriggerKindSchema}.
 */
export type BaoDownTriggerKind = Static<typeof BaoDownTriggerKindSchema>;

/**
 * Manual trigger definition.
 */
export const BaoDownManualTriggerSchema: Type.TObject<
  { readonly kind: Type.TLiteral<"manual"> },
  "kind",
  never
> = Type.Object(
  {
    kind: Type.Literal("manual"),
  },
  { additionalProperties: false },
);

/**
 * Schedule trigger definition.
 */
export const BaoDownScheduleTriggerSchema: Type.TObject<
  {
    readonly kind: Type.TLiteral<"schedule">;
    readonly cron: Type.TString;
    readonly timezone: Type.TString;
    readonly enabled: Type.TBoolean;
  },
  "kind" | "cron" | "timezone" | "enabled",
  never
> = Type.Object(
  {
    kind: Type.Literal("schedule"),
    cron: Type.String({ minLength: 1, description: "Cron expression." }),
    timezone: Type.String({ minLength: 1, description: "IANA timezone id." }),
    enabled: Type.Boolean({ description: "Whether this schedule is enabled." }),
  },
  { additionalProperties: false },
);

/**
 * API trigger definition.
 */
export const BaoDownApiTriggerSchema: Type.TObject<
  { readonly kind: Type.TLiteral<"api">; readonly enabled: Type.TBoolean },
  "kind" | "enabled",
  never
> = Type.Object(
  {
    kind: Type.Literal("api"),
    enabled: Type.Boolean({ description: "Whether this API trigger is enabled." }),
  },
  { additionalProperties: false },
);

/**
 * Webhook trigger definition.
 */
export const BaoDownWebhookTriggerSchema: Type.TObject<
  { readonly kind: Type.TLiteral<"webhook">; readonly enabled: Type.TBoolean },
  "kind" | "enabled",
  never
> = Type.Object(
  {
    kind: Type.Literal("webhook"),
    enabled: Type.Boolean({ description: "Whether this webhook trigger is enabled." }),
  },
  { additionalProperties: false },
);

/**
 * Flow trigger definition schema.
 */
export const BaoDownTriggerSchema: Type.TUnion<
  (
    | Type.TObject<{ readonly kind: Type.TLiteral<"manual"> }, "kind", never>
    | Type.TObject<
        {
          readonly kind: Type.TLiteral<"schedule">;
          readonly cron: Type.TString;
          readonly timezone: Type.TString;
          readonly enabled: Type.TBoolean;
        },
        "kind" | "cron" | "timezone" | "enabled",
        never
      >
    | Type.TObject<
        { readonly kind: Type.TLiteral<"api">; readonly enabled: Type.TBoolean },
        "kind" | "enabled",
        never
      >
    | Type.TObject<
        { readonly kind: Type.TLiteral<"webhook">; readonly enabled: Type.TBoolean },
        "kind" | "enabled",
        never
      >
  )[]
> = Type.Union(
  [
    BaoDownManualTriggerSchema,
    BaoDownScheduleTriggerSchema,
    BaoDownApiTriggerSchema,
    BaoDownWebhookTriggerSchema,
  ],
  { description: "Trigger configuration for BaoDown." },
);

/**
 * TypeScript type for {@link BaoDownTriggerSchema}.
 */
export type BaoDownTrigger = Static<typeof BaoDownTriggerSchema>;

/**
 * BaoDown run context schema (trigger + request correlation metadata).
 */
export const BaoDownRunContextSchema = Type.Object(
  {
    trigger: BaoDownTriggerSchema,
    input: Type.Optional(JsonValueSchema),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    requestId: Type.Optional(Type.String({ minLength: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
    variables: Type.Optional(
      Type.Record(Type.String(), JsonValueSchema, {
        description: "Run-scoped mutable variables shared between setVariable/getVariable nodes.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Context used when starting/executing a BaoDown run.",
  },
);

/**
 * TypeScript type for {@link BaoDownRunContextSchema}.
 */
export type BaoDownRunContext = Static<typeof BaoDownRunContextSchema>;

/**
 * Supported event kinds for streaming BaoDown run events.
 */
export const BaoDownRunEventKindSchema: Type.TUnion<
  (
    | Type.TLiteral<"run.started">
    | Type.TLiteral<"run.completed">
    | Type.TLiteral<"run.failed">
    | Type.TLiteral<"run.cancelled">
    | Type.TLiteral<"node.started">
    | Type.TLiteral<"node.completed">
    | Type.TLiteral<"node.failed">
    | Type.TLiteral<"node.log">
  )[]
> = Type.Union(
  [
    Type.Literal("run.started"),
    Type.Literal("run.completed"),
    Type.Literal("run.failed"),
    Type.Literal("run.cancelled"),
    Type.Literal("node.started"),
    Type.Literal("node.completed"),
    Type.Literal("node.failed"),
    Type.Literal("node.log"),
  ],
  {
    description: "Event kinds emitted during a BaoDown run.",
  },
);

/**
 * TypeScript type for {@link BaoDownRunEventKindSchema}.
 */
export type BaoDownRunEventKind = Static<typeof BaoDownRunEventKindSchema>;

/**
 * BaoDown run event schema used for SSE/websocket streaming.
 */
export const BaoDownRunEventSchema = Type.Object(
  {
    runId: Type.String({ minLength: 1 }),
    seq: Type.Number({ minimum: 0 }),
    kind: BaoDownRunEventKindSchema,
    timestamp: Type.String({ minLength: 1, description: "ISO 8601 timestamp." }),
    nodeId: Type.Optional(Type.String({ minLength: 1 })),
    payload: Type.Optional(JsonValueSchema),
  },
  {
    additionalProperties: false,
    description: "Event emitted by the BaoDown runtime for streaming to clients.",
  },
);

/**
 * TypeScript type for {@link BaoDownRunEventSchema}.
 */
export type BaoDownRunEvent = Static<typeof BaoDownRunEventSchema>;

/**
 * Connected event payload emitted when the BaoDown SSE stream is established.
 */
export const BaoDownRunConnectedDataSchema: Type.TObject<
  {
    readonly runId: Type.TString;
    readonly definitionId: Type.TString;
    readonly versionId: Type.TString;
    readonly status: Type.TString;
    readonly correlationId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly requestId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly idempotencyKey: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly timestamp: Type.TString;
  },
  | "correlationId"
  | "requestId"
  | "idempotencyKey"
  | "runId"
  | "timestamp"
  | "definitionId"
  | "versionId"
  | "status",
  never
> = Type.Object(
  {
    runId: Type.String({ minLength: 1 }),
    definitionId: Type.String({ minLength: 1 }),
    versionId: Type.String({ minLength: 1 }),
    status: Type.String({ minLength: 1 }),
    correlationId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    requestId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    idempotencyKey: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    timestamp: Type.String({ minLength: 1, description: "ISO 8601 timestamp." }),
  },
  {
    additionalProperties: false,
    description: "Initial metadata payload sent when the run event stream is connected.",
  },
);

/**
 * Connected event wrapper for BaoDown SSE streams.
 */
export const BaoDownRunConnectedEventSchema: Type.TObject<
  {
    readonly event: Type.TLiteral<"connected">;
    readonly data: Type.TObject<
      {
        readonly runId: Type.TString;
        readonly definitionId: Type.TString;
        readonly versionId: Type.TString;
        readonly status: Type.TString;
        readonly correlationId: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly requestId: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly idempotencyKey: Type.TUnion<(Type.TString | Type.TNull)[]>;
        readonly timestamp: Type.TString;
      },
      | "correlationId"
      | "requestId"
      | "idempotencyKey"
      | "runId"
      | "timestamp"
      | "definitionId"
      | "versionId"
      | "status",
      never
    >;
  },
  "event" | "data",
  never
> = Type.Object(
  {
    event: Type.Literal("connected"),
    data: BaoDownRunConnectedDataSchema,
  },
  {
    additionalProperties: false,
    description: "SSE connected event for BaoDown run streams.",
  },
);

/**
 * Timeout event payload emitted when the run stream idles past the configured threshold.
 */
export const BaoDownRunStreamTimeoutDataSchema: Type.TObject<
  { readonly runId: Type.TString; readonly timestamp: Type.TString },
  "runId" | "timestamp",
  never
> = Type.Object(
  {
    runId: Type.String({ minLength: 1 }),
    timestamp: Type.String({ minLength: 1, description: "ISO 8601 timestamp." }),
  },
  {
    additionalProperties: false,
    description: "Timeout metadata for BaoDown run event streams.",
  },
);

/**
 * Timeout event wrapper for BaoDown SSE streams.
 */
export const BaoDownRunStreamTimeoutEventSchema: Type.TObject<
  {
    readonly event: Type.TLiteral<"stream:timeout">;
    readonly data: Type.TObject<
      { readonly runId: Type.TString; readonly timestamp: Type.TString },
      "runId" | "timestamp",
      never
    >;
  },
  "event" | "data",
  never
> = Type.Object(
  {
    event: Type.Literal("stream:timeout"),
    data: BaoDownRunStreamTimeoutDataSchema,
  },
  {
    additionalProperties: false,
    description: "SSE timeout event for BaoDown run streams.",
  },
);

/**
 * Runtime event wrapper for BaoDown run lifecycle/node events.
 */
export const BaoDownRunSseEventSchema = Type.Object(
  {
    event: BaoDownRunEventKindSchema,
    data: BaoDownRunEventSchema,
    id: Type.Optional(Type.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "SSE wrapper for BaoDown run lifecycle and node events.",
  },
);

/**
 * Union schema for all SSE payloads emitted by `GET /api/v1/baodown/runs/:id/events`.
 */
export const BaoDownRunStreamEventSchema = Type.Union(
  [
    BaoDownRunConnectedEventSchema,
    BaoDownRunSseEventSchema,
    BaoDownRunStreamTimeoutEventSchema,
    StreamErrorEvent,
  ],
  {
    description:
      "All BaoDown SSE event payloads (connected, run events, timeout, and stream errors).",
  },
);

/**
 * TypeScript type for {@link BaoDownRunStreamEventSchema}.
 */
export type BaoDownRunStreamEvent = Static<typeof BaoDownRunStreamEventSchema>;

// Run Status

/**
 * All known BaoDown run statuses as a readonly tuple.
 *
 * Single source of truth consumed by:
 * - `@shared/types/baodown` (`BaoDownRunStatus` type)
 * - `apps/server/elysia/schemas/baodown.schemas` (TypeBox `BaoDownRunStatusSchema`)
 * - Client composables (`useBaoDownStatus`)
 */
export const BAODOWN_RUN_STATUSES: readonly [
  "PENDING",
  "QUEUED",
  "RUNNING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "TIMEOUT",
] = ["PENDING", "QUEUED", "RUNNING", "COMPLETED", "FAILED", "CANCELLED", "TIMEOUT"] as const;

/**
 * TypeScript type derived from {@link BAODOWN_RUN_STATUSES}.
 */
export type BaoDownRunStatus = (typeof BAODOWN_RUN_STATUSES)[number];

/**
 * Terminal (non-cancellable) run statuses.
 */
export const BAODOWN_TERMINAL_STATUSES: ReadonlySet<BaoDownRunStatus> = new Set([
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "TIMEOUT",
]);

/**
 * Active (in-flight) run statuses.
 *
 * Single source of truth consumed by:
 * - HTML UI helpers (`useBaoDownStatus`)
 * - Any operational guards that need to determine cancellability or polling cadence
 */
export const BAODOWN_ACTIVE_STATUSES: readonly ["PENDING", "QUEUED", "RUNNING"] = [
  "PENDING",
  "QUEUED",
  "RUNNING",
] as const;

/**
 * TypeScript type derived from {@link BAODOWN_ACTIVE_STATUSES}.
 */
export type BaoDownActiveRunStatus = (typeof BAODOWN_ACTIVE_STATUSES)[number];

/**
 * Active (in-flight) run statuses as a set for fast checks.
 */
export const BAODOWN_ACTIVE_STATUS_SET: ReadonlySet<BaoDownRunStatus> = new Set(
  BAODOWN_ACTIVE_STATUSES,
);
