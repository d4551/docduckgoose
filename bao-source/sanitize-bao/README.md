<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/sanitize-bao

## Explain Like I'm Five

sanitize-html parity: HTML parser, allowed tag lists, attribute filters, transformer Apps use exports such as `PACKAGE_NAME`, `sanitizeHtml`, `UPSTREAM_PACKAGE` from `@baohaus/sanitize-bao`. It is part of the Baohaus .bao factory line.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/sanitize-bao"] --> crate[".sanitize_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| sanitize-html parity: HTML parser, allowed tag lists, attribute filters, transformer; Exported API: PACKAGE_NAME, sanitizeHtml, UPSTREAM_PACKAGE | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/sanitize-bao

Standalone Baohaus package. Catalog identity `sanitize-bao`. Source at `bao-source/sanitize-bao`. Publishes to `baohaus/sanitize-bao`. Canonical archive: `bao-source/sanitize-bao/dist/bao/sanitize-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/sanitize-bao` |
| Catalog id | `sanitize-bao` |
| Source path | `bao-source/sanitize-bao` |
| OCI repository | `baohaus/sanitize-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`.

## Proof Commands

Run from `bao-source/sanitize-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/sanitize-bao` publishes to `baohaus/sanitize-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
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
| `.` | Main entry — typed surface from this workbench |

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
| `.` | Main entry — typed surface from this workbench |

### Symbols

- `PACKAGE_NAME`
- `sanitizeHtml`
- `UPSTREAM_PACKAGE`
<!-- END BAOHAUS PACKAGE MANUAL -->
