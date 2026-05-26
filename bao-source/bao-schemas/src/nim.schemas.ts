/**
 * NVIDIA NIM API schemas.
 *
 * Shared TypeBox schemas for the NVIDIA NIM integration endpoints.
 * These schemas are used across server routes, contract tests, and HTML UI types
 * to prevent drift between backend responses and frontend expectations.
 *
 * @shared/schemas/nim.schemas
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * NVIDIA NIM service health status.
 *
 * - `ready`: Service is healthy and accepting requests
 * - `unreachable`: Cannot connect to the NIM endpoint
 * - `not_configured`: NIM endpoint URL is not set
 * - `missing_endpoint`: Endpoint configuration is incomplete
 * - `disabled`: NIM integration is explicitly disabled
 * - `auth_required`: Valid API key is required but not provided
 */
export const NimHealthStatusSchema: TUnion<
  (
    | TLiteral<"ready">
    | TLiteral<"unreachable">
    | TLiteral<"not_configured">
    | TLiteral<"missing_endpoint">
    | TLiteral<"disabled">
    | TLiteral<"auth_required">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("ready"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("not_configured"),
    TypeExports.Literal("missing_endpoint"),
    TypeExports.Literal("disabled"),
    TypeExports.Literal("auth_required"),
  ],
  {},
);

/**
 * TypeScript type for the NVIDIA NIM health status.
 */
export type NimHealthStatus = Static<typeof NimHealthStatusSchema>;

/**
 * Result of probing a NIM endpoint for health.
 */
export const NimProbeResultSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly latencyMs: TOptional<TNumber>;
    readonly statusCode: TOptional<TNumber>;
    readonly message: TOptional<TString>;
  },
  "ok",
  InferOptionalKeys<{
    readonly ok: TBoolean;
    readonly latencyMs: TOptional<TNumber>;
    readonly statusCode: TOptional<TNumber>;
    readonly message: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    /** Whether the probe succeeded. */
    ok: TypeExports.Boolean(),
    /** Round-trip latency in milliseconds. */
    latencyMs: TypeExports.Optional(TypeExports.Number()),
    /** HTTP status code from the probe request. */
    statusCode: TypeExports.Optional(TypeExports.Number()),
    /** Error or status message. */
    message: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for the NVIDIA NIM probe result.
 */
export type NimProbeResult = Static<typeof NimProbeResultSchema>;

/**
 * NIM health check response payload schema.
 */
export const NimHealthResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        status: NimHealthStatusSchema,
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        healthPath: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        model: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        latencyMs: TypeExports.Optional(TypeExports.Number()),
        live: TypeExports.Optional(NimProbeResultSchema),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        error: TypeExports.String(),
        status: NimHealthStatusSchema,
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        healthPath: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        model: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        latencyMs: TypeExports.Optional(TypeExports.Number()),
        live: TypeExports.Optional(NimProbeResultSchema),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM health response.
 */
export type NimHealthResponse = Static<typeof NimHealthResponseSchema>;

/**
 * NIM models list response payload schema.
 */
export const NimModelsResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        models: TypeExports.Array(TypeExports.Unknown()),
        count: TypeExports.Number(),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        error: TypeExports.String(),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        models: TypeExports.Array(TypeExports.Unknown()),
        count: TypeExports.Number(),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM models response.
 */
export type NimModelsResponse = Static<typeof NimModelsResponseSchema>;

/**
 * NIM metadata response payload schema.
 */
export const NimMetadataResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        metadata: TypeExports.Union([TypeExports.Unknown(), TypeExports.Null()]),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        error: TypeExports.String(),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        metadata: TypeExports.Null(),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM metadata response.
 */
export type NimMetadataResponse = Static<typeof NimMetadataResponseSchema>;

/**
 * NIM version response payload schema.
 */
export const NimVersionResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        version: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        payload: TypeExports.Union([TypeExports.Unknown(), TypeExports.Null()]),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        error: TypeExports.String(),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        version: TypeExports.Null(),
        payload: TypeExports.Null(),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM version response.
 */
export type NimVersionResponse = Static<typeof NimVersionResponseSchema>;

/**
 * NIM metrics response payload schema.
 */
export const NimMetricsResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        payload: TypeExports.Union([TypeExports.Unknown(), TypeExports.Null()]),
        contentType: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        error: TypeExports.String(),
        baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        endpoint: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        payload: TypeExports.Null(),
        contentType: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
        checkedAt: TypeExports.String(),
        statusCode: TypeExports.Optional(TypeExports.Number()),
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM metrics response.
 */
export type NimMetricsResponse = Static<typeof NimMetricsResponseSchema>;

/**
 * NIM endpoints source schema.
 */
export const NimEndpointsSourceSchema: TUnion<(TLiteral<"settings"> | TLiteral<"env">)[]> =
  TypeExports.Union([TypeExports.Literal("settings"), TypeExports.Literal("env")], {});

/**
 * TypeScript type for the NIM endpoints source.
 */
export type NimEndpointsSource = Static<typeof NimEndpointsSourceSchema>;

/**
 * NIM endpoint list response payload schema.
 */
export const NimEndpointsResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        endpoints: TypeExports.Array(TypeExports.String()),
        activeEndpoint: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        source: NimEndpointsSourceSchema,
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        endpoints: TypeExports.Array(TypeExports.String()),
        activeEndpoint: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        source: NimEndpointsSourceSchema,
        message: TypeExports.Optional(TypeExports.String()),
        error: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM endpoints response.
 */
export type NimEndpointsResponse = Static<typeof NimEndpointsResponseSchema>;

/**
 * NIM credential source schema.
 */
export const NimCredentialSourceSchema: TUnion<
  (TLiteral<"env"> | TLiteral<"db"> | TLiteral<"none">)[]
> = TypeExports.Union(
  [TypeExports.Literal("env"), TypeExports.Literal("db"), TypeExports.Literal("none")],
  {},
);

/**
 * TypeScript type for the NIM credential source.
 */
export type NimCredentialSource = Static<typeof NimCredentialSourceSchema>;

/**
 * NIM credential status response payload schema.
 */
export const NimCredentialsResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        ok: TypeExports.Literal(true),
        configured: TypeExports.Boolean(),
        source: NimCredentialSourceSchema,
        message: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
    TypeExports.Object(
      {
        ok: TypeExports.Literal(false),
        configured: TypeExports.Boolean(),
        source: NimCredentialSourceSchema,
        message: TypeExports.Optional(TypeExports.String()),
        error: TypeExports.Optional(TypeExports.String()),
      },
      { additionalProperties: TypeExports.Unknown() },
    ),
  ],
  {},
);

/**
 * TypeScript type for the NIM credentials response.
 */
export type NimCredentialsResponse = Static<typeof NimCredentialsResponseSchema>;
