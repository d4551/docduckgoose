<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/static-bao

## Explain Like I'm Five

Static file serving with etag, range, mime detection. Apps use exports such as `getMimeType`, `PACKAGE_NAME`, `resolveAssetPath` from `@baohaus/static-bao`.

## Architecture

```mermaid
sequenceDiagram
  participant Client
  participant static_bao as @baohaus/static-bao
  participant Store
  Client->>static_bao: HTTP request
  static_bao->>Store: read/write
  Store-->>static_bao: result
  static_bao-->>Client: response
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Static file serving with etag, range, mime detection; Exported API: getMimeType, PACKAGE_NAME, resolveAssetPath, serveStatic, staticPlugin | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/static-bao

Standalone Baohaus package. Catalog identity `static-bao`. Source at `bao-source/static-bao`. Publishes to `baohaus/static-bao`. Canonical archive: `bao-source/static-bao/dist/bao/static-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/static-bao` |
| Catalog id | `static-bao` |
| Source path | `bao-source/static-bao` |
| OCI repository | `baohaus/static-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`.

## Proof Commands

Run from `bao-source/static-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/static-bao` publishes to `baohaus/static-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/static-bao`:

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

Static file serving with etag, range, mime detection

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |

## Primary symbols

- `getMimeType`
- `PACKAGE_NAME`
- `resolveAssetPath`
- `serveStatic`
- `staticPlugin`

## Integration

Source: `bao-source/static-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `static-bao` → OCI `baohaus/static-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |

### Symbols

- `getMimeType`
- `PACKAGE_NAME`
- `resolveAssetPath`
- `serveStatic`
- `staticPlugin`
<!-- END BAOHAUS PACKAGE MANUAL -->
