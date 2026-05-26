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

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUndefined,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "../json.schemas.ts";
import { StreamErrorEvent } from "../streaming.schemas.ts";
import {
  BAODOWN_CONTROL_EDGE_KIND,
  BAODOWN_DATA_EDGE_KIND,
  BAODOWN_GRAPH_SCHEMA_VERSION as BAODOWN_GRAPH_SCHEMA_VERSION_VALUE,
} from "./baodown-graph-contract.ts";

/**
 * Current persisted graph schema version supported by this build.
 */
export const BAODOWN_GRAPH_SCHEMA_VERSION: typeof BAODOWN_GRAPH_SCHEMA_VERSION_VALUE =
  BAODOWN_GRAPH_SCHEMA_VERSION_VALUE;

/**
 * Supported persisted graph schema versions.
 */
function buildBaoDownGraphSchemaVersionSchema() {
  return TypeExports.Union([TypeExports.Literal(BAODOWN_GRAPH_SCHEMA_VERSION)], {
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
export const BaoDownEdgeKindSchema: TUnion<(TLiteral<"control"> | TLiteral<"data">)[]> =
  TypeExports.Union(
    [TypeExports.Literal(BAODOWN_CONTROL_EDGE_KIND), TypeExports.Literal(BAODOWN_DATA_EDGE_KIND)],
    {
      description: "Edge kind for BaoDown graphs.",
    },
  );

/**
 * TypeScript type for {@link BaoDownEdgeKindSchema}.
 */
export type BaoDownEdgeKind = Static<typeof BaoDownEdgeKindSchema>;

/**
 * Node position in the editor coordinate space.
 */
export const BaoDownNodePositionSchema: TObject<
  { readonly x: TNumber; readonly y: TNumber },
  "x" | "y",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number({ description: "X coordinate." }),
    y: TypeExports.Number({ description: "Y coordinate." }),
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
export const BaoDownPortSchema: TObject<
  {
    readonly id: TString;
    readonly label: TOptional<TString>;
    readonly kind: TUnion<(TLiteral<"control"> | TLiteral<"data">)[]>;
    readonly required: TOptional<TBoolean>;
  },
  "id" | "kind",
  InferOptionalKeys<{
    readonly id: TString;
    readonly label: TOptional<TString>;
    readonly kind: TUnion<(TLiteral<"control"> | TLiteral<"data">)[]>;
    readonly required: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    id: TypeExports.String({
      minLength: 1,
      description: "Stable port id (unique within the node).",
    }),
    label: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Human-readable label." }),
    ),
    kind: BaoDownEdgeKindSchema,
    required: TypeExports.Optional(
      TypeExports.Boolean({
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
export const BaoDownNodePortsSchema = TypeExports.Object(
  {
    inputs: TypeExports.Array(BaoDownPortSchema, { description: "Input ports." }),
    outputs: TypeExports.Array(BaoDownPortSchema, { description: "Output ports." }),
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
export const BaoDownNodeSchema = TypeExports.Object(
  {
    id: TypeExports.String({
      minLength: 1,
      description: "Stable node id (unique within the graph).",
    }),
    type: TypeExports.String({
      minLength: 1,
      description: "Node type id (resolved via the node catalog/registry).",
    }),
    position: BaoDownNodePositionSchema,
    ports: BaoDownNodePortsSchema,
    config: TypeExports.Record(TypeExports.String({ minLength: 1 }), JsonValueSchema, {
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
export const BaoDownEdgeSchema: TObject<
  {
    readonly fromNode: TString;
    readonly fromPort: TString;
    readonly toNode: TString;
    readonly toPort: TString;
    readonly kind: TUnion<(TLiteral<"control"> | TLiteral<"data">)[]>;
  },
  "kind" | "fromNode" | "fromPort" | "toNode" | "toPort",
  never
> = TypeExports.Object(
  {
    fromNode: TypeExports.String({ minLength: 1, description: "Source node id." }),
    fromPort: TypeExports.String({ minLength: 1, description: "Source port id." }),
    toNode: TypeExports.String({ minLength: 1, description: "Target node id." }),
    toPort: TypeExports.String({ minLength: 1, description: "Target port id." }),
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
export const BaoDownGraphSchema = TypeExports.Object(
  {
    schemaVersion: BaoDownGraphSchemaVersionSchema,
    nodes: TypeExports.Array(BaoDownNodeSchema),
    edges: TypeExports.Array(BaoDownEdgeSchema),
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
export const BaoDownNodeOutputSchema: TUnion<
  (TUnknown | TRecord<TString, TUnion<(TUnknown | TUndefined)[]>>)[]
> = TypeExports.Union(
  [
    JsonValueSchema,
    TypeExports.Record(
      TypeExports.String(),
      TypeExports.Union([JsonValueSchema, TypeExports.Undefined()]),
      {
        description: "Multi-port output keyed by port id.",
      },
    ),
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
export const BaoDownTriggerKindSchema: TUnion<
  (TLiteral<"manual"> | TLiteral<"schedule"> | TLiteral<"api"> | TLiteral<"webhook">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("manual"),
    TypeExports.Literal("schedule"),
    TypeExports.Literal("api"),
    TypeExports.Literal("webhook"),
  ],
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
export const BaoDownManualTriggerSchema: TObject<
  { readonly kind: TLiteral<"manual"> },
  "kind",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.Literal("manual"),
  },
  { additionalProperties: false },
);

/**
 * Schedule trigger definition.
 */
export const BaoDownScheduleTriggerSchema: TObject<
  {
    readonly kind: TLiteral<"schedule">;
    readonly cron: TString;
    readonly timezone: TString;
    readonly enabled: TBoolean;
  },
  "kind" | "cron" | "timezone" | "enabled",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.Literal("schedule"),
    cron: TypeExports.String({ minLength: 1, description: "Cron expression." }),
    timezone: TypeExports.String({ minLength: 1, description: "IANA timezone id." }),
    enabled: TypeExports.Boolean({ description: "Whether this schedule is enabled." }),
  },
  { additionalProperties: false },
);

/**
 * API trigger definition.
 */
export const BaoDownApiTriggerSchema: TObject<
  { readonly kind: TLiteral<"api">; readonly enabled: TBoolean },
  "kind" | "enabled",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.Literal("api"),
    enabled: TypeExports.Boolean({ description: "Whether this API trigger is enabled." }),
  },
  { additionalProperties: false },
);

/**
 * Webhook trigger definition.
 */
export const BaoDownWebhookTriggerSchema: TObject<
  { readonly kind: TLiteral<"webhook">; readonly enabled: TBoolean },
  "kind" | "enabled",
  never
> = TypeExports.Object(
  {
    kind: TypeExports.Literal("webhook"),
    enabled: TypeExports.Boolean({ description: "Whether this webhook trigger is enabled." }),
  },
  { additionalProperties: false },
);

/**
 * Flow trigger definition schema.
 */
export const BaoDownTriggerSchema: TUnion<
  (
    | TObject<{ readonly kind: TLiteral<"manual"> }, "kind", never>
    | TObject<
        {
          readonly kind: TLiteral<"schedule">;
          readonly cron: TString;
          readonly timezone: TString;
          readonly enabled: TBoolean;
        },
        "kind" | "cron" | "timezone" | "enabled",
        never
      >
    | TObject<
        { readonly kind: TLiteral<"api">; readonly enabled: TBoolean },
        "kind" | "enabled",
        never
      >
    | TObject<
        { readonly kind: TLiteral<"webhook">; readonly enabled: TBoolean },
        "kind" | "enabled",
        never
      >
  )[]
> = TypeExports.Union(
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
export const BaoDownRunContextSchema = TypeExports.Object(
  {
    trigger: BaoDownTriggerSchema,
    input: TypeExports.Optional(JsonValueSchema),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    requestId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    variables: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), JsonValueSchema, {
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
export const BaoDownRunEventKindSchema: TUnion<
  (
    | TLiteral<"run.started">
    | TLiteral<"run.completed">
    | TLiteral<"run.failed">
    | TLiteral<"run.cancelled">
    | TLiteral<"node.started">
    | TLiteral<"node.completed">
    | TLiteral<"node.failed">
    | TLiteral<"node.log">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("run.started"),
    TypeExports.Literal("run.completed"),
    TypeExports.Literal("run.failed"),
    TypeExports.Literal("run.cancelled"),
    TypeExports.Literal("node.started"),
    TypeExports.Literal("node.completed"),
    TypeExports.Literal("node.failed"),
    TypeExports.Literal("node.log"),
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
export const BaoDownRunEventSchema = TypeExports.Object(
  {
    runId: TypeExports.String({ minLength: 1 }),
    seq: TypeExports.Number({ minimum: 0 }),
    kind: BaoDownRunEventKindSchema,
    timestamp: TypeExports.String({ minLength: 1, description: "ISO 8601 timestamp." }),
    nodeId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    payload: TypeExports.Optional(JsonValueSchema),
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
export const BaoDownRunConnectedDataSchema: TObject<
  {
    readonly runId: TString;
    readonly definitionId: TString;
    readonly versionId: TString;
    readonly status: TString;
    readonly correlationId: TUnion<(TString | TNull)[]>;
    readonly requestId: TUnion<(TString | TNull)[]>;
    readonly idempotencyKey: TUnion<(TString | TNull)[]>;
    readonly timestamp: TString;
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
> = TypeExports.Object(
  {
    runId: TypeExports.String({ minLength: 1 }),
    definitionId: TypeExports.String({ minLength: 1 }),
    versionId: TypeExports.String({ minLength: 1 }),
    status: TypeExports.String({ minLength: 1 }),
    correlationId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    requestId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    idempotencyKey: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    timestamp: TypeExports.String({ minLength: 1, description: "ISO 8601 timestamp." }),
  },
  {
    additionalProperties: false,
    description: "Initial metadata payload sent when the run event stream is connected.",
  },
);

/**
 * Connected event wrapper for BaoDown SSE streams.
 */
export const BaoDownRunConnectedEventSchema: TObject<
  {
    readonly event: TLiteral<"connected">;
    readonly data: TObject<
      {
        readonly runId: TString;
        readonly definitionId: TString;
        readonly versionId: TString;
        readonly status: TString;
        readonly correlationId: TUnion<(TString | TNull)[]>;
        readonly requestId: TUnion<(TString | TNull)[]>;
        readonly idempotencyKey: TUnion<(TString | TNull)[]>;
        readonly timestamp: TString;
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
> = TypeExports.Object(
  {
    event: TypeExports.Literal("connected"),
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
export const BaoDownRunStreamTimeoutDataSchema: TObject<
  { readonly runId: TString; readonly timestamp: TString },
  "runId" | "timestamp",
  never
> = TypeExports.Object(
  {
    runId: TypeExports.String({ minLength: 1 }),
    timestamp: TypeExports.String({ minLength: 1, description: "ISO 8601 timestamp." }),
  },
  {
    additionalProperties: false,
    description: "Timeout metadata for BaoDown run event streams.",
  },
);

/**
 * Timeout event wrapper for BaoDown SSE streams.
 */
export const BaoDownRunStreamTimeoutEventSchema: TObject<
  {
    readonly event: TLiteral<"stream:timeout">;
    readonly data: TObject<
      { readonly runId: TString; readonly timestamp: TString },
      "runId" | "timestamp",
      never
    >;
  },
  "event" | "data",
  never
> = TypeExports.Object(
  {
    event: TypeExports.Literal("stream:timeout"),
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
export const BaoDownRunSseEventSchema = TypeExports.Object(
  {
    event: BaoDownRunEventKindSchema,
    data: BaoDownRunEventSchema,
    id: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "SSE wrapper for BaoDown run lifecycle and node events.",
  },
);

/**
 * Union schema for all SSE payloads emitted by `GET /api/v1/baodown/runs/:id/events`.
 */
export const BaoDownRunStreamEventSchema = TypeExports.Union(
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
