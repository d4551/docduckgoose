import type { ParseResult, SchemaError } from "../error/errors.js";
import { Build } from "./build.js";
import { Errors } from "./errors.js";
import { Parse, TryParse } from "./parse.js";
import type { SchemaContext, XSchema, XStatic } from "./shared.js";

export class Validator<Schema extends XSchema = XSchema> {
  private readonly build;
  private readonly result;

  constructor(
    private readonly schemaContext: SchemaContext,
    private readonly schemaValue: Schema,
  ) {
    this.build = Build(schemaContext, schemaValue);
    this.result = this.build.evaluate();
  }

  get type(): Schema {
    return this.schemaValue;
  }

  get context(): SchemaContext {
    return this.schemaContext;
  }

  get code(): string {
    return this.result.Code;
  }

  get isAccelerated(): boolean {
    return this.result.IsAccelerated;
  }

  getSchema(): Schema {
    return this.schemaValue;
  }

  check(value: unknown): value is XStatic<Schema> {
    return this.result.Check(value);
  }

  parse(value: unknown): XStatic<Schema> {
    return Parse(this.schemaContext, this.schemaValue, value);
  }

  tryParse(value: unknown): ParseResult<XStatic<Schema>> {
    return TryParse(this.schemaContext, this.schemaValue, value);
  }

  errors(value: unknown): [boolean, SchemaError[]] {
    return Errors(this.schemaContext, this.schemaValue, value);
  }

  Check(value: unknown): value is XStatic<Schema> {
    return this.check(value);
  }

  Clean(value: unknown): XStatic<Schema> {
    return this.parse(value);
  }

  Code(): string {
    return this.code;
  }

  Context(): SchemaContext {
    return this.schemaContext;
  }

  Errors(value: unknown): [boolean, SchemaError[]] {
    return this.errors(value);
  }

  IsAccelerated(): boolean {
    return this.isAccelerated;
  }

  Parse(value: unknown): XStatic<Schema> {
    return this.parse(value);
  }

  Type(): Schema {
    return this.schemaValue;
  }
}

export function Compile<const Schema extends XSchema>(schema: Schema): Validator<Schema>;
export function Compile<const Schema extends XSchema>(
  context: SchemaContext,
  schema: Schema,
): Validator<Schema>;
export function Compile(...args: [XSchema] | [SchemaContext, XSchema]): Validator {
  const context = args.length === 1 ? {} : args[0];
  const schema = args.length === 1 ? args[0] : args[1];
  return new Validator(context, schema);
}
