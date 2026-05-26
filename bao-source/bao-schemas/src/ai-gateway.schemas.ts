/**
 * AI gateway model catalog schemas.
 *
 * Defines contract-first schemas for the AI gateway model catalog response
 * returned by `/api/v1/ai/models`.
 *
 * @shared/schemas/ai-gateway
 */

import type { Static, TLiteral, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { JsonObjectSchema } from "./json.schemas.ts";

/**
 * ISO 8601 date-time format schema.
 */
export const DateTimeSchema: TString = TypeExports.String({
  format: "date-time",
  description: "ISO 8601 date-time string",
});

/**
 * AI gateway model origin identifiers.
 */
export const AI_GATEWAY_MODEL_ORIGINS: readonly [
  "registry",
  "onnx",
  "nim",
  "ollama",
  "ramalama",
  "local",
] = ["registry", "onnx", "nim", "ollama", "ramalama", "local"] as const;

/** Inferred type from the AiGatewayModelOrigin schema. */
export type AiGatewayModelOrigin = (typeof AI_GATEWAY_MODEL_ORIGINS)[number];

/**
 * AI gateway model origin schema.
 */
export const AiGatewayModelOriginSchema: TUnion<
  [
    TLiteral<"registry" | "onnx" | "nim" | "ollama" | "ramalama" | "local">,
    ...TLiteral<"registry" | "onnx" | "nim" | "ollama" | "ramalama" | "local">[],
  ]
> = stringEnum(AI_GATEWAY_MODEL_ORIGINS, {
  description: "Model catalog origin identifier",
});

/**
 * AI gateway model source identifiers.
 */
export const AI_GATEWAY_MODEL_SOURCES: readonly [
  "registry",
  "huggingface",
  "nim",
  "azure",
  "ollama",
  "ramalama",
  "local",
  "upload",
  "training",
  "custom",
] = [
  "registry",
  "huggingface",
  "nim",
  "azure",
  "ollama",
  "ramalama",
  "local",
  "upload",
  "training",
  "custom",
] as const;

/** Inferred type from the AiGatewayModelSource schema. */
export type AiGatewayModelSource = (typeof AI_GATEWAY_MODEL_SOURCES)[number];

/**
 * Determine whether a string is a valid {@link AiGatewayModelSource}.
 *
 * @param value - Candidate source identifier.
 * @returns True when the value is a valid {@link AiGatewayModelSource}.
 */
export function isAiGatewayModelSource(
  value: string | null | undefined,
): value is AiGatewayModelSource {
  if (!value) {
    return false;
  }
  return (AI_GATEWAY_MODEL_SOURCES as readonly string[]).includes(value);
}

/**
 * AI gateway model source schema.
 */
export const AiGatewayModelSourceSchema: TUnion<
  [
    TLiteral<
      | "registry"
      | "huggingface"
      | "nim"
      | "azure"
      | "ollama"
      | "ramalama"
      | "local"
      | "upload"
      | "training"
      | "custom"
    >,
    ...TLiteral<
      | "registry"
      | "huggingface"
      | "nim"
      | "azure"
      | "ollama"
      | "ramalama"
      | "local"
      | "upload"
      | "training"
      | "custom"
    >[],
  ]
> = stringEnum(AI_GATEWAY_MODEL_SOURCES, {
  description: "Model source identifier",
});

/**
 * AI gateway model runtime identifiers.
 */
export const AI_GATEWAY_MODEL_RUNTIMES: readonly [
  "pytorch",
  "litert",
  "transformers",
  "onnxruntime",
  "onnx-node-bao",
  "tensorrt",
  "coreml",
  "gguf",
  "custom",
] = [
  "pytorch",
  "litert",
  "transformers",
  "onnxruntime",
  "onnx-node-bao",
  "tensorrt",
  "coreml",
  "gguf",
  "custom",
] as const;

/** Inferred type from the AiGatewayModelRuntime schema. */
export type AiGatewayModelRuntime = (typeof AI_GATEWAY_MODEL_RUNTIMES)[number];

/**
 * Determine whether a string is a valid {@link AiGatewayModelRuntime}.
 *
 * @param value - Candidate runtime identifier.
 * @returns True when the value is a valid {@link AiGatewayModelRuntime}.
 */
export function isAiGatewayModelRuntime(
  value: string | null | undefined,
): value is AiGatewayModelRuntime {
  if (!value) {
    return false;
  }
  return (AI_GATEWAY_MODEL_RUNTIMES as readonly string[]).includes(value);
}

/**
 * AI gateway model runtime schema.
 */
export const AiGatewayModelRuntimeSchema: TUnion<
  [
    TLiteral<
      | "pytorch"
      | "litert"
      | "transformers"
      | "onnxruntime"
      | "onnx-node-bao"
      | "tensorrt"
      | "coreml"
      | "gguf"
      | "custom"
    >,
    ...TLiteral<
      | "pytorch"
      | "litert"
      | "transformers"
      | "onnxruntime"
      | "onnx-node-bao"
      | "tensorrt"
      | "coreml"
      | "gguf"
      | "custom"
    >[],
  ]
> = stringEnum(AI_GATEWAY_MODEL_RUNTIMES, {
  description: "Model runtime identifier",
});

/**
 * AI gateway model connectivity requirements.
 */
export const AI_GATEWAY_MODEL_REQUIREMENTS: readonly ["online", "local", "hybrid"] = [
  "online",
  "local",
  "hybrid",
] as const;

/** Inferred type from the AiGatewayModelRequirement schema. */
export type AiGatewayModelRequirement = (typeof AI_GATEWAY_MODEL_REQUIREMENTS)[number];

/**
 * Determine whether a string is a valid {@link AiGatewayModelRequirement}.
 *
 * @param value - Candidate requirement identifier.
 * @returns True when the value is a valid {@link AiGatewayModelRequirement}.
 */
export function isAiGatewayModelRequirement(
  value: string | null | undefined,
): value is AiGatewayModelRequirement {
  if (!value) {
    return false;
  }
  return (AI_GATEWAY_MODEL_REQUIREMENTS as readonly string[]).includes(value);
}

/**
 * AI gateway model requirement schema.
 */
export const AiGatewayModelRequirementSchema: TUnion<
  [TLiteral<"online" | "local" | "hybrid">, ...TLiteral<"online" | "local" | "hybrid">[]]
> = stringEnum(AI_GATEWAY_MODEL_REQUIREMENTS, {
  description: "Model connectivity requirement",
});

/**
 * AI gateway model delegation targets.
 */
export const AI_GATEWAY_MODEL_DELEGATIONS: readonly ["online", "local", "hybrid"] = [
  "online",
  "local",
  "hybrid",
] as const;

/** Inferred type from the AiGatewayModelDelegation schema. */
export type AiGatewayModelDelegation = (typeof AI_GATEWAY_MODEL_DELEGATIONS)[number];

/**
 * Determine whether a string is a valid {@link AiGatewayModelDelegation}.
 *
 * @param value - Candidate delegation identifier.
 * @returns True when the value is a valid {@link AiGatewayModelDelegation}.
 */
export function isAiGatewayModelDelegation(
  value: string | null | undefined,
): value is AiGatewayModelDelegation {
  if (!value) {
    return false;
  }
  return (AI_GATEWAY_MODEL_DELEGATIONS as readonly string[]).includes(value);
}

/**
 * AI gateway model delegation schema.
 */
export const AiGatewayModelDelegationSchema: TUnion<
  [TLiteral<"online" | "local" | "hybrid">, ...TLiteral<"online" | "local" | "hybrid">[]]
> = stringEnum(AI_GATEWAY_MODEL_DELEGATIONS, {
  description: "Model delegation target",
});

/**
 * AI gateway model catalog item schema.
 */
export const AiGatewayModelCatalogItemSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    provider: TypeExports.String({ minLength: 1 }),
    origin: AiGatewayModelOriginSchema,
    type: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    status: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    offlineReady: TypeExports.Boolean(),
    storagePath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    tags: TypeExports.Array(TypeExports.String()),
    source: TypeExports.Union([AiGatewayModelSourceSchema, TypeExports.Null()]),
    runtime: TypeExports.Union([AiGatewayModelRuntimeSchema, TypeExports.Null()]),
    requirements: TypeExports.Union([AiGatewayModelRequirementSchema, TypeExports.Null()]),
    delegation: TypeExports.Union([AiGatewayModelDelegationSchema, TypeExports.Null()]),
    metadata: TypeExports.Union([JsonObjectSchema, TypeExports.Null()]),
    updatedAt: TypeExports.Union([DateTimeSchema, TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * AI gateway model catalog response schema.
 */
export const AiGatewayModelCatalogResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(AiGatewayModelCatalogItemSchema),
    count: TypeExports.Number({ minimum: 0 }),
    timestamp: DateTimeSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the AiGatewayModelCatalogItem schema. */
export type AiGatewayModelCatalogItem = Static<typeof AiGatewayModelCatalogItemSchema>;
/** Inferred type from the AiGatewayModelCatalogResponse schema. */
export type AiGatewayModelCatalogResponse = Static<typeof AiGatewayModelCatalogResponseSchema>;
