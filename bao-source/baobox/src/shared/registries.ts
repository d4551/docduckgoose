import type { SchemaIssue } from "../error/messages.js";
import type { TSchema } from "../type/base-types.js";
import { getDefaultRuntimeContext } from "./runtime-context.js";

/** Full hooks object for custom type registration */
export interface TypeValidatorHooks {
  check: (schema: TSchema, value: unknown) => boolean;
  errors?: (schema: TSchema, value: unknown, path: readonly string[]) => SchemaIssue[];
  assert?: (schema: TSchema, value: unknown) => asserts value;
}

export type TypeValidatorEntry =
  | TypeValidatorHooks
  | ((schema: TSchema, value: unknown) => boolean);

/** @internal Configurable type system policy flags */
export interface TypeSystemPolicyOptions {
  AllowNaN: boolean;
  AllowArrayObject: boolean;
  AllowNullVoid: boolean;
}

/** @internal Global settings */
export interface SettingsOptions {
  correctiveParse: boolean;
}

/** Format registry for registering custom string format validators */
export const formatRegistry: {
  clear(): void;
  delete(name: string): boolean;
  entries(): [string, (value: string) => boolean][];
  get(name: string): ((value: string) => boolean) | undefined;
  has(name: string): boolean;
  set(name: string, validator: (value: string) => boolean): void;
} = {
  clear(): void {
    getDefaultRuntimeContext().formatRegistry.clear();
  },
  delete(name: string): boolean {
    return getDefaultRuntimeContext().formatRegistry.delete(name);
  },
  entries(): [string, (value: string) => boolean][] {
    return getDefaultRuntimeContext().formatRegistry.entries();
  },
  get(name: string): ((value: string) => boolean) | undefined {
    return getDefaultRuntimeContext().formatRegistry.get(name);
  },
  has(name: string): boolean {
    return getDefaultRuntimeContext().formatRegistry.has(name);
  },
  set(name: string, validator: (value: string) => boolean): void {
    getDefaultRuntimeContext().formatRegistry.set(name, validator);
  },
};

/** Type registry for registering custom kind validators */
export const typeRegistry: {
  clear(): void;
  delete(kind: string): boolean;
  entries(): [string, TypeValidatorEntry][];
  get(kind: string): TypeValidatorEntry | undefined;
  has(kind: string): boolean;
  set(kind: string, validator: TypeValidatorEntry): void;
} = {
  clear(): void {
    getDefaultRuntimeContext().typeRegistry.clear();
  },
  delete(kind: string): boolean {
    return getDefaultRuntimeContext().typeRegistry.delete(kind);
  },
  entries(): [string, TypeValidatorEntry][] {
    return getDefaultRuntimeContext().typeRegistry.entries();
  },
  get(kind: string): TypeValidatorEntry | undefined {
    return getDefaultRuntimeContext().typeRegistry.get(kind);
  },
  has(kind: string): boolean {
    return getDefaultRuntimeContext().typeRegistry.has(kind);
  },
  set(kind: string, validator: TypeValidatorEntry): void {
    getDefaultRuntimeContext().typeRegistry.set(kind, validator);
  },
};

/** Configurable type system policy */
export const typeSystemPolicy: {
  get(): Readonly<TypeSystemPolicyOptions>;
  reset(): void;
  set(options: Partial<TypeSystemPolicyOptions>): void;
} = {
  get(): Readonly<TypeSystemPolicyOptions> {
    return getDefaultRuntimeContext().typeSystemPolicy.get();
  },
  reset(): void {
    getDefaultRuntimeContext().typeSystemPolicy.reset();
  },
  set(options: Partial<TypeSystemPolicyOptions>): void {
    getDefaultRuntimeContext().typeSystemPolicy.set(options);
  },
};

/** Global settings registry */
export const settings: {
  get(): Readonly<SettingsOptions>;
  reset(): void;
  set(options: Partial<SettingsOptions>): void;
} = {
  get(): Readonly<SettingsOptions> {
    return getDefaultRuntimeContext().settings.get();
  },
  reset(): void {
    getDefaultRuntimeContext().settings.reset();
  },
  set(options: Partial<SettingsOptions>): void {
    getDefaultRuntimeContext().settings.set(options);
  },
};
