/**
 * Integration annotation alignment schemas.
 *
 * Defines contract-first schemas for annotation alignment payloads embedded in
 * integration context snapshots (AI/XR/USD/MCP/device stacks).
 *
 * @shared/schemas/integration-annotations
 */

import { CapabilityOwnershipErrorSchema } from "@baohaus/bao-schemas/capability-ownership/errors";
import { CapabilityOwnershipFocusMapSchema } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  AnnotationAlignmentErrorSchema,
  AnnotationAlignmentProviderSchema,
  AnnotationAlignmentSourceSchema,
  AnnotationAlignmentSummarySchema,
} from "./annotation-alignment.schemas";

/**
 * Annotation alignment integration context schema.
 */
export const ChatIntegrationAnnotationsContextSchema = Type.Object(
  {
    endpoints: Type.Object({
      base: Type.String(),
      map: Type.String(),
      refresh: Type.String(),
    }),
    summary: AnnotationAlignmentSummarySchema,
    sources: Type.Array(AnnotationAlignmentSourceSchema),
    providers: Type.Array(AnnotationAlignmentProviderSchema),
    ownership: Type.Optional(CapabilityOwnershipFocusMapSchema),
    ownershipErrors: Type.Optional(Type.Array(CapabilityOwnershipErrorSchema)),
    ownershipTimestamp: Type.Optional(Type.String({ format: "date-time" })),
    timestamp: Type.String({ format: "date-time" }),
    errors: Type.Optional(Type.Array(AnnotationAlignmentErrorSchema)),
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
export const ChatIntegrationAnnotationsSummarySchema: Type.TObject<
  {
    readonly summary: Type.TObject<
      {
        readonly sources: Type.TInteger;
        readonly providers: Type.TInteger;
        readonly byIntent: Type.TObject<
          {
            readonly chat: Type.TInteger;
            readonly embeddings: Type.TInteger;
            readonly images: Type.TInteger;
            readonly models: Type.TInteger;
            readonly training: Type.TInteger;
            readonly download: Type.TInteger;
          },
          "chat" | "embeddings" | "images" | "models" | "training" | "download",
          never
        >;
        readonly bySegment: Type.TOptional<Type.TRecord<Type.TString, Type.TInteger>>;
      },
      "providers" | "byIntent" | "sources",
      "bySegment"
    >;
    readonly endpoint: Type.TString;
    readonly refreshEndpoint: Type.TString;
    readonly updatedAt: Type.TString;
  },
  "summary" | "endpoint" | "refreshEndpoint" | "updatedAt",
  never
> = Type.Object(
  {
    summary: AnnotationAlignmentSummarySchema,
    endpoint: Type.String(),
    refreshEndpoint: Type.String(),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for integration annotation alignment summary.
 */
export type ChatIntegrationAnnotationsSummary = Static<
  typeof ChatIntegrationAnnotationsSummarySchema
>;
