/**
 * Client telemetry schemas.
 *
 * Shared TypeBox schemas and inferred types for system telemetry ingestion.
 * This file is the single contract source for `/api/v1/system/client-errors`.
 *
 * @shared/schemas/client-telemetry.schemas
 */

import { CLIENT_ERROR_SEVERITY_VALUES } from "@baohaus/bao-constants/client-telemetry";
import type { Static, TLiteral, TObject, TOptional, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";

const CLIENT_ERROR_MESSAGE_MAX_LENGTH = 2000;
const CLIENT_ERROR_STACK_MAX_LENGTH = 20_000;
const CLIENT_ERROR_COMPONENT_NAME_MAX_LENGTH = 200;
const CLIENT_ERROR_CONTEXT_MAX_LENGTH = 500;
const CLIENT_ERROR_USER_AGENT_MAX_LENGTH = 500;
const CLIENT_ERROR_SOURCE_MAX_LENGTH = 100;
const CLIENT_ERROR_TAG_KEY_MAX_LENGTH = 50;
const CLIENT_ERROR_TAG_VALUE_MAX_LENGTH = 200;

/**
 * Severity schema for client error telemetry payloads.
 */
export const ClientErrorSeveritySchema: TUnion<
  [TLiteral<"error" | "warning" | "info">, ...TLiteral<"error" | "warning" | "info">[]]
> = stringEnum(CLIENT_ERROR_SEVERITY_VALUES, {});

/**
 * Client error telemetry payload schema.
 */
export const ClientErrorReportSchema = TypeExports.Object({
  message: TypeExports.String({ minLength: 1, maxLength: CLIENT_ERROR_MESSAGE_MAX_LENGTH }),
  stack: TypeExports.Optional(TypeExports.String({ maxLength: CLIENT_ERROR_STACK_MAX_LENGTH })),
  componentName: TypeExports.Optional(
    TypeExports.String({
      maxLength: CLIENT_ERROR_COMPONENT_NAME_MAX_LENGTH,
    }),
  ),
  context: TypeExports.Optional(TypeExports.String({ maxLength: CLIENT_ERROR_CONTEXT_MAX_LENGTH })),
  timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  url: TypeExports.Optional(TypeExports.String()),
  userAgent: TypeExports.Optional(
    TypeExports.String({ maxLength: CLIENT_ERROR_USER_AGENT_MAX_LENGTH }),
  ),
  severity: TypeExports.Optional(ClientErrorSeveritySchema),
  source: TypeExports.Optional(TypeExports.String({ maxLength: CLIENT_ERROR_SOURCE_MAX_LENGTH })),
  tags: TypeExports.Optional(
    TypeExports.Record(
      TypeExports.String({ maxLength: CLIENT_ERROR_TAG_KEY_MAX_LENGTH }),
      TypeExports.String({ maxLength: CLIENT_ERROR_TAG_VALUE_MAX_LENGTH }),
    ),
  ),
  extra: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
});

/**
 * Response schema for client error telemetry ingestion.
 */
export const ClientErrorReportResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly receivedAt: TString;
    readonly eventId: TOptional<TString>;
  },
  "ok" | "receivedAt",
  "eventId"
> = TypeExports.Object({
  ok: TypeExports.Literal(true),
  receivedAt: TypeExports.String(),
  eventId: TypeExports.Optional(TypeExports.String()),
});

/** Inferred type from the ClientErrorSeverity schema. */
export type ClientErrorSeverity = Static<typeof ClientErrorSeveritySchema>;
/** Inferred type from the client error telemetry payload schema. */
export type ClientErrorReportPayload = Static<typeof ClientErrorReportSchema>;
/** Inferred type from the client error telemetry response schema. */
export type ClientErrorReportResponse = Static<typeof ClientErrorReportResponseSchema>;
