/**
 * Shared error envelope helpers.
 *
 * Builds {@link DetailedErrorResponse} payloads outside the API runtime so that
 * scripts and non-Elysia boundaries can emit consistent, typed error envelopes.
 *
 * @baohaus/bao-utils/error-envelope
 */

import type { DetailedErrorResponse } from "@baohaus/bao-schemas/route-response.schemas";
import { resolveCurrentIsoTimestamp } from "./timestamp";

/**
 * Extra envelope fields used for tracing / context.
 */
export type ErrorEnvelopeExtra = {
  correlationId?: string;
  requestId?: string;
  path?: string;
  messageKey?: string;
};

/**
 * Build an enhanced error envelope payload.
 *
 * @param params - Envelope parameters.
 * @returns Detailed error envelope object.
 */
export function buildDetailedErrorEnvelope(params: {
  code: string;
  error: string;
  message?: string;
  details?: unknown;
  timestamp?: string;
  extra?: ErrorEnvelopeExtra;
}): DetailedErrorResponse & Record<string, unknown> {
  return {
    ok: false as const,
    code: params.code,
    error: params.error,
    timestamp: params.timestamp ?? resolveCurrentIsoTimestamp(),
    ...(params.message ? { message: params.message } : {}),
    ...(params.details === undefined ? {} : { details: params.details }),
    ...(params.extra?.correlationId ? { correlationId: params.extra.correlationId } : {}),
    ...(params.extra?.requestId ? { requestId: params.extra.requestId } : {}),
    ...(params.extra?.path ? { path: params.extra.path } : {}),
    ...(params.extra?.messageKey ? { messageKey: params.extra.messageKey } : {}),
  };
}
