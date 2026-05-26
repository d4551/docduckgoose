/**
 * BaoComposer REST API request and response contracts.
 *
 * These schemas are the canonical v1 JSON API surface shared by bao-runtime and
 * CLI clients. Route behavior remains server-owned; this module only defines
 * validation contracts.
 *
 * @packageDocumentation
 */

import { BaoManifestSchema } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { BaoInstallStatusSchema } from "@baohaus/bao-schemas/bao-install/runtime.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BaoComposerContextRefreshRequestSchema,
  BaoComposerContextSnapshotSchema,
} from "./bao-composer-context.ts";
import {
  BaoComposerDraftInputSchema,
  BaoComposerDraftSchema,
  BaoComposerProposalSchema,
  BaoComposerResearchEvidenceSchema,
} from "./bao-composer-drafts-messages.ts";
import { BaoComposerCatalogSchema } from "./bao-composer-fragments-catalog.ts";
import { BaoComposerImproveRequestSchema as SharedBaoComposerImproveRequestSchema } from "./bao-composer-improvement.ts";
import {
  BaoComposerArtifactSchema,
  BaoComposerExecutionSchema,
  BaoComposerImprovementSchema,
  BaoComposerPreviewSchema,
} from "./bao-composer-preview-execution.ts";
import { BaoComposerStandaloneProfileSchema } from "./bao-composer-standalone-profile.ts";

/**
 * Common UUID path-param schema for BaoComposer route entities.
 */
const BaoComposerIdParamSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
  },
  { additionalProperties: false },
);

/**
 * Draft path params.
 */
export const BaoComposerDraftIdParamSchema = BaoComposerIdParamSchema;

/**
 * Artifact path params.
 */
export const BaoComposerArtifactIdParamSchema = BaoComposerIdParamSchema;

/**
 * Execution path params.
 */
export const BaoComposerExecutionIdParamSchema = BaoComposerIdParamSchema;

/**
 * Draft create/update payload.
 */
export const BaoComposerDraftInputBodySchema = BaoComposerDraftInputSchema;

/**
 * BaoComposer research request payload.
 */
export const BaoComposerResearchRequestSchema = Type.Object(
  {
    topic: Type.Optional(Type.String({ minLength: 1 })),
    sourceUrl: Type.Optional(Type.String({ minLength: 1 })),
    tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }), { uniqueItems: true })),
    maxCandidates: Type.Optional(Type.Integer({ minimum: 1, maximum: 25 })),
  },
  { additionalProperties: false },
);

/**
 * BaoComposer proposal request payload.
 */
export const BaoComposerProposalRequestSchema = Type.Object(
  {
    apply: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * BaoComposer improve request payload.
 */
export const BaoComposerImproveRequestSchema = SharedBaoComposerImproveRequestSchema;

/**
 * BaoComposer context refresh request payload.
 */
export const BaoComposerContextRefreshBodySchema = BaoComposerContextRefreshRequestSchema;

/**
 * Import-existing-`.bao` request payload.
 */
export const BaoComposerImportBaoRequestSchema = Type.Object(
  {
    manifest: BaoManifestSchema,
  },
  { additionalProperties: false },
);

/**
 * BaoComposer catalog response payload.
 */
export const BaoComposerCatalogResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerCatalogSchema,
  },
  { additionalProperties: true },
);

/**
 * BaoComposer context response payload.
 */
export const BaoComposerContextResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerContextSnapshotSchema,
  },
  { additionalProperties: true },
);

/**
 * BaoComposer standalone profile response payload.
 */
export const BaoComposerStandaloneProfileResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerStandaloneProfileSchema,
  },
  { additionalProperties: true },
);

/**
 * BaoComposer draft response payload.
 */
export const BaoComposerDraftResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerDraftSchema,
  },
  { additionalProperties: true },
);

/**
 * BaoComposer research response payload.
 */
export const BaoComposerResearchResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(BaoComposerResearchEvidenceSchema),
  },
  { additionalProperties: true },
);

/**
 * BaoComposer proposal response payload.
 */
export const BaoComposerProposalResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerProposalSchema,
  },
  { additionalProperties: true },
);

/**
 * BaoComposer improvement response payload.
 */
export const BaoComposerImproveResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerImprovementSchema,
  },
  { additionalProperties: true },
);

/**
 * BaoComposer execution-history response payload.
 */
export const BaoComposerExecutionHistoryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(BaoComposerExecutionSchema),
  },
  { additionalProperties: true },
);

/**
 * BaoComposer preview response payload.
 */
export const BaoComposerPreviewResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        draft: BaoComposerDraftSchema,
        preview: BaoComposerPreviewSchema,
        execution: BaoComposerExecutionSchema,
        contextSnapshot: Type.Optional(BaoComposerContextSnapshotSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: true },
);

/**
 * BaoComposer generate response payload.
 */
export const BaoComposerGenerateResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        draft: BaoComposerDraftSchema,
        preview: BaoComposerPreviewSchema,
        artifact: BaoComposerArtifactSchema,
        execution: BaoComposerExecutionSchema,
        contextSnapshot: Type.Optional(BaoComposerContextSnapshotSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: true },
);

/**
 * BaoComposer install response payload.
 */
export const BaoComposerInstallResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        draft: BaoComposerDraftSchema,
        preview: BaoComposerPreviewSchema,
        artifact: BaoComposerArtifactSchema,
        execution: BaoComposerExecutionSchema,
        installStatus: BaoInstallStatusSchema,
        contextSnapshot: Type.Optional(BaoComposerContextSnapshotSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: true },
);

/**
 * BaoComposer execution details response payload.
 */
export const BaoComposerExecutionDetailsResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        execution: BaoComposerExecutionSchema,
        installStatus: Type.Optional(BaoInstallStatusSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: true },
);

/**
 * BaoComposer artifact diff payload.
 */
export const BaoComposerArtifactDiffSchema = Type.Object(
  {
    artifactId: Type.String({ minLength: 1 }),
    comparedToArtifactId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    changed: Type.Boolean(),
    currentChecksum: Type.String({ minLength: 1 }),
    previousChecksum: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    addedTargets: Type.Array(Type.String({ minLength: 1 })),
    removedTargets: Type.Array(Type.String({ minLength: 1 })),
    changedTargets: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * BaoComposer artifact diff response payload.
 */
export const BaoComposerArtifactDiffResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: BaoComposerArtifactDiffSchema,
  },
  { additionalProperties: true },
);

/**
 * Static type for BaoComposer research request payloads.
 */
export type BaoComposerResearchRequest = Static<typeof BaoComposerResearchRequestSchema>;
/**
 * Static type for BaoComposer proposal request payloads.
 */
export type BaoComposerProposalRequest = Static<typeof BaoComposerProposalRequestSchema>;
/**
 * Static type for BaoComposer improvement request payloads.
 */
export type BaoComposerImproveRequest = Static<typeof BaoComposerImproveRequestSchema>;
/**
 * Static type for BaoComposer context refresh request payloads.
 */
export type BaoComposerContextRefreshRequest = Static<typeof BaoComposerContextRefreshBodySchema>;
/**
 * Static type for BaoComposer import request payloads.
 */
export type BaoComposerImportBaoRequest = Static<typeof BaoComposerImportBaoRequestSchema>;
/**
 * Static type for BaoComposer artifact diff payloads.
 */
export type BaoComposerArtifactDiff = Static<typeof BaoComposerArtifactDiffSchema>;
