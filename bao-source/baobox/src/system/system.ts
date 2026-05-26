import { LocaleCodes, type LocaleIdentifier } from "../shared/locale.js";
import { settings } from "../shared/registries.js";
import { CreateRuntimeContext, getDefaultRuntimeContext } from "../shared/runtime-context.js";
import { deleteRecordKey } from "../shared/runtime-guards.js";
import { Clone } from "../value/clone.js";
import { Create } from "../value/create.js";
import { Hash } from "../value/hash.js";
import { Mutate } from "../value/mutate.js";

const USER_ARGUMENT_OFFSET = 2;
const HASH_UINT_WIDTH = 32;

/**
 * Resolve CLI arguments from the active JavaScript runtime.
 */
function runtimeArguments(): readonly string[] {
  return typeof process === "undefined" ? [] : process.argv.slice(USER_ARGUMENT_OFFSET);
}

export const Arguments = {
  match(expected: readonly string[], actual: readonly string[] = runtimeArguments()): boolean {
    return (
      expected.length === actual.length && expected.every((value, index) => value === actual[index])
    );
  },
};

export const Environment = {
  canAccelerate(): boolean {
    return "Bun" in globalThis;
  },
};

export const Hashing = {
  hash: Hash,
  hashCode(value: unknown): number {
    return Number(BigInt.asUintN(HASH_UINT_WIDTH, Hash(value)));
  },
};

export const Locale = {
  ...LocaleCodes,
  entries() {
    return getDefaultRuntimeContext().locale.entries();
  },
  get(): LocaleIdentifier {
    return getDefaultRuntimeContext().locale.get();
  },
  has(locale: LocaleIdentifier): boolean {
    return getDefaultRuntimeContext().locale.has(locale);
  },
  register(
    locale: LocaleIdentifier,
    catalog: import("../error/catalog-types.js").SchemaIssueCatalog,
  ): void {
    getDefaultRuntimeContext().locale.register(locale, catalog);
  },
  reset(): void {
    getDefaultRuntimeContext().locale.reset();
  },
  set(locale: LocaleIdentifier): void {
    getDefaultRuntimeContext().locale.set(locale);
  },
};

export const Memory = {
  assign<TTarget extends object, TSource extends object>(
    target: TTarget,
    source: TSource,
  ): TTarget & TSource {
    return Object.assign(target, source);
  },
  clone: Clone,
  create: Create,
  discard(value: unknown): void {
    if (Array.isArray(value)) {
      value.length = 0;
      return;
    }
    if (typeof value === "object" && value !== null) {
      for (const key of Object.keys(value)) {
        deleteRecordKey(value, key);
      }
    }
  },
  metrics(value: unknown): { bytes: number; keys: number } {
    const serialized = JSON.stringify(value);
    const bytes = new TextEncoder().encode(serialized ?? "").length;
    const keys = typeof value === "object" && value !== null ? Object.keys(value).length : 0;
    return { bytes, keys };
  },
  update(target: unknown, source: unknown): void {
    Mutate(target, source);
  },
};

export { settings };

const System = {
  arguments: Arguments,
  environment: Environment,
  hashing: Hashing,
  locale: Locale,
  memory: Memory,
  runtime: {
    create: CreateRuntimeContext,
    defaultContext: getDefaultRuntimeContext,
  },
  settings,
};

export { System };
