/**
 * BaoDown Orchestration Contract v1 — shared internals.
 *
 * Module-private building blocks consumed by sibling section modules:
 * version constant, common error envelope, and reusable param schemas.
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema } from "../error-envelope.contract";

/**
 * Contract version identifier.
 */
export const BAODOWN_CONTRACT_VERSION = "1.0.0";

/** Standard HTTP error statuses for BaoDown endpoints. */
const BaoDownErrorEnvelope: ReturnType<typeof buildErrorEnvelopeSchema> =
  buildErrorEnvelopeSchema();

/**
 * Common error schema for BaoDown endpoints.
 */
export const BaoDownErrorsV1 = Type.Object(
  {
    400: BaoDownErrorEnvelope,
    401: BaoDownErrorEnvelope,
    403: BaoDownErrorEnvelope,
    404: BaoDownErrorEnvelope,
    409: BaoDownErrorEnvelope,
    422: BaoDownErrorEnvelope,
    429: BaoDownErrorEnvelope,
    500: BaoDownErrorEnvelope,
    503: BaoDownErrorEnvelope,
  },
  { additionalProperties: false },
);

export const UuidParam = Type.Object({ id: Type.String({ format: "uuid" }) }, {});

export const DefinitionVersionParams = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    versionId: Type.String({ format: "uuid" }),
  },
  {},
);

export const DefinitionScheduleParams = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    scheduleId: Type.String({ format: "uuid" }),
  },
  {},
);

export const DefinitionWebhookParams = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    webhookId: Type.String({ format: "uuid" }),
  },
  {},
);
