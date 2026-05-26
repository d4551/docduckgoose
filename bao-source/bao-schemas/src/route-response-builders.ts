/**
 * Builders for standardized route response envelopes.
 *
 * TypeBox schemas for envelopes are shared across server and clients. These helpers
 * avoid duplicating the full envelope property list when a route wants a typed
 * `data` payload while still allowing trace metadata fields.
 *
 * @shared/schemas/route-response-builders
 */

import type { TSchema } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Build an enhanced success envelope schema with a typed `data` payload.
 *
 * `timestamp` is required and trace metadata fields are optional. Additional
 * top-level fields remain allowed to avoid contract drift when new metadata is
 * introduced (for example, `requestId` or `traceId`).
 *
 * @param dataSchema - TypeBox schema for the response `data` payload.
 * @param options - Schema options.
 * @param options.$id - Stable schema ID.
 * @param options.description - Optional description.
 * @param options.dataRequired - When true, `data` is required (default: true).
 * @returns TypeBox schema for an enhanced success response.
 */
export function enhancedSuccessWithDataSchema<T extends TSchema>(
  dataSchema: T,
  options: {
    description?: string;
    dataRequired?: boolean;
  } = {},
): ReturnType<typeof TypeExports.Object> {
  const dataRequired = options.dataRequired ?? true;

  return TypeExports.Object(
    {
      ok: TypeExports.Boolean({
        description:
          "Always true for success responses; modeled as boolean for OpenAPI 3.0 compatibility.",
      }),
      message: TypeExports.Optional(TypeExports.String({ description: "Success message" })),
      data: dataRequired ? dataSchema : TypeExports.Optional(dataSchema),
      count: TypeExports.Optional(
        TypeExports.Number({ description: "Optional total count for list endpoints" }),
      ),
      hasMore: TypeExports.Optional(
        TypeExports.Boolean({
          description: "Optional pagination hint indicating additional results exist",
        }),
      ),
      timestamp: TypeExports.String({ minLength: 1, description: "ISO 8601 timestamp" }),
      correlationId: TypeExports.Optional(
        TypeExports.String({ description: "Request correlation ID for tracing" }),
      ),
      requestId: TypeExports.Optional(
        TypeExports.String({ description: "Request ID for tracing" }),
      ),
      path: TypeExports.Optional(TypeExports.String({ description: "Request path" })),
      traceId: TypeExports.Optional(
        TypeExports.String({ description: "Trace identifier (W3C trace id)" }),
      ),
      spanId: TypeExports.Optional(
        TypeExports.String({ description: "Span identifier (W3C span id)" }),
      ),
      parentSpanId: TypeExports.Optional(
        TypeExports.String({
          description: "Parent span identifier (derived from inbound context)",
        }),
      ),
    },
    {
      additionalProperties: false,
      description: options.description ?? "Standardized success envelope with typed data payload.",
    },
  );
}
