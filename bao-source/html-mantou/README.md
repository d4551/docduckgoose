<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/html-mantou

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-library-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's envelope printer. It takes templates and stamps out crisp HTML responses -- like a goose with a very fast printer.

## Architecture

```mermaid
flowchart LR
  template["Template input\nJSX-like elements"] --> mantou["html-mantou\nrender + serialize"]
  mantou --> response["HTML response\nready to send"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Elysia HTML plugin parity: template responses, JSX-like rendering; Exported API: element, html, isHtml, PACKAGE_NAME, render | Shared @baohaus contracts | Other .bao crate domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/html-mantou

Elysia HTML plugin parity: template responses, JSX-like rendering

Source at `bao-source/html-mantou`.

## Public Pieces

`.`

## Proof Commands

Run from `bao-source/html-mantou`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/html-mantou`:

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

Elysia HTML plugin parity: template responses, JSX-like rendering

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |

## Primary symbols

- `element`
- `html`
- `isHtml`
- `PACKAGE_NAME`
- `render`

## Integration

Source: `bao-source/html-mantou` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `html-mantou` → OCI `baohaus/html-mantou`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |

### Symbols

- `element`
- `html`
- `isHtml`
- `PACKAGE_NAME`
- `render`
<!-- END BAOHAUS PACKAGE MANUAL -->
