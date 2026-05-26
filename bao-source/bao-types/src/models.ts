/**
 * AI Model Types
 *
 * Defines type-safe models for AI/ML model management including model metadata,
 * offline capabilities, and provider integration. These types support the AI
 * inference and model management features of the Baohaus platform.
 *
 * @shared/types/models.ts
 */

import type { ModelRegistry as PrismaModelRegistry } from "./prisma.types";

/**
 * AI/ML model entity
 *
 * AiModel
 *
 * @description
 * Represents an AI or machine learning model available in the system. Models can
 * be sourced from various providers (HuggingFace, OpenAI, Azure, etc.) and may
 * support offline inference if downloaded locally.
 *
 * @remarks
 * The interface supports both snake_case and camelCase property variants for
 * compatibility with different database systems and API conventions. Some
 * properties like `offline_ready` may be boolean or number (0/1) depending
 * on the storage backend.
 *
 * @example
 * ```typescript
 * const model: AiModel = {
 *   id: '550e8400-e29b-41d4-a716-446655440000',
 *   name: 'Pathology Classifier v2',
 *   provider: 'huggingface',
 *   description: 'Binary classifier for tissue samples',
 *   task: 'image-classification',
 *   offline_ready: true,
 *   storage_path: '/models/pathology-classifier-v2',
 *   loaded: false,
 *   version: '2.1.0',
 *   tags: ['pathology', 'classification', 'histology'],
 *   config: {
 *     inputSize: [224, 224],
 *     classes: ['benign', 'malignant']
 *   },
 *   createdAt: '2024-01-15T10:00:00Z',
 *   updatedAt: '2024-01-20T14:30:00Z'
 * };
 * ```
 */
export interface AiModel {
  /** Unique model identifier (UUID) */
  id: string;
  /** Human-readable model name */
  name: string;
  /** Model provider (e.g., 'huggingface', 'openai', 'azure', 'custom') */
  provider: string;
  /** Detailed model description */
  description?: string;
  /** Primary task type (e.g., 'image-classification', 'object-detection', 'segmentation') */
  task?: string;
  /** Whether model supports offline inference (boolean or 0/1 for database compatibility) */
  offline_ready?: boolean | number;
  /** Filesystem path where model files are stored (snake_case variant) */
  storage_path?: string;
  /** Filesystem path where model files are stored (camelCase variant) */
  storagePath?: string;
  /** Whether model is currently loaded in memory */
  loaded?: boolean;
  /** Model version string */
  version?: string;
  /** Categorization tags for filtering and search */
  tags?: string[];
  /** Model-specific configuration parameters */
  config?: Record<string, unknown>;
  /** Model source classification (registry, hub, upload, etc.) */
  source?: ModelSource;
  /** Model runtime system (pytorch, litert, transformers, onnxruntime, etc.) */
  runtime?: ModelRuntimeSystem;
  /** Connectivity requirements for inference (online, local, hybrid) */
  requirements?: ModelRequirement;
  /** Preferred delegation target for mixed offline/online availability */
  delegation?: ModelDelegationTarget;
  /** Model creation timestamp (ISO 8601 string or Date object) */
  createdAt?: Date | string;
  /** Last model update timestamp (ISO 8601 string or Date object) */
  updatedAt?: Date | string;
}

/**
 * Model registry entry for listing models in the registry UI.
 *
 * ModelRegistryEntry
 *
 * @description
 * Represents a model entry in the model registry, containing metadata
 * about registered models from various providers (HuggingFace, Azure, NIM, local).
 *
 * @example
 * ```typescript
 * const model: ModelRegistryEntry = {
 *   id: 'model-123',
 *   name: 'llama-3-8b',
 *   provider: 'nim',
 *   type: 'text',
 *   version: '1.0.0',
 *   status: 'active',
 *   description: 'Large language model for text generation',
 *   created_at: '2024-01-15T10:00:00Z',
 *   updated_at: '2024-01-20T14:30:00Z',
 * };
 * ```
 */
export interface ModelRegistryEntry {
  /** Unique model identifier */
  id: string;
  /** Human-readable model name */
  name: string;
  /** Model provider (huggingface, azure, nim, local) */
  provider: string;
  /** Model capability type (text, vision, multimodal, embedding, audio) */
  type: string;
  /** Model version string */
  version: string | null;
  /** Model status (active, deprecated, testing, offline) */
  status: string;
  /** Model description */
  description: string | null;
  /** Model-specific configuration */
  config: Record<string, unknown> | null;
  /** Additional metadata */
  metadata: Record<string, unknown> | null;
  /** Model source classification (registry, hub, upload, etc.) */
  source?: ModelSource;
  /** Model runtime system (pytorch, litert, transformers, onnxruntime, etc.) */
  runtime?: ModelRuntimeSystem;
  /** Connectivity requirements for inference (online, local, hybrid) */
  requirements?: ModelRequirement;
  /** Preferred delegation target for mixed offline/online availability */
  delegation?: ModelDelegationTarget;
  /** Creation timestamp (ISO 8601) */
  created_at: string;
  /** Last update timestamp (ISO 8601) */
  updated_at: string;
}

/**
 * Normalized model registry entry with derived metadata.
 *
 * Mirrors the server-side normalization output while remaining JSON-safe.
 */

/**
 * NIM model entry for NIM-specific model listings.
 *
 * NimModelEntry
 */
export interface NimModelEntry {
  /** Unique model identifier */
  id: string;
  /** Model provider (typically 'nim') */
  provider: string;
  /** Model type */
  type: string;
  /** Model context/description */
  context: string;
  /** Model status */
  status: string;
  /** Human-readable update label */
  updatedLabel: string;
}

/**
 * Model provider types.
 */
export type ModelProvider =
  | "huggingface"
  | "azure"
  | "nim"
  | "ollama"
  | "local"
  | "openai"
  | "custom";

/**
 * Model source types.
 */
export type ModelSource =
  | "registry"
  | "huggingface"
  | "nim"
  | "azure"
  | "ollama"
  | "ramalama"
  | "local"
  | "upload"
  | "training"
  | "custom";

/**
 * Model runtime system types.
 */
export type ModelRuntimeSystem =
  | "pytorch"
  | "litert"
  | "transformers"
  | "onnxruntime"
  | "tensorrt"
  | "coreml"
  | "gguf"
  | "custom";

/**
 * Model connectivity requirement types.
 */
export type ModelRequirement = "online" | "local" | "hybrid";

/**
 * Model delegation target for execution routing.
 */
export type ModelDelegationTarget = "online" | "local" | "hybrid";

/**
 * List of known model sources.
 */
export const MODEL_SOURCES: readonly ModelSource[] = [
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
];

/**
 * Display labels for model sources.
 */
export const MODEL_SOURCE_LABELS: Record<ModelSource, string> = {
  registry: "Registry",
  huggingface: "Hugging Face",
  nim: "NVIDIA NIM",
  azure: "Azure OpenAI",
  ollama: "Ollama",
  ramalama: "RamaLama",
  local: "Local",
  upload: "Upload",
  training: "Training",
  custom: "Custom",
};

/**
 * List of known model runtime systems.
 */
export const MODEL_RUNTIME_SYSTEMS: readonly ModelRuntimeSystem[] = [
  "pytorch",
  "litert",
  "transformers",
  "onnxruntime",
  "tensorrt",
  "coreml",
  "gguf",
  "custom",
];

/**
 * Display labels for model runtimes.
 */
export const MODEL_RUNTIME_LABELS: Record<ModelRuntimeSystem, string> = {
  pytorch: "PyTorch",
  litert: "LiteRT",
  transformers: "Transformers",
  onnxruntime: "ONNX Runtime",
  tensorrt: "TensorRT",
  coreml: "Core ML",
  gguf: "GGUF",
  custom: "Custom",
};

/**
 * List of model connectivity requirements.
 */
export const MODEL_REQUIREMENTS: readonly ModelRequirement[] = ["online", "local", "hybrid"];

/**
 * List of model delegation targets.
 */
export const MODEL_DELEGATION_TARGETS: readonly ModelDelegationTarget[] = [
  "online",
  "local",
  "hybrid",
];

/**
 * Display labels for model delegation targets.
 */
export const MODEL_DELEGATION_LABELS: Record<ModelDelegationTarget, string> = {
  online: "Online",
  local: "Local",
  hybrid: "Hybrid",
};

/**
 * Display labels for model requirements.
 */
export const MODEL_REQUIREMENT_LABELS: Record<ModelRequirement, string> = {
  online: "Online",
  local: "Local",
  hybrid: "Hybrid",
};

/**
 * Determine if a value is a recognized model source.
 *
 * @param value - Candidate source value.
 * @returns True when the value matches a known model source.
 */
export function isModelSource(value: unknown): value is ModelSource {
  return typeof value === "string" && MODEL_SOURCES.includes(value as ModelSource);
}

/**
 * Determine if a value is a recognized model runtime system.
 *
 * @param value - Candidate runtime value.
 * @returns True when the value matches a known model runtime system.
 */
export function isModelRuntimeSystem(value: unknown): value is ModelRuntimeSystem {
  return typeof value === "string" && MODEL_RUNTIME_SYSTEMS.includes(value as ModelRuntimeSystem);
}

/**
 * Determine if a value is a recognized model requirement.
 *
 * @param value - Candidate requirement value.
 * @returns True when the value matches a known model requirement.
 */
export function isModelRequirement(value: unknown): value is ModelRequirement {
  return typeof value === "string" && MODEL_REQUIREMENTS.includes(value as ModelRequirement);
}

/**
 * Determine if a value is a recognized model delegation target.
 *
 * @param value - Candidate delegation value.
 * @returns True when the value matches a known delegation target.
 */
export function isModelDelegationTarget(value: unknown): value is ModelDelegationTarget {
  return (
    typeof value === "string" && MODEL_DELEGATION_TARGETS.includes(value as ModelDelegationTarget)
  );
}

/**
 * Model capability types.
 */
export type ModelCapability = "text" | "vision" | "multimodal" | "embedding" | "audio";

/**
 * Model status types.
 */
export type ModelStatus = "active" | "deprecated" | "testing" | "offline" | "error";

/**
 * Normalized model registry record returned by the API.
 */
export type NormalizedModelRegistry = PrismaModelRegistry & {
  source: ModelSource | null;
  runtime: ModelRuntimeSystem | null;
  requirements: ModelRequirement | null;
  delegation: ModelDelegationTarget | null;
};

/**
 * Canonical shared registry model type used by backend normalization and API layers.
 */
export type ModelRegistry = PrismaModelRegistry;

/**
 * Response payload returned by `GET /api/v1/models`.
 */
export interface ModelRegistryListResponse {
  ok: true;
  items: NormalizedModelRegistry[];
  count: number;
}
