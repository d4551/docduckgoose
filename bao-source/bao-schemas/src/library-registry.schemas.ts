/**
 * Library Registry schemas for unified library tracking.
 *
 * Defines TypeBox schemas for aggregated library inventory across server,
 * client, and bunbuddy runtimes.
 *
 * @shared/schemas/library-registry.ts
 */

import type {
  Static,
  TArray,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const LibrarySourceSchema: TUnion<
  [TLiteral<"server" | "client" | "bunbuddy">, ...TLiteral<"server" | "client" | "bunbuddy">[]]
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
export const LibraryStatusSchema: TUnion<
  [TLiteral<"available" | "unavailable">, ...TLiteral<"available" | "unavailable">[]]
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
export const LibraryCategorySchema: TUnion<
  [
    TLiteral<"ai" | "training" | "hardware" | "drone" | "robotics" | "xr" | "usd" | "mcp" | "spa">,
    ...TLiteral<
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
export const LibraryEntrySchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1, description: "Library name" }),
    version: TypeExports.String({ minLength: 1, description: "Library version string" }),
    source: LibrarySourceSchema,
    runtime: TypeExports.String({
      minLength: 1,
      description: "Runtime identifier (bun/python/htmx)",
    }),
    status: LibraryStatusSchema,
    bunbuddyKind: TypeExports.Optional(BunBuddyKindSchema),
    endpoints: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), { description: "Related endpoints" }),
    ),
    features: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Boolean(), {
        description: "Related feature flags",
      }),
    ),
    categories: TypeExports.Optional(
      TypeExports.Array(LibraryCategorySchema, {
        description: "Capability categories derived from endpoint hints",
      }),
    ),
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    lastSeen: TypeExports.String({
      format: "date-time",
      description: "Last observation timestamp",
    }),
    metadata: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown(), {
        description: "Additional metadata",
      }),
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
export const LibraryRegistryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(LibraryEntrySchema),
    count: TypeExports.Integer({ minimum: 0 }),
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const LibraryDetailResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    name: TypeExports.String({ minLength: 1 }),
    entries: TypeExports.Array(LibraryEntrySchema),
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const LibraryCoverageBucketSchema: TObject<
  {
    readonly category: TUnion<
      [
        TLiteral<
          "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
        >,
        ...TLiteral<
          "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
        >[],
      ]
    >;
    readonly label: TString;
    readonly total: TInteger;
    readonly sources: TRecord<
      TUnion<
        [
          TLiteral<"bunbuddy" | "server" | "client">,
          ...TLiteral<"bunbuddy" | "server" | "client">[],
        ]
      >,
      TInteger
    >;
    readonly libraries: TArray<TString>;
    readonly missing: TArray<TString>;
  },
  "label" | "total" | "sources" | "libraries" | "missing" | "category",
  never
> = TypeExports.Object(
  {
    category: LibraryCategorySchema,
    label: TypeExports.String({ minLength: 1 }),
    total: TypeExports.Integer({ minimum: 0 }),
    sources: TypeExports.Record(LibrarySourceSchema, TypeExports.Integer({ minimum: 0 })),
    libraries: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    missing: TypeExports.Array(TypeExports.String({ minLength: 1 })),
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
export const LibraryCoverageResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    buckets: TypeExports.Array(LibraryCoverageBucketSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const LibraryOverviewSummarySchema: TObject<
  {
    readonly total: TInteger;
    readonly bySource: TRecord<
      TUnion<
        [
          TLiteral<"bunbuddy" | "server" | "client">,
          ...TLiteral<"bunbuddy" | "server" | "client">[],
        ]
      >,
      TInteger
    >;
    readonly byCategory: TRecord<
      TUnion<
        [
          TLiteral<
            "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
          >,
          ...TLiteral<
            "drone" | "robotics" | "training" | "ai" | "xr" | "usd" | "mcp" | "hardware" | "spa"
          >[],
        ]
      >,
      TInteger
    >;
    readonly missingTotal: TInteger;
  },
  "total" | "bySource" | "byCategory" | "missingTotal",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0 }),
    bySource: TypeExports.Record(LibrarySourceSchema, TypeExports.Integer({ minimum: 0 })),
    byCategory: TypeExports.Record(LibraryCategorySchema, TypeExports.Integer({ minimum: 0 })),
    missingTotal: TypeExports.Integer({ minimum: 0 }),
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
export const LibraryOverviewResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    registry: LibraryRegistryResponseSchema,
    coverage: LibraryCoverageResponseSchema,
    summary: LibraryOverviewSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const LibraryRegistryRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional idempotency key for refresh requests",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for library registry refresh requests.
 */
export type LibraryRegistryRefreshRequest = Static<typeof LibraryRegistryRefreshRequestSchema>;
