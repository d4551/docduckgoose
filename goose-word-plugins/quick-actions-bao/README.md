<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/quick-actions-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's shortcut drawer. Common document tasks live here as quick buttons so the goose doesn't have to dig through menus.

## Architecture

```mermaid
flowchart LR
  palette["Command palette"] --> quick["quick-actions-bao"]
  quick --> handlers["Action handlers"]
  handlers --> doc["Document"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Subpaths: . | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/quick-actions-bao

Standalone package in the Baohaus monorepo.

Source at `goose-word-plugins/quick-actions-bao`.

## Public Pieces

`.`

## Proof Commands

Run from `goose-word-plugins/quick-actions-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `goose-word-plugins/quick-actions-bao`:

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

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |

## Integration

Source tree: `goose-word-plugins/quick-actions-bao` — entry `src/index.ts`.
Import only documented subpaths from the package card; do not deep-link into `dist/`.
<!-- END BAOHAUS PACKAGE MANUAL -->
