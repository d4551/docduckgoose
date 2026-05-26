/**
 * User self-service schemas.
 *
 * Contract-first TypeBox schemas shared between the server, Eden clients, and UI hydration
 * for authenticated user profile + preference management.
 *
 * @shared/schemas/user-self-service
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema, JsonValueSchema } from "./json.schemas";

// Profile Update

/** TypeBox schema for UserProfileUpdatePayloadSchema. */
export const UserProfileUpdatePayloadSchema = TypeExports.Partial(
  TypeExports.Object(
    {
      firstName: TypeExports.String({ minLength: 1 }),
      lastName: TypeExports.String({ minLength: 1 }),
      initials: TypeExports.String({ minLength: 1 }),
    },
    { additionalProperties: false },
  ),
  {},
);

/** Inferred type from the UserProfileUpdatePayload schema. */
export type UserProfileUpdatePayload = Static<typeof UserProfileUpdatePayloadSchema>;

/** TypeBox schema for UserProfileSchema. */
export const UserProfileSchema: TObject<
  {
    readonly id: TString;
    readonly email: TString;
    readonly firstName: TString;
    readonly lastName: TString;
    readonly displayName: TString;
    readonly role: TUnion<(TString | TNull)[]>;
    readonly active: TUnion<(TNull | TBoolean)[]>;
    readonly initials: TUnion<(TString | TNull)[]>;
    readonly image: TUnion<(TString | TNull)[]>;
    readonly emailVerified: TUnion<(TBoolean | TNull)[]>;
  },
  | "active"
  | "role"
  | "initials"
  | "image"
  | "emailVerified"
  | "id"
  | "email"
  | "firstName"
  | "lastName"
  | "displayName",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    email: TypeExports.String(),
    firstName: TypeExports.String(),
    lastName: TypeExports.String(),
    displayName: TypeExports.String(),
    role: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    active: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
    initials: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    image: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    emailVerified: TypeExports.Union([TypeExports.Boolean(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserProfile schema. */
export type UserProfile = Static<typeof UserProfileSchema>;

/** TypeBox schema for UserProfileResponseSchema. */
export const UserProfileResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: UserProfileSchema,
    message: TypeExports.Optional(TypeExports.String()),
    timestamp: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserProfileResponse schema. */
export type UserProfileResponse = Static<typeof UserProfileResponseSchema>;

// Preferences

/** TypeBox schema for UserPreferencesQuerySchema. */
export const UserPreferencesQuerySchema: TObject<
  { readonly namespace: TOptional<TString> },
  never,
  "namespace"
> = TypeExports.Object(
  {
    namespace: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferencesQuery schema. */
export type UserPreferencesQuery = Static<typeof UserPreferencesQuerySchema>;

/** TypeBox schema for UserPreferenceUpsertPayloadSchema. */
export const UserPreferenceUpsertPayloadSchema: TObject<
  {
    readonly namespace: TOptional<TString>;
    readonly key: TString;
    readonly value: TUnknown;
  },
  "key" | "value",
  "namespace"
> = TypeExports.Object(
  {
    namespace: TypeExports.Optional(TypeExports.String()),
    key: TypeExports.String({ minLength: 1 }),
    value: JsonValueSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferenceUpsertPayload schema. */
export type UserPreferenceUpsertPayload = Static<typeof UserPreferenceUpsertPayloadSchema>;

/** TypeBox schema for UserPreferenceRecordSchema. */
export const UserPreferenceRecordSchema: TObject<
  {
    readonly key: TString;
    readonly value: TUnknown;
    readonly namespace: TString;
    readonly updatedAt: TString;
  },
  "key" | "value" | "namespace" | "updatedAt",
  never
> = TypeExports.Object(
  {
    key: TypeExports.String({ minLength: 1 }),
    value: JsonValueSchema,
    namespace: TypeExports.String({ minLength: 1 }),
    updatedAt: TypeExports.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferenceRecord schema. */
export type UserPreferenceRecord = Static<typeof UserPreferenceRecordSchema>;

/** TypeBox schema for UserPreferencesResponseSchema. */
export const UserPreferencesResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: JsonObjectSchema,
    preferences: TypeExports.Array(UserPreferenceRecordSchema),
    timestamp: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserPreferencesResponse schema. */
export type UserPreferencesResponse = Static<typeof UserPreferencesResponseSchema>;

/** TypeBox schema for UserPreferenceDeleteParamsSchema. */
export const UserPreferenceDeleteParamsSchema: TObject<
  { readonly id: TString; readonly key: TString },
  "key" | "id",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ format: "uuid" }),
    key: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferenceDeleteParams schema. */
export type UserPreferenceDeleteParams = Static<typeof UserPreferenceDeleteParamsSchema>;

/** TypeBox schema for UserPreferenceActionResponseSchema. */
export const UserPreferenceActionResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly data: TObject<{ readonly message: TString }, "message", never>;
    readonly timestamp: TOptional<TString>;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "data",
  InferOptionalKeys<{
    readonly ok: TLiteral<true>;
    readonly data: TObject<{ readonly message: TString }, "message", never>;
    readonly timestamp: TOptional<TString>;
    readonly correlationId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object({ message: TypeExports.String() }, { additionalProperties: false }),
    timestamp: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserPreferenceActionResponse schema. */
export type UserPreferenceActionResponse = Static<typeof UserPreferenceActionResponseSchema>;
