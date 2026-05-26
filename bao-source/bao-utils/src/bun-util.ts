/**
 * Centralized utility parser exports.
 *
 * @packageDocumentation
 */

import { parseStrictBoolean } from "@baohaus/bao-config/env-boolean";

/** CLI option definition for a single flag. */
export type BunCliOption = {
  /** Option value type. */
  type: "string" | "boolean";
  /** Optional default value used when flag is absent. */
  default?: string | boolean;
  /** Optional short option alias. */
  short?: string;
};

/** CLI schema keyed by long option name. */
export type BunCliOptionSchema = Record<string, BunCliOption>;

/** Result payload returned by argument parsing. */
export type ParseArgsResult<TSchema extends BunCliOptionSchema> = {
  /** Parsed option values. */
  values: {
    [K in keyof TSchema]: TSchema[K]["type"] extends "boolean" ? boolean : string | undefined;
  };
  /** Positionals preserved when allowPositionals is true. */
  positionals: string[];
};

type BunCliParseInput<TSchema extends BunCliOptionSchema> = {
  /** Raw args from `process.argv` or `Bun.argv`. */
  args: readonly string[];
  /** Option schema. */
  options: TSchema;
  /** Preserve non-option args. */
  allowPositionals?: boolean;
};

function resolveBoolean(value: string | undefined, fallback: boolean): boolean {
  return parseStrictBoolean(value, fallback);
}

function isOptionToken(value: string): boolean {
  return value.startsWith("-");
}

function normalizeLongOption(raw: string): string {
  if (!raw.startsWith("--")) {
    return raw;
  }
  return raw.slice(2);
}

function normalizeShortOption(raw: string): string {
  if (!raw.startsWith("-") || raw.startsWith("--")) {
    return raw;
  }
  return raw.slice(1);
}

function buildLookupMaps<TSchema extends BunCliOptionSchema>(
  options: TSchema,
): {
  byLong: Map<string, keyof TSchema>;
  byShort: Map<string, keyof TSchema>;
} {
  const byLong = new Map<string, keyof TSchema>();
  const byShort = new Map<string, keyof TSchema>();

  for (const [key, spec] of Object.entries(options) as [keyof TSchema, BunCliOption][]) {
    byLong.set(String(key), key);
    if (spec.short) {
      byShort.set(spec.short, key);
    }
  }

  return { byLong, byShort };
}

function readOptionValue(
  args: readonly string[],
  index: number,
  hasInlineValue: boolean,
): { nextIndex: number; value: string | undefined } {
  if (hasInlineValue) {
    return { nextIndex: index, value: undefined };
  }
  const next = args[index + 1];
  if (next === undefined) {
    return { nextIndex: index, value: undefined };
  }
  if (!next || isOptionToken(next)) {
    return { nextIndex: index, value: undefined };
  }
  return { nextIndex: index + 1, value: next };
}

/** Mutable parse state threaded through token handlers. */
interface ParseState<TSchema extends BunCliOptionSchema> {
  values: ParseArgsResult<TSchema>["values"];
  positionals: string[];
  index: number;
}

/**
 * Resolve the option key from a lookup map, pushing positional if unrecognized.
 *
 * @param raw - Raw token.
 * @param lookup - Map from normalized name to option key.
 * @param options - Option schema.
 * @param allowPositionals - Whether to collect unrecognized tokens.
 * @param positionals - Mutable positionals array.
 * @returns Option key and spec, or null if unrecognized.
 */
function resolveOption<TSchema extends BunCliOptionSchema>(
  raw: string,
  lookup: Map<string, keyof TSchema>,
  options: TSchema,
  allowPositionals: boolean,
  positionals: string[],
): { key: keyof TSchema; spec: BunCliOption } | null {
  const option = lookup.get(
    raw.startsWith("--")
      ? normalizeLongOption(raw.split("=", 2)[0] ?? "")
      : normalizeShortOption(raw),
  );
  if (!option) {
    if (allowPositionals) {
      positionals.push(raw);
    }
    return null;
  }
  const spec = options[option];
  if (!spec) {
    if (allowPositionals) {
      positionals.push(raw);
    }
    return null;
  }
  return { key: option, spec };
}

/**
 * Handle a long option token (--flag or --flag=value).
 *
 * @param raw - Raw token.
 * @param args - Full args array.
 * @param state - Mutable parse state.
 * @param options - Option schema.
 * @param byLong - Long option lookup.
 * @param allowPositionals - Whether to collect unrecognized tokens.
 */
function handleLongOption<TSchema extends BunCliOptionSchema>(
  raw: string,
  args: readonly string[],
  state: ParseState<TSchema>,
  options: TSchema,
  byLong: Map<string, keyof TSchema>,
  allowPositionals: boolean,
): void {
  const [, inlineValue] = raw.split("=", 2);
  const resolved = resolveOption(raw, byLong, options, allowPositionals, state.positionals);
  if (!resolved) {
    return;
  }

  const { key, spec } = resolved;
  if (spec.type === "boolean") {
    state.values[key] = (
      typeof inlineValue === "string" ? resolveBoolean(inlineValue, false) : true
    ) as ParseArgsResult<TSchema>["values"][typeof key];
    return;
  }

  const hasInlineValue = inlineValue !== undefined;
  const result = readOptionValue(args, state.index, hasInlineValue);
  state.values[key] = (
    hasInlineValue ? inlineValue : result.value
  ) as ParseArgsResult<TSchema>["values"][typeof key];
  state.index = result.nextIndex;
}

/**
 * Handle a short option token (-f).
 *
 * @param raw - Raw token.
 * @param args - Full args array.
 * @param state - Mutable parse state.
 * @param options - Option schema.
 * @param byShort - Short option lookup.
 * @param allowPositionals - Whether to collect unrecognized tokens.
 */
function handleShortOption<TSchema extends BunCliOptionSchema>(
  raw: string,
  args: readonly string[],
  state: ParseState<TSchema>,
  options: TSchema,
  byShort: Map<string, keyof TSchema>,
  allowPositionals: boolean,
): void {
  const resolved = resolveOption(raw, byShort, options, allowPositionals, state.positionals);
  if (!resolved) {
    return;
  }

  const { key, spec } = resolved;
  if (spec.type === "boolean") {
    state.values[key] = true as ParseArgsResult<TSchema>["values"][typeof key];
    return;
  }

  const result = readOptionValue(args, state.index, false);
  state.values[key] = result.value as ParseArgsResult<TSchema>["values"][typeof key];
  state.index = result.nextIndex;
}

function createInitialValues<TSchema extends BunCliOptionSchema>(
  options: TSchema,
): ParseArgsResult<TSchema>["values"] {
  const values = {} as ParseArgsResult<TSchema>["values"];

  for (const [key, spec] of Object.entries(options) as [keyof TSchema, BunCliOption][]) {
    values[key] = (
      spec.type === "boolean" ? (spec.default ?? false) : spec.default
    ) as ParseArgsResult<TSchema>["values"][typeof key];
  }

  return values;
}

function handleTrailingPositionals<TSchema extends BunCliOptionSchema>(
  args: readonly string[],
  state: ParseState<TSchema>,
  allowPositionals: boolean,
): boolean {
  if (allowPositionals) {
    state.positionals.push(...args.slice(state.index + 1));
  }
  return false;
}

function handleToken<TSchema extends BunCliOptionSchema>(
  raw: string,
  args: readonly string[],
  state: ParseState<TSchema>,
  options: TSchema,
  byLong: Map<string, keyof TSchema>,
  byShort: Map<string, keyof TSchema>,
  allowPositionals: boolean,
): boolean {
  if (raw === "--") {
    return handleTrailingPositionals(args, state, allowPositionals);
  }

  if (raw.startsWith("--")) {
    handleLongOption(raw, args, state, options, byLong, allowPositionals);
    return true;
  }

  if (raw.startsWith("-") && raw.length > 1) {
    handleShortOption(raw, args, state, options, byShort, allowPositionals);
    return true;
  }

  if (allowPositionals) {
    state.positionals.push(raw);
  }

  return true;
}

/**
 * Bun-native CLI parser used as a deterministic replacement for `util.parseArgs`.
 *
 * Supports `--long`, `--long=value`, and short aliases defined in the schema.
 */
export function parseArgs<TSchema extends BunCliOptionSchema>(
  input: BunCliParseInput<TSchema>,
): ParseArgsResult<TSchema> {
  const { options, args, allowPositionals = false } = input;
  const { byLong, byShort } = buildLookupMaps(options);
  const state: ParseState<TSchema> = {
    values: createInitialValues(options),
    positionals: [],
    index: 0,
  };

  for (state.index = 0; state.index < args.length; state.index += 1) {
    const raw = args[state.index];
    if (raw === undefined) {
      break;
    }

    if (!handleToken(raw, args, state, options, byLong, byShort, allowPositionals)) {
      break;
    }
  }

  return { values: state.values, positionals: state.positionals };
}
