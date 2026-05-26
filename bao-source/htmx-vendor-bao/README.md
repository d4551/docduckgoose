<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/htmx-vendor-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's magic buttons. With HTMX inside, page buttons can ask the server for fresh HTML without reloading the whole page -- like passing a note instead of getting a new book.

## Architecture

```mermaid
flowchart LR
  button["Browser button\nhx-get / hx-post"] --> htmx["HTMX request\nto server"]
  htmx --> server["Server handler"]
  server --> fragment["HTML fragment"]
  fragment --> page["Page update\nswap in place"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Pinned HTMX core + official extension browser assets for Bun generate/static-bao pipelines.; Subpaths: ./manifest, ./runtime, ./side-effect | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/htmx-vendor-bao

Pinned HTMX core + official extension browser assets for Bun generate/static-bao pipelines. Single boundary owner for htmx.org npm packages.

Source at `bao-source/htmx-vendor-bao`.

## Public Pieces

`./manifest`, `./runtime`, `./side-effect`

## Proof Commands

Run from `bao-source/htmx-vendor-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/htmx-vendor-bao`:

```bash
bun install
bun run typecheck
bun run test
bun run build
bun run lint
bun run bao:build
bun run bao:validate
bun run verify
```

## Capability

Pinned HTMX core + official extension browser assets for Bun generate/static-bao pipelines. Single boundary owner for htmx.org npm packages.

## Integration

Source lives at `bao-source/htmx-vendor-bao`. Import through the package exports; do not deep-link into `dist/` or private paths.

## Registry

Catalog id `htmx-vendor-bao` publishes to `baohaus/htmx-vendor-bao`.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `./manifest` | Manifest — typed surface from this .bao crate |
| `./runtime` | Runtime — typed surface from this .bao crate |
| `./side-effect` | Side effect — typed surface from this .bao crate |

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `./manifest` | Manifest — typed surface from this .bao crate |
| `./runtime` | Runtime — typed surface from this .bao crate |
| `./side-effect` | Side effect — typed surface from this .bao crate |
<!-- END BAOHAUS PACKAGE MANUAL -->
