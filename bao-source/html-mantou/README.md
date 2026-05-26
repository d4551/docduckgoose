<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/html-mantou

## Explain Like I'm Five

Elysia HTML plugin parity: template responses, JSX-like rendering. Apps use exports such as `element`, `html`, `isHtml` from `@baohaus/html-mantou`.

## Architecture

```mermaid
sequenceDiagram
  participant Client
  participant html_mantou as @baohaus/html-mantou
  participant Store
  Client->>html_mantou: HTTP request
  html_mantou->>Store: read/write
  Store-->>html_mantou: result
  html_mantou-->>Client: response
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Elysia HTML plugin parity: template responses, JSX-like rendering; Exported API: element, html, isHtml, PACKAGE_NAME, render | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/html-mantou

Standalone Baohaus package. Catalog identity `html-mantou`. Source at `bao-source/html-mantou`. Publishes to `baohaus/html-mantou`. Canonical archive: `bao-source/html-mantou/dist/bao/html-mantou.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/html-mantou` |
| Catalog id | `html-mantou` |
| Source path | `bao-source/html-mantou` |
| OCI repository | `baohaus/html-mantou` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`.

## Proof Commands

Run from `bao-source/html-mantou`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/html-mantou` publishes to `baohaus/html-mantou` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
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
| `.` | Main entry — typed surface from this workbench |

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
| `.` | Main entry — typed surface from this workbench |

### Symbols

- `element`
- `html`
- `isHtml`
- `PACKAGE_NAME`
- `render`
<!-- END BAOHAUS PACKAGE MANUAL -->
