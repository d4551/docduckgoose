import { type RuntimeContextArg, resolveRuntimeContext } from "../shared/runtime-context.js";
import type { TSchema } from "../type/base-types.js";
import { collectSchemaIssues } from "./collector.js";
import { localizeSchemaIssueWithCatalog, type SchemaIssueDiagnostic } from "./messages.js";

/** Structured validation error */
export interface SchemaError {
  path: string;
  message: string;
  code: string;
}

export interface ParseSuccess<T> {
  success: true;
  value: T;
}

export interface ParseFailure {
  success: false;
  errors: SchemaError[];
}

export type ParseResult<T> = ParseSuccess<T> | ParseFailure;

/** Collect raw issues with localized diagnostics for a value against a schema */
export function Explain(
  schema: TSchema,
  value: unknown,
  context?: RuntimeContextArg,
): SchemaIssueDiagnostic[] {
  const runtimeContext = resolveRuntimeContext(context);
  const locale = String(runtimeContext.locale.get());
  const catalog = runtimeContext.locale.getCatalog(locale);
  return collectSchemaIssues(schema, value).map((issue) =>
    localizeSchemaIssueWithCatalog(issue, catalog, locale),
  );
}

/** Collect all validation errors for a value against a schema */
export function Errors(
  schema: TSchema,
  value: unknown,
  context?: RuntimeContextArg,
): SchemaError[] {
  return Explain(schema, value, context).map((issue) => ({
    path: issue.path,
    code: issue.code,
    message: issue.message,
  }));
}

type LocalizedSchemaError = SchemaError & {
  locale: string;
  localizedMessage: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasStringField(value: Record<string, unknown>, key: string): boolean {
  return typeof value[key] === "string";
}

export function IsValidationError(value: unknown): value is SchemaError {
  return (
    isRecord(value) &&
    hasStringField(value, "path") &&
    hasStringField(value, "message") &&
    hasStringField(value, "code")
  );
}

export function IsLocalizedValidationError(value: unknown): value is LocalizedSchemaError {
  return (
    IsValidationError(value) &&
    isRecord(value) &&
    hasStringField(value, "locale") &&
    hasStringField(value, "localizedMessage")
  );
}
