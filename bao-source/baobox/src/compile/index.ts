import type { ParseResult, SchemaError } from "../error/errors.js";
import { Errors, Explain } from "../error/errors.js";
import type { SchemaIssueDiagnostic } from "../error/messages.js";
import type { ExternalTypeBoxSchema } from "../interop/typebox.js";
import { isIngestedTypeBoxSchema } from "../interop/typebox.js";
import { validateFormat } from "../shared/format-validators.js";
import { RuntimeContext, resolveRuntimeContext } from "../shared/runtime-context.js";
import type { TSchema } from "../type/base-types.js";
import type { Static, StaticDecode, StaticEncode, StaticParse } from "../type/static-types.js";
import { Cast } from "../value/cast.js";
import { Check, CheckInternal } from "../value/check.js";
import { Clean } from "../value/clean.js";
import { Convert } from "../value/convert.js";
import { Create } from "../value/create.js";
import { Decode as ValueDecode } from "../value/decode.js";
import { Default } from "../value/default.js";
import { Encode as ValueEncode } from "../value/encode.js";
import { Hash } from "../value/hash.js";
import { Parse, TryParse } from "../value/parse.js";
import { Repair } from "../value/repair.js";
import { TryCast, TryCreate, TryDecode, TryEncode, TryRepair } from "../value/result.js";
import { compileBunFastPath } from "./bun-fast-path.js";
import { emitPrimitiveSchemaCheck, emitStructuredSchemaCheck } from "./emit.js";

export interface ValidatorArtifact {
  body: string;
  code: string;
  hash: string;
}

export interface CompileOptions {
  artifact?: ValidatorArtifact;
  cache?: boolean;
  context?: RuntimeContext;
}

type RuntimeCheck = (value: unknown) => boolean;
type CompilableSchema = TSchema | ExternalTypeBoxSchema;
type RuntimeSchema<T extends CompilableSchema> = T & TSchema;
const ARTIFACT_RUNTIME_CHECK_STRATEGY = "artifact-runtime-check";

interface CompileResult {
  accelerated: boolean;
  body: string;
  code: string;
  fn: RuntimeCheck;
  strategy: string;
}

const validatorCaches = new WeakMap<RuntimeContext, Map<string, Validator<CompilableSchema>>>();

function getValidatorCache(context: RuntimeContext): Map<string, Validator<CompilableSchema>> {
  const existing = validatorCaches.get(context);
  if (existing !== undefined) {
    return existing;
  }
  const created = new Map<string, Validator<TSchema>>();
  validatorCaches.set(context, created);
  return created;
}

function createPortableArtifact(
  schema: TSchema,
): Omit<CompileResult, "fn" | "strategy" | "accelerated"> {
  let varCounter = 0;

  function nextVar(): string {
    return `v${varCounter++}`;
  }

  function emit(currentSchema: TSchema, valueExpr: string): string {
    return (
      emitPrimitiveSchemaCheck(currentSchema, valueExpr) ??
      emitStructuredSchemaCheck(currentSchema, valueExpr, emit, nextVar) ??
      `__check(${valueExpr})`
    );
  }

  const body = `return ${emit(schema, "value")};`;
  return {
    body,
    code: `(function(value, __check, __validateFormat, __policy) { ${body} })`,
  };
}

function compileRuntimeCheck(
  schema: TSchema,
  context: RuntimeContext,
  body: string,
  code: string,
  strategy: string,
): CompileResult {
  const runtimeCheck = (value: unknown): boolean => Check(schema, value, context);
  return {
    accelerated: false,
    body,
    code,
    fn: runtimeCheck,
    strategy,
  };
}

const JIT_STRATEGY = "jit-compiled";
const JIT_FALLBACK_STRATEGY = "jit-fallback";

function bindCheck(context: RuntimeContext): (schema: TSchema, value: unknown) => boolean {
  return (schema: TSchema, value: unknown): boolean =>
    CheckInternal(schema, value, new Map(), context);
}

function bindValidateFormat(context: RuntimeContext): (value: string, format: string) => boolean {
  return (value: string, format: string): boolean => validateFormat(value, format, context);
}

function tryJitCompile(body: string, context: RuntimeContext): RuntimeCheck | null {
  const policy = context.typeSystemPolicy.get();
  const checkFn = bindCheck(context);
  const validateFormatFn = bindValidateFormat(context);
  const jitFn = Function("value", "__check", "__validateFormat", "__policy", body);
  return (value: unknown): boolean => Boolean(jitFn(value, checkFn, validateFormatFn, policy));
}

function compileSchema(schema: TSchema, context: RuntimeContext): CompileResult {
  const artifact = createPortableArtifact(schema);

  const jitCheck = tryJitCompile(artifact.body, context);
  if (jitCheck !== null) {
    return {
      accelerated: true,
      body: artifact.body,
      code: artifact.code,
      fn: jitCheck,
      strategy: JIT_STRATEGY,
    };
  }

  return compileRuntimeCheck(schema, context, artifact.body, artifact.code, JIT_FALLBACK_STRATEGY);
}

function schemaHash(schema: TSchema): string {
  const hexRadix = 16;
  return Hash(schema).toString(hexRadix);
}

interface ResolvedCompileOptions {
  artifact: ValidatorArtifact | undefined;
  cache: boolean;
  context: RuntimeContext;
}

function resolveCompileOptions(options?: CompileOptions | RuntimeContext): ResolvedCompileOptions {
  if (options instanceof RuntimeContext) {
    return {
      artifact: undefined,
      cache: true,
      context: resolveRuntimeContext(options),
    };
  }
  return {
    artifact: options?.artifact,
    cache: options?.cache ?? true,
    context: resolveRuntimeContext(options?.context),
  };
}

function isRuntimeSchema<T extends CompilableSchema>(schema: T): schema is RuntimeSchema<T> {
  return (
    typeof schema === "object" &&
    schema !== null &&
    ("~kind" in schema || isIngestedTypeBoxSchema(schema))
  );
}

export class Validator<T extends CompilableSchema> {
  constructor(
    private readonly schemaValue: RuntimeSchema<T>,
    private readonly runtimeContext: RuntimeContext,
    private readonly hash: string,
    private readonly artifact: ValidatorArtifact,
    private readonly result: CompileResult,
  ) {}

  get type(): RuntimeSchema<T> {
    return this.schemaValue;
  }

  get context(): RuntimeContext {
    return this.runtimeContext;
  }

  get code(): string {
    return this.result.code;
  }

  get isAccelerated(): boolean {
    return this.result.accelerated;
  }

  get hasCodec(): boolean {
    return false;
  }

  getArtifact(): ValidatorArtifact {
    return this.artifact;
  }

  getSchema(): T {
    return this.schemaValue;
  }

  check(value: unknown): value is Static<T> {
    return this.result.fn(value);
  }

  clean(value: unknown): StaticParse<T> {
    return Clean(this.schemaValue, value);
  }

  getCode(): string {
    return this.result.code;
  }

  getContext(): RuntimeContext {
    return this.runtimeContext;
  }

  convert(value: unknown): StaticParse<T> {
    return Convert(this.schemaValue, value);
  }

  create(): Static<T> {
    return Create(this.schemaValue);
  }

  cast(value: unknown): Static<T> {
    return Cast(this.schemaValue, value);
  }

  decode(value: unknown): StaticDecode<T> {
    return ValueDecode(this.schemaValue, value);
  }

  applyDefault(value: unknown): StaticParse<T> {
    return Default(this.schemaValue, value);
  }

  encode(value: unknown): StaticEncode<T> {
    return ValueEncode(this.schemaValue, value);
  }

  errors(value: unknown): SchemaError[] {
    return Errors(this.schemaValue, value, this.runtimeContext);
  }

  explain(value: unknown): SchemaIssueDiagnostic[] {
    return Explain(this.schemaValue, value, this.runtimeContext);
  }

  getHash(): string {
    return this.hash;
  }

  parse(value: unknown): StaticParse<T> {
    return Parse(this.schemaValue, value, this.runtimeContext);
  }

  repair(value: unknown): StaticParse<T> {
    return Repair(this.schemaValue, value, this.runtimeContext);
  }

  getStrategy(): string {
    return this.result.strategy;
  }

  tryCreate(): ParseResult<Static<T>> {
    return TryCreate(this.schemaValue, this.runtimeContext);
  }

  tryDecode(value: unknown): ParseResult<StaticDecode<T>> {
    return TryDecode(this.schemaValue, value, this.runtimeContext);
  }

  tryEncode(value: unknown): ParseResult<StaticEncode<T>> {
    return TryEncode(this.schemaValue, value, this.runtimeContext);
  }

  tryParse(value: unknown): ParseResult<StaticParse<T>> {
    return TryParse(this.schemaValue, value, this.runtimeContext);
  }

  tryRepair(value: unknown): ParseResult<StaticParse<T>> {
    return TryRepair(this.schemaValue, value, this.runtimeContext);
  }

  tryCast(value: unknown): ParseResult<Static<T>> {
    return TryCast(this.schemaValue, value);
  }

  TryCast(value: unknown): ParseResult<Static<T>> {
    return this.tryCast(value);
  }

  Check(value: unknown): value is Static<T> {
    return this.check(value);
  }

  Clean(value: unknown): StaticParse<T> {
    return this.clean(value);
  }

  Clone(): Validator<T> {
    return new Validator(
      this.schemaValue,
      this.runtimeContext,
      this.hash,
      this.artifact,
      this.result,
    );
  }

  Code(): string {
    return this.code;
  }

  Context(): RuntimeContext {
    return this.runtimeContext;
  }

  Convert(value: unknown): StaticParse<T> {
    return this.convert(value);
  }

  Create(): Static<T> {
    return this.create();
  }

  Decode(value: unknown): StaticDecode<T> {
    return this.decode(value);
  }

  TryDecode(value: unknown): ParseResult<StaticDecode<T>> {
    return this.tryDecode(value);
  }

  Default(value: unknown): StaticParse<T> {
    return this.applyDefault(value);
  }

  Encode(value: unknown): StaticEncode<T> {
    return this.encode(value);
  }

  TryEncode(value: unknown): ParseResult<StaticEncode<T>> {
    return this.tryEncode(value);
  }

  Errors(value: unknown): SchemaError[] {
    return this.errors(value);
  }

  IsAccelerated(): boolean {
    return this.isAccelerated;
  }

  Parse(value: unknown): StaticParse<T> {
    return this.parse(value);
  }

  TryCreate(): ParseResult<Static<T>> {
    return this.tryCreate();
  }

  TryParse(value: unknown): ParseResult<StaticParse<T>> {
    return this.tryParse(value);
  }

  Type(): RuntimeSchema<T> {
    return this.schemaValue;
  }

  TryRepair(value: unknown): ParseResult<StaticParse<T>> {
    return this.tryRepair(value);
  }
}

function isValidatorForSchema<T extends CompilableSchema>(
  validator: Validator<CompilableSchema>,
  schema: RuntimeSchema<T>,
): validator is Validator<T> {
  return validator.getSchema() === schema;
}

export function Compile<T extends CompilableSchema>(schema: T): Validator<T>;
export function Compile<T extends CompilableSchema>(
  schema: T,
  options: CompileOptions | RuntimeContext,
): Validator<T>;
export function Compile<T extends CompilableSchema>(
  schema: T,
  options?: CompileOptions | RuntimeContext,
): Validator<T> {
  if (!isRuntimeSchema(schema)) {
    throw new Error("Compile expected a baobox or TypeBox schema");
  }
  const resolved = resolveCompileOptions(options);
  const hash = schemaHash(schema);
  const artifact = resolved.artifact;
  const cacheKey = [resolved.context.cacheKey("compile"), hash, artifact?.hash ?? "live"].join(":");

  if (resolved.cache) {
    const cache = getValidatorCache(resolved.context);
    const cached = cache.get(cacheKey);
    if (cached !== undefined && isValidatorForSchema(cached, schema)) {
      return cached;
    }
  }

  const portable = createPortableArtifact(schema);
  const artifactValue: ValidatorArtifact = {
    ...portable,
    hash,
  };
  const fastPath = compileBunFastPath(schema, resolved.context);
  const compileResult =
    artifact !== undefined && artifact.hash === hash
      ? compileRuntimeCheck(
          schema,
          resolved.context,
          artifact.body,
          artifact.code,
          ARTIFACT_RUNTIME_CHECK_STRATEGY,
        )
      : fastPath === null
        ? compileSchema(schema, resolved.context)
        : { ...fastPath, body: portable.body };
  const validator = new Validator(schema, resolved.context, hash, artifactValue, compileResult);

  if (resolved.cache) {
    getValidatorCache(resolved.context).set(cacheKey, validator);
  }

  return validator;
}

export function Code<T extends CompilableSchema>(
  schema: T,
  options?: CompileOptions | RuntimeContext,
): string {
  return options === undefined ? Compile(schema).getCode() : Compile(schema, options).getCode();
}

export function CompileCached<T extends CompilableSchema>(
  schema: T,
  context?: RuntimeContext,
): Validator<T> {
  return Compile(schema, context === undefined ? { cache: true } : { cache: true, context });
}

export function CompileFromArtifact<T extends CompilableSchema>(
  schema: T,
  artifact: ValidatorArtifact,
  context?: RuntimeContext,
): Validator<T> {
  return Compile(
    schema,
    context === undefined ? { artifact, cache: false } : { artifact, cache: false, context },
  );
}

export default Compile;
