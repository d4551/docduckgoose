/**
 * `.bao` install runtime schemas.
 *
 * Runtime execution, session, plan, validation, and status payloads used by
 * install and mount lifecycle orchestration.
 *
 * @shared/schemas/bao-install/runtime
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const BaoRuntimeExecutionModeSchema: TUnion<(TLiteral<"install"> | TLiteral<"mount">)[]> =
  TypeExports.Union(
    [
      TypeExports.Literal(BAO_RUNTIME_EXECUTION_MODES.install),
      TypeExports.Literal(BAO_RUNTIME_EXECUTION_MODES.mount),
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
export const BaoRuntimeSessionSourceKindSchema: TUnion<
  (TLiteral<"registry"> | TLiteral<"local">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal(BAO_RUNTIME_SESSION_SOURCE_KINDS.registry),
    TypeExports.Literal(BAO_RUNTIME_SESSION_SOURCE_KINDS.local),
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
export const BaoRuntimeSessionStateSchema: TUnion<
  (
    | TLiteral<"installed">
    | TLiteral<"active">
    | TLiteral<"inactive">
    | TLiteral<"failed">
    | TLiteral<"uninstalled">
    | TLiteral<"mounted">
    | TLiteral<"unmounted">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.installed),
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.active),
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.inactive),
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.failed),
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.uninstalled),
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.mounted),
    TypeExports.Literal(BAO_RUNTIME_SESSION_STATES.unmounted),
  ],
  {
    description: "Lifecycle state for an installed or mounted `.bao` runtime session.",
  },
);

/**
 * Local/ephemeral `.bao` mount request.
 */
export const BaoRuntimeMountRequestSchema = TypeExports.Object(
  {
    request: BaoInstallRequestBodySchema,
    correlationId: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Optional caller correlation id." }),
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
export const BaoRuntimeSessionSelectorSchema: TObject<
  { readonly selector: TString },
  "selector",
  never
> = TypeExports.Object(
  {
    selector: TypeExports.String({
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
export const BaoInstallPlanStepSchema: TObject<
  {
    readonly target: TString;
    readonly kind: typeof BaoInstallTargetKindSchema;
    readonly index: TInteger;
    readonly retryable: TBoolean;
  },
  "target" | "kind" | "index" | "retryable",
  never
> = TypeExports.Object(
  {
    target: TypeExports.String({ minLength: 1, description: "Target identifier." }),
    kind: BaoInstallTargetKindSchema,
    index: TypeExports.Integer({
      minimum: 0,
      description: "Execution index in topological order.",
    }),
    retryable: TypeExports.Boolean({
      description: "Whether a failure in this step can be retried automatically.",
    }),
  },
  { additionalProperties: false },
);

/**
 * `.bao` deterministic execution plan.
 */
export const BaoInstallPlanSchema = TypeExports.Object(
  {
    manifestName: TypeExports.String({ minLength: 1, description: "Manifest name from metadata." }),
    manifestVersion: TypeExports.String({
      minLength: 1,
      description: "Manifest version from metadata.",
    }),
    checksum: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional manifest checksum for idempotent replay.",
      }),
    ),
    steps: TypeExports.Array(BaoInstallPlanStepSchema, {
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
export const BaoInstallValidationIssueSchema: TObject<
  {
    readonly path: TString;
    readonly message: TString;
    readonly severity: TUnion<(TLiteral<"error"> | TLiteral<"warning">)[]>;
  },
  "severity" | "path" | "message",
  never
> = TypeExports.Object(
  {
    path: TypeExports.String({ minLength: 1, description: "JSON path or manifest field path." }),
    message: TypeExports.String({
      minLength: 1,
      description: "Human-readable validation message.",
    }),
    severity: TypeExports.Union([TypeExports.Literal("error"), TypeExports.Literal("warning")], {
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
export const BaoInstallValidationSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    valid: TypeExports.Boolean({
      description: "Whether the manifest passed schema, allowlist, and dependency validation.",
    }),
    issues: TypeExports.Array(BaoInstallValidationIssueSchema, {
      description: "Collected validation issues and warnings.",
    }),
    resolvedInstallOrder: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Resolved target execution order when the manifest is installable.",
    }),
    plan: TypeExports.Optional(BaoInstallPlanSchema),
    targetHandlerWarnings: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Target handler preflight warnings gathered during validate.",
    }),
    runtimeWarnings: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
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
export const BaoInstallLogEventSchema: TObject<
  {
    readonly phase: TString;
    readonly timestamp: TString;
    readonly message: TString;
    readonly durationMs: TOptional<TInteger>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  },
  "message" | "phase" | "timestamp",
  InferOptionalKeys<{
    readonly phase: TString;
    readonly timestamp: TString;
    readonly message: TString;
    readonly durationMs: TOptional<TInteger>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    phase: TypeExports.String({ minLength: 1, description: "Lifecycle phase at event time." }),
    timestamp: TypeExports.String({ format: "date-time", description: "ISO event timestamp." }),
    message: TypeExports.String({ minLength: 1, description: "Human-readable event message." }),
    durationMs: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 0,
        description: "Optional duration of the phase in milliseconds.",
      }),
    ),
    details: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown(), {
        description: "Optional event payload.",
      }),
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
export const BaoInstallStatusPhaseSchema: TUnion<
  (
    | TLiteral<"queued">
    | TLiteral<"validating">
    | TLiteral<"applying">
    | TLiteral<"active">
    | TLiteral<"failed">
    | TLiteral<"uninstalling">
    | TLiteral<"uninstalled">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("queued"),
    TypeExports.Literal("validating"),
    TypeExports.Literal("applying"),
    TypeExports.Literal("active"),
    TypeExports.Literal("failed"),
    TypeExports.Literal("uninstalling"),
    TypeExports.Literal("uninstalled"),
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
export const BaoRuntimeSessionSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1, description: "Canonical runtime session identifier." }),
    runtimeKey: TypeExports.String({ minLength: 1, description: "Stable runtime identity key." }),
    executionMode: BaoRuntimeExecutionModeSchema,
    sourceKind: BaoRuntimeSessionSourceKindSchema,
    sourceRef: TypeExports.String({
      minLength: 1,
      description: "Registry coordinate or local source ref.",
    }),
    state: BaoRuntimeSessionStateSchema,
    manifest: TypeExports.Object(
      {
        name: TypeExports.String({ minLength: 1 }),
        version: TypeExports.String({ minLength: 1 }),
        checksum: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    targetCount: TypeExports.Integer({ minimum: 0 }),
    installRunId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    mountedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    activatedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    deactivatedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    unmountedAt: TypeExports.Union([
      TypeExports.String({ format: "date-time" }),
      TypeExports.Null(),
    ]),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
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
export const BaoRuntimeSessionListSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    sessions: TypeExports.Array(BaoRuntimeSessionSchema),
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
export const BaoInstallStatusSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    id: TypeExports.String({ minLength: 1, description: "Canonical install run identifier." }),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    executionMode: TypeExports.Optional(BaoRuntimeExecutionModeSchema),
    runtimeSessionId: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Linked runtime session identifier." }),
    ),
    runtimeState: TypeExports.Optional(BaoRuntimeSessionStateSchema),
    phase: BaoInstallStatusPhaseSchema,
    manifest: TypeExports.Object(
      {
        name: TypeExports.String({
          minLength: 1,
          description: "Manifest name resolved from manifest metadata.",
        }),
        version: TypeExports.String({
          minLength: 1,
          description: "Manifest version resolved from manifest metadata.",
        }),
      },
      { additionalProperties: false },
    ),
    targetCount: TypeExports.Integer({ minimum: 0, description: "Number of declared targets." }),
    targetNames: TypeExports.Array(TypeExports.String({ minLength: 1 }), {
      description: "Ordered target identifiers for execution visibility.",
    }),
    startedAt: TypeExports.Optional(
      TypeExports.String({ format: "date-time", description: "ISO start timestamp." }),
    ),
    updatedAt: TypeExports.String({ format: "date-time", description: "Last update timestamp." }),
    completedAt: TypeExports.Optional(
      TypeExports.String({ format: "date-time", description: "ISO completion timestamp." }),
    ),
    plan: BaoInstallPlanSchema,
    events: TypeExports.Array(BaoInstallLogEventSchema, {
      description: "Transition and error log events.",
    }),
    error: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown(), {
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
