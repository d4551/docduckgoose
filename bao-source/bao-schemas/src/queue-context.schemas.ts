/**
 * Queue context schemas.
 *
 * Defines the shared schema for bao-boss job context propagation.
 *
 * @shared/schemas/queue-context
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  SystemContextInputSchema,
  type SystemContextTenantScope,
  SystemContextTenantScopeSchema,
} from "./system-context.schemas.ts";

/**
 * Tenant scope propagated from request producers to queue workers.
 */
export const QueueJobTenantScopeSchema = TypeExports.Object(
  SystemContextTenantScopeSchema.properties,
  { additionalProperties: false },
);

/**
 * Queue job context schema.
 */
export const QueueJobContextSchema = TypeExports.Object(
  {
    requestId: TypeExports.String({ minLength: 1 }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    headers: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      TypeExports.String({ minLength: 1 }),
    ),
    tenant: TypeExports.Optional(QueueJobTenantScopeSchema),
    systemContext: TypeExports.Optional(SystemContextInputSchema),
    createdAt: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the queue tenant scope schema. */
export type QueueJobTenantScope = SystemContextTenantScope;

/** Inferred type from the QueueJobContext schema. */
export type QueueJobContext = Static<typeof QueueJobContextSchema>;
