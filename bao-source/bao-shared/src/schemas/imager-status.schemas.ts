/**
 * Imager status schemas.
 *
 * Contract-first schemas for the imager operational endpoints:
 * - Status: `GET /api/v1/imager/status`
 * - Enumerate: `POST /api/v1/imager/enumerate`
 * - Health: `GET /api/v1/imager/health`
 *
 * These endpoints are primarily used by admin + hardware surfaces to
 * understand bunbuddy health and enumerate camera devices without coupling
 * clients to bunbuddy-specific payload shapes.
 *
 * @shared/schemas/imager-status
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * BunBuddy error payload emitted by imager endpoints.
 */
export const ImagerBunBuddyErrorSchema: Type.TObject<
  { readonly source: Type.TString; readonly error: Type.TString },
  "error" | "source",
  never
> = Type.Object(
  {
    source: Type.String({ minLength: 1 }),
    error: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerBunBuddyError schema. */
export type ImagerBunBuddyError = Static<typeof ImagerBunBuddyErrorSchema>;

/**
 * BunBuddy health payload shape (tolerant JSON object).
 */
export const ImagerServiceStatusSchema: Type.TRecord<Type.TString, Type.TUnknown> = Type.Record(
  Type.String(),
  JsonValueSchema,
  {
    description: "Imager bunbuddy health payload (JSON object)",
  },
);

/** Inferred type from the ImagerServiceStatus schema. */
export type ImagerServiceStatus = Static<typeof ImagerServiceStatusSchema>;

/**
 * Imager status response schema.
 */
export const ImagerStatusResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly services: Type.TRecord<Type.TString, Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly errors: Type.TArray<
      Type.TObject<
        { readonly source: Type.TString; readonly error: Type.TString },
        "error" | "source",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "services" | "errors" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    services: Type.Record(Type.String({ minLength: 1 }), ImagerServiceStatusSchema),
    errors: Type.Array(ImagerBunBuddyErrorSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerStatusResponse schema. */
export type ImagerStatusResponse = Static<typeof ImagerStatusResponseSchema>;

/**
 * Imager enumerate request schema.
 */
export const ImagerEnumerateRequestSchema: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerEnumerateRequest schema. */
export type ImagerEnumerateRequest = Static<typeof ImagerEnumerateRequestSchema>;

/**
 * Enumerated imager device payload.
 *
 * BunBuddies can surface heterogeneous device shapes, so we enforce a minimal
 * `source` key and allow additional properties for forward-compat.
 */
export const ImagerEnumeratedDeviceSchema: Type.TObject<
  { readonly source: Type.TString },
  "source",
  never
> = Type.Object(
  {
    source: Type.String({ minLength: 1 }),
  },
  { additionalProperties: true },
);

/** Inferred type from the ImagerEnumeratedDevice schema. */
export type ImagerEnumeratedDevice = Static<typeof ImagerEnumeratedDeviceSchema>;

/**
 * Imager enumerate response schema.
 */
export const ImagerEnumerateResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly devices: Type.TArray<Type.TObject<{ readonly source: Type.TString }, "source", never>>;
    readonly count: Type.TInteger;
    readonly errors: Type.TArray<
      Type.TObject<
        { readonly source: Type.TString; readonly error: Type.TString },
        "source" | "error",
        never
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "devices" | "errors" | "count" | "timestamp",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    devices: Type.Array(ImagerEnumeratedDeviceSchema),
    count: Type.Integer({ minimum: 0 }),
    errors: Type.Array(ImagerBunBuddyErrorSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerEnumerateResponse schema. */
export type ImagerEnumerateResponse = Static<typeof ImagerEnumerateResponseSchema>;

/**
 * Imager health response schema.
 */
export const ImagerHealthResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly baseUrl: Type.TString;
    readonly data: Type.TUnknown;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "baseUrl" | "data",
  never
> = Type.Object(
  {
    ok: Type.Literal(true),
    baseUrl: Type.String({ minLength: 1 }),
    data: JsonValueSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerHealthResponse schema. */
export type ImagerHealthResponse = Static<typeof ImagerHealthResponseSchema>;
