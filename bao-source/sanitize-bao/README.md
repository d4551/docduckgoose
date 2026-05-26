<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/sanitize-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's content scrubber. It washes HTML by removing dangerous tags before any crate opens the envelope -- keeping everyone safe.

## Architecture

```mermaid
flowchart LR
  dirty["Untrusted HTML"] --> sanitize["sanitize-bao\ntag + attribute filter"]
  sanitize --> clean["Clean HTML\nsafe to render"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| sanitize-html parity: HTML parser, allowed tag lists, attribute filters, transformer; Exported API: PACKAGE_NAME, sanitizeHtml, UPSTREAM_PACKAGE | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/sanitize-bao

sanitize-html parity: HTML parser, allowed tag lists, attribute filters, transformer

Source at `bao-source/sanitize-bao`.

## Public Pieces

`.`

## Proof Commands

Run from `bao-source/sanitize-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/sanitize-bao`:

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

sanitize-html parity: HTML parser, allowed tag lists, attribute filters, transformer

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |

## Primary symbols

- `PACKAGE_NAME`
- `sanitizeHtml`
- `UPSTREAM_PACKAGE`

## Integration

Source: `bao-source/sanitize-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `sanitize-bao` → OCI `baohaus/sanitize-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |

### Symbols

- `PACKAGE_NAME`
- `sanitizeHtml`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
