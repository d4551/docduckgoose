# Use Script, Module, and Custom Registries

Baobox keeps the TypeBox-style builder APIs, but it also supports a TypeScript-like DSL, named definition modules, and runtime registries for project-specific validation.

## Script DSL

Use `Script()` when the schema is easier to read as a compact type expression.

```ts
import { Script } from '@baohaus/baobox/script'
import { Check } from '@baohaus/baobox/value'

const Users = Script('Array<{ name: string; age?: number }>')

Check(Users, [{ name: 'Ada' }, { name: 'Grace', age: 37 }])
// true
```

For reusable named definitions, use `ScriptWithDefinitions()`.

```ts
import { ScriptWithDefinitions } from '@baohaus/baobox/script'
import { Object } from '@baohaus/baobox/type/containers'
import { String } from '@baohaus/baobox/type/primitives'
import { Check } from '@baohaus/baobox/value'

const User = Object({ name: String() }, { required: ['name'] })
const Users = ScriptWithDefinitions('Array<User>', { User })

Check(Users, [{ name: 'Ada' }])
// true
```

## Module and Import

Use `Module()` when you want a small schema registry with named definitions, then resolve a concrete definition with `Import()`.

```ts
import { Import } from '@baohaus/baobox/type/actions'
import { Module } from '@baohaus/baobox/type/combinator-functions'
import { Object } from '@baohaus/baobox/type/containers'
import { String } from '@baohaus/baobox/type/primitives'
import { Check } from '@baohaus/baobox/value'

const Models = Module({
  User: Object({
    id: String(),
    name: String(),
  }, { required: ['id', 'name'] }),
})

const User = Import(Models, 'User')

Check(User, { id: 'usr_1', name: 'Ada' })
// true
```

`module.import(name)` returns a `Ref` schema. `Import(module, name)` returns the concrete definition directly.

## formatRegistry

Use the format registry for new string formats.

```ts
import { String } from '@baohaus/baobox/type/primitives'
import { Check } from '@baohaus/baobox/value'
import { formatRegistry } from '@baohaus/baobox/shared/registries'

formatRegistry.set('doc-slug', (value) => /^[a-z0-9-]+$/.test(value))

const Slug = String({ format: 'doc-slug' })

Check(Slug, 'docs-ready')
// true
```

## typeRegistry

Use the type registry for custom `~kind` validators.

```ts
import { type TSchema } from '@baohaus/baobox/type/base-types'
import { Check } from '@baohaus/baobox/value'
import { typeRegistry } from '@baohaus/baobox/shared/registries'

typeRegistry.set('PositiveNumber', (_schema, value) =>
  typeof value === 'number' && value > 0
)

const PositiveNumber: TSchema = { '~kind': 'PositiveNumber' }

Check(PositiveNumber, 3)
// true
```

Registry notes:

- Keep custom names stable. They become part of your schema contract.
- Clean up temporary test-only registrations with `Delete()`.
- `typeRegistry` affects runtime validation. It does not add JSON Schema emission automatically.

## Codec

Use `Codec()` when you want typed decode and encode transforms without writing callback casts.

```ts
import { Codec } from '@baohaus/baobox/type/extensions'
import { String } from '@baohaus/baobox/type/primitives'
import { Decode, Encode } from '@baohaus/baobox/value'

const Trimmed = Codec(String())
  .decode((value) => value.trim())
  .encode((value) => value.toUpperCase())

Decode(Trimmed, '  ada  ')
// "ada"

Encode(Trimmed, 'ada')
// "ADA"
```
