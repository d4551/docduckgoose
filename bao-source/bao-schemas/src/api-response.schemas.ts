/**
 * Shared API response envelope schemas.
 *
 * Canonical `{ ok: ... }` response envelopes used across server + clients.
 * Keeping these schemas in `@shared/` prevents contract drift between:
 * - Elysia runtime validation/OpenAPI
 * - Eden treaty inference
 * - HTML UI hydration and error handling
 *
 * @shared/schemas/api-response
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Success response envelope schema.
 *
 * This matches the platform-wide `{ ok: true, ... }` success shape.
 */
export const SuccessResponseSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly message: TOptional<TString>;
    readonly data: TOptional<TUnknown>;
    readonly count: TOptional<TNumber>;
    readonly hasMore: TOptional<TBoolean>;
    readonly timestamp: TOptional<TString>;
  },
  "ok",
  InferOptionalKeys<{
    readonly ok: TBoolean;
    readonly message: TOptional<TString>;
    readonly data: TOptional<TUnknown>;
    readonly count: TOptional<TNumber>;
    readonly hasMore: TOptional<TBoolean>;
    readonly timestamp: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean({
      description:
        "Always true for successful responses; modeled as boolean for OpenAPI 3.0 compatibility.",
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
    timestamp: TypeExports.Optional(TypeExports.String({ description: "ISO 8601 timestamp" })),
  },
  {
    additionalProperties: JsonValueSchema,
    description: "Standard success envelope returned by API endpoints.",
  },
);

/**
 * TypeScript type for {@link SuccessResponseSchema}.
 */
export type SuccessResponse = Static<typeof SuccessResponseSchema>;

/**
 * Error response envelope schema.
 *
 * Includes required `code` and optional correlation identifiers for tracing.
 */
export const ErrorResponseSchema = TypeExports.Object(
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
  },
  {
    additionalProperties: JsonValueSchema,
    description: "Standard error envelope returned by API endpoints.",
  },
);

/**
 * TypeScript type for {@link ErrorResponseSchema}.
 */
export type ErrorResponse = Static<typeof ErrorResponseSchema>;

/**
 * Paginated response envelope schema.
 */
export const PaginatedResponseSchema = TypeExports.Object(
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
    timestamp: TypeExports.Optional(TypeExports.String({ description: "ISO 8601 timestamp" })),
  },
  {
    additionalProperties: JsonValueSchema,
    description: "Standard paginated response envelope.",
  },
);

/**
 * TypeScript type for {@link PaginatedResponseSchema}.
 */
export type PaginatedResponse = Static<typeof PaginatedResponseSchema>;

/**
 * Generic API envelope schema for endpoints that may return `ok: false` with a 200 status.
 *
 * This is intentionally permissive: it keeps response validation from turning business-level
 * failures into transport-level errors while still enforcing the presence of `ok`.
 */
export const ApiEnvelopeResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    message: TypeExports.Optional(TypeExports.String()),
    error: TypeExports.Optional(TypeExports.String()),
    messageKey: TypeExports.Optional(TypeExports.String()),
    code: TypeExports.Optional(TypeExports.String()),
    details: TypeExports.Optional(JsonValueSchema),
    data: TypeExports.Optional(JsonValueSchema),
    count: TypeExports.Optional(TypeExports.Number()),
    hasMore: TypeExports.Optional(TypeExports.Boolean()),
    timestamp: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
    requestId: TypeExports.Optional(TypeExports.String()),
    path: TypeExports.Optional(TypeExports.String()),
    traceId: TypeExports.Optional(TypeExports.String()),
    spanId: TypeExports.Optional(TypeExports.String()),
    parentSpanId: TypeExports.Optional(TypeExports.String()),
  },
  {
    additionalProperties: JsonValueSchema,
    description: "Permissive API envelope used by endpoints that may return ok=false with a 200.",
  },
);

/**
 * TypeScript type for {@link ApiEnvelopeResponseSchema}.
 */
export type ApiEnvelopeResponse = Static<typeof ApiEnvelopeResponseSchema>;
