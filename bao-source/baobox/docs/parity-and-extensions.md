# Parity Policy and Baobox-Only Additions

Baobox is the canonical `.bao` schema implementation and ingests current TypeBox schema objects without delegating runtime behavior to upstream `typebox`.

## Parity Rules

Baobox maintains parity with two expectations:

1. Explicit type leaf entrypoints preserve the TypeBox-shaped authoring surface.
2. Explicit builder leaf exports are treated as an upstream-complete superset.
3. The `compile`, `error/errors`, `format/format`, `guard/guard`, `system/system`, and `value` subpaths are tested against installed TypeBox schema objects.

That means TypeBox-shaped schemas should keep working, while baobox can still publish Bun-first additions.

## What "Superset" Means For Builder Leaves

Builder leaf entrypoints must continue to expose the upstream-aligned helpers for their category. Baobox-specific helpers are allowed to remain public as long as they do not break TypeBox-shaped usage.

This is why builder parity is tested as upstream-subset parity instead of exact key equality.

## What Counts as a Baobox Addition

Current baobox-specific improvements include:

- Bun-first package exports through the `bun` condition
- `TryParse()` and `validator.tryParse()` for structured, non-throwing normalization results
- `TryDecode()`, `TryEncode()`, `TryCreate()`, and `TryRepair()` for result-first codec and value workflows
- `Explain()` for localized diagnostics that preserve raw issue metadata
- `Uint8ArrayCodec()` for base64 JSON payloads and runtime byte values
- `DateCodec()`, `URLCodec()`, and `BigIntCodec()` for common interop-heavy values
- Bun-native binary fast paths inside `Compile()` for byte-oriented schemas
- Compile caching plus portable validator artifacts
- Locale-aware validation messages and registries driven from `@baohaus/baobox/system/system`
- Official locale bundles for every declared locale code through `@baohaus/baobox/locale`
- Standard Schema V1 integration through `@baohaus/baobox/standard`

These improvements extend the package, but they do not change the public `SchemaError` shape or the pass/fail semantics of validation.

## Stability Expectations

Baobox keeps the following runtime boundaries stable:

- `SchemaError` stays `{ path, message, code }`
- `Parse(schema, value)` remains the throwing parity path; `TryParse(schema, value)` is the baobox-only extension
- `System.Locale` remains the default-process configuration entry point for localized error messages
- `CreateRuntimeContext()` scopes registries, locale catalogs, and compile caching without changing the default globals
- Published consumers should only rely on package entrypoints, not `src/*`
- TypeBox-ingestion tests remain the guardrail for TypeBox-aligned runtime behavior

## `@baohaus/baobox/schema/*` Is A Maintained Runtime Surface

The `@baohaus/baobox/schema/*` leaf entrypoints intentionally combine:

- a raw `typebox/schema`-style runtime surface, and
- baobox's schema emitter helpers

That makes it broader than upstream's split while keeping a single maintained runtime surface.
