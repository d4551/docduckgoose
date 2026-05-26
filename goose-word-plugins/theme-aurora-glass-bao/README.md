<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/theme-aurora-glass-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's glass walls. It paints frosted-glass surfaces with soft aurora tints so everything looks like it's floating in light.

## Architecture

```mermaid
flowchart LR
  reg["Theme registration"] --> theme["theme-aurora-glass-bao"]
  theme --> css["Glass CSS"]
  theme --> tokens["Aurora tokens"]
  css --> ui["Styled UI"]
  tokens --> ui
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Exported API: ThemeRegistration | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/theme-aurora-glass-bao

Standalone package in the Baohaus monorepo.

Source at `goose-word-plugins/theme-aurora-glass-bao`.

## Public Pieces

_None declared._

## Proof Commands

Run from `goose-word-plugins/theme-aurora-glass-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `goose-word-plugins/theme-aurora-glass-bao`:

```bash
bun install
bun run typecheck
bun run test
bun run lint
bun run build
bun run bao:build
bun run bao:validate
bun run verify
```

## Reference

### Symbols

- `ThemeRegistration`

## Integration

Source tree: `goose-word-plugins/theme-aurora-glass-bao` — entry `src/index.ts`.
Import only documented subpaths from the package card; do not deep-link into `dist/`.
<!-- END BAOHAUS PACKAGE MANUAL -->
