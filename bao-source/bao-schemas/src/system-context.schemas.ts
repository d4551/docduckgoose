/**
 * System context schemas.
 *
 * Shared contract for explicit privileged bao system operations.
 *
 * @shared/schemas/system-context
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export const SYSTEM_CONTEXT_REASON_VALUES: readonly [
  "audit-log-query",
  "federation-peer-registry",
  "invitation-accept",
  "organization-switch",
  "personal-namespace-provisioning",
  "queue-worker",
  "scheduler-worker",
  "supervisor-reconcile",
] = [
  "audit-log-query",
  "federation-peer-registry",
  "invitation-accept",
  "organization-switch",
  "personal-namespace-provisioning",
  "queue-worker",
  "scheduler-worker",
  "supervisor-reconcile",
];

export const SYSTEM_CONTEXT_ACTOR_KIND_VALUES: readonly ["service", "system", "user"] = [
  "service",
  "system",
  "user",
];

const SYSTEM_CONTEXT_REASON_VALUE_SET: ReadonlySet<string> = new Set(SYSTEM_CONTEXT_REASON_VALUES);
const SYSTEM_CONTEXT_ACTOR_KIND_VALUE_SET: ReadonlySet<string> = new Set(
  SYSTEM_CONTEXT_ACTOR_KIND_VALUES,
);

export const SystemContextReasonSchema = TypeExports.Union([
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[0]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[1]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[2]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[3]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[4]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[5]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[6]),
  TypeExports.Literal(SYSTEM_CONTEXT_REASON_VALUES[7]),
]);

export const SystemContextActorKindSchema = TypeExports.Union([
  TypeExports.Literal(SYSTEM_CONTEXT_ACTOR_KIND_VALUES[0]),
  TypeExports.Literal(SYSTEM_CONTEXT_ACTOR_KIND_VALUES[1]),
  TypeExports.Literal(SYSTEM_CONTEXT_ACTOR_KIND_VALUES[2]),
]);

export const SystemContextActorSchema = TypeExports.Object(
  {
    kind: SystemContextActorKindSchema,
    id: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const SystemContextTenantScopeSchema = TypeExports.Object(
  {
    userId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    tenantId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

export const SystemContextAuditInputSchema = TypeExports.Object(
  {
    justification: TypeExports.String({ minLength: 1 }),
    evidenceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    targetTenantId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const SystemContextInputSchema = TypeExports.Object(
  {
    reason: SystemContextReasonSchema,
    actor: SystemContextActorSchema,
    tenant: SystemContextTenantScopeSchema,
    audit: SystemContextAuditInputSchema,
  },
  { additionalProperties: false },
);

export type SystemContextReason = Static<typeof SystemContextReasonSchema>;
export type SystemContextActorKind = Static<typeof SystemContextActorKindSchema>;
export type SystemContextActor = Static<typeof SystemContextActorSchema>;
export type SystemContextTenantScope = Static<typeof SystemContextTenantScopeSchema>;
export type SystemContextAuditInput = Static<typeof SystemContextAuditInputSchema>;
export type SystemContextInput = Static<typeof SystemContextInputSchema>;

export function isSystemContextReason(value: string): value is SystemContextReason {
  return SYSTEM_CONTEXT_REASON_VALUE_SET.has(value);
}

export function isSystemContextActorKind(value: string): value is SystemContextActorKind {
  return SYSTEM_CONTEXT_ACTOR_KIND_VALUE_SET.has(value);
}
