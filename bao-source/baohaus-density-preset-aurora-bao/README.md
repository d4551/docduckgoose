<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/baohaus-density-preset-aurora-bao

## Explain Like I'm Five

Think of baohaus density preset aurora bao as an add-on tile that plugs into the host sidebar, settings, or command list. Aurora density-preset .bao — Apple HIG 2026 aligned row-height + control-size token overrides for comfortable/compact/spacious profiles. Installs via the canonical density-preset install-target handler. Apps use exports such as `BAOHAUS_AURORA_DENSITY_PRESET`, `BaohausAuroraDensityPreset` from `@baohaus/baohaus-density-preset-aurora-bao`.

## Architecture

```mermaid
flowchart LR
  host["Host runtime"]
  ext["@baohaus/baohaus-density-preset-aurora-bao"]
  ui["Sidebar / settings / commands"]
  host --> ext
  ext --> ui
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Aurora density-preset .; Exported API: BAOHAUS_AURORA_DENSITY_PRESET, BaohausAuroraDensityPreset | bao-governance.json; bao.lock; catalog row | Host boot order; Registry catalog authoring |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/baohaus-density-preset-aurora-bao

Standalone Baohaus package. Catalog identity `baohaus-density-preset-aurora-bao`. Source at `bao-source/baohaus-density-preset-aurora-bao`. Publishes to `baohaus/baohaus-density-preset-aurora-bao`. Canonical archive: `bao-source/baohaus-density-preset-aurora-bao/dist/bao/baohaus-density-preset-aurora-bao.bao`.

Cross-app contract and the full principles list live at the repo-root [README](../../README.md#principles).

## Package Facts

| Field | Value |
| --- | --- |
| Package | `@baohaus/baohaus-density-preset-aurora-bao` |
| Catalog id | `baohaus-density-preset-aurora-bao` |
| Source path | `bao-source/baohaus-density-preset-aurora-bao` |
| OCI repository | `baohaus/baohaus-density-preset-aurora-bao` |
| Channel | `public` |
| Visibility | `public` |
| Kind | `extension` |
| Runtime installable | `yes` |
| Publish gate | `standard` |

## Public Pieces

`.`.

## Proof Commands

Run from `bao-source/baohaus-density-preset-aurora-bao`:

- `bun run build`
- `bun run typecheck`
- `bun run test`
- `bun run lint`
- `bun run bao:build`
- `bun run bao:validate`
- `bun run verify`

## Publishing Path

`@baohaus/baohaus-density-preset-aurora-bao` publishes to `baohaus/baohaus-density-preset-aurora-bao` through the canonical `.bao` registry distribution path. Local overrides are development-only; installable content resolves through the registry and the checked catalog/governance/lock path.
<!-- END BAOHAUS PACKAGE CARD -->

<!-- BEGIN BAOHAUS PACKAGE MANUAL -->
## Quick start

From `bao-source/baohaus-density-preset-aurora-bao`:

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

Aurora density-preset .bao — Apple HIG 2026 aligned row-height + control-size token overrides for comfortable/compact/spacious profiles. Installs via the canonical density-preset install-target handler.

## Integration

Source lives at `bao-source/baohaus-density-preset-aurora-bao`. Import through the package exports; do not deep-link into `dist/` or private paths.

## Registry

Catalog id `baohaus-density-preset-aurora-bao` publishes to `baohaus/baohaus-density-preset-aurora-bao`.

## Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |

## Primary symbols

- `BAOHAUS_AURORA_DENSITY_PRESET`
- `BaohausAuroraDensityPreset`

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this workbench |

### Symbols

- `BAOHAUS_AURORA_DENSITY_PRESET`
- `BaohausAuroraDensityPreset`
<!-- END BAOHAUS PACKAGE MANUAL -->
