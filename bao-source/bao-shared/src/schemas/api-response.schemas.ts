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

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Success response envelope schema.
 *
 * This matches the platform-wide `{ ok: true, ... }` success shape.
 */
export const SuccessResponseSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly message: Type.TOptional<Type.TString>;
    readonly data: Type.TOptional<Type.TUnknown>;
    readonly count: Type.TOptional<Type.TNumber>;
    readonly hasMore: Type.TOptional<Type.TBoolean>;
    readonly timestamp: Type.TOptional<Type.TString>;
  },
  "ok",
  Type.InferOptionalKeys<{
    readonly ok: Type.TBoolean;
    readonly message: Type.TOptional<Type.TString>;
    readonly data: Type.TOptional<Type.TUnknown>;
    readonly count: Type.TOptional<Type.TNumber>;
    readonly hasMore: Type.TOptional<Type.TBoolean>;
    readonly timestamp: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ok: Type.Boolean({
      description:
        "Always true for successful responses; modeled as boolean for OpenAPI 3.0 compatibility.",
    }),
    message: Type.Optional(Type.String({ description: "Success message" })),
    data: Type.Optional(JsonValueSchema),
    count: Type.Optional(Type.Number({ description: "Optional total count for list endpoints" })),
    hasMore: Type.Optional(
      Type.Boolean({ description: "Optional pagination hint indicating additional results exist" }),
    ),
    timestamp: Type.Optional(Type.String({ description: "ISO 8601 timestamp" })),
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
export const ErrorResponseSchema = Type.Object(
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
    timestamp: Type.String({ minLength: 1, description: "ISO 8601 timestamp" }),
    correlationId: Type.Optional(
      Type.String({ description: "Request correlation ID for tracing" }),
    ),
    requestId: Type.Optional(Type.String({ description: "Request ID for tracing" })),
    path: Type.Optional(Type.String({ description: "Request path" })),
    traceId: Type.Optional(Type.String({ description: "Trace identifier (W3C trace id)" })),
    spanId: Type.Optional(Type.String({ description: "Span identifier (W3C span id)" })),
    parentSpanId: Type.Optional(
      Type.String({ description: "Parent span identifier (derived from inbound context)" }),
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
export const PaginatedResponseSchema = Type.Object(
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
    timestamp: Type.Optional(Type.String({ description: "ISO 8601 timestamp" })),
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
export const ApiEnvelopeResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    message: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
    messageKey: Type.Optional(Type.String()),
    code: Type.Optional(Type.String()),
    details: Type.Optional(JsonValueSchema),
    data: Type.Optional(JsonValueSchema),
    count: Type.Optional(Type.Number()),
    hasMore: Type.Optional(Type.Boolean()),
    timestamp: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
    requestId: Type.Optional(Type.String()),
    path: Type.Optional(Type.String()),
    traceId: Type.Optional(Type.String()),
    spanId: Type.Optional(Type.String()),
    parentSpanId: Type.Optional(Type.String()),
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
