/**
 * Integration annotation alignment schemas.
 *
 * Defines contract-first schemas for annotation alignment payloads embedded in
 * integration context snapshots (AI/XR/USD/MCP/device stacks).
 *
 * @shared/schemas/integration-annotations
 */

import type {
  Static,
  TInteger,
  TObject,
  TOptional,
  TRecord,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  AnnotationAlignmentErrorSchema,
  AnnotationAlignmentProviderSchema,
  AnnotationAlignmentSourceSchema,
  AnnotationAlignmentSummarySchema,
} from "./annotation-alignment.schemas.ts";
import {
  CapabilityOwnershipErrorSchema,
  CapabilityOwnershipFocusMapSchema,
} from "./capability-ownership.schemas.ts";

/**
 * Annotation alignment integration context schema.
 */
export const ChatIntegrationAnnotationsContextSchema = TypeExports.Object(
  {
    endpoints: TypeExports.Object({
      base: TypeExports.String(),
      map: TypeExports.String(),
      refresh: TypeExports.String(),
    }),
    summary: AnnotationAlignmentSummarySchema,
    sources: TypeExports.Array(AnnotationAlignmentSourceSchema),
    providers: TypeExports.Array(AnnotationAlignmentProviderSchema),
    ownership: TypeExports.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    timestamp: TypeExports.String({ format: "date-time" }),
    errors: TypeExports.Optional(TypeExports.Array(AnnotationAlignmentErrorSchema)),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration annotation alignment context.
 */
export type ChatIntegrationAnnotationsContext = Static<
  typeof ChatIntegrationAnnotationsContextSchema
>;

/**
 * Annotation alignment summary schema.
 */
export const ChatIntegrationAnnotationsSummarySchema: TObject<
  {
    readonly summary: TObject<
      {
        readonly sources: TInteger;
        readonly providers: TInteger;
        readonly byIntent: TObject<
          {
            readonly chat: TInteger;
            readonly embeddings: TInteger;
            readonly images: TInteger;
            readonly models: TInteger;
            readonly training: TInteger;
            readonly download: TInteger;
          },
          "chat" | "embeddings" | "images" | "models" | "training" | "download",
          never
        >;
        readonly bySegment: TOptional<TRecord<TString, TInteger>>;
      },
      "providers" | "byIntent" | "sources",
      "bySegment"
    >;
    readonly endpoint: TString;
    readonly refreshEndpoint: TString;
    readonly updatedAt: TString;
  },
  "summary" | "endpoint" | "refreshEndpoint" | "updatedAt",
  never
> = TypeExports.Object(
  {
    summary: AnnotationAlignmentSummarySchema,
    endpoint: TypeExports.String(),
    refreshEndpoint: TypeExports.String(),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration annotation alignment summary.
 */
export type ChatIntegrationAnnotationsSummary = Static<
  typeof ChatIntegrationAnnotationsSummarySchema
>;
