/**
 * Arducam 200MP imager schemas.
 *
 * Contract-first schemas for Arducam 200MP capability and conversion routes
 * surfaced through the imager API.
 */

import type {
  Static,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Normalized runtime platform values for Arducam conversion support.
 */
export const ArducamPlatformSchema: TUnion<
  (TLiteral<"windows"> | TLiteral<"linux"> | TLiteral<"macos">)[]
> = TypeExports.Union(
  [TypeExports.Literal("windows"), TypeExports.Literal("linux"), TypeExports.Literal("macos")],
  {
    additionalProperties: false,
  },
);

/** Inferred type from the ArducamPlatform schema. */
export type ArducamPlatform = Static<typeof ArducamPlatformSchema>;

/**
 * Minimal device summary emitted for Arducam-eligible cameras.
 */
export const Arducam200MpDeviceSummarySchema: TObject<
  {
    readonly id: TString;
    readonly label: TString;
    readonly path: TString;
    readonly vendorId: TUnion<(TString | TNull)[]>;
    readonly productId: TUnion<(TString | TNull)[]>;
    readonly manufacturer: TString;
    readonly product: TString;
    readonly serialNumber: TString;
  },
  "vendorId" | "productId" | "id" | "label" | "path" | "manufacturer" | "product" | "serialNumber",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    path: TypeExports.String({ minLength: 1 }),
    vendorId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    productId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    manufacturer: TypeExports.String(),
    product: TypeExports.String(),
    serialNumber: TypeExports.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpDeviceSummary schema. */
export type Arducam200MpDeviceSummary = Static<typeof Arducam200MpDeviceSummarySchema>;

/**
 * Arducam converter runtime configuration snapshot.
 */
export const Arducam200MpCapabilitiesConfigSchema: TObject<
  {
    readonly timeoutMs: TInteger;
    readonly retryAttempts: TInteger;
    readonly retryBackoffMs: TInteger;
    readonly retryBackoffMaxMs: TInteger;
    readonly outputRawFilename: TString;
  },
  "timeoutMs" | "retryAttempts" | "retryBackoffMs" | "retryBackoffMaxMs" | "outputRawFilename",
  never
> = TypeExports.Object(
  {
    timeoutMs: TypeExports.Integer({ minimum: 0 }),
    retryAttempts: TypeExports.Integer({ minimum: 0 }),
    retryBackoffMs: TypeExports.Integer({ minimum: 0 }),
    retryBackoffMaxMs: TypeExports.Integer({ minimum: 0 }),
    outputRawFilename: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpCapabilitiesConfig schema. */
export type Arducam200MpCapabilitiesConfig = Static<typeof Arducam200MpCapabilitiesConfigSchema>;

/**
 * Arducam converter capability payload.
 */
export const Arducam200MpCapabilitiesSchema = TypeExports.Object(
  {
    ok: TypeExports.Optional(TypeExports.Literal(true)),
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    enabled: TypeExports.Boolean(),
    deviceContextRequired: TypeExports.Boolean(),
    platform: TypeExports.Union([ArducamPlatformSchema, TypeExports.Null()]),
    configuredBinary: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    resolvedBinaryPath: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    available: TypeExports.Boolean(),
    ready: TypeExports.Boolean(),
    discoveredCameraCount: TypeExports.Integer({ minimum: 0 }),
    eligibleDevices: TypeExports.Array(Arducam200MpDeviceSummarySchema),
    defaultDeviceId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    reason: TypeExports.Optional(TypeExports.String()),
    config: Arducam200MpCapabilitiesConfigSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpCapabilities schema. */
export type Arducam200MpCapabilities = Static<typeof Arducam200MpCapabilitiesSchema>;

/**
 * Arducam 200MP conversion request payload.
 */
export const Arducam200MpConvertRequestSchema = TypeExports.Object(
  {
    deviceId: TypeExports.Optional(TypeExports.String()),
    inputRaw8Path: TypeExports.String({ minLength: 1 }),
    outputRawPath: TypeExports.String({ minLength: 1 }),
    infEepromPath: TypeExports.String({ minLength: 1 }),
    macEepromPath: TypeExports.String({ minLength: 1 }),
    eepromDataLength: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
    width: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
    height: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
    outputWidth: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
    outputHeight: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 65535 })),
    colorOrder: TypeExports.Optional(TypeExports.Integer({ minimum: 0, maximum: 3 })),
    workingDirectory: TypeExports.Optional(TypeExports.String()),
    raw10Stem: TypeExports.Optional(TypeExports.String()),
    retainIntermediateRaw10: TypeExports.Optional(TypeExports.Boolean()),
    retainConverterOutput: TypeExports.Optional(TypeExports.Boolean()),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertRequest schema. */
export type Arducam200MpConvertRequest = Static<typeof Arducam200MpConvertRequestSchema>;

/**
 * Failure codes emitted by Arducam conversion responses.
 */
export const Arducam200MpConvertFailureCodeSchema: TUnion<
  (
    | TLiteral<"INVALID_REQUEST">
    | TLiteral<"INVALID_CONFIG">
    | TLiteral<"UNSUPPORTED_PLATFORM">
    | TLiteral<"READ_INPUT_FAILED">
    | TLiteral<"CONVERTER_FAILED">
    | TLiteral<"OUTPUT_NOT_FOUND">
    | TLiteral<"BINARY_NOT_FOUND">
    | TLiteral<"CANCELLED">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("INVALID_REQUEST"),
    TypeExports.Literal("INVALID_CONFIG"),
    TypeExports.Literal("UNSUPPORTED_PLATFORM"),
    TypeExports.Literal("READ_INPUT_FAILED"),
    TypeExports.Literal("CONVERTER_FAILED"),
    TypeExports.Literal("OUTPUT_NOT_FOUND"),
    TypeExports.Literal("BINARY_NOT_FOUND"),
    TypeExports.Literal("CANCELLED"),
  ],
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertFailureCode schema. */
export type Arducam200MpConvertFailureCode = Static<typeof Arducam200MpConvertFailureCodeSchema>;

/**
 * Successful Arducam conversion payload.
 */
export const Arducam200MpConvertSuccessSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    code: TypeExports.Literal("OK"),
    platform: ArducamPlatformSchema,
    correlationId: TypeExports.Optional(TypeExports.String()),
    command: TypeExports.Array(TypeExports.String()),
    attempts: TypeExports.Integer({ minimum: 1 }),
    durationMs: TypeExports.Integer({ minimum: 0 }),
    outputRawPath: TypeExports.String({ minLength: 1 }),
    raw10Path: TypeExports.String({ minLength: 1 }),
    converterOutputPath: TypeExports.String({ minLength: 1 }),
    stdout: TypeExports.String(),
    stderr: TypeExports.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertSuccess schema. */
export type Arducam200MpConvertSuccess = Static<typeof Arducam200MpConvertSuccessSchema>;

/**
 * Failed Arducam conversion payload.
 */
export const Arducam200MpConvertFailureSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(false),
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    code: Arducam200MpConvertFailureCodeSchema,
    error: TypeExports.String({ minLength: 1 }),
    correlationId: TypeExports.Optional(TypeExports.String()),
    platform: TypeExports.Optional(ArducamPlatformSchema),
    command: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    attempts: TypeExports.Integer({ minimum: 0 }),
    durationMs: TypeExports.Integer({ minimum: 0 }),
    exitCode: TypeExports.Optional(TypeExports.Integer()),
    stdout: TypeExports.Optional(TypeExports.String()),
    stderr: TypeExports.Optional(TypeExports.String()),
    timedOut: TypeExports.Optional(TypeExports.Boolean()),
    aborted: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertFailure schema. */
export type Arducam200MpConvertFailure = Static<typeof Arducam200MpConvertFailureSchema>;

/**
 * Union schema for Arducam conversion result envelopes.
 */
export const Arducam200MpConvertResultSchema = TypeExports.Union(
  [Arducam200MpConvertSuccessSchema, Arducam200MpConvertFailureSchema],
  { additionalProperties: false },
);

/** Inferred type from the Arducam200MpConvertResult schema. */
export type Arducam200MpConvertResult = Static<typeof Arducam200MpConvertResultSchema>;
