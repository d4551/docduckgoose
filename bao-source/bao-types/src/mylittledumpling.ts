/**
 * My Little Dumpling shared types.
 *
 * Cross-boundary types for the coding-context retrieval service.
 * Server-only types live in `apps/server/services/mylittledumpling/mylittledumpling.types.ts`.
 *
 * @shared/types/mylittledumpling.ts
 */

/**
 * Library index lifecycle status.
 */
export type MldLibraryIndexStatus =
  | "pending"
  | "discovering"
  | "collecting"
  | "indexing"
  | "ready"
  | "error"
  | "stale";

/**
 * Ordered library index statuses for UI iteration.
 */
export const MLD_LIBRARY_INDEX_STATUSES: readonly [
  "pending",
  "discovering",
  "collecting",
  "indexing",
  "ready",
  "error",
  "stale",
] = [
  "pending",
  "discovering",
  "collecting",
  "indexing",
  "ready",
  "error",
  "stale",
] as const satisfies readonly MldLibraryIndexStatus[];

/**
 * Source reputation for library documentation.
 */
export type MldLibrarySourceReputation = "official" | "community" | "internal";

/**
 * Library record for the index registry.
 */
export interface MldLibraryRecord {
  /** Unique identifier. */
  id: string;
  /** Canonical slug: "elysia", "prisma", "daisyui". */
  name: string;
  /** Alternate names: ["elysiajs", "elysia.js"]. */
  aliases: readonly string[];
  /** Documentation source URLs. */
  sourceUrls: readonly string[];
  /** Primary llms.txt URL when available. */
  llmsTxtUrl: string | null;
  /** Lifecycle status. */
  indexStatus: MldLibraryIndexStatus;
  /** ISO-8601 timestamp of last crawl. */
  lastCrawledAt: string | null;
  /** Number of indexed snippets. */
  snippetCount: number;
  /** Source reputation indicator. */
  sourceReputation: MldLibrarySourceReputation;
  /** Pinned version string (null = track latest). */
  version: string | null;
}

/**
 * Library pack definition.
 */
export interface MldLibraryPackRecord {
  /** Unique identifier. */
  id: string;
  /** Pack name: "baohaus-stack". */
  name: string;
  /** Description. */
  description: string;
  /** Member library IDs. */
  libraryIds: readonly string[];
  /** Whether this pack is a built-in. */
  isBuiltin: boolean;
}

/**
 * Library snippet returned by context retrieval.
 */
export interface MldLibrarySnippet {
  /** Library identifier. */
  libraryId: string;
  /** Library canonical name. */
  libraryName: string;
  /** Chunk index within the source page. */
  chunkIndex: number;
  /** Snippet text content. */
  text: string;
  /** Relevance score (0-1). */
  score: number;
  /** Retrieval strategy used. */
  strategy: "vector" | "keyword" | "hybrid";
  /** Content hash for deduplication. */
  contentHash: string;
  /** Source URL the snippet was collected from. */
  sourceUrl: string;
}
