/**
 * `.bao` install runtime schemas.
 *
 * Runtime execution, session, plan, validation, and status payloads used by
 * install and mount lifecycle orchestration.
 *
 * @shared/schemas/bao-install/runtime
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BaoInstallTargetKindSchema } from "./core.schemas.ts";
import { BaoInstallRequestBodySchema } from "./requests.schemas.ts";

/** Supported lifecycle execution modes for `.bao` runtime sessions. */
export const BAO_RUNTIME_EXECUTION_MODES: { readonly install: "install"; readonly mount: "mount" } =
  {
    install: "install",
    mount: "mount",
  } as const;

/**
 * Runtime execution mode type.
 */
export type BaoRuntimeExecutionMode =
  (typeof BAO_RUNTIME_EXECUTION_MODES)[keyof typeof BAO_RUNTIME_EXECUTION_MODES];

/**
 * Runtime execution mode schema.
 */
export const BaoRuntimeExecutionModeSchema: Type.TUnion<
  (Type.TLiteral<"install"> | Type.TLiteral<"mount">)[]
> = Type.Union(
  [
    Type.Literal(BAO_RUNTIME_EXECUTION_MODES.install),
    Type.Literal(BAO_RUNTIME_EXECUTION_MODES.mount),
  ],
  {
    description: "Execution mode for install-backed or local-mount `.bao` lifecycle runs.",
  },
);

/**
 * Runtime session source kinds for `.bao` lifecycle sessions.
 */
export const BAO_RUNTIME_SESSION_SOURCE_KINDS: {
  readonly registry: "registry";
  readonly local: "local";
} = {
  registry: "registry",
  local: "local",
} as const;

/**
 * Runtime session source kind type.
 */
export type BaoRuntimeSessionSourceKind =
  (typeof BAO_RUNTIME_SESSION_SOURCE_KINDS)[keyof typeof BAO_RUNTIME_SESSION_SOURCE_KINDS];

/**
 * Runtime session source kind schema.
 */
export const BaoRuntimeSessionSourceKindSchema: Type.TUnion<
  (Type.TLiteral<"registry"> | Type.TLiteral<"local">)[]
> = Type.Union(
  [
    Type.Literal(BAO_RUNTIME_SESSION_SOURCE_KINDS.registry),
    Type.Literal(BAO_RUNTIME_SESSION_SOURCE_KINDS.local),
  ],
  {
    description: "Source provenance for a `.bao` runtime session.",
  },
);

/**
 * Runtime lifecycle states for installed or mounted `.bao` sessions.
 */
export const BAO_RUNTIME_SESSION_STATES: {
  readonly installed: "installed";
  readonly active: "active";
  readonly inactive: "inactive";
  readonly failed: "failed";
  readonly uninstalled: "uninstalled";
  readonly mounted: "mounted";
  readonly unmounted: "unmounted";
} = {
  installed: "installed",
  active: "active",
  inactive: "inactive",
  failed: "failed",
  uninstalled: "uninstalled",
  mounted: "mounted",
  unmounted: "unmounted",
} as const;

/**
 * Runtime session state type.
 */
export type BaoRuntimeSessionState =
  (typeof BAO_RUNTIME_SESSION_STATES)[keyof typeof BAO_RUNTIME_SESSION_STATES];

/**
 * Runtime session state schema.
 */
export const BaoRuntimeSessionStateSchema: Type.TUnion<
  (
    | Type.TLiteral<"installed">
    | Type.TLiteral<"active">
    | Type.TLiteral<"inactive">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"uninstalled">
    | Type.TLiteral<"mounted">
    | Type.TLiteral<"unmounted">
  )[]
> = Type.Union(
  [
    Type.Literal(BAO_RUNTIME_SESSION_STATES.installed),
    Type.Literal(BAO_RUNTIME_SESSION_STATES.active),
    Type.Literal(BAO_RUNTIME_SESSION_STATES.inactive),
    Type.Literal(BAO_RUNTIME_SESSION_STATES.failed),
    Type.Literal(BAO_RUNTIME_SESSION_STATES.uninstalled),
    Type.Literal(BAO_RUNTIME_SESSION_STATES.mounted),
    Type.Literal(BAO_RUNTIME_SESSION_STATES.unmounted),
  ],
  {
    description: "Lifecycle state for an installed or mounted `.bao` runtime session.",
  },
);

/**
 * Local/ephemeral `.bao` mount request.
 */
export const BaoRuntimeMountRequestSchema = Type.Object(
  {
    request: BaoInstallRequestBodySchema,
    correlationId: Type.Optional(
      Type.String({ minLength: 1, description: "Optional caller correlation id." }),
    ),
  },
  {
    additionalProperties: false,
    description: "Request payload for mounting a `.bao` archive into the local runtime.",
  },
);

/**
 * Local/ephemeral `.bao` mount request type.
 */
export type BaoRuntimeMountRequestV1 = Static<typeof BaoRuntimeMountRequestSchema>;

/**
 * Runtime session selector path param.
 */
export const BaoRuntimeSessionSelectorSchema: Type.TObject<
  { readonly selector: Type.TString },
  "selector",
  never
> = Type.Object(
  {
    selector: Type.String({
      minLength: 1,
      description:
        "Runtime session selector. May be a session id, install run id, manifest name, runtime key, or source ref.",
    }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Runtime session selector type.
 */
export type BaoRuntimeSessionSelectorV1 = Static<typeof BaoRuntimeSessionSelectorSchema>;

/**
 * A single step in an install plan.
 */
export const BaoInstallPlanStepSchema: Type.TObject<
  {
    readonly target: Type.TString;
    readonly kind: typeof BaoInstallTargetKindSchema;
    readonly index: Type.TInteger;
    readonly retryable: Type.TBoolean;
  },
  "target" | "kind" | "index" | "retryable",
  never
> = Type.Object(
  {
    target: Type.String({ minLength: 1, description: "Target identifier." }),
    kind: BaoInstallTargetKindSchema,
    index: Type.Integer({ minimum: 0, description: "Execution index in topological order." }),
    retryable: Type.Boolean({
      description: "Whether a failure in this step can be retried automatically.",
    }),
  },
  { additionalProperties: false },
);

/**
 * `.bao` deterministic execution plan.
 */
export const BaoInstallPlanSchema = Type.Object(
  {
    manifestName: Type.String({ minLength: 1, description: "Manifest name from metadata." }),
    manifestVersion: Type.String({ minLength: 1, description: "Manifest version from metadata." }),
    checksum: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Optional manifest checksum for idempotent replay.",
      }),
    ),
    steps: Type.Array(BaoInstallPlanStepSchema, {
      description: "Ordered execution steps generated from manifest dependencies and priorities.",
    }),
  },
  {
    additionalProperties: false,
    description: "Deterministic execution plan generated by `.bao` install pipeline.",
  },
);

/**
 * `.bao` execution plan type.
 */
export type BaoInstallPlanV1 = Static<typeof BaoInstallPlanSchema>;

/**
 * A single `.bao` validation issue.
 */
export const BaoInstallValidationIssueSchema: Type.TObject<
  {
    readonly path: Type.TString;
    readonly message: Type.TString;
    readonly severity: Type.TUnion<(Type.TLiteral<"error"> | Type.TLiteral<"warning">)[]>;
  },
  "severity" | "path" | "message",
  never
> = Type.Object(
  {
    path: Type.String({ minLength: 1, description: "JSON path or manifest field path." }),
    message: Type.String({ minLength: 1, description: "Human-readable validation message." }),
    severity: Type.Union([Type.Literal("error"), Type.Literal("warning")], {
      description: "Validation severity level.",
    }),
  },
  {
    additionalProperties: false,
    description: "Validation issue emitted by `.bao` validation.",
  },
);

/**
 * `.bao` validation issue type.
 */
export type BaoInstallValidationIssueV1 = Static<typeof BaoInstallValidationIssueSchema>;

/**
 * `.bao` validation response envelope.
 */
export const BaoInstallValidationSchema = Type.Object(
  {
    ok: Type.Literal(true),
    valid: Type.Boolean({
      description: "Whether the manifest passed schema, allowlist, and dependency validation.",
    }),
    issues: Type.Array(BaoInstallValidationIssueSchema, {
      description: "Collected validation issues and warnings.",
    }),
    resolvedInstallOrder: Type.Array(Type.String({ minLength: 1 }), {
      description: "Resolved target execution order when the manifest is installable.",
    }),
    plan: Type.Optional(BaoInstallPlanSchema),
    targetHandlerWarnings: Type.Array(Type.String({ minLength: 1 }), {
      description: "Target handler preflight warnings gathered during validate.",
    }),
    runtimeWarnings: Type.Array(Type.String({ minLength: 1 }), {
      description: "Runtime extension warnings gathered during validate.",
    }),
  },
  {
    additionalProperties: false,
    description: "Canonical `.bao` validation response envelope.",
  },
);

/**
 * `.bao` validation response type.
 */
export type BaoInstallValidationV1 = Static<typeof BaoInstallValidationSchema>;

/**
 * Single `.bao` install log entry.
 */
export const BaoInstallLogEventSchema: Type.TObject<
  {
    readonly phase: Type.TString;
    readonly timestamp: Type.TString;
    readonly message: Type.TString;
    readonly durationMs: Type.TOptional<Type.TInteger>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "message" | "phase" | "timestamp",
  Type.InferOptionalKeys<{
    readonly phase: Type.TString;
    readonly timestamp: Type.TString;
    readonly message: Type.TString;
    readonly durationMs: Type.TOptional<Type.TInteger>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    phase: Type.String({ minLength: 1, description: "Lifecycle phase at event time." }),
    timestamp: Type.String({ format: "date-time", description: "ISO event timestamp." }),
    message: Type.String({ minLength: 1, description: "Human-readable event message." }),
    durationMs: Type.Optional(
      Type.Integer({ minimum: 0, description: "Optional duration of the phase in milliseconds." }),
    ),
    details: Type.Optional(
      Type.Record(Type.String(), Type.Unknown(), { description: "Optional event payload." }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for a log event.
 */
export type BaoInstallLogEvent = Static<typeof BaoInstallLogEventSchema>;

/**
 * `.bao` install status phases.
 */
export const BaoInstallStatusPhaseSchema: Type.TUnion<
  (
    | Type.TLiteral<"queued">
    | Type.TLiteral<"validating">
    | Type.TLiteral<"applying">
    | Type.TLiteral<"active">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"uninstalling">
    | Type.TLiteral<"uninstalled">
  )[]
> = Type.Union(
  [
    Type.Literal("queued"),
    Type.Literal("validating"),
    Type.Literal("applying"),
    Type.Literal("active"),
    Type.Literal("failed"),
    Type.Literal("uninstalling"),
    Type.Literal("uninstalled"),
  ],
  {
    description: "Lifecycle phase values for `.bao` installs.",
  },
);

/**
 * `.bao` install phase type.
 */
export type BaoInstallStatusPhase = Static<typeof BaoInstallStatusPhaseSchema>;

/**
 * `.bao` runtime session payload.
 */
export const BaoRuntimeSessionSchema = Type.Object(
  {
    id: Type.String({ minLength: 1, description: "Canonical runtime session identifier." }),
    runtimeKey: Type.String({ minLength: 1, description: "Stable runtime identity key." }),
    executionMode: BaoRuntimeExecutionModeSchema,
    sourceKind: BaoRuntimeSessionSourceKindSchema,
    sourceRef: Type.String({
      minLength: 1,
      description: "Registry coordinate or local source ref.",
    }),
    state: BaoRuntimeSessionStateSchema,
    manifest: Type.Object(
      {
        name: Type.String({ minLength: 1 }),
        version: Type.String({ minLength: 1 }),
        checksum: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    targetCount: Type.Integer({ minimum: 0 }),
    installRunId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    mountedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    activatedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    deactivatedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    unmountedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
    description: "Canonical runtime lifecycle session for installed or mounted `.bao` manifests.",
  },
);

/**
 * `.bao` runtime session type.
 */
export type BaoRuntimeSessionV1 = Static<typeof BaoRuntimeSessionSchema>;

/**
 * `.bao` runtime session list response.
 */
export const BaoRuntimeSessionListSchema = Type.Object(
  {
    ok: Type.Literal(true),
    sessions: Type.Array(BaoRuntimeSessionSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * `.bao` runtime session list response type.
 */
export type BaoRuntimeSessionListV1 = Static<typeof BaoRuntimeSessionListSchema>;

/**
 * `.bao` status payload.
 */
export const BaoInstallStatusSchema = Type.Object(
  {
    ok: Type.Literal(true),
    id: Type.String({ minLength: 1, description: "Canonical install run identifier." }),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    executionMode: Type.Optional(BaoRuntimeExecutionModeSchema),
    runtimeSessionId: Type.Optional(
      Type.String({ minLength: 1, description: "Linked runtime session identifier." }),
    ),
    runtimeState: Type.Optional(BaoRuntimeSessionStateSchema),
    phase: BaoInstallStatusPhaseSchema,
    manifest: Type.Object(
      {
        name: Type.String({
          minLength: 1,
          description: "Manifest name resolved from manifest metadata.",
        }),
        version: Type.String({
          minLength: 1,
          description: "Manifest version resolved from manifest metadata.",
        }),
      },
      { additionalProperties: false },
    ),
    targetCount: Type.Integer({ minimum: 0, description: "Number of declared targets." }),
    targetNames: Type.Array(Type.String({ minLength: 1 }), {
      description: "Ordered target identifiers for execution visibility.",
    }),
    startedAt: Type.Optional(
      Type.String({ format: "date-time", description: "ISO start timestamp." }),
    ),
    updatedAt: Type.String({ format: "date-time", description: "Last update timestamp." }),
    completedAt: Type.Optional(
      Type.String({ format: "date-time", description: "ISO completion timestamp." }),
    ),
    plan: BaoInstallPlanSchema,
    events: Type.Array(BaoInstallLogEventSchema, {
      description: "Transition and error log events.",
    }),
    error: Type.Optional(
      Type.Record(Type.String(), Type.Unknown(), {
        description: "Error payload when phase is failed.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Canonical `.bao` install status envelope.",
  },
);

/**
 * `.bao` status payload type.
 */
export type BaoInstallStatusV1 = Static<typeof BaoInstallStatusSchema>;
