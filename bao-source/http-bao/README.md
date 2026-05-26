<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/http-bao

## Explain Like I'm Five

Bao HTTP framework parity: declarative routes, middleware, validation, WebSocket, type inference Apps use exports such as `PACKAGE_NAME`, `UPSTREAM_PACKAGE` from `@baohaus/http-bao`. It is part of the Baohaus .bao factory line.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/http-bao"] --> crate[".http_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Bao HTTP framework parity: declarative routes, middleware, validation, WebSocket, type inference; Exported API: PACKAGE_NAME, UPSTREAM_PACKAGE | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/http-bao

Standalone Baohaus package. Catalog identity `http-bao`. Source at `bao-source/http-bao`. Publishes to `baohaus/http-bao`. Canonical archive: `bao-source/http-bao/dist/bao/http-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/http-bao` |
| Catalog id | `http-bao` |
| Source path | `bao-source/http-bao` |
| OCI repository | `baohaus/http-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./app`, `./context`, `./handler`, `./validator`, `./websocket`.

## Proof Commands

Run from `bao-source/http-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/http-bao` publishes to `baohaus/http-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/http-bao`:

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

Bao HTTP framework parity: declarative routes, middleware, validation, WebSocket, type inference

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./app` | App — typed surface from this workbench |
| `./context` | Context — typed surface from this workbench |
| `./handler` | Handler — typed surface from this workbench |
| `./validator` | Validator — typed surface from this workbench |
| `./websocket` | Websocket — typed surface from this workbench |

## Primary symbols

- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`

## Integration

Source: `bao-source/http-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `http-bao` → OCI `baohaus/http-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./app` | App — typed surface from this workbench |
| `./context` | Context — typed surface from this workbench |
| `./handler` | Handler — .bao install target handlers |
| `./validator` | Validator — typed surface from this workbench |
| `./websocket` | Websocket — typed surface from this workbench |

### Symbols

- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
