/**
 * User directory schemas.
 *
 * Contract-first TypeBox schemas shared between the server, Eden clients, and UI hydration
 * for admin user directory workflows.
 *
 * @shared/schemas/user-directory
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

// List Query

/** TypeBox schema for UsersListQuerySchema. */
export const UsersListQuerySchema: Type.TObject<
  {
    readonly page: Type.TOptional<Type.TInteger>;
    readonly pageSize: Type.TOptional<Type.TInteger>;
    readonly search: Type.TOptional<Type.TString>;
    readonly role: Type.TOptional<Type.TString>;
    readonly active: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly page: Type.TOptional<Type.TInteger>;
    readonly pageSize: Type.TOptional<Type.TInteger>;
    readonly search: Type.TOptional<Type.TString>;
    readonly role: Type.TOptional<Type.TString>;
    readonly active: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    page: Type.Optional(Type.Integer({ minimum: 1 })),
    pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
    search: Type.Optional(Type.String()),
    role: Type.Optional(Type.String()),
    active: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsersListQuery schema. */
export type UsersListQuery = Static<typeof UsersListQuerySchema>;

// User DTOs

/** TypeBox schema for UserListItemSchema. */
export const UserListItemSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TString;
    readonly email: Type.TString;
    readonly role: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly active: Type.TUnion<(Type.TNull | Type.TBoolean)[]>;
    readonly initials: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly image: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly createdAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly updatedAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "role" | "active" | "initials" | "image" | "createdAt" | "updatedAt" | "id" | "name" | "email",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String(),
    email: Type.String(),
    role: Type.Union([Type.String(), Type.Null()]),
    active: Type.Union([Type.Boolean(), Type.Null()]),
    initials: Type.Union([Type.String(), Type.Null()]),
    image: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.Union([Type.String(), Type.Null()]),
    updatedAt: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserListItem schema. */
export type UserListItem = Static<typeof UserListItemSchema>;

/** TypeBox schema for UsersListResponseSchema. */
export const UsersListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(UserListItemSchema),
    total: Type.Number(),
    page: Type.Number(),
    pageSize: Type.Number(),
    totalPages: Type.Number(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UsersListResponse schema. */
export type UsersListResponse = Static<typeof UsersListResponseSchema>;

/** TypeBox schema for UsersCountResponseSchema. */
export const UsersCountResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly total: Type.TNumber;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "total" | "timestamp",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    total: Type.Number(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UsersCountResponse schema. */
export type UsersCountResponse = Static<typeof UsersCountResponseSchema>;

/** TypeBox schema for UserDetailResponseSchema. */
export const UserDetailResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: UserListItemSchema,
    message: Type.Optional(Type.String()),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserDetailResponse schema. */
export type UserDetailResponse = Static<typeof UserDetailResponseSchema>;

/** TypeBox schema for UserDeleteResponseSchema. */
export const UserDeleteResponseSchema = UserDetailResponseSchema;

/** Inferred type from the UserDeleteResponse schema. */
export type UserDeleteResponse = Static<typeof UserDeleteResponseSchema>;

/** TypeBox schema for UserCreatePayloadSchema. */
export const UserCreatePayloadSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly email: Type.TString;
    readonly role: Type.TOptional<Type.TString>;
    readonly active: Type.TOptional<Type.TBoolean>;
  },
  "name" | "email",
  Type.InferOptionalKeys<{
    readonly name: Type.TString;
    readonly email: Type.TString;
    readonly role: Type.TOptional<Type.TString>;
    readonly active: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    name: Type.String({ minLength: 2 }),
    email: Type.String({ format: "email" }),
    role: Type.Optional(Type.String()),
    active: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserCreatePayload schema. */
export type UserCreatePayload = Static<typeof UserCreatePayloadSchema>;

/** TypeBox schema for UserUpdatePayloadSchema. */
export const UserUpdatePayloadSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly email: Type.TString;
    readonly role: Type.TOptional<Type.TString>;
    readonly active: Type.TOptional<Type.TBoolean>;
  },
  never,
  "name" | "email" | "role" | "active"
> = Type.Partial(UserCreatePayloadSchema, {});

/** Inferred type from the UserUpdatePayload schema. */
export type UserUpdatePayload = Static<typeof UserUpdatePayloadSchema>;

// Roles Catalog

/** TypeBox schema for UserRoleOptionSchema. */
export const UserRoleOptionSchema: Type.TObject<
  {
    readonly value: Type.TString;
    readonly label: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly default: Type.TOptional<Type.TBoolean>;
    readonly disabled: Type.TOptional<Type.TBoolean>;
  },
  "value" | "label",
  Type.InferOptionalKeys<{
    readonly value: Type.TString;
    readonly label: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly default: Type.TOptional<Type.TBoolean>;
    readonly disabled: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    value: Type.String(),
    label: Type.String(),
    description: Type.Optional(Type.String()),
    default: Type.Optional(Type.Boolean()),
    disabled: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserRoleOption schema. */
export type UserRoleOption = Static<typeof UserRoleOptionSchema>;

/** TypeBox schema for UserRolesResponseSchema. */
export const UserRolesResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly roles: Type.TArray<
      Type.TObject<
        {
          readonly value: Type.TString;
          readonly label: Type.TString;
          readonly description: Type.TOptional<Type.TString>;
          readonly default: Type.TOptional<Type.TBoolean>;
          readonly disabled: Type.TOptional<Type.TBoolean>;
        },
        "value" | "label",
        Type.InferOptionalKeys<{
          readonly value: Type.TString;
          readonly label: Type.TString;
          readonly description: Type.TOptional<Type.TString>;
          readonly default: Type.TOptional<Type.TBoolean>;
          readonly disabled: Type.TOptional<Type.TBoolean>;
        }>
      >
    >;
    readonly defaultRole: Type.TString;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "roles" | "defaultRole" | "timestamp",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    roles: Type.Array(UserRoleOptionSchema),
    defaultRole: Type.String(),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserRolesResponse schema. */
export type UserRolesResponse = Static<typeof UserRolesResponseSchema>;

// Directory Summary

/** TypeBox schema for UserSummaryTotalsSchema. */
export const UserSummaryTotalsSchema: Type.TObject<
  {
    readonly total: Type.TNumber;
    readonly active: Type.TNumber;
    readonly inactive: Type.TNumber;
    readonly unknown: Type.TNumber;
    readonly verified: Type.TNumber;
    readonly unverified: Type.TNumber;
  },
  "active" | "total" | "inactive" | "unknown" | "verified" | "unverified",
  never
> = Type.Object(
  {
    total: Type.Number(),
    active: Type.Number(),
    inactive: Type.Number(),
    unknown: Type.Number(),
    verified: Type.Number(),
    unverified: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummaryTotals schema. */
export type UserSummaryTotals = Static<typeof UserSummaryTotalsSchema>;

/** TypeBox schema for UserSummarySessionsSchema. */
export const UserSummarySessionsSchema: Type.TObject<
  { readonly active: Type.TNumber },
  "active",
  never
> = Type.Object(
  {
    active: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummarySessions schema. */
export type UserSummarySessions = Static<typeof UserSummarySessionsSchema>;

/** TypeBox schema for UserSummarySsoProvidersSchema. */
export const UserSummarySsoProvidersSchema: Type.TObject<
  { readonly total: Type.TNumber; readonly domains: Type.TNumber },
  "total" | "domains",
  never
> = Type.Object(
  {
    total: Type.Number(),
    domains: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummarySsoProviders schema. */
export type UserSummarySsoProviders = Static<typeof UserSummarySsoProvidersSchema>;

/** TypeBox schema for UserSummaryRoleSchema. */
export const UserSummaryRoleSchema: Type.TObject<
  {
    readonly role: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly label: Type.TString;
    readonly count: Type.TNumber;
  },
  "role" | "label" | "count",
  never
> = Type.Object(
  {
    role: Type.Union([Type.String(), Type.Null()]),
    label: Type.String(),
    count: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummaryRole schema. */
export type UserSummaryRole = Static<typeof UserSummaryRoleSchema>;

/** TypeBox schema for UserSummarySchema. */
export const UserSummarySchema = Type.Object(
  {
    totals: UserSummaryTotalsSchema,
    sessions: UserSummarySessionsSchema,
    ssoProviders: UserSummarySsoProvidersSchema,
    roles: Type.Array(UserSummaryRoleSchema),
    lastCreatedAt: Type.Union([Type.String(), Type.Null()]),
    updatedAt: Type.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummary schema. */
export type UserSummary = Static<typeof UserSummarySchema>;

/** TypeBox schema for UserSummaryResponseSchema. */
export const UserSummaryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    summary: UserSummarySchema,
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserSummaryResponse schema. */
export type UserSummaryResponse = Static<typeof UserSummaryResponseSchema>;

// Route Param Schemas (REST)

/** TypeBox schema for UserIdParamsSchema. */
export const UserIdParamsSchema: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
    },
    { additionalProperties: false },
  );

/** Inferred type from the UserIdParams schema. */
export type UserIdParams = Static<typeof UserIdParamsSchema>;
