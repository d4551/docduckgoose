/**
 * Fleet orchestration schemas.
 *
 * Shared TypeBox schemas for fleet run lifecycle and assignment APIs.
 *
 * @shared/schemas/fleet
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Fleet execution domains.
 */
export const FleetDomainSchema: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]> =
  TypeExports.Union([TypeExports.Literal("drone"), TypeExports.Literal("vehicle")], {});

/**
 * Fleet run lifecycle states.
 */
export const FleetRunStatusSchema: TUnion<
  (
    | TLiteral<"idle">
    | TLiteral<"loading">
    | TLiteral<"uploading">
    | TLiteral<"running">
    | TLiteral<"success">
    | TLiteral<"empty">
    | TLiteral<"error_retryable">
    | TLiteral<"error_non_retryable">
    | TLiteral<"unauthorized">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("idle"),
    TypeExports.Literal("loading"),
    TypeExports.Literal("uploading"),
    TypeExports.Literal("running"),
    TypeExports.Literal("success"),
    TypeExports.Literal("empty"),
    TypeExports.Literal("error_retryable"),
    TypeExports.Literal("error_non_retryable"),
    TypeExports.Literal("unauthorized"),
  ],
  {},
);

/**
 * Assignment unit type.
 */
export const FleetUnitTypeSchema: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]> =
  TypeExports.Union([TypeExports.Literal("drone"), TypeExports.Literal("vehicle")], {});

/**
 * Fleet assignment candidate schema.
 */
export const FleetAssignmentCandidateSchema: TObject<
  {
    readonly unitId: TString;
    readonly unitType: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
    readonly domain: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
    readonly availableCapacity: TNumber;
    readonly locality: TOptional<TNumber>;
    readonly capabilities: TArray<TString>;
  },
  "capabilities" | "unitId" | "unitType" | "domain" | "availableCapacity",
  "locality"
> = TypeExports.Object(
  {
    unitId: TypeExports.String({ minLength: 1 }),
    unitType: FleetUnitTypeSchema,
    domain: FleetDomainSchema,
    availableCapacity: TypeExports.Number(),
    locality: TypeExports.Optional(TypeExports.Number()),
    capabilities: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet assignment score schema.
 */
export const FleetAssignmentScoreSchema: TObject<
  {
    readonly unitId: TString;
    readonly unitType: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
    readonly score: TNumber;
    readonly reasons: TArray<TString>;
    readonly selected: TBoolean;
  },
  "reasons" | "unitId" | "unitType" | "score" | "selected",
  never
> = TypeExports.Object(
  {
    unitId: TypeExports.String({ minLength: 1 }),
    unitType: FleetUnitTypeSchema,
    score: TypeExports.Number(),
    reasons: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    selected: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Request payload for assignment preview.
 */
export const FleetAssignmentPreviewRequestSchema = TypeExports.Object(
  {
    domain: FleetDomainSchema,
    workload: TypeExports.Number({ minimum: 0 }),
    requiredCapabilities: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    candidates: TypeExports.Array(FleetAssignmentCandidateSchema),
    maxSelections: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    localityPreference: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/**
 * Response payload for assignment preview.
 */
export const FleetAssignmentPreviewResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly domain: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
    readonly ranking: TArray<
      TObject<
        {
          readonly unitId: TString;
          readonly unitType: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
          readonly score: TNumber;
          readonly reasons: TArray<TString>;
          readonly selected: TBoolean;
        },
        "unitId" | "unitType" | "reasons" | "score" | "selected",
        never
      >
    >;
    readonly selectedUnitIds: TArray<TString>;
    readonly timestamp: TString;
  },
  "domain" | "ok" | "ranking" | "selectedUnitIds" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    domain: FleetDomainSchema,
    ranking: TypeExports.Array(FleetAssignmentScoreSchema),
    selectedUnitIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet mission schema.
 */
export const FleetMissionSchema: TObject<
  {
    readonly workload: TNumber;
    readonly requiredCapabilities: TArray<TString>;
    readonly candidates: TArray<
      TObject<
        {
          readonly unitId: TString;
          readonly unitType: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
          readonly domain: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
          readonly availableCapacity: TNumber;
          readonly locality: TOptional<TNumber>;
          readonly capabilities: TArray<TString>;
        },
        "capabilities" | "unitId" | "unitType" | "domain" | "availableCapacity",
        "locality"
      >
    >;
    readonly localityPreference: TOptional<TNumber>;
  },
  "requiredCapabilities" | "candidates" | "workload",
  "localityPreference"
> = TypeExports.Object(
  {
    workload: TypeExports.Number({ minimum: 0 }),
    requiredCapabilities: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    candidates: TypeExports.Array(FleetAssignmentCandidateSchema),
    localityPreference: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/**
 * Fleet run creation request.
 */
export const FleetRunCreateRequestSchema = TypeExports.Object(
  {
    domain: FleetDomainSchema,
    mission: FleetMissionSchema,
    constraints: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    ),
    policyIds: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    requestedBy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet run summary schema.
 */
export const FleetRunSummarySchema = TypeExports.Object(
  {
    runId: TypeExports.String({ minLength: 1 }),
    domain: FleetDomainSchema,
    status: FleetRunStatusSchema,
    correlationId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    startedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    endedAt: TypeExports.Union([TypeExports.String({ format: "date-time" }), TypeExports.Null()]),
    lastSequence: TypeExports.Integer({ minimum: 0 }),
    assignmentCount: TypeExports.Integer({ minimum: 0 }),
    summary: TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
  },
  { additionalProperties: false },
);

/**
 * Fleet run creation response.
 */
export const FleetRunCreateResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    run: FleetRunSummarySchema,
    cursor: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run snapshot response.
 */
export const FleetRunSnapshotResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    run: FleetRunSummarySchema,
    assignments: TypeExports.Array(FleetAssignmentScoreSchema),
    counters: TypeExports.Object(
      {
        events: TypeExports.Integer({ minimum: 0 }),
        incidents: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run cancel response.
 */
export const FleetRunCancelResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly runId: TString;
    readonly status: TUnion<
      (
        | TLiteral<"idle">
        | TLiteral<"loading">
        | TLiteral<"uploading">
        | TLiteral<"running">
        | TLiteral<"success">
        | TLiteral<"empty">
        | TLiteral<"error_retryable">
        | TLiteral<"error_non_retryable">
        | TLiteral<"unauthorized">
      )[]
    >;
    readonly timestamp: TString;
  },
  "runId" | "status" | "ok" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    runId: TypeExports.String({ minLength: 1 }),
    status: FleetRunStatusSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet adapter metadata response row.
 */
export const FleetAdapterSchema: TObject<
  {
    readonly namespace: TString;
    readonly adapterName: TString;
    readonly domain: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
    readonly capabilities: TArray<TString>;
    readonly authRequirements: TArray<TString>;
    readonly enabled: TBoolean;
  },
  "capabilities" | "authRequirements" | "namespace" | "adapterName" | "domain" | "enabled",
  never
> = TypeExports.Object(
  {
    namespace: TypeExports.String({ minLength: 1 }),
    adapterName: TypeExports.String({ minLength: 1 }),
    domain: FleetDomainSchema,
    capabilities: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    authRequirements: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    enabled: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Fleet adapter list response.
 */
export const FleetAdapterListResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly adapters: TArray<
      TObject<
        {
          readonly namespace: TString;
          readonly adapterName: TString;
          readonly domain: TUnion<(TLiteral<"drone"> | TLiteral<"vehicle">)[]>;
          readonly capabilities: TArray<TString>;
          readonly authRequirements: TArray<TString>;
          readonly enabled: TBoolean;
        },
        "capabilities" | "authRequirements" | "namespace" | "adapterName" | "domain" | "enabled",
        never
      >
    >;
    readonly timestamp: TString;
  },
  "ok" | "adapters" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    adapters: TypeExports.Array(FleetAdapterSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run create request type.
 */
export type FleetRunCreateRequest = Static<typeof FleetRunCreateRequestSchema>;

/**
 * Fleet run status type.
 */
export type FleetRunStatus = Static<typeof FleetRunStatusSchema>;

/**
 * Fleet domain type.
 */
export type FleetDomain = Static<typeof FleetDomainSchema>;

/**
 * Fleet assignment preview request type.
 */
export type FleetAssignmentPreviewRequest = Static<typeof FleetAssignmentPreviewRequestSchema>;

/**
 * Fleet assignment score type.
 */
export type FleetAssignmentScore = Static<typeof FleetAssignmentScoreSchema>;

/**
 * Fleet run summary type.
 */
export type FleetRunSummary = Static<typeof FleetRunSummarySchema>;

/**
 * Fleet adapter metadata type.
 */
export type FleetAdapter = Static<typeof FleetAdapterSchema>;
