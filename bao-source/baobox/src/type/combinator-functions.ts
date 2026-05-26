import type { TSchema } from "./base-types.js";
import type { TRef } from "./composite-types.js";
import type {
  TAwaited,
  TConstructor,
  TConstructorParameters,
  TFunction,
  TInstanceType,
  TModule,
  TParameters,
  TPromise,
  TReturnType,
} from "./higher-order-types.js";
import { withSchemaFields } from "./root-shared.js";

/** Unwrap a Promise schema to its resolved type */
export function Awaited<T extends TPromise>(promise: T): TAwaited<T> {
  return withSchemaFields({ "~kind": "Awaited", promise }) as TAwaited<T>;
}

/** Extract the return type of a Function schema */
export function ReturnType<T extends TFunction>(fn: T): TReturnType<T> {
  return withSchemaFields({ "~kind": "ReturnType", function: fn }) as TReturnType<T>;
}

/** Extract the parameters of a Function schema as a tuple */
export function Parameters<T extends TFunction>(fn: T): TParameters<T> {
  return withSchemaFields({ "~kind": "Parameters", function: fn }) as TParameters<T>;
}

/** Extract the instance type of a Constructor schema */
export function InstanceType<T extends TConstructor>(ctor: T): TInstanceType<T> {
  return withSchemaFields({ "~kind": "InstanceType", constructor: ctor }) as TInstanceType<T>;
}

/** Extract the constructor parameters as a tuple */
export function ConstructorParameters<T extends TConstructor>(ctor: T): TConstructorParameters<T> {
  return withSchemaFields({
    "~kind": "ConstructorParameters",
    constructor: ctor,
  }) as TConstructorParameters<T>;
}

/** Create a schema module (named definitions registry) */
export function Module(
  definitions: Record<string, TSchema>,
): TModule & { import: (name: string) => TRef } {
  const mod = withSchemaFields({ "~kind": "Module", definitions }) as TModule;
  return {
    ...mod,
    import(name: string): TRef {
      return withSchemaFields({ "~kind": "Ref", name }) as TRef;
    },
  };
}
