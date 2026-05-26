<!-- BEGIN BAOHAUS README HEADER -->
# @baohaus/baohaus-density-preset-aurora-bao

[![.bao first](https://img.shields.io/badge/.bao-first-5f3dc4)](../../README.md)
[![Bun](https://img.shields.io/badge/runtime-Bun-black?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package kind](https://img.shields.io/badge/kind-extension-0f766e)](./package.json)

## Explain Like I'm Five

This crate is the mailroom's spacing guide. It sets how tall rows are and how big buttons feel -- comfy, compact, or spacious -- so every screen fits just right.

## Architecture

```mermaid
flowchart LR
  preset["density-preset-aurora\nspacing tokens"] --> handler["density-preset handler\ninstall + apply"]
  handler --> host["Host UI\nrows, buttons, controls"]
```

## Scope

| In scope | Dependencies | Out of scope |
| --- | --- | --- |
| Aurora density-preset .; Exported API: BAOHAUS_AURORA_DENSITY_PRESET, BaohausAuroraDensityPreset | Shared @baohaus contracts | Host boot order; Registry catalog authoring |
<!-- END BAOHAUS README HEADER -->

<!-- BEGIN BAOHAUS PACKAGE CARD -->
# @baohaus/baohaus-density-preset-aurora-bao

Aurora density-preset .bao — Apple HIG 2026 aligned row-height + control-size token overrides for comfortable/compact/spacious profiles. Installs via the canonical density-preset install-target handler.

Source at `bao-source/baohaus-density-preset-aurora-bao`.

## Public Pieces

`.`

## Proof Commands

Run from `bao-source/baohaus-density-preset-aurora-bao`:

- `bun run typecheck`
- `bun run test`
- `bun run lint`
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
| `.` | Main entry — typed surface from this .bao crate |

## Primary symbols

- `BAOHAUS_AURORA_DENSITY_PRESET`
- `BaohausAuroraDensityPreset`

## Reference

### Subpaths

| Subpath | Purpose |
| --- | --- |
| `.` | Main entry — typed surface from this .bao crate |

### Symbols

- `BAOHAUS_AURORA_DENSITY_PRESET`
- `BaohausAuroraDensityPreset`
<!-- END BAOHAUS PACKAGE MANUAL -->
