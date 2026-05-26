/**
 * Enterprise SSO status schemas.
 *
 * Shared baobox schemas for public SSO status endpoints.
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Public enterprise SSO status configuration schema.
 */
const SsoStatusConfigSchema: TObject<
  {
    readonly authBasePath: TString;
    readonly issuerUrl: TString;
    readonly discoveryUrlConfigured: TBoolean;
    readonly discoveryUrl: TOptional<TString>;
    readonly redirectUri: TString;
    readonly isContainer: TBoolean;
  },
  "authBasePath" | "issuerUrl" | "discoveryUrlConfigured" | "redirectUri" | "isContainer",
  "discoveryUrl"
> = TypeExports.Object(
  {
    authBasePath: TypeExports.String(),
    issuerUrl: TypeExports.String(),
    discoveryUrlConfigured: TypeExports.Boolean(),
    discoveryUrl: TypeExports.Optional(TypeExports.String()),
    redirectUri: TypeExports.String(),
    isContainer: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Public enterprise SSO status response schema.
 */
export const SsoStatusResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly enabled: TBoolean;
    readonly providerId: TString;
    readonly missing: TArray<TString>;
    readonly hints: TArray<TString>;
    readonly config: TObject<
      {
        readonly authBasePath: TString;
        readonly issuerUrl: TString;
        readonly discoveryUrlConfigured: TBoolean;
        readonly discoveryUrl: TOptional<TString>;
        readonly redirectUri: TString;
        readonly isContainer: TBoolean;
      },
      "authBasePath" | "issuerUrl" | "discoveryUrlConfigured" | "redirectUri" | "isContainer",
      "discoveryUrl"
    >;
    readonly timestamp: TString;
  },
  "ok" | "timestamp" | "missing" | "hints" | "enabled" | "providerId" | "config",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    enabled: TypeExports.Boolean(),
    providerId: TypeExports.String(),
    missing: TypeExports.Array(TypeExports.String()),
    hints: TypeExports.Array(TypeExports.String()),
    config: SsoStatusConfigSchema,
    timestamp: TypeExports.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the SsoStatusResponse schema. */
export type SsoStatusResponse = Static<typeof SsoStatusResponseSchema>;
