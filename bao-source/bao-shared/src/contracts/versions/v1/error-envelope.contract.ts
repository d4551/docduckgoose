/**
 * Standard error envelope schema for v1 contracts.
 *
 * Shared TypeBox schema builder to keep error envelopes consistent across
 * contract definitions without duplicating field declarations.
 *
 * Uses the shared {@link observabilityFields} from `@shared/schemas/route-response`
 * to maintain a single source of truth for trace context fields.
 *
 * @shared/contracts/versions/v1/error-envelope
 */

import type { TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { observabilityFields } from "../../../schemas/route-response.schemas";

/** Standard shape for a versioned API contract definition. */
export interface VersionedContractV1 {
  readonly version: string;
  readonly name: string;
  readonly request: TSchema;
  readonly response: TSchema;
  readonly errors?: TSchema;
  readonly [key: string]: unknown;
}

/**
 * Build the standard error envelope schema for v1 contracts.
 *
 * @param id - Unique schema identifier for contract registries.
 * @returns TypeBox schema representing the error envelope.
 */
export function buildErrorEnvelopeSchema(): ReturnType<typeof Type.Object> {
  return Type.Object(
    {
      ok: Type.Literal(false),
      error: Type.String(),
      message: Type.Optional(Type.String()),
      messageKey: Type.Optional(Type.String()),
      details: Type.Optional(Type.Unknown()),
      code: Type.String(),
      ...observabilityFields,
    },
    {
      additionalProperties: true,
    },
  );
}
