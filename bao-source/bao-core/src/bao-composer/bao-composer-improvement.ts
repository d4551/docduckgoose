/**
 * BaoComposer improvement loop, recommendations, and bounded cycle summaries.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-improvement
 */

import { stringEnum } from "@baohaus/bao-schemas/baobox-enum";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BaoComposerMessageDescriptorSchema } from "./bao-composer-drafts-messages.ts";

/**
 * BaoComposer continual-improvement request payload.
 */
export const BaoComposerImproveRequestSchema: Type.TObject<
  {
    readonly apply: Type.TOptional<Type.TBoolean>;
    readonly refreshResearch: Type.TOptional<Type.TBoolean>;
    readonly topic: Type.TOptional<Type.TString>;
    readonly sourceUrl: Type.TOptional<Type.TString>;
    readonly maxIterations: Type.TOptional<Type.TInteger>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly maxCandidates: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly apply: Type.TOptional<Type.TBoolean>;
    readonly refreshResearch: Type.TOptional<Type.TBoolean>;
    readonly topic: Type.TOptional<Type.TString>;
    readonly sourceUrl: Type.TOptional<Type.TString>;
    readonly maxIterations: Type.TOptional<Type.TInteger>;
    readonly tags: Type.TOptional<Type.TArray<Type.TString>>;
    readonly maxCandidates: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    apply: Type.Optional(Type.Boolean()),
    refreshResearch: Type.Optional(Type.Boolean()),
    topic: Type.Optional(Type.String({ minLength: 1 })),
    sourceUrl: Type.Optional(Type.String({ minLength: 1 })),
    maxIterations: Type.Optional(Type.Integer({ minimum: 1, maximum: 5 })),
    tags: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        minItems: 1,
        uniqueItems: true,
      }),
    ),
    maxCandidates: Type.Optional(Type.Integer({ minimum: 1, maximum: 25 })),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer continual-improvement request type.
 */
export type BaoComposerImproveRequestV1 = Static<typeof BaoComposerImproveRequestSchema>;

/**
 * Severity level for BaoComposer improvement recommendations.
 */
export const BaoComposerImprovementRecommendationSeveritySchema: Type.TUnion<
  [Type.TLiteral<"info" | "warning" | "error">, ...Type.TLiteral<"info" | "warning" | "error">[]]
> = stringEnum(["info", "warning", "error"], {});

/**
 * Structured recommendation emitted by the BaoComposer improvement loop.
 */
export const BaoComposerImprovementRecommendationSchema: Type.TObject<
  {
    readonly code: Type.TString;
    readonly severity: Type.TUnion<
      [
        Type.TLiteral<"info" | "warning" | "error">,
        ...Type.TLiteral<"info" | "warning" | "error">[],
      ]
    >;
    readonly message: Type.TObject<
      {
        readonly key: Type.TString;
        readonly params: Type.TOptional<
          Type.TRecord<Type.TString, Type.TUnion<(Type.TString | Type.TNumber)[]>>
        >;
      },
      "key",
      "params"
    >;
  },
  "code" | "severity" | "message",
  never
> = Type.Object(
  {
    code: Type.String({ minLength: 1 }),
    severity: BaoComposerImprovementRecommendationSeveritySchema,
    message: BaoComposerMessageDescriptorSchema,
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement recommendation type.
 */
export type BaoComposerImprovementRecommendationV1 = Static<
  typeof BaoComposerImprovementRecommendationSchema
>;

/**
 * Structured evidence summary surfaced by the BaoComposer improvement loop.
 */
export const BaoComposerImprovementEvidenceSummarySchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly provider: Type.TString;
    readonly sourceUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly title: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly summary: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly tags: Type.TArray<Type.TString>;
    readonly isNew: Type.TBoolean;
  },
  "sourceUrl" | "title" | "summary" | "tags" | "id" | "provider" | "isNew",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    provider: Type.String({ minLength: 1 }),
    sourceUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    title: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    summary: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    tags: Type.Array(Type.String({ minLength: 1 })),
    isNew: Type.Boolean(),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement evidence summary type.
 */
export type BaoComposerImprovementEvidenceSummaryV1 = Static<
  typeof BaoComposerImprovementEvidenceSummarySchema
>;

/**
 * Research summary captured by the BaoComposer improvement loop.
 */
export const BaoComposerImprovementResearchSchema = Type.Object(
  {
    attempted: Type.Boolean(),
    topic: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    sourceUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    newEvidenceIds: Type.Array(Type.String({ minLength: 1 })),
    totalEvidenceCount: Type.Integer({ minimum: 0 }),
    evidenceSummaries: Type.Array(BaoComposerImprovementEvidenceSummarySchema),
    warnings: Type.Array(BaoComposerMessageDescriptorSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement research summary type.
 */
export type BaoComposerImprovementResearchV1 = Static<typeof BaoComposerImprovementResearchSchema>;

/**
 * Drift summary for the BaoComposer improvement loop.
 */
export const BaoComposerImprovementDiffSchema: Type.TObject<
  {
    readonly baselineArtifactId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly changed: Type.TBoolean;
    readonly currentChecksum: Type.TString;
    readonly previousChecksum: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly addedTargets: Type.TArray<Type.TString>;
    readonly removedTargets: Type.TArray<Type.TString>;
    readonly changedTargets: Type.TArray<Type.TString>;
  },
  | "baselineArtifactId"
  | "previousChecksum"
  | "addedTargets"
  | "removedTargets"
  | "changedTargets"
  | "changed"
  | "currentChecksum",
  never
> = Type.Object(
  {
    baselineArtifactId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    changed: Type.Boolean(),
    currentChecksum: Type.String({ minLength: 1 }),
    previousChecksum: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    addedTargets: Type.Array(Type.String({ minLength: 1 })),
    removedTargets: Type.Array(Type.String({ minLength: 1 })),
    changedTargets: Type.Array(Type.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement diff type.
 */
export type BaoComposerImprovementDiffV1 = Static<typeof BaoComposerImprovementDiffSchema>;

/**
 * Improvement readiness flags for downstream automation.
 */
export const BaoComposerImprovementReadinessSchema: Type.TObject<
  { readonly generate: Type.TBoolean; readonly install: Type.TBoolean },
  "generate" | "install",
  never
> = Type.Object(
  {
    generate: Type.Boolean(),
    install: Type.Boolean(),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement readiness type.
 */
export type BaoComposerImprovementReadinessV1 = Static<
  typeof BaoComposerImprovementReadinessSchema
>;

/**
 * Improvement loop high-level status.
 */
export const BaoComposerImprovementStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"ready" | "needs-attention" | "blocked">,
    ...Type.TLiteral<"ready" | "needs-attention" | "blocked">[],
  ]
> = stringEnum(["ready", "needs-attention", "blocked"], {});

/**
 * BaoComposer improvement status type.
 */
export type BaoComposerImprovementStatus = Static<typeof BaoComposerImprovementStatusSchema>;

/**
 * Improvement cycle stop reason.
 */
export const BaoComposerImprovementCycleStopReasonSchema: Type.TUnion<
  [
    Type.TLiteral<
      "single-pass" | "apply-required" | "ready" | "blocked" | "stabilized" | "max-iterations"
    >,
    ...Type.TLiteral<
      "single-pass" | "apply-required" | "ready" | "blocked" | "stabilized" | "max-iterations"
    >[],
  ]
> = stringEnum(
  ["single-pass", "apply-required", "ready", "blocked", "stabilized", "max-iterations"],
  {},
);

/**
 * BaoComposer improvement cycle stop reason type.
 */
export type BaoComposerImprovementCycleStopReason = Static<
  typeof BaoComposerImprovementCycleStopReasonSchema
>;

/**
 * One bounded iteration inside the BaoComposer improvement cycle.
 */
export const BaoComposerImprovementIterationSchema: Type.TObject<
  {
    readonly index: Type.TInteger;
    readonly executionId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly previewChecksum: Type.TString;
    readonly status: Type.TUnion<
      [
        Type.TLiteral<"ready" | "needs-attention" | "blocked">,
        ...Type.TLiteral<"ready" | "needs-attention" | "blocked">[],
      ]
    >;
    readonly readiness: Type.TObject<
      { readonly generate: Type.TBoolean; readonly install: Type.TBoolean },
      "generate" | "install",
      never
    >;
    readonly applied: Type.TBoolean;
    readonly recommendationCodes: Type.TArray<Type.TString>;
  },
  | "executionId"
  | "recommendationCodes"
  | "index"
  | "previewChecksum"
  | "status"
  | "readiness"
  | "applied",
  never
> = Type.Object(
  {
    index: Type.Integer({ minimum: 1 }),
    executionId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    previewChecksum: Type.String({ minLength: 1 }),
    status: BaoComposerImprovementStatusSchema,
    readiness: BaoComposerImprovementReadinessSchema,
    applied: Type.Boolean(),
    recommendationCodes: Type.Array(Type.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement iteration type.
 */
export type BaoComposerImprovementIterationV1 = Static<
  typeof BaoComposerImprovementIterationSchema
>;

/**
 * Bounded autonomous improvement cycle summary.
 */
export const BaoComposerImprovementCycleSchema = Type.Object(
  {
    requestedIterations: Type.Integer({ minimum: 1 }),
    completedIterations: Type.Integer({ minimum: 1 }),
    stopReason: BaoComposerImprovementCycleStopReasonSchema,
    iterations: Type.Array(BaoComposerImprovementIterationSchema, { minItems: 1 }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement cycle type.
 */
export type BaoComposerImprovementCycleV1 = Static<typeof BaoComposerImprovementCycleSchema>;
