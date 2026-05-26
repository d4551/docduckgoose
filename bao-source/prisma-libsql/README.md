<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/prisma-libsql

## Explain Like I'm Five

LibSQL database adapter for Prisma Client. Apps use exports such as `coerceParams`, `coercePrimitiveParam`, `ConnectionState` from `@baohaus/prisma-libsql`.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/prisma-libsql"] --> crate[".prisma_libsql crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| LibSQL database adapter for Prisma Client; Exported API: coerceParams, coercePrimitiveParam, ConnectionState, createConnection, createLibSQLAdapter, … | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/prisma-libsql

Standalone Baohaus package. Catalog identity `prisma-libsql`. Source at `bao-source/prisma-libsql`. Publishes to `baohaus/prisma-libsql`. Canonical archive: `bao-source/prisma-libsql/dist/bao/prisma-libsql.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/prisma-libsql` |
| Catalog id | `prisma-libsql` |
| Source path | `bao-source/prisma-libsql` |
| OCI repository | `baohaus/prisma-libsql` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`.

## Proof Commands

Run from `bao-source/prisma-libsql`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/prisma-libsql` publishes to `baohaus/prisma-libsql` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/prisma-libsql`:

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

LibSQL database adapter for Prisma Client

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |

## Primary symbols

- `coerceParams`
- `coercePrimitiveParam`
- `ConnectionState`
- `createConnection`
- `createLibSQLAdapter`
- `createLibSQLDriverAdapter`
- `getLibSQLConfig`
- `InteractiveTransaction`
- `isLibSQLError`
- `LibSQLConnection`
- `LibSQLConnectionError`
- `LibSQLDriverAdapter`

## Integration

Source: `bao-source/prisma-libsql` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `prisma-libsql` → OCI `baohaus/prisma-libsql`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |

### Symbols

- `coerceParams`
- `coercePrimitiveParam`
- `ConnectionState`
- `createConnection`
- `createLibSQLAdapter`
- `createLibSQLDriverAdapter`
- `getLibSQLConfig`
- `InteractiveTransaction`
- `isLibSQLError`
- `LibSQLConnection`
- `LibSQLConnectionError`
- `LibSQLDriverAdapter`
<!-- END BAOHAUS PACKAGE MANUAL -->
