/**
 * @baohaus/http-bao/validator
 *
 * Schema validation helpers — TypeBox-compatible t.* API surface.
 * Fully typed, no external dependencies.
 */

interface ValidationResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly errors?: readonly string[];
}

type Validator<T> = (value: unknown) => ValidationResult<T>;

type ValidatorJsonPrimitive = string | number | boolean | null;
type ValidatorJsonValue =
  | ValidatorJsonPrimitive
  | ValidatorJsonRecord
  | readonly ValidatorJsonValue[];

interface ValidatorJsonRecord {
  readonly [key: string]: ValidatorJsonValue;
}

function isPlainObject(value: unknown): value is ValidatorJsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Primitives

function string(): Validator<string> {
  return (value: unknown) => {
    if (typeof value === "string") {
      return { success: true, data: value };
    }
    return { success: false, errors: ["Expected string"] };
  };
}

function number(): Validator<number> {
  return (value: unknown) => {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return { success: true, data: value };
    }
    return { success: false, errors: ["Expected number"] };
  };
}

function boolean(): Validator<boolean> {
  return (value: unknown) => {
    if (typeof value === "boolean") {
      return { success: true, data: value };
    }
    return { success: false, errors: ["Expected boolean"] };
  };
}

function any(): Validator<unknown> {
  return (value: unknown) => ({ success: true, data: value });
}

function unknown(): Validator<unknown> {
  return (value: unknown) => ({ success: true, data: value });
}

function nullValidator(): Validator<null> {
  return (value: unknown) => {
    if (value === null) {
      return { success: true, data: null };
    }
    return { success: false, errors: ["Expected null"] };
  };
}

function undefinedValidator(): Validator<undefined> {
  return (value: unknown) => {
    if (value === undefined) {
      return { success: true, data: undefined };
    }
    return { success: false, errors: ["Expected undefined"] };
  };
}

function voidValidator(): Validator<void> {
  return (_value: unknown) => ({ success: true, data: undefined });
}

function literal<T extends string | number | boolean>(value: T): Validator<T> {
  return (v: unknown) => {
    if (v === value) {
      return { success: true, data: value };
    }
    return { success: false, errors: [`Expected literal ${String(value)}`] };
  };
}

// Composite

function object<T extends Record<string, Validator<unknown>>>(
  schema: T,
): Validator<{ [K in keyof T]: T[K] extends Validator<infer U> ? U : never }> {
  return (value: unknown) => {
    if (!isPlainObject(value)) {
      return { success: false, errors: ["Expected object"] };
    }
    const result: Record<string, unknown> = {};
    const errors: string[] = [];

    for (const key of Object.keys(schema)) {
      const validator = schema[key];
      const fieldResult = validator(Reflect.get(value, key));
      if (fieldResult.success) {
        result[key] = fieldResult.data;
      } else {
        errors.push(...(fieldResult.errors ?? [`Field "${key}" validation failed`]));
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }
    return {
      success: true,
      data: result as { [K in keyof T]: T[K] extends Validator<infer U> ? U : never },
    };
  };
}

function array<T extends Validator<unknown>>(
  itemValidator: T,
): Validator<Array<T extends Validator<infer U> ? U : never>> {
  return (value: unknown) => {
    if (!Array.isArray(value)) {
      return { success: false, errors: ["Expected array"] };
    }
    const result: unknown[] = [];
    const errors: string[] = [];

    for (let i = 0; i < value.length; i++) {
      const itemResult = itemValidator(value[i]);
      if (itemResult.success) {
        result.push(itemResult.data);
      } else {
        errors.push(...(itemResult.errors ?? [`Item at index ${i} validation failed`]));
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }
    return { success: true, data: result as Array<T extends Validator<infer U> ? U : never> };
  };
}

function optional<T extends Validator<unknown>>(
  validator: T,
): Validator<T extends Validator<infer U> ? U | undefined : never> {
  return (value: unknown) => {
    if (value === undefined) {
      return { success: true, data: undefined };
    }
    return validator(value) as ValidationResult<
      T extends Validator<infer U> ? U | undefined : never
    >;
  };
}

function nullable<T extends Validator<unknown>>(
  validator: T,
): Validator<T extends Validator<infer U> ? U | null : never> {
  return (value: unknown) => {
    if (value === null) {
      return { success: true, data: null } as ValidationResult<
        T extends Validator<infer U> ? U | null : never
      >;
    }
    return validator(value) as ValidationResult<T extends Validator<infer U> ? U | null : never>;
  };
}

function enumValidator<T extends string>(values: readonly T[]): Validator<T> {
  return (value: unknown) => {
    if (typeof value === "string" && (values as readonly string[]).includes(value)) {
      return { success: true, data: value as T };
    }
    return { success: false, errors: [`Expected one of: ${values.join(", ")}`] };
  };
}

// Numeric constraints

function integer(): Validator<number> {
  return (value: unknown) => {
    if (typeof value === "number" && Number.isInteger(value)) {
      return { success: true, data: value };
    }
    return { success: false, errors: ["Expected integer"] };
  };
}

function minValue(min: number): Validator<number> {
  return (value: unknown) => {
    if (typeof value === "number" && value >= min) {
      return { success: true, data: value };
    }
    return { success: false, errors: [`Expected number >= ${min}`] };
  };
}

function maxValue(max: number): Validator<number> {
  return (value: unknown) => {
    if (typeof value === "number" && value <= max) {
      return { success: true, data: value };
    }
    return { success: false, errors: [`Expected number <= ${max}`] };
  };
}

function minLength(min: number): Validator<string> {
  return (value: unknown) => {
    if (typeof value === "string" && value.length >= min) {
      return { success: true, data: value };
    }
    return { success: false, errors: [`Expected string length >= ${min}`] };
  };
}

function maxLength(max: number): Validator<string> {
  return (value: unknown) => {
    if (typeof value === "string" && value.length <= max) {
      return { success: true, data: value };
    }
    return { success: false, errors: [`Expected string length <= ${max}`] };
  };
}

function pattern(regex: RegExp): Validator<string> {
  return (value: unknown) => {
    if (typeof value === "string" && regex.test(value)) {
      return { success: true, data: value };
    }
    return { success: false, errors: [`Expected string matching ${regex}`] };
  };
}

// File (for multipart/form-data)

function file(): Validator<unknown> {
  return (value: unknown) => {
    if (typeof value === "object" && value !== null && ("name" in value || "size" in value)) {
      return { success: true, data: value };
    }
    return { success: false, errors: ["Expected file"] };
  };
}

// Union

function union<T extends Validator<unknown>[]>(
  ...validators: T
): Validator<T[number] extends Validator<infer U> ? U : never> {
  return (value: unknown) => {
    for (const validator of validators) {
      const result = validator(value);
      if (result.success) {
        return result as ValidationResult<T[number] extends Validator<infer U> ? U : never>;
      }
    }
    return { success: false, errors: ["Expected one of the union types"] };
  };
}

// validate — top-level validation function

function validate(schema: unknown, value: unknown): ValidationResult<unknown> {
  if (typeof schema === "function") {
    return (schema as Validator<unknown>)(value);
  }
  return { success: false, errors: ["Invalid schema"] };
}

// `t` namespace — TypeBox-compatible API

const t = {
  String: string(),
  Number: number(),
  Boolean: boolean(),
  Any: any(),
  Unknown: unknown(),
  Null: nullValidator(),
  Void: voidValidator(),
  Object: object,
  Array: array,
  Optional: optional,
  Nullable: nullable,
  Enum: enumValidator,
  Literal: literal,
  Integer: integer(),
  MinValue: minValue,
  MaxValue: maxValue,
  MinLength: minLength,
  MaxLength: maxLength,
  Pattern: pattern,
  File: file(),
  Union: union,
  string,
  number,
  boolean,
  any,
  unknown,
  null: nullValidator,
  void: voidValidator,
  object,
  array,
  optional,
  nullable,
  enum: enumValidator,
  literal,
  integer,
  minValue,
  maxValue,
  minLength,
  maxLength,
  pattern,
  file,
  union,
};

export interface ValidationSchema {
  readonly [key: string]: unknown;
}

export type { ValidationResult, Validator };
export {
  any,
  array,
  boolean,
  enumValidator,
  file,
  integer,
  literal,
  maxLength,
  maxValue,
  minLength,
  minValue,
  nullable,
  nullValidator,
  number,
  object,
  optional,
  pattern,
  string,
  t,
  undefinedValidator,
  union,
  unknown,
  validate,
  voidValidator,
};
