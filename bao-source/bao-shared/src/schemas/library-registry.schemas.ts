/**
 * Library Registry schemas for unified library tracking.
 *
 * Defines TypeBox schemas for aggregated library inventory across server,
 * client, and bunbuddy runtimes.
 *
 * @shared/schemas/library-registry.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";

// Library Source

/**
 * Supported library inventory sources.
 */
export const LIBRARY_SOURCES: readonly ["server", "client", "bunbuddy"] = [
  "server",
  "client",
  "bunbuddy",
] as const;

/**
 * Type-safe library source enumeration.
 */
export type LibrarySource = (typeof LIBRARY_SOURCES)[number];

/**
 * Library source schema.
 */
export const LibrarySourceSchema: Type.TUnion<
  [
    Type.TLiteral<"server" | "client" | "bunbuddy">,
    ...Type.TLiteral<"server" | "client" | "bunbuddy">[],
  ]
> = stringEnum(LIBRARY_SOURCES, {
  description: "Library inventory source",
});

// Library Status

/**
 * Supported library status values.
 */
export const LIBRARY_STATUSES: readonly ["available", "unavailable"] = [
  "available",
  "unavailable",
] as const;

/**
 * Type-safe library status enumeration.
 */
export type LibraryStatus = (typeof LIBRARY_STATUSES)[number];

/**
 * Library status schema.
 */
export const LibraryStatusSchema: Type.TUnion<
  [Type.TLiteral<"available" | "unavailable">, ...Type.TLiteral<"available" | "unavailable">[]]
> = stringEnum(LIBRARY_STATUSES, {
  description: "Library availability status",
});

// Library Categories

/**
 * Supported library registry categories.
 */
export const LIBRARY_CATEGORIES: readonly [
  "ai",
  "training",
  "hardware",
  "drone",
  "robotics",
  "xr",
  "usd",
  "mcp",
  "spa",
] = ["ai", "training", "hardware", "drone", "robotics", "xr", "usd", "mcp", "spa"] as const;

/**
 * Type-safe library category enumeration.
 */
export type LibraryCategory = (typeof LIBRARY_CATEGORIES)[number];

/**
 * Library category schema.
 */
export const LibraryCategorySchema: Type.TUnion<
  [
    Type.TLiteral<
      "ai" | "training" | "hardware" | "drone" | "robotics" | "xr" | "usd" | "mcp" | "spa"
    >,
    ...Type.TLiteral<
      "ai" | "training" | "hardware" | "drone" | "robotics" | "xr" | "usd" | "mcp" | "spa"
    >[],
  ]
> = stringEnum(LIBRARY_CATEGORIES, {
  description: "Library category label",
});

// Library Entry

/**
 * Schema for a library registry entry.
 */
export const LibraryEntrySchema = Type.Object(
  {
    name: Type.String({ minLength: 1, description: "Library name" }),
    version: Type.String({ minLength: 1, description: "Library version string" }),
    source: LibrarySourceSchema,
    runtime: Type.String({ minLength: 1, description: "Runtime identifier (bun/python/htmx)" }),
    status: LibraryStatusSchema,
    bunbuddyKind: Type.Optional(BunBuddyKindSchema),
    endpoints: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), { description: "Related endpoints" }),
    ),
    features: Type.Optional(
      Type.Record(Type.String(), Type.Boolean(), { description: "Related feature flags" }),
    ),
    categories: Type.Optional(
      Type.Array(LibraryCategorySchema, {
        description: "Capability categories derived from endpoint hints",
      }),
    ),
    notes: Type.Optional(Type.Array(Type.String())),
    lastSeen: Type.String({ format: "date-time", description: "Last observation timestamp" }),
    metadata: Type.Optional(
      Type.Record(Type.String(), Type.Unknown(), { description: "Additional metadata" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library registry entries.
 */
export type LibraryEntry = Static<typeof LibraryEntrySchema>;

// Library Registry Responses

/**
 * Schema for library registry list responses.
 */
export const LibraryRegistryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(LibraryEntrySchema),
    count: Type.Integer({ minimum: 0 }),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library registry list responses.
 */
export type LibraryRegistryResponse = Static<typeof LibraryRegistryResponseSchema>;

/**
 * Schema for a single-library detail response.
 */
export const LibraryDetailResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    name: Type.String({ minLength: 1 }),
    entries: Type.Array(LibraryEntrySchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library detail responses.
 */
export type LibraryDetailResponse = Static<typeof LibraryDetailResponseSchema>;

// Library Coverage Responses

/**
 * Schema for a library coverage bucket.
 */
export const LibraryCoverageBucketSchema: Type.TObject<
  {
    readonly category: Type.TUnion<
      [
        Type.TLiteral<
          "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
        >,
        ...Type.TLiteral<
          "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
        >[],
      ]
    >;
    readonly label: Type.TString;
    readonly total: Type.TInteger;
    readonly sources: Type.TRecord<
      Type.TUnion<
        [
          Type.TLiteral<"bunbuddy" | "server" | "client">,
          ...Type.TLiteral<"bunbuddy" | "server" | "client">[],
        ]
      >,
      Type.TInteger
    >;
    readonly libraries: Type.TArray<Type.TString>;
    readonly missing: Type.TArray<Type.TString>;
  },
  "label" | "total" | "sources" | "libraries" | "missing" | "category",
  never
> = Type.Object(
  {
    category: LibraryCategorySchema,
    label: Type.String({ minLength: 1 }),
    total: Type.Integer({ minimum: 0 }),
    sources: Type.Record(LibrarySourceSchema, Type.Integer({ minimum: 0 })),
    libraries: Type.Array(Type.String({ minLength: 1 })),
    missing: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library coverage buckets.
 */
export type LibraryCoverageBucket = Static<typeof LibraryCoverageBucketSchema>;

/**
 * Schema for library coverage responses.
 */
export const LibraryCoverageResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    buckets: Type.Array(LibraryCoverageBucketSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library coverage responses.
 */
export type LibraryCoverageResponse = Static<typeof LibraryCoverageResponseSchema>;

// Library Overview Responses

/**
 * Schema for library overview summary counts.
 */
export const LibraryOverviewSummarySchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly bySource: Type.TRecord<
      Type.TUnion<
        [
          Type.TLiteral<"bunbuddy" | "server" | "client">,
          ...Type.TLiteral<"bunbuddy" | "server" | "client">[],
        ]
      >,
      Type.TInteger
    >;
    readonly byCategory: Type.TRecord<
      Type.TUnion<
        [
          Type.TLiteral<
            "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
          >,
          ...Type.TLiteral<
            "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
          >[],
        ]
      >,
      Type.TInteger
    >;
    readonly missingTotal: Type.TInteger;
  },
  "total" | "bySource" | "byCategory" | "missingTotal",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0 }),
    bySource: Type.Record(LibrarySourceSchema, Type.Integer({ minimum: 0 })),
    byCategory: Type.Record(LibraryCategorySchema, Type.Integer({ minimum: 0 })),
    missingTotal: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library overview summary counts.
 */
export type LibraryOverviewSummary = Static<typeof LibraryOverviewSummarySchema>;

/**
 * Schema for library overview responses.
 */
export const LibraryOverviewResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    registry: LibraryRegistryResponseSchema,
    coverage: LibraryCoverageResponseSchema,
    summary: LibraryOverviewSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library overview responses.
 */
export type LibraryOverviewResponse = Static<typeof LibraryOverviewResponseSchema>;

// Library Registry Refresh Requests

/**
 * Schema for library registry refresh requests.
 */
export const LibraryRegistryRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Optional idempotency key for refresh requests" }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library registry refresh requests.
 */
export type LibraryRegistryRefreshRequest = Static<typeof LibraryRegistryRefreshRequestSchema>;
