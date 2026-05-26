/**
 * Scanner bunbuddy contracts (schemas + types).
 *
 * The scanner bunbuddy (FastAPI) exposes canonical `devices/meta` list responses
 * shared with the server-side bunbuddy list contract.
 *
 * This module captures the best-effort contract used by the platform for validation at the API
 * boundary and before persisting records to the device registry.
 *
 * @shared/schemas/scanner-bunbuddy.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyListMetaSchema, BunBuddyListResponseSchema } from "./bunbuddy.schemas.ts";

const ScannerDeviceSyncCountSchema: TObject<
  { readonly upserted: TInteger; readonly matched: TInteger },
  "upserted" | "matched",
  never
> = TypeExports.Object(
  {
    upserted: TypeExports.Integer({ minimum: 0 }),
    matched: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Scanner bunbuddy connection status.
 */
export const ScannerBunBuddyScannerStatusSchema: TUnion<
  (
    | TLiteral<"disconnected">
    | TLiteral<"connecting">
    | TLiteral<"connected">
    | TLiteral<"scanning">
    | TLiteral<"error">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("disconnected"),
    TypeExports.Literal("connecting"),
    TypeExports.Literal("connected"),
    TypeExports.Literal("scanning"),
    TypeExports.Literal("error"),
  ],
  {},
);

/**
 * Turntable connection status.
 */
export const ScannerBunBuddyTurntableStatusSchema: TUnion<
  (
    | TLiteral<"disconnected">
    | TLiteral<"connecting">
    | TLiteral<"connected">
    | TLiteral<"moving">
    | TLiteral<"idle">
    | TLiteral<"error">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("disconnected"),
    TypeExports.Literal("connecting"),
    TypeExports.Literal("connected"),
    TypeExports.Literal("moving"),
    TypeExports.Literal("idle"),
    TypeExports.Literal("error"),
  ],
  {},
);

/**
 * Scanner bunbuddy `ScannerInfo` (best-effort).
 */
export const ScannerBunBuddyScannerInfoSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    model: TypeExports.String({ minLength: 1 }),
    firmwareVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    ipAddress: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    status: TypeExports.Optional(ScannerBunBuddyScannerStatusSchema),
    capabilities: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    ),
    discoveredAt: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    simulated: TypeExports.Optional(TypeExports.Boolean()),
    vendor: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * Scanner bunbuddy `TurntableInfo` (best-effort).
 */
export const ScannerBunBuddyTurntableInfoSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    macAddress: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    status: TypeExports.Optional(ScannerBunBuddyTurntableStatusSchema),
    currentRotation: TypeExports.Optional(TypeExports.Number()),
    currentTilt: TypeExports.Optional(TypeExports.Number()),
    capabilities: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    ),
    discoveredAt: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    simulated: TypeExports.Optional(TypeExports.Boolean()),
    vendor: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    model: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * Scanner bunbuddy list response.
 *
 * @remarks
 * The bunbuddy list contract is canonical `devices/meta` only.
 */
export const ScannerBunBuddyListResponseSchema = TypeExports.Object(
  {
    devices: BunBuddyListResponseSchema.properties.devices,
    meta: BunBuddyListMetaSchema,
  },
  { additionalProperties: true },
);

/**
 * Non-empty scan session id (best-effort).
 */
export const ScannerBunBuddyScanSessionIdSchema: TString = TypeExports.String({
  minLength: 1,
});

/**
 * Nested session envelope for scan-start responses.
 */
const ScannerBunBuddyScanStartSessionSchema = TypeExports.Object(
  {
    id: ScannerBunBuddyScanSessionIdSchema,
  },
  { additionalProperties: true },
);

/**
 * Scan session start response.
 *
 * Canonical scanner-bunbuddy responses must include either `id` or `session.id`.
 */
export const ScannerBunBuddyScanStartResponseSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        id: ScannerBunBuddyScanSessionIdSchema,
        success: TypeExports.Optional(TypeExports.Boolean()),
        message: TypeExports.Optional(TypeExports.String()),
        error: TypeExports.Optional(TypeExports.String()),
        session: TypeExports.Optional(ScannerBunBuddyScanStartSessionSchema),
      },
      { additionalProperties: true },
    ),
    TypeExports.Object(
      {
        success: TypeExports.Optional(TypeExports.Boolean()),
        message: TypeExports.Optional(TypeExports.String()),
        error: TypeExports.Optional(TypeExports.String()),
        session: ScannerBunBuddyScanStartSessionSchema,
      },
      { additionalProperties: true },
    ),
  ],
  {},
);

/**
 * Generic JSON-object bunbuddy response (best-effort).
 *
 * Used when we need to ensure the payload is an object (not an array/null) before returning
 * it to clients or persisting derived metadata.
 */
export const ScannerBunBuddyJsonObjectResponseSchema: TObject<
  Record<string, never>,
  never,
  never
> = TypeExports.Object({}, { additionalProperties: true });

/**
 * Scanner device-sync summary counts grouped by device class.
 */
export const ScannerDeviceSyncSummarySchema: TObject<
  {
    readonly scanners: TObject<
      { readonly upserted: TInteger; readonly matched: TInteger },
      "upserted" | "matched",
      never
    >;
    readonly turntables: TObject<
      { readonly upserted: TInteger; readonly matched: TInteger },
      "upserted" | "matched",
      never
    >;
  },
  "scanners" | "turntables",
  never
> = TypeExports.Object(
  {
    scanners: ScannerDeviceSyncCountSchema,
    turntables: ScannerDeviceSyncCountSchema,
  },
  { additionalProperties: false },
);

/**
 * Scanner device-sync error row.
 */
export const ScannerDeviceSyncErrorSchema: TObject<
  {
    readonly source: TUnion<(TLiteral<"scanners"> | TLiteral<"turntables"> | TLiteral<"db">)[]>;
    readonly error: TString;
  },
  "source" | "error",
  never
> = TypeExports.Object(
  {
    source: TypeExports.Union([
      TypeExports.Literal("scanners"),
      TypeExports.Literal("turntables"),
      TypeExports.Literal("db"),
    ]),
    error: TypeExports.String(),
  },
  { additionalProperties: false },
);

/**
 * Scanner device-sync result payload.
 */
export const ScannerDeviceSyncResultSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly scannedAt: TString;
    readonly baseUrl: TUnion<(TString | TNull)[]>;
    readonly summary: TObject<
      {
        readonly scanners: TObject<
          { readonly upserted: TInteger; readonly matched: TInteger },
          "upserted" | "matched",
          never
        >;
        readonly turntables: TObject<
          { readonly upserted: TInteger; readonly matched: TInteger },
          "upserted" | "matched",
          never
        >;
      },
      "scanners" | "turntables",
      never
    >;
    readonly errors: TArray<
      TObject<
        {
          readonly source: TUnion<
            (TLiteral<"scanners"> | TLiteral<"turntables"> | TLiteral<"db">)[]
          >;
          readonly error: TString;
        },
        "source" | "error",
        never
      >
    >;
  },
  "baseUrl" | "errors" | "ok" | "scannedAt" | "summary",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    scannedAt: TypeExports.String({ format: "date-time" }),
    baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    summary: ScannerDeviceSyncSummarySchema,
    errors: TypeExports.Array(ScannerDeviceSyncErrorSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ScannerBunBuddyScannerInfo schema. */
export type ScannerBunBuddyScannerInfo = Static<typeof ScannerBunBuddyScannerInfoSchema>;
/** Inferred type from the ScannerBunBuddyTurntableInfo schema. */
export type ScannerBunBuddyTurntableInfo = Static<typeof ScannerBunBuddyTurntableInfoSchema>;
/** Inferred type from the ScannerBunBuddyListResponse schema. */
export type ScannerBunBuddyListResponse = Static<typeof ScannerBunBuddyListResponseSchema>;
/** Inferred type from the ScannerBunBuddyScanStartResponse schema. */
export type ScannerBunBuddyScanStartResponse = Static<
  typeof ScannerBunBuddyScanStartResponseSchema
>;
/** Inferred type from the ScannerDeviceSyncResult schema. */
export type ScannerDeviceSyncResultResponse = Static<typeof ScannerDeviceSyncResultSchema>;
