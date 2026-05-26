<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/export-pack-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's packaging station. It wraps your finished document into PDF, DOCX, or other formats so you can share it outside the mailroom.

## Architecture

```mermaid
flowchart LR
  doc["Document"] --> pack["export-pack-bao"]
  pack --> pdf["PDF"]
  pack --> docx["DOCX"]
  pack --> html["HTML"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Subpaths: . | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/export-pack-bao

Standalone package in the Baohaus monorepo.

Source at `goose-word-plugins/export-pack-bao`.

## Public Pieces

`.`

## Proof Commands

Run from `goose-word-plugins/export-pack-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `goose-word-plugins/export-pack-bao`:

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

Source tree: `goose-word-plugins/export-pack-bao` — entry `src/index.ts`.
Import only documented subpaths from the package card; do not deep-link into `dist/`.
<!-- END BAOHAUS PACKAGE MANUAL -->
