/**
 * User directory schemas.
 *
 * Contract-first TypeBox schemas shared between the server, Eden clients, and UI hydration
 * for admin user directory workflows.
 *
 * @shared/schemas/user-directory
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

// List Query

/** TypeBox schema for UsersListQuerySchema. */
export const UsersListQuerySchema: TObject<
  {
    readonly page: TOptional<TInteger>;
    readonly pageSize: TOptional<TInteger>;
    readonly search: TOptional<TString>;
    readonly role: TOptional<TString>;
    readonly active: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly page: TOptional<TInteger>;
    readonly pageSize: TOptional<TInteger>;
    readonly search: TOptional<TString>;
    readonly role: TOptional<TString>;
    readonly active: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    page: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    pageSize: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 100 })),
    search: TypeExports.Optional(TypeExports.String()),
    role: TypeExports.Optional(TypeExports.String()),
    active: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsersListQuery schema. */
export type UsersListQuery = Static<typeof UsersListQuerySchema>;

// User DTOs

/** TypeBox schema for UserListItemSchema. */
export const UserListItemSchema: TObject<
  {
    readonly id: TString;
    readonly firstName: TString;
    readonly lastName: TString;
    readonly displayName: TString;
    readonly email: TString;
    readonly role: TUnion<(TString | TNull)[]>;
    readonly active: TUnion<(TNull | TBoolean)[]>;
    readonly initials: TUnion<(TString | TNull)[]>;
    readonly image: TUnion<(TString | TNull)[]>;
    readonly createdAt: TUnion<(TString | TNull)[]>;
    readonly updatedAt: TUnion<(TString | TNull)[]>;
  },
  | "role"
  | "active"
  | "initials"
  | "image"
  | "createdAt"
  | "updatedAt"
  | "id"
  | "firstName"
  | "lastName"
  | "displayName"
  | "email",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    firstName: TypeExports.String(),
    lastName: TypeExports.String(),
    displayName: TypeExports.String(),
    email: TypeExports.String(),
    role: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    active: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    initials: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    image: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    updatedAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserListItem schema. */
export type UserListItem = Static<typeof UserListItemSchema>;

/** TypeBox schema for UsersListResponseSchema. */
export const UsersListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(UserListItemSchema),
    total: TypeExports.Number(),
    page: TypeExports.Number(),
    pageSize: TypeExports.Number(),
    totalPages: TypeExports.Number(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UsersListResponse schema. */
export type UsersListResponse = Static<typeof UsersListResponseSchema>;

/** TypeBox schema for UsersCountResponseSchema. */
export const UsersCountResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly total: TNumber;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "total" | "timestamp",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    total: TypeExports.Number(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UsersCountResponse schema. */
export type UsersCountResponse = Static<typeof UsersCountResponseSchema>;

/** TypeBox schema for UserDetailResponseSchema. */
export const UserDetailResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: UserListItemSchema,
    message: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
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
export const UserCreatePayloadSchema: TObject<
  {
    readonly firstName: TString;
    readonly lastName: TString;
    readonly email: TString;
    readonly role: TOptional<TString>;
    readonly active: TOptional<TBoolean>;
  },
  "firstName" | "lastName" | "email",
  InferOptionalKeys<{
    readonly firstName: TString;
    readonly lastName: TString;
    readonly email: TString;
    readonly role: TOptional<TString>;
    readonly active: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    firstName: TypeExports.String({ minLength: 1 }),
    lastName: TypeExports.String({ minLength: 1 }),
    email: TypeExports.String({ format: "email" }),
    role: TypeExports.Optional(TypeExports.String()),
    active: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserCreatePayload schema. */
export type UserCreatePayload = Static<typeof UserCreatePayloadSchema>;

/** TypeBox schema for UserUpdatePayloadSchema. */
export const UserUpdatePayloadSchema = TypeExports.Partial(UserCreatePayloadSchema, {});

/** Inferred type from the UserUpdatePayload schema. */
export type UserUpdatePayload = Static<typeof UserUpdatePayloadSchema>;

// Roles Catalog

/** TypeBox schema for UserRoleOptionSchema. */
export const UserRoleOptionSchema: TObject<
  {
    readonly value: TString;
    readonly label: TString;
    readonly description: TOptional<TString>;
    readonly default: TOptional<TBoolean>;
    readonly disabled: TOptional<TBoolean>;
  },
  "value" | "label",
  InferOptionalKeys<{
    readonly value: TString;
    readonly label: TString;
    readonly description: TOptional<TString>;
    readonly default: TOptional<TBoolean>;
    readonly disabled: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    value: TypeExports.String(),
    label: TypeExports.String(),
    description: TypeExports.Optional(TypeExports.String()),
    default: TypeExports.Optional(TypeExports.Boolean()),
    disabled: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserRoleOption schema. */
export type UserRoleOption = Static<typeof UserRoleOptionSchema>;

/** TypeBox schema for UserRolesResponseSchema. */
export const UserRolesResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly roles: TArray<
      TObject<
        {
          readonly value: TString;
          readonly label: TString;
          readonly description: TOptional<TString>;
          readonly default: TOptional<TBoolean>;
          readonly disabled: TOptional<TBoolean>;
        },
        "value" | "label",
        InferOptionalKeys<{
          readonly value: TString;
          readonly label: TString;
          readonly description: TOptional<TString>;
          readonly default: TOptional<TBoolean>;
          readonly disabled: TOptional<TBoolean>;
        }>
      >
    >;
    readonly defaultRole: TString;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "roles" | "defaultRole" | "timestamp",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    roles: TypeExports.Array(UserRoleOptionSchema),
    defaultRole: TypeExports.String(),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserRolesResponse schema. */
export type UserRolesResponse = Static<typeof UserRolesResponseSchema>;

// Directory Summary

/** TypeBox schema for UserSummaryTotalsSchema. */
export const UserSummaryTotalsSchema: TObject<
  {
    readonly total: TNumber;
    readonly active: TNumber;
    readonly inactive: TNumber;
    readonly unknown: TNumber;
    readonly verified: TNumber;
    readonly unverified: TNumber;
  },
  "active" | "total" | "inactive" | "unknown" | "verified" | "unverified",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Number(),
    active: TypeExports.Number(),
    inactive: TypeExports.Number(),
    unknown: TypeExports.Number(),
    verified: TypeExports.Number(),
    unverified: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummaryTotals schema. */
export type UserSummaryTotals = Static<typeof UserSummaryTotalsSchema>;

/** TypeBox schema for UserSummarySessionsSchema. */
export const UserSummarySessionsSchema: TObject<{ readonly active: TNumber }, "active", never> =
  TypeExports.Object(
    {
      active: TypeExports.Number(),
    },
    { additionalProperties: false },
  );

/** Inferred type from the UserSummarySessions schema. */
export type UserSummarySessions = Static<typeof UserSummarySessionsSchema>;

/** TypeBox schema for UserSummarySsoProvidersSchema. */
export const UserSummarySsoProvidersSchema: TObject<
  { readonly total: TNumber; readonly domains: TNumber },
  "total" | "domains",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Number(),
    domains: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummarySsoProviders schema. */
export type UserSummarySsoProviders = Static<typeof UserSummarySsoProvidersSchema>;

/** TypeBox schema for UserSummaryRoleSchema. */
export const UserSummaryRoleSchema: TObject<
  {
    readonly role: TUnion<(TString | TNull)[]>;
    readonly label: TString;
    readonly count: TNumber;
  },
  "role" | "label" | "count",
  never
> = TypeExports.Object(
  {
    role: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    label: TypeExports.String(),
    count: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummaryRole schema. */
export type UserSummaryRole = Static<typeof UserSummaryRoleSchema>;

/** TypeBox schema for UserSummarySchema. */
export const UserSummarySchema = TypeExports.Object(
  {
    totals: UserSummaryTotalsSchema,
    sessions: UserSummarySessionsSchema,
    ssoProviders: UserSummarySsoProvidersSchema,
    roles: TypeExports.Array(UserSummaryRoleSchema),
    lastCreatedAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    updatedAt: TypeExports.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserSummary schema. */
export type UserSummary = Static<typeof UserSummarySchema>;

/** TypeBox schema for UserSummaryResponseSchema. */
export const UserSummaryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    summary: UserSummarySchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserSummaryResponse schema. */
export type UserSummaryResponse = Static<typeof UserSummaryResponseSchema>;

// Route Param Schemas (REST)

/** TypeBox schema for UserIdParamsSchema. */
export const UserIdParamsSchema: TObject<{ readonly id: TString }, "id", never> =
  TypeExports.Object(
    {
      id: TypeExports.String({ format: "uuid" }),
    },
    { additionalProperties: false },
  );

/** Inferred type from the UserIdParams schema. */
export type UserIdParams = Static<typeof UserIdParamsSchema>;
