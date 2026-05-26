<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/goose-word-ui-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's display window. Client-side scripts, styles, and icons that make Goose Word look and feel right in the browser are boxed up here.

## Architecture

```mermaid
flowchart LR
  assets["Scripts, styles, icons"] --> uibao["goose-word-ui-bao\nmanifest + bundling"]
  uibao --> browser["Browser rendering\nGoose Word UI"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Subpaths: ./manifest | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/goose-word-ui-bao

Standalone package in the Baohaus monorepo.

Source at `bao-source/goose-word-ui-bao`.

## Public Pieces

`./manifest`

## Proof Commands

Run from `bao-source/goose-word-ui-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/goose-word-ui-bao`:

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
| `./manifest` | Manifest — typed surface from this .bao crate |

## Integration

Source tree: `bao-source/goose-word-ui-bao`.
Import only documented subpaths from the package card; do not deep-link into `dist/`.
<!-- END BAOHAUS PACKAGE MANUAL -->
