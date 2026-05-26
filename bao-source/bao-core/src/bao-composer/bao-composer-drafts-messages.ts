/**
 * BaoComposer build requests, persisted drafts, research evidence, and proposal payloads.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-drafts-messages
 */

import { BaoInstallTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { JsonObjectSchema } from "@baohaus/bao-schemas/json.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BaoComposerBaoImportProvenanceSchema } from "./bao-composer-fragments-catalog.ts";
import {
  BaoComposerAiProviderSchema,
  BaoComposerDraftIntentModeSchema,
  BaoComposerFeatureIdSchema,
  BaoComposerOutputModeSchema,
  BaoComposerPresetIdSchema,
  BaoComposerRecipeIdSchema,
} from "./bao-composer-identity.ts";

/**
 * Contract for a BaoComposer manifest build request.
 */
export const BaoComposerBuildRequestSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1 })),
    version: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String({ minLength: 1 })),
    outputPath: Type.String({ minLength: 1 }),
    preset: Type.Optional(BaoComposerPresetIdSchema),
    goal: Type.Optional(Type.String({ minLength: 1 })),
    recipeIds: Type.Optional(
      Type.Array(BaoComposerRecipeIdSchema, {
        minItems: 1,
        uniqueItems: true,
      }),
    ),
    features: Type.Optional(
      Type.Array(BaoComposerFeatureIdSchema, {
        minItems: 1,
        uniqueItems: true,
      }),
    ),
    outputMode: Type.Optional(BaoComposerOutputModeSchema),
    aiModel: Type.Optional(Type.String({ minLength: 1 })),
    aiProvider: Type.Optional(BaoComposerAiProviderSchema),
    mcpProviderModule: Type.Optional(Type.String({ minLength: 1 })),
    automationFlowDefinition: Type.Optional(Type.String({ minLength: 1 })),
    schemaRef: Type.Optional(Type.String({ minLength: 1 })),
    sourceId: Type.Optional(Type.String({ minLength: 1 })),
    importedTargets: Type.Optional(Type.Array(BaoInstallTargetSchema)),
    baoImportProvenance: Type.Optional(BaoComposerBaoImportProvenanceSchema),
  },
  {
    additionalProperties: false,
    description: "Canonical input contract for BaoComposer `.bao` generation.",
  },
);

/**
 * BaoComposer manifest build request type.
 */
export type BaoComposerBuildRequest = Static<typeof BaoComposerBuildRequestSchema>;

/**
 * Editable BaoComposer draft payload.
 */
export const BaoComposerDraftInputSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1 })),
    intentMode: Type.Optional(BaoComposerDraftIntentModeSchema),
    goal: Type.Optional(Type.String({ minLength: 1 })),
    preset: Type.Optional(BaoComposerPresetIdSchema),
    recipeIds: Type.Optional(
      Type.Array(BaoComposerRecipeIdSchema, {
        minItems: 1,
        uniqueItems: true,
      }),
    ),
    features: Type.Optional(
      Type.Array(BaoComposerFeatureIdSchema, {
        minItems: 1,
        uniqueItems: true,
      }),
    ),
    outputMode: Type.Optional(BaoComposerOutputModeSchema),
    outputPath: Type.Optional(Type.String({ minLength: 1 })),
    manifestName: Type.Optional(Type.String({ minLength: 1 })),
    manifestVersion: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String({ minLength: 1 })),
    aiModel: Type.Optional(Type.String({ minLength: 1 })),
    aiProvider: Type.Optional(BaoComposerAiProviderSchema),
    mcpProviderModule: Type.Optional(Type.String({ minLength: 1 })),
    automationFlowDefinition: Type.Optional(Type.String({ minLength: 1 })),
    schemaRef: Type.Optional(Type.String({ minLength: 1 })),
    sourceId: Type.Optional(Type.String({ minLength: 1 })),
    importedTargets: Type.Optional(Type.Array(BaoInstallTargetSchema)),
    baoImportProvenance: Type.Optional(BaoComposerBaoImportProvenanceSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Editable BaoComposer draft input type.
 */
export type BaoComposerDraftInputV1 = Static<typeof BaoComposerDraftInputSchema>;

/**
 * Persisted BaoComposer draft.
 */
export const BaoComposerDraftSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    intentMode: BaoComposerDraftIntentModeSchema,
    goal: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    preset: Type.Union([BaoComposerPresetIdSchema, Type.Null()]),
    recipeIds: Type.Array(BaoComposerRecipeIdSchema),
    features: Type.Array(BaoComposerFeatureIdSchema),
    outputMode: BaoComposerOutputModeSchema,
    outputPath: Type.String(),
    manifestName: Type.String({ minLength: 1 }),
    manifestVersion: Type.String({ minLength: 1 }),
    description: Type.String(),
    aiModel: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    aiProvider: Type.Union([BaoComposerAiProviderSchema, Type.Null()]),
    mcpProviderModule: Type.String(),
    automationFlowDefinition: Type.String(),
    schemaRef: Type.String(),
    sourceId: Type.String(),
    importedTargets: Type.Array(BaoInstallTargetSchema),
    baoImportProvenance: Type.Union([BaoComposerBaoImportProvenanceSchema, Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Persisted BaoComposer draft type.
 */
export type BaoComposerDraftV1 = Static<typeof BaoComposerDraftSchema>;

/**
 * Persisted BaoComposer research evidence.
 */
export const BaoComposerResearchEvidenceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    draftId: Type.String({ minLength: 1 }),
    provider: Type.String({ minLength: 1 }),
    sourceUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    title: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    summary: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    tags: Type.Array(Type.String({ minLength: 1 })),
    evidence: JsonObjectSchema,
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Persisted BaoComposer research evidence type.
 */
export type BaoComposerResearchEvidenceV1 = Static<typeof BaoComposerResearchEvidenceSchema>;

/**
 * Primitive interpolation value supported by BaoComposer message descriptors.
 */
export const BaoComposerMessageParamValueSchema: Type.TUnion<(Type.TString | Type.TNumber)[]> =
  Type.Union([Type.String(), Type.Number()], {});

/**
 * Structured i18n message descriptor shared across BaoComposer service surfaces.
 */
export const BaoComposerMessageDescriptorSchema: Type.TObject<
  {
    readonly key: Type.TString;
    readonly params: Type.TOptional<
      Type.TRecord<Type.TString, Type.TUnion<(Type.TString | Type.TNumber)[]>>
    >;
  },
  "key",
  "params"
> = Type.Object(
  {
    key: Type.String({ minLength: 1 }),
    params: Type.Optional(
      Type.Record(Type.String({ minLength: 1 }), BaoComposerMessageParamValueSchema),
    ),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer message descriptor type.
 */
export type BaoComposerMessageDescriptorV1 = Static<typeof BaoComposerMessageDescriptorSchema>;

/**
 * Deterministic BaoComposer proposal output.
 */
export const BaoComposerProposalSchema = Type.Object(
  {
    draftId: Type.String({ minLength: 1 }),
    recipeIds: Type.Array(BaoComposerRecipeIdSchema),
    features: Type.Array(BaoComposerFeatureIdSchema),
    warnings: Type.Array(BaoComposerMessageDescriptorSchema),
    rationale: Type.Array(BaoComposerMessageDescriptorSchema),
    evidenceIds: Type.Array(Type.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer proposal type.
 */
export type BaoComposerProposalV1 = Static<typeof BaoComposerProposalSchema>;
