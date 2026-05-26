/**
 * Shared route response envelope schemas.
 *
 * Defines "enhanced" response envelopes used by server route contracts where
 * `timestamp` is required. Keeping these in `@shared/` prevents drift between:
 * - Elysia route response schemas
 * - Eden treaty inference
 * - HTML UI hydration types
 *
 * @shared/schemas/route-response
 */

import type { Static, TOptional, TProperties, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

// Shared observability fields (DRY: single source of truth)

/**
 * Observability fields shared across all response envelopes.
 *
 * Includes W3C trace context identifiers, correlation IDs, and request metadata
 * so that every API response can be correlated with distributed traces.
 */
export const observabilityFields: {
  readonly timestamp: TString;
  readonly correlationId: TOptional<TString>;
  readonly requestId: TOptional<TString>;
  readonly path: TOptional<TString>;
  readonly traceId: TOptional<TString>;
  readonly spanId: TOptional<TString>;
  readonly parentSpanId: TOptional<TString>;
} = {
  timestamp: TypeExports.String({ minLength: 1, description: "ISO 8601 timestamp" }),
  correlationId: TypeExports.Optional(
    TypeExports.String({ description: "Request correlation ID for tracing" }),
  ),
  requestId: TypeExports.Optional(TypeExports.String({ description: "Request ID for tracing" })),
  path: TypeExports.Optional(TypeExports.String({ description: "Request path" })),
  traceId: TypeExports.Optional(
    TypeExports.String({ description: "Trace identifier (W3C trace id)" }),
  ),
  spanId: TypeExports.Optional(
    TypeExports.String({ description: "Span identifier (W3C span id)" }),
  ),
  parentSpanId: TypeExports.Optional(
    TypeExports.String({ description: "Parent span identifier (derived from inbound context)" }),
  ),
} as const satisfies TProperties;

/**
 * Build a TypeExports.Object envelope schema with observability fields merged in.
 *
 * @param fields - Domain-specific fields for this envelope.
 * @param meta - TypeBox object metadata ($id, description, additionalProperties).
 * @returns TypeBox object schema with observability fields appended.
 */
function envelopeSchema<T extends TProperties>(
  fields: T,
  meta: { description: string },
): ReturnType<typeof TypeExports.Object> {
  return TypeExports.Object(
    { ...fields, ...observabilityFields },
    { additionalProperties: JsonValueSchema, description: meta.description },
  );
}

// Error envelope

/**
 * Detailed error response envelope schema (timestamp required).
 */
export const DetailedErrorResponseSchema = envelopeSchema(
  {
    ok: TypeExports.Boolean({
      description:
        "Always false for error responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    error: TypeExports.String({ minLength: 1, description: "Error message" }),
    message: TypeExports.Optional(
      TypeExports.String({ description: "Optional detailed error message" }),
    ),
    messageKey: TypeExports.Optional(
      TypeExports.String({ description: "i18n key for localized error message" }),
    ),
    details: TypeExports.Optional(JsonValueSchema),
    code: TypeExports.String({ minLength: 1, description: "Error code for programmatic handling" }),
  },
  {
    description: "Standardized error envelope with required timestamp.",
  },
);

/** TypeScript type for {@link DetailedErrorResponseSchema}. */
export type DetailedErrorResponse = Static<typeof DetailedErrorResponseSchema>;

// Success envelope

/**
 * Detailed success response envelope schema (timestamp required).
 */
export const DetailedSuccessResponseSchema = envelopeSchema(
  {
    ok: TypeExports.Boolean({
      description:
        "Always true for success responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: TypeExports.Optional(TypeExports.String({ description: "Success message" })),
    data: TypeExports.Optional(JsonValueSchema),
    count: TypeExports.Optional(
      TypeExports.Number({ description: "Optional total count for list endpoints" }),
    ),
    hasMore: TypeExports.Optional(
      TypeExports.Boolean({
        description: "Optional pagination hint indicating additional results exist",
      }),
    ),
  },
  {
    description: "Standardized success envelope with required timestamp.",
  },
);

/** TypeScript type for {@link DetailedSuccessResponseSchema}. */
export type DetailedSuccessResponse = Static<typeof DetailedSuccessResponseSchema>;

// Paginated envelope

/**
 * Detailed paginated response envelope schema (timestamp required).
 */
export const DetailedPaginatedResponseSchema = envelopeSchema(
  {
    ok: TypeExports.Boolean({
      description:
        "Always true for paginated success responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: TypeExports.Optional(TypeExports.String({ description: "Success message" })),
    items: TypeExports.Array(JsonValueSchema),
    total: TypeExports.Number({ description: "Total number of items" }),
    page: TypeExports.Number({ description: "Current page number" }),
    pageSize: TypeExports.Number({ description: "Items per page" }),
    totalPages: TypeExports.Number({ description: "Total number of pages" }),
    hasMore: TypeExports.Optional(TypeExports.Boolean({ description: "Whether more pages exist" })),
    cursor: TypeExports.Optional(TypeExports.String({ description: "Optional pagination cursor" })),
  },
  {
    description: "Standardized paginated response envelope with required timestamp.",
  },
);

/** TypeScript type for {@link DetailedPaginatedResponseSchema}. */
export type DetailedPaginatedResponse = Static<typeof DetailedPaginatedResponseSchema>;

// CRUD envelopes

/**
 * Created response schema for POST operations (timestamp required).
 */
export const CreatedResponseSchema = envelopeSchema(
  {
    ok: TypeExports.Boolean({
      description:
        "Always true for created responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: TypeExports.Optional(TypeExports.String({ description: "Creation success message" })),
    id: TypeExports.String({ minLength: 1, description: "ID of the created resource" }),
    data: TypeExports.Optional(JsonValueSchema),
  },
  { description: "Response envelope for resource creation (201)." },
);

/** TypeScript type for {@link CreatedResponseSchema}. */
export type CreatedResponse = Static<typeof CreatedResponseSchema>;

/**
 * Updated response schema for PUT/PATCH operations (timestamp required).
 */
export const UpdatedResponseSchema = envelopeSchema(
  {
    ok: TypeExports.Boolean({
      description:
        "Always true for updated responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: TypeExports.Optional(TypeExports.String({ description: "Update success message" })),
    id: TypeExports.String({ minLength: 1, description: "ID of the updated resource" }),
    data: TypeExports.Optional(JsonValueSchema),
  },
  { description: "Response envelope for resource updates." },
);

/** TypeScript type for {@link UpdatedResponseSchema}. */
export type UpdatedResponse = Static<typeof UpdatedResponseSchema>;

/**
 * Deleted response schema for DELETE operations (timestamp required).
 */
export const DeletedResponseSchema = envelopeSchema(
  {
    ok: TypeExports.Boolean({
      description:
        "Always true for deleted responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: TypeExports.Optional(TypeExports.String({ description: "Deletion success message" })),
    id: TypeExports.String({ minLength: 1, description: "ID of the deleted resource" }),
    deleted: TypeExports.Boolean({
      description:
        "Always true when deletion succeeds; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
  },
  { description: "Response envelope for resource deletion." },
);

/** TypeScript type for {@link DeletedResponseSchema}. */
export type DeletedResponse = Static<typeof DeletedResponseSchema>;
