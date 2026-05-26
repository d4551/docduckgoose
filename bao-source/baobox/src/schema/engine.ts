import type { SchemaError } from "../error/errors.js";
import type { URLLike } from "../shared/url-like.js";
import { CheckSchemaValue } from "./core.js";
import { Ref } from "./resolve.js";
import {
  HasObject,
  HasString,
  IsArray,
  IsObject,
  IsSchemaObject,
  Keys,
  type SchemaContext,
  type XSchema,
} from "./shared.js";

const externalState: { identifier: string; variables: unknown[] } = {
  identifier: "external_0",
  variables: [],
};

let resetCount = 1;
const functions = new Map<string, string>();

function scanUnevaluated(value: unknown): boolean {
  if (IsArray(value)) {
    return value.some((entry) => scanUnevaluated(entry));
  }
  if (IsObject(value)) {
    return Keys(value).some(
      (key) =>
        key === "unevaluatedItems" ||
        key === "unevaluatedProperties" ||
        scanUnevaluated(value[key]),
    );
  }
  return false;
}

export function HasUnevaluated(context: SchemaContext, schema: XSchema): boolean {
  return (
    scanUnevaluated(schema) || Object.keys(context).some((key) => scanUnevaluated(context[key]))
  );
}

export class BuildContext {
  constructor(private readonly hasUnevaluated: boolean) {}

  usesUnevaluated(): boolean {
    return this.hasUnevaluated;
  }

  addIndex(index: number): string {
    return `context.addIndex(${index})`;
  }

  addKey(key: string): string {
    return `context.addKey(${JSON.stringify(key)})`;
  }

  merge(results: string): string {
    return `context.merge(${results})`;
  }
}

export class CheckContext {
  private readonly indices = new Set<number>();
  private readonly keys = new Set<string>();

  addIndex(index: number): boolean {
    this.indices.add(index);
    return true;
  }

  addKey(key: string): boolean {
    this.keys.add(key);
    return true;
  }

  getIndices(): Set<number> {
    return this.indices;
  }

  getKeys(): Set<string> {
    return this.keys;
  }

  merge(results: CheckContext[]): boolean {
    for (const result of results) {
      for (const entry of result.indices) {
        this.indices.add(entry);
      }
      for (const entry of result.keys) {
        this.keys.add(entry);
      }
    }
    return true;
  }
}

export class ErrorContext extends CheckContext {
  constructor(private readonly callback: (error: SchemaError | Record<string, unknown>) => void) {
    super();
  }

  addError(error: SchemaError | Record<string, unknown>): false {
    this.callback(error);
    return false;
  }
}

export class AccumulatedErrorContext extends ErrorContext {
  private readonly errors: Array<SchemaError | Record<string, unknown>> = [];

  constructor() {
    super((error) => {
      this.errors.push(error);
    });
  }

  override addError(error: SchemaError | Record<string, unknown>): false {
    this.errors.push(error);
    return false;
  }

  getErrors(): Array<SchemaError | Record<string, unknown>> {
    return this.errors;
  }
}

export function ResetExternal(): void {
  externalState.identifier = `external_${resetCount}`;
  externalState.variables = [];
  resetCount += 1;
}

export function CreateVariable(value: unknown): string {
  const call = `${externalState.identifier}[${externalState.variables.length}]`;
  externalState.variables.push(value);
  return call;
}

export function GetExternal(): { identifier: string; variables: unknown[] } {
  return externalState;
}

export function ResetFunctions(): void {
  functions.clear();
}

export function GetFunctions(): string[] {
  return Array.from(functions.values());
}

export class Stack {
  private readonly ids: Record<string, unknown>[] = [];
  private readonly anchors: Record<string, unknown>[] = [];

  constructor(
    private readonly context: SchemaContext,
    private readonly schema: XSchema,
  ) {}

  baseUrl(): URLLike {
    return this.ids.reduce((result, schema) => {
      const id = schema.$id;
      return typeof id === "string" ? new URL(id, result.href) : result;
    }, new URL("http://unknown"));
  }

  base(): XSchema {
    return this.ids[this.ids.length - 1] ?? this.schema;
  }

  push(schema: unknown): void {
    if (!IsSchemaObject(schema)) {
      return;
    }
    if (HasString(schema, "$id")) {
      this.ids.push(schema);
    }
    if (HasString(schema, "$anchor")) {
      this.anchors.push(schema);
    }
  }

  pop(schema: unknown): void {
    if (!IsSchemaObject(schema)) {
      return;
    }
    if (HasString(schema, "$id")) {
      this.ids.pop();
    }
    if (HasString(schema, "$anchor")) {
      this.anchors.pop();
    }
  }

  ref(ref: string): XSchema | undefined {
    return this.context[ref] ?? Ref(this.base(), ref);
  }

  recursiveRef(ref: string): XSchema | undefined {
    return this.ref(ref);
  }
}

export function CreateFunction(
  _stack: Stack,
  _context: BuildContext,
  schema: XSchema,
  value: string,
): string {
  const identifier = `check_${functions.size}`;
  if (!functions.has(identifier)) {
    functions.set(identifier, `const ${identifier} = (${value}) => ${JSON.stringify(schema)};`);
  }
  return `${identifier}(${value})`;
}

export function Reducer(
  stack: Stack,
  context: CheckContext,
  schemas: XSchema[],
  value: unknown,
  check: boolean,
): boolean {
  const results = schemas
    .map((schema) => {
      const next = new CheckContext();
      return CheckSchemaValue({}, schema, value, stack.base()) ? next : undefined;
    })
    .filter((entry): entry is CheckContext => entry instanceof CheckContext);
  return check && context.merge(results);
}

export function BuildGuard(
  _stack: Stack,
  _context: BuildContext,
  _schema: XSchema,
  value: string,
): string {
  return `typeof ${value} !== 'undefined'`;
}

export function CheckGuard(
  _stack: Stack,
  _context: CheckContext,
  schema: XSchema,
  value: unknown,
): boolean {
  if (!(IsSchemaObject(schema) && HasObject(schema, "~guard"))) {
    return true;
  }
  const guard = schema["~guard"];
  if (!IsObject(guard)) {
    return true;
  }
  return typeof guard.check === "function" ? guard.check(value) : true;
}

export function ErrorGuard(
  stack: Stack,
  context: ErrorContext,
  schemaPath: string,
  instancePath: string,
  schema: XSchema,
  value: unknown,
): boolean {
  if (CheckGuard(stack, context, schema, value)) {
    return true;
  }
  return context.addError({ keyword: "~guard", schemaPath, instancePath, params: { value } });
}

export function BuildRefine(
  _stack: Stack,
  _context: BuildContext,
  _schema: XSchema,
  value: string,
): string {
  return `typeof ${value} !== 'undefined'`;
}

export function CheckRefine(
  _stack: Stack,
  _context: CheckContext,
  schema: XSchema,
  value: unknown,
): boolean {
  if (!(IsSchemaObject(schema) && Array.isArray(schema["~refine"]))) {
    return true;
  }
  return schema["~refine"].every(
    (entry) => IsObject(entry) && typeof entry.refine === "function" && entry.refine(value),
  );
}

export function ErrorRefine(
  stack: Stack,
  context: ErrorContext,
  schemaPath: string,
  instancePath: string,
  schema: XSchema,
  value: unknown,
): boolean {
  if (CheckRefine(stack, context, schema, value)) {
    return true;
  }
  return context.addError({ keyword: "~refine", schemaPath, instancePath, params: { value } });
}
