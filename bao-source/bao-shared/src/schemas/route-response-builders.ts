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
import { TypeExports as Type } from "@baohaus/baobox/elysia";

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
): ReturnType<typeof Type.Object> {
  const dataRequired = options.dataRequired ?? true;

  return Type.Object(
    {
      ok: Type.Boolean({
        description:
          "Always true for success responses; modeled as boolean for OpenAPI 3.0 compatibility.",
      }),
      message: Type.Optional(Type.String({ description: "Success message" })),
      data: dataRequired ? dataSchema : Type.Optional(dataSchema),
      count: Type.Optional(Type.Number({ description: "Optional total count for list endpoints" })),
      hasMore: Type.Optional(
        Type.Boolean({
          description: "Optional pagination hint indicating additional results exist",
        }),
      ),
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
      additionalProperties: false,
      description: options.description ?? "Standardized success envelope with typed data payload.",
    },
  );
}
