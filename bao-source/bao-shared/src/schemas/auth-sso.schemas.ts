/**
 * Enterprise SSO status schemas.
 *
 * Shared baobox schemas for public SSO status endpoints.
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Public enterprise SSO status configuration schema.
 */
const SsoStatusConfigSchema: Type.TObject<
  {
    readonly authBasePath: Type.TString;
    readonly issuerUrl: Type.TString;
    readonly discoveryUrlConfigured: Type.TBoolean;
    readonly discoveryUrl: Type.TOptional<Type.TString>;
    readonly redirectUri: Type.TString;
    readonly isContainer: Type.TBoolean;
  },
  "authBasePath" | "issuerUrl" | "discoveryUrlConfigured" | "redirectUri" | "isContainer",
  "discoveryUrl"
> = Type.Object(
  {
    authBasePath: Type.String(),
    issuerUrl: Type.String(),
    discoveryUrlConfigured: Type.Boolean(),
    discoveryUrl: Type.Optional(Type.String()),
    redirectUri: Type.String(),
    isContainer: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Public enterprise SSO status response schema.
 */
export const SsoStatusResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly enabled: Type.TBoolean;
    readonly providerId: Type.TString;
    readonly missing: Type.TArray<Type.TString>;
    readonly hints: Type.TArray<Type.TString>;
    readonly config: Type.TObject<
      {
        readonly authBasePath: Type.TString;
        readonly issuerUrl: Type.TString;
        readonly discoveryUrlConfigured: Type.TBoolean;
        readonly discoveryUrl: Type.TOptional<Type.TString>;
        readonly redirectUri: Type.TString;
        readonly isContainer: Type.TBoolean;
      },
      "authBasePath" | "issuerUrl" | "discoveryUrlConfigured" | "redirectUri" | "isContainer",
      "discoveryUrl"
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "missing" | "hints" | "enabled" | "providerId" | "config",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    enabled: Type.Boolean(),
    providerId: Type.String(),
    missing: Type.Array(Type.String()),
    hints: Type.Array(Type.String()),
    config: SsoStatusConfigSchema,
    timestamp: Type.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the SsoStatusResponse schema. */
export type SsoStatusResponse = Static<typeof SsoStatusResponseSchema>;
