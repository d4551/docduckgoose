# Work With Official Locale Packs and Registry Scoping

Baobox preloads an official locale bundle for every declared locale code. Those bundles are exported through `@baohaus/baobox/locale` and registered into the default runtime context automatically.

## What `@baohaus/baobox/locale` Exports

`@baohaus/baobox/locale` exports:

- A named `LocalePacks` object keyed by camelCase locale APIs
- Named exports for every declared locale code such as `enUs`, `koKr`, `itIt`, and `zhHant`
- `OfficialLocaleCatalogs` for code that wants the full typed registry map keyed by locale code strings

That means these are equivalent:

```ts
import { LocalePacks, koKr } from '@baohaus/baobox/locale'

LocalePacks.koKr === koKr
// true
```

## Use The Process-Default Registry

The default runtime is already seeded with every declared locale bundle, so switching the active locale is enough for the common path.

```ts
import { String } from '@baohaus/baobox/type/primitives'
import { Errors } from '@baohaus/baobox/value'
import { System } from '@baohaus/baobox/system/system'

System.locale.set(System.locale.koKr)

Errors(String(), 42)
// [{ path: '/', code: 'INVALID_TYPE', message: 'string이어야 합니다. 현재 값 유형: number' }]
```

## Seed A Scoped Runtime Explicitly

Import bundles from `@baohaus/baobox/locale` when you want an isolated runtime context with explicit locale registration.

```ts
import { LocalePacks } from '@baohaus/baobox/locale'
import { String } from '@baohaus/baobox/type/primitives'
import { Errors } from '@baohaus/baobox/value'
import { CreateRuntimeContext, LocaleCodes } from '@baohaus/baobox/shared/runtime-context'

const context = CreateRuntimeContext({ localeCatalogs: [] })

context.Locale.Register(LocaleCodes.itIt, LocalePacks.itIt)
context.Locale.Set(LocaleCodes.itIt)

Errors(String(), 42, context)
// [{ path: '/', code: 'INVALID_TYPE', message: 'Expected string, got number' }]
```

## Add A Project-Specific Catalog

You can layer a custom locale on top of a shipped bundle.

```ts
import { LocalePacks } from '@baohaus/baobox/locale'
import { String } from '@baohaus/baobox/type/primitives'
import { Errors } from '@baohaus/baobox/value'
import { CreateRuntimeContext } from '@baohaus/baobox/shared/runtime-context'

const context = CreateRuntimeContext({ localeCatalogs: [] })

context.Locale.Register('en_TEST', {
  ...LocalePacks.enUs,
  INVALID_TYPE: () => 'yarrr-invalid-type',
})
context.Locale.Set('en_TEST')

Errors(String(), 42, context)
// [{ path: '/', code: 'INVALID_TYPE', message: 'yarrr-invalid-type' }]
```

## Translation Coverage

- Every declared locale code has an official bundle, so declared codes do not fall back through the registry lookup path.
- Native translated catalogs currently ship for `de_DE`, `en_US`, the Spanish family (`es_419`, `es_AR`, `es_ES`, `es_MX`), the French family (`fr_CA`, `fr_FR`), `ja_JP`, `ko_KR`, the Portuguese family (`pt_BR`, `pt_PT`), and both Chinese packs (`zh_Hans`, `zh_Hant`).
- Remaining official bundles currently alias the English catalog until native translations are added.
- Unknown locale identifiers still fall back to English unless you register them yourself.
