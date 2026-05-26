<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/dayjs-bao

## Explain Like I'm Five

Day.js parity: parsing, manipulation, formatting, locales, plugins, duration. Apps use exports such as `dayjsWithExtras`, `PACKAGE_NAME` from `@baohaus/dayjs-bao`.

## Architecture

```mermaid
flowchart LR
  producer["@baohaus/dayjs-bao"] --> crate[".dayjs_bao crate"]
  crate --> consumers["Host apps and benches"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Day.; Exported API: dayjsWithExtras, PACKAGE_NAME | bao-governance.json; bao.lock; catalog row | Other workbench domains; bao-runtime host lifecycle |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/dayjs-bao

Standalone Baohaus package. Catalog identity `dayjs-bao`. Source at `bao-source/dayjs-bao`. Publishes to `baohaus/dayjs-bao`. Canonical archive: `bao-source/dayjs-bao/dist/bao/dayjs-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/dayjs-bao` |
| Catalog id | `dayjs-bao` |
| Source path | `bao-source/dayjs-bao` |
| OCI repository | `baohaus/dayjs-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `library` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`, `./duration`, `./format`, `./locale`, `./parse`.

## Proof Commands

Run from `bao-source/dayjs-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/dayjs-bao` publishes to `baohaus/dayjs-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/dayjs-bao`:

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

Day.js parity: parsing, manipulation, formatting, locales, plugins, duration

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./duration` | Duration — typed surface from this workbench |
| `./format` | Format — typed surface from this workbench |
| `./locale` | Locale — typed surface from this workbench |
| `./parse` | Parse — typed surface from this workbench |

## Primary symbols

- `dayjsWithExtras`
- `PACKAGE_NAME`

## Integration

Source: `bao-source/dayjs-bao` (`src/index.ts`). Import published subpaths only; do not deep-link into `dist/`.

## Registry

Catalog id `dayjs-bao` → OCI `baohaus/dayjs-bao`.

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |
| `./duration` | Duration — typed surface from this workbench |
| `./format` | Format — typed surface from this workbench |
| `./locale` | Locale — typed surface from this workbench |
| `./parse` | Parse — typed surface from this workbench |

### Symbols

- `dayjsWithExtras`
- `PACKAGE_NAME`
<!-- END BAOHAUS PACKAGE MANUAL -->
