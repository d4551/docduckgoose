/**
 * User self-service schemas.
 *
 * Contract-first TypeBox schemas shared between the server, Eden clients, and UI hydration
 * for authenticated user profile + preference management.
 *
 * @shared/schemas/user-self-service
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema, JsonValueSchema } from "./json.schemas";

// Profile Update

/** TypeBox schema for UserProfileUpdatePayloadSchema. */
export const UserProfileUpdatePayloadSchema: Type.TObject<
  { readonly name: Type.TString; readonly initials: Type.TString; readonly role: Type.TString },
  never,
  "name" | "initials" | "role"
> = Type.Partial(
  Type.Object(
    {
      name: Type.String({ minLength: 1 }),
      initials: Type.String({ minLength: 1 }),
      role: Type.String({ minLength: 1 }),
    },
    { additionalProperties: false },
  ),
  {},
);

/** Inferred type from the UserProfileUpdatePayload schema. */
export type UserProfileUpdatePayload = Static<typeof UserProfileUpdatePayloadSchema>;

/** TypeBox schema for UserProfileSchema. */
export const UserProfileSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly email: Type.TString;
    readonly name: Type.TString;
    readonly role: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly active: Type.TUnion<(Type.TNull | Type.TBoolean)[]>;
    readonly initials: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "active" | "role" | "initials" | "id" | "email" | "name",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    email: Type.String(),
    name: Type.String(),
    role: Type.Union([Type.String(), Type.Null()]),
    active: Type.Union([Type.Boolean(), Type.Null()]),
    initials: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserProfile schema. */
export type UserProfile = Static<typeof UserProfileSchema>;

/** TypeBox schema for UserProfileResponseSchema. */
export const UserProfileResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: UserProfileSchema,
    message: Type.Optional(Type.String()),
    timestamp: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserProfileResponse schema. */
export type UserProfileResponse = Static<typeof UserProfileResponseSchema>;

// Preferences

/** TypeBox schema for UserPreferencesQuerySchema. */
export const UserPreferencesQuerySchema: Type.TObject<
  { readonly namespace: Type.TOptional<Type.TString> },
  never,
  "namespace"
> = Type.Object(
  {
    namespace: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferencesQuery schema. */
export type UserPreferencesQuery = Static<typeof UserPreferencesQuerySchema>;

/** TypeBox schema for UserPreferenceUpsertPayloadSchema. */
export const UserPreferenceUpsertPayloadSchema: Type.TObject<
  {
    readonly namespace: Type.TOptional<Type.TString>;
    readonly key: Type.TString;
    readonly value: Type.TUnknown;
  },
  "key" | "value",
  "namespace"
> = Type.Object(
  {
    namespace: Type.Optional(Type.String()),
    key: Type.String({ minLength: 1 }),
    value: JsonValueSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferenceUpsertPayload schema. */
export type UserPreferenceUpsertPayload = Static<typeof UserPreferenceUpsertPayloadSchema>;

/** TypeBox schema for UserPreferenceRecordSchema. */
export const UserPreferenceRecordSchema: Type.TObject<
  {
    readonly key: Type.TString;
    readonly value: Type.TUnknown;
    readonly namespace: Type.TString;
    readonly updatedAt: Type.TString;
  },
  "key" | "value" | "namespace" | "updatedAt",
  never
> = Type.Object(
  {
    key: Type.String({ minLength: 1 }),
    value: JsonValueSchema,
    namespace: Type.String({ minLength: 1 }),
    updatedAt: Type.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferenceRecord schema. */
export type UserPreferenceRecord = Static<typeof UserPreferenceRecordSchema>;

/** TypeBox schema for UserPreferencesResponseSchema. */
export const UserPreferencesResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: JsonObjectSchema,
    preferences: Type.Array(UserPreferenceRecordSchema),
    timestamp: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserPreferencesResponse schema. */
export type UserPreferencesResponse = Static<typeof UserPreferencesResponseSchema>;

/** TypeBox schema for UserPreferenceDeleteParamsSchema. */
export const UserPreferenceDeleteParamsSchema: Type.TObject<
  { readonly id: Type.TString; readonly key: Type.TString },
  "key" | "id",
  never
> = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    key: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the UserPreferenceDeleteParams schema. */
export type UserPreferenceDeleteParams = Static<typeof UserPreferenceDeleteParamsSchema>;

/** TypeBox schema for UserPreferenceActionResponseSchema. */
export const UserPreferenceActionResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<{ readonly message: Type.TString }, "message", never>;
    readonly timestamp: Type.TOptional<Type.TString>;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "data",
  Type.InferOptionalKeys<{
    readonly ok: Type.TLiteral<true>;
    readonly data: Type.TObject<{ readonly message: Type.TString }, "message", never>;
    readonly timestamp: Type.TOptional<Type.TString>;
    readonly correlationId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object({ message: Type.String() }, { additionalProperties: false }),
    timestamp: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

/** Inferred type from the UserPreferenceActionResponse schema. */
export type UserPreferenceActionResponse = Static<typeof UserPreferenceActionResponseSchema>;
