<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/goose-word-brand-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's logo stamp. Brand colors, icons, and identity marks for Goose Word live here so the app always looks like itself.

## Architecture

```mermaid
flowchart LR
  assets["Brand assets\ncolors, icons, marks"] --> brand["goose-word-brand-bao"]
  brand --> ui["Goose Word app surfaces\nheaders, splash, favicon"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Public contract for `@baohaus/goose-word-brand-bao` | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/goose-word-brand-bao

Standalone package in the Baohaus monorepo.

Source at `bao-source/goose-word-brand-bao`.

## Public Pieces

_None declared._

## Proof Commands

Run from `bao-source/goose-word-brand-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/goose-word-brand-bao`:

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

## Integration

Source tree: `bao-source/goose-word-brand-bao`.
Import only documented subpaths from the package card; do not deep-link into `dist/`.
<!-- END BAOHAUS PACKAGE MANUAL -->
