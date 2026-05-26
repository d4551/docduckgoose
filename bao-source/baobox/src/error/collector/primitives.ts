import { isAsyncIteratorLike, isIteratorLike, isPromiseLike } from "../../shared/runtime-guards.js";
import { schemaPath, schemaPatterns, schemaStringListField } from "../../shared/schema-access.js";
import type { TSchema } from "../../type/base-types.js";
import type { TEnum } from "../../type/composite-types.js";
import type { TUint8Array } from "../../type/higher-order-types.js";
import { String as TypeString } from "../../type/primitives.js";
import type {
  TBigInt,
  TDate,
  TInteger,
  TLiteral,
  TNumber,
  TString,
} from "../../type/primitives-types.js";
import { CheckInternal } from "../../value/check.js";
import { createSchemaIssue, type SchemaIssue } from "../messages.js";
import type { ReferenceMap } from "./shared.js";

const IDENTIFIER_RE: RegExp = /^[$A-Z_a-z][$\w]*$/;

interface TBaseSchemaLike extends TSchema {
  check?: (input: unknown) => boolean;
  errors?: (input: unknown) => object[];
}

function invalidTypeIssue(
  schema: TSchema,
  path: readonly string[],
  expected: string,
  actual?: string,
): SchemaIssue[] {
  return [
    createSchemaIssue(
      schemaPath(path),
      "INVALID_TYPE",
      actual === undefined ? { expected } : { expected, actual },
      schema,
    ),
  ];
}

function collectStringIssues(
  schema: TString,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);

  if (typeof value !== "string") {
    issues.push(
      createSchemaIssue(
        currentPath,
        "INVALID_TYPE",
        { expected: "string", actual: typeof value },
        schema,
      ),
    );
    return issues;
  }

  if (schema.minLength !== undefined && value.length < schema.minLength) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MIN_LENGTH",
        { label: "String length", minimum: schema.minLength },
        schema,
      ),
    );
  }
  if (schema.maxLength !== undefined && value.length > schema.maxLength) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MAX_LENGTH",
        { label: "String length", maximum: schema.maxLength },
        schema,
      ),
    );
  }
  if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "PATTERN",
        { label: "String", pattern: schema.pattern },
        schema,
      ),
    );
  }
  if (
    typeof schema.format === "string" &&
    !CheckInternal(TypeString({ format: schema.format }), value, refs)
  ) {
    issues.push(
      createSchemaIssue(currentPath, "FORMAT", { label: "String", format: schema.format }, schema),
    );
  }

  return issues;
}

function collectNumberIssues(
  schema: TInteger | TNumber,
  value: unknown,
  path: readonly string[],
  integerOnly: boolean,
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);

  if (typeof value !== "number" || !Number.isFinite(value)) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "INVALID_TYPE",
        { expected: "number", actual: typeof value },
        schema,
      ),
    );
    return issues;
  }

  if (integerOnly && !Number.isInteger(value)) {
    issues.push(createSchemaIssue(currentPath, "INVALID_TYPE", { expected: "integer" }, schema));
  }
  if (schema.minimum !== undefined && value < schema.minimum) {
    issues.push(createSchemaIssue(currentPath, "MINIMUM", { minimum: schema.minimum }, schema));
  }
  if (schema.maximum !== undefined && value > schema.maximum) {
    issues.push(createSchemaIssue(currentPath, "MAXIMUM", { maximum: schema.maximum }, schema));
  }
  if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "EXCLUSIVE_MINIMUM",
        { minimum: schema.exclusiveMinimum },
        schema,
      ),
    );
  }
  if (schema.exclusiveMaximum !== undefined && value >= schema.exclusiveMaximum) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "EXCLUSIVE_MAXIMUM",
        { maximum: schema.exclusiveMaximum },
        schema,
      ),
    );
  }
  if (schema.multipleOf !== undefined && value % schema.multipleOf !== 0) {
    issues.push(
      createSchemaIssue(currentPath, "MULTIPLE_OF", { divisor: schema.multipleOf }, schema),
    );
  }

  return issues;
}

function collectBigIntIssues(
  schema: TBigInt,
  value: unknown,
  path: readonly string[],
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);
  if (typeof value !== "bigint") {
    return invalidTypeIssue(schema, path, "bigint", typeof value);
  }
  if (schema.minimum !== undefined && value < schema.minimum) {
    issues.push(createSchemaIssue(currentPath, "MINIMUM", { minimum: schema.minimum }, schema));
  }
  if (schema.maximum !== undefined && value > schema.maximum) {
    issues.push(createSchemaIssue(currentPath, "MAXIMUM", { maximum: schema.maximum }, schema));
  }
  if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "EXCLUSIVE_MINIMUM",
        { minimum: schema.exclusiveMinimum },
        schema,
      ),
    );
  }
  if (schema.exclusiveMaximum !== undefined && value >= schema.exclusiveMaximum) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "EXCLUSIVE_MAXIMUM",
        { maximum: schema.exclusiveMaximum },
        schema,
      ),
    );
  }
  if (schema.multipleOf !== undefined && value % schema.multipleOf !== 0n) {
    issues.push(
      createSchemaIssue(currentPath, "MULTIPLE_OF", { divisor: schema.multipleOf }, schema),
    );
  }
  return issues;
}

function collectDateIssues(schema: TDate, value: unknown, path: readonly string[]): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);
  if (!(value instanceof globalThis.Date) || Number.isNaN(value.getTime())) {
    return invalidTypeIssue(schema, path, "Date instance");
  }
  const timestamp = value.getTime();
  if (schema.minimumTimestamp !== undefined && timestamp < schema.minimumTimestamp) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MINIMUM",
        { label: "Date timestamp", minimum: schema.minimumTimestamp },
        schema,
      ),
    );
  }
  if (schema.maximumTimestamp !== undefined && timestamp > schema.maximumTimestamp) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MAXIMUM",
        { label: "Date timestamp", maximum: schema.maximumTimestamp },
        schema,
      ),
    );
  }
  return issues;
}

function collectLiteralIssues(
  schema: TLiteral<string | number | boolean>,
  value: unknown,
  path: readonly string[],
): SchemaIssue[] {
  return value === schema.const
    ? []
    : [
        createSchemaIssue(
          schemaPath(path),
          "INVALID_CONST",
          { expectedValue: JSON.stringify(schema.const) },
          schema,
        ),
      ];
}

function collectEnumIssues(schema: TEnum, value: unknown, path: readonly string[]): SchemaIssue[] {
  if (typeof value !== "string") {
    return invalidTypeIssue(schema, path, "string", typeof value);
  }
  const values = schemaStringListField(schema, "values");
  return values.includes(value)
    ? []
    : [createSchemaIssue(schemaPath(path), "ENUM", { values }, schema)];
}

function collectTemplateLiteralIssues(
  schema: TSchema,
  value: unknown,
  path: readonly string[],
): SchemaIssue[] {
  if (typeof value !== "string") {
    return invalidTypeIssue(schema, path, "string", typeof value);
  }
  const patterns = schemaPatterns(schema);
  return new RegExp(patterns.join("|")).test(value)
    ? []
    : [createSchemaIssue(schemaPath(path), "PATTERN", { label: "String", patterns }, schema)];
}

function collectUint8ArrayIssues(
  schema: TUint8Array,
  value: unknown,
  path: readonly string[],
): SchemaIssue[] {
  const issues: SchemaIssue[] = [];
  const currentPath = schemaPath(path);
  if (!(value instanceof globalThis.Uint8Array)) {
    return invalidTypeIssue(schema, path, "Uint8Array", typeof value);
  }
  if (schema.minByteLength !== undefined && value.byteLength < schema.minByteLength) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MIN_LENGTH",
        { label: "Uint8Array byteLength", minimum: schema.minByteLength },
        schema,
      ),
    );
  }
  if (schema.maxByteLength !== undefined && value.byteLength > schema.maxByteLength) {
    issues.push(
      createSchemaIssue(
        currentPath,
        "MAX_LENGTH",
        { label: "Uint8Array byteLength", maximum: schema.maxByteLength },
        schema,
      ),
    );
  }
  return issues;
}

export function collectPrimitiveIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
): SchemaIssue[] | undefined {
  let issues: SchemaIssue[] | undefined;
  const directIssues = collectDirectPrimitiveIssues(kind, schema, value, path, refs);
  if (directIssues !== undefined) {
    return directIssues;
  }

  const simpleIssues = collectSimplePrimitiveIssues(kind, schema, value, path);
  if (simpleIssues !== undefined) {
    return simpleIssues;
  }

  if (kind === "Base") {
    const currentPath = schemaPath(path);
    const baseSchema = schema as TBaseSchemaLike;
    if (typeof baseSchema.check === "function" && !baseSchema.check(value)) {
      issues = [createSchemaIssue(currentPath, "BASE", {}, baseSchema)];
      return issues;
    }
    issues = [];
    return issues;
  }

  return issues;
}

function collectDirectPrimitiveIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  refs: ReferenceMap,
): SchemaIssue[] | undefined {
  let issues: SchemaIssue[] | undefined;
  switch (kind) {
    case "String":
      issues = collectStringIssues(schema as TString, value, path, refs);
      return issues;
    case "Number":
      issues = collectNumberIssues(schema as TNumber, value, path, false);
      return issues;
    case "Integer":
      issues = collectNumberIssues(schema as TInteger, value, path, true);
      return issues;
    case "BigInt":
      issues = collectBigIntIssues(schema as TBigInt, value, path);
      return issues;
    case "Date":
      issues = collectDateIssues(schema as TDate, value, path);
      return issues;
    case "Literal":
      issues = collectLiteralIssues(schema as TLiteral<string | number | boolean>, value, path);
      return issues;
    case "Enum":
      issues = collectEnumIssues(schema as TEnum, value, path);
      return issues;
    case "TemplateLiteral":
      issues = collectTemplateLiteralIssues(schema, value, path);
      return issues;
    case "Uint8Array":
      issues = collectUint8ArrayIssues(schema as TUint8Array, value, path);
      return issues;
    default:
      return issues;
  }
}

function collectIdentifierIssues(
  schema: TSchema,
  value: unknown,
  path: readonly string[],
): SchemaIssue[] {
  if (typeof value !== "string") {
    return invalidTypeIssue(schema, path, "string", typeof value);
  }
  return IDENTIFIER_RE.test(value)
    ? []
    : [createSchemaIssue(schemaPath(path), "IDENTIFIER", { expected: "string" }, schema)];
}

function collectGuardedPrimitiveIssues(
  schema: TSchema,
  value: unknown,
  path: readonly string[],
  expected: string,
  matches: (input: unknown) => boolean,
  actual?: string,
): SchemaIssue[] {
  return matches(value) ? [] : invalidTypeIssue(schema, path, expected, actual);
}

function collectSimplePrimitiveIssues(
  kind: string | undefined,
  schema: TSchema,
  value: unknown,
  path: readonly string[],
): SchemaIssue[] | undefined {
  let issues: SchemaIssue[] | undefined;
  switch (kind) {
    case "Boolean":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "boolean",
        (input) => typeof input === "boolean",
        typeof value,
      );
      return issues;
    case "Null":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "null",
        (input) => input === null,
      );
      return issues;
    case "Void":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "void (undefined or null)",
        (input) => input === undefined || input === null,
      );
      return issues;
    case "Undefined":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "undefined",
        (input) => input === undefined,
      );
      return issues;
    case "Never":
      issues = [createSchemaIssue(schemaPath(path), "NEVER", {}, schema)];
      return issues;
    case "Identifier":
      issues = collectIdentifierIssues(schema, value, path);
      return issues;
    case "Promise":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "Promise-like value",
        isPromiseLike,
      );
      return issues;
    case "Iterator":
      issues = collectGuardedPrimitiveIssues(schema, value, path, "iterator value", isIteratorLike);
      return issues;
    case "AsyncIterator":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "async iterator value",
        isAsyncIteratorLike,
      );
      return issues;
    case "Function":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "function",
        (input) => typeof input === "function",
        typeof value,
      );
      return issues;
    case "Constructor":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "constructor function",
        (input) => typeof input === "function" && "prototype" in input,
      );
      return issues;
    case "Symbol":
      issues = collectGuardedPrimitiveIssues(
        schema,
        value,
        path,
        "symbol",
        (input) => typeof input === "symbol",
        typeof value,
      );
      return issues;
    default:
      return issues;
  }
}
