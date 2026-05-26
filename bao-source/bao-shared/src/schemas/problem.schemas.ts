/**
 * RFC 9457 Problem Details schema.
 *
 * Provides a canonical error envelope for HTTP APIs using "Problem Details for HTTP APIs"
 * (RFC 9457). This is intended to be shared across the server and Bun/Elysia bunbuddies.
 *
 * @shared/schemas/problem.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * RFC 9457 Problem Details JSON object (with Baohaus extensions).
 *
 * @remarks
 * RFC 9457 allows extension members. We standardize a few extensions across services:
 * - `code`: machine-readable error code
 * - `details`: structured context payload
 * - `service`: emitting service identifier
 * - `correlationId` / `requestId`: request correlation identifiers when available
 */
export const ProblemDetailsSchema = Type.Object(
  {
    type: Type.Optional(Type.String({ minLength: 1, description: "Problem type URI reference." })),
    title: Type.Optional(
      Type.String({ minLength: 1, description: "Short, human-readable summary of the problem." }),
    ),
    status: Type.Optional(
      Type.Integer({ minimum: 100, maximum: 599, description: "HTTP status code." }),
    ),
    detail: Type.Optional(
      Type.String({ minLength: 1, description: "Human-readable explanation of this occurrence." }),
    ),
    instance: Type.Optional(
      Type.String({ minLength: 1, description: "URI reference identifying this occurrence." }),
    ),

    // Baohaus extensions
    code: Type.Optional(
      Type.String({ minLength: 1, description: "Machine-readable error code extension." }),
    ),
    details: Type.Optional(Type.Unknown({ description: "Structured error context extension." })),
    service: Type.Optional(
      Type.String({ minLength: 1, description: "Emitting service identifier extension." }),
    ),
    correlationId: Type.Optional(
      Type.String({ minLength: 1, description: "Correlation identifier extension." }),
    ),
    requestId: Type.Optional(
      Type.String({ minLength: 1, description: "Request identifier extension." }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for {@link ProblemDetailsSchema}.
 */
export type ProblemDetails = Static<typeof ProblemDetailsSchema>;
