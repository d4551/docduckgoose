/**
 * RAG source taxonomy and UI metadata.
 *
 * Centralizes RAG source types for server schemas and client UX so that
 * RAG-capable surfaces stay aligned without hardcoded duplication.
 *
 * @shared/types/rag.ts
 */

/**
 * Source types backed by stored embeddings.
 */
export const RAG_EMBEDDING_SOURCE_TYPES: readonly [
  "case",
  "report",
  "document",
  "image",
  "annotation",
  "custom",
  "memory",
  "library-doc",
] = [
  "case",
  "report",
  "document",
  "image",
  "annotation",
  "custom",
  "memory",
  "library-doc",
] as const;

/**
 * Embedding-backed RAG source type.
 */
export type RagEmbeddingSourceType = (typeof RAG_EMBEDDING_SOURCE_TYPES)[number];

/**
 * Full list of RAG source types, including MCP-backed resources.
 */
export const RAG_SOURCE_TYPES: readonly [
  "case",
  "report",
  "document",
  "image",
  "annotation",
  "custom",
  "memory",
  "library-doc",
  "mcp",
] = [...RAG_EMBEDDING_SOURCE_TYPES, "mcp"] as const;

/**
 * RAG source type.
 */
export type RagSourceType = (typeof RAG_SOURCE_TYPES)[number];

/**
 * RAG source classification.
 */
export type RagSourceKind = "embedding" | "mcp";

/**
 * RAG source reference provided by callers.
 */
export interface RagSourceRef {
  /** Source type identifier. */
  sourceType: RagSourceType;
  /** Source identifier (record id or MCP URI). */
  sourceId: string;
  /** Optional chunk limit override for this source. */
  maxChunks?: number;
  /** Optional UI label for display surfaces. */
  label?: string;
}

/**
 * Display metadata for RAG source types.
 */
export interface RagSourceTypeMetadata {
  /** Source type identifier. */
  type: RagSourceType;
  /** Source kind grouping. */
  kind: RagSourceKind;
  /** Display label. */
  label: string;
  /** Short description for UI copy. */
  description: string;
  /** Iconify icon identifier. */
  icon: string;
}

/**
 * RAG source metadata lookup.
 */
export const RAG_SOURCE_TYPE_METADATA: Record<RagSourceType, RagSourceTypeMetadata> = {
  case: {
    type: "case",
    kind: "embedding",
    label: "Cases",
    description: "Case records and patient context.",
    icon: "lucide--folder-open",
  },
  report: {
    type: "report",
    kind: "embedding",
    label: "Reports",
    description: "Analysis and reporting artifacts.",
    icon: "lucide--file-text",
  },
  document: {
    type: "document",
    kind: "embedding",
    label: "Documents",
    description: "Uploaded reference documents.",
    icon: "lucide--file",
  },
  image: {
    type: "image",
    kind: "embedding",
    label: "Images",
    description: "Image-derived embeddings.",
    icon: "lucide--image",
  },
  annotation: {
    type: "annotation",
    kind: "embedding",
    label: "Annotations",
    description: "Annotation sets and geometry notes.",
    icon: "lucide--message-square",
  },
  custom: {
    type: "custom",
    kind: "embedding",
    label: "Custom",
    description: "Custom embedding sources.",
    icon: "lucide--paperclip",
  },
  memory: {
    type: "memory",
    kind: "embedding",
    label: "Memory",
    description: "Long-term chat memory summaries and facts.",
    icon: "lucide--brain",
  },
  "library-doc": {
    type: "library-doc",
    kind: "embedding",
    label: "Library Docs",
    description: "Indexed library documentation for coding-context retrieval.",
    icon: "lucide--book-open",
  },
  mcp: {
    type: "mcp",
    kind: "mcp",
    label: "MCP Resources",
    description: "Vault MCP resources (XR, USD, hardware, AI, annotations).",
    icon: "lucide--boxes",
  },
};

/**
 * Resolve RAG source metadata with a safe fallback.
 *
 * @param value - Candidate source type.
 * @returns Metadata for the resolved source type.
 */
export function resolveRagSourceTypeMetadata(value: unknown): RagSourceTypeMetadata {
  const normalized = typeof value === "string" ? value.trim() : "";
  const key = (RAG_SOURCE_TYPE_METADATA as Record<string, RagSourceTypeMetadata>)[normalized];
  return key ?? RAG_SOURCE_TYPE_METADATA.custom;
}
