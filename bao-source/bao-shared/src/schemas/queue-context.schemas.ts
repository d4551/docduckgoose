/**
 * Queue context schemas.
 *
 * Defines the shared schema for bao-boss job context propagation.
 *
 * @shared/schemas/queue-context
 */

import {
  SystemContextInputSchema,
  type SystemContextTenantScope,
  SystemContextTenantScopeSchema,
} from "@baohaus/bao-schemas/system-context.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Tenant scope propagated from request producers to queue workers.
 */
export const QueueJobTenantScopeSchema = Type.Object(SystemContextTenantScopeSchema.properties, {
  additionalProperties: false,
});

/**
 * Queue job context schema.
 */
export const QueueJobContextSchema = Type.Object(
  {
    requestId: Type.String({ minLength: 1 }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    headers: Type.Record(Type.String({ minLength: 1 }), Type.String({ minLength: 1 })),
    tenant: Type.Optional(QueueJobTenantScopeSchema),
    systemContext: Type.Optional(SystemContextInputSchema),
    createdAt: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the queue tenant scope schema. */
export type QueueJobTenantScope = SystemContextTenantScope;

/** Inferred type from the QueueJobContext schema. */
export type QueueJobContext = Static<typeof QueueJobContextSchema>;
