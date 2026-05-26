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

import type { Static, TProperties } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

// Shared observability fields (DRY: single source of truth)

/**
 * Observability fields shared across all response envelopes.
 *
 * Includes W3C trace context identifiers, correlation IDs, and request metadata
 * so that every API response can be correlated with distributed traces.
 */
export const observabilityFields: {
  readonly timestamp: Type.TString;
  readonly correlationId: Type.TOptional<Type.TString>;
  readonly requestId: Type.TOptional<Type.TString>;
  readonly path: Type.TOptional<Type.TString>;
  readonly traceId: Type.TOptional<Type.TString>;
  readonly spanId: Type.TOptional<Type.TString>;
  readonly parentSpanId: Type.TOptional<Type.TString>;
} = {
  timestamp: Type.String({ minLength: 1, description: "ISO 8601 timestamp" }),
  correlationId: Type.Optional(Type.String({ description: "Request correlation ID for tracing" })),
  requestId: Type.Optional(Type.String({ description: "Request ID for tracing" })),
  path: Type.Optional(Type.String({ description: "Request path" })),
  traceId: Type.Optional(Type.String({ description: "Trace identifier (W3C trace id)" })),
  spanId: Type.Optional(Type.String({ description: "Span identifier (W3C span id)" })),
  parentSpanId: Type.Optional(
    Type.String({ description: "Parent span identifier (derived from inbound context)" }),
  ),
} as const satisfies TProperties;

/**
 * Build a Type.Object envelope schema with observability fields merged in.
 *
 * @param fields - Domain-specific fields for this envelope.
 * @param meta - TypeBox object metadata ($id, description, additionalProperties).
 * @returns TypeBox object schema with observability fields appended.
 */
function envelopeSchema<T extends TProperties>(
  fields: T,
  meta: { description: string },
): ReturnType<typeof Type.Object> {
  return Type.Object(
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
    ok: Type.Boolean({
      description:
        "Always false for error responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    error: Type.String({ minLength: 1, description: "Error message" }),
    message: Type.Optional(Type.String({ description: "Optional detailed error message" })),
    messageKey: Type.Optional(Type.String({ description: "i18n key for localized error message" })),
    details: Type.Optional(JsonValueSchema),
    code: Type.String({ minLength: 1, description: "Error code for programmatic handling" }),
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
    ok: Type.Boolean({
      description:
        "Always true for success responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: Type.Optional(Type.String({ description: "Success message" })),
    data: Type.Optional(JsonValueSchema),
    count: Type.Optional(Type.Number({ description: "Optional total count for list endpoints" })),
    hasMore: Type.Optional(
      Type.Boolean({ description: "Optional pagination hint indicating additional results exist" }),
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
    ok: Type.Boolean({
      description:
        "Always true for paginated success responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: Type.Optional(Type.String({ description: "Success message" })),
    items: Type.Array(JsonValueSchema),
    total: Type.Number({ description: "Total number of items" }),
    page: Type.Number({ description: "Current page number" }),
    pageSize: Type.Number({ description: "Items per page" }),
    totalPages: Type.Number({ description: "Total number of pages" }),
    hasMore: Type.Optional(Type.Boolean({ description: "Whether more pages exist" })),
    cursor: Type.Optional(Type.String({ description: "Optional pagination cursor" })),
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
    ok: Type.Boolean({
      description:
        "Always true for created responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: Type.Optional(Type.String({ description: "Creation success message" })),
    id: Type.String({ minLength: 1, description: "ID of the created resource" }),
    data: Type.Optional(JsonValueSchema),
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
    ok: Type.Boolean({
      description:
        "Always true for updated responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: Type.Optional(Type.String({ description: "Update success message" })),
    id: Type.String({ minLength: 1, description: "ID of the updated resource" }),
    data: Type.Optional(JsonValueSchema),
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
    ok: Type.Boolean({
      description:
        "Always true for deleted responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: Type.Optional(Type.String({ description: "Deletion success message" })),
    id: Type.String({ minLength: 1, description: "ID of the deleted resource" }),
    deleted: Type.Boolean({
      description:
        "Always true when deletion succeeds; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
  },
  { description: "Response envelope for resource deletion." },
);

/** TypeScript type for {@link DeletedResponseSchema}. */
export type DeletedResponse = Static<typeof DeletedResponseSchema>;
