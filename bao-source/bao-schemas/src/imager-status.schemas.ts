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

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * BunBuddy error payload emitted by imager endpoints.
 */
export const ImagerBunBuddyErrorSchema: TObject<
  { readonly source: TString; readonly error: TString },
  "error" | "source",
  never
> = TypeExports.Object(
  {
    source: TypeExports.String({ minLength: 1 }),
    error: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerBunBuddyError schema. */
export type ImagerBunBuddyError = Static<typeof ImagerBunBuddyErrorSchema>;

/**
 * BunBuddy health payload shape (tolerant JSON object).
 */
export const ImagerServiceStatusSchema: TRecord<TString, TUnknown> = TypeExports.Record(
  TypeExports.String(),
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
export const ImagerStatusResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly services: TRecord<TString, TRecord<TString, TUnknown>>;
    readonly errors: TArray<
      TObject<{ readonly source: TString; readonly error: TString }, "error" | "source", never>
    >;
    readonly timestamp: TString;
  },
  "ok" | "services" | "errors" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    services: TypeExports.Record(TypeExports.String({ minLength: 1 }), ImagerServiceStatusSchema),
    errors: TypeExports.Array(ImagerBunBuddyErrorSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerStatusResponse schema. */
export type ImagerStatusResponse = Static<typeof ImagerStatusResponseSchema>;

/**
 * Imager enumerate request schema.
 */
export const ImagerEnumerateRequestSchema: TObject<
  { readonly refresh: TOptional<TBoolean> },
  never,
  "refresh"
> = TypeExports.Object(
  {
    refresh: TypeExports.Optional(TypeExports.Boolean()),
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
export const ImagerEnumeratedDeviceSchema: TObject<{ readonly source: TString }, "source", never> =
  TypeExports.Object(
    {
      source: TypeExports.String({ minLength: 1 }),
    },
    { additionalProperties: true },
  );

/** Inferred type from the ImagerEnumeratedDevice schema. */
export type ImagerEnumeratedDevice = Static<typeof ImagerEnumeratedDeviceSchema>;

/**
 * Imager enumerate response schema.
 */
export const ImagerEnumerateResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly devices: TArray<TObject<{ readonly source: TString }, "source", never>>;
    readonly count: TInteger;
    readonly errors: TArray<
      TObject<{ readonly source: TString; readonly error: TString }, "source" | "error", never>
    >;
    readonly timestamp: TString;
  },
  "ok" | "devices" | "errors" | "count" | "timestamp",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    devices: TypeExports.Array(ImagerEnumeratedDeviceSchema),
    count: TypeExports.Integer({ minimum: 0 }),
    errors: TypeExports.Array(ImagerBunBuddyErrorSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerEnumerateResponse schema. */
export type ImagerEnumerateResponse = Static<typeof ImagerEnumerateResponseSchema>;

/**
 * Imager health response schema.
 */
export const ImagerHealthResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly baseUrl: TString;
    readonly data: TUnknown;
    readonly timestamp: TString;
  },
  "ok" | "timestamp" | "baseUrl" | "data",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    baseUrl: TypeExports.String({ minLength: 1 }),
    data: JsonValueSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ImagerHealthResponse schema. */
export type ImagerHealthResponse = Static<typeof ImagerHealthResponseSchema>;
