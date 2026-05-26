<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/libsql-bao

## Explain Like I'm Five

LibSQL client parity: HTTP and WebSocket protocols, batch, transactions. Apps use exports such as `createClient`, `LibSQLClient`, `PACKAGE_NAME` from `@baohaus/libsql-bao`.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/libsql-bao"] --> crate[".libsql_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| LibSQL client parity: HTTP and WebSocket protocols, batch, transactions; Exported API: createClient, LibSQLClient, PACKAGE_NAME, UPSTREAM_PACKAGE | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/libsql-bao

Standalone Baohaus package. Catalog identity `libsql-bao`. Source at `bao-source/libsql-bao`. Publishes to `baohaus/libsql-bao`. Canonical archive: `bao-source/libsql-bao/dist/bao/libsql-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/libsql-bao` |
| Catalog id | `libsql-bao` |
| Source path | `bao-source/libsql-bao` |
| OCI repository | `baohaus/libsql-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./batch`, `./client`, `./sqlite`, `./transaction`, `./types`.

## Proof Commands

Run from `bao-source/libsql-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/libsql-bao` publishes to `baohaus/libsql-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/libsql-bao`:

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

LibSQL client parity: HTTP and WebSocket protocols, batch, transactions

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./batch` | Batch — typed surface from this workbench |
| `./client` | Client — typed surface from this workbench |
| `./sqlite` | Sqlite — typed surface from this workbench |
| `./transaction` | Transaction — typed surface from this workbench |
| `./types` | Types — typed surface from this workbench |

## Primary symbols

- `createClient`
- `LibSQLClient`
- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`

## Integration

Source: `bao-source/libsql-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `libsql-bao` → OCI `baohaus/libsql-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./batch` | Batch — typed surface from this workbench |
| `./client` | Client — typed surface from this workbench |
| `./sqlite` | Sqlite — typed surface from this workbench |
| `./transaction` | Transaction — typed surface from this workbench |
| `./types` | Types — typed surface from this workbench |

### Symbols

- `createClient`
- `LibSQLClient`
- `PACKAGE_NAME`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
