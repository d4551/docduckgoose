/**
 * Shared `.bao` service authorization schemas.
 *
 * These contracts let sibling services ask bao-runtime for a canonical
 * session/capability decision instead of duplicating auth policy locally.
 *
 * @shared/schemas/bao-authz
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export const BaoAuthzServiceSchema = TypeExports.Union([
  TypeExports.Literal("bao-registry"),
  TypeExports.Literal("bao-ai-gateway"),
  TypeExports.Literal("forge"),
]);

export type BaoAuthzService = Static<typeof BaoAuthzServiceSchema>;

export const BaoAuthzActionSchema = TypeExports.Union([
  TypeExports.Literal("bao-registry.publish"),
  TypeExports.Literal("bao-registry.push"),
  TypeExports.Literal("bao-ai-gateway.admin"),
  TypeExports.Literal("bao-ai-gateway.gateway"),
  TypeExports.Literal("forge.ci.write"),
]);

export type BaoAuthzAction = Static<typeof BaoAuthzActionSchema>;

export const BaoAuthzCheckRequestSchema = TypeExports.Object(
  {
    service: BaoAuthzServiceSchema,
    action: BaoAuthzActionSchema,
    resource: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "Canonical bao-runtime service authorization check request.",
  },
);

export type BaoAuthzCheckRequest = Static<typeof BaoAuthzCheckRequestSchema>;

export const BaoAuthzSubjectSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    role: TypeExports.String({ minLength: 1 }),
    source: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoAuthzCheckResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    allowed: TypeExports.Boolean(),
    service: BaoAuthzServiceSchema,
    action: BaoAuthzActionSchema,
    resource: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    requiredPermissions: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    subject: TypeExports.Union([BaoAuthzSubjectSchema, TypeExports.Null()]),
    reason: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "Canonical bao-runtime service authorization check response.",
  },
);

export type BaoAuthzCheckResponse = Static<typeof BaoAuthzCheckResponseSchema>;
