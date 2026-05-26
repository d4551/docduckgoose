/**
 * MinIO SSO schemas.
 *
 * Shared TypeBox schemas for MinIO SSO status endpoints.
 *
 * @shared/schemas/minio.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * MinIO OIDC health status schema.
 */
export const MinioOidcStatusSchema: TObject<
  {
    readonly enabled: TBoolean;
    readonly configured: TBoolean;
    readonly provider: TUnion<(TString | TNull)[]>;
    readonly displayName: TUnion<(TString | TNull)[]>;
    readonly configUrl: TUnion<(TString | TNull)[]>;
    readonly error: TUnion<(TString | TNull)[]>;
    readonly checkedAt: TString;
  },
  "provider" | "displayName" | "configUrl" | "error" | "enabled" | "configured" | "checkedAt",
  never
> = TypeExports.Object({
  enabled: TypeExports.Boolean(),
  configured: TypeExports.Boolean(),
  provider: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  displayName: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  configUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  error: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  checkedAt: TypeExports.String(),
});

/**
 * MinIO SSO provider schema.
 */
export const MinioSsoProviderSchema: TObject<
  { readonly displayName: TString; readonly redirect: TString },
  "displayName" | "redirect",
  never
> = TypeExports.Object({
  displayName: TypeExports.String(),
  redirect: TypeExports.String(),
});

/**
 * MinIO console login strategy schema.
 */
export const MinioSsoLoginStrategySchema: TObject<
  {
    readonly strategy: TUnion<(TLiteral<"form"> | TLiteral<"redirect"> | TLiteral<"unknown">)[]>;
    readonly ssoEnabled: TBoolean;
    readonly ssoProviders: TArray<
      TObject<
        { readonly displayName: TString; readonly redirect: TString },
        "redirect" | "displayName",
        never
      >
    >;
    readonly error: TUnion<(TString | TNull)[]>;
  },
  "strategy" | "ssoProviders" | "error" | "ssoEnabled",
  never
> = TypeExports.Object({
  strategy: TypeExports.Union([
    TypeExports.Literal("form"),
    TypeExports.Literal("redirect"),
    TypeExports.Literal("unknown"),
  ]),
  ssoEnabled: TypeExports.Boolean(),
  ssoProviders: TypeExports.Array(MinioSsoProviderSchema),
  error: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
});

/**
 * MinIO SSO status response schema.
 */
export const MinioSsoStatusResponseSchema = TypeExports.Object({
  ok: TypeExports.Literal(true),
  timestamp: TypeExports.String({ format: "date-time" }),
  oidc: MinioOidcStatusSchema,
  console: MinioSsoLoginStrategySchema,
  healthy: TypeExports.Boolean(),
});

/** Inferred type from the MinioOidcStatus schema. */
export type MinioOidcStatus = Static<typeof MinioOidcStatusSchema>;
/** Inferred type from the MinioSsoLoginStrategy schema. */
export type MinioSsoLoginStrategy = Static<typeof MinioSsoLoginStrategySchema>;
/** Inferred type from the MinioSsoStatusResponse schema. */
export type MinioSsoStatusResponse = Static<typeof MinioSsoStatusResponseSchema>;
