/**
 * Fleet orchestration schemas.
 *
 * Shared TypeBox schemas for fleet run lifecycle and assignment APIs.
 *
 * @shared/schemas/fleet
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Fleet execution domains.
 */
export const FleetDomainSchema: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]> =
  Type.Union([Type.Literal("drone"), Type.Literal("vehicle")], {});

/**
 * Fleet run lifecycle states.
 */
export const FleetRunStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"idle">
    | Type.TLiteral<"loading">
    | Type.TLiteral<"uploading">
    | Type.TLiteral<"running">
    | Type.TLiteral<"success">
    | Type.TLiteral<"empty">
    | Type.TLiteral<"error_retryable">
    | Type.TLiteral<"error_non_retryable">
    | Type.TLiteral<"unauthorized">
  )[]
> = Type.Union(
  [
    Type.Literal("idle"),
    Type.Literal("loading"),
    Type.Literal("uploading"),
    Type.Literal("running"),
    Type.Literal("success"),
    Type.Literal("empty"),
    Type.Literal("error_retryable"),
    Type.Literal("error_non_retryable"),
    Type.Literal("unauthorized"),
  ],
  {},
);

/**
 * Assignment unit type.
 */
export const FleetUnitTypeSchema: Type.TUnion<
  (Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]
> = Type.Union([Type.Literal("drone"), Type.Literal("vehicle")], {});

/**
 * Fleet assignment candidate schema.
 */
export const FleetAssignmentCandidateSchema: Type.TObject<
  {
    readonly unitId: Type.TString;
    readonly unitType: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
    readonly domain: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
    readonly availableCapacity: Type.TNumber;
    readonly locality: Type.TOptional<Type.TNumber>;
    readonly capabilities: Type.TArray<Type.TString>;
  },
  "capabilities" | "unitId" | "unitType" | "domain" | "availableCapacity",
  "locality"
> = Type.Object(
  {
    unitId: Type.String({ minLength: 1 }),
    unitType: FleetUnitTypeSchema,
    domain: FleetDomainSchema,
    availableCapacity: Type.Number(),
    locality: Type.Optional(Type.Number()),
    capabilities: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet assignment score schema.
 */
export const FleetAssignmentScoreSchema: Type.TObject<
  {
    readonly unitId: Type.TString;
    readonly unitType: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
    readonly score: Type.TNumber;
    readonly reasons: Type.TArray<Type.TString>;
    readonly selected: Type.TBoolean;
  },
  "reasons" | "unitId" | "unitType" | "score" | "selected",
  never
> = Type.Object(
  {
    unitId: Type.String({ minLength: 1 }),
    unitType: FleetUnitTypeSchema,
    score: Type.Number(),
    reasons: Type.Array(Type.String({ minLength: 1 })),
    selected: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Request payload for assignment preview.
 */
export const FleetAssignmentPreviewRequestSchema = Type.Object(
  {
    domain: FleetDomainSchema,
    workload: Type.Number({ minimum: 0 }),
    requiredCapabilities: Type.Array(Type.String({ minLength: 1 })),
    candidates: Type.Array(FleetAssignmentCandidateSchema),
    maxSelections: Type.Optional(Type.Integer({ minimum: 1 })),
    localityPreference: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/**
 * Response payload for assignment preview.
 */
export const FleetAssignmentPreviewResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly domain: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
    readonly ranking: Type.TArray<
      Type.TObject<
        {
          readonly unitId: Type.TString;
          readonly unitType: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
          readonly score: Type.TNumber;
          readonly reasons: Type.TArray<Type.TString>;
          readonly selected: Type.TBoolean;
        },
        "unitId" | "unitType" | "reasons" | "score" | "selected",
        never
      >
    >;
    readonly selectedUnitIds: Type.TArray<Type.TString>;
    readonly timestamp: Type.TString;
  },
  "domain" | "ok" | "ranking" | "selectedUnitIds" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    domain: FleetDomainSchema,
    ranking: Type.Array(FleetAssignmentScoreSchema),
    selectedUnitIds: Type.Array(Type.String({ minLength: 1 })),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet mission schema.
 */
export const FleetMissionSchema: Type.TObject<
  {
    readonly workload: Type.TNumber;
    readonly requiredCapabilities: Type.TArray<Type.TString>;
    readonly candidates: Type.TArray<
      Type.TObject<
        {
          readonly unitId: Type.TString;
          readonly unitType: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
          readonly domain: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
          readonly availableCapacity: Type.TNumber;
          readonly locality: Type.TOptional<Type.TNumber>;
          readonly capabilities: Type.TArray<Type.TString>;
        },
        "capabilities" | "unitId" | "unitType" | "domain" | "availableCapacity",
        "locality"
      >
    >;
    readonly localityPreference: Type.TOptional<Type.TNumber>;
  },
  "requiredCapabilities" | "candidates" | "workload",
  "localityPreference"
> = Type.Object(
  {
    workload: Type.Number({ minimum: 0 }),
    requiredCapabilities: Type.Array(Type.String({ minLength: 1 })),
    candidates: Type.Array(FleetAssignmentCandidateSchema),
    localityPreference: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/**
 * Fleet run creation request.
 */
export const FleetRunCreateRequestSchema = Type.Object(
  {
    domain: FleetDomainSchema,
    mission: FleetMissionSchema,
    constraints: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    policyIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    requestedBy: Type.Optional(Type.String({ minLength: 1 })),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Fleet run summary schema.
 */
export const FleetRunSummarySchema = Type.Object(
  {
    runId: Type.String({ minLength: 1 }),
    domain: FleetDomainSchema,
    status: FleetRunStatusSchema,
    correlationId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    startedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    endedAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()]),
    lastSequence: Type.Integer({ minimum: 0 }),
    assignmentCount: Type.Integer({ minimum: 0 }),
    summary: Type.Record(Type.String(), Type.Unknown()),
  },
  { additionalProperties: false },
);

/**
 * Fleet run creation response.
 */
export const FleetRunCreateResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    run: FleetRunSummarySchema,
    cursor: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run snapshot response.
 */
export const FleetRunSnapshotResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    run: FleetRunSummarySchema,
    assignments: Type.Array(FleetAssignmentScoreSchema),
    counters: Type.Object(
      {
        events: Type.Integer({ minimum: 0 }),
        incidents: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet run cancel response.
 */
export const FleetRunCancelResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly runId: Type.TString;
    readonly status: Type.TUnion<
      (
        | Type.TLiteral<"idle">
        | Type.TLiteral<"loading">
        | Type.TLiteral<"uploading">
        | Type.TLiteral<"running">
        | Type.TLiteral<"success">
        | Type.TLiteral<"empty">
        | Type.TLiteral<"error_retryable">
        | Type.TLiteral<"error_non_retryable">
        | Type.TLiteral<"unauthorized">
      )[]
    >;
    readonly timestamp: Type.TString;
  },
  "runId" | "status" | "ok" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    runId: Type.String({ minLength: 1 }),
    status: FleetRunStatusSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Fleet adapter metadata response row.
 */
export const FleetAdapterSchema: Type.TObject<
  {
    readonly namespace: Type.TString;
    readonly adapterName: Type.TString;
    readonly domain: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
    readonly capabilities: Type.TArray<Type.TString>;
    readonly authRequirements: Type.TArray<Type.TString>;
    readonly enabled: Type.TBoolean;
  },
  "capabilities" | "authRequirements" | "namespace" | "adapterName" | "domain" | "enabled",
  never
> = Type.Object(
  {
    namespace: Type.String({ minLength: 1 }),
    adapterName: Type.String({ minLength: 1 }),
    domain: FleetDomainSchema,
    capabilities: Type.Array(Type.String({ minLength: 1 })),
    authRequirements: Type.Array(Type.String({ minLength: 1 })),
    enabled: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Fleet adapter list response.
 */
export const FleetAdapterListResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly adapters: Type.TArray<
      Type.TObject<
        {
          readonly namespace: Type.TString;
          readonly adapterName: Type.TString;
          readonly domain: Type.TUnion<(Type.TLiteral<"drone"> | Type.TLiteral<"vehicle">)[]>;
          readonly capabilities: Type.TArray<Type.TString>;
          readonly authRequirements: Type.TArray<Type.TString>;
          readonly enabled: Type.TBoolean;
        },
        "capabilities" | "authRequirements" | "namespace" | "adapterName" | "domain" | "enabled",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "adapters" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    adapters: Type.Array(FleetAdapterSchema),
    timestamp: Type.String({ format: "date-time" }),
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
