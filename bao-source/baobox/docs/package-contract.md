# Package Contract and Supported Imports

This document describes the supported public import surface for `@baohaus/baobox`.

## Resolution Behavior

`@baohaus/baobox` publishes export-condition entries in `package.json`.

| Consumer | Resolution target |
| --- | --- |
| Bun | built `dist/*.js` entrypoints through the `bun` condition |
| Standard ESM | built `dist/*.js` entrypoints through the `import` condition |
| TypeScript | generated `dist/*.d.ts` declarations through the `types` condition |

That means every published runtime condition resolves to generated distribution files. The TypeScript sources are the repository source of truth; `dist` is the package artifact surface.

The build writes JavaScript to the exported subpath directories, so the emitted files and the export map stay in sync.

Consumers do not need a `typescript` peer dependency from `@baohaus/baobox`. The package ships its own declaration files, and install resolution should not force a specific TypeScript version on downstream projects.

## Supported Public Entrypoints

These are the supported package imports:

- `@baohaus/baobox`
- `@baohaus/baobox/type/primitives`
- `@baohaus/baobox/type/containers`
- `@baohaus/baobox/type/combinator-core`
- `@baohaus/baobox/type/extensions`
- `@baohaus/baobox/type/static-types`
- `@baohaus/baobox/value`
- `@baohaus/baobox/error/errors`
- `@baohaus/baobox/compile`
- `@baohaus/baobox/format/format`
- `@baohaus/baobox/guard/guard`
- `@baohaus/baobox/system/system`
- `@baohaus/baobox/script`
- `@baohaus/baobox/locale`
- `@baohaus/baobox/standard`
- `@baohaus/baobox/elysia`
- `@baohaus/baobox/interop/typebox`

## What Each Entrypoint Is For

| Entrypoint | Purpose |
| --- | --- |
| `@baohaus/baobox` | Root replacement surface: default `Type`, named builders, `Value`, `Compile`, and static types |
| `@baohaus/baobox/type/primitives` | Primitive builders such as `String`, `Number`, `Integer`, `Boolean`, `Literal`, and `Unknown` |
| `@baohaus/baobox/type/containers` | Container builders such as `Object`, `Array`, `Record`, and `Tuple` |
| `@baohaus/baobox/type/combinator-core` | Core combinators such as `Optional`, `Union`, `Intersect`, and `Enum` |
| `@baohaus/baobox/type/extensions` | Extension builders such as `Codec`, `Immutable`, and `Refine` |
| `@baohaus/baobox/type/static-types` | Static inference exports such as `Static`, `StaticDecode`, and `StaticEncode` |
| `@baohaus/baobox/value` | Runtime value operations such as `Check`, `Parse`, `Errors`, `ErrorsIterator`, `Repair`, `Diff`, and `Patch` |
| `@baohaus/baobox/error/errors` | Structured validation error surface |
| `@baohaus/baobox/compile` | `Compile`, `Code`, and `Validator` |
| `@baohaus/baobox/format/format` | Format registry and format helpers |
| `@baohaus/baobox/guard/guard` | Guard namespaces aligned with the TypeBox-style guard surface |
| `@baohaus/baobox/system/system` | Runtime settings, locale, hashing, memory, and environment helpers |
| `@baohaus/baobox/script` | Script DSL helpers |
| `@baohaus/baobox/locale` | Official per-locale catalog bundles for the declared locale registry |
| `@baohaus/baobox/standard` | Standard Schema V1 integration helpers for typed and raw-schema interop |
| `@baohaus/baobox/elysia` | Elysia integration with `[Kind]` symbol decoration, `t` namespace, `decorateSchema()` |
| `@baohaus/baobox/interop/typebox` | TypeBox schema ingestion types and guards |

## Supported vs Internal Imports

Supported:

```ts
import { Object } from '@baohaus/baobox/type/containers'
import { String } from '@baohaus/baobox/type/primitives'
import { Errors } from '@baohaus/baobox/value'
import { System } from '@baohaus/baobox/system/system'
```

Internal to this repository:

```ts
import { Errors } from '../src/value/index.ts'
```

Direct `src/*` imports appear in this repository's tests because they validate the source tree before publishing. They are not part of the public package contract for consumers.

## Leaf Import Expectations

The package exposes explicit subpaths:

```ts
import { Object } from '@baohaus/baobox/type/containers'
import { String } from '@baohaus/baobox/type/primitives'
```

Namespace imports are convenient for builder-heavy code. Named imports from explicit leaf subpaths keep the public surface auditable.

## `@baohaus/baobox/schema/*` Is Intentionally Split

The `@baohaus/baobox/schema/*` leaf entrypoints contain two related but distinct capabilities:

- A raw `typebox/schema`-style runtime surface for checking, parsing, compiling, pointer access, and resolving raw schema objects.
- The baobox schema emitter helpers that project baobox schemas to JSON-Schema-like output.

That split is intentional. The raw schema runtime and the baobox emitter solve different problems, but they live behind the same subpath.
