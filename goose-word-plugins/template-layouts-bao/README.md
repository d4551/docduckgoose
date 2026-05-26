<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/template-layouts-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's blank-form drawer. Instead of starting with an empty page, pick a pre-designed layout and start writing right away.

## Architecture

```mermaid
flowchart LR
  gallery["Template gallery"] --> tmpl["template-layouts-bao"]
  tmpl --> doc["New document with layout"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Exported API: DocumentTemplateRegistration | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/template-layouts-bao

Standalone package in the Baohaus monorepo.

Source at `goose-word-plugins/template-layouts-bao`.

## Public Pieces

_None declared._

## Proof Commands

Run from `goose-word-plugins/template-layouts-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `goose-word-plugins/template-layouts-bao`:

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

- `DocumentTemplateRegistration`

## Integration

Source tree: `goose-word-plugins/template-layouts-bao` — entry `src/index.ts`.
Import only documented subpaths from the package card; do not deep-link into `dist/`.
<!-- END BAOHAUS PACKAGE MANUAL -->
